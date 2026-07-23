import { useMemo, useState } from 'react'
import { Seo } from '@/components/Seo'
import { RGAA_GLOSSARY_URL, RGAA_VERSION } from '@/lib/rgaa'
import glossaireJson from '@/content/rgaa/glossaire.json'

type GlossaryEntry = { title: string; body: string }

const ENTRIES: GlossaryEntry[] = (glossaireJson as { glossary: GlossaryEntry[] }).glossary

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ')
}

/**
 * Le glossaire complet et officiel du RGAA (source : DINUM,
 * accessibilite.numerique.gouv.fr) — indispensable pour appliquer la méthode :
 * chaque critère s'appuie sur ces définitions précises.
 */
export function Glossaire() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ENTRIES
    return ENTRIES.filter(
      (e) => e.title.toLowerCase().includes(q) || stripHtml(e.body).toLowerCase().includes(q),
    )
  }, [query])

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <Seo
        title={`Glossaire officiel du RGAA ${RGAA_VERSION} : tous les termes définis`}
        description="Le glossaire complet de la méthode RGAA (source officielle DINUM) : alternative textuelle, composant d'interface, changement de contexte… toutes les définitions nécessaires pour appliquer les 106 critères."
        path="/glossaire"
      />

      <p className="text-xs font-semibold uppercase tracking-wider text-link mb-3">Méthode officielle</p>
      <h1 className="text-4xl font-extrabold tracking-tight mb-6">
        Glossaire du RGAA {RGAA_VERSION}
      </h1>
      <p className="text-lg text-text-muted leading-relaxed mb-4">
        La méthode RGAA repose sur des définitions précises : « image porteuse d'information »,
        « changement de contexte », « étiquette »… Ce glossaire reprend{' '}
        <strong className="text-text">l'intégralité des {ENTRIES.length} définitions officielles</strong>{' '}
        publiées par la DINUM sur{' '}
        <a href={RGAA_GLOSSARY_URL} target="_blank" rel="noreferrer" className="underline text-link hover:text-white">
          accessibilite.numerique.gouv.fr
        </a>
        .
      </p>

      <div className="mb-8">
        <label htmlFor="glossary-search" className="mb-1 block text-sm font-semibold">
          Rechercher un terme
        </label>
        <input
          id="glossary-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ex. : alternative textuelle, focus, contraste…"
          className="w-full rounded-[10px] border border-border bg-surface px-4 py-2.5 text-sm text-text"
        />
        <p className="mt-1 text-xs text-text-dim" role="status">
          {filtered.length} terme{filtered.length > 1 ? 's' : ''} affiché{filtered.length > 1 ? 's' : ''}
        </p>
      </div>

      <div className="space-y-6">
        {filtered.map((e) => (
          <article
            key={e.title}
            id={slugify(e.title)}
            className="rounded-[14px] border border-border px-5 py-4"
            aria-labelledby={`term-${slugify(e.title)}`}
          >
            <h2 id={`term-${slugify(e.title)}`} className="text-lg font-bold tracking-tight mb-2">
              {e.title}
            </h2>
            <div
              className="glossary-body text-sm text-text-soft leading-relaxed [&_a]:underline [&_a]:text-link [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mt-1 [&_code]:text-primary-soft [&_code]:text-xs [&_p]:mt-2 [&_img]:max-w-full"
              dangerouslySetInnerHTML={{ __html: e.body }}
            />
          </article>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-text-muted py-8 text-center">
            Aucun terme ne correspond à « {query} ».
          </p>
        )}
      </div>

      <p className="mt-10 text-xs text-text-dim">
        Source : glossaire officiel du RGAA {RGAA_VERSION}, DINUM — reproduit à des fins de référence.
        Les liens internes des définitions peuvent renvoyer vers le site officiel.
      </p>
    </div>
  )
}
