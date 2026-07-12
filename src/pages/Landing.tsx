import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { ORGANIZATION_JSONLD, Seo, SOFTWARE_JSONLD } from '@/components/Seo'

const FEATURES = [
  {
    title: 'Audit RGAA 4.1',
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
    title: 'Suivi continu',
    desc: 'Relancez vos audits à chaque mise en production et suivez votre score dans le temps.',
    icon: <IconRadar />,
  },
  {
    title: 'Déclaration légale',
    desc: "Génération du document exigé par l'article 47 de la loi de 2005, prêt à publier.",
    icon: <IconDocument />,
  },
  {
    title: 'Rapport multi-pages',
    desc: "Jusqu'à 5 pages analysées par audit, avec le détail par page et par sévérité.",
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
    a: "Les WCAG sont le standard international du W3C. Le RGAA 4.1 est la méthode d'application française : 106 critères qui traduisent les WCAG en tests concrets, exigés pour le secteur public français et recommandés pour le privé.",
  },
  {
    q: "Un audit automatique suffit-il pour être conforme ?",
    a: "Non. L'automatisation détecte environ 30 % des critères (images, formulaires, structure, contrastes…). C'est la première étape indispensable : elle élimine la majorité des blocages réels. Pour une déclaration opposable, complétez avec un audit manuel.",
  },
  {
    q: 'Combien de temps prend un audit Konforme ?',
    a: "Moins d'une minute pour un site classique : la plateforme analyse jusqu'à 5 pages et vous rend un rapport détaillé avec un score de conformité RGAA et WCAG.",
  },
]

export function Landing() {
  return (
    <>
      <Seo
        title="Konforme — Accessibilité web RGAA & WCAG automatisée"
        description="Scannez, corrigez et surveillez l'accessibilité de votre site. Audit RGAA 4.1 & WCAG 2.2 automatisé, corrections guidées, déclaration légale. EAA 2025 en vigueur."
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
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-24 md:pt-28 md:pb-32 text-center">
          <p className="inline-block rounded-full border border-[#2563eb]/40 bg-[#2563eb]/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#67e8f9] uppercase mb-6">
            EAA 2025 · RGAA 4.1 · WCAG 2.2
          </p>
          <h1 className="gradient-text text-balance text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
            L'accessibilité web
            <br />
            enfin automatisée
          </h1>
          <p className="text-lg md:text-xl text-[#a3b0c9] max-w-2xl mx-auto mb-10 leading-relaxed text-balance">
            Scannez, corrigez et maintenez la conformité de vos sites en quelques minutes.
            Rapport détaillé, corrections guidées, déclaration légale générée automatiquement.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/login">
              <Button size="lg" variant="primary">Lancer un audit gratuit</Button>
            </Link>
            <Link to="/rgaa">
              <Button size="lg" variant="ghost">Découvrir le RGAA</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20" aria-labelledby="features-title">
        <h2 id="features-title" className="sr-only">Fonctionnalités</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <Card key={f.title} className="hover:-translate-y-1 transition-transform">
              <CardContent>
                <div className="mb-4 inline-flex size-11 items-center justify-center rounded-[12px] bg-[#2563eb]/15 border border-[#2563eb]/30 text-[#93c5fd]">
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
            <li key={s.t} className="rounded-[14px] border border-[#2a3654] bg-[#131a2c]/60 p-6">
              <h3 className="font-bold mb-2">{s.t}</h3>
              <p className="text-sm text-[#a3b0c9] leading-relaxed">{s.d}</p>
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
            <details key={f.q} className="group rounded-[12px] border border-[#2a3654] bg-[#131a2c]/60 px-5 py-1">
              <summary className="cursor-pointer py-3.5 font-semibold list-none flex items-center justify-between gap-3">
                {f.q}
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="shrink-0 transition-transform group-open:rotate-180">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <p className="pb-4 text-sm text-[#a3b0c9] leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance mb-4">
          Prêt pour l'European Accessibility Act ?
        </h2>
        <p className="text-[#a3b0c9] mb-8 max-w-xl mx-auto">
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
