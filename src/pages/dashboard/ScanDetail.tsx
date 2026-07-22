import { useEffect, useMemo, useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScoreRing } from '@/components/ScoreRing'
import { Seo } from '@/components/Seo'
import { Skeleton } from '@/components/ui/skeleton'
import { useScan, useScanIssues, useUpdateIssueStatus } from '@/lib/queries'
import { EXPLAIN_FUNCTION_ID, functions } from '@/lib/appwrite'
import { downloadAuditCsv, downloadAuditJson, downloadAuditReport } from '@/lib/report'
import { scoreColor } from '@/lib/format'
import { formatDate, SEVERITY_META, STATUS_META } from '@/lib/format'
import type { ScanIssue, Severity } from '@/lib/database.types'

const SEVERITIES: Severity[] = ['critical', 'serious', 'moderate', 'minor']

export function ScanDetail() {
  const { scanId } = useParams<{ scanId: string }>()
  const { data: scan, isLoading } = useScan(scanId)
  const { data: issues } = useScanIssues(scanId)
  const [severityFilter, setSeverityFilter] = useState<Severity | 'all'>('all')
  const [hideFixed, setHideFixed] = useState(true)

  // À la fin d'un scan suivi en direct, recharge les issues (mises en cache vides pendant l'analyse)
  const qc = useQueryClient()
  const prevStatus = useRef(scan?.status)
  useEffect(() => {
    const was = prevStatus.current
    prevStatus.current = scan?.status
    if (scan?.status === 'done' && (was === 'pending' || was === 'running')) {
      qc.invalidateQueries({ queryKey: ['scan-issues', scanId] })
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

  return (
    <div className="space-y-6">
      <Seo title="Rapport d'audit" description="Détail des non-conformités détectées." path={`/dashboard/scans/${scan.id}`} noindex />

      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <nav aria-label="Fil d'Ariane" className="text-sm text-[#8b98b8] mb-1">
            <Link to="/dashboard/scans" className="hover:text-white hover:underline">Scans</Link>
            {' / '}
            <span aria-current="page">Rapport</span>
          </nav>
          <h1 className="text-2xl font-bold tracking-tight">
            {scan.sites?.name ?? 'Site'}{' '}
            <Badge className={st.className}>{st.label}</Badge>
          </h1>
          <p className="text-[#a3b0c9] mt-1">
            Audit du {formatDate(scan.created_at, true)} · {scan.pages_count} page{scan.pages_count > 1 ? 's' : ''} analysée{scan.pages_count > 1 ? 's' : ''}
          </p>
        </div>
        {scan.status === 'done' && (
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Exporter le rapport">
            <Button
              variant="primary"
              disabled={!issues}
              onClick={() => issues && downloadAuditReport(scan, issues)}
            >
              Télécharger le rapport
            </Button>
            <Button variant="ghost" size="sm" disabled={!issues} onClick={() => issues && downloadAuditCsv(scan, issues)}>
              CSV
            </Button>
            <Button variant="ghost" size="sm" disabled={!issues} onClick={() => issues && downloadAuditJson(scan, issues)}>
              JSON
            </Button>
          </div>
        )}
      </header>

      {(scan.status === 'pending' || scan.status === 'running') && (
        <Card role="status" className="flex items-center gap-4 border-[#38bdf8]/40">
          <span
            aria-hidden="true"
            className="size-5 shrink-0 animate-spin rounded-full border-2 border-[#38bdf8] border-t-transparent"
          />
          <div>
            <p className="font-semibold text-sm">Analyse en cours…</p>
            <p className="text-xs text-[#8b98b8]">
              Le moteur crawle et audite les pages du site. Cette page se met à jour automatiquement.
            </p>
          </div>
        </Card>
      )}

      {scan.status === 'failed' && (
        <Card role="alert" className="border-[#f87171]/40">
          <p className="font-semibold text-sm text-[#fecaca]">L'audit a échoué</p>
          <p className="text-xs text-[#a3b0c9] mt-1">{scan.error ?? 'Erreur inconnue.'}</p>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="flex items-center gap-5">
          <ScoreRing score={scan.score} label="Taux de conformité global" />
          <div>
            <div className="text-sm font-semibold">Conformité globale</div>
            <p className="text-xs text-[#8b98b8] mt-1">
              Règles respectées / règles applicables sur l'échantillon audité.
            </p>
          </div>
        </Card>
        <Card className="flex items-center gap-5">
          <ScoreRing score={scan.rgaa_score} size={72} label="Score RGAA 4.1" />
          <div>
            <div className="text-sm font-semibold">RGAA 4.1</div>
            <p className="text-xs text-[#8b98b8] mt-1">Référentiel français</p>
          </div>
        </Card>
        <Card className="flex items-center gap-5">
          <ScoreRing score={scan.wcag_score} size={72} label="Score WCAG 2.2" />
          <div>
            <div className="text-sm font-semibold">WCAG 2.2 AA</div>
            <p className="text-xs text-[#8b98b8] mt-1">Standard international / EAA</p>
          </div>
        </Card>
      </div>

      {scan.status === 'done' && (scan.page_scores?.length ?? 0) > 1 && (
        <Card>
          <h2 className="text-lg font-bold mb-4">
            Score par page <span className="text-[#8b98b8] font-normal">({scan.page_scores!.length})</span>
          </h2>
          <ul className="space-y-2">
            {scan.page_scores!.map((p) => (
              <li key={p.url} className="flex items-center gap-3 rounded-[10px] border border-[#2a3654] px-4 py-2.5 text-sm">
                <span
                  className="shrink-0 font-bold tabular-nums w-12 text-right"
                  style={{ color: scoreColor(p.score) }}
                >
                  {p.score !== null ? `${Math.round(p.score)}%` : '—'}
                </span>
                <span className="flex-1 min-w-0 truncate text-[#cbd5e1]">{p.url}</span>
                <span className="shrink-0 text-xs text-[#8b98b8]">
                  {p.issues} issue{p.issues > 1 ? 's' : ''}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {scan.status === 'done' && (
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <h2 className="text-lg font-bold">
            Non-conformités <span className="text-[#8b98b8] font-normal">({filtered.length})</span>
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
            <label className="ml-2 inline-flex items-center gap-2 text-sm text-[#a3b0c9]">
              <input
                type="checkbox"
                checked={hideFixed}
                onChange={(e) => setHideFixed(e.target.checked)}
                className="size-4 accent-[#2563eb]"
              />
              Masquer les corrigées
            </label>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-sm text-[#a3b0c9] py-8 text-center">
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

      <p className="text-xs text-[#8b98b8]">
        Un audit automatique couvre les critères détectables par machine (~30 % du RGAA). Pour une
        conformité totale opposable, complétez avec un audit manuel — c'est inclus dans notre offre
        accompagnée.
      </p>
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
          ? 'rounded-full bg-[#2563eb] px-3 py-1.5 text-xs font-semibold text-white'
          : 'rounded-full border border-[#3b4970] px-3 py-1.5 text-xs font-semibold text-[#a3b0c9] hover:bg-white/5 hover:text-white'
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
        functionId: EXPLAIN_FUNCTION_ID,
        body: JSON.stringify({
          title: issue.title,
          rule_id: issue.rule_id,
          description: issue.description,
          html_snippet: issue.html_snippet,
          selector: issue.selector,
          suggested_fix: issue.suggested_fix,
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
    <li className={`rounded-[12px] border border-[#2a3654] ${isDone ? 'opacity-60' : ''}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-white/[0.03] rounded-[12px]"
      >
        <Badge className={sev.className}>{sev.label}</Badge>
        <span className="flex-1 min-w-0">
          <span className="block font-semibold text-sm truncate">{issue.title}</span>
          <span className="block text-xs text-[#8b98b8] truncate">
            {issue.rule_id}
            {issue.page_url ? ` · ${issue.page_url}` : ''}
          </span>
        </span>
        {isDone && <Badge className="bg-[#14532d]/60 text-[#bbf7d0] border-[#4ade80]/40">Traitée</Badge>}
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
        <div className="border-t border-[#2a3654] px-4 py-4 space-y-4 text-sm">
          {issue.description && <p className="text-[#cbd5e1] whitespace-pre-line">{issue.description}</p>}

          {issue.selector && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#a3b0c9] mb-1">Sélecteur</h3>
              <code className="block rounded-[8px] bg-[#0a0e1a] border border-[#2a3654] px-3 py-2 text-xs text-[#93c5fd] overflow-x-auto">
                {issue.selector}
              </code>
            </div>
          )}

          {issue.html_snippet && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#a3b0c9] mb-1">Code concerné</h3>
              <pre className="rounded-[8px] bg-[#0a0e1a] border border-[#2a3654] px-3 py-2 text-xs text-[#e2e8f0] overflow-x-auto">
                <code>{issue.html_snippet}</code>
              </pre>
            </div>
          )}

          {issue.suggested_fix && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#a3b0c9] mb-1">Correction suggérée</h3>
              <p className="rounded-[8px] border border-[#4ade80]/30 bg-[#14532d]/25 px-3 py-2 text-[#d1fae5]">
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
                <p role="status" className="inline-flex items-center gap-2 text-xs text-[#a3b0c9]">
                  <span aria-hidden="true" className="size-3.5 rounded-full border-2 border-[#38bdf8] border-t-transparent animate-spin" />
                  L'assistant analyse votre code…
                </p>
              )}
              {aiState === 'error' && (
                <p className="text-xs text-[#fecaca]">
                  L'assistant IA n'a pas répondu.{' '}
                  <button type="button" onClick={onExplain} className="underline font-semibold">Réessayer</button>
                </p>
              )}
              {aiState === 'done' && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#a3b0c9] mb-1">
                    ✦ Explication et correctif (IA)
                  </h3>
                  <pre className="rounded-[8px] border border-[#38bdf8]/30 bg-[#0a1420] px-3.5 py-3 text-xs text-[#dbeafe] whitespace-pre-wrap font-sans leading-relaxed overflow-x-auto">
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
