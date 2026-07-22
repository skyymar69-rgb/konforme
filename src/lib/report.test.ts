import { describe, it, expect } from 'vitest'
import { buildAuditReportHtml } from '@/lib/report'
import type { Scan, ScanIssue } from '@/lib/database.types'

const scan: Scan = {
  id: 's1',
  site_id: 'site1',
  organization_id: 'org1',
  status: 'done',
  trigger: 'manual',
  started_at: '2026-07-14T10:00:00Z',
  finished_at: '2026-07-14T10:00:30Z',
  duration_ms: 30_000,
  pages_count: 3,
  issues_count: 2,
  score: 78.5,
  rgaa_score: 80,
  wcag_score: 76,
  error: null,
  created_at: '2026-07-14T10:00:00Z',
  sites: { name: 'Mon Site', url: 'https://exemple.fr' },
}

const issue = (over: Partial<ScanIssue>): ScanIssue => ({
  id: 'i1',
  scan_id: 's1',
  rule_id: 'RGAA 1.1 / WCAG 1.1.1',
  severity: 'critical',
  category: 'Images',
  title: 'Image sans alternative textuelle',
  description: 'desc',
  page_url: 'https://exemple.fr/page',
  selector: 'img.hero',
  html_snippet: '<img src="a.png">',
  suggested_fix: 'Ajoutez alt.',
  status: 'open',
  created_at: '2026-07-14T10:00:10Z',
  ...over,
})

describe('buildAuditReportHtml', () => {
  it('inclut les scores, le site et les issues groupées par sévérité', () => {
    const html = buildAuditReportHtml(scan, [
      issue({}),
      issue({ id: 'i2', severity: 'minor', title: 'Alt trop long' }),
    ])
    expect(html).toContain('Mon Site')
    expect(html).toContain('79<small>%</small>')
    expect(html).toContain('Critique (1)')
    expect(html).toContain('Mineur (1)')
    expect(html).toContain('Image sans alternative textuelle')
  })

  it('échappe le HTML des snippets', () => {
    const html = buildAuditReportHtml(scan, [issue({ html_snippet: '<script>x</script>' })])
    expect(html).not.toContain('<script>x</script>')
    expect(html).toContain('&lt;script&gt;')
  })

  it('affiche un message positif sans issue', () => {
    const html = buildAuditReportHtml(scan, [])
    expect(html).toContain('Aucune non-conformité')
  })
})
