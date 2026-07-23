/* eslint-disable react-refresh/only-export-components -- constantes SEO co-localisées volontairement */
const SITE_URL = 'https://konforme.kayzen-lyon.fr'
const SITE_NAME = 'Konforme'

type JsonLd = Record<string, unknown>

type SeoProps = {
  /** Titre de la page (le suffixe « — Konforme » est ajouté automatiquement). */
  title: string
  description: string
  /** Chemin canonique, ex. « /rgaa ». */
  path: string
  type?: 'website' | 'article'
  noindex?: boolean
  jsonLd?: JsonLd[]
}

/**
 * Métadonnées par route. React 19 hisse nativement <title>, <meta> et <link>
 * dans le <head> du document.
 */
export function Seo({ title, description, path, type = 'website', noindex, jsonLd }: SeoProps) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`
  const url = `${SITE_URL}${path === '/' ? '' : path}`
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      {jsonLd?.map((obj, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}
    </>
  )
}

export const ORGANIZATION_JSONLD: JsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Konforme',
  legalName: 'KAYZEN SASU',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  email: 'contact@kayzen-lyon.fr',
  telephone: '+33487776861',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '6 rue Pierre Termier',
    postalCode: '69009',
    addressLocality: 'Lyon',
    addressCountry: 'FR',
  },
}

export const SOFTWARE_JSONLD: JsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Konforme',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: SITE_URL,
  description:
    "Plateforme SaaS d'audit d'accessibilité web : conformité RGAA 4.1.2 et WCAG 2.2, corrections assistées par IA, déclaration d'accessibilité automatique.",
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR', description: 'Audit gratuit' },
  publisher: { '@type': 'Organization', name: 'KAYZEN SASU' },
}

export { SITE_URL }
