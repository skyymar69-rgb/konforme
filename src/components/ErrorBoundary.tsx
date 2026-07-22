import * as React from 'react'

type State = { error: Error | null }

/**
 * Filet de sécurité global : évite l'écran blanc en cas d'erreur de rendu
 * et propose un rechargement. Les erreurs sont loguées en console.
 */
export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Erreur de rendu Konforme :', error, info.componentStack)
  }

  render() {
    if (!this.state.error) return this.props.children
    return (
      <main
        id="main"
        className="min-h-screen grid place-items-center px-6 text-center"
        role="alert"
      >
        <div className="max-w-md">
          <h1 className="text-2xl font-bold mb-3">Une erreur est survenue</h1>
          <p className="text-text-muted mb-6 text-sm leading-relaxed">
            L'application a rencontré un problème inattendu. Rechargez la page ; si le problème
            persiste, contactez-nous à{' '}
            <a href="mailto:contact@kayzen-lyon.fr" className="text-link underline">
              contact@kayzen-lyon.fr
            </a>
            .
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-[10px] bg-primary px-5 py-2.5 font-semibold text-white hover:bg-primary-2"
          >
            Recharger la page
          </button>
        </div>
      </main>
    )
  }
}
