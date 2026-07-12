import type { ConformityLevel } from '@/lib/database.types'
import { CONFORMITY_META } from '@/lib/format'

type DeclarationInput = {
  siteName: string
  siteUrl: string
  orgName: string
  conformityLevel: ConformityLevel
  conformityRate: number | null
  contactEmail: string
  auditDate: string // ISO
}

/**
 * Génère la déclaration d'accessibilité au format HTML, selon le modèle
 * prévu par l'article 47 de la loi n° 2005-102 et le RGAA 4.1.
 */
export function buildDeclarationHtml(input: DeclarationInput): string {
  const date = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' }).format(new Date(input.auditDate))
  const levelText = CONFORMITY_META[input.conformityLevel]
  const rate = input.conformityRate !== null ? `${input.conformityRate} %` : 'non mesuré'

  const conformityDetail =
    input.conformityLevel === 'total'
      ? `<p><strong>${escapeHtml(input.siteName)}</strong> est en conformité totale avec le référentiel général d'amélioration de l'accessibilité (RGAA), version 4.1.</p>`
      : input.conformityLevel === 'partial'
        ? `<p><strong>${escapeHtml(input.siteName)}</strong> est en conformité partielle avec le référentiel général d'amélioration de l'accessibilité (RGAA), version 4.1, en raison des non-conformités énumérées dans le rapport d'audit.</p>`
        : `<p><strong>${escapeHtml(input.siteName)}</strong> n'est pas en conformité avec le référentiel général d'amélioration de l'accessibilité (RGAA), version 4.1. Les non-conformités sont énumérées dans le rapport d'audit.</p>`

  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Déclaration d'accessibilité — ${escapeHtml(input.siteName)}</title>
<style>
  body { font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; max-width: 46rem; margin: 2rem auto; padding: 0 1.25rem; line-height: 1.6; color: #1a1a2e; }
  h1 { font-size: 1.6rem; } h2 { font-size: 1.2rem; margin-top: 2rem; }
  footer { margin-top: 3rem; font-size: .85rem; color: #555; border-top: 1px solid #ddd; padding-top: 1rem; }
</style>
</head>
<body>
<h1>Déclaration d'accessibilité</h1>
<p><strong>${escapeHtml(input.orgName)}</strong> s'engage à rendre son site internet accessible conformément à l'article 47 de la loi n° 2005-102 du 11 février 2005.</p>
<p>Cette déclaration d'accessibilité s'applique au site <a href="${escapeHtml(input.siteUrl)}">${escapeHtml(input.siteUrl)}</a>.</p>

<h2>État de conformité</h2>
${conformityDetail}

<h2>Résultats des tests</h2>
<p>L'audit de conformité réalisé le ${date} par la plateforme Konforme (audit automatisé RGAA 4.1 / WCAG 2.2) révèle que <strong>${rate}</strong> des critères testés sont respectés.</p>
<p>Cet audit automatisé couvre les critères vérifiables par machine. Il est recommandé de le compléter par un audit manuel pour les critères nécessitant une vérification humaine.</p>

<h2>Établissement de cette déclaration d'accessibilité</h2>
<p>Cette déclaration a été établie le ${date}.</p>
<h3>Technologies utilisées pour la réalisation du site</h3>
<ul><li>HTML5</li><li>CSS</li><li>JavaScript</li></ul>

<h2>Retour d'information et contact</h2>
<p>Si vous n'arrivez pas à accéder à un contenu ou à un service, vous pouvez contacter le responsable du site pour être orienté vers une alternative accessible ou obtenir le contenu sous une autre forme.</p>
<ul>
  <li>Contact : <a href="mailto:${escapeHtml(input.contactEmail)}">${escapeHtml(input.contactEmail)}</a></li>
</ul>

<h2>Voies de recours</h2>
<p>Cette procédure est à utiliser dans le cas suivant : vous avez signalé au responsable du site internet un défaut d'accessibilité qui vous empêche d'accéder à un contenu ou à un des services et vous n'avez pas obtenu de réponse satisfaisante.</p>
<ul>
  <li>Écrire un message au <a href="https://formulaire.defenseurdesdroits.fr/">Défenseur des droits</a></li>
  <li>Contacter <a href="https://www.defenseurdesdroits.fr/saisir/delegues">le délégué du Défenseur des droits dans votre région</a></li>
  <li>Envoyer un courrier par la poste (gratuit, ne pas mettre de timbre) : Défenseur des droits, Libre réponse 71120, 75342 Paris CEDEX 07</li>
</ul>

<footer>
  <p>Niveau déclaré : ${levelText} — taux de conformité : ${rate}.<br>
  Déclaration générée avec <a href="https://konforme.kayzen-lyon.fr">Konforme</a>, plateforme d'audit d'accessibilité RGAA/WCAG.</p>
</footer>
</body>
</html>`
}

export function downloadDeclaration(html: string, siteName: string) {
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `declaration-accessibilite-${slugify(siteName)}.html`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

function slugify(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
