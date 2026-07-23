import { useEffect, useMemo, useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScoreRing } from '@/components/ScoreRing'
import { Seo } from '@/components/Seo'
import { Skeleton } from '@/components/ui/skeleton'
import { BadgeGenerator } from '@/components/report/BadgeGenerator'
import { RgaaCriteriaList, type ReviewInput } from '@/components/report/RgaaCriteriaList'
import {
  useCriteriaReviews,
  useScan,
  useScanIssues,
  useScans,
  useSetCriterionReview,
  useSetScanShare,
  useUpdateIssueStatus,
} from '@/lib/queries'
import { functions, SCAN_FUNCTION_ID } from '@/lib/appwrite'
import { buildActionPlan, EFFORT_META, quickWins } from '@/lib/action-plan'
import { computeConformity } from '@/lib/conformity'
import { diffScans } from '@/lib/diff'
import {
  downloadAttestation,
  downloadAuditCsv,
  downloadAuditJson,
  downloadAuditMarkdown,
  downloadAuditReport,
  downloadJiraCsv,
  printAuditReport,
  type ReportScope,
} from '@/lib/report'
import { scoreColor } from '@/lib/format'
import { formatDate, SEVERITY_META, STATUS_META } from '@/lib/format'
import type { CriterionReview, Scan, ScanIssue, Severity } from '@/lib/database.types'

const SEVERITIES: Severity[] = ['critical', 'serious', 'moderate', 'minor']

type TabKey = 'issues' | 'plan' | 'evolution' | 'criteria' | 'pages' | 'badge'

export function ScanDetail() {
  const { scanId } = useParams<{ scanId: string }>()
  const { data: scan, isLoading } = useScan(scanId)
  const { data: issues } = useScanIssues(scanId)
  const [severityFilter, setSeverityFilter] = useState<Severity | 'all'>('all')
  const [hideFixed, setHideFixed] = useState(true)
  const [tab, setTab] = useState<TabKey>('issues')

  // À la fin d'un scan suivi en direct, recharge les issues (mises en cache vides pendant l'analyse)
  const qc = useQueryClient()
  const prevStatus = useRef(scan?.status)
  useEffect(() => {
    const was = prevStatus.current
    prevStatus.current = scan?.status
    if (scan?.status === 'done' && (was === 'pending' || was === 'running')) {
      qc.invalidateQueries({ queryKey: ['scan-issues', scanId] })
      // Le site (dernier score / date) et la liste des scans changent aussi
      qc.invalidateQueries({ queryKey: ['sites'] })
      qc.invalidateQueries({ queryKey: ['scans'] })
    }
  }, [scan?.status, scanId, qc])

  const filtered = useMemo(() => {
    let list = issues ?? []
    if (severityFilter !== 'all') list = list.filter((i) => i.severity === severityFilter)
    if (hideFixed) list = list.filter((i) => i.status !== 'fixed' && i.status !== 'false_positive')
    return [...list].sort((a, b) => SEVERITY_META[a.severity].weight - SEVERITY_META[b.severity].weight)
  }, [issues, severityFilter, hideFixed])

  const counts = useMemo(() => {
    const c: Record<Severity, number> = { critical: 0, serious: 0, moderate: 0, minor: 0 }
    for (const i of issues ?? []) if (i.status === 'open' || i.status === 'in_progress') c[i.severity]++
    return c
  }, [issues])

  const { data: reviews } = useCriteriaReviews(scan?.site_id)
  const setReview = useSetCriterionReview()

  // Audit précédent du même site (pour l'onglet Évolution)
  const { data: siteScans } = useScans(scan?.organization_id, scan?.site_id)
  const prevScan = useMemo(
    () =>
      (siteScans ?? []).find(
        (s) => s.id !== scan?.id && s.status === 'done' && s.created_at < (scan?.created_at ?? ''),
      ) ?? null,
    [siteScans, scan],
  )
  const { data: prevIssues } = useScanIssues(prevScan?.id)
  const evolution = useMemo(
    () => (prevScan && prevIssues ? diffScans(issues ?? [], prevIssues) : null),
    [issues, prevIssues, prevScan],
  )
  const conformity = useMemo(
    () => computeConformity(issues ?? [], undefined, reviews),
    [issues, reviews],
  )

  function handleReview(input: ReviewInput) {
    if (!scan) return
    setReview.mutate({
      siteId: scan.site_id,
      teamId: scan.organization_id,
      criterionId: input.criterionId,
      status: input.status,
      note: input.note,
      existingId: input.existingId,
    })
  }

  if (isLoading) {
    return (
      <div className="space-y-6" role="status" aria-label="Chargement du rapport">
        <Skeleton className="h-16 w-2/3" />
        <div className="grid gap-4 md:grid-cols-3">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
        <Skeleton className="h-64" />
      </div>
    )
  }
  if (!scan) {
    return (
      <Card className="text-center py-14">
        <h1 className="text-lg font-bold mb-2">Rapport introuvable</h1>
        <Link to="/dashboard/scans"><Button variant="ghost">← Retour aux scans</Button></Link>
      </Card>
    )
  }

  const st = STATUS_META[scan.status]
  const badgeRate = conformity.rate ?? scan.score

  const plan = buildActionPlan(issues ?? [])
  const wins = quickWins(plan)

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'issues', label: `Non-conformités (${filtered.length})` },
    { key: 'plan', label: `Plan d'action (${plan.length})` },
    { key: 'evolution', label: 'Évolution' },
    { key: 'criteria', label: 'Les 106 critères RGAA' },
    { key: 'pages', label: `Pages (${scan.page_scores?.length ?? 0})` },
    { key: 'badge', label: 'Badge de conformité' },
  ]

  return (
    <div className="space-y-6">
      <Seo title="Rapport d'audit" description="Détail des non-conformités détectées." path={`/dashboard/scans/${scan.id}`} noindex />

      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <nav aria-label="Fil d'Ariane" className="text-sm text-text-dim mb-1">
            <Link to="/dashboard/scans" className="hover:text-white hover:underline">Scans</Link>
            {' / '}
            <span aria-current="page">Rapport</span>
          </nav>
          <h1 className="text-2xl font-bold tracking-tight">
            {scan.sites?.name ?? 'Site'}{' '}
            <Badge className={st.className}>{st.label}</Badge>
          </h1>
          <p className="text-text-muted mt-1">
            Audit du {formatDate(scan.created_at, true)} · {scan.pages_count} page{scan.pages_count > 1 ? 's' : ''} analysée{scan.pages_count > 1 ? 's' : ''}
          </p>
        </div>
        {scan.status === 'done' && issues && (
          <div className="flex flex-col items-end gap-2">
            <ExportMenu scan={scan} issues={issues} reviews={reviews} />
            <SharePanel scan={scan} />
          </div>
        )}
      </header>

      {(scan.status === 'pending' || scan.status === 'running') && (
        <Card role="status" className="flex items-center gap-4 border-info/40">
          <span
            aria-hidden="true"
            className="size-5 shrink-0 animate-spin rounded-full border-2 border-info border-t-transparent"
          />
          <div>
            <p className="font-semibold text-sm">Analyse en cours…</p>
            <p className="text-xs text-text-dim">
              Le moteur crawle et audite les pages du site. Cette page se met à jour automatiquement.
            </p>
          </div>
        </Card>
      )}

      {scan.status === 'failed' && (
        <Card role="alert" className="border-danger/40">
          <p className="font-semibold text-sm text-danger-soft">L'audit a échoué</p>
          <p className="text-xs text-text-muted mt-1">{scan.error ?? 'Erreur inconnue.'}</p>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="flex items-center gap-5">
          <ScoreRing score={scan.score} label="Taux de conformité global" />
          <div>
            <div className="text-sm font-semibold">Conformité globale</div>
            <p className="text-xs text-text-dim mt-1">
              Règles respectées / règles applicables sur l'échantillon audité.
            </p>
          </div>
        </Card>
        <Card className="flex items-center gap-5">
          <ScoreRing score={scan.rgaa_score} size={72} label="Score RGAA 4.1.2" />
          <div>
            <div className="text-sm font-semibold">RGAA 4.1.2</div>
            <p className="text-xs text-text-dim mt-1">Référentiel français</p>
          </div>
        </Card>
        <Card className="flex items-center gap-5">
          <ScoreRing score={scan.wcag_score} size={72} label="Score WCAG 2.2" />
          <div>
            <div className="text-sm font-semibold">WCAG 2.2 AA</div>
            <p className="text-xs text-text-dim mt-1">Standard international / EAA</p>
          </div>
        </Card>
        <Card className="flex items-center gap-5">
          <ScoreRing score={conformity.rate} size={72} label="Taux de conformité RGAA sur les critères évalués" />
          <div>
            <div className="text-sm font-semibold">Taux RGAA officiel</div>
            <p className="text-xs text-text-dim mt-1">
              {conformity.ok} conformes · {conformity.nonConformes} NC · {conformity.aVerifier} à vérifier
              {conformity.nonApplicables > 0 && <> · {conformity.nonApplicables} NA</>}
            </p>
          </div>
        </Card>
      </div>

      {scan.status === 'done' && (
        <>
          <div role="tablist" aria-label="Sections du rapport" className="flex flex-wrap gap-1 border-b border-border">
            {tabs.map((t) => (
              <button
                key={t.key}
                role="tab"
                id={`tab-${t.key}`}
                aria-selected={tab === t.key}
                aria-controls={`panel-${t.key}`}
                onClick={() => setTab(t.key)}
                className={
                  tab === t.key
                    ? 'rounded-t-[10px] border border-border border-b-transparent bg-surface px-4 py-2.5 text-sm font-semibold text-white -mb-px'
                    : 'rounded-t-[10px] px-4 py-2.5 text-sm font-semibold text-text-muted hover:text-white'
                }
              >
                {t.label}
              </button>
            ))}
          </div>

          <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
            {tab === 'issues' && (
              <Card>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                  <h2 className="text-lg font-bold">
                    Non-conformités <span className="text-text-dim font-normal">({filtered.length})</span>
                  </h2>
                  <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrer par sévérité">
                    <FilterChip active={severityFilter === 'all'} onClick={() => setSeverityFilter('all')}>
                      Toutes
                    </FilterChip>
                    {SEVERITIES.map((s) => (
                      <FilterChip key={s} active={severityFilter === s} onClick={() => setSeverityFilter(s)}>
                        {SEVERITY_META[s].label} ({counts[s]})
                      </FilterChip>
                    ))}
                    <label className="ml-2 inline-flex items-center gap-2 text-sm text-text-muted">
                      <input
                        type="checkbox"
                        checked={hideFixed}
                        onChange={(e) => setHideFixed(e.target.checked)}
                        className="size-4 accent-primary"
                      />
                      Masquer les corrigées
                    </label>
                  </div>
                </div>

                {filtered.length === 0 ? (
                  <p className="text-sm text-text-muted py-8 text-center">
                    {issues?.length === 0
                      ? '🎉 Aucune non-conformité détectée sur les règles automatisables.'
                      : 'Aucune issue ne correspond aux filtres.'}
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {filtered.map((issue) => (
                      <IssueRow key={issue.id} issue={issue} />
                    ))}
                  </ul>
                )}
              </Card>
            )}

            {tab === 'plan' && (
              <Card>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-1">
                  <h2 className="text-lg font-bold">
                    Plan d'action <span className="text-text-dim font-normal">({plan.length} correctifs)</span>
                  </h2>
                  <Button size="sm" variant="ghost" disabled={!issues} onClick={() => issues && downloadJiraCsv(scan, issues)}>
                    Exporter en tickets (CSV Jira/Trello/Linear)
                  </Button>
                </div>
                <p className="text-xs text-text-dim mb-5">
                  Les non-conformités regroupées par correctif à appliquer, triées par gravité puis par
                  nombre d'occurrences.{' '}
                  {wins.length > 0 && (
                    <>
                      <strong className="text-success-soft">{wins.length} victoire{wins.length > 1 ? 's' : ''} rapide{wins.length > 1 ? 's' : ''}</strong>{' '}
                      : des corrections critiques qui ne demandent souvent qu'un attribut HTML.
                    </>
                  )}
                </p>
                {plan.length === 0 ? (
                  <p className="text-sm text-text-muted py-8 text-center">
                    🎉 Aucune action en attente : toutes les non-conformités détectées sont traitées.
                  </p>
                ) : (
                  <ol className="space-y-2">
                    {plan.map((a, idx) => (
                      <li key={a.ruleId} className="flex flex-wrap items-center gap-3 rounded-[10px] border border-border px-4 py-3">
                        <span className="shrink-0 w-6 text-right text-sm font-bold text-text-dim tabular-nums">
                          {idx + 1}.
                        </span>
                        <Badge className={`${SEVERITY_META[a.severity].className} shrink-0`}>
                          {SEVERITY_META[a.severity].label}
                        </Badge>
                        <span className="flex-1 min-w-48">
                          <span className="block text-sm font-semibold">{a.title}</span>
                          <span className="block text-xs text-text-dim">
                            {a.ruleId}
                            {a.criterionId ? ` · critère ${a.criterionId}` : ''} · {a.count} occurrence{a.count > 1 ? 's' : ''} sur {a.pages.length || 1} page{a.pages.length > 1 ? 's' : ''}
                          </span>
                          {a.suggestedFix && (
                            <span className="mt-1 block text-xs text-success-soft">{a.suggestedFix}</span>
                          )}
                        </span>
                        <Badge className={`${EFFORT_META[a.effort].className} shrink-0`}>
                          {EFFORT_META[a.effort].label}
                        </Badge>
                      </li>
                    ))}
                  </ol>
                )}
              </Card>
            )}

            {tab === 'evolution' && (
              <Card>
                <h2 className="text-lg font-bold mb-1">Évolution depuis l'audit précédent</h2>
                {!prevScan ? (
                  <p className="text-sm text-text-muted py-8 text-center">
                    Premier audit de ce site : l'évolution apparaîtra dès le prochain audit.
                  </p>
                ) : !evolution ? (
                  <p role="status" className="text-sm text-text-muted py-8 text-center">Chargement de la comparaison…</p>
                ) : (
                  <>
                    <p className="text-xs text-text-dim mb-5">
                      Comparaison avec l'audit du {formatDate(prevScan.created_at, true)}.
                      {scan.score !== null && prevScan.score !== null && (
                        <>
                          {' '}Score :{' '}
                          <strong style={{ color: scoreColor(scan.score) }}>
                            {Math.round(prevScan.score)} % → {Math.round(scan.score)} %
                          </strong>{' '}
                          ({scan.score - prevScan.score >= 0 ? '+' : ''}
                          {Math.round((scan.score - prevScan.score) * 10) / 10} pts)
                        </>
                      )}
                    </p>
                    <div className="grid gap-4 sm:grid-cols-3 mb-6">
                      <div className="rounded-[12px] border border-danger/30 bg-danger-bg/20 px-4 py-3">
                        <span className="block text-2xl font-extrabold text-danger-soft">
                          +{evolution.appeared.length}
                        </span>
                        <span className="text-sm text-text-soft">nouvelles non-conformités</span>
                      </div>
                      <div className="rounded-[12px] border border-success/30 bg-success-bg/20 px-4 py-3">
                        <span className="block text-2xl font-extrabold text-success-soft">
                          −{evolution.resolved.length}
                        </span>
                        <span className="text-sm text-text-soft">non-conformités résolues</span>
                      </div>
                      <div className="rounded-[12px] border border-border px-4 py-3">
                        <span className="block text-2xl font-extrabold">{evolution.persisting.length}</span>
                        <span className="text-sm text-text-soft">toujours présentes</span>
                      </div>
                    </div>
                    {evolution.appeared.length > 0 && (
                      <section className="mb-5">
                        <h3 className="text-sm font-bold mb-2 text-danger-soft">Apparues depuis le dernier audit</h3>
                        <ul className="space-y-1.5">
                          {evolution.appeared.map((i) => (
                            <EvolutionRow key={i.id} issue={i} />
                          ))}
                        </ul>
                      </section>
                    )}
                    {evolution.resolved.length > 0 && (
                      <section>
                        <h3 className="text-sm font-bold mb-2 text-success-soft">Résolues depuis le dernier audit</h3>
                        <ul className="space-y-1.5">
                          {evolution.resolved.map((i) => (
                            <EvolutionRow key={i.id} issue={i} />
                          ))}
                        </ul>
                      </section>
                    )}
                    {evolution.appeared.length === 0 && evolution.resolved.length === 0 && (
                      <p className="text-sm text-text-muted py-4 text-center">
                        Aucun changement entre les deux audits.
                      </p>
                    )}
                  </>
                )}
              </Card>
            )}

            {tab === 'criteria' && (
              <Card>
                <h2 className="text-lg font-bold mb-1">Les 106 critères du RGAA 4.1.2</h2>
                <p className="text-xs text-text-dim mb-5">
                  Le référentiel officiel français, exigé par la directive européenne 2019/882 (EAA).
                  Survolez le « ? » de chaque critère pour une explication en français courant, et
                  évaluez vous-même les critères non automatisables (« Évaluer ») pour un audit complet
                  selon la méthode officielle.
                </p>
                <RgaaCriteriaList
                  issues={issues ?? []}
                  reviews={reviews}
                  onReview={handleReview}
                  reviewPending={setReview.isPending}
                />
              </Card>
            )}

            {tab === 'pages' && (
              <Card>
                <h2 className="text-lg font-bold mb-1">
                  Rapport par page <span className="text-text-dim font-normal">({scan.page_scores?.length ?? 0})</span>
                </h2>
                <p className="text-xs text-text-dim mb-5">
                  Chaque page auditée dispose de son propre rapport exportable (les 106 critères + les
                  non-conformités de la page) en Markdown, HTML ou PDF.
                </p>
                {(scan.page_scores?.length ?? 0) === 0 ? (
                  <p className="text-sm text-text-muted py-6 text-center">Aucun détail par page disponible pour cet audit.</p>
                ) : (
                  <ul className="space-y-2">
                    {scan.page_scores!.map((p) => (
                      <li key={p.url} className="flex flex-wrap items-center gap-3 rounded-[10px] border border-border px-4 py-2.5 text-sm">
                        <span
                          className="shrink-0 font-bold tabular-nums w-12 text-right"
                          style={{ color: scoreColor(p.score) }}
                        >
                          {p.score !== null ? `${Math.round(p.score)}%` : '—'}
                        </span>
                        <span className="flex-1 min-w-40 truncate text-text-soft">{p.url}</span>
                        <span className="shrink-0 text-xs text-text-dim">
                          {p.issues} issue{p.issues > 1 ? 's' : ''}
                        </span>
                        <span className="flex shrink-0 gap-1.5" role="group" aria-label={`Exporter le rapport de ${p.url}`}>
                          <Button size="sm" variant="outline" disabled={!issues} onClick={() => issues && downloadAuditMarkdown(scan, issues, { pageUrl: p.url, reviews })}>
                            MD
                          </Button>
                          <Button size="sm" variant="outline" disabled={!issues} onClick={() => issues && downloadAuditReport(scan, issues, { pageUrl: p.url, reviews })}>
                            HTML
                          </Button>
                          <Button size="sm" variant="outline" disabled={!issues} onClick={() => issues && printAuditReport(scan, issues, { pageUrl: p.url, reviews })}>
                            PDF
                          </Button>
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            )}

            {tab === 'badge' && (
              <Card>
                <h2 className="text-lg font-bold mb-4">Badge de conformité</h2>
                {badgeRate !== null ? (
                  <BadgeGenerator rate={badgeRate} date={scan.created_at} siteUrl={scan.sites?.url} />
                ) : (
                  <p className="text-sm text-text-muted">
                    Le badge sera disponible dès qu'un taux de conformité aura pu être calculé.
                  </p>
                )}
              </Card>
            )}
          </div>
        </>
      )}

      <p className="text-xs text-text-dim">
        Un audit automatique couvre les critères détectables par machine (~30 % du RGAA). Les critères
        « à vérifier manuellement » de l'onglet 106 critères listent précisément le travail restant. Pour
        une conformité totale opposable, complétez avec un audit manuel — c'est inclus dans notre offre
        accompagnée.{' '}
        <Link to="/guide-accessibilite" className="underline hover:text-white">
          Consulter le guide complet EAA / RGAA
        </Link>
        .
      </p>
    </div>
  )
}

function ExportMenu({
  scan,
  issues,
  reviews,
}: {
  scan: Scan
  issues: ScanIssue[]
  reviews?: CriterionReview[]
}) {
  const scope: ReportScope = { reviews }
  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Exporter le rapport">
      <Button variant="primary" onClick={() => printAuditReport(scan, issues, scope)}>
        Exporter en PDF
      </Button>
      <Button variant="ghost" size="sm" onClick={() => downloadAuditReport(scan, issues, scope)}>
        HTML
      </Button>
      <Button variant="ghost" size="sm" onClick={() => downloadAuditMarkdown(scan, issues, scope)}>
        Markdown
      </Button>
      <Button variant="ghost" size="sm" onClick={() => downloadAttestation(scan, issues, scope)}>
        Attestation
      </Button>
      <Button variant="ghost" size="sm" onClick={() => downloadAuditCsv(scan, issues)}>
        CSV
      </Button>
      <Button variant="ghost" size="sm" onClick={() => downloadAuditJson(scan, issues)}>
        JSON
      </Button>
    </div>
  )
}

function EvolutionRow({ issue }: { issue: ScanIssue }) {
  return (
    <li className="flex items-center gap-3 rounded-[10px] border border-border px-3.5 py-2 text-sm">
      <Badge className={`${SEVERITY_META[issue.severity].className} shrink-0`}>
        {SEVERITY_META[issue.severity].label}
      </Badge>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-semibold">{issue.title}</span>
        <span className="block truncate text-xs text-text-dim">
          {issue.rule_id}
          {issue.page_url ? ` · ${issue.page_url}` : ''}
        </span>
      </span>
    </li>
  )
}

/** Partage public du rapport : lien /r/:token en lecture seule, révocable. */
function SharePanel({ scan }: { scan: Scan }) {
  const setShare = useSetScanShare()
  const [copied, setCopied] = useState(false)
  const shareUrl = scan.share_token ? `${window.location.origin}/r/${scan.share_token}` : null

  async function copy() {
    if (!shareUrl) return
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      /* clipboard indisponible */
    }
  }

  if (!shareUrl) {
    return (
      <Button
        size="sm"
        variant="outline"
        disabled={setShare.isPending}
        onClick={() => setShare.mutate({ scanId: scan.id, enable: true })}
      >
        {setShare.isPending ? 'Création du lien…' : '🔗 Partager le rapport (lien public)'}
      </Button>
    )
  }

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <code className="max-w-72 truncate rounded-[8px] border border-border bg-bg px-2.5 py-1.5 text-xs text-text-soft">
        {shareUrl}
      </code>
      <Button size="sm" variant="outline" onClick={() => void copy()}>
        {copied ? '✓ Copié !' : 'Copier'}
      </Button>
      <Button
        size="sm"
        variant="ghost"
        disabled={setShare.isPending}
        onClick={() => setShare.mutate({ scanId: scan.id, enable: false })}
      >
        Révoquer
      </Button>
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        active
          ? 'rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-white'
          : 'rounded-full border border-border-strong px-3 py-1.5 text-xs font-semibold text-text-muted hover:bg-raise hover:text-white'
      }
    >
      {children}
    </button>
  )
}

function IssueRow({ issue }: { issue: ScanIssue }) {
  const [open, setOpen] = useState(false)
  const update = useUpdateIssueStatus()
  const sev = SEVERITY_META[issue.severity]
  const isDone = issue.status === 'fixed' || issue.status === 'false_positive'

  const [aiState, setAiState] = useState<'idle' | 'loading' | 'done' | 'error' | 'unavailable'>('idle')
  const [aiText, setAiText] = useState('')

  async function onExplain() {
    setAiState('loading')
    try {
      const exec = await functions.createExecution({
        functionId: SCAN_FUNCTION_ID,
        body: JSON.stringify({
          explain: {
            title: issue.title,
            rule_id: issue.rule_id,
            description: issue.description,
            html_snippet: issue.html_snippet,
            selector: issue.selector,
            suggested_fix: issue.suggested_fix,
          },
        }),
        async: false,
      })
      const payload = JSON.parse(exec.responseBody || '{}')
      if (exec.responseStatusCode === 503) {
        setAiState('unavailable')
        return
      }
      if (exec.responseStatusCode >= 400 || !payload.explanation) {
        throw new Error(payload.error || 'Réponse invalide')
      }
      setAiText(payload.explanation)
      setAiState('done')
    } catch {
      setAiState('error')
    }
  }

  return (
    <li className={`rounded-[12px] border border-border ${isDone ? 'opacity-60' : ''}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-white/[0.03] rounded-[12px]"
      >
        <Badge className={sev.className}>{sev.label}</Badge>
        <span className="flex-1 min-w-0">
          <span className="block font-semibold text-sm truncate">{issue.title}</span>
          <span className="block text-xs text-text-dim truncate">
            {issue.rule_id}
            {issue.page_url ? ` · ${issue.page_url}` : ''}
          </span>
        </span>
        {isDone && <Badge className="bg-success-bg/60 text-success-soft border-success/40">Traitée</Badge>}
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
          className={`shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="border-t border-border px-4 py-4 space-y-4 text-sm">
          {issue.description && <p className="text-text-soft whitespace-pre-line">{issue.description}</p>}

          {issue.selector && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-1">Sélecteur</h3>
              <code className="block rounded-[8px] bg-bg border border-border px-3 py-2 text-xs text-primary-soft overflow-x-auto">
                {issue.selector}
              </code>
            </div>
          )}

          {issue.html_snippet && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-1">Code concerné</h3>
              <pre className="rounded-[8px] bg-bg border border-border px-3 py-2 text-xs text-text-soft overflow-x-auto">
                <code>{issue.html_snippet}</code>
              </pre>
            </div>
          )}

          {issue.suggested_fix && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-1">Correction suggérée</h3>
              <p className="rounded-[8px] border border-success/30 bg-success-bg/25 px-3 py-2 text-success-soft">
                {issue.suggested_fix}
              </p>
            </div>
          )}

          {aiState !== 'unavailable' && (
            <div>
              {aiState === 'idle' && (
                <Button size="sm" variant="ghost" onClick={onExplain}>
                  ✦ Expliquer et corriger avec l'IA
                </Button>
              )}
              {aiState === 'loading' && (
                <p role="status" className="inline-flex items-center gap-2 text-xs text-text-muted">
                  <span aria-hidden="true" className="size-3.5 rounded-full border-2 border-info border-t-transparent animate-spin" />
                  L'assistant analyse votre code…
                </p>
              )}
              {aiState === 'error' && (
                <p className="text-xs text-danger-soft">
                  L'assistant IA n'a pas répondu.{' '}
                  <button type="button" onClick={onExplain} className="underline font-semibold">Réessayer</button>
                </p>
              )}
              {aiState === 'done' && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-1">
                    ✦ Explication et correctif (IA)
                  </h3>
                  <pre className="rounded-[8px] border border-info/30 bg-bg-deep px-3.5 py-3 text-xs text-info-soft whitespace-pre-wrap font-sans leading-relaxed overflow-x-auto">
                    {aiText}
                  </pre>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-1">
            {!isDone ? (
              <>
                <Button
                  size="sm"
                  variant="primary"
                  disabled={update.isPending}
                  onClick={() => update.mutate({ id: issue.id, status: 'fixed' })}
                >
                  Marquer corrigée
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={update.isPending}
                  onClick={() => update.mutate({ id: issue.id, status: 'false_positive' })}
                >
                  Faux positif
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                variant="ghost"
                disabled={update.isPending}
                onClick={() => update.mutate({ id: issue.id, status: 'open' })}
              >
                Rouvrir
              </Button>
            )}
          </div>
        </div>
      )}
    </li>
  )
}
