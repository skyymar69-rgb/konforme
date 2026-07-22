import { Seo } from '@/components/Seo'

export function Accessibilite() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <Seo
        title="Déclaration d'accessibilité"
        description="Déclaration d'accessibilité RGAA du site konforme.kayzen-lyon.fr : état de conformité, résultats des tests et voies de recours."
        path="/accessibilite"
      />
      <p className="text-xs font-semibold uppercase tracking-wider text-link mb-3">Accessibilité</p>
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">
        Déclaration d'accessibilité
      </h1>

      <div className="space-y-4 text-text-soft leading-relaxed">
        <p>
          <strong className="text-text">KAYZEN SASU</strong> s'engage à rendre son site
          internet accessible conformément à l'article 47 de la loi n° 2005-102 du 11 février 2005.
        </p>
        <p>
          Cette déclaration d'accessibilité s'applique au site{' '}
          <strong className="text-text">konforme.kayzen-lyon.fr</strong>.
        </p>
      </div>

      <h2 className="text-xl font-bold tracking-tight mt-10 mb-3">État de conformité</h2>
      <p className="text-text-soft leading-relaxed mb-4">
        Le site konforme.kayzen-lyon.fr est <strong className="text-text">partiellement
        conforme</strong> avec le référentiel général d'amélioration de l'accessibilité (RGAA),
        version 4.1, en raison des non-conformités et dérogations énumérées ci-dessous.
      </p>

      <h2 className="text-xl font-bold tracking-tight mt-10 mb-3">Résultats des tests</h2>
      <p className="text-text-soft leading-relaxed mb-4">
        L'audit de conformité réalisé en juillet 2026 en interne (audit automatisé Konforme complété
        d'une revue manuelle : navigation clavier, lecteur d'écran, contrastes, zoom 200 %) révèle
        que le site respecte les critères automatisables testés. Points connus en cours
        d'amélioration :
      </p>
      <ul className="space-y-2 text-text-soft leading-relaxed list-disc pl-5 mb-4">
        <li>Certains contenus du tableau de bord (graphiques) proposent une alternative textuelle simplifiée plutôt qu'une restitution donnée par donnée.</li>
        <li>Le processus d'authentification dépend d'un service tiers (Google) dont l'accessibilité ne relève pas de notre contrôle.</li>
      </ul>

      <h2 className="text-xl font-bold tracking-tight mt-10 mb-3">
        Établissement de cette déclaration
      </h2>
      <p className="text-text-soft leading-relaxed mb-4">
        Cette déclaration a été établie le 12 juillet 2026. Technologies utilisées : HTML5, CSS,
        JavaScript (React). Tests effectués avec les navigateurs et lecteurs d'écran courants
        (NVDA/Firefox, VoiceOver/Safari) et l'outil d'audit Konforme.
      </p>

      <h2 className="text-xl font-bold tracking-tight mt-10 mb-3">Retour d'information et contact</h2>
      <p className="text-text-soft leading-relaxed mb-4">
        Si vous n'arrivez pas à accéder à un contenu ou à un service, contactez-nous pour être
        orienté vers une alternative accessible :{' '}
        <a href="mailto:contact@kayzen-lyon.fr" className="text-link hover:underline">
          contact@kayzen-lyon.fr
        </a>{' '}
        ou +33 (0)4 87 77 68 61.
      </p>

      <h2 className="text-xl font-bold tracking-tight mt-10 mb-3">Voies de recours</h2>
      <p className="text-text-soft leading-relaxed mb-4">
        Si vous avez signalé un défaut d'accessibilité sans obtenir de réponse satisfaisante, vous
        pouvez :
      </p>
      <ul className="space-y-2 text-text-soft leading-relaxed list-disc pl-5">
        <li>
          Écrire au{' '}
          <a href="https://formulaire.defenseurdesdroits.fr/" className="text-link hover:underline" rel="noopener noreferrer" target="_blank">
            Défenseur des droits<span className="sr-only"> (nouvelle fenêtre)</span>
          </a>
        </li>
        <li>
          Contacter{' '}
          <a href="https://www.defenseurdesdroits.fr/saisir/delegues" className="text-link hover:underline" rel="noopener noreferrer" target="_blank">
            le délégué du Défenseur des droits de votre région<span className="sr-only"> (nouvelle fenêtre)</span>
          </a>
        </li>
        <li>
          Envoyer un courrier (gratuit, sans timbre) : Défenseur des droits, Libre réponse 71120,
          75342 Paris CEDEX 07
        </li>
      </ul>
    </div>
  )
}
