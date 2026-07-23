import type { Lang } from '@/i18n'
import { POSTS, type Post } from '@/content/posts'
import { LEGAL_DOCS, type LegalDoc } from '@/content/legal'
import { POSTS_EN } from '@/i18n/posts/en'
import { POSTS_DE } from '@/i18n/posts/de'
import { POSTS_ES } from '@/i18n/posts/es'
import { POSTS_IT } from '@/i18n/posts/it'
import { LEGAL_EN } from '@/i18n/legal/en'
import { LEGAL_DE } from '@/i18n/legal/de'
import { LEGAL_ES } from '@/i18n/legal/es'
import { LEGAL_IT } from '@/i18n/legal/it'

/**
 * Contenus éditoriaux et juridiques traduits.
 *
 * Les articles de blog et les documents légaux existent dans les 5 langues.
 * Le français (src/content/*) reste la version de référence : en cas de
 * divergence d'interprétation d'un document juridique, c'est elle qui fait foi
 * — chaque traduction porte une clause en ce sens.
 */

const POSTS_L10N: Record<Exclude<Lang, 'fr'>, Post[]> = {
  en: POSTS_EN,
  de: POSTS_DE,
  es: POSTS_ES,
  it: POSTS_IT,
}

const LEGAL_L10N: Record<Exclude<Lang, 'fr'>, LegalDoc[]> = {
  en: LEGAL_EN,
  de: LEGAL_DE,
  es: LEGAL_ES,
  it: LEGAL_IT,
}

/** Articles de blog dans la langue demandée (repli : français). */
export function localizedPosts(lang: Lang): Post[] {
  if (lang === 'fr') return POSTS
  const translated = POSTS_L10N[lang]
  if (!translated?.length) return POSTS
  // Repli article par article : un article non traduit reste en français
  return POSTS.map((p) => translated.find((t) => t.slug === p.slug) ?? p)
}

/** Un article par son slug (les slugs sont identiques dans toutes les langues). */
export function localizedPost(lang: Lang, slug: string): Post | undefined {
  return localizedPosts(lang).find((p) => p.slug === slug)
}

/** Documents légaux dans la langue demandée (repli : français). */
export function localizedLegalDocs(lang: Lang): LegalDoc[] {
  if (lang === 'fr') return LEGAL_DOCS
  const translated = LEGAL_L10N[lang]
  if (!translated?.length) return LEGAL_DOCS
  return LEGAL_DOCS.map((d) => translated.find((t) => t.slug === d.slug) ?? d)
}

export function localizedLegalDoc(lang: Lang, slug: string): LegalDoc | undefined {
  return localizedLegalDocs(lang).find((d) => d.slug === slug)
}
