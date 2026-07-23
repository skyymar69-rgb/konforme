import { useMemo, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tooltip } from '@/components/ui/tooltip'
import { computeConformity, COVERAGE_META, CRITERION_STATUS_META, type CriterionResult, type CriterionStatus } from '@/lib/conformity'
import type { CriterionReview, ReviewStatus, ScanIssue } from '@/lib/database.types'
import { SEVERITY_META } from '@/lib/format'
import { rgaaCriterionUrl } from '@/lib/rgaa'

export type ReviewInput = {
  criterionId: string
  status: ReviewStatus | null
  note?: string
  existingId?: string
}

/**
 * Les 106 critères du RGAA 4.1.2, regroupés par thématique, avec le statut
 * suivant la méthode officielle : conforme, non conforme, non applicable ou
 * à vérifier. Quand `onReview` est fourni, chaque critère non automatisable
 * peut être évalué manuellement (audit complet, 100 % autonome).
 */
export function RgaaCriteriaList({
  issues,
  pageUrl,
  reviews,
  onReview,
  reviewPending,
}: {
  issues: ScanIssue[]
  pageUrl?: string
  reviews?: CriterionReview[]
  onReview?: (input: ReviewInput) => void
  reviewPending?: boolean
}) {
  const summary = useMemo(() => computeConformity(issues, pageUrl, reviews), [issues, pageUrl, reviews])
  const [filter, setFilter] = useState<CriterionStatus | 'all'>('all')

  const filters: { key: CriterionStatus | 'all'; label: string; count: number }[] = [
    { key: 'all', label: 'Tous les critères', count: summary.results.length },
    { key: 'non_conforme', label: 'Non conformes', count: summary.nonConformes },
    { key: 'ok', label: 'Conformes', count: summary.ok },
    { key: 'a_verifier', label: 'À vérifier', count: summary.aVerifier },
    { key: 'non_applicable', label: 'Non applicables', count: summary.nonApplicables },
  ]

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-text-muted">
          {summary.rate !== null ? (
            <>
              Taux de conformité RGAA : <strong className="text-white">{summary.rate} %</strong>{' '}
              ({summary.ok} conformes / {summary.tested} critères évalués, méthode officielle).{' '}
              {summary.aVerifier > 0 && (
                <>Encore <strong className="text-white">{summary.aVerifier}</strong> critères à évaluer manuellement.</>
              )}
            </>
          ) : (
            'Aucun critère n’a encore pu être évalué sur cet échantillon.'
          )}
        </p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer les critères par statut">
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              aria-pressed={filter === f.key}
              className={
                filter === f.key
                  ? 'rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-white'
                  : 'rounded-full border border-border-strong px-3 py-1.5 text-xs font-semibold text-text-muted hover:bg-raise hover:text-white'
              }
            >
              {f.label} ({f.count})
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {summary.topics.map((t) => {
          const visible = filter === 'all' ? t.results : t.results.filter((r) => r.status === filter)
          if (visible.length === 0) return null
          return (
            <section key={t.topic.id} aria-labelledby={`rgaa-topic-${t.topic.id}`}>
              <header className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                <h3 id={`rgaa-topic-${t.topic.id}`} className="text-sm font-bold">
                  {t.topic.id}. {t.topic.name}
                  <span className="ml-2 font-normal text-text-dim text-xs">{t.topic.description}</span>
                </h3>
                <span className="text-xs text-text-dim tabular-nums">
                  {t.nonConformes > 0 && (
                    <>
                      <span className="text-danger-soft font-semibold">{t.nonConformes} NC</span>
                      {' · '}
                    </>
                  )}
                  {t.ok} conforme{t.ok > 1 ? 's' : ''} · {t.aVerifier} à vérifier
                  {t.nonApplicables > 0 && <> · {t.nonApplicables} NA</>}
                </span>
              </header>
              <ul className="space-y-1.5">
                {visible.map((r) => (
                  <CriterionRow key={r.criterion.id} result={r} onReview={onReview} reviewPending={reviewPending} />
                ))}
              </ul>
            </section>
          )
        })}
      </div>
    </div>
  )
}

const REVIEW_OPTIONS: { status: ReviewStatus; label: string; activeClass: string }[] = [
  { status: 'conforme', label: 'Conforme', activeClass: 'bg-success-bg/70 text-success-soft border-success/50' },
  { status: 'non_conforme', label: 'Non conforme', activeClass: 'bg-danger-bg/70 text-danger-soft border-danger/50' },
  { status: 'non_applicable', label: 'Non applicable', activeClass: 'bg-raise text-white border-border-strong' },
]

function CriterionRow({
  result,
  onReview,
  reviewPending,
}: {
  result: CriterionResult
  onReview?: (input: ReviewInput) => void
  reviewPending?: boolean
}) {
  const { criterion, status, openIssues, resolvedIssues, review } = result
  const meta = CRITERION_STATUS_META[status]
  const linked = [...openIssues, ...resolvedIssues]
  const [open, setOpen] = useState(false)
  const [note, setNote] = useState(review?.note ?? '')

  // L'évaluation manuelle ne peut pas contredire une non-conformité outillée
  const reviewable = !!onReview && openIssues.length === 0

  return (
    <li className="rounded-[10px] border border-border">
      <div className="flex items-center gap-3 px-3.5 py-2.5">
        <Badge className={`${meta.className} hidden sm:inline-flex shrink-0 w-28 justify-center`}>
          {meta.shortLabel}
        </Badge>
        <span className="flex-1 min-w-0 text-sm">
          <Badge className={`${meta.className} sm:hidden mr-2`}>{meta.shortLabel}</Badge>
          <span className="font-semibold text-text-soft">
            <span className="text-text-dim font-normal tabular-nums">{criterion.id}</span> {criterion.title}
          </span>
          <span className="ml-2 inline-flex items-center gap-1.5 align-middle">
            <Tooltip
              label={`Comprendre le critère ${criterion.id}`}
              content={
                <>
                  <strong className="block mb-1 text-white">Pourquoi c’est important</strong>
                  {criterion.plain}
                  <span className="mt-2 block text-text-dim">{COVERAGE_META[criterion.coverage]}.</span>
                </>
              }
            />
            <span className="rounded border border-border px-1 text-[10px] text-text-dim">{criterion.level}</span>
            <span className="text-[10px] text-text-dim whitespace-nowrap">WCAG {criterion.wcag.join(', ')}</span>
            {review && <span className="text-[10px] text-info-soft whitespace-nowrap">évalué manuellement</span>}
          </span>
        </span>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border-strong px-2.5 py-1 text-xs text-text-muted hover:bg-raise hover:text-white"
        >
          <span className="tabular-nums">
            {openIssues.length > 0
              ? `${openIssues.length} non-conformité${openIssues.length > 1 ? 's' : ''}`
              : onReview
                ? 'Évaluer'
                : 'Détail'}
          </span>
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-border px-4 py-3 space-y-3">
          {linked.length > 0 && (
            <ul className="space-y-2">
              {linked.map((i) => (
                <li key={i.id} className="flex items-center gap-2 text-xs">
                  <Badge className={`${SEVERITY_META[i.severity].className} shrink-0`}>
                    {SEVERITY_META[i.severity].label}
                  </Badge>
                  <span className="min-w-0 flex-1 truncate text-text-soft">{i.title}</span>
                  {i.page_url && <span className="hidden md:inline shrink-0 max-w-56 truncate text-text-dim">{i.page_url}</span>}
                  {(i.status === 'fixed' || i.status === 'false_positive') && (
                    <Badge className="bg-success-bg/60 text-success-soft border-success/40 shrink-0">Traitée</Badge>
                  )}
                </li>
              ))}
            </ul>
          )}

          {reviewable && (
            <div className="rounded-[10px] border border-border bg-bg px-3.5 py-3">
              <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2">
                Évaluation manuelle (méthode RGAA)
              </p>
              <div className="flex flex-wrap gap-2" role="group" aria-label={`Évaluer le critère ${criterion.id}`}>
                {REVIEW_OPTIONS.map((opt) => (
                  <button
                    key={opt.status}
                    type="button"
                    disabled={reviewPending}
                    aria-pressed={review?.status === opt.status}
                    onClick={() =>
                      onReview!({
                        criterionId: criterion.id,
                        status: opt.status,
                        note: note.trim() || undefined,
                        existingId: review?.id,
                      })
                    }
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                      review?.status === opt.status
                        ? opt.activeClass
                        : 'border-border-strong text-text-muted hover:bg-raise hover:text-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
                {review && (
                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={reviewPending}
                    onClick={() => onReview!({ criterionId: criterion.id, status: null, existingId: review.id })}
                  >
                    Réinitialiser
                  </Button>
                )}
              </div>
              <label htmlFor={`note-${criterion.id}`} className="mt-3 mb-1 block text-xs text-text-dim">
                Note (facultative — utile pour justifier une dérogation ou un « non applicable ») :
              </label>
              <textarea
                id={`note-${criterion.id}`}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={2}
                className="w-full rounded-[8px] border border-border bg-surface px-3 py-2 text-xs text-text-soft"
                placeholder="Ex. : aucun contenu multimédia sur le site."
              />
            </div>
          )}

          {!reviewable && onReview && openIssues.length > 0 && (
            <p className="text-xs text-text-dim">
              Ce critère a des non-conformités détectées par le moteur : corrigez-les (ou marquez-les en faux
              positif) avant de l'évaluer manuellement.
            </p>
          )}

          <a
            href={rgaaCriterionUrl(criterion.id)}
            target="_blank"
            rel="noreferrer"
            className="inline-block text-xs text-link underline hover:text-white"
          >
            Texte officiel du critère {criterion.id} et ses tests (accessibilite.numerique.gouv.fr) ↗
          </a>
        </div>
      )}
    </li>
  )
}
