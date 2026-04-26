import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

const KPIS = [
  { label: 'Sites surveillés', value: 0, hint: 'Aucun site pour le moment', accent: '#2563eb' },
  { label: 'Score moyen', value: '—', hint: 'Lance ton premier scan', accent: '#06b6d4' },
  { label: 'Issues critiques', value: 0, hint: 'À corriger en priorité', accent: '#ef4444' },
  { label: 'Conformité EAA', value: '—', hint: 'Statut global', accent: '#22c55e' },
]

export function DashboardHome() {
  const { user } = useAuth()
  const name = user?.user_metadata?.full_name?.split(' ')[0] || 'à toi'

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Bonjour, <span className="gradient-text">{name}</span>
          </h1>
          <p className="text-[#a3b0c9] mt-1">Voici l'état de l'accessibilité de tes sites.</p>
        </div>
        <Link to="/dashboard/sites">
          <Button variant="primary">+ Ajouter un site</Button>
        </Link>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {KPIS.map((k) => (
          <KpiCard key={k.label} {...k} />
        ))}
      </div>

      <Card>
        <h2 className="text-lg font-bold mb-1">Démarre ton audit</h2>
        <p className="text-sm text-[#a3b0c9] mb-6">
          Quelques étapes pour mettre tes sites en conformité RGAA &amp; WCAG.
        </p>
        <ol className="space-y-3">
          {[
            { title: 'Ajoute ton premier site', desc: 'URL, nom, configuration de fréquence de scan.' },
            { title: 'Lance un scan complet', desc: '~2 minutes pour 106 critères RGAA 4.1 + 50 WCAG 2.2.' },
            { title: 'Reçois les corrections IA', desc: 'Snippets prêts à coller, validés par des experts.' },
            { title: 'Génère ta déclaration légale', desc: 'PDF conforme RGAA, signé et publiable.' },
          ].map((step, i) => (
            <li key={step.title} className="flex gap-4 items-start">
              <span
                className="size-8 shrink-0 rounded-[10px] bg-gradient-to-br from-[#2563eb] to-[#06b6d4] flex items-center justify-center text-white text-sm font-bold"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold text-[#f1f5fb]">{step.title}</h3>
                <p className="text-sm text-[#a3b0c9]">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  )
}

function KpiCard({
  label,
  value,
  hint,
  accent,
}: {
  label: string
  value: string | number
  hint: string
  accent: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [animated, setAnimated] = useState(typeof value === 'string')

  useEffect(() => {
    if (typeof value !== 'number' || animated || !ref.current) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setAnimated(true)
          obs.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [value, animated])

  return (
    <Card
      ref={ref}
      className="relative overflow-hidden p-5 hover:-translate-y-px transition-transform"
    >
      <div
        aria-hidden="true"
        className="absolute -top-12 -right-12 size-28 rounded-full opacity-20 blur-2xl"
        style={{ background: accent }}
      />
      <div className="text-xs font-semibold uppercase tracking-wider text-[#a3b0c9]">
        {label}
      </div>
      <div className="mt-2 text-3xl font-extrabold tracking-tight">
        {typeof value === 'number' ? <Counter target={animated ? value : 0} /> : value}
      </div>
      <div className="mt-1 text-xs text-[#6b7794]">{hint}</div>
    </Card>
  )
}

function Counter({ target }: { target: number }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (target === 0) {
      setN(0)
      return
    }
    let raf = 0
    const start = performance.now()
    const dur = 800
    function tick(t: number) {
      const p = Math.min(1, (t - start) / dur)
      setN(Math.round(p * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target])
  return <span>{n}</span>
}
