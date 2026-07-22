import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ORGANIZATION_JSONLD, Seo } from '@/components/Seo'

export function About() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <Seo
        title="À propos de Konforme"
        description="Konforme est la plateforme d'audit d'accessibilité web de KAYZEN SASU (Lyon) : rendre la conformité RGAA et WCAG simple, mesurable et abordable."
        path="/a-propos"
        jsonLd={[ORGANIZATION_JSONLD]}
      />
      <p className="text-xs font-semibold uppercase tracking-wider text-link mb-3">À propos</p>
      <h1 className="text-4xl font-extrabold tracking-tight mb-6">
        Rendre l'accessibilité web simple et mesurable
      </h1>
      <div className="space-y-5 text-text-soft leading-relaxed text-lg">
        <p>
          Konforme est né d'un constat simple : depuis l'entrée en application de l'European
          Accessibility Act en juin 2025, des centaines de milliers de sites français doivent se
          mettre en conformité — mais les audits traditionnels coûtent plusieurs milliers d'euros
          et prennent des semaines.
        </p>
        <p>
          Nous avons construit une plateforme qui automatise ce qui peut l'être : détection des
          non-conformités RGAA 4.1 et WCAG 2.2, corrections guidées avec le code concerné, suivi
          du score dans le temps et génération de la déclaration d'accessibilité légale.
        </p>
        <p>
          Konforme est édité par <strong className="text-text">KAYZEN SASU</strong>, société
          lyonnaise spécialisée dans la création de sites web et la conformité numérique
          (accessibilité, RGPD). Nous utilisons Konforme sur nos propres réalisations — ce site
          inclus, dont la <Link to="/accessibilite" className="text-link hover:underline">déclaration
          d'accessibilité</Link> est publique.
        </p>
      </div>

      <h2 className="text-2xl font-bold tracking-tight mt-12 mb-4">Nos engagements</h2>
      <ul className="space-y-3 text-text-soft leading-relaxed list-disc pl-5">
        <li><strong className="text-text">Transparence</strong> : un audit automatisé ne couvre pas tout, et nous le disons. Nous affichons ce qui est testé et ce qui relève d'un audit manuel.</li>
        <li><strong className="text-text">Pédagogie</strong> : chaque non-conformité est expliquée avec sa correction, pour faire monter vos équipes en compétence.</li>
        <li><strong className="text-text">Données en Europe</strong> : vos données sont hébergées dans l'Union européenne (Appwrite Cloud, région Francfort), sur une infrastructure open source.</li>
      </ul>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link to="/login"><Button variant="primary">Essayer Konforme</Button></Link>
        <Link to="/contact"><Button variant="ghost">Nous contacter</Button></Link>
      </div>
    </div>
  )
}
