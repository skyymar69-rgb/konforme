import type { ScanIssue } from '@/lib/database.types'

/**
 * Comparaison de deux audits du même site : quelles non-conformités sont
 * apparues, lesquelles ont disparu. Une issue est identifiée par sa règle,
 * sa page et son sélecteur (le même défaut au même endroit).
 */

export type ScanDiff = {
  /** Présentes dans l'audit courant mais pas dans le précédent. */
  appeared: ScanIssue[]
  /** Présentes dans l'audit précédent mais plus dans le courant. */
  resolved: ScanIssue[]
  /** Présentes dans les deux audits. */
  persisting: ScanIssue[]
}

function issueKey(i: ScanIssue): string {
  return `${i.rule_id}|${i.page_url ?? ''}|${i.selector ?? ''}`
}

export function diffScans(current: ScanIssue[], previous: ScanIssue[]): ScanDiff {
  const prevKeys = new Set(previous.map(issueKey))
  const curKeys = new Set(current.map(issueKey))
  return {
    appeared: current.filter((i) => !prevKeys.has(issueKey(i))),
    resolved: previous.filter((i) => !curKeys.has(issueKey(i))),
    persisting: current.filter((i) => prevKeys.has(issueKey(i))),
  }
}
