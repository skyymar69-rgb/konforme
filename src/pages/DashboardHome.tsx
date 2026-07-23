import { lazy, Suspense, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Seo } from '@/components/Seo'
import { useAuth } from '@/contexts/AuthContext'
import { countCriticalIssues, useAlerts, useMarkAlertRead, useMembership, useScans, useSites } from '@/lib/queries'
import { scoreColor } from '@/lib/format'
import type { ScorePoint } from '@/components/ScoreChart'

const ScoreChart = lazy(() => import('@/components/ScoreChart'))

export function DashboardHome() {
  const { user } = useAuth()
  const name = user?.name?.split(' ')[0] || 'à vous'
  const { data: membership } = useMembership()
  const orgId = membership?.organization_id
  const { data: sites } = useSites(orgId)
  const { data: scans } = useScans(orgId)
  const { data: alerts } = useAlerts(orgId)
  const markRead = useMarkAlertRead()
  const unreadAlerts = useMemo(() => (alerts ?? []).filter((a) => !a.read), [alerts])

  const doneScans = useMemo(() => (scans ?? []).filter((s) => s.status === 'done'), [scans])

  // Issues critiques ouvertes sur le dernier scan terminé de chaque site
  const latestIds = useMemo(
    () => latestScanPerSite(doneScans).map((s) => s.id),
    [doneScans],
  )
  const { data: criticalCount } = useQuery({
    queryKey: ['critical-count', orgId, latestIds.join(',')],
    enabled: latestIds.length > 0,
    queryFn: () => countCriticalIssues(latestIds),
  })

  const stats = useMemo(() => {
    const latest = latestScanPerSite(doneScans)
    const scores = latest.map((s) => s.score).filter((s): s is number => s !== null)
    const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null
    return {
      sitesCount: sites?.length ?? 0,
      avgScore: avg,
      eaa: avg === null ? null : avg >= 100 ? 'Conforme' : avg >= 50 ? 'Partielle' : 'Non conforme',
    }
  }, [sites, doneScans])

  const chartData: ScorePoint[] = useMemo(
    () =>
      [...doneScans]
        .reverse()
        .filter((s) => s.score !== null)
        .slice(-20)
        .map((s) => ({
          date: new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit' }).format(
            new Date(s.created_at),
          ),
          score: Math.round(s.score!),
          site: s.sites?.name ?? '',
        })),
    [doneScans],
  )

  const hasSites = (sites?.length ?? 0) > 0

  return (
    <div className="space-y-8">
      <Seo title="Tableau de bord" description="État de l'accessibilité de vos sites." path="/dashboard" noindex />
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Bonjour, <span className="gradient-text">{name}</span>
          </h1>
          <p className="text-text-muted mt-1">Voici l'état de l'accessibilité de vos sites.</p>
        </div>
        <Link to="/dashboard/sites">
          <Button variant="primary">+ Ajouter un site</Button>
        </Link>
      </header>

      {unreadAlerts.length > 0 && (
        <section aria-label="Alertes de régression" className="space-y-2">
          {unreadAlerts.map((a) => (
            <div
              key={a.id}
              role="alert"
              className="flex flex-wrap items-center gap-3 rounded-[12px] border border-danger/40 bg-danger-bg/25 px-4 py-3"
            >
              <span aria-hidden="true" className="text-lg">⚠️</span>
              <span className="min-w-0 flex-1 text-sm text-text-soft">{a.message}</span>
              {a.scan_id && (
                <Link to={`/dashboard/scans/${a.scan_id}`}>
                  <Button size="sm" variant="outline">Voir le rapport</Button>
                </Link>
              )}
              <Button
                size="sm"
                variant="ghost"
                disabled={markRead.isPending}
                onClick={() => markRead.mutate(a.id)}
              >
                Marquer comme lue
              </Button>
            </div>
          ))}
        </section>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Sites surveillés"
          value={String(stats.sitesCount)}
          hint={hasSites ? 'Sites suivis par Konforme' : 'Ajoutez votre premier site'}
          accent="var(--color-primary)"
        />
        <KpiCard
          label="Score moyen"
          value={stats.avgScore !== null ? `${stats.avgScore}%` : '—'}
          hint={stats.avgScore !== null ? 'Dernier audit par site' : 'Lancez votre premier scan'}
          accent={stats.avgScore !== null ? scoreColor(stats.avgScore) : 'var(--color-accent)'}
        />
        <KpiCard
          label="Issues critiques"
          value={String(criticalCount ?? 0)}
          hint="À corriger en priorité"
          accent="var(--color-danger)"
        />
        <KpiCard
          label="Conformité EAA"
          value={stats.eaa ?? '—'}
          hint="Statut global (WCAG 2.2)"
          accent="var(--color-success)"
        />
      </div>

      {chartData.length >= 2 && (
        <Card>
          <h2 className="text-lg font-bold mb-1">Évolution du score</h2>
          <p className="text-sm text-text-muted mb-4">
            Taux de conformité des {chartData.length} derniers audits.
          </p>
          <Suspense fallback={<div className="h-[260px] rounded-[10px] bg-raise animate-pulse" aria-hidden="true" />}>
            <ScoreChart data={chartData} />
          </Suspense>
        </Card>
      )}

      {!hasSites && (
        <Card>
          <h2 className="text-lg font-bold mb-1">Démarrez votre audit</h2>
          <p className="text-sm text-text-muted mb-6">
            Quatre étapes pour mettre vos sites en conformité RGAA &amp; WCAG.
          </p>
          <ol className="space-y-3">
            {[
              { title: 'Ajoutez votre premier site', desc: 'URL et nom du site, en 30 secondes.' },
              { title: 'Lancez un scan complet', desc: "Jusqu'à 5 pages analysées sur ~30 règles RGAA 4.1.2 / WCAG 2.2." },
              { title: 'Corrigez avec les suggestions', desc: 'Chaque non-conformité vient avec le code concerné et la correction.' },
              { title: 'Générez votre déclaration légale', desc: "Document conforme à l'article 47 de la loi de 2005, prêt à publier." },
            ].map((step, i) => (
              <li key={step.title} className="flex gap-4 items-start">
                <span
                  className="size-8 shrink-0 rounded-[10px] bg-gradient-to-br from-primary to-accent-deep flex items-center justify-center text-white text-sm font-bold"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-text">{step.title}</h3>
                  <p className="text-sm text-text-muted">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-6">
            <Link to="/dashboard/sites">
              <Button variant="primary">Ajouter un site</Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  )
}

/** Garde le scan terminé le plus récent de chaque site. */
function latestScanPerSite<T extends { site_id: string; created_at: string }>(scans: T[]): T[] {
  const bySite = new Map<string, T>()
  for (const s of scans) {
    const cur = bySite.get(s.site_id)
    if (!cur || s.created_at > cur.created_at) bySite.set(s.site_id, s)
  }
  return [...bySite.values()]
}

function KpiCard({
  label,
  value,
  hint,
  accent,
}: {
  label: string
  value: string
  hint: string
  accent: string
}) {
  return (
    <Card className="relative overflow-hidden p-5">
      <div
        aria-hidden="true"
        className="absolute -top-12 -right-12 size-28 rounded-full opacity-20 blur-2xl"
        style={{ background: accent }}
      />
      <div className="text-xs font-semibold uppercase tracking-wider text-text-muted">{label}</div>
      <div className="mt-2 text-3xl font-extrabold tracking-tight">{value}</div>
      <div className="mt-1 text-xs text-text-dim">{hint}</div>
    </Card>
  )
}
