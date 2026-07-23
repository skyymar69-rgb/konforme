import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ScoreRing } from '@/components/ScoreRing'
import { Seo } from '@/components/Seo'
import { RgaaCriteriaList } from '@/components/report/RgaaCriteriaList'
import { computeConformity } from '@/lib/conformity'
import type { CriterionReview, Severity } from '@/lib/database.types'
import { formatDate, scoreColor, SEVERITY_META } from '@/lib/format'
import { fetchSharedReport } from '@/lib/queries'

const SEVERITY_ORDER: Severity[] = ['critical', 'serious', 'moderate', 'minor']

/**
 * Rapport d'audit partagé en lecture seule (lien public /r/:token).
 * Permet à une agence ou un prestataire de partager le rapport avec son
 * client, ou à une entreprise de le transmettre à un donneur d'ordre —
 * sans créer de compte.
 */
export function PublicReport() {
  const { token } = useParams<{ token: string }>()
  const { data, isLoading, error } = useQuery({
    queryKey: ['shared-report', token],
    enabled: !!token,
    retry: 1,
    queryFn: () => fetchSharedReport(token!),
  })

  const reviews: CriterionReview[] = useMemo(
    () =>
      (data?.reviews ?? []).map((r) => ({
        id: `pub-${r.criterion_id}`,
        site_id: '',
        organization_id: '',
        criterion_id: r.criterion_id,
        status: r.status,
        note: r.note,
        reviewed_at: r.reviewed_at,
        created_at: r.reviewed_at,
      })),
    [data],
  )
  const conformity = useMemo(
    () => computeConformity(data?.issues ?? [], undefined, reviews),
    [data, reviews],
  )

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-14 space-y-6" role="status" aria-label="Chargement du rapport">
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

  if (error || !data) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <Seo title="Rapport introuvable" description="Ce lien de partage n'est plus valide." path="/r" noindex />
        <h1 className="text-2xl font-bold mb-3">Rapport introuvable</h1>
        <p className="text-text-muted mb-6">
          Ce lien de partage est invalide ou a été révoqué par le propriétaire du rapport.
        </p>
        <Link to="/">
          <Button variant="primary">Auditer mon propre site gratuitement</Button>
        </Link>
      </div>
    )
  }

  const open = data.issues.filter((i) => i.status === 'open' || i.status === 'in_progress')

  return (
    <div className="mx-auto max-w-5xl px-6 py-14 space-y-6">
      <Seo
        title={`Rapport d'accessibilité — ${data.site.name}`}
        description="Rapport d'audit d'accessibilité RGAA partagé en lecture seule."
        path={`/r/${token}`}
        noindex
      />

      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-link mb-2">
          Rapport d'audit partagé · lecture seule
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight">
          {data.site.name}
        </h1>
        <p className="text-text-muted mt-1">
          {data.site.url && (
            <a href={data.site.url} target="_blank" rel="noreferrer" className="underline hover:text-white">
              {data.site.url}
            </a>
          )}{' '}
          · Audit RGAA 4.1.2 du {formatDate(data.scan.created_at, true)} · {data.scan.pages_count} page
          {data.scan.pages_count > 1 ? 's' : ''} analysée{data.scan.pages_count > 1 ? 's' : ''}
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="flex items-center gap-5">
          <ScoreRing score={data.scan.score} label="Taux de conformité global" />
          <div className="text-sm font-semibold">Conformité globale</div>
        </Card>
        <Card className="flex items-center gap-5">
          <ScoreRing score={data.scan.rgaa_score} size={72} label="Score RGAA 4.1.2" />
          <div className="text-sm font-semibold">RGAA 4.1.2</div>
        </Card>
        <Card className="flex items-center gap-5">
          <ScoreRing score={data.scan.wcag_score} size={72} label="Score WCAG 2.2 AA" />
          <div className="text-sm font-semibold">WCAG 2.2 AA</div>
        </Card>
        <Card className="flex items-center gap-5">
          <ScoreRing score={conformity.rate} size={72} label="Taux de conformité RGAA sur les critères évalués" />
          <div>
            <div className="text-sm font-semibold">Taux RGAA officiel</div>
            <p className="text-xs text-text-dim mt-1">
              {conformity.ok} conformes · {conformity.nonConformes} NC · {conformity.aVerifier} à vérifier
            </p>
          </div>
        </Card>
      </div>

      {(data.scan.page_scores?.length ?? 0) > 1 && (
        <Card>
          <h2 className="text-lg font-bold mb-4">Score par page</h2>
          <ul className="space-y-2">
            {data.scan.page_scores!.map((p) => (
              <li key={p.url} className="flex items-center gap-3 rounded-[10px] border border-border px-4 py-2.5 text-sm">
                <span className="shrink-0 font-bold tabular-nums w-12 text-right" style={{ color: scoreColor(p.score) }}>
                  {p.score !== null ? `${Math.round(p.score)}%` : '—'}
                </span>
                <span className="flex-1 min-w-0 truncate text-text-soft">{p.url}</span>
                <span className="shrink-0 text-xs text-text-dim">{p.issues} issue{p.issues > 1 ? 's' : ''}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Card>
        <h2 className="text-lg font-bold mb-1">Les 106 critères du RGAA 4.1.2</h2>
        <p className="text-xs text-text-dim mb-5">
          Statut de chaque critère selon la méthode officielle. Survolez le « ? » pour une explication
          en français courant.
        </p>
        <RgaaCriteriaList issues={data.issues} reviews={reviews} />
      </Card>

      <Card>
        <h2 className="text-lg font-bold mb-4">
          Non-conformités ouvertes <span className="text-text-dim font-normal">({open.length})</span>
        </h2>
        {open.length === 0 ? (
          <p className="text-sm text-text-muted py-6 text-center">
            🎉 Aucune non-conformité ouverte sur les règles automatisables.
          </p>
        ) : (
          <ul className="space-y-2">
            {SEVERITY_ORDER.flatMap((sev) =>
              open
                .filter((i) => i.severity === sev)
                .map((i) => (
                  <li key={i.id} className="flex items-center gap-3 rounded-[10px] border border-border px-4 py-2.5 text-sm">
                    <Badge className={`${SEVERITY_META[i.severity].className} shrink-0`}>
                      {SEVERITY_META[i.severity].label}
                    </Badge>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold">{i.title}</span>
                      <span className="block truncate text-xs text-text-dim">
                        {i.rule_id}
                        {i.page_url ? ` · ${i.page_url}` : ''}
                      </span>
                    </span>
                  </li>
                )),
            )}
          </ul>
        )}
      </Card>

      <Card className="text-center py-8">
        <p className="text-sm text-text-muted mb-4">
          Ce rapport a été généré avec Konforme — audit d'accessibilité RGAA / EAA automatisé, évaluation
          manuelle intégrée et déclaration légale.
        </p>
        <Link to="/">
          <Button variant="primary">Auditer mon site gratuitement</Button>
        </Link>
      </Card>
    </div>
  )
}
