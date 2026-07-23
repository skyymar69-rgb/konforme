import { describe, expect, it } from 'vitest'
import { diffScans } from './diff'
import type { ScanIssue } from './database.types'

function issue(rule: string, page: string, selector: string, id = `${rule}-${selector}`): ScanIssue {
  return {
    id,
    scan_id: 's',
    rule_id: rule,
    severity: 'critical',
    category: null,
    title: rule,
    description: null,
    page_url: page,
    selector,
    html_snippet: null,
    suggested_fix: null,
    status: 'open',
    created_at: '2026-07-01T00:00:00.000Z',
  }
}

describe('diffScans', () => {
  it('classe apparues / résolues / persistantes', () => {
    const previous = [
      issue('RGAA 1.1', '/a', 'img.hero'),
      issue('RGAA 6.2', '/a', 'a.logo'),
    ]
    const current = [
      issue('RGAA 1.1', '/a', 'img.hero'), // persiste
      issue('RGAA 11.1', '/contact', 'input#q'), // nouvelle
    ]
    const d = diffScans(current, previous)
    expect(d.appeared.map((i) => i.rule_id)).toEqual(['RGAA 11.1'])
    expect(d.resolved.map((i) => i.rule_id)).toEqual(['RGAA 6.2'])
    expect(d.persisting.map((i) => i.rule_id)).toEqual(['RGAA 1.1'])
  })

  it('distingue le même défaut sur des pages différentes', () => {
    const d = diffScans([issue('RGAA 1.1', '/b', 'img.hero')], [issue('RGAA 1.1', '/a', 'img.hero')])
    expect(d.appeared).toHaveLength(1)
    expect(d.resolved).toHaveLength(1)
  })

  it('gère les listes vides', () => {
    const d = diffScans([], [])
    expect(d.appeared).toEqual([])
    expect(d.resolved).toEqual([])
    expect(d.persisting).toEqual([])
  })
})
