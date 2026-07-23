import type { Lang } from '@/i18n'
import type { ScanIssue, Severity } from '@/lib/database.types'
import { SEVERITY_META } from '@/lib/format'
import { criterionForRule } from '@/lib/rgaa'

/**
 * Plan d'action : regroupe les non-conformités ouvertes par règle pour en
 * faire des actions correctives priorisées (une action = un correctif à
 * appliquer partout où la règle échoue), avec estimation d'effort.
 */

export type ActionEffort = 'quick' | 'medium' | 'complex'

export type ActionItem = {
  ruleId: string
  title: string
  severity: Severity
  category: string | null
  criterionId: string | null
  /** Nombre d'occurrences ouvertes. */
  count: number
  /** Pages concernées (uniques). */
  pages: string[]
  suggestedFix: string | null
  effort: ActionEffort
}

export const EFFORT_META: Record<ActionEffort, { label: string; className: string }> = {
  quick: { label: 'Correction rapide', className: 'bg-success-bg/60 text-success-soft border-success/40' },
  medium: { label: 'Effort moyen', className: 'bg-warning-bg/60 text-warning-soft border-warning/40' },
  complex: { label: 'Chantier', className: 'bg-info-bg/60 text-info-soft border-info/40' },
}

const EFFORT_L10N: Record<Lang, Record<ActionEffort, string>> = {
  fr: { quick: 'Correction rapide', medium: 'Effort moyen', complex: 'Chantier' },
  en: { quick: 'Quick fix', medium: 'Medium effort', complex: 'Larger project' },
  de: { quick: 'Schnelle Korrektur', medium: 'Mittlerer Aufwand', complex: 'Größeres Vorhaben' },
  es: { quick: 'Corrección rápida', medium: 'Esfuerzo medio', complex: 'Proyecto mayor' },
  it: { quick: 'Correzione rapida', medium: 'Impegno medio', complex: 'Intervento importante' },
}

export function effortLabel(lang: Lang, effort: ActionEffort): string {
  return (EFFORT_L10N[lang] ?? EFFORT_L10N.fr)[effort]
}

/** Estimation grossière : la plupart des corrections « attribut manquant » sont rapides. */
function estimateEffort(category: string | null): ActionEffort {
  switch (category) {
    case 'Images':
    case 'Liens':
    case 'Cadres':
    case 'Éléments obligatoires':
    case 'Formulaires':
      return 'quick'
    case 'Structuration':
    case 'Tableaux':
    case 'Navigation':
    case 'Présentation':
    case 'Consultation':
      return 'medium'
    default:
      return 'complex'
  }
}

export function buildActionPlan(issues: ScanIssue[]): ActionItem[] {
  const open = issues.filter((i) => i.status === 'open' || i.status === 'in_progress')
  const byRule = new Map<string, ActionItem>()
  for (const i of open) {
    let item = byRule.get(i.rule_id)
    if (!item) {
      item = {
        ruleId: i.rule_id,
        title: i.title,
        severity: i.severity,
        category: i.category,
        criterionId: criterionForRule(i.rule_id)?.id ?? null,
        count: 0,
        pages: [],
        suggestedFix: i.suggested_fix,
        effort: estimateEffort(i.category),
      }
      byRule.set(i.rule_id, item)
    }
    item.count++
    if (i.page_url && !item.pages.includes(i.page_url)) item.pages.push(i.page_url)
  }
  return [...byRule.values()].sort(
    (a, b) =>
      SEVERITY_META[a.severity].weight - SEVERITY_META[b.severity].weight || b.count - a.count,
  )
}

/** Les victoires rapides : sévérité critique/majeure ET correction rapide. */
export function quickWins(plan: ActionItem[]): ActionItem[] {
  return plan.filter(
    (a) => (a.severity === 'critical' || a.severity === 'serious') && a.effort === 'quick',
  )
}
