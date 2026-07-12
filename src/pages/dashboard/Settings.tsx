import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Seo } from '@/components/Seo'
import { useAuth } from '@/contexts/AuthContext'
import { useMembership, useProfile, useUpdateOrganization, useUpdateProfile } from '@/lib/queries'

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
        <p className="text-[#a3b0c9] mt-1">Votre compte et votre organisation.</p>
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
              className="w-full rounded-[10px] border border-[#2a3654] bg-[#131a2c] px-3.5 py-2.5 text-sm text-[#a3b0c9]"
            />
            <p className="mt-1 text-xs text-[#8b98b8]">Géré par votre compte Google.</p>
          </div>
          <div>
            <label htmlFor="pf-name" className="block text-sm font-semibold mb-1.5">Nom complet</label>
            <input
              id="pf-name"
              name="full_name"
              type="text"
              defaultValue={profile?.full_name ?? ''}
              autoComplete="name"
              className="w-full rounded-[10px] border border-[#3b4970] bg-[#0a0e1a] px-3.5 py-2.5 text-sm text-[#f1f5fb]"
            />
          </div>
          {profileMsg && <p role="status" className="text-sm text-[#bbf7d0]">{profileMsg}</p>}
          <Button type="submit" variant="primary" size="sm" disabled={updateProfile.isPending}>
            {updateProfile.isPending ? 'Enregistrement…' : 'Enregistrer'}
          </Button>
        </form>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Organisation</h2>
          <Badge className="border-[#3b4970] text-[#a3b0c9]">
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
              className="w-full rounded-[10px] border border-[#3b4970] bg-[#0a0e1a] px-3.5 py-2.5 text-sm text-[#f1f5fb] disabled:opacity-60"
            />
            {!isAdmin && (
              <p className="mt-1 text-xs text-[#8b98b8]">Seul un administrateur peut modifier ce nom.</p>
            )}
          </div>
          {orgMsg && <p role="status" className="text-sm text-[#bbf7d0]">{orgMsg}</p>}
          {isAdmin && (
            <Button type="submit" variant="primary" size="sm" disabled={updateOrg.isPending}>
              {updateOrg.isPending ? 'Enregistrement…' : 'Enregistrer'}
            </Button>
          )}
        </form>
      </Card>

      <Card>
        <h2 className="text-lg font-bold mb-2">Session</h2>
        <p className="text-sm text-[#a3b0c9] mb-4">Vous êtes connecté avec {user?.email}.</p>
        <Button variant="ghost" onClick={() => signOut()}>Se déconnecter</Button>
      </Card>
    </div>
  )
}
