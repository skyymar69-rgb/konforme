import { defineMessages, useMessages } from '@/i18n'
import { cn } from '@/lib/utils'

const L = defineMessages({
  fr: { tagline: 'Conformité accessibilité · RGAA | WCAG | EAA' },
  en: { tagline: 'Accessibility compliance · RGAA | WCAG | EAA' },
  de: { tagline: 'Barrierefreiheits-Konformität · RGAA | WCAG | EAA' },
  es: { tagline: 'Conformidad de accesibilidad · RGAA | WCAG | EAA' },
  it: { tagline: 'Conformità di accessibilità · RGAA | WCAG | EAA' },
})

/**
 * Marque Konforme : anneau de conformité, silhouette humaine formant le K
 * (accessibilité) et barre de validation diagonale.
 *
 * Les couleurs viennent des tokens `--logo-*` (src/index.css) : la silhouette
 * et le texte s'inversent en thème clair/sombre pour rester lisibles, l'anneau
 * garde le bleu de marque (contrasté sur les deux fonds).
 */
export function Logo({
  className,
  withText = true,
  withTagline = false,
  size = 32,
}: {
  className?: string
  withText?: boolean
  /** Baseline « Conformité accessibilité · RGAA | WCAG | EAA ». */
  withTagline?: boolean
  size?: number
}) {
  const t = useMessages(L)
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark size={size} />
      {withText && (
        <span className="inline-flex flex-col leading-none">
          <span className="font-bold tracking-tight text-base text-text">Konforme</span>
          {withTagline && (
            <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-link">
              {t.tagline}
            </span>
          )}
        </span>
      )}
    </span>
  )
}

/** Symbole seul (favicon, badge, avatar). */
export function LogoMark({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role="img"
      aria-label="Konforme"
      className={cn('shrink-0', className)}
    >
      <defs>
        <linearGradient id="kf-ring" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--logo-ring-from)" />
          <stop offset="1" stopColor="var(--logo-ring-to)" />
        </linearGradient>
        <linearGradient id="kf-slash" x1="44" y1="12" x2="24" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--logo-slash-from)" />
          <stop offset="1" stopColor="var(--logo-slash-to)" />
        </linearGradient>
      </defs>

      {/* Anneau de conformité, ouvert en haut à droite (la barre le traverse) */}
      <path
        d="M46.5 9.6A27 27 0 1 1 32 5"
        fill="none"
        stroke="url(#kf-ring)"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Silhouette : tête + buste ouvert (bras levé formant la haste du K) */}
      <circle cx="27.5" cy="22.5" r="4.6" fill="var(--logo-figure)" />
      <path
        d="M18.6 24.2c4.6-.4 7.6 1.7 8.9 5.2 1 2.7 1 6 1 9.6v11.6h-5.2V38.6c0-3.9-1.3-8.2-4.7-11.4-.9-.9-.9-2.9 0-3z"
        fill="var(--logo-figure)"
      />

      {/* Barre de validation : traverse le symbole en diagonale */}
      <path
        d="M45.8 12.4a2.6 2.6 0 0 1 4.1 3.2L27.4 50.9a2.6 2.6 0 0 1-4.3-2.9z"
        fill="url(#kf-slash)"
      />

      {/* Jambe du K */}
      <path
        d="M30.6 33.2a2.6 2.6 0 0 1 4.4-.3l10.2 15.6a2.6 2.6 0 1 1-4.4 2.9L30.6 35.9a2.6 2.6 0 0 1 0-2.7z"
        fill="var(--logo-figure)"
      />
    </svg>
  )
}
