import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ScoreRing } from '@/components/ScoreRing'
import { appwriteConfigured, functions, SCAN_FUNCTION_ID } from '@/lib/appwrite'
import { SEVERITY_META } from '@/lib/format'
import type { Severity } from '@/lib/database.types'

type PublicResult = {
  url: string
  score: number | null
  rgaa_score: number | null
  wcag_score: number | null
  issues_count: number
  rules_checked: number
  by_severity: Record<Severity, number>
  top_issues: { rule_id: string; severity: Severity; title: string; count: number }[]
}

/**
 * Mini-audit public : une URL, pas de compte. Appelle la fonction scan-site
 * en mode { url } (exécution synchrone, aucune écriture en base).
 */
export function PublicChecker() {
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<PublicResult | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const raw = String(new FormData(e.currentTarget).get('url') ?? '').trim()
    if (!raw) return
    const url = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`
    if (!appwriteConfigured) {
      setError("Le service d'audit est momentanément indisponible.")
      setState('error')
      return
    }
    setState('loading')
    setError(null)
    try {
      const exec = await functions.createExecution({
        functionId: SCAN_FUNCTION_ID,
        body: JSON.stringify({ url }),
        async: false,
      })
      const payload = JSON.parse(exec.responseBody || '{}')
      if (exec.responseStatusCode >= 400 || payload.error) {
        throw new Error(payload.error || "L'analyse a échoué. Réessayez dans un instant.")
      }
      setResult(payload as PublicResult)
      setState('done')
    } catch (err) {
      const msg = err instanceof Error ? err.message : ''
      setError(
        /timed out|timeout/i.test(msg)
          ? 'Ce site est volumineux et la première analyse a dépassé le temps imparti. Réessayez : la seconde tentative aboutit généralement.'
          : msg || "L'analyse a échoué. Réessayez dans un instant.",
      )
      setState('error')
    }
  }

  return (
    <div id="checker" className="scroll-mt-24 rounded-[20px] border border-primary/40 bg-gradient-to-b from-surface to-bg-deep p-6 md:p-10 shadow-[0_20px_60px_rgba(37,99,235,0.15)]">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
          Votre site est-il accessible ? Testez-le maintenant
        </h2>
        <p className="text-sm md:text-base text-text-muted mb-6">
          Gratuit, sans compte, sans script à installer. Une centaine de règles RGAA 4.1.2 / WCAG 2.2
          vérifiées en ~20 secondes sur votre page d'accueil.
        </p>

        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 justify-center" noValidate>
          <label htmlFor="checker-url" className="sr-only">Adresse de votre site</label>
          <input
            id="checker-url"
            name="url"
            type="text"
            inputMode="url"
            required
            placeholder="https://votre-site.fr"
            className="w-full sm:w-96 rounded-[12px] border border-border-strong bg-bg px-4 py-3 text-text placeholder:text-text-dim"
          />
          <Button type="submit" size="lg" variant="primary" disabled={state === 'loading'}>
            {state === 'loading' ? (
              <>
                <span aria-hidden="true" className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Analyse en cours…
              </>
            ) : (
              'Vérifier l’accessibilité'
            )}
          </Button>
        </form>
        {state === 'loading' && (
          <p role="status" className="mt-3 text-xs text-text-dim">
            Récupération de la page et exécution des règles… environ 20 secondes.
          </p>
        )}
        {state === 'error' && error && (
          <p role="alert" className="mt-4 rounded-[10px] border border-danger/40 bg-danger-bg/30 px-4 py-2.5 text-sm text-danger-soft max-w-lg mx-auto">
            {error}
          </p>
        )}
      </div>

      {state === 'done' && result && (
        <div className="mt-8 max-w-3xl mx-auto" role="region" aria-label="Résultat de l'audit express">
          <div className="grid gap-6 md:grid-cols-[auto_1fr] items-center rounded-[16px] border border-border bg-bg-deep p-6">
            <div className="justify-self-center">
              <ScoreRing score={result.score} size={120} label="Score d'accessibilité" />
            </div>
            <div className="text-left">
              <p className="font-bold break-all">{result.url}</p>
              <p className="text-sm text-text-muted mt-1">
                {result.rules_checked} règles vérifiées · {result.issues_count} problème
                {result.issues_count > 1 ? 's' : ''} détecté{result.issues_count > 1 ? 's' : ''} sur la
                page d'accueil
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {(Object.keys(SEVERITY_META) as Severity[]).map((s) =>
                  result.by_severity[s] ? (
                    <span key={s} className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${SEVERITY_META[s].className}`}>
                      {result.by_severity[s]} {SEVERITY_META[s].label.toLowerCase()}
                      {result.by_severity[s] > 1 ? 's' : ''}
                    </span>
                  ) : null,
                )}
                {result.issues_count === 0 && (
                  <span className="rounded-full border border-success/40 bg-success-bg/60 px-2.5 py-1 text-xs font-semibold text-success-soft">
                    Aucun problème détecté sur les règles automatisables 🎉
                  </span>
                )}
              </div>
            </div>
          </div>

          {result.top_issues.length > 0 && (
            <ul className="mt-4 space-y-2" aria-label="Principaux problèmes détectés">
              {result.top_issues.slice(0, 5).map((i) => (
                <li key={i.rule_id} className="flex items-center gap-3 rounded-[12px] border border-border bg-bg-deep px-4 py-2.5 text-left text-sm">
                  <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[0.68rem] font-semibold ${SEVERITY_META[i.severity].className}`}>
                    {SEVERITY_META[i.severity].label}
                  </span>
                  <span className="flex-1 min-w-0 truncate">{i.title}</span>
                  <span className="shrink-0 text-xs text-text-dim">×{i.count}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 rounded-[14px] border border-primary/40 bg-primary/10 p-5 text-center">
            <p className="font-semibold mb-1">
              Ceci n'est qu'un aperçu d'une seule page.
            </p>
            <p className="text-sm text-text-muted mb-4">
              Créez un compte gratuit pour auditer plusieurs pages, obtenir chaque correction à
              appliquer, suivre vos progrès et générer votre déclaration d'accessibilité.
            </p>
            <Link to="/login">
              <Button variant="primary" size="lg">Obtenir le rapport complet — gratuit</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
