// Konforme — planificateur de surveillance (cron quotidien 06:00 UTC).
// Parcourt les sites dont monitoring_enabled est actif et relance un audit
// selon leur fréquence (daily / weekly / monthly), en évitant les doublons.
const { Client, TablesDB, Functions, Query, Permission, Role, ID } = require('node-appwrite')

const DB_ID = 'konforme'
const T = { sites: 'sites', scans: 'scans' }
const SCAN_FUNCTION_ID = 'scan-site'

// Marge de 12 h pour absorber la dérive du cron (un hebdo relancé à J+6,5 reste hebdo)
const FREQ_MIN_AGE_MS = {
  daily: 12 * 3600_000,
  weekly: 6.5 * 24 * 3600_000,
  monthly: 29 * 24 * 3600_000,
}

module.exports = async ({ req, res, log, error }) => {
  const endpoint = process.env.APPWRITE_FUNCTION_API_ENDPOINT || 'https://fra.cloud.appwrite.io/v1'
  const projectId = process.env.APPWRITE_FUNCTION_PROJECT_ID
  const apiKey = req.headers['x-appwrite-key'] || ''

  const client = new Client().setEndpoint(endpoint).setProject(projectId).setKey(apiKey)
  const tables = new TablesDB(client)
  const functions = new Functions(client)

  const now = Date.now()
  let launched = 0
  let skipped = 0
  let cursor

  for (;;) {
    const queries = [Query.equal('monitoring_enabled', true), Query.limit(50)]
    if (cursor) queries.push(Query.cursorAfter(cursor))
    const page = await tables.listRows({ databaseId: DB_ID, tableId: T.sites, queries })
    for (const site of page.rows) {
      const freq = FREQ_MIN_AGE_MS[site.monitoring_frequency] ? site.monitoring_frequency : 'weekly'
      const lastScan = site.last_scan_at ? Date.parse(site.last_scan_at) : 0
      if (now - lastScan < FREQ_MIN_AGE_MS[freq]) {
        skipped++
        continue
      }
      // Évite d'empiler un scan si un autre est déjà en file pour ce site
      const pending = await tables.listRows({
        databaseId: DB_ID,
        tableId: T.scans,
        queries: [Query.equal('site_id', site.$id), Query.equal('status', ['pending', 'running']), Query.limit(1)],
      })
      if (pending.rows.length > 0) {
        skipped++
        continue
      }
      try {
        const scan = await tables.createRow({
          databaseId: DB_ID,
          tableId: T.scans,
          rowId: ID.unique(),
          data: {
            site_id: site.$id,
            team_id: site.team_id,
            status: 'pending',
            trigger: 'scheduled',
            site_name: site.name,
            site_url: site.url,
            started_at: new Date().toISOString(),
          },
          permissions: [
            Permission.read(Role.team(site.team_id)),
            Permission.update(Role.team(site.team_id)),
            Permission.delete(Role.team(site.team_id)),
          ],
        })
        await functions.createExecution({
          functionId: SCAN_FUNCTION_ID,
          body: JSON.stringify({ scan_id: scan.$id }),
          async: true,
        })
        launched++
        log(`Audit planifié lancé : ${site.name} (${site.url})`)
      } catch (e) {
        error(`Échec pour ${site.$id} : ${e.message || e}`)
      }
    }
    if (page.rows.length < 50) break
    cursor = page.rows[page.rows.length - 1].$id
  }

  log(`Planificateur : ${launched} audit(s) lancé(s), ${skipped} ignoré(s)`)
  return res.json({ launched, skipped })
}
