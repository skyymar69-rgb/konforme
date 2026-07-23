export type Post = {
  slug: string
  title: string
  description: string
  date: string // ISO
  readingMinutes: number
  sections: Array<{ heading?: string; paragraphs: string[]; list?: string[] }>
}

export const POSTS: Post[] = [
  {
    slug: 'european-accessibility-act-2025-obligations',
    title: "EAA 2025 : quelles obligations d'accessibilité pour votre site ?",
    description:
      "Depuis le 28 juin 2025, l'European Accessibility Act s'applique. Qui est concerné, quels risques, et par où commencer pour mettre votre site en conformité.",
    date: '2026-06-02',
    readingMinutes: 6,
    sections: [
      {
        paragraphs: [
          "Le 28 juin 2025 a marqué un tournant : l'European Accessibility Act (directive UE 2019/882) est entré en application dans toute l'Union européenne. Pour la première fois, l'obligation d'accessibilité numérique ne concerne plus seulement le secteur public, mais la majorité des services numériques privés grand public.",
        ],
      },
      {
        heading: 'Qui est concerné ?',
        paragraphs: [
          "Sont notamment visés : le commerce électronique (tout site qui vend en ligne), les services bancaires, les transports (billetterie, applications), les livres numériques, les médias audiovisuels et les communications électroniques. Les micro-entreprises de services (moins de 10 salariés et moins de 2 M€ de chiffre d'affaires) bénéficient d'une exemption — mais elle ne couvre pas les produits qu'elles vendent.",
          "En France, la directive est transposée dans la loi n° 2023-171 et ses décrets d'application. Les autorités de contrôle (DGCCRF, ARCOM, Banque de France selon le secteur) peuvent prononcer des sanctions et exiger la mise en conformité.",
        ],
      },
      {
        heading: 'Que faut-il faire concrètement ?',
        paragraphs: ["La démarche tient en quatre étapes :"],
        list: [
          "Auditer : mesurer l'écart avec les WCAG 2.1/2.2 niveau AA (le RGAA 4.1.2 en France).",
          'Corriger : traiter en priorité les blocages critiques — images sans alternative, formulaires sans étiquette, contrastes insuffisants, navigation clavier impossible.',
          "Déclarer : publier une déclaration d'accessibilité indiquant votre niveau de conformité et les moyens de recours.",
          'Maintenir : chaque mise en production peut réintroduire des régressions ; un audit récurrent est indispensable.',
        ],
      },
      {
        heading: 'Le risque de ne rien faire',
        paragraphs: [
          "Au-delà des sanctions administratives, l'inaccessibilité prive votre site de 15 à 20 % d'utilisateurs (déficience visuelle, motrice, auditive, cognitive — permanente ou temporaire). C'est aussi un facteur SEO : un site bien structuré, avec des alternatives textuelles et une sémantique propre, est mieux compris par les moteurs de recherche.",
          "Un audit automatisé Konforme prend moins d'une minute et vous donne immédiatement la liste priorisée de vos non-conformités. C'est le premier pas le plus rentable de votre mise en conformité.",
        ],
      },
    ],
  },
  {
    slug: 'rgaa-vs-wcag-differences',
    title: 'RGAA vs WCAG : quelles différences, lequel viser ?',
    description:
      "Le RGAA applique les WCAG au contexte français. Comprendre ce qui les distingue pour choisir le bon référentiel et éviter les erreurs de conformité.",
    date: '2026-05-12',
    readingMinutes: 5,
    sections: [
      {
        paragraphs: [
          "WCAG, RGAA, EN 301 549… les référentiels d'accessibilité forment un mille-feuille qui décourage plus d'une équipe. La bonne nouvelle : ils s'emboîtent logiquement.",
        ],
      },
      {
        heading: 'WCAG : le socle international',
        paragraphs: [
          "Les Web Content Accessibility Guidelines, publiées par le W3C, définissent des critères de succès classés en trois niveaux (A, AA, AAA). Le niveau AA est la cible légale quasi universelle. La version 2.2 (octobre 2023) ajoute 9 critères, notamment sur la visibilité du focus et les alternatives aux gestes de glisser-déposer.",
        ],
      },
      {
        heading: "RGAA : la méthode d'application française",
        paragraphs: [
          "Le RGAA 4.1.2 traduit les WCAG en 106 critères et plus de 2 500 tests opérationnels. Il précise comment tester, ce que les WCAG laissent parfois à l'interprétation. Il est obligatoire pour le secteur public français et sert de référence aux audits en France.",
          "Concrètement : être conforme RGAA implique d'être conforme WCAG 2.1 AA. L'inverse n'est pas garanti, car le RGAA impose des tests plus précis (par exemple sur les éléments obligatoires du document HTML).",
        ],
      },
      {
        heading: 'Lequel viser ?',
        paragraphs: [
          "Si votre marché est français : visez le RGAA — il inclut les WCAG et c'est lui que les auditeurs français utiliseront. Si votre produit est international : les WCAG 2.2 AA suffisent, et c'est la référence retenue par l'EAA via la norme EN 301 549.",
          'Konforme mesure les deux : chaque audit produit un score RGAA 4.1.2 et un score WCAG 2.2, avec les références croisées sur chaque non-conformité.',
        ],
      },
    ],
  },
  {
    slug: '10-erreurs-accessibilite-les-plus-courantes',
    title: "Les 10 erreurs d'accessibilité les plus courantes (et leurs corrections)",
    description:
      "Images sans alt, contrastes trop faibles, liens « cliquez ici »… le top 10 des non-conformités détectées sur les sites français, avec la correction pour chacune.",
    date: '2026-04-20',
    readingMinutes: 7,
    sections: [
      {
        paragraphs: [
          "Sur les milliers de pages analysées, les mêmes erreurs reviennent inlassablement. Les corriger couvre l'essentiel des blocages réels rencontrés par les utilisateurs de technologies d'assistance.",
        ],
      },
      {
        heading: 'Le top 10',
        paragraphs: [],
        list: [
          "1. Images sans alternative textuelle — ajoutez alt=\"…\" (ou alt=\"\" si décorative).",
          '2. Contrastes insuffisants — visez 4,5:1 pour le texte normal, 3:1 pour le grand texte.',
          '3. Champs de formulaire sans étiquette — chaque input doit avoir un label associé.',
          "4. Liens vides ou « cliquez ici » — l'intitulé doit décrire la destination.",
          '5. Hiérarchie de titres cassée — un seul h1, pas de saut de niveau.',
          '6. Boutons-icônes sans nom accessible — ajoutez aria-label.',
          "7. Zoom bloqué sur mobile — supprimez user-scalable=no du viewport.",
          '8. Iframes sans titre — chaque iframe doit décrire son contenu.',
          "9. Absence de lien d'évitement — permettez d'aller directement au contenu.",
          '10. Focus clavier invisible — ne supprimez jamais outline sans alternative visible.',
        ],
      },
      {
        heading: 'Comment les détecter chez vous ?',
        paragraphs: [
          "Neuf de ces dix erreurs sont détectables automatiquement. Un audit Konforme les identifie en une minute, page par page, avec le code HTML concerné et la correction à appliquer. Lancez un audit gratuit et vous saurez immédiatement où vous en êtes.",
        ],
      },
    ],
  },
]
