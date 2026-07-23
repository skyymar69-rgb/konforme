import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { account } from '@/lib/appwrite'
import { useAuth } from '@/contexts/AuthContext'
import { defineMessages, useMessages } from '@/i18n'

const L = defineMessages({
  fr: { connecting: 'Connexion en cours…' },
  en: { connecting: 'Signing you in…' },
  de: { connecting: 'Anmeldung läuft…' },
  es: { connecting: 'Iniciando sesión…' },
  it: { connecting: 'Accesso in corso…' },
})

export function AuthCallback() {
  const navigate = useNavigate()
  const t = useMessages(L)
  const { refresh } = useAuth()

  useEffect(() => {
    let cancelled = false
    async function run() {
      try {
        // Flux OAuth « token » : Appwrite renvoie userId + secret en query
        // string ; on échange contre une session via XHR (le cookie tiers
        // étant bloqué par les navigateurs récents).
        const params = new URLSearchParams(window.location.search)
        const userId = params.get('userId')
        const secret = params.get('secret')
        if (!userId || !secret) throw new Error('Paramètres OAuth absents')
        await account.createSession({ userId, secret })
        await refresh()
        if (!cancelled) navigate('/dashboard', { replace: true })
      } catch {
        if (!cancelled) navigate('/login?error=callback', { replace: true })
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [navigate, refresh])

  return (
    <div className="min-h-screen grid place-items-center px-6 py-10">
      <div className="text-center">
        <div className="size-12 mx-auto rounded-full border-4 border-border border-t-primary-2 animate-spin" aria-hidden="true" />
        <p className="mt-4 text-text-muted" role="status">{t.connecting}</p>
      </div>
    </div>
  )
}
