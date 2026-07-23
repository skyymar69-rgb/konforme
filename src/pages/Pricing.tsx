import { Link } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { Button } from '@/components/ui/button'
import { PLANS, type Plan } from '@/lib/plans'

const ORDER: Plan[] = [PLANS.free, PLANS.pro, PLANS.enterprise]

export function Pricing() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <Seo
        title="Tarifs"
        description="Audit d'accessibilité RGAA/WCAG gratuit pour un site, plan Pro pour les agences, accompagnement expert pour la conformité opposable."
        path="/tarifs"
      />

      <header className="text-center max-w-2xl mx-auto mb-14">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Des tarifs simples, un objectif : la conformité
        </h1>
        <p className="text-text-muted mt-4">
          Commencez gratuitement, passez au plan Pro quand votre activité grandit. L'audit manuel
          opposable est disponible en offre accompagnée.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-3 items-stretch">
        {ORDER.map((plan) => (
          <section
            key={plan.id}
            aria-labelledby={`plan-${plan.id}`}
            className={`flex flex-col rounded-[16px] border p-7 ${
              plan.highlighted
                ? 'border-primary bg-gradient-to-b from-surface to-surface-2 shadow-[0_10px_40px_rgba(37,99,235,0.25)] relative'
                : 'border-border bg-surface/60'
            }`}
          >
            {plan.highlighted && (
              <p className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
                Recommandé
              </p>
            )}
            <h2 id={`plan-${plan.id}`} className="text-lg font-bold">
              {plan.name}
            </h2>
            <p className="mt-3">
              <span className="text-3xl font-extrabold">{plan.price}</span>{' '}
              <span className="text-sm text-text-dim">{plan.period}</span>
            </p>
            <p className="text-sm text-text-muted mt-3">{plan.tagline}</p>

            <ul className="mt-6 space-y-2.5 text-sm flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex gap-2.5">
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="var(--color-success)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    aria-hidden="true"
                    className="mt-0.5 shrink-0"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-7">
              <Link to={plan.id === 'free' ? '/login' : '/contact'} className="block">
                <Button variant={plan.highlighted ? 'primary' : 'ghost'} className="w-full">
                  {plan.cta}
                </Button>
              </Link>
              {plan.id === 'pro' && (
                <p className="mt-2 text-center text-xs text-text-dim">
                  Paiement en ligne bientôt disponible — activation sous 24 h par notre équipe.
                </p>
              )}
            </div>
          </section>
        ))}
      </div>

      <section aria-labelledby="pricing-faq" className="mt-16 max-w-2xl mx-auto">
        <h2 id="pricing-faq" className="text-xl font-bold text-center mb-6">
          Questions fréquentes
        </h2>
        <dl className="space-y-5 text-sm">
          <div>
            <dt className="font-semibold">Que couvre l'audit automatisé ?</dt>
            <dd className="text-text-muted mt-1">
              Plus de 40 règles RGAA 4.1.2 / WCAG 2.2 vérifiables par machine (images, formulaires,
              structure, ARIA, contrastes…), soit environ 30 % du référentiel. La conformité
              opposable nécessite un audit manuel complémentaire, inclus dans l'offre Accompagné.
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Suis-je concerné par l'obligation légale ?</dt>
            <dd className="text-text-muted mt-1">
              Depuis juin 2025, l'European Accessibility Act étend l'obligation d'accessibilité à la
              plupart des services numériques privés (e-commerce, banques, transports…). En France,
              l'article 47 de la loi de 2005 s'applique déjà au secteur public et aux grandes
              entreprises. <Link to="/rgaa" className="text-link underline">En savoir plus sur le RGAA</Link>.
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Puis-je changer de plan à tout moment ?</dt>
            <dd className="text-text-muted mt-1">
              Oui. Le quota d'audits se réinitialise le 1<sup>er</sup> de chaque mois, et le passage
              d'un plan à l'autre est immédiat.
            </dd>
          </div>
        </dl>
      </section>
    </div>
  )
}
