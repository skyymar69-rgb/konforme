/* eslint-disable react-refresh/only-export-components -- hooks et helpers i18n co-localisés */
/**
 * i18n Konforme — 5 langues, sans dépendance externe.
 *
 * Principe : chaque composant définit ses textes dans un objet local
 * `const L = defineMessages({ fr: {...}, en: {...}, de: {...}, es: {...}, it: {...} })`
 * puis les consomme via `const t = useMessages(L)`.
 *
 * - Langue des pages publiques : préfixe d'URL (/en/tarifs, /de/rgaa…),
 *   le français reste à la racine (/tarifs).
 * - Langue du dashboard : préférence utilisateur (localStorage), pas d'URL.
 * - `useLang()` donne la langue courante ; `localizePath()` fabrique les liens.
 */
import { createContext, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export type Lang = 'fr' | 'en' | 'de' | 'es' | 'it'
export const LANGS: Lang[] = ['fr', 'en', 'de', 'es', 'it']
export const LANG_LABELS: Record<Lang, string> = {
  fr: 'Français', en: 'English', de: 'Deutsch', es: 'Español', it: 'Italiano',
}

const STORAGE_KEY = 'konforme_lang'

export function isLang(v: string | undefined): v is Lang {
  return !!v && (LANGS as string[]).includes(v)
}

const LangContext = createContext<Lang>('fr')

export function LangProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* stockage indisponible */
    }
  }, [lang])
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>
}

export function useLang(): Lang {
  return useContext(LangContext)
}

/** Langue mémorisée (dashboard) ou navigateur, défaut fr. */
export function storedLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (isLang(saved ?? undefined)) return saved as Lang
  } catch {
    /* stockage indisponible */
  }
  const nav = (navigator.language || 'fr').slice(0, 2)
  return isLang(nav) ? (nav as Lang) : 'fr'
}

/** Préfixe un chemin public avec la langue courante (fr = racine). */
export function localizePath(lang: Lang, path: string): string {
  if (lang === 'fr') return path
  return path === '/' ? `/${lang}` : `/${lang}${path}`
}

/** Retire un éventuel préfixe de langue d'un chemin. */
export function unlocalizePath(pathname: string): { lang: Lang; path: string } {
  const m = /^\/(en|de|es|it)(\/|$)/.exec(pathname)
  if (!m) return { lang: 'fr', path: pathname }
  const rest = pathname.slice(m[1].length + 1) || '/'
  return { lang: m[1] as Lang, path: rest }
}

/** Alternates hreflang pour un chemin public donné (non préfixé). */
export function alternatesFor(path: string): Record<string, string> {
  const out: Record<string, string> = { 'x-default': path }
  for (const l of LANGS) out[l] = localizePath(l, path)
  return out
}

/** Identité typée : garantit que chaque langue fournit les mêmes clés que fr. */
export function defineMessages<T extends Record<string, unknown>>(dicts: Record<Lang, T>): Record<Lang, T> {
  return dicts
}

/** Messages du composant dans la langue courante (repli fr par clé absente). */
export function useMessages<T extends Record<string, unknown>>(dicts: Record<Lang, T>): T {
  const lang = useLang()
  if (lang === 'fr') return dicts.fr
  return { ...dicts.fr, ...dicts[lang] }
}

/** Wrapper de route publique : valide le préfixe /:lang et fournit le contexte. */
export function useRouteLang(): Lang {
  const { lang } = useParams<{ lang?: string }>()
  return isLang(lang) ? lang : 'fr'
}
