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
  critical: { label: 'Critique', className: 'bg-[#7f1d1d]/60 text-[#fecaca] border-[#f87171]/40', weight: 0 },
  serious: { label: 'Majeur', className: 'bg-[#7c2d12]/60 text-[#fed7aa] border-[#fb923c]/40', weight: 1 },
  moderate: { label: 'Modéré', className: 'bg-[#713f12]/60 text-[#fde68a] border-[#fbbf24]/40', weight: 2 },
  minor: { label: 'Mineur', className: 'bg-[#1e3a5f]/60 text-[#bae6fd] border-[#38bdf8]/40', weight: 3 },
}

export const STATUS_META: Record<ScanStatus, { label: string; className: string }> = {
  pending: { label: 'En attente', className: 'bg-[#1e3a5f]/60 text-[#bae6fd] border-[#38bdf8]/40' },
  running: { label: 'En cours…', className: 'bg-[#1e3a5f]/60 text-[#bae6fd] border-[#38bdf8]/40' },
  done: { label: 'Terminé', className: 'bg-[#14532d]/60 text-[#bbf7d0] border-[#4ade80]/40' },
  failed: { label: 'Échec', className: 'bg-[#7f1d1d]/60 text-[#fecaca] border-[#f87171]/40' },
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
  if (score === null || score === undefined) return '#8b98b8'
  if (score >= 85) return '#4ade80'
  if (score >= 50) return '#fbbf24'
  return '#f87171'
}
