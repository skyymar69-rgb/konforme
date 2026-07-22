/* Provisionne le backend Appwrite de Konforme (idempotent).
 *
 * Prérequis (.env.local) :
 *   VITE_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
 *   VITE_APPWRITE_PROJECT_ID=<id du projet>
 *   APPWRITE_API_KEY=<clé API avec scopes databases/tables/rows/functions/teams>
 *
 * Usage : node scripts/provision-appwrite.cjs
 */
const fs = require('node:fs')
const path = require('node:path')
const os = require('node:os')
const { execFileSync } = require('node:child_process')
const { Client, TablesDB, Functions, Permission, Role } = require('node-appwrite')
const { InputFile } = require('node-appwrite/file')

const DB_ID = 'konforme'
const FUNCTION_ID = 'scan-site'

function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local')
  if (!fs.existsSync(envPath)) throw new Error('.env.local introuvable')
  const env = {}
  // BOM + fins de ligne CRLF/CR tolérés (fichiers édités sous Windows)
  for (const line of fs.readFileSync(envPath, 'utf8').replace(/^﻿/, '').split(/\r\n|\r|\n/)) {
    const m = line.match(/^([A-Z_]+)\s*=\s*(.*)$/)
    if (m) env[m[1]] = m[2].trim()
  }
  return env
}

/** Ignore les erreurs 409 (« existe déjà ») pour rester idempotent. */
async function ensure(label, fn) {
  try {
    await fn()
    console.log(`✓ ${label}`)
  } catch (e) {
    if (e && (e.code === 409 || /already exists/i.test(String(e.message)))) {
      console.log(`· ${label} (déjà présent)`)
    } else {
      throw new Error(`${label} : ${e.message || e}`)
    }
  }
}

const S = (key, size, required = false, xdefault = undefined) => ({ kind: 'string', key, size, required, xdefault })
const B = (key, xdefault = undefined) => ({ kind: 'boolean', key, required: false, xdefault })
const F = (key) => ({ kind: 'float', key, required: false })
const I = (key, xdefault = undefined) => ({ kind: 'integer', key, required: false, xdefault })
const D = (key) => ({ kind: 'datetime', key, required: false })

const TABLES = [
  {
    id: 'sites',
    columns: [
      S('team_id', 64, true), S('name', 256, true), S('url', 1024, true),
      S('description', 2048), B('monitoring_enabled', false), S('monitoring_frequency', 16, false, 'weekly'),
      D('last_scan_at'), F('last_score'),
    ],
    indexes: [{ key: 'idx_team', columns: ['team_id'] }],
  },
  {
    id: 'scans',
    columns: [
      S('team_id', 64, true), S('site_id', 64, true), S('status', 16, true),
      S('trigger', 16, false, 'manual'), S('site_name', 256), S('site_url', 1024),
      D('started_at'), D('finished_at'), I('duration_ms'), I('pages_count', 0), I('issues_count', 0),
      F('score'), F('rgaa_score'), F('wcag_score'), S('error', 2000),
    ],
    indexes: [
      { key: 'idx_team', columns: ['team_id'] },
      { key: 'idx_site', columns: ['site_id'] },
    ],
  },
  {
    id: 'scan_issues',
    columns: [
      S('scan_id', 64, true), S('team_id', 64, true), S('rule_id', 64, true), S('severity', 16, true),
      S('category', 64), S('title', 256, true), S('description', 2048), S('page_url', 1024),
      S('selector', 512), S('html_snippet', 512), S('suggested_fix', 1024),
      S('status', 16, false, 'open'), D('fixed_at'),
    ],
    indexes: [{ key: 'idx_scan', columns: ['scan_id'] }],
  },
  {
    id: 'declarations',
    columns: [
      S('team_id', 64, true), S('site_id', 64, true), S('site_name', 256), S('site_url', 1024),
      S('conformity_level', 16, true), F('conformity_rate'),
      S('reference_standard', 32, false, 'RGAA-4.1'), S('audit_method', 16, false, 'auto'),
      S('contact_email', 256), D('published_at'),
    ],
    indexes: [{ key: 'idx_team', columns: ['team_id'] }],
  },
]

async function createColumn(tables, tableId, col) {
  const base = { databaseId: DB_ID, tableId, key: col.key, required: col.required ?? false }
  if (col.kind === 'string') {
    await tables.createStringColumn({ ...base, size: col.size, xdefault: col.xdefault })
  } else if (col.kind === 'boolean') {
    await tables.createBooleanColumn({ ...base, xdefault: col.xdefault })
  } else if (col.kind === 'float') {
    await tables.createFloatColumn({ ...base })
  } else if (col.kind === 'integer') {
    await tables.createIntegerColumn({ ...base, xdefault: col.xdefault })
  } else if (col.kind === 'datetime') {
    await tables.createDatetimeColumn({ ...base })
  }
}

async function waitColumnsAvailable(tables, tableId, keys) {
  for (let attempt = 0; attempt < 30; attempt++) {
    const res = await tables.listColumns({ databaseId: DB_ID, tableId })
    const byKey = new Map(res.columns.map((c) => [c.key, c.status]))
    const pending = keys.filter((k) => byKey.get(k) !== 'available')
    if (pending.length === 0) return
    await new Promise((r) => setTimeout(r, 1000))
  }
  throw new Error(`Colonnes toujours indisponibles pour ${tableId}`)
}

async function main() {
  const env = loadEnv()
  const endpoint = env.VITE_APPWRITE_ENDPOINT
  const projectId = env.VITE_APPWRITE_PROJECT_ID
  const apiKey = env.APPWRITE_API_KEY
  if (!endpoint || !projectId || !apiKey) {
    throw new Error('VITE_APPWRITE_ENDPOINT, VITE_APPWRITE_PROJECT_ID et APPWRITE_API_KEY sont requis dans .env.local')
  }

  const client = new Client().setEndpoint(endpoint).setProject(projectId).setKey(apiKey)
  const tables = new TablesDB(client)
  const functions = new Functions(client)

  console.log(`Provisionnement du projet ${projectId} (${endpoint})\n`)

  // 1. Base de données
  await ensure(`database "${DB_ID}"`, () => tables.create({ databaseId: DB_ID, name: 'Konforme' }))

  // 2. Tables + colonnes + index
  for (const t of TABLES) {
    await ensure(`table "${t.id}"`, () =>
      tables.createTable({
        databaseId: DB_ID,
        tableId: t.id,
        name: t.id,
        permissions: [Permission.create(Role.users())],
        rowSecurity: true,
      }),
    )
    for (const col of t.columns) {
      await ensure(`  colonne ${t.id}.${col.key}`, () => createColumn(tables, t.id, col))
    }
    await waitColumnsAvailable(tables, t.id, t.columns.map((c) => c.key))
    for (const idx of t.indexes) {
      await ensure(`  index ${t.id}.${idx.key}`, () =>
        tables.createIndex({ databaseId: DB_ID, tableId: t.id, key: idx.key, type: 'key', columns: idx.columns }),
      )
    }
  }

  // 3. Fonction scan-site
  await ensure(`function "${FUNCTION_ID}"`, () =>
    functions.create({
      functionId: FUNCTION_ID,
      name: 'scan-site',
      runtime: 'node-22',
      execute: [Role.users()],
      timeout: 300,
      entrypoint: 'src/main.js',
      commands: 'npm install',
      logging: true,
      scopes: ['rows.read', 'rows.write', 'tables.read', 'teams.read'],
    }),
  )

  // 4. Déploiement du code (tar.gz du dossier functions/scan-site)
  const fnDir = path.join(__dirname, '..', 'functions', 'scan-site')
  const tarPath = path.join(os.tmpdir(), `konforme-scan-site-${Date.now()}.tar.gz`)
  execFileSync('tar', ['--exclude=node_modules', '-czf', tarPath, '-C', fnDir, '.'])
  console.log(`→ déploiement du code (${(fs.statSync(tarPath).size / 1024).toFixed(0)} ko)…`)
  const deployment = await functions.createDeployment({
    functionId: FUNCTION_ID,
    code: InputFile.fromPath(tarPath, 'code.tar.gz'),
    activate: true,
    entrypoint: 'src/main.js',
    commands: 'npm install',
  })
  fs.unlinkSync(tarPath)
  console.log(`✓ déploiement ${deployment.$id} créé (build en cours côté Appwrite)`)

  console.log(`\nTerminé. Dernière étape manuelle (console Appwrite) :
  Overview > Integrations > Platforms > Add platform > Web :
    ajouter "localhost" ET votre domaine de prod (ex. konforme-neon.vercel.app)
    — sans cela le navigateur est bloqué par CORS.
  Optionnel : Auth > Settings > provider Google (Client ID/Secret de .env.local)
    — la connexion email/mot de passe fonctionne sans.`)
}

main().catch((e) => {
  console.error('✗', e.message || e)
  process.exit(1)
})
