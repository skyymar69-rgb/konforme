import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'

const FEATURES = [
  {
    title: '106 critères RGAA 4.1',
    desc: 'Audit complet automatisé sur tous les critères du référentiel français.',
    icon: '🇫🇷',
  },
  {
    title: 'WCAG 2.2 niveau AA',
    desc: 'Conformité internationale, prête pour l\'European Accessibility Act.',
    icon: '🌍',
  },
  {
    title: 'Corrections IA',
    desc: 'Snippets de code prêts à merger, validés par expertise humaine.',
    icon: '✨',
  },
  {
    title: 'Monitoring 24/7',
    desc: 'Surveillance continue, alertes en cas de régression.',
    icon: '📡',
  },
  {
    title: 'Déclaration légale',
    desc: 'Génération automatique du document conforme RGAA 4.1 prêt à publier.',
    icon: '📜',
  },
  {
    title: 'CI/CD intégré',
    desc: 'GitHub Actions et GitLab CI pour bloquer les régressions en PR.',
    icon: '⚙️',
  },
]

export function Landing() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-24 md:pt-28 md:pb-32 text-center">
          <span className="inline-block rounded-full border border-[#2563eb]/40 bg-[#2563eb]/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#67e8f9] uppercase mb-6">
            EAA 2025 · RGAA 4.1 · WCAG 2.2
          </span>
          <h1 className="gradient-text text-balance text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
            L'accessibilité web
            <br />
            automatisée par IA
          </h1>
          <p className="text-lg md:text-xl text-[#a3b0c9] max-w-2xl mx-auto mb-10 leading-relaxed text-balance">
            Scannez, corrigez et maintenez la conformité de vos sites en quelques minutes.
            Rapports légaux générés automatiquement, corrections de code prêtes à merger.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/login">
              <Button size="lg" variant="primary">
                Commencer gratuitement
              </Button>
            </Link>
            <Link to="/rgaa">
              <Button size="lg" variant="ghost">
                Découvrir le RGAA
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <Card key={f.title} className="hover:-translate-y-1 transition-transform">
              <CardContent>
                <div className="text-3xl mb-4">{f.icon}</div>
                <CardTitle className="mb-2">{f.title}</CardTitle>
                <CardDescription>{f.desc}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance mb-4">
          Prêt pour l'European Accessibility Act ?
        </h2>
        <p className="text-[#a3b0c9] mb-8 max-w-xl mx-auto">
          Depuis juin 2025, tous les sites e-commerce et services numériques européens doivent
          être accessibles. Konforme vous met en conformité en quelques jours.
        </p>
        <Link to="/login">
          <Button size="lg" variant="primary">
            Lancer un audit gratuit
          </Button>
        </Link>
      </section>
    </>
  )
}
