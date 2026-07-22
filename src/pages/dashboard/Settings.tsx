import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Seo } from '@/components/Seo'
import { useAuth } from '@/contexts/AuthContext'
import {
  useMembership,
  useProfile,
  useScans,
  useSites,
  useUpdateOrganization,
  useUpdateProfile,
} from '@/lib/queries'
import { PLANS, scansUsedThisMonth } from '@/lib/plans'

export function Settings() {
  const { user, signOut } = useAuth()
  const { data: profile } = useProfile()
  const { data: membership } = useMembership()
  const updateProfile = useUpdateProfile()
  const updateOrg = useUpdateOrganization(membership?.organization_id)

  const [profileMsg, setProfileMsg] = useState<string | null>(null)
  const [orgMsg, setOrgMsg] = useState<string | null>(null)

  const org = membership?.organizations
  const isAdmin = membership?.role === 'owner' || membership?.role === 'admin'
  const plan = PLANS[org?.plan ?? 'free']
  const { data: sites } = useSites(membership?.organization_id)
  const { data: scans } = useScans(membership?.organization_id)
  const usedScans = scansUsedThisMonth(scans)

  async function onSaveProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setProfileMsg(null)
    const fd = new FormData(e.currentTarget)
    try {
      await updateProfile.mutateAsync({ full_name: String(fd.get('full_name') ?? '').trim() })
      setProfileMsg('Profil mis à jour.')
    } catch (err) {
      setProfileMsg(err instanceof Error ? err.message : 'Erreur lors de la mise à jour.')
    }
  }

  async function onSaveOrg(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setOrgMsg(null)
    const fd = new FormData(e.currentTarget)
    try {
      await updateOrg.mutateAsync({ name: String(fd.get('org_name') ?? '').trim() })
      setOrgMsg('Organisation mise à jour.')
    } catch (err) {
      setOrgMsg(err instanceof Error ? err.message : 'Erreur lors de la mise à jour.')
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <Seo title="Paramètres" description="Compte et organisation." path="/dashboard/settings" noindex />
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Paramètres</h1>
        <p className="text-text-muted mt-1">Votre compte et votre organisation.</p>
      </header>

      <Card>
        <h2 className="text-lg font-bold mb-4">Profil</h2>
        <form onSubmit={onSaveProfile} className="space-y-4">
          <div>
            <label htmlFor="pf-email" className="block text-sm font-semibold mb-1.5">Email</label>
            <input
              id="pf-email"
              type="email"
              value={user?.email ?? ''}
              disabled
              className="w-full rounded-[10px] border border-border bg-surface px-3.5 py-2.5 text-sm text-text-muted"
            />
            <p className="mt-1 text-xs text-text-dim">Géré par votre compte Google.</p>
          </div>
          <div>
            <label htmlFor="pf-name" className="block text-sm font-semibold mb-1.5">Nom complet</label>
            <input
              id="pf-name"
              name="full_name"
              type="text"
              defaultValue={profile?.full_name ?? ''}
              autoComplete="name"
              className="w-full rounded-[10px] border border-border-strong bg-bg px-3.5 py-2.5 text-sm text-text"
            />
          </div>
          {profileMsg && <p role="status" className="text-sm text-success-soft">{profileMsg}</p>}
          <Button type="submit" variant="primary" size="sm" disabled={updateProfile.isPending}>
            {updateProfile.isPending ? 'Enregistrement…' : 'Enregistrer'}
          </Button>
        </form>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Organisation</h2>
          <Badge className="border-border-strong text-text-muted">
            Plan {org?.plan === 'free' ? 'Gratuit' : org?.plan === 'pro' ? 'Pro' : 'Entreprise'}
          </Badge>
        </div>
        <form onSubmit={onSaveOrg} className="space-y-4">
          <div>
            <label htmlFor="org-name" className="block text-sm font-semibold mb-1.5">Nom de l'organisation</label>
            <input
              id="org-name"
              name="org_name"
              type="text"
              defaultValue={org?.name ?? ''}
              disabled={!isAdmin}
              className="w-full rounded-[10px] border border-border-strong bg-bg px-3.5 py-2.5 text-sm text-text disabled:opacity-60"
            />
            {!isAdmin && (
              <p className="mt-1 text-xs text-text-dim">Seul un administrateur peut modifier ce nom.</p>
            )}
          </div>
          {orgMsg && <p role="status" className="text-sm text-success-soft">{orgMsg}</p>}
          {isAdmin && (
            <Button type="submit" variant="primary" size="sm" disabled={updateOrg.isPending}>
              {updateOrg.isPending ? 'Enregistrement…' : 'Enregistrer'}
            </Button>
          )}
        </form>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Abonnement</h2>
          <Badge className="border-border-strong text-text-muted">
            {(membership?.trial_days_left ?? 0) > 0
              ? `Essai Pro — ${membership!.trial_days_left} j restants`
              : `${plan.name} — ${plan.price}${plan.id !== 'enterprise' ? `/${plan.period.replace('par ', '')}` : ''}`}
          </Badge>
        </div>
        <dl className="grid gap-3 sm:grid-cols-2 text-sm">
          <div className="rounded-[10px] border border-border px-4 py-3">
            <dt className="text-xs text-text-dim">Sites surveillés</dt>
            <dd className="mt-1 font-bold">
              {sites?.length ?? '—'} / {Number.isFinite(plan.maxSites) ? plan.maxSites : '∞'}
            </dd>
          </div>
          <div className="rounded-[10px] border border-border px-4 py-3">
            <dt className="text-xs text-text-dim">Audits ce mois-ci</dt>
            <dd className="mt-1 font-bold">
              {scans ? usedScans : '—'} / {Number.isFinite(plan.scansPerMonth) ? plan.scansPerMonth : '∞'}
            </dd>
          </div>
        </dl>
        {plan.id === 'free' && (
          <p className="mt-4 text-sm text-text-muted">
            Besoin de plus de sites ou d'audits ?{' '}
            <Link to="/tarifs" className="text-link font-semibold hover:underline">
              Découvrir le plan Pro
            </Link>
          </p>
        )}
      </Card>

      <Card>
        <h2 className="text-lg font-bold mb-2">Session</h2>
        <p className="text-sm text-text-muted mb-4">Vous êtes connecté avec {user?.email}.</p>
        <Button variant="ghost" onClick={() => signOut()}>Se déconnecter</Button>
      </Card>
    </div>
  )
}
