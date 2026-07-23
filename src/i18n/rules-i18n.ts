import type { Lang } from '@/i18n'
import type { ScanIssue } from '@/lib/database.types'
import { RULES_EN } from '@/i18n/rules/en'
import { RULES_DE } from '@/i18n/rules/de'
import { RULES_ES } from '@/i18n/rules/es'
import { RULES_IT } from '@/i18n/rules/it'

/**
 * Traductions des règles du moteur d'audit (titres et corrections suggérées),
 * indexées par rule_id. Les issues sont stockées en français au moment du
 * scan ; l'interface les traduit à l'affichage. Repli : texte original.
 */

export type RuleL10n = { title: string; fix?: string }

export const RULES_L10N: Record<Exclude<Lang, 'fr'>, Record<string, RuleL10n>> = {
  en: RULES_EN,
  de: RULES_DE,
  es: RULES_ES,
  it: RULES_IT,
}

export function localizeRule(lang: Lang, ruleId: string): RuleL10n | null {
  if (lang === 'fr') return null
  return RULES_L10N[lang]?.[ruleId] ?? null
}

export function localizeIssueTitle(lang: Lang, issue: Pick<ScanIssue, 'rule_id' | 'title'>): string {
  return localizeRule(lang, issue.rule_id)?.title ?? issue.title
}

export function localizeIssueFix(
  lang: Lang,
  issue: Pick<ScanIssue, 'rule_id' | 'suggested_fix'>,
): string | null {
  return localizeRule(lang, issue.rule_id)?.fix ?? issue.suggested_fix
}
