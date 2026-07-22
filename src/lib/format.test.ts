import { describe, it, expect } from 'vitest'
import { conformityFromScore, formatDate, formatDuration, scoreColor } from '@/lib/format'

describe('conformityFromScore', () => {
  it('classe les scores selon le niveau de conformité', () => {
    expect(conformityFromScore(100)).toBe('total')
    expect(conformityFromScore(99)).toBe('partial')
    expect(conformityFromScore(50)).toBe('partial')
    expect(conformityFromScore(49)).toBe('non_conforme')
    expect(conformityFromScore(0)).toBe('non_conforme')
    expect(conformityFromScore(null)).toBe('non_conforme')
  })
})

describe('formatDuration', () => {
  it('affiche — sans valeur', () => {
    expect(formatDuration(null)).toBe('—')
    expect(formatDuration(undefined)).toBe('—')
    expect(formatDuration(0)).toBe('—')
  })
  it('affiche les ms sous la seconde, puis les secondes', () => {
    expect(formatDuration(500)).toBe('500 ms')
    expect(formatDuration(2500)).toBe('2.5 s')
  })
})

describe('formatDate', () => {
  it('affiche — sans valeur', () => {
    expect(formatDate(null)).toBe('—')
    expect(formatDate('')).toBe('—')
  })
  it('formate une date ISO en français', () => {
    expect(formatDate('2026-07-14T10:00:00Z')).toMatch(/14 juil/)
  })
})

describe('scoreColor', () => {
  it('suit les seuils vert/orange/rouge', () => {
    expect(scoreColor(90)).toBe('var(--color-success)')
    expect(scoreColor(85)).toBe('var(--color-success)')
    expect(scoreColor(60)).toBe('var(--color-warning)')
    expect(scoreColor(20)).toBe('var(--color-danger)')
    expect(scoreColor(null)).toBe('var(--color-text-dim)')
  })
})
