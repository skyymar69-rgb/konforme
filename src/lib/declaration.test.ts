import { describe, it, expect } from 'vitest'
import { buildDeclarationHtml } from '@/lib/declaration'

const base = {
  siteName: 'Mon Site',
  siteUrl: 'https://exemple.fr',
  orgName: 'Exemple SAS',
  conformityLevel: 'partial' as const,
  conformityRate: 72.5,
  contactEmail: 'contact@exemple.fr',
  auditDate: '2026-07-14T10:00:00Z',
}

describe('buildDeclarationHtml', () => {
  it('génère le texte de conformité partielle avec le taux', () => {
    const html = buildDeclarationHtml(base)
    expect(html).toContain('conformité partielle')
    expect(html).toContain('72.5 %')
    expect(html).toContain('Exemple SAS')
    expect(html).toContain('https://exemple.fr')
  })

  it('gère la conformité totale et la non-conformité', () => {
    expect(buildDeclarationHtml({ ...base, conformityLevel: 'total' })).toContain('conformité totale')
    expect(buildDeclarationHtml({ ...base, conformityLevel: 'non_conforme' })).toContain(
      "n'est pas en conformité",
    )
  })

  it('affiche « non mesuré » sans taux', () => {
    expect(buildDeclarationHtml({ ...base, conformityRate: null })).toContain('non mesuré')
  })

  it('échappe le HTML dans les champs saisis', () => {
    const html = buildDeclarationHtml({ ...base, siteName: '<script>alert(1)</script>' })
    expect(html).not.toContain('<script>alert(1)</script>')
    expect(html).toContain('&lt;script&gt;')
  })

  it('mentionne le Défenseur des droits (voies de recours)', () => {
    expect(buildDeclarationHtml(base)).toContain('Défenseur des droits')
  })
})
