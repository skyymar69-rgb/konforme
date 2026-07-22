import type { ConformityLevel, ScanStatus, Severity } from '@/lib/database.types'

export function formatDate(iso: string | null | undefined, withTime = false): string {
  if (!iso) return '—'
  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'medium',
    ...(withTime ? { timeStyle: 'short' } : {}),
  }).format(new Date(iso))
}

export function formatDuration(ms: number | null | undefined): string {
  if (!ms) return '—'
  if (ms < 1000) return `${ms} ms`
  return `${(ms / 1000).toFixed(1)} s`
}

export const SEVERITY_META: Record<Severity, { label: string; className: string; weight: number }> = {
  critical: { label: 'Critique', className: 'bg-danger-bg/60 text-danger-soft border-danger/40', weight: 0 },
  serious: { label: 'Majeur', className: 'bg-orange-bg/60 text-orange-soft border-orange/40', weight: 1 },
  moderate: { label: 'Modéré', className: 'bg-warning-bg/60 text-warning-soft border-warning/40', weight: 2 },
  minor: { label: 'Mineur', className: 'bg-info-bg/60 text-info-soft border-info/40', weight: 3 },
}

export const STATUS_META: Record<ScanStatus, { label: string; className: string }> = {
  pending: { label: 'En attente', className: 'bg-info-bg/60 text-info-soft border-info/40' },
  running: { label: 'En cours…', className: 'bg-info-bg/60 text-info-soft border-info/40' },
  done: { label: 'Terminé', className: 'bg-success-bg/60 text-success-soft border-success/40' },
  failed: { label: 'Échec', className: 'bg-danger-bg/60 text-danger-soft border-danger/40' },
}

export const CONFORMITY_META: Record<ConformityLevel, string> = {
  total: 'Totalement conforme',
  partial: 'Partiellement conforme',
  non_conforme: 'Non conforme',
}

export function conformityFromScore(score: number | null): ConformityLevel {
  if (score === null) return 'non_conforme'
  if (score >= 100) return 'total'
  if (score >= 50) return 'partial'
  return 'non_conforme'
}

export function scoreColor(score: number | null | undefined): string {
  if (score === null || score === undefined) return 'var(--color-text-dim)'
  if (score >= 85) return 'var(--color-success)'
  if (score >= 50) return 'var(--color-warning)'
  return 'var(--color-danger)'
}
