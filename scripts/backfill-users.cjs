/* Create profiles + personal orgs for existing auth.users that pre-date the schema migration. */
const fs = require('node:fs')
const path = require('node:path')
const { Client } = require('pg')

function loadEnv() {
  const raw = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8')
  const env = {}
  for (const line of raw.split('\n')) {
    const m = line.match(/^([A-Z_]+)\s*=\s*(.*)$/)
    if (m) env[m[1]] = m[2].trim()
  }
  return env
}

;(async () => {
  const env = loadEnv()
  const ref = env.VITE_SUPABASE_URL.replace('https://', '').split('.')[0]
  const cs = `postgresql://postgres.${ref}:${encodeURIComponent(env.SUPABASE_DB_PASSWORD)}@aws-0-eu-west-1.pooler.supabase.com:6543/postgres`
  const c = new Client({ connectionString: cs, ssl: { rejectUnauthorized: false } })
  await c.connect()

  const { rows } = await c.query(`
    select u.id, u.email, u.raw_user_meta_data
    from auth.users u
    left join public.profiles p on p.id = u.id
    where p.id is null
  `)
  console.log(`Backfilling ${rows.length} user(s)…`)
  for (const u of rows) {
    const meta = u.raw_user_meta_data || {}
    const fullName = meta.full_name || meta.name || (u.email ? u.email.split('@')[0] : 'Utilisateur')
    const avatar = meta.avatar_url || null
    await c.query(
      'insert into public.profiles (id, email, full_name, avatar_url) values ($1,$2,$3,$4)',
      [u.id, u.email, fullName, avatar]
    )
    console.log(`✓ ${u.email}`)
  }

  // Show final state
  const { rows: state } = await c.query(`
    select p.email, p.full_name, count(om.organization_id) as orgs
    from public.profiles p
    left join public.organization_members om on om.user_id = p.id
    group by p.email, p.full_name
  `)
  console.table(state)

  await c.end()
})().catch((e) => { console.error(e); process.exit(1) })
