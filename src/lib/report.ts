import type { Scan, ScanIssue, Severity } from '@/lib/database.types'
import { downloadHtmlFile, escapeHtml, slugify } from '@/lib/declaration'
import { SEVERITY_META } from '@/lib/format'

const SEVERITY_ORDER: Severity[] = ['critical', 'serious', 'moderate', 'minor']

const SEVERITY_COLORS: Record<Severity, string> = {
  critical: '#b91c1c',
  serious: '#c2410c',
  moderate: '#a16207',
  minor: '#0369a1',
}

/**
 * Génère le rapport d'audit complet en HTML autonome, imprimable
 * (impression navigateur → PDF).
 */
export function buildAuditReportHtml(scan: Scan, issues: ScanIssue[]): string {
  const siteName = scan.sites?.name ?? 'Site'
  const siteUrl = scan.sites?.url ?? ''
  const date = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long', timeStyle: 'short' }).format(
    new Date(scan.created_at),
  )

  const open = issues.filter((i) => i.status === 'open' || i.status === 'in_progress')
  const counts = Object.fromEntries(
    SEVERITY_ORDER.map((s) => [s, open.filter((i) => i.severity === s).length]),
  ) as Record<Severity, number>

  const scoreCell = (label: string, value: number | null) => `
    <div class="score">
      <div class="score-value">${value !== null ? `${Math.round(value)}<small>%</small>` : '—'}</div>
      <div class="score-label">${escapeHtml(label)}</div>
    </div>`

  const sections = SEVERITY_ORDER.map((sev) => {
    const list = issues.filter((i) => i.severity === sev)
    if (list.length === 0) return ''
    const items = list
      .map(
        (i) => `
      <article class="issue">
        <h3>${escapeHtml(i.title)}${i.status === 'fixed' ? ' <span class="tag-fixed">corrigée</span>' : i.status === 'false_positive' ? ' <span class="tag-fixed">faux positif</span>' : ''}</h3>
        <p class="meta">${escapeHtml(i.rule_id)}${i.page_url ? ` · ${escapeHtml(i.page_url)}` : ''}</p>
        ${i.description ? `<p>${escapeHtml(i.description).replace(/\n/g, '<br>')}</p>` : ''}
        ${i.selector ? `<p class="mono"><strong>Sélecteur :</strong> <code>${escapeHtml(i.selector)}</code></p>` : ''}
        ${i.html_snippet ? `<pre><code>${escapeHtml(i.html_snippet)}</code></pre>` : ''}
        ${i.suggested_fix ? `<p class="fix"><strong>Correction suggérée :</strong> ${escapeHtml(i.suggested_fix)}</p>` : ''}
      </article>`,
      )
      .join('')
    return `
    <section>
      <h2 style="color:${SEVERITY_COLORS[sev]}">${SEVERITY_META[sev].label} (${list.length})</h2>
      ${items}
    </section>`
  }).join('')

  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Rapport d'audit accessibilité — ${escapeHtml(siteName)}</title>
<style>
  body { font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; max-width: 52rem; margin: 2rem auto; padding: 0 1.25rem; line-height: 1.55; color: #1a1a2e; }
  h1 { font-size: 1.5rem; margin-bottom: .25rem; }
  h2 { font-size: 1.15rem; margin: 2rem 0 .75rem; border-bottom: 2px solid currentColor; padding-bottom: .25rem; }
  .subtitle { color: #555; margin-top: 0; }
  .scores { display: flex; gap: 1rem; flex-wrap: wrap; margin: 1.5rem 0; }
  .score { border: 1px solid #ddd; border-radius: 10px; padding: .9rem 1.4rem; text-align: center; min-width: 9rem; }
  .score-value { font-size: 1.8rem; font-weight: 700; }
  .score-value small { font-size: 1rem; font-weight: 500; }
  .score-label { font-size: .8rem; color: #555; margin-top: .2rem; }
  .summary { display: flex; gap: .6rem; flex-wrap: wrap; margin-bottom: 1rem; }
  .summary span { border-radius: 999px; padding: .25rem .8rem; font-size: .8rem; font-weight: 600; color: #fff; }
  .issue { border: 1px solid #e3e3ee; border-radius: 10px; padding: .9rem 1.1rem; margin-bottom: .8rem; page-break-inside: avoid; }
  .issue h3 { margin: 0 0 .15rem; font-size: 1rem; }
  .issue .meta { margin: 0 0 .5rem; font-size: .8rem; color: #666; }
  .issue pre { background: #f6f7fb; border: 1px solid #e3e3ee; border-radius: 8px; padding: .6rem .8rem; font-size: .78rem; overflow-x: auto; white-space: pre-wrap; word-break: break-word; }
  .issue code { font-size: .82em; }
  .fix { background: #ecfdf3; border: 1px solid #bbe7cd; border-radius: 8px; padding: .5rem .8rem; }
  .tag-fixed { font-size: .7rem; font-weight: 600; color: #067647; background: #ecfdf3; border-radius: 999px; padding: .1rem .55rem; vertical-align: middle; }
  footer { margin-top: 3rem; font-size: .8rem; color: #555; border-top: 1px solid #ddd; padding-top: 1rem; }
  @media print { body { margin: 0; } .score { border-color: #bbb; } }
</style>
</head>
<body>
<h1>Rapport d'audit d'accessibilité</h1>
<p class="subtitle"><strong>${escapeHtml(siteName)}</strong>${siteUrl ? ` — <a href="${escapeHtml(siteUrl)}">${escapeHtml(siteUrl)}</a>` : ''}<br>
Audit automatisé RGAA 4.1 / WCAG 2.2 réalisé le ${date} · ${scan.pages_count} page${scan.pages_count > 1 ? 's' : ''} analysée${scan.pages_count > 1 ? 's' : ''}</p>

<div class="scores">
  ${scoreCell('Conformité globale', scan.score)}
  ${scoreCell('RGAA 4.1', scan.rgaa_score)}
  ${scoreCell('WCAG 2.2 AA', scan.wcag_score)}
</div>

<div class="summary">
  ${SEVERITY_ORDER.filter((s) => counts[s] > 0)
    .map((s) => `<span style="background:${SEVERITY_COLORS[s]}">${counts[s]} ${SEVERITY_META[s].label.toLowerCase()}${counts[s] > 1 ? 's' : ''}</span>`)
    .join('\n  ')}
  ${open.length === 0 ? '<span style="background:#067647">Aucune non-conformité ouverte</span>' : ''}
</div>

${sections || '<p>🎉 Aucune non-conformité détectée sur les règles automatisables.</p>'}

<footer>
  <p>Audit automatisé : couvre les critères RGAA/WCAG détectables par machine (~30 % du référentiel).
  Pour une conformité opposable, complétez par un audit manuel.<br>
  Rapport généré avec <a href="https://konforme.kayzen-lyon.fr">Konforme</a>. Pour l'imprimer en PDF : Fichier → Imprimer → « Enregistrer au format PDF ».</p>
</footer>
</body>
</html>`
}

export function downloadAuditReport(scan: Scan, issues: ScanIssue[]) {
  const siteName = scan.sites?.name ?? 'site'
  const day = scan.created_at.slice(0, 10)
  downloadHtmlFile(buildAuditReportHtml(scan, issues), `rapport-audit-${slugify(siteName)}-${day}.html`)
}

const CSV_COLUMNS = [
  'severite', 'regle', 'categorie', 'titre', 'page', 'selecteur', 'statut', 'correction',
] as const

function csvCell(v: string | null | undefined): string {
  const s = (v ?? '').replace(/\r?\n/g, ' ')
  return /[";\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

/** Export CSV (séparateur « ; », BOM UTF-8 pour Excel FR). */
export function buildIssuesCsv(issues: ScanIssue[]): string {
  const rows = issues.map((i) =>
    [
      SEVERITY_META[i.severity].label,
      i.rule_id,
      i.category ?? '',
      i.title,
      i.page_url ?? '',
      i.selector ?? '',
      i.status,
      i.suggested_fix ?? '',
    ].map(csvCell).join(';'),
  )
  return '﻿' + [CSV_COLUMNS.join(';'), ...rows].join('\r\n')
}

function downloadBlob(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export function downloadAuditCsv(scan: Scan, issues: ScanIssue[]) {
  const day = scan.created_at.slice(0, 10)
  downloadBlob(
    buildIssuesCsv(issues),
    `audit-${slugify(scan.sites?.name ?? 'site')}-${day}.csv`,
    'text/csv;charset=utf-8',
  )
}

export function downloadAuditJson(scan: Scan, issues: ScanIssue[]) {
  const day = scan.created_at.slice(0, 10)
  const payload = {
    site: scan.sites ?? null,
    scan: {
      id: scan.id,
      created_at: scan.created_at,
      score: scan.score,
      rgaa_score: scan.rgaa_score,
      wcag_score: scan.wcag_score,
      pages_count: scan.pages_count,
      issues_count: scan.issues_count,
      page_scores: scan.page_scores,
    },
    issues,
  }
  downloadBlob(
    JSON.stringify(payload, null, 2),
    `audit-${slugify(scan.sites?.name ?? 'site')}-${day}.json`,
    'application/json;charset=utf-8',
  )
}
