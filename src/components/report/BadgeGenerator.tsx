import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { badgeColor, buildBadgeEmbedHtml, buildBadgeSvg, downloadBadgePng, downloadBadgeSvg, type BadgeVariant } from '@/lib/badge'

/**
 * Générateur de badge de conformité : le client affiche sur son site le taux
 * mesuré lors du dernier audit (code couleur + pourcentage + date d'audit).
 */
export function BadgeGenerator({ rate, date, siteUrl }: { rate: number; date: string; siteUrl?: string }) {
  const [variant, setVariant] = useState<BadgeVariant>('shield')
  const [copied, setCopied] = useState(false)

  const input = useMemo(() => ({ rate, date, variant }), [rate, date, variant])
  const svg = useMemo(() => buildBadgeSvg(input), [input])
  const embed = useMemo(() => buildBadgeEmbedHtml(input, siteUrl), [input, siteUrl])
  const color = badgeColor(rate)

  async function copyEmbed() {
    try {
      await navigator.clipboard.writeText(embed)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      /* clipboard indisponible : le textarea reste sélectionnable à la main */
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-text-muted">
        Affichez votre niveau d’accessibilité sur votre site. Le badge indique le taux mesuré{' '}
        <strong className="text-white">({Math.round(rate)} % — {color.label.toLowerCase()})</strong> et la
        date de l’audit. Formulation volontairement prudente : « audité le », jamais « certifié » — seule
        l’absence de non-conformités sur un audit complet (automatique + manuel) permet de revendiquer la
        conformité.
      </p>

      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Style du badge">
        {(['shield', 'round'] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setVariant(v)}
            aria-pressed={variant === v}
            className={
              variant === v
                ? 'rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-white'
                : 'rounded-full border border-border-strong px-3 py-1.5 text-xs font-semibold text-text-muted hover:bg-raise hover:text-white'
            }
          >
            {v === 'shield' ? 'Étiquette' : 'Rond'}
          </button>
        ))}
      </div>

      <div
        className="flex items-center justify-center rounded-[12px] border border-border bg-bg py-8"
        role="img"
        aria-label={`Aperçu du badge : ${Math.round(rate)} % de conformité RGAA`}
        dangerouslySetInnerHTML={{ __html: svg }}
      />

      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="primary" onClick={() => downloadBadgeSvg(input)}>
          Télécharger SVG
        </Button>
        <Button size="sm" variant="ghost" onClick={() => void downloadBadgePng(input)}>
          Télécharger PNG
        </Button>
        <Button size="sm" variant="ghost" onClick={() => void copyEmbed()}>
          {copied ? '✓ Copié !' : 'Copier le code d’intégration'}
        </Button>
      </div>

      <div>
        <label htmlFor="badge-embed" className="mb-1 block text-xs font-bold uppercase tracking-wider text-text-muted">
          Code à coller sur votre site
        </label>
        <textarea
          id="badge-embed"
          readOnly
          value={embed}
          rows={3}
          onFocus={(e) => e.currentTarget.select()}
          className="w-full rounded-[10px] border border-border bg-bg px-3 py-2 font-mono text-xs text-text-soft"
        />
      </div>
    </div>
  )
}
