/**
 * Génération du badge de conformité accessibilité (SVG autonome).
 *
 * Le badge affiche le taux de conformité mesuré lors du dernier audit avec un
 * code couleur, la date de l'audit et une formulation prudente (« audité le »,
 * jamais « certifié ») : un audit automatique ne couvre pas les 106 critères.
 */

export type BadgeVariant = 'shield' | 'round'

export type BadgeInput = {
  /** Taux de conformité (0-100) à afficher. */
  rate: number
  /** Date de l'audit (ISO). */
  date: string
  variant: BadgeVariant
}

export function badgeColor(rate: number): { bg: string; label: string } {
  if (rate >= 85) return { bg: '#15803d', label: 'Bon niveau' }
  if (rate >= 50) return { bg: '#b45309', label: 'Niveau moyen' }
  return { bg: '#b91c1c', label: 'Niveau faible' }
}

function fmtDate(iso: string): string {
  return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium' }).format(new Date(iso))
}

const FONT = `font-family="system-ui,-apple-system,'Segoe UI',Roboto,sans-serif"`

/** Badge horizontal type « shield » : Accessibilité RGAA | 87 %. */
function shieldSvg(rate: number, date: string): string {
  const { bg } = badgeColor(rate)
  const value = `${Math.round(rate)} %`
  const label = 'Accessibilité RGAA'
  const sub = `audité le ${fmtDate(date)}`
  const leftW = 128
  const rightW = 58
  const w = leftW + rightW
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="42" viewBox="0 0 ${w} 42" role="img" aria-label="${label} : ${value}, ${sub}">
  <title>${label} : ${value} — ${sub}</title>
  <rect width="${w}" height="42" rx="8" fill="#1f2437"/>
  <rect x="${leftW}" width="${rightW}" height="42" rx="8" fill="${bg}"/>
  <rect x="${leftW}" width="10" height="42" fill="${bg}"/>
  <g ${FONT} text-anchor="middle">
    <text x="${leftW / 2}" y="19" font-size="11.5" font-weight="600" fill="#ffffff">${label}</text>
    <text x="${leftW / 2}" y="33" font-size="9" fill="#c3c9de">${sub}</text>
    <text x="${leftW + rightW / 2}" y="26.5" font-size="15" font-weight="700" fill="#ffffff">${value}</text>
  </g>
</svg>`
}

/** Badge rond : pourcentage au centre, anneau de progression coloré. */
function roundSvg(rate: number, date: string): string {
  const { bg } = badgeColor(rate)
  const r = 26
  const c = 2 * Math.PI * r
  const filled = (c * Math.min(Math.max(rate, 0), 100)) / 100
  return `<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" role="img" aria-label="Accessibilité RGAA : ${Math.round(rate)} % de conformité, audité le ${fmtDate(date)}">
  <title>Accessibilité RGAA : ${Math.round(rate)} % — audité le ${fmtDate(date)}</title>
  <circle cx="36" cy="36" r="34" fill="#1f2437"/>
  <circle cx="36" cy="36" r="${r}" fill="none" stroke="#3a4160" stroke-width="6"/>
  <circle cx="36" cy="36" r="${r}" fill="none" stroke="${bg}" stroke-width="6" stroke-linecap="round"
    stroke-dasharray="${filled.toFixed(1)} ${c.toFixed(1)}" transform="rotate(-90 36 36)"/>
  <g ${FONT} text-anchor="middle" fill="#ffffff">
    <text x="36" y="35" font-size="15" font-weight="700">${Math.round(rate)}<tspan font-size="9">%</tspan></text>
    <text x="36" y="47" font-size="7.5" fill="#c3c9de">RGAA</text>
  </g>
</svg>`
}

export function buildBadgeSvg({ rate, date, variant }: BadgeInput): string {
  return variant === 'round' ? roundSvg(rate, date) : shieldSvg(rate, date)
}

/** Snippet HTML autonome (SVG inliné en data URI) à coller sur le site du client. */
export function buildBadgeEmbedHtml(input: BadgeInput, reportUrl?: string): string {
  const svg = buildBadgeSvg(input)
  const src = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`
  const alt = `Accessibilité RGAA : ${Math.round(input.rate)} % de conformité — audité le ${fmtDate(input.date)} avec Konforme`
  const img = `<img src="${src}" alt="${alt}" width="${input.variant === 'round' ? 72 : 186}" height="${input.variant === 'round' ? 72 : 42}" loading="lazy">`
  return reportUrl ? `<a href="${reportUrl}" title="${alt}">${img}</a>` : img
}

export function downloadBadgeSvg(input: BadgeInput, filename = 'badge-accessibilite.svg') {
  const blob = new Blob([buildBadgeSvg(input)], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

/** Export PNG (rendu du SVG sur canvas, échelle 2× pour la netteté). */
export async function downloadBadgePng(input: BadgeInput, filename = 'badge-accessibilite.png') {
  const svg = buildBadgeSvg(input)
  const scale = 2
  const [w, h] = input.variant === 'round' ? [72, 72] : [186, 42]
  const img = new Image()
  img.src = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`
  await new Promise((resolve, reject) => {
    img.onload = resolve
    img.onerror = reject
  })
  const canvas = document.createElement('canvas')
  canvas.width = w * scale
  canvas.height = h * scale
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.drawImage(img, 0, 0, w * scale, h * scale)
  const a = document.createElement('a')
  a.href = canvas.toDataURL('image/png')
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
}
