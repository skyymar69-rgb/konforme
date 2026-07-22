import { useState } from 'react'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Seo } from '@/components/Seo'
import {
  useAddSite,
  useDeleteSite,
  useLaunchScan,
  useMembership,
  useScans,
  useSites,
  useUpdateSite,
} from '@/lib/queries'
import { formatDate, scoreColor } from '@/lib/format'
import { PLANS, scansUsedThisMonth, type PlanId } from '@/lib/plans'
import type { Site } from '@/lib/database.types'

const siteSchema = z.object({
  name: z.string().trim().min(2, 'Nom trop court (2 caractères minimum)'),
  url: z
    .string()
    .trim()
    .url('URL invalide — incluez le protocole, ex. https://exemple.fr')
    .refine((u) => u.startsWith('http://') || u.startsWith('https://'), 'Seuls http(s) sont acceptés'),
})

export function Sites() {
  const { data: membership, isLoading: orgLoading } = useMembership()
  const orgId = membership?.organization_id
  const plan: PlanId = membership?.organizations.plan ?? 'free'
  const { data: sites, isLoading } = useSites(orgId)
  const { data: scans } = useScans(orgId)
  const [formOpen, setFormOpen] = useState(false)

  const limits = PLANS[plan]
  const usedScans = scansUsedThisMonth(scans)
  const siteLimitReached = (sites?.length ?? 0) >= limits.maxSites

  return (
    <div className="space-y-6">
      <Seo title="Sites" description="Gérez les sites surveillés par Konforme." path="/dashboard/sites" noindex />
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sites</h1>
          <p className="text-[#a3b0c9] mt-1">Ajoutez un site puis lancez un audit d'accessibilité.</p>
          {sites && (
            <p className="text-xs text-[#8b98b8] mt-1.5">
              Plan {limits.name}
              {(membership?.trial_days_left ?? 0) > 0 && (
                <span className="text-[#67e8f9]"> (essai — {membership!.trial_days_left} j restants)</span>
              )}{' '}
              · {sites.length}/{Number.isFinite(limits.maxSites) ? limits.maxSites : '∞'} site{limits.maxSites > 1 ? 's' : ''} ·{' '}
              {usedScans}/{Number.isFinite(limits.scansPerMonth) ? limits.scansPerMonth : '∞'} audits ce mois-ci
            </p>
          )}
        </div>
        <Button variant="primary" onClick={() => setFormOpen((o) => !o)} aria-expanded={formOpen}>
          {formOpen ? 'Fermer' : '+ Ajouter un site'}
        </Button>
      </header>

      {siteLimitReached && !formOpen && (
        <p className="rounded-[10px] border border-[#38bdf8]/30 bg-[#1e3a5f]/30 px-4 py-2.5 text-sm text-[#bae6fd]">
          Vous avez atteint la limite de votre plan {limits.name}.{' '}
          <Link to="/tarifs" className="font-semibold underline hover:text-white">
            Découvrir le plan Pro
          </Link>
        </p>
      )}

      {formOpen && orgId && <AddSiteForm orgId={orgId} plan={plan} onDone={() => setFormOpen(false)} />}

      {(isLoading || orgLoading) && <p role="status" className="text-[#a3b0c9]">Chargement des sites…</p>}

      {!isLoading && !orgLoading && (sites?.length ?? 0) === 0 && (
        <Card className="text-center py-14">
          <h2 className="text-lg font-bold mb-2">Aucun site pour le moment</h2>
          <p className="text-sm text-[#a3b0c9] mb-6 max-w-md mx-auto">
            Ajoutez l'URL de votre site pour lancer votre premier audit RGAA / WCAG. L'analyse
            couvre jusqu'à 5 pages et dure environ une minute.
          </p>
          <Button variant="primary" onClick={() => setFormOpen(true)}>
            Ajouter mon premier site
          </Button>
        </Card>
      )}

      <ul className="grid gap-4 md:grid-cols-2" aria-label="Liste des sites">
        {sites?.map((site) => (
          <li key={site.id}>
            <SiteCard site={site} plan={plan} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function AddSiteForm({ orgId, plan, onDone }: { orgId: string; plan: PlanId; onDone: () => void }) {
  const addSite = useAddSite(orgId, plan)
  const launchScan = useLaunchScan(plan)
  const [errors, setErrors] = useState<{ name?: string; url?: string; global?: string }>({})

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const parsed = siteSchema.safeParse({ name: fd.get('name'), url: fd.get('url') })
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors
      setErrors({ name: flat.name?.[0], url: flat.url?.[0] })
      return
    }
    setErrors({})
    try {
      const site = await addSite.mutateAsync(parsed.data)
      // Lance immédiatement le premier audit (non bloquant pour l'UI)
      launchScan.mutate(site)
      onDone()
    } catch (err) {
      setErrors({ global: err instanceof Error ? err.message : "Impossible d'ajouter le site." })
    }
  }

  return (
    <Card>
      <form onSubmit={onSubmit} noValidate>
        <h2 className="text-lg font-bold mb-4">Nouveau site</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="site-name" className="block text-sm font-semibold mb-1.5">
              Nom du site
            </label>
            <input
              id="site-name"
              name="name"
              type="text"
              required
              autoComplete="off"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'site-name-error' : undefined}
              className="w-full rounded-[10px] border border-[#3b4970] bg-[#0a0e1a] px-3.5 py-2.5 text-sm text-[#f1f5fb] placeholder:text-[#8b98b8]"
              placeholder="Mon site vitrine"
            />
            {errors.name && (
              <p id="site-name-error" className="mt-1.5 text-sm text-[#fecaca]">{errors.name}</p>
            )}
          </div>
          <div>
            <label htmlFor="site-url" className="block text-sm font-semibold mb-1.5">
              URL de la page d'accueil
            </label>
            <input
              id="site-url"
              name="url"
              type="url"
              required
              inputMode="url"
              aria-invalid={!!errors.url}
              aria-describedby={errors.url ? 'site-url-error' : undefined}
              className="w-full rounded-[10px] border border-[#3b4970] bg-[#0a0e1a] px-3.5 py-2.5 text-sm text-[#f1f5fb] placeholder:text-[#8b98b8]"
              placeholder="https://exemple.fr"
            />
            {errors.url && (
              <p id="site-url-error" className="mt-1.5 text-sm text-[#fecaca]">{errors.url}</p>
            )}
          </div>
        </div>
        {errors.global && (
          <p role="alert" className="mt-4 rounded-[10px] border border-[#f87171]/40 bg-[#7f1d1d]/30 px-4 py-2.5 text-sm text-[#fecaca]">
            {errors.global}
          </p>
        )}
        <div className="mt-5 flex gap-3">
          <Button type="submit" variant="primary" disabled={addSite.isPending}>
            {addSite.isPending ? 'Ajout…' : 'Ajouter et lancer un audit'}
          </Button>
          <Button type="button" variant="ghost" onClick={onDone}>
            Annuler
          </Button>
        </div>
      </form>
    </Card>
  )
}

function SiteCard({ site, plan }: { site: Site; plan: PlanId }) {
  const launchScan = useLaunchScan(plan)
  const deleteSite = useDeleteSite()
  const updateSite = useUpdateSite()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onScan() {
    setError(null)
    try {
      await launchScan.mutateAsync(site)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur au lancement du scan')
    }
  }

  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-bold truncate">{site.name}</h2>
          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#67e8f9] hover:underline break-all"
          >
            {site.url}
            <span className="sr-only"> (nouvelle fenêtre)</span>
          </a>
        </div>
        {site.last_score !== null && (
          <Badge className="border-[#3b4970]" >
            <span aria-hidden="true" className="size-2 rounded-full" style={{ background: scoreColor(site.last_score) }} />
            {Math.round(site.last_score)}%
          </Badge>
        )}
      </div>

      <p className="mt-3 text-xs text-[#8b98b8]">
        Dernier audit : {formatDate(site.last_scan_at, true)}
      </p>

      <label className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-[#a3b0c9]">
        <input
          type="checkbox"
          role="switch"
          checked={site.monitoring_enabled}
          disabled={updateSite.isPending}
          onChange={(e) => updateSite.mutate({ id: site.id, monitoring_enabled: e.target.checked })}
          className="size-4 accent-[#2563eb]"
        />
        Surveillance hebdomadaire automatique
        {site.monitoring_enabled && <span aria-hidden="true" className="text-[#4ade80]">●</span>}
      </label>

      {error && (
        <p role="alert" className="mt-3 rounded-[10px] border border-[#f87171]/40 bg-[#7f1d1d]/30 px-3 py-2 text-xs text-[#fecaca]">
          {error}
        </p>
      )}

      <div className="mt-4 pt-4 border-t border-[#2a3654] flex flex-wrap gap-2">
        <Button size="sm" variant="primary" onClick={onScan} disabled={launchScan.isPending}>
          {launchScan.isPending ? 'Audit en cours…' : 'Lancer un audit'}
        </Button>
        <Link to={`/dashboard/scans?site=${site.id}`}>
          <Button size="sm" variant="ghost">Historique</Button>
        </Link>
        {confirmDelete ? (
          <span className="inline-flex gap-2">
            <Button
              size="sm"
              variant="danger"
              onClick={() => deleteSite.mutate(site.id)}
              disabled={deleteSite.isPending}
            >
              Confirmer la suppression
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setConfirmDelete(false)}>
              Annuler
            </Button>
          </span>
        ) : (
          <Button size="sm" variant="ghost" onClick={() => setConfirmDelete(true)}>
            Supprimer
          </Button>
        )}
      </div>
    </Card>
  )
}
