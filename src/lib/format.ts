import type { Lang } from '@/i18n'
import type { ConformityLevel, ScanStatus, Severity } from '@/lib/database.types'

const DATE_LOCALES: Record<Lang, string> = {
  fr: 'fr-FR',
  en: 'en-GB',
  de: 'de-DE',
  es: 'es-ES',
  it: 'it-IT',
}

export function formatDate(iso: string | null | undefined, withTime = false, lang: Lang = 'fr'): string {
  if (!iso) return '—'
  return new Intl.DateTimeFormat(DATE_LOCALES[lang] ?? 'fr-FR', {
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

/* ------------------------------------------------------------------ */
/* Libellés localisés (les *_META restent en français : ils servent aux */
/* documents exportés, qui gèrent leur propre localisation)             */
/* ------------------------------------------------------------------ */

const SEVERITY_L10N: Record<Lang, Record<Severity, string>> = {
  fr: { critical: 'Critique', serious: 'Majeur', moderate: 'Modéré', minor: 'Mineur' },
  en: { critical: 'Critical', serious: 'Serious', moderate: 'Moderate', minor: 'Minor' },
  de: { critical: 'Kritisch', serious: 'Schwerwiegend', moderate: 'Mittel', minor: 'Gering' },
  es: { critical: 'Crítico', serious: 'Grave', moderate: 'Moderado', minor: 'Leve' },
  it: { critical: 'Critico', serious: 'Grave', moderate: 'Moderato', minor: 'Lieve' },
}

const SCAN_STATUS_L10N: Record<Lang, Record<ScanStatus, string>> = {
  fr: { pending: 'En attente', running: 'En cours…', done: 'Terminé', failed: 'Échec' },
  en: { pending: 'Pending', running: 'Running…', done: 'Completed', failed: 'Failed' },
  de: { pending: 'Ausstehend', running: 'Läuft…', done: 'Abgeschlossen', failed: 'Fehlgeschlagen' },
  es: { pending: 'Pendiente', running: 'En curso…', done: 'Completado', failed: 'Error' },
  it: { pending: 'In attesa', running: 'In corso…', done: 'Completato', failed: 'Errore' },
}

const CONFORMITY_L10N: Record<Lang, Record<ConformityLevel, string>> = {
  fr: { total: 'Totalement conforme', partial: 'Partiellement conforme', non_conforme: 'Non conforme' },
  en: { total: 'Fully compliant', partial: 'Partially compliant', non_conforme: 'Non-compliant' },
  de: { total: 'Vollständig konform', partial: 'Teilweise konform', non_conforme: 'Nicht konform' },
  es: { total: 'Totalmente conforme', partial: 'Parcialmente conforme', non_conforme: 'No conforme' },
  it: { total: 'Totalmente conforme', partial: 'Parzialmente conforme', non_conforme: 'Non conforme' },
}

export function severityLabel(lang: Lang, severity: Severity): string {
  return (SEVERITY_L10N[lang] ?? SEVERITY_L10N.fr)[severity]
}

export function scanStatusLabel(lang: Lang, status: ScanStatus): string {
  return (SCAN_STATUS_L10N[lang] ?? SCAN_STATUS_L10N.fr)[status]
}

export function conformityLabel(lang: Lang, level: ConformityLevel): string {
  return (CONFORMITY_L10N[lang] ?? CONFORMITY_L10N.fr)[level]
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
