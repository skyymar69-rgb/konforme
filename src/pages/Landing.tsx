import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { ORGANIZATION_JSONLD, Seo, SOFTWARE_JSONLD } from '@/components/Seo'
import { PublicChecker } from '@/components/PublicChecker'

const HERO_WORDS = ['site vitrine', 'e-commerce', 'application web', 'intranet']

function AnimatedWord() {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI((v) => (v + 1) % HERO_WORDS.length), 2400)
    return () => clearInterval(t)
  }, [])
  return (
    <>
      <span className="sr-only">site web</span>
      <span aria-hidden="true" className="text-link inline-block min-w-[7ch]">
        {HERO_WORDS[i]}
      </span>
    </>
  )
}

/** Aperçu stylisé (décoratif) d'un rapport Konforme, en pur CSS/SVG. */
function ProductMockup() {
  const ring = (pct: number, color: string, size = 84) => {
    const stroke = size / 11
    const r = (size - stroke) / 2
    const c = 2 * Math.PI * r
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-border)" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={`${(pct / 100) * c} ${c}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fill="var(--color-text)" fontSize={size / 4} fontWeight="800">
          {pct}%
        </text>
      </svg>
    )
  }
  return (
    <div aria-hidden="true" className="relative select-none">
      <div className="rounded-[16px] border border-border bg-bg-deep shadow-[0_30px_80px_rgba(0,0,0,0.5)] overflow-hidden">
        <div className="flex items-center gap-1.5 border-b border-border bg-surface px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-danger/70" />
          <span className="size-2.5 rounded-full bg-warning/70" />
          <span className="size-2.5 rounded-full bg-success/70" />
          <span className="ml-3 flex-1 truncate rounded-[6px] bg-bg px-3 py-1 text-[0.65rem] text-text-dim">
            konforme — rapport d'audit · votre-site.fr
          </span>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-4">
            {ring(87, 'var(--color-success)')}
            <div className="flex-1 space-y-2">
              <div className="h-2.5 w-2/3 rounded bg-border" />
              <div className="h-2 w-1/2 rounded bg-border" />
              <div className="flex gap-2 pt-1">
                <span className="rounded-full bg-success-bg/70 px-2 py-0.5 text-[0.6rem] font-bold text-success-soft">RGAA 85%</span>
                <span className="rounded-full bg-success-bg/70 px-2 py-0.5 text-[0.6rem] font-bold text-success-soft">WCAG 92%</span>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {[
              { c: 'bg-danger-bg/70 text-danger-soft', label: 'Critique', w: 'w-3/4' },
              { c: 'bg-warning-bg/70 text-warning-soft', label: 'Modéré', w: 'w-2/3' },
              { c: 'bg-info-bg/70 text-info-soft', label: 'Mineur', w: 'w-1/2' },
            ].map((row) => (
              <div key={row.label} className="flex items-center gap-2.5 rounded-[10px] border border-border px-3 py-2">
                <span className={`rounded-full px-2 py-0.5 text-[0.6rem] font-bold ${row.c}`}>{row.label}</span>
                <span className={`h-2 rounded bg-border ${row.w}`} />
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between rounded-[10px] border border-success/30 bg-success-bg/25 px-3 py-2">
            <span className="text-[0.65rem] font-semibold text-success-soft">Déclaration d'accessibilité générée</span>
            <span className="text-[0.65rem] font-bold text-success">✓ prête à publier</span>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-4 -left-4 rounded-[12px] border border-border bg-surface px-3.5 py-2 shadow-xl">
        <span className="text-[0.65rem] text-text-dim">Surveillance</span>
        <span className="ml-2 text-[0.65rem] font-bold text-success">● hebdo active</span>
      </div>
    </div>
  )
}

const FEATURES = [
  {
    title: 'Audit RGAA 4.1.2',
    desc: 'Analyse automatisée sur les critères vérifiables par machine du référentiel français.',
    icon: <IconFlag />,
  },
  {
    title: 'WCAG 2.2 niveau AA',
    desc: "Conformité internationale, alignée sur l'European Accessibility Act (EAA).",
    icon: <IconGlobe />,
  },
  {
    title: 'Corrections guidées',
    desc: 'Chaque non-conformité vient avec le code concerné et la correction à appliquer.',
    icon: <IconSparkles />,
  },
  {
    title: 'Surveillance planifiée',
    desc: 'Vos sites sont re-scannés automatiquement chaque semaine : le score est suivi dans le temps, sans y penser.',
    icon: <IconRadar />,
  },
  {
    title: 'Déclaration légale',
    desc: "Génération du document exigé par l'article 47 de la loi de 2005, prêt à publier.",
    icon: <IconDocument />,
  },
  {
    title: 'Rapport multi-pages',
    desc: "Jusqu'à 25 pages analysées par audit (plan Pro), avec le score de chaque page et le détail par sévérité.",
    icon: <IconLayers />,
  },
]

const FAQ = [
  {
    q: "Qu'est-ce que l'European Accessibility Act (EAA) ?",
    a: "L'EAA (directive UE 2019/882) impose depuis le 28 juin 2025 l'accessibilité des produits et services numériques : e-commerce, banques, transports, e-books… En France, elle est transposée dans la loi et expose les entreprises non conformes à des sanctions et à une mise en demeure.",
  },
  {
    q: 'Quelle différence entre RGAA et WCAG ?',
    a: "Les WCAG sont le standard international du W3C. Le RGAA 4.1.2 est la méthode d'application française : 106 critères qui traduisent les WCAG en tests concrets, exigés pour le secteur public français et recommandés pour le privé.",
  },
  {
    q: "Un audit automatique suffit-il pour être conforme ?",
    a: "Non. L'automatisation détecte environ 30 % des critères (images, formulaires, structure, contrastes…). C'est la première étape indispensable : elle élimine la majorité des blocages réels. Pour une déclaration opposable, complétez avec un audit manuel.",
  },
  {
    q: 'Combien de temps prend un audit Konforme ?',
    a: "Environ une minute pour un site classique : la plateforme analyse jusqu'à 25 pages (selon votre plan) avec une centaine de règles, et vous rend un rapport détaillé avec un score de conformité RGAA et WCAG pondéré par sévérité.",
  },
  {
    q: 'Konforme est-il un « overlay » d’accessibilité ?',
    a: "Non. Les overlays (widgets qui prétendent rendre un site accessible en un clic) sont critiqués par la communauté et ne rendent pas conforme. Konforme identifie les problèmes à la source et vous guide pour les corriger réellement dans votre code.",
  },
]

export function Landing() {
  const location = useLocation()
  useEffect(() => {
    if (location.hash === '#checker') {
      document.getElementById('checker')?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location.hash])

  return (
    <>
      <Seo
        title="Konforme — Accessibilité web RGAA & WCAG automatisée"
        description="Scannez, corrigez et surveillez l'accessibilité de votre site. Audit RGAA 4.1.2 & WCAG 2.2 automatisé, corrections guidées, déclaration légale. EAA 2025 en vigueur."
        path="/"
        jsonLd={[
          ORGANIZATION_JSONLD,
          SOFTWARE_JSONLD,
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          },
        ]}
      />

      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-16 md:pt-24 md:pb-24 grid items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <p className="inline-block rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-link uppercase mb-6">
              EAA 2025 · RGAA 4.1.2 · WCAG 2.2
            </p>
            <h1 className="gradient-text text-balance text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6">
              L'accessibilité de votre <AnimatedWord />
              <br />
              enfin automatisée
            </h1>
            <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed text-balance">
              Une centaine de règles RGAA 4.1.2 / WCAG 2.2 vérifiées automatiquement, chaque
              correction expliquée, la déclaration légale générée, et vos sites surveillés
              semaine après semaine.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-8">
              <a href="#checker">
                <Button size="lg" variant="primary">Tester mon site gratuitement</Button>
              </a>
              <Link to="/login">
                <Button size="lg" variant="ghost">Créer un compte</Button>
              </Link>
            </div>
            <ul className="flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2 text-xs font-semibold text-text-muted">
              <li className="inline-flex items-center gap-1.5"><CheckDot /> Conçu pour le RGAA 🇫🇷</li>
              <li className="inline-flex items-center gap-1.5"><CheckDot /> Données hébergées en UE</li>
              <li className="inline-flex items-center gap-1.5"><CheckDot /> Sans script à installer</li>
              <li className="inline-flex items-center gap-1.5"><CheckDot /> Pas d'overlay : de vraies corrections</li>
            </ul>
          </div>
          <div className="max-w-md w-full mx-auto lg:max-w-none">
            <ProductMockup />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16" aria-labelledby="checker-title">
        <h2 id="checker-title" className="sr-only">Test d'accessibilité gratuit</h2>
        <PublicChecker />
      </section>

      <section className="border-y border-border/60 bg-bg-deep/60 mb-16" aria-label="Chiffres clés">
        <dl className="mx-auto max-w-6xl px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { v: '≈100', l: 'règles vérifiées automatiquement' },
            { v: '~1 min', l: 'par audit multi-pages' },
            { v: '2 référentiels', l: 'RGAA 4.1.2 + WCAG 2.2 AA' },
            { v: 'Hebdo', l: 'surveillance planifiée des sites' },
          ].map((s) => (
            <div key={s.l}>
              <dt className="order-2 text-xs text-text-dim mt-1">{s.l}</dt>
              <dd className="order-1 text-2xl md:text-3xl font-extrabold gradient-text">{s.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20" aria-labelledby="features-title">
        <h2 id="features-title" className="sr-only">Fonctionnalités</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <Card key={f.title} className="hover:-translate-y-1 transition-transform">
              <CardContent>
                <div className="mb-4 inline-flex size-11 items-center justify-center rounded-[12px] bg-primary/15 border border-primary/30 text-primary-soft">
                  {f.icon}
                </div>
                <CardTitle className="mb-2">{f.title}</CardTitle>
                <CardDescription>{f.desc}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20" aria-labelledby="how-title">
        <h2 id="how-title" className="text-3xl font-bold tracking-tight text-center mb-10">
          Comment ça marche ?
        </h2>
        <ol className="grid gap-6 md:grid-cols-3">
          {[
            { t: '1. Ajoutez votre site', d: "Entrez l'URL de votre site : aucun code à installer, aucun script à poser." },
            { t: '2. Recevez le rapport', d: "En ~1 minute, chaque non-conformité est listée avec sa sévérité, le code fautif et la correction." },
            { t: '3. Publiez votre déclaration', d: "Corrigez, re-scannez, puis générez votre déclaration d'accessibilité prête à mettre en ligne." },
          ].map((s) => (
            <li key={s.t} className="rounded-[14px] border border-border bg-surface/60 p-6">
              <h3 className="font-bold mb-2">{s.t}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-20" aria-labelledby="faq-title">
        <h2 id="faq-title" className="text-3xl font-bold tracking-tight text-center mb-8">
          Questions fréquentes
        </h2>
        <div className="space-y-3">
          {FAQ.map((f) => (
            <details key={f.q} className="group rounded-[12px] border border-border bg-surface/60 px-5 py-1">
              <summary className="cursor-pointer py-3.5 font-semibold list-none flex items-center justify-between gap-3">
                {f.q}
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="shrink-0 transition-transform group-open:rotate-180">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <p className="pb-4 text-sm text-text-muted leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-16" aria-labelledby="trust-title">
        <h2 id="trust-title" className="sr-only">Qui sommes-nous</h2>
        <div className="rounded-[16px] border border-border bg-bg-deep/60 px-6 py-6 md:px-10 flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
          <span aria-hidden="true" className="text-3xl">🇫🇷</span>
          <div className="flex-1">
            <p className="font-bold">Conçu et opéré à Lyon par l'agence Kayzen</p>
            <p className="text-sm text-text-muted mt-1">
              Konforme est développé en France, les données sont hébergées dans l'Union
              européenne (Francfort), et l'audit manuel de l'offre Accompagné est réalisé par
              nos experts. Pas d'overlay, pas de boîte noire : de vraies corrections dans votre code.
            </p>
          </div>
          <Link to="/a-propos" className="shrink-0">
            <Button variant="ghost">En savoir plus</Button>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance mb-4">
          Prêt pour l'European Accessibility Act ?
        </h2>
        <p className="text-text-muted mb-8 max-w-xl mx-auto">
          Depuis juin 2025, les sites e-commerce et services numériques européens doivent être
          accessibles. Konforme identifie vos non-conformités dès aujourd'hui.
        </p>
        <Link to="/login">
          <Button size="lg" variant="primary">Lancer un audit gratuit</Button>
        </Link>
      </section>
    </>
  )
}

/* Icônes SVG inline (stroke currentColor, décoratives) */
function CheckDot() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
      <path d="M5 13l4 4L19 7" />
    </svg>
  )
}
function IconFlag() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 22V4a1 1 0 011-1h11l-2 4 2 4H5" />
    </svg>
  )
}
function IconGlobe() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
    </svg>
  )
}
function IconSparkles() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 17l.9 2.1L22 20l-2.1.9L19 23l-.9-2.1L16 20l2.1-.9z" />
    </svg>
  )
}
function IconRadar() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="2" />
      <path d="M16.24 7.76a6 6 0 010 8.49M7.76 16.24a6 6 0 010-8.49M19.07 4.93a10 10 0 010 14.14M4.93 19.07a10 10 0 010-14.14" />
    </svg>
  )
}
function IconDocument() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6M9 13h6M9 17h6" />
    </svg>
  )
}
function IconLayers() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2l10 6-10 6L2 8z" />
      <path d="M2 14l10 6 10-6" />
    </svg>
  )
}
