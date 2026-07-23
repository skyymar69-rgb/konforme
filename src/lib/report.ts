import type { CriterionReview, Scan, ScanIssue, Severity } from '@/lib/database.types'
import { computeConformity, COVERAGE_META, CRITERION_STATUS_META, type ConformitySummary } from '@/lib/conformity'
import { downloadHtmlFile, escapeHtml, slugify } from '@/lib/declaration'
import { SEVERITY_META } from '@/lib/format'

const SEVERITY_ORDER: Severity[] = ['critical', 'serious', 'moderate', 'minor']

const SEVERITY_COLORS: Record<Severity, string> = {
  critical: '#b91c1c',
  serious: '#c2410c',
  moderate: '#a16207',
  minor: '#0369a1',
}

const STATUS_COLORS = {
  ok: '#067647',
  non_conforme: '#b91c1c',
  a_verifier: '#a16207',
  non_applicable: '#6b7280',
} as const

export type ReportScope = {
  /** Restreint le rapport à une seule page auditée du site. */
  pageUrl?: string
  /** Évaluations manuelles des critères (audit complet, méthode officielle). */
  reviews?: CriterionReview[]
}

function scopeIssues(issues: ScanIssue[], scope?: ReportScope): ScanIssue[] {
  return scope?.pageUrl ? issues.filter((i) => i.page_url === scope.pageUrl) : issues
}

function reportTitleSuffix(scope?: ReportScope): string {
  return scope?.pageUrl ? ` — page ${scope.pageUrl}` : ''
}

function fileSuffix(scan: Scan, scope?: ReportScope): string {
  const day = scan.created_at.slice(0, 10)
  const page = scope?.pageUrl ? `-${slugify(scope.pageUrl.replace(/^https?:\/\//, '')).slice(0, 60)}` : ''
  return `${slugify(scan.sites?.name ?? 'site')}${page}-${day}`
}

/* ------------------------------------------------------------------ */
/* Rapport HTML autonome (lisible, imprimable, exportable en PDF)      */
/* ------------------------------------------------------------------ */

function criteriaSectionHtml(summary: ConformitySummary): string {
  const topics = summary.topics
    .map((t) => {
      const rows = t.results
        .map((r) => {
          const meta = CRITERION_STATUS_META[r.status]
          const issues =
            r.openIssues.length > 0
              ? `<div class="crit-issues">${r.openIssues
                  .map(
                    (i) =>
                      `• ${escapeHtml(i.title)}${i.page_url ? ` <span class="dim">(${escapeHtml(i.page_url)})</span>` : ''}`,
                  )
                  .join('<br>')}</div>`
              : ''
          return `
        <tr>
          <td class="crit-id"><a href="https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#${r.criterion.id}">${r.criterion.id}</a></td>
          <td>
            <strong>${escapeHtml(r.criterion.title)}</strong>
            <div class="crit-plain">${escapeHtml(r.criterion.plain)}</div>
            <div class="dim">Niveau ${r.criterion.level} · WCAG ${r.criterion.wcag.join(', ')} · ${escapeHtml(COVERAGE_META[r.criterion.coverage])}</div>
            ${r.review ? `<div class="dim">Évaluation manuelle du ${new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium' }).format(new Date(r.review.reviewed_at))}${r.review.note ? ` — ${escapeHtml(r.review.note)}` : ''}</div>` : ''}
            ${issues}
          </td>
          <td><span class="pill" style="background:${STATUS_COLORS[r.status]}">${meta.shortLabel}</span></td>
        </tr>`
        })
        .join('')
      return `
    <h3 class="topic">${t.topic.id}. ${escapeHtml(t.topic.name)}
      <span class="topic-stats">${t.nonConformes > 0 ? `${t.nonConformes} non conforme${t.nonConformes > 1 ? 's' : ''} · ` : ''}${t.ok} validé${t.ok > 1 ? 's' : ''} · ${t.aVerifier} à vérifier</span>
    </h3>
    <p class="dim">${escapeHtml(t.topic.description)}</p>
    <table class="criteria">
      <thead><tr><th scope="col">N°</th><th scope="col">Critère</th><th scope="col">Statut</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`
    })
    .join('')

  return `
  <section>
    <h2>Les 106 critères du RGAA 4.1.2</h2>
    <p>
      ${summary.rate !== null ? `Taux de conformité (méthode officielle : conformes / critères évalués, hors non-applicables) : <strong>${summary.rate} %</strong> — ` : ''}
      ${summary.ok} conforme${summary.ok > 1 ? 's' : ''},
      ${summary.nonConformes} non conforme${summary.nonConformes > 1 ? 's' : ''},
      ${summary.nonApplicables} non applicable${summary.nonApplicables > 1 ? 's' : ''},
      ${summary.aVerifier} à vérifier manuellement.
    </p>
    ${topics}
  </section>`
}

/**
 * Génère le rapport d'audit complet en HTML autonome (statut des 106 critères
 * RGAA, non-conformités détaillées, rappel réglementaire), imprimable en PDF.
 */
export function buildAuditReportHtml(
  scan: Scan,
  issues: ScanIssue[],
  scope?: ReportScope,
  opts?: { autoPrint?: boolean },
): string {
  const siteName = scan.sites?.name ?? 'Site'
  const siteUrl = scan.sites?.url ?? ''
  const scoped = scopeIssues(issues, scope)
  const summary = computeConformity(issues, scope?.pageUrl, scope?.reviews)
  const date = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long', timeStyle: 'short' }).format(
    new Date(scan.created_at),
  )

  const open = scoped.filter((i) => i.status === 'open' || i.status === 'in_progress')
  const counts = Object.fromEntries(
    SEVERITY_ORDER.map((s) => [s, open.filter((i) => i.severity === s).length]),
  ) as Record<Severity, number>

  const pageScore = scope?.pageUrl
    ? scan.page_scores?.find((p) => p.url === scope.pageUrl)?.score ?? null
    : null

  const scoreCell = (label: string, value: number | null) => `
    <div class="score">
      <div class="score-value">${value !== null ? `${Math.round(value)}<small>%</small>` : '—'}</div>
      <div class="score-label">${escapeHtml(label)}</div>
    </div>`

  const scores = scope?.pageUrl
    ? scoreCell('Score de la page', pageScore) +
      (summary.rate !== null ? scoreCell('Conformité RGAA (critères testés)', summary.rate) : '')
    : scoreCell('Conformité globale', scan.score) +
      scoreCell('RGAA 4.1.2', scan.rgaa_score) +
      scoreCell('WCAG 2.2 AA', scan.wcag_score) +
      (summary.rate !== null ? scoreCell('Critères RGAA testés', summary.rate) : '')

  const sections = SEVERITY_ORDER.map((sev) => {
    const list = scoped.filter((i) => i.severity === sev)
    if (list.length === 0) return ''
    const items = list
      .map(
        (i) => `
      <article class="issue">
        <h4>${escapeHtml(i.title)}${i.status === 'fixed' ? ' <span class="tag-fixed">corrigée</span>' : i.status === 'false_positive' ? ' <span class="tag-fixed">faux positif</span>' : ''}</h4>
        <p class="meta">${escapeHtml(i.rule_id)}${i.page_url && !scope?.pageUrl ? ` · ${escapeHtml(i.page_url)}` : ''}</p>
        ${i.description ? `<p>${escapeHtml(i.description).replace(/\n/g, '<br>')}</p>` : ''}
        ${i.selector ? `<p class="mono"><strong>Sélecteur :</strong> <code>${escapeHtml(i.selector)}</code></p>` : ''}
        ${i.html_snippet ? `<pre><code>${escapeHtml(i.html_snippet)}</code></pre>` : ''}
        ${i.suggested_fix ? `<p class="fix"><strong>Correction suggérée :</strong> ${escapeHtml(i.suggested_fix)}</p>` : ''}
      </article>`,
      )
      .join('')
    return `
    <h3 style="color:${SEVERITY_COLORS[sev]}">${SEVERITY_META[sev].label} (${list.length})</h3>
    ${items}`
  }).join('')

  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Rapport d'audit accessibilité — ${escapeHtml(siteName)}${escapeHtml(reportTitleSuffix(scope))}</title>
<style>
  body { font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; max-width: 56rem; margin: 2rem auto; padding: 0 1.25rem; line-height: 1.55; color: #1a1a2e; }
  h1 { font-size: 1.5rem; margin-bottom: .25rem; }
  h2 { font-size: 1.2rem; margin: 2.2rem 0 .75rem; border-bottom: 2px solid #1a1a2e; padding-bottom: .25rem; }
  h3 { font-size: 1.05rem; margin: 1.6rem 0 .6rem; }
  .subtitle { color: #555; margin-top: 0; }
  .dim { color: #666; font-size: .78rem; }
  .scores { display: flex; gap: 1rem; flex-wrap: wrap; margin: 1.5rem 0; }
  .score { border: 1px solid #ddd; border-radius: 10px; padding: .9rem 1.4rem; text-align: center; min-width: 9rem; }
  .score-value { font-size: 1.8rem; font-weight: 700; }
  .score-value small { font-size: 1rem; font-weight: 500; }
  .score-label { font-size: .8rem; color: #555; margin-top: .2rem; }
  .summary { display: flex; gap: .6rem; flex-wrap: wrap; margin-bottom: 1rem; }
  .summary span, .pill { border-radius: 999px; padding: .25rem .8rem; font-size: .78rem; font-weight: 600; color: #fff; white-space: nowrap; }
  .legal { background: #fffbeb; border: 1px solid #fde68a; border-radius: 10px; padding: .9rem 1.1rem; font-size: .85rem; }
  .legal strong { color: #92400e; }
  .topic { margin-bottom: .1rem; }
  .topic-stats { font-weight: 400; font-size: .78rem; color: #666; margin-left: .5rem; }
  table.criteria { width: 100%; border-collapse: collapse; margin: .4rem 0 1.4rem; font-size: .85rem; }
  table.criteria th, table.criteria td { border: 1px solid #e3e3ee; padding: .5rem .65rem; text-align: left; vertical-align: top; }
  table.criteria th { background: #f6f7fb; font-size: .78rem; }
  .crit-id { font-weight: 700; white-space: nowrap; }
  .crit-plain { color: #444; font-size: .8rem; margin: .2rem 0; }
  .crit-issues { margin-top: .35rem; font-size: .8rem; color: #b91c1c; }
  .issue { border: 1px solid #e3e3ee; border-radius: 10px; padding: .9rem 1.1rem; margin-bottom: .8rem; page-break-inside: avoid; }
  .issue h4 { margin: 0 0 .15rem; font-size: 1rem; }
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
<h1>Rapport d'audit d'accessibilité${escapeHtml(reportTitleSuffix(scope))}</h1>
<p class="subtitle"><strong>${escapeHtml(siteName)}</strong>${siteUrl ? ` — <a href="${escapeHtml(siteUrl)}">${escapeHtml(siteUrl)}</a>` : ''}<br>
Audit automatisé RGAA 4.1.2 / WCAG 2.2 réalisé le ${date}${scope?.pageUrl ? `<br>Page auditée : <a href="${escapeHtml(scope.pageUrl)}">${escapeHtml(scope.pageUrl)}</a>` : ` · ${scan.pages_count} page${scan.pages_count > 1 ? 's' : ''} analysée${scan.pages_count > 1 ? 's' : ''}`}</p>

<div class="scores">
  ${scores}
</div>

<div class="summary">
  ${SEVERITY_ORDER.filter((s) => counts[s] > 0)
    .map((s) => `<span style="background:${SEVERITY_COLORS[s]}">${counts[s]} ${SEVERITY_META[s].label.toLowerCase()}${counts[s] > 1 ? 's' : ''}</span>`)
    .join('\n  ')}
  ${open.length === 0 ? '<span style="background:#067647">Aucune non-conformité ouverte</span>' : ''}
</div>

<div class="legal">
  <strong>Rappel réglementaire.</strong> Depuis le <strong>28 juin 2025</strong>, la directive européenne
  (UE) 2019/882 (European Accessibility Act) impose l'accessibilité des sites e-commerce et de nombreux
  services numériques. En France, la conformité se démontre via le <strong>RGAA 4.1.2</strong> et la DGCCRF
  contrôle activement : jusqu'à <strong>50 000 € d'amende par service non conforme</strong> et
  <strong>25 000 €</strong> en l'absence de déclaration d'accessibilité.
</div>

${criteriaSectionHtml(summary)}

<section>
  <h2>Non-conformités détectées${scope?.pageUrl ? ' sur cette page' : ''}</h2>
  ${sections || '<p>🎉 Aucune non-conformité détectée sur les règles automatisables.</p>'}
</section>

<footer>
  <p>Audit automatisé : un moteur détecte une partie des critères RGAA (les autres nécessitent une
  vérification humaine, signalée « à vérifier » ci-dessus). Pour une conformité opposable, complétez par
  un audit manuel.<br>
  Rapport généré avec <a href="https://konforme.kayzen-lyon.fr">Konforme</a>. Pour l'obtenir en PDF :
  Fichier → Imprimer → « Enregistrer au format PDF ».</p>
</footer>
${opts?.autoPrint ? '<script>window.addEventListener("load",function(){setTimeout(function(){window.print()},250)})</script>' : ''}
</body>
</html>`
}

export function downloadAuditReport(scan: Scan, issues: ScanIssue[], scope?: ReportScope) {
  downloadHtmlFile(buildAuditReportHtml(scan, issues, scope), `rapport-audit-${fileSuffix(scan, scope)}.html`)
}

/** Export PDF : ouvre le rapport dans un onglet et déclenche l'impression. */
export function printAuditReport(scan: Scan, issues: ScanIssue[], scope?: ReportScope) {
  const html = buildAuditReportHtml(scan, issues, scope, { autoPrint: true })
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  window.open(url, '_blank', 'noopener')
  setTimeout(() => URL.revokeObjectURL(url), 60_000)
}

/* ------------------------------------------------------------------ */
/* Attestation d'audit (document synthétique, imprimable en PDF)        */
/* ------------------------------------------------------------------ */

/**
 * Attestation d'audit : document d'une page, daté, présentable à un donneur
 * d'ordre ou un contrôleur. Formulation prudente : c'est une attestation de
 * réalisation d'audit et de résultat, pas une certification tierce.
 */
export function buildAttestationHtml(scan: Scan, issues: ScanIssue[], scope?: ReportScope): string {
  const siteName = scan.sites?.name ?? 'Site'
  const siteUrl = scan.sites?.url ?? ''
  const summary = computeConformity(issues, undefined, scope?.reviews)
  const date = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' }).format(new Date(scan.created_at))
  const pages = scan.page_scores ?? []
  const complete = summary.aVerifier === 0

  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Attestation d'audit d'accessibilité — ${escapeHtml(siteName)}</title>
<style>
  body { font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; max-width: 46rem; margin: 2.5rem auto; padding: 0 1.5rem; line-height: 1.6; color: #1a1a2e; }
  header { text-align: center; border-bottom: 3px solid #1a1a2e; padding-bottom: 1.2rem; margin-bottom: 1.6rem; }
  h1 { font-size: 1.45rem; margin: .2rem 0; }
  .kicker { text-transform: uppercase; letter-spacing: .12em; font-size: .72rem; color: #555; }
  .rate { text-align: center; margin: 1.6rem 0; }
  .rate strong { font-size: 3rem; }
  .rate small { display: block; color: #555; font-size: .85rem; }
  dl { display: grid; grid-template-columns: 14rem 1fr; gap: .45rem 1rem; font-size: .92rem; }
  dt { font-weight: 600; color: #444; }
  dd { margin: 0; }
  .pages { font-size: .8rem; color: #555; margin-top: .3rem; }
  .notice { background: #f6f7fb; border: 1px solid #e3e3ee; border-radius: 10px; padding: .8rem 1rem; font-size: .8rem; color: #444; margin-top: 1.6rem; }
  footer { margin-top: 2rem; font-size: .78rem; color: #555; text-align: center; }
  @media print { body { margin: 1rem auto; } }
</style>
</head>
<body>
<header>
  <p class="kicker">Accessibilité numérique — RGAA 4.1.2 / WCAG 2.2 / directive (UE) 2019/882</p>
  <h1>Attestation d'audit d'accessibilité</h1>
</header>

<p>Le site <strong>${escapeHtml(siteName)}</strong>${siteUrl ? ` (<a href="${escapeHtml(siteUrl)}">${escapeHtml(siteUrl)}</a>)` : ''}
a fait l'objet d'un audit d'accessibilité le <strong>${date}</strong>, réalisé avec la plateforme Konforme
selon la méthode technique du RGAA 4.1.2${complete ? ' (audit automatisé complété par une évaluation manuelle des 106 critères)' : ' (audit automatisé' + (summary.tested > 0 ? ', évaluation manuelle en cours' : '') + ')'}.</p>

<div class="rate">
  <strong>${summary.rate !== null ? `${summary.rate} %` : '—'}</strong>
  <small>taux de conformité RGAA sur les critères évalués<br>(critères conformes / critères évalués, hors non-applicables — méthode officielle)</small>
</div>

<dl>
  <dt>Critères conformes</dt><dd>${summary.ok} / 106</dd>
  <dt>Critères non conformes</dt><dd>${summary.nonConformes}</dd>
  <dt>Critères non applicables</dt><dd>${summary.nonApplicables}</dd>
  <dt>Critères restant à vérifier</dt><dd>${summary.aVerifier}</dd>
  <dt>Échantillon audité</dt>
  <dd>${scan.pages_count} page${scan.pages_count > 1 ? 's' : ''}
    ${pages.length > 0 ? `<div class="pages">${pages.map((p) => escapeHtml(p.url)).join('<br>')}</div>` : ''}
  </dd>
  <dt>Référentiels</dt><dd>RGAA 4.1.2 · WCAG 2.2 AA · EN 301 549</dd>
</dl>

<div class="notice">
  Cette attestation rend compte de l'état du site à la date de l'audit sur l'échantillon indiqué.
  Elle ne constitue pas une certification délivrée par un organisme tiers. Le référentiel RGAA
  n'exige aucun agrément pour la réalisation des audits : l'audit peut être réalisé en interne ou
  par un tiers (modèle officiel de déclaration d'accessibilité). Un nouvel audit est recommandé
  après toute évolution majeure du site, et au moins une fois par an.
</div>

<footer>
  Document généré par <a href="https://konforme.kayzen-lyon.fr">Konforme</a> — KAYZEN SASU.
  Pour l'imprimer en PDF : Fichier → Imprimer → « Enregistrer au format PDF ».
</footer>
</body>
</html>`
}

export function downloadAttestation(scan: Scan, issues: ScanIssue[], scope?: ReportScope) {
  downloadHtmlFile(buildAttestationHtml(scan, issues, scope), `attestation-audit-${fileSuffix(scan)}.html`)
}

/* ------------------------------------------------------------------ */
/* Rapport Markdown                                                     */
/* ------------------------------------------------------------------ */

const MD_STATUS_ICON = { ok: '✅', non_conforme: '❌', a_verifier: '👁️', non_applicable: '➖' } as const

export function buildAuditReportMarkdown(scan: Scan, issues: ScanIssue[], scope?: ReportScope): string {
  const siteName = scan.sites?.name ?? 'Site'
  const siteUrl = scan.sites?.url ?? ''
  const scoped = scopeIssues(issues, scope)
  const summary = computeConformity(issues, scope?.pageUrl, scope?.reviews)
  const date = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' }).format(new Date(scan.created_at))
  const open = scoped.filter((i) => i.status === 'open' || i.status === 'in_progress')

  const lines: string[] = []
  lines.push(`# Rapport d'audit d'accessibilité${reportTitleSuffix(scope)}`)
  lines.push('')
  lines.push(`**${siteName}**${siteUrl ? ` — <${siteUrl}>` : ''}`)
  lines.push(`Audit automatisé RGAA 4.1.2 / WCAG 2.2 réalisé le ${date}${scope?.pageUrl ? `\nPage auditée : <${scope.pageUrl}>` : ` · ${scan.pages_count} page(s) analysée(s)`}`)
  lines.push('')
  lines.push('## Scores')
  lines.push('')
  lines.push('| Indicateur | Valeur |')
  lines.push('|---|---|')
  if (!scope?.pageUrl) {
    lines.push(`| Conformité globale | ${scan.score !== null ? `${Math.round(scan.score)} %` : '—'} |`)
    lines.push(`| RGAA 4.1.2 | ${scan.rgaa_score !== null ? `${Math.round(scan.rgaa_score)} %` : '—'} |`)
    lines.push(`| WCAG 2.2 AA | ${scan.wcag_score !== null ? `${Math.round(scan.wcag_score)} %` : '—'} |`)
  } else {
    const pageScore = scan.page_scores?.find((p) => p.url === scope.pageUrl)?.score ?? null
    lines.push(`| Score de la page | ${pageScore !== null ? `${Math.round(pageScore)} %` : '—'} |`)
  }
  if (summary.rate !== null) lines.push(`| Taux de conformité RGAA (critères évalués) | ${summary.rate} % |`)
  lines.push(`| Non-conformités ouvertes | ${open.length} |`)
  lines.push('')
  lines.push('> **Rappel réglementaire** — Depuis le 28 juin 2025, la directive (UE) 2019/882 (European')
  lines.push("> Accessibility Act) impose l'accessibilité de nombreux services numériques. La DGCCRF peut")
  lines.push("> prononcer jusqu'à 50 000 € d'amende par service non conforme et 25 000 € en l'absence de")
  lines.push("> déclaration d'accessibilité.")
  lines.push('')
  lines.push('## Les 106 critères du RGAA 4.1.2')
  lines.push('')
  lines.push(`- ✅ Conformes : **${summary.ok}**`)
  lines.push(`- ❌ Non conformes : **${summary.nonConformes}**`)
  lines.push(`- ➖ Non applicables : **${summary.nonApplicables}**`)
  lines.push(`- 👁️ À vérifier manuellement : **${summary.aVerifier}**`)
  if (summary.rate !== null) {
    lines.push('')
    lines.push(`Taux de conformité (méthode officielle) : **${summary.rate} %** — conformes / critères évalués, hors non-applicables.`)
  }
  lines.push('')

  for (const t of summary.topics) {
    lines.push(`### ${t.topic.id}. ${t.topic.name}`)
    lines.push('')
    lines.push(`_${t.topic.description}_`)
    lines.push('')
    lines.push('| N° | Critère | Niveau | Statut |')
    lines.push('|---|---|---|---|')
    for (const r of t.results) {
      const status = `${MD_STATUS_ICON[r.status]} ${CRITERION_STATUS_META[r.status].shortLabel}`
      lines.push(`| ${r.criterion.id} | ${r.criterion.title.replace(/\|/g, '\\|')} | ${r.criterion.level} | ${status} |`)
    }
    lines.push('')
    for (const r of t.results) {
      if (r.openIssues.length === 0) continue
      lines.push(`**Critère ${r.criterion.id} — pourquoi c'est important :** ${r.criterion.plain}`)
      lines.push('')
      for (const i of r.openIssues) {
        lines.push(`- [${SEVERITY_META[i.severity].label}] ${i.title}${i.page_url && !scope?.pageUrl ? ` — ${i.page_url}` : ''}`)
      }
      lines.push('')
    }
  }

  lines.push('## Détail des non-conformités')
  lines.push('')
  if (scoped.length === 0) {
    lines.push('Aucune non-conformité détectée sur les règles automatisables. 🎉')
    lines.push('')
  }
  for (const sev of SEVERITY_ORDER) {
    const list = scoped.filter((i) => i.severity === sev)
    if (list.length === 0) continue
    lines.push(`### ${SEVERITY_META[sev].label} (${list.length})`)
    lines.push('')
    for (const i of list) {
      lines.push(`#### ${i.title}${i.status === 'fixed' ? ' _(corrigée)_' : i.status === 'false_positive' ? ' _(faux positif)_' : ''}`)
      lines.push('')
      lines.push(`- **Règle :** ${i.rule_id}`)
      if (i.page_url && !scope?.pageUrl) lines.push(`- **Page :** ${i.page_url}`)
      if (i.selector) lines.push(`- **Sélecteur :** \`${i.selector}\``)
      if (i.description) lines.push(`- **Description :** ${i.description.replace(/\r?\n/g, ' ')}`)
      if (i.suggested_fix) lines.push(`- **Correction suggérée :** ${i.suggested_fix}`)
      if (i.html_snippet) {
        lines.push('')
        lines.push('```html')
        lines.push(i.html_snippet)
        lines.push('```')
      }
      lines.push('')
    }
  }

  lines.push('---')
  lines.push('')
  lines.push("_Audit automatisé : un moteur détecte une partie des critères RGAA ; les critères « à vérifier »")
  lines.push('nécessitent une revue humaine. Rapport généré avec [Konforme](https://konforme.kayzen-lyon.fr)._')
  lines.push('')
  return lines.join('\n')
}

export function downloadAuditMarkdown(scan: Scan, issues: ScanIssue[], scope?: ReportScope) {
  downloadBlob(
    buildAuditReportMarkdown(scan, issues, scope),
    `rapport-audit-${fileSuffix(scan, scope)}.md`,
    'text/markdown;charset=utf-8',
  )
}

/* ------------------------------------------------------------------ */
/* CSV / JSON                                                           */
/* ------------------------------------------------------------------ */

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
  downloadBlob(buildIssuesCsv(issues), `audit-${fileSuffix(scan)}.csv`, 'text/csv;charset=utf-8')
}

/* ------------------------------------------------------------------ */
/* Export tickets (CSV compatible import Jira)                          */
/* ------------------------------------------------------------------ */

const JIRA_PRIORITY: Record<Severity, string> = {
  critical: 'Highest',
  serious: 'High',
  moderate: 'Medium',
  minor: 'Low',
}

function jiraCell(v: string): string {
  return `"${v.replace(/"/g, '""')}"`
}

/**
 * CSV prêt pour l'import Jira (System > External System Import > CSV) :
 * une ligne par non-conformité ouverte, avec priorité mappée sur la sévérité.
 * Fonctionne aussi pour Trello, Linear, Asana (import CSV générique).
 */
export function buildJiraCsv(issues: ScanIssue[]): string {
  const open = issues.filter((i) => i.status === 'open' || i.status === 'in_progress')
  const header = ['Summary', 'Description', 'Priority', 'Labels'].join(',')
  const rows = open.map((i) => {
    const description = [
      `Règle : ${i.rule_id}`,
      i.page_url ? `Page : ${i.page_url}` : null,
      i.selector ? `Sélecteur : ${i.selector}` : null,
      i.description ? `Détail : ${i.description.replace(/\r?\n/g, ' ')}` : null,
      i.suggested_fix ? `Correction suggérée : ${i.suggested_fix}` : null,
      i.html_snippet ? `Code : ${i.html_snippet.replace(/\r?\n/g, ' ')}` : null,
    ]
      .filter(Boolean)
      .join('\n')
    return [
      jiraCell(`[A11y] ${i.title}`),
      jiraCell(description),
      jiraCell(JIRA_PRIORITY[i.severity]),
      jiraCell('accessibilite rgaa'),
    ].join(',')
  })
  return [header, ...rows].join('\r\n')
}

export function downloadJiraCsv(scan: Scan, issues: ScanIssue[]) {
  downloadBlob(buildJiraCsv(issues), `tickets-a11y-${fileSuffix(scan)}.csv`, 'text/csv;charset=utf-8')
}

export function downloadAuditJson(scan: Scan, issues: ScanIssue[]) {
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
  downloadBlob(JSON.stringify(payload, null, 2), `audit-${fileSuffix(scan)}.json`, 'application/json;charset=utf-8')
}
