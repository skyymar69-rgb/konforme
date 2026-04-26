/* Apply pending SQL migrations to Supabase via direct pg connection.
 * Idempotent: keeps a tracking table public._migrations.
 * Reads .env.local for SUPABASE_DB_PASSWORD + project ref.
 */
const fs = require('node:fs')
const path = require('node:path')
const { Client } = require('pg')

function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local')
  if (!fs.existsSync(envPath)) throw new Error('.env.local not found')
  const raw = fs.readFileSync(envPath, 'utf8')
  const env = {}
  for (const line of raw.split('\n')) {
    const m = line.match(/^([A-Z_]+)\s*=\s*(.*)$/)
    if (m) env[m[1]] = m[2].trim()
  }
  return env
}

async function main() {
  const env = loadEnv()
  const url = env.VITE_SUPABASE_URL
  const password = env.SUPABASE_DB_PASSWORD
  if (!url || !password) throw new Error('Missing VITE_SUPABASE_URL or SUPABASE_DB_PASSWORD')

  const ref = url.replace('https://', '').split('.')[0]
  // Use Supabase pooler (IPv4-friendly, port 6543, transaction mode)
  const region = 'eu-west-1' // konforme is eu-west-1
  const connectionString = `postgresql://postgres.${ref}:${encodeURIComponent(password)}@aws-0-${region}.pooler.supabase.com:6543/postgres`

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
    statement_timeout: 60000,
  })
  await client.connect()
  console.log(`✓ Connected to Supabase project ${ref}`)

  // Tracking table
  await client.query(`
    create table if not exists public._migrations (
      name text primary key,
      applied_at timestamptz default now() not null
    )
  `)

  const dir = path.join(__dirname, '..', 'supabase', 'migrations')
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.sql')).sort()

  for (const f of files) {
    const { rows } = await client.query('select 1 from public._migrations where name = $1', [f])
    if (rows.length > 0) {
      console.log(`· skip ${f} (already applied)`)
      continue
    }
    console.log(`→ applying ${f} ...`)
    const sql = fs.readFileSync(path.join(dir, f), 'utf8')
    try {
      await client.query('begin')
      await client.query(sql)
      await client.query('insert into public._migrations(name) values ($1)', [f])
      await client.query('commit')
      console.log(`✓ ${f} applied`)
    } catch (e) {
      await client.query('rollback').catch(() => {})
      console.error(`✗ ${f} FAILED:`, e.message)
      process.exit(1)
    }
  }

  await client.end()
  console.log('All done.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
