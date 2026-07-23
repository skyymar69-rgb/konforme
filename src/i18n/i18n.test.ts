import { describe, expect, it } from 'vitest'
import { LANGS, localizePath, unlocalizePath, alternatesFor, isLang } from './index'
import { CRITERIA_L10N, TOPICS_L10N, localizeCriterion, localizeTopic } from './rgaa-i18n'
import { RULES_L10N, localizeIssueTitle, localizeIssueFix } from './rules-i18n'
import { RGAA_CRITERIA, RGAA_TOPICS } from '@/lib/rgaa'
import { localizedLegalDocs, localizedPost, localizedPosts } from './content-i18n'

const TRANSLATED = ['en', 'de', 'es', 'it'] as const

describe('routage multilingue', () => {
  it('garde le français à la racine et préfixe les autres langues', () => {
    expect(localizePath('fr', '/tarifs')).toBe('/tarifs')
    expect(localizePath('fr', '/')).toBe('/')
    expect(localizePath('en', '/tarifs')).toBe('/en/tarifs')
    expect(localizePath('de', '/')).toBe('/de')
  })

  it('retire le préfixe de langue', () => {
    expect(unlocalizePath('/en/tarifs')).toEqual({ lang: 'en', path: '/tarifs' })
    expect(unlocalizePath('/it')).toEqual({ lang: 'it', path: '/' })
    expect(unlocalizePath('/tarifs')).toEqual({ lang: 'fr', path: '/tarifs' })
    // Un segment qui n'est pas une langue reste un chemin français
    expect(unlocalizePath('/rgaa/critere/1.1')).toEqual({ lang: 'fr', path: '/rgaa/critere/1.1' })
  })

  it('produit les alternates hreflang des 5 langues plus x-default', () => {
    const alts = alternatesFor('/rgaa')
    expect(Object.keys(alts).sort()).toEqual(['de', 'en', 'es', 'fr', 'it', 'x-default'].sort())
    expect(alts.fr).toBe('/rgaa')
    expect(alts.es).toBe('/es/rgaa')
  })

  it('valide les codes de langue', () => {
    expect(isLang('en')).toBe(true)
    expect(isLang('pt')).toBe(false)
    expect(isLang(undefined)).toBe(false)
  })
})

describe('référentiel RGAA traduit', () => {
  it('traduit les 13 thématiques dans les 4 langues', () => {
    for (const lang of TRANSLATED) {
      const topics = TOPICS_L10N[lang]
      expect(Object.keys(topics), `thématiques ${lang}`).toHaveLength(13)
      for (const t of RGAA_TOPICS) {
        expect(topics[t.id]?.name, `thématique ${t.id} en ${lang}`).toBeTruthy()
        expect(topics[t.id]?.description, `description ${t.id} en ${lang}`).toBeTruthy()
      }
    }
  })

  it('traduit les 106 critères dans les 4 langues', () => {
    for (const lang of TRANSLATED) {
      const dict = CRITERIA_L10N[lang]
      expect(Object.keys(dict), `critères ${lang}`).toHaveLength(106)
      for (const c of RGAA_CRITERIA) {
        expect(dict[c.id]?.title, `critère ${c.id} en ${lang}`).toBeTruthy()
        expect(dict[c.id]?.plain, `explication ${c.id} en ${lang}`).toBeTruthy()
      }
    }
  })

  it('ne laisse aucune traduction identique au français (copie oubliée)', () => {
    for (const lang of TRANSLATED) {
      const identical = RGAA_CRITERIA.filter((c) => CRITERIA_L10N[lang][c.id]?.title === c.title)
      // Quelques titres peuvent légitimement coïncider (ES/IT proches du FR) ;
      // au-delà de 15 %, c'est le signe d'un lot non traduit.
      expect(identical.length, `titres non traduits en ${lang}`).toBeLessThan(16)
    }
  })

  it('replie sur le français pour une langue non traduite', () => {
    const c = RGAA_CRITERIA[0]
    expect(localizeCriterion('fr', c)).toEqual({ title: c.title, plain: c.plain })
    expect(localizeCriterion('en', c).title).not.toBe(c.title)
    const t = RGAA_TOPICS[0]
    expect(localizeTopic('fr', t)).toEqual({ name: t.name, description: t.description })
  })
})

describe('règles du moteur traduites', () => {
  it('couvre les mêmes règles dans les 4 langues', () => {
    const reference = Object.keys(RULES_L10N.en).sort()
    expect(reference.length).toBeGreaterThanOrEqual(40)
    for (const lang of TRANSLATED) {
      expect(Object.keys(RULES_L10N[lang]).sort(), `règles ${lang}`).toEqual(reference)
    }
  })

  it('traduit le titre et le correctif d’une issue, avec repli', () => {
    const issue = {
      rule_id: 'RGAA 1.1 / WCAG 1.1.1',
      title: 'Image sans alternative textuelle',
      suggested_fix: 'Ajoutez alt="…"',
    }
    expect(localizeIssueTitle('fr', issue)).toBe(issue.title)
    expect(localizeIssueTitle('en', issue)).toBe('Image without a text alternative')
    expect(localizeIssueFix('de', issue)).toContain('alt=')
    // Règle inconnue (issue axe-core) : on garde le texte d'origine
    expect(localizeIssueTitle('en', { rule_id: 'axe:inconnue', title: 'Titre brut' })).toBe('Titre brut')
  })
})

describe('couverture des langues', () => {
  it('déclare exactement 5 langues', () => {
    expect(LANGS).toEqual(['fr', 'en', 'de', 'es', 'it'])
  })
})

describe('contenus éditoriaux et juridiques traduits', () => {
  it('fournit les 3 articles dans les 5 langues, avec les mêmes slugs', () => {
    const frSlugs = localizedPosts('fr').map((p) => p.slug)
    expect(frSlugs).toHaveLength(3)
    for (const lang of LANGS) {
      const posts = localizedPosts(lang)
      expect(posts.map((p) => p.slug), `slugs des articles en ${lang}`).toEqual(frSlugs)
      for (const p of posts) {
        expect(p.title, `titre de ${p.slug} en ${lang}`).toBeTruthy()
        expect(p.description, `description de ${p.slug} en ${lang}`).toBeTruthy()
        expect(p.sections.length, `sections de ${p.slug} en ${lang}`).toBeGreaterThan(0)
      }
    }
  })

  it('conserve la structure des articles à l’identique dans chaque langue', () => {
    for (const fr of localizedPosts('fr')) {
      for (const lang of TRANSLATED) {
        const translated = localizedPost(lang, fr.slug)!
        expect(translated.date, `date de ${fr.slug} en ${lang}`).toBe(fr.date)
        expect(translated.readingMinutes, `durée de ${fr.slug} en ${lang}`).toBe(fr.readingMinutes)
        expect(translated.sections.length, `nb sections de ${fr.slug} en ${lang}`).toBe(
          fr.sections.length,
        )
      }
    }
  })

  it('traduit réellement les articles (titres différents du français)', () => {
    for (const lang of TRANSLATED) {
      const identical = localizedPosts('fr').filter(
        (fr) => localizedPost(lang, fr.slug)?.title === fr.title,
      )
      expect(identical, `articles non traduits en ${lang}`).toHaveLength(0)
    }
  })

  it('fournit les 6 documents légaux dans les 5 langues, avec les mêmes slugs', () => {
    const frSlugs = localizedLegalDocs('fr').map((d) => d.slug)
    expect(frSlugs).toHaveLength(6)
    for (const lang of LANGS) {
      const docs = localizedLegalDocs(lang)
      expect(docs.map((d) => d.slug), `slugs des documents en ${lang}`).toEqual(frSlugs)
      for (const d of docs) {
        expect(d.title, `titre de ${d.slug} en ${lang}`).toBeTruthy()
        expect(d.body, `corps de ${d.slug} en ${lang}`).toBeTruthy()
        // La date de mise à jour doit rester celle du document de référence
        expect(d.updated, `date de ${d.slug} en ${lang}`).toBe(
          localizedLegalDocs('fr').find((f) => f.slug === d.slug)!.updated,
        )
      }
    }
  })
})
