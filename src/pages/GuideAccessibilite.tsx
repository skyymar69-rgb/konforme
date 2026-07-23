import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Seo } from '@/components/Seo'
import {
  RGAA_CRITERIA,
  RGAA_METHOD_URL,
  RGAA_TEST_ENV_URL,
  RGAA_TEST_ENVIRONMENTS,
  RGAA_TOPICS,
  rgaaCriterionUrl,
} from '@/lib/rgaa'
import { COVERAGE_META } from '@/lib/conformity'

const DEADLINES = [
  { date: '27 juin 2019', label: 'Adoption de la directive (UE) 2019/882 — European Accessibility Act (EAA).' },
  { date: '28 juin 2022', label: 'Date limite de transposition dans le droit national des États membres.' },
  { date: '28 juin 2025', label: 'Tout produit ou service neuf mis sur le marché doit être accessible. Les contrôles de la DGCCRF ont commencé.' },
  { date: '28 juin 2030', label: 'Fin de la période transitoire : les services existants (contrats antérieurs) doivent être conformes.' },
]

const SANCTIONS = [
  { amount: '50 000 €', label: 'par service non conforme (site, application, borne — cumulable par canal)' },
  { amount: '25 000 €', label: 'en l’absence de déclaration d’accessibilité publiée' },
  { amount: '7 500 €', label: 'par infraction constatée (15 000 € en cas de récidive), avec injonction sous astreinte' },
  { amount: '75 000 €', label: 'l’inaccessibilité délibérée peut être qualifiée de discrimination (personne morale)' },
]

const PRO_STEPS = [
  {
    title: '1. Auditer',
    text: 'Lancez un audit automatique sur les pages clés (accueil, contact, parcours d’achat, connexion). Il détecte instantanément la part machine-vérifiable des 106 critères et vous donne un taux de départ.',
  },
  {
    title: '2. Prioriser',
    text: 'Corrigez d’abord les non-conformités critiques (images sans alternative, champs sans étiquette, liens vides) : ce sont les plus bloquantes pour les utilisateurs et les plus visibles en cas de contrôle.',
  },
  {
    title: '3. Corriger',
    text: 'Chaque non-conformité du rapport indique le sélecteur CSS, le code concerné et une correction suggérée — avec un assistant IA pour générer le correctif. La plupart des corrections sont simples (attributs manquants).',
  },
  {
    title: '4. Compléter par l’évaluation manuelle intégrée',
    text: 'Les critères « à vérifier manuellement » (contrastes réels, navigation clavier, sous-titres…) s’évaluent directement dans Konforme : dans l’onglet « Les 106 critères RGAA », marquez chaque critère Conforme, Non conforme ou Non applicable, avec une note justificative. Vous couvrez ainsi les 106 critères de A à Z, sans prestataire externe.',
  },
  {
    title: '5. Publier la déclaration d’accessibilité',
    text: 'Document légal obligatoire : état de conformité (totale ≥ 100 %, partielle ≥ 50 %, non conforme < 50 %), liste des contenus non accessibles, dispositif de retour utilisateur et voies de recours (Défenseur des droits). Konforme la génère pré-remplie.',
  },
  {
    title: '6. Surveiller',
    text: 'L’accessibilité régresse à chaque mise en production. Activez le monitoring pour re-auditer automatiquement et être alerté en cas de régression — l’historique des scores prouve votre démarche d’amélioration en cas de contrôle.',
  },
]

export function GuideAccessibilite() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <Seo
        title="Guide complet : European Accessibility Act & RGAA — les 106 critères expliqués"
        description="Le guide de référence en français : obligations de la directive (UE) 2019/882, échéances, sanctions DGCCRF, et les 106 critères du RGAA 4.1.2 expliqués simplement, pour les utilisateurs comme pour les professionnels."
        path="/guide-accessibilite"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Guide complet : European Accessibility Act & RGAA',
            inLanguage: 'fr-FR',
            author: { '@type': 'Organization', name: 'Konforme' },
            publisher: { '@type': 'Organization', name: 'KAYZEN SASU' },
          },
        ]}
      />

      <p className="text-xs font-semibold uppercase tracking-wider text-link mb-3">Guide complet</p>
      <h1 className="text-4xl font-extrabold tracking-tight mb-6">
        Accessibilité numérique : l'EAA et les 106 critères du RGAA, expliqués à tous
      </h1>
      <p className="text-lg text-text-muted leading-relaxed mb-4">
        Depuis le <strong className="text-text">28 juin 2025</strong>, la directive européenne (UE) 2019/882 —{' '}
        l'<strong className="text-text">European Accessibility Act</strong> — rend l'accessibilité numérique
        obligatoire pour la plupart des services grand public : e-commerce, banques, transports, télécoms,
        médias. En France, la conformité se démontre avec le <strong className="text-text">RGAA 4.1.2</strong> et
        ses <strong className="text-text">106 critères</strong>, et la <strong className="text-text">DGCCRF</strong>{' '}
        contrôle activement.
      </p>
      <p className="text-text-muted leading-relaxed mb-10">
        Ce guide s'adresse aux deux publics : les <strong className="text-text">décideurs</strong>, qui doivent
        comprendre les obligations et les risques, et les <strong className="text-text">professionnels du web</strong>,
        qui doivent savoir précisément quoi corriger. Chaque critère est expliqué en français courant : ce qu'il
        exige, et surtout <em>qui</em> il protège.
      </p>

      {/* ---------------------------------------------------------------- */}
      <section className="mb-12" aria-labelledby="pourquoi-title">
        <h2 id="pourquoi-title" className="text-2xl font-bold tracking-tight mb-4">
          Pourquoi c'est important (au-delà de la loi)
        </h2>
        <p className="text-text-soft leading-relaxed mb-3">
          En France, environ <strong className="text-text">12 millions de personnes</strong> vivent avec un
          handicap — visuel, auditif, moteur ou cognitif — et la population vieillit. Un site inaccessible,
          c'est un magasin dont la porte est fermée pour 15 à 20 % des visiteurs : des clients perdus, avant
          même de parler de sanction. L'accessibilité améliore aussi le référencement naturel (structure,
          alternatives textuelles) et la qualité générale du code.
        </p>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="mb-12" aria-labelledby="concernes-title">
        <h2 id="concernes-title" className="text-2xl font-bold tracking-tight mb-4">Qui est concerné ?</h2>
        <ul className="space-y-2.5 text-text-soft leading-relaxed list-disc pl-5">
          <li>
            Les <strong className="text-text">entreprises privées B2C</strong> de plus de 10 salariés{' '}
            <em>et</em> plus de 2 M€ de chiffre d'affaires dans les secteurs visés : commerce électronique,
            services bancaires, livres numériques, transport de passagers, communications électroniques,
            médias audiovisuels.
          </li>
          <li>
            Les <strong className="text-text">fabricants et distributeurs de produits</strong> : ordinateurs,
            smartphones, terminaux de paiement, distributeurs automatiques, liseuses — sans exemption pour
            les micro-entreprises.
          </li>
          <li>
            Les <strong className="text-text">services publics</strong>, déjà soumis au RGAA depuis 2019
            (article 47 de la loi de 2005), et les entreprises de plus de 250 M€ de CA depuis 2020.
          </li>
          <li>
            Les <strong className="text-text">micro-entreprises de services</strong> (moins de 10 salariés et
            moins de 2 M€ de CA) sont exemptées — mais leurs clients donneurs d'ordre peuvent l'exiger
            contractuellement.
          </li>
        </ul>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="mb-12" aria-labelledby="dates-title">
        <h2 id="dates-title" className="text-2xl font-bold tracking-tight mb-4">Les échéances</h2>
        <ol className="space-y-3">
          {DEADLINES.map((d) => (
            <li key={d.date} className="flex gap-4 rounded-[12px] border border-border px-4 py-3">
              <span className="shrink-0 w-32 font-bold text-link">{d.date}</span>
              <span className="text-text-soft text-sm leading-relaxed">{d.label}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="mb-12" aria-labelledby="sanctions-title">
        <h2 id="sanctions-title" className="text-2xl font-bold tracking-tight mb-4">
          Les sanctions encourues
        </h2>
        <p className="text-text-soft leading-relaxed mb-4">
          Le contrôle est réparti par secteur : <strong className="text-text">DGCCRF</strong> pour le
          e-commerce, ACPR/Banque de France pour la banque, Arcep pour les télécoms, Arcom pour
          l'audiovisuel, DGITM pour les transports. Les amendes sont cumulables par service et par canal :
        </p>
        <ul className="grid gap-3 sm:grid-cols-2">
          {SANCTIONS.map((s) => (
            <li key={s.amount} className="rounded-[12px] border border-danger/30 bg-danger-bg/20 px-4 py-3">
              <span className="block text-xl font-extrabold text-danger-soft">{s.amount}</span>
              <span className="text-sm text-text-soft leading-relaxed">{s.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="mb-12" aria-labelledby="auditeurs-title">
        <h2 id="auditeurs-title" className="text-2xl font-bold tracking-tight mb-4">
          Qui peut auditer ? Faut-il un auditeur « certifié » ?
        </h2>
        <p className="text-text-soft leading-relaxed mb-3">
          Non : <strong className="text-text">aucun agrément d'État n'est exigé</strong> pour réaliser un
          audit RGAA. Le modèle officiel de déclaration d'accessibilité prévoit explicitement que l'audit
          soit « réalisé en interne » ou « par la société [X] » : toute organisation compétente — y compris
          la vôtre, en autonomie avec un outil comme Konforme — peut auditer et publier sa déclaration.
        </p>
        <p className="text-text-soft leading-relaxed mb-3">
          Il existe en revanche des <strong className="text-text">certifications volontaires</strong> qui
          renforcent la crédibilité d'un auditeur ou d'un site :
        </p>
        <ul className="space-y-2.5 text-text-soft leading-relaxed list-disc pl-5">
          <li>
            <strong className="text-text">Access42 — « Auditer l'accessibilité numérique avec le RGAA »
            (RS6582)</strong> : la seule certification de compétences d'auditeur reconnue par l'État
            (enregistrée à France Compétences en 2024, finançable CPF). Individuelle : formation puis examen
            (audit d'une page en 7 h + oral devant jury).
          </li>
          <li>
            <strong className="text-text">IAAP (CPACC, WAS)</strong> : certifications individuelles
            internationales de l'International Association of Accessibility Professionals.
          </li>
          <li>
            <strong className="text-text">Opquast</strong> : certification individuelle de qualité web
            (dont accessibilité).
          </li>
          <li>
            <strong className="text-text">DEKRA Certification</strong> : ne certifie pas les auditeurs mais
            propose un <em>audit tierce partie du site</em> avec attestation (validité 3 ans) — utile quand
            un donneur d'ordre exige un regard externe.
          </li>
          <li>
            <strong className="text-text">Qualiopi</strong> : requise uniquement pour vendre de la
            <em> formation</em> financée (OPCO/CPF) — sans rapport avec le droit d'auditer.
          </li>
        </ul>
        <p className="text-text-soft leading-relaxed mt-3">
          En pratique : auditez et corrigez en autonomie, publiez votre déclaration, conservez votre
          attestation d'audit datée (générée par Konforme) — et si un client ou un contrôleur exige une
          vérification externe, un audit tierce partie viendra confirmer un travail déjà fait.
        </p>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="mb-12" aria-labelledby="methode-title">
        <h2 id="methode-title" className="text-2xl font-bold tracking-tight mb-4">
          La méthode officielle, mode d'emploi
        </h2>
        <p className="text-text-soft leading-relaxed mb-3">
          La{' '}
          <a href={RGAA_METHOD_URL} target="_blank" rel="noreferrer" className="underline text-link hover:text-white">
            méthode technique du RGAA
          </a>{' '}
          définit précisément comment auditer. Trois règles à connaître :
        </p>
        <ul className="space-y-2.5 text-text-soft leading-relaxed list-disc pl-5 mb-5">
          <li>
            Chaque critère reçoit un statut : <strong className="text-text">conforme</strong>,{' '}
            <strong className="text-text">non conforme</strong> ou{' '}
            <strong className="text-text">non applicable</strong> (le contenu concerné n'existe pas sur le
            site — par exemple les critères multimédia sur un site sans vidéo).
          </li>
          <li>
            Le <strong className="text-text">taux de conformité</strong> = critères conformes ÷ (conformes +
            non conformes). Les non-applicables sont exclus du calcul.
          </li>
          <li>
            Les termes ont un sens précis, défini par le{' '}
            <Link to="/glossaire" className="underline text-link hover:text-white">
              glossaire officiel
            </Link>{' '}
            (« image porteuse d'information », « changement de contexte »…) — nous le reproduisons
            intégralement.
          </li>
        </ul>
        <h3 className="text-lg font-bold tracking-tight mb-2">L'environnement de test de référence</h3>
        <p className="text-text-soft leading-relaxed mb-3">
          La restitution doit être vérifiée avec de vraies technologies d'assistance, dans les{' '}
          <a href={RGAA_TEST_ENV_URL} target="_blank" rel="noreferrer" className="underline text-link hover:text-white">
            combinaisons de référence
          </a>{' '}
          :
        </p>
        <div className="overflow-x-auto rounded-[14px] border border-border mb-4">
          <table className="w-full text-sm">
            <caption className="sr-only">Environnement de test de référence du RGAA</caption>
            <thead>
              <tr className="border-b border-border bg-surface text-left text-xs uppercase tracking-wider text-text-muted">
                <th scope="col" className="px-4 py-3 font-semibold">Plateforme</th>
                <th scope="col" className="px-4 py-3 font-semibold">Technologie d'assistance</th>
                <th scope="col" className="px-4 py-3 font-semibold">Navigateur</th>
              </tr>
            </thead>
            <tbody>
              {RGAA_TEST_ENVIRONMENTS.map((e) => (
                <tr key={`${e.platform}-${e.at}`} className="border-b border-border last:border-0">
                  <td className="px-4 py-2.5 text-text-soft">{e.platform}</td>
                  <td className="px-4 py-2.5 text-text-soft">{e.at}</td>
                  <td className="px-4 py-2.5 text-text-soft">{e.browser}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-text-dim">
          À noter : la <strong className="text-text-soft">version 5 du RGAA</strong> est en cours de
          rédaction (publication prévue fin 2026). N'attendez pas pour vous mettre en conformité : les
          critères actuels resteront la base de la future version.
        </p>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="mb-12" aria-labelledby="criteres-title">
        <h2 id="criteres-title" className="text-2xl font-bold tracking-tight mb-4">
          Les 106 critères du RGAA 4.1.2, un par un
        </h2>
        <p className="text-text-soft leading-relaxed mb-6">
          Le RGAA traduit les exigences européennes (norme EN 301 549, WCAG 2.1 niveau AA) en{' '}
          <strong className="text-text">106 critères vérifiables</strong>, répartis en 13 thématiques. Pour
          chacun : l'exigence, son niveau (A ou AA), les critères WCAG correspondants, ce que notre moteur
          teste automatiquement, et une explication en français courant.
        </p>
        <div className="space-y-8">
          {RGAA_TOPICS.map((topic) => (
            <article key={topic.id} aria-labelledby={`guide-topic-${topic.id}`}>
              <h3 id={`guide-topic-${topic.id}`} className="text-xl font-bold tracking-tight mb-1">
                {topic.id}. {topic.name}
              </h3>
              <p className="text-sm text-text-dim mb-3">{topic.description}</p>
              <ul className="space-y-2">
                {RGAA_CRITERIA.filter((c) => c.topic === topic.id).map((c) => (
                  <li key={c.id} className="rounded-[12px] border border-border px-4 py-3">
                    <p className="text-sm font-semibold text-text">
                      <span className="text-link tabular-nums">{c.id}</span> — {c.title}
                    </p>
                    <p className="mt-1 text-sm text-text-soft leading-relaxed">{c.plain}</p>
                    <p className="mt-1.5 text-xs text-text-dim">
                      Niveau {c.level} · WCAG {c.wcag.join(', ')} · {COVERAGE_META[c.coverage]} ·{' '}
                      <Link to={`/rgaa/critere/${c.id}`} className="underline text-link hover:text-white">
                        fiche détaillée
                      </Link>{' '}
                      ·{' '}
                      <a
                        href={rgaaCriterionUrl(c.id)}
                        target="_blank"
                        rel="noreferrer"
                        className="underline text-link hover:text-white"
                      >
                        texte officiel
                      </a>
                    </p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="mb-12" aria-labelledby="pros-title">
        <h2 id="pros-title" className="text-2xl font-bold tracking-tight mb-4">
          La démarche de mise en conformité, pour les professionnels
        </h2>
        <ol className="space-y-3">
          {PRO_STEPS.map((s) => (
            <li key={s.title} className="rounded-[12px] border border-border px-4 py-3.5">
              <h3 className="font-bold text-text mb-1">{s.title}</h3>
              <p className="text-sm text-text-soft leading-relaxed">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="mb-12" aria-labelledby="declaration-title">
        <h2 id="declaration-title" className="text-2xl font-bold tracking-tight mb-4">
          La déclaration d'accessibilité, mode d'emploi
        </h2>
        <p className="text-text-soft leading-relaxed mb-3">
          C'est le document légal qui doit être accessible depuis chaque page de votre site (souvent en pied
          de page). Elle comporte obligatoirement :
        </p>
        <ul className="space-y-2.5 text-text-soft leading-relaxed list-disc pl-5">
          <li>
            L'<strong className="text-text">état de conformité</strong>, calculé sur les critères applicables :{' '}
            <em>totalement conforme</em> (100 %), <em>partiellement conforme</em> (≥ 50 %) ou{' '}
            <em>non conforme</em> (&lt; 50 % ou aucun audit valide) ;
          </li>
          <li>La <strong className="text-text">liste des contenus non accessibles</strong>, avec les éventuelles dérogations pour charge disproportionnée (à justifier) ;</li>
          <li>Un <strong className="text-text">dispositif de retour</strong> permettant de signaler un défaut et d'obtenir une alternative accessible ;</li>
          <li>Les <strong className="text-text">voies de recours</strong> (Défenseur des droits) ;</li>
          <li>L'échantillon de pages audité, les technologies et l'environnement de test, la date de l'audit.</li>
        </ul>
        <p className="text-text-soft leading-relaxed mt-3">
          Konforme génère cette déclaration pré-remplie au format officiel depuis votre tableau de bord.
        </p>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="mb-12" aria-labelledby="users-title">
        <h2 id="users-title" className="text-2xl font-bold tracking-tight mb-4">
          Comment lire un rapport Konforme (pour tous)
        </h2>
        <ul className="space-y-2.5 text-text-soft leading-relaxed list-disc pl-5">
          <li>
            <strong className="text-text">Le taux de conformité</strong> mesure la part des règles respectées
            sur les pages auditées. Un badge coloré (vert ≥ 85 %, orange ≥ 50 %, rouge en dessous) peut être
            affiché sur votre site.
          </li>
          <li>
            <strong className="text-text">L'onglet « Les 106 critères RGAA »</strong> montre, critère par
            critère, ce qui est validé, non conforme, ou à vérifier manuellement — avec une info-bulle « ? »
            qui explique chaque exigence sans jargon.
          </li>
          <li>
            <strong className="text-text">Chaque non-conformité</strong> indique la page, l'élément exact
            (sélecteur et code HTML), la gravité, et une correction suggérée — à transmettre telle quelle à
            votre développeur ou votre agence.
          </li>
          <li>
            <strong className="text-text">Les exports</strong> (PDF, HTML, Markdown, CSV) produisent un
            livrable d'audit complet, globalement ou page par page — présentable en interne comme à un
            contrôleur.
          </li>
        </ul>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="rounded-[16px] border border-border bg-surface px-6 py-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight mb-2">Où en est votre site ?</h2>
        <p className="text-text-muted leading-relaxed mb-5">
          Testez gratuitement vos pages : taux de conformité, non-conformités détaillées et plan d'action en
          quelques minutes.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/">
            <Button variant="primary">Auditer mon site gratuitement</Button>
          </Link>
          <Link to="/rgaa">
            <Button variant="outline">Comprendre le RGAA</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
