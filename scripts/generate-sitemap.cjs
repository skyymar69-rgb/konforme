/* Génère public/sitemap.xml : pages statiques + les 106 fiches critères RGAA
 * + landings européennes. Usage : node scripts/generate-sitemap.cjs */
const fs = require('node:fs')
const path = require('node:path')

const SITE_URL = 'https://konforme.kayzen-lyon.fr'
const TODAY = new Date().toISOString().slice(0, 10)

// Ids des 106 critères RGAA 4.1.2 (thématique → nombre de critères)
const TOPIC_COUNTS = { 1: 9, 2: 2, 3: 3, 4: 13, 5: 8, 6: 2, 7: 5, 8: 10, 9: 4, 10: 14, 11: 13, 12: 11, 13: 12 }
const criterionIds = Object.entries(TOPIC_COUNTS).flatMap(([topic, count]) =>
  Array.from({ length: count }, (_, i) => `${topic}.${i + 1}`),
)

const STATIC_PAGES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/en', priority: '0.9', changefreq: 'monthly' },
  { path: '/de', priority: '0.9', changefreq: 'monthly' },
  { path: '/es', priority: '0.9', changefreq: 'monthly' },
  { path: '/it', priority: '0.9', changefreq: 'monthly' },
  { path: '/rgaa', priority: '0.9', changefreq: 'monthly' },
  { path: '/guide-accessibilite', priority: '0.9', changefreq: 'monthly' },
  { path: '/glossaire', priority: '0.8', changefreq: 'monthly' },
  { path: '/developpeurs', priority: '0.8', changefreq: 'monthly' },
  { path: '/tarifs', priority: '0.9', changefreq: 'monthly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/blog/european-accessibility-act-2025-obligations', priority: '0.7' },
  { path: '/blog/rgaa-vs-wcag-differences', priority: '0.7' },
  { path: '/blog/10-erreurs-accessibilite-les-plus-courantes', priority: '0.7' },
  { path: '/a-propos', priority: '0.6' },
  { path: '/contact', priority: '0.6' },
  { path: '/accessibilite', priority: '0.4' },
  { path: '/legal/mentions-legales', priority: '0.3' },
  { path: '/legal/cgu', priority: '0.3' },
  { path: '/legal/cgv', priority: '0.3' },
  { path: '/legal/confidentialite', priority: '0.3' },
  { path: '/legal/rgpd', priority: '0.3' },
  { path: '/legal/cookies', priority: '0.3' },
]

const urls = [
  ...STATIC_PAGES.map((p) => ({ ...p })),
  ...criterionIds.map((id) => ({ path: `/rgaa/critere/${id}`, priority: '0.7', changefreq: 'monthly' })),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${SITE_URL}${u.path === '/' ? '/' : u.path}</loc>
    <lastmod>${TODAY}</lastmod>${u.changefreq ? `\n    <changefreq>${u.changefreq}</changefreq>` : ''}
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

const out = path.join(__dirname, '..', 'public', 'sitemap.xml')
fs.writeFileSync(out, xml, 'utf8')
console.log(`sitemap.xml généré : ${urls.length} URL (dont ${criterionIds.length} fiches critères)`)
