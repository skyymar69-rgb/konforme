import type { Lang } from '@/i18n'
import type { RgaaCriterion, RgaaTopic } from '@/lib/rgaa'
import { CRITERIA_EN } from '@/i18n/rgaa/en'
import { CRITERIA_DE } from '@/i18n/rgaa/de'
import { CRITERIA_ES } from '@/i18n/rgaa/es'
import { CRITERIA_IT } from '@/i18n/rgaa/it'
import { TOPICS_L10N } from '@/i18n/rgaa/topics'

/**
 * Traductions du référentiel RGAA (13 thématiques, 106 critères) en
 * EN/DE/ES/IT. Le français (source officielle DINUM) vient de src/lib/rgaa.ts.
 * Repli : français si une traduction manque.
 */

export type CriterionL10n = { title: string; plain: string }
export type TopicL10n = { name: string; description: string }

export const CRITERIA_L10N: Record<Exclude<Lang, 'fr'>, Record<string, CriterionL10n>> = {
  en: CRITERIA_EN,
  de: CRITERIA_DE,
  es: CRITERIA_ES,
  it: CRITERIA_IT,
}

export { TOPICS_L10N }

export function localizeCriterion(lang: Lang, c: RgaaCriterion): CriterionL10n {
  if (lang !== 'fr') {
    const hit = CRITERIA_L10N[lang]?.[c.id]
    if (hit) return hit
  }
  return { title: c.title, plain: c.plain }
}

export function localizeTopic(lang: Lang, t: RgaaTopic): TopicL10n {
  if (lang !== 'fr') {
    const hit = TOPICS_L10N[lang]?.[t.id]
    if (hit) return hit
  }
  return { name: t.name, description: t.description }
}
