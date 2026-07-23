import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Seo } from '@/components/Seo'
import { useAuth } from '@/contexts/AuthContext'
import {
  useCreateDeclaration,
  useCriteriaReviews,
  useDeclarations,
  useMembership,
  useScanIssues,
  useScans,
  useSites,
} from '@/lib/queries'
import { buildDeclarationHtml, downloadDeclaration } from '@/lib/declaration'
import { computeConformity } from '@/lib/conformity'
import { CONFORMITY_META, conformityFromScore, formatDate } from '@/lib/format'
import type { Declaration } from '@/lib/database.types'

export function Declarations() {
  const { user } = useAuth()
  const { data: membership } = useMembership()
  const orgId = membership?.organization_id
  const orgName = membership?.organizations?.name ?? 'Notre organisation'
  const { data: sites } = useSites(orgId)
  const { data: scans } = useScans(orgId)
  const { data: declarations, isLoading } = useDeclarations(orgId)
  const createDecl = useCreateDeclaration(orgId)

  const [siteId, setSiteId] = useState('')
  const [error, setError] = useState<string | null>(null)

  const scannedSites = (sites ?? []).filter((s) =>
    scans?.some((sc) => sc.site_id === s.id && sc.status === 'done'),
  )

  // Dernier audit terminé du site sélectionné : le taux de la déclaration se
  // calcule selon la méthode officielle (critères conformes / évalués), en
  // intégrant les évaluations manuelles.
  const selectedLastScan = scans?.find((sc) => sc.site_id === siteId && sc.status === 'done')
  const { data: lastScanIssues } = useScanIssues(selectedLastScan?.id)
  const { data: reviews } = useCriteriaReviews(siteId || undefined)

  async function onGenerate(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const site = sites?.find((s) => s.id === siteId)
    const lastScan = selectedLastScan
    if (!site || !lastScan) {
      setError('Sélectionnez un site ayant au moins un audit terminé.')
      return
    }
    const summary = computeConformity(lastScanIssues ?? [], undefined, reviews)
    // Taux officiel si calculable, sinon repli sur le score technique du scan
    const rate =
      summary.rate ?? (lastScan.score !== null ? Math.round(lastScan.score * 10) / 10 : null)
    const level = conformityFromScore(rate)
    try {
      await createDecl.mutateAsync({
        site,
        conformity_level: level,
        conformity_rate: rate,
        contact_email: user?.email ?? 'contact@kayzen-lyon.fr',
      })
      const html = buildDeclarationHtml({
        siteName: site.name,
        siteUrl: site.url,
        orgName,
        conformityLevel: level,
        conformityRate: rate,
        contactEmail: user?.email ?? 'contact@kayzen-lyon.fr',
        auditDate: lastScan.finished_at ?? lastScan.created_at,
      })
      downloadDeclaration(html, site.name)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Génération impossible.')
    }
  }

  return (
    <div className="space-y-6">
      <Seo title="Déclarations" description="Déclarations d'accessibilité RGAA." path="/dashboard/declarations" noindex />
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Déclarations d'accessibilité</h1>
        <p className="text-text-muted mt-1">
          Document légal requis par l'article 47 de la loi n° 2005-102, généré depuis votre dernier audit.
        </p>
      </header>

      <Card>
        <h2 className="text-lg font-bold mb-4">Générer une déclaration</h2>
        {scannedSites.length === 0 ? (
          <p className="text-sm text-text-muted">
            Aucun site avec audit terminé.{' '}
            <Link to="/dashboard/sites" className="text-link hover:underline">
              Lancez d'abord un audit
            </Link>
            .
          </p>
        ) : (
          <form onSubmit={onGenerate} className="flex flex-wrap items-end gap-3">
            <div className="min-w-64">
              <label htmlFor="decl-site" className="block text-sm font-semibold mb-1.5">Site</label>
              <select
                id="decl-site"
                value={siteId}
                onChange={(e) => setSiteId(e.target.value)}
                required
                className="w-full rounded-[10px] border border-border-strong bg-bg px-3 py-2.5 text-sm text-text"
              >
                <option value="">Choisir un site…</option>
                {scannedSites.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
            <Button type="submit" variant="primary" disabled={createDecl.isPending}>
              {createDecl.isPending ? 'Génération…' : 'Générer et télécharger (HTML)'}
            </Button>
          </form>
        )}
        {error && (
          <p role="alert" className="mt-4 rounded-[10px] border border-danger/40 bg-danger-bg/30 px-4 py-2.5 text-sm text-danger-soft">
            {error}
          </p>
        )}
        <p className="mt-4 text-xs text-text-dim">
          Le document généré suit le modèle officiel : état de conformité, résultats des tests,
          retour d'information et voies de recours (Défenseur des droits). Publiez-le sur une page
          « /accessibilite » de votre site.
        </p>
      </Card>

      <Card>
        <h2 className="text-lg font-bold mb-4">Historique</h2>
        {isLoading && <p role="status" className="text-sm text-text-muted">Chargement…</p>}
        {!isLoading && (declarations?.length ?? 0) === 0 && (
          <p className="text-sm text-text-muted">Aucune déclaration générée pour l'instant.</p>
        )}
        <ul className="divide-y divide-border/60">
          {declarations?.map((d) => (
            <DeclarationRow key={d.id} decl={d} orgName={orgName} contactEmail={user?.email ?? ''} />
          ))}
        </ul>
      </Card>
    </div>
  )
}

function DeclarationRow({
  decl,
  orgName,
  contactEmail,
}: {
  decl: Declaration
  orgName: string
  contactEmail: string
}) {
  function redownload() {
    const html = buildDeclarationHtml({
      siteName: decl.sites?.name ?? 'Site',
      siteUrl: decl.sites?.url ?? '',
      orgName,
      conformityLevel: decl.conformity_level,
      conformityRate: decl.conformity_rate,
      contactEmail: decl.contact_email ?? contactEmail,
      auditDate: decl.published_at,
    })
    downloadDeclaration(html, decl.sites?.name ?? 'site')
  }

  return (
    <li className="flex flex-wrap items-center justify-between gap-3 py-3.5">
      <div>
        <div className="font-semibold text-sm">{decl.sites?.name ?? '—'}</div>
        <div className="text-xs text-text-dim">
          {formatDate(decl.published_at)} · {decl.reference_standard}
          {decl.conformity_rate !== null ? ` · ${decl.conformity_rate}%` : ''}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge
          className={
            decl.conformity_level === 'total'
              ? 'bg-success-bg/60 text-success-soft border-success/40'
              : decl.conformity_level === 'partial'
                ? 'bg-warning-bg/60 text-warning-soft border-warning/40'
                : 'bg-danger-bg/60 text-danger-soft border-danger/40'
          }
        >
          {CONFORMITY_META[decl.conformity_level]}
        </Badge>
        <Button size="sm" variant="ghost" onClick={redownload}>
          Télécharger
        </Button>
      </div>
    </li>
  )
}
