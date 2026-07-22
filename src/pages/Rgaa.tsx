import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Seo } from '@/components/Seo'

const THEMES = [
  { n: 1, name: 'Images', criteres: 9, ex: 'Alternatives textuelles, images décoratives, CAPTCHA' },
  { n: 2, name: 'Cadres', criteres: 2, ex: 'Titre pertinent sur chaque iframe' },
  { n: 3, name: 'Couleurs', criteres: 3, ex: "Contraste 4,5:1, information non portée par la seule couleur" },
  { n: 4, name: 'Multimédia', criteres: 13, ex: 'Sous-titres, transcription, audiodescription, contrôle de lecture' },
  { n: 5, name: 'Tableaux', criteres: 8, ex: 'En-têtes de colonnes/lignes, résumé des tableaux complexes' },
  { n: 6, name: 'Liens', criteres: 2, ex: 'Intitulés explicites, liens sans texte' },
  { n: 7, name: 'Scripts', criteres: 5, ex: "Composants JS compatibles clavier et lecteurs d'écran" },
  { n: 8, name: 'Éléments obligatoires', criteres: 10, ex: 'Doctype, langue, titre de page, code valide' },
  { n: 9, name: "Structuration de l'information", criteres: 4, ex: 'Titres hiérarchisés, listes, citations' },
  { n: 10, name: "Présentation de l'information", criteres: 14, ex: 'CSS, zoom 200 %, espacement du texte, focus visible' },
  { n: 11, name: 'Formulaires', criteres: 13, ex: "Étiquettes, regroupements, messages d'erreur, aide à la saisie" },
  { n: 12, name: 'Navigation', criteres: 11, ex: "Liens d'évitement, plan du site, ordre de tabulation, landmarks" },
  { n: 13, name: 'Consultation', criteres: 12, ex: 'Limites de temps, nouvelles fenêtres, documents bureautiques' },
]

export function Rgaa() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <Seo
        title="Guide RGAA 4.1 : les 106 critères expliqués"
        description="Le RGAA 4.1 en clair : 13 thématiques, 106 critères, niveaux de conformité, obligations légales françaises et lien avec les WCAG 2.2 et l'EAA."
        path="/rgaa"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Guide RGAA 4.1 : les 106 critères expliqués',
            inLanguage: 'fr-FR',
            author: { '@type': 'Organization', name: 'Konforme' },
            publisher: { '@type': 'Organization', name: 'KAYZEN SASU' },
          },
        ]}
      />

      <p className="text-xs font-semibold uppercase tracking-wider text-link mb-3">Guide</p>
      <h1 className="text-4xl font-extrabold tracking-tight mb-6">
        RGAA 4.1 : le référentiel français d'accessibilité
      </h1>
      <p className="text-lg text-text-muted leading-relaxed mb-10">
        Le <strong className="text-text">Référentiel Général d'Amélioration de l'Accessibilité</strong> (RGAA)
        est la méthode officielle française pour vérifier qu'un site web respecte les standards
        internationaux WCAG. Sa version 4.1 compte <strong className="text-text">106 critères</strong> répartis
        en 13 thématiques, chacun décliné en tests concrets.
      </p>

      <section className="mb-12" aria-labelledby="qui-title">
        <h2 id="qui-title" className="text-2xl font-bold tracking-tight mb-4">Qui est concerné ?</h2>
        <ul className="space-y-2.5 text-text-soft leading-relaxed list-disc pl-5">
          <li>Les <strong className="text-text">services publics</strong> et organismes délégataires : obligation RGAA depuis 2019.</li>
          <li>Les <strong className="text-text">entreprises réalisant plus de 250 M€ de CA</strong> en France : obligation de déclaration depuis 2020.</li>
          <li>
            Depuis le <strong className="text-text">28 juin 2025</strong>, l'European Accessibility Act étend
            l'obligation à la plupart des services numériques grand public : e-commerce, banques,
            transports, médias, télécoms — y compris les PME (hors micro-entreprises de services).
          </li>
        </ul>
      </section>

      <section className="mb-12" aria-labelledby="themes-title">
        <h2 id="themes-title" className="text-2xl font-bold tracking-tight mb-4">
          Les 13 thématiques du RGAA
        </h2>
        <div className="overflow-x-auto rounded-[14px] border border-border">
          <table className="w-full text-sm">
            <caption className="sr-only">Les 13 thématiques du RGAA 4.1 et leurs critères</caption>
            <thead>
              <tr className="border-b border-border bg-surface text-left text-xs uppercase tracking-wider text-text-muted">
                <th scope="col" className="px-4 py-3 font-semibold">N°</th>
                <th scope="col" className="px-4 py-3 font-semibold">Thématique</th>
                <th scope="col" className="px-4 py-3 font-semibold">Critères</th>
                <th scope="col" className="px-4 py-3 font-semibold">Exemples de points vérifiés</th>
              </tr>
            </thead>
            <tbody>
              {THEMES.map((t) => (
                <tr key={t.n} className="border-b border-border/60 last:border-0">
                  <td className="px-4 py-3 text-text-dim">{t.n}</td>
                  <th scope="row" className="px-4 py-3 font-semibold text-left">{t.name}</th>
                  <td className="px-4 py-3">{t.criteres}</td>
                  <td className="px-4 py-3 text-text-muted">{t.ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12" aria-labelledby="conf-title">
        <h2 id="conf-title" className="text-2xl font-bold tracking-tight mb-4">Les niveaux de conformité</h2>
        <p className="text-text-soft leading-relaxed mb-4">
          Le taux de conformité RGAA = critères respectés ÷ critères applicables. Trois états sont
          possibles pour la déclaration d'accessibilité :
        </p>
        <ul className="space-y-2.5 text-text-soft list-disc pl-5">
          <li><strong className="text-success-soft">Totalement conforme</strong> : 100 % des critères applicables respectés.</li>
          <li><strong className="text-warning-soft">Partiellement conforme</strong> : au moins 50 %.</li>
          <li><strong className="text-danger-soft">Non conforme</strong> : moins de 50 %, ou aucun audit réalisé.</li>
        </ul>
      </section>

      <section className="mb-12" aria-labelledby="auto-title">
        <h2 id="auto-title" className="text-2xl font-bold tracking-tight mb-4">
          Ce que Konforme automatise
        </h2>
        <p className="text-text-soft leading-relaxed">
          Konforme teste automatiquement les critères vérifiables par machine : alternatives des
          images, étiquettes de formulaires, structure des titres, cadres, tableaux, liens vides,
          langue du document, zoom bloqué, lecture automatique… Ces contrôles couvrent la majorité
          des blocages réellement rencontrés par les utilisateurs. Le rapport indique pour chaque
          non-conformité le critère RGAA/WCAG, l'élément HTML concerné et la correction à appliquer,
          puis génère votre déclaration d'accessibilité.
        </p>
      </section>

      <div className="rounded-[14px] border border-primary/40 bg-primary/10 p-8 text-center">
        <h2 className="text-xl font-bold mb-2">Testez votre site maintenant</h2>
        <p className="text-sm text-text-muted mb-5">Audit automatisé gratuit, résultat en une minute.</p>
        <Link to="/login">
          <Button variant="primary" size="lg">Lancer un audit gratuit</Button>
        </Link>
      </div>
    </div>
  )
}
