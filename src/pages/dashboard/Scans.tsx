import { Link, useSearchParams } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Seo } from '@/components/Seo'
import { useMembership, useScans, useSites } from '@/lib/queries'
import { formatDate, formatDuration, scoreColor, STATUS_META } from '@/lib/format'

export function Scans() {
  const { data: membership } = useMembership()
  const orgId = membership?.organization_id
  const [params, setParams] = useSearchParams()
  const siteFilter = params.get('site') ?? undefined
  const { data: scans, isLoading } = useScans(orgId, siteFilter)
  const { data: sites } = useSites(orgId)

  return (
    <div className="space-y-6">
      <Seo title="Scans" description="Historique des audits d'accessibilité." path="/dashboard/scans" noindex />
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Scans</h1>
          <p className="text-[#a3b0c9] mt-1">Historique des audits d'accessibilité.</p>
        </div>
        <div>
          <label htmlFor="site-filter" className="sr-only">Filtrer par site</label>
          <select
            id="site-filter"
            value={siteFilter ?? ''}
            onChange={(e) => {
              const v = e.target.value
              setParams(v ? { site: v } : {})
            }}
            className="rounded-[10px] border border-[#3b4970] bg-[#0a0e1a] px-3 py-2 text-sm text-[#f1f5fb]"
          >
            <option value="">Tous les sites</option>
            {sites?.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
      </header>

      {isLoading && <p role="status" className="text-[#a3b0c9]">Chargement des scans…</p>}

      {!isLoading && (scans?.length ?? 0) === 0 && (
        <Card className="text-center py-14">
          <h2 className="text-lg font-bold mb-2">Aucun audit pour l'instant</h2>
          <p className="text-sm text-[#a3b0c9] mb-6">
            Lancez votre premier audit depuis la page Sites.
          </p>
          <Link to="/dashboard/sites">
            <Button variant="primary">Aller aux sites</Button>
          </Link>
        </Card>
      )}

      {(scans?.length ?? 0) > 0 && (
        <Card className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <caption className="sr-only">Historique des audits d'accessibilité</caption>
            <thead>
              <tr className="border-b border-[#2a3654] text-left text-xs uppercase tracking-wider text-[#a3b0c9]">
                <th scope="col" className="px-5 py-3.5 font-semibold">Site</th>
                <th scope="col" className="px-5 py-3.5 font-semibold">Date</th>
                <th scope="col" className="px-5 py-3.5 font-semibold">Statut</th>
                <th scope="col" className="px-5 py-3.5 font-semibold">Score</th>
                <th scope="col" className="px-5 py-3.5 font-semibold">Issues</th>
                <th scope="col" className="px-5 py-3.5 font-semibold">Pages</th>
                <th scope="col" className="px-5 py-3.5 font-semibold">Durée</th>
                <th scope="col" className="px-5 py-3.5 font-semibold"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {scans!.map((scan) => {
                const st = STATUS_META[scan.status]
                return (
                  <tr key={scan.id} className="border-b border-[#2a3654]/60 last:border-0 hover:bg-white/[0.03]">
                    <td className="px-5 py-3.5 font-medium">{scan.sites?.name ?? '—'}</td>
                    <td className="px-5 py-3.5 text-[#a3b0c9]">{formatDate(scan.created_at, true)}</td>
                    <td className="px-5 py-3.5"><Badge className={st.className}>{st.label}</Badge></td>
                    <td className="px-5 py-3.5 font-bold" style={{ color: scoreColor(scan.score) }}>
                      {scan.score !== null ? `${Math.round(scan.score)}%` : '—'}
                    </td>
                    <td className="px-5 py-3.5">{scan.status === 'done' ? scan.issues_count : '—'}</td>
                    <td className="px-5 py-3.5">{scan.status === 'done' ? scan.pages_count : '—'}</td>
                    <td className="px-5 py-3.5 text-[#a3b0c9]">{formatDuration(scan.duration_ms)}</td>
                    <td className="px-5 py-3.5">
                      {scan.status === 'done' ? (
                        <Link
                          to={`/dashboard/scans/${scan.id}`}
                          className="text-[#67e8f9] font-semibold hover:underline"
                        >
                          Rapport<span className="sr-only"> du scan de {scan.sites?.name} du {formatDate(scan.created_at)}</span>
                        </Link>
                      ) : scan.status === 'failed' ? (
                        <span className="text-xs text-[#fecaca]" title={scan.error ?? undefined}>
                          {scan.error ? scan.error.slice(0, 60) : 'Erreur'}
                        </span>
                      ) : null}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  )
}
