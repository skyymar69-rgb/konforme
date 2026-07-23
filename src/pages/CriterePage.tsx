import { Link, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Seo } from '@/components/Seo'
import { COVERAGE_META } from '@/lib/conformity'
import { RGAA_BY_ID, RGAA_CRITERIA, RGAA_TOPICS, rgaaCriterionUrl } from '@/lib/rgaa'

/**
 * Fiche publique d'un critère RGAA (SEO programmatique : 106 pages générées
 * depuis le référentiel, /rgaa/critere/:id). Chaque fiche explique le critère
 * en français courant, son cadre légal et comment le vérifier.
 */
export function CriterePage() {
  const { id } = useParams<{ id: string }>()
  const criterion = id ? RGAA_BY_ID.get(id) : undefined

  if (!criterion) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <Seo title="Critère introuvable" description="Ce critère RGAA n'existe pas." path="/rgaa" noindex />
        <h1 className="text-2xl font-bold mb-3">Critère introuvable</h1>
        <p className="text-text-muted mb-6">Le RGAA 4.1.2 compte 106 critères, numérotés de 1.1 à 13.12.</p>
        <Link to="/rgaa"><Button variant="primary">Voir les 13 thématiques du RGAA</Button></Link>
      </div>
    )
  }

  const topic = RGAA_TOPICS.find((t) => t.id === criterion.topic)!
  const siblings = RGAA_CRITERIA.filter((c) => c.topic === criterion.topic && c.id !== criterion.id)
  const index = RGAA_CRITERIA.findIndex((c) => c.id === criterion.id)
  const prev = RGAA_CRITERIA[index - 1]
  const next = RGAA_CRITERIA[index + 1]

  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <Seo
        title={`Critère RGAA ${criterion.id} : ${criterion.title}`}
        description={`Critère ${criterion.id} du RGAA 4.1.2 (niveau ${criterion.level}, WCAG ${criterion.wcag.join(', ')}) expliqué simplement : ${criterion.plain.slice(0, 120)}…`}
        path={`/rgaa/critere/${criterion.id}`}
        type="article"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: `Critère RGAA ${criterion.id} : ${criterion.title}`,
            inLanguage: 'fr-FR',
            author: { '@type': 'Organization', name: 'Konforme' },
            publisher: { '@type': 'Organization', name: 'KAYZEN SASU' },
          },
        ]}
      />

      <nav aria-label="Fil d'Ariane" className="text-sm text-text-dim mb-3">
        <Link to="/rgaa" className="hover:text-white hover:underline">RGAA</Link>
        {' / '}
        <span>{topic.id}. {topic.name}</span>
        {' / '}
        <span aria-current="page">Critère {criterion.id}</span>
      </nav>

      <p className="text-xs font-semibold uppercase tracking-wider text-link mb-3">
        RGAA 4.1.2 · Thématique {topic.id} — {topic.name} · Niveau {criterion.level}
      </p>
      <h1 className="text-3xl font-extrabold tracking-tight mb-6">
        Critère {criterion.id} — {criterion.title}
      </h1>

      <section className="mb-8" aria-labelledby="pourquoi">
        <h2 id="pourquoi" className="text-xl font-bold tracking-tight mb-3">
          Ce que ce critère exige, et pourquoi
        </h2>
        <p className="text-lg text-text-soft leading-relaxed">{criterion.plain}</p>
      </section>

      <section className="mb-8 grid gap-3 sm:grid-cols-2" aria-label="Caractéristiques du critère">
        <div className="rounded-[12px] border border-border px-4 py-3">
          <span className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1">Correspondance WCAG</span>
          <span className="text-text-soft">{criterion.wcag.map((w) => `${w} (niveau ${criterion.level})`).join(', ')}</span>
        </div>
        <div className="rounded-[12px] border border-border px-4 py-3">
          <span className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1">Vérification</span>
          <span className="text-text-soft">{COVERAGE_META[criterion.coverage]}</span>
        </div>
      </section>

      <section className="mb-8" aria-labelledby="cadre">
        <h2 id="cadre" className="text-xl font-bold tracking-tight mb-3">Le cadre légal</h2>
        <p className="text-text-soft leading-relaxed">
          Ce critère fait partie des 106 critères du RGAA 4.1.2, la méthode française exigée pour démontrer
          la conformité à la directive européenne (UE) 2019/882 (European Accessibility Act, applicable
          depuis le 28 juin 2025) et à l'article 47 de la loi de 2005. En cas de contrôle, la DGCCRF peut
          prononcer jusqu'à 50 000 € d'amende par service non conforme.{' '}
          <Link to="/guide-accessibilite" className="underline text-link hover:text-white">
            Voir le guide complet des obligations
          </Link>
          .
        </p>
      </section>

      <section className="mb-8" aria-labelledby="verifier">
        <h2 id="verifier" className="text-xl font-bold tracking-tight mb-3">Comment le vérifier sur votre site</h2>
        <p className="text-text-soft leading-relaxed mb-4">
          {criterion.coverage === 'manual'
            ? 'Ce critère nécessite une vérification humaine. Konforme vous guide : l’onglet « Les 106 critères RGAA » de chaque rapport permet de l’évaluer (conforme, non conforme, non applicable) avec une note justificative, selon la méthode officielle.'
            : 'Ce critère est vérifié automatiquement par l’audit Konforme : chaque non-conformité est localisée (page, sélecteur CSS, code HTML concerné) avec une correction suggérée et un assistant IA.'}{' '}
          Le détail officiel des tests est publié par la DINUM :{' '}
          <a href={rgaaCriterionUrl(criterion.id)} target="_blank" rel="noreferrer" className="underline text-link hover:text-white">
            critère {criterion.id} sur accessibilite.numerique.gouv.fr
          </a>
          .
        </p>
        <Link to="/">
          <Button variant="primary">Tester mon site gratuitement</Button>
        </Link>
      </section>

      <section className="mb-8" aria-labelledby="theme">
        <h2 id="theme" className="text-xl font-bold tracking-tight mb-3">
          Les autres critères de la thématique « {topic.name} »
        </h2>
        <p className="text-sm text-text-dim mb-3">{topic.description}</p>
        <ul className="space-y-1.5">
          {siblings.map((c) => (
            <li key={c.id}>
              <Link to={`/rgaa/critere/${c.id}`} className="text-sm text-text-soft underline hover:text-white">
                Critère {c.id} — {c.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <nav className="flex justify-between gap-4 border-t border-border pt-5" aria-label="Critère précédent / suivant">
        {prev ? (
          <Link to={`/rgaa/critere/${prev.id}`} className="text-sm text-text-muted hover:text-white hover:underline">
            ← Critère {prev.id}
          </Link>
        ) : <span />}
        {next ? (
          <Link to={`/rgaa/critere/${next.id}`} className="text-sm text-text-muted hover:text-white hover:underline">
            Critère {next.id} →
          </Link>
        ) : <span />}
      </nav>
    </div>
  )
}
