import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Logo } from '@/components/ui/logo'
import { useAuth } from '@/contexts/AuthContext'
import { Seo } from '@/components/Seo'

type Mode = 'signin' | 'signup'

// Le bouton Google n'est proposé que si le provider est configuré côté
// Appwrite (sinon la redirection OAuth aboutit sur une erreur 412 plein
// écran). Mettre VITE_GOOGLE_AUTH=on une fois le provider activé.
const GOOGLE_AUTH_ENABLED = import.meta.env.VITE_GOOGLE_AUTH === 'on'

export function Login() {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, user } = useAuth()
  const [mode, setMode] = useState<Mode>('signin')
  // Retour d'un flux OAuth interrompu : erreur explicite. Appwrite remplace
  // parfois notre ?error=oauth par un objet JSON décrivant l'échec provider.
  const [error, setError] = useState<string | null>(() => {
    const oauthError = new URLSearchParams(window.location.search).get('error')
    if (!oauthError) return null
    if (oauthError === 'oauth')
      return 'La connexion Google a été annulée ou a échoué. Réessayez, ou utilisez votre email et mot de passe.'
    if (oauthError === 'callback')
      return "La connexion Google n'a pas pu aboutir (session non créée). Réessayez, ou utilisez votre email et mot de passe."
    try {
      const parsed = JSON.parse(oauthError) as { type?: string; message?: string }
      if (parsed.type === 'user_oauth2_provider_failure') {
        return 'Google a refusé la connexion (configuration du fournisseur en cours de correction). Utilisez votre email et mot de passe en attendant.'
      }
      if (parsed.message) return `Connexion Google impossible : ${parsed.message}`
    } catch {
      /* paramètre inattendu : message générique */
    }
    return 'La connexion Google a échoué. Utilisez votre email et mot de passe.'
  })
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true })
  }, [user, navigate])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    const email = String(fd.get('email') ?? '').trim()
    const password = String(fd.get('password') ?? '')
    const name = String(fd.get('name') ?? '').trim()
    try {
      if (mode === 'signup') {
        await signUpWithEmail(name || email.split('@')[0], email, password)
      } else {
        await signInWithEmail(email, password)
      }
      // La redirection est gérée par l'effet sur `user`
    } catch (e) {
      setError(friendlyAuthError(e))
      setLoading(false)
    }
  }

  async function handleGoogle() {
    setError(null)
    setGoogleLoading(true)
    try {
      await signInWithGoogle()
      // OAuth : redirection complète, rien d'autre à faire ici
    } catch (e) {
      setError(friendlyAuthError(e))
      setGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid place-items-center px-6 py-10">
      <Seo title="Connexion" description="Connectez-vous à votre tableau de bord Konforme." path="/login" noindex />
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <Link to="/" aria-label="Konforme accueil">
            <Logo />
          </Link>
        </div>

        <Card className="p-8">
          <h1 className="gradient-text text-2xl font-bold tracking-tight text-center mb-2">
            {mode === 'signin' ? 'Bienvenue' : 'Créer un compte'}
          </h1>
          <p className="text-center text-sm text-text-muted mb-6">
            {mode === 'signin'
              ? "Connectez-vous pour accéder à votre tableau de bord d'accessibilité"
              : '14 jours d’essai Pro inclus — sans carte bancaire'}
          </p>

          <form onSubmit={onSubmit} className="space-y-4" noValidate>
            {mode === 'signup' && (
              <div>
                <label htmlFor="auth-name" className="block text-sm font-semibold mb-1.5">
                  Nom complet
                </label>
                <input
                  id="auth-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="w-full rounded-[10px] border border-border-strong bg-bg px-3.5 py-2.5 text-sm text-text placeholder:text-text-dim"
                  placeholder="Prénom Nom"
                />
              </div>
            )}
            <div>
              <label htmlFor="auth-email" className="block text-sm font-semibold mb-1.5">
                Email
              </label>
              <input
                id="auth-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                className="w-full rounded-[10px] border border-border-strong bg-bg px-3.5 py-2.5 text-sm text-text placeholder:text-text-dim"
                placeholder="vous@exemple.fr"
              />
            </div>
            <div>
              <label htmlFor="auth-password" className="block text-sm font-semibold mb-1.5">
                Mot de passe
              </label>
              <input
                id="auth-password"
                name="password"
                type="password"
                required
                minLength={8}
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                aria-describedby={mode === 'signup' ? 'auth-password-help' : undefined}
                className="w-full rounded-[10px] border border-border-strong bg-bg px-3.5 py-2.5 text-sm text-text"
              />
              {mode === 'signup' && (
                <p id="auth-password-help" className="mt-1 text-xs text-text-dim">
                  8 caractères minimum.
                </p>
              )}
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-[10px] border border-danger/40 bg-danger/10 px-4 py-2.5 text-sm text-danger-soft"
              >
                {error}
              </p>
            )}

            <Button type="submit" disabled={loading} variant="primary" size="lg" className="w-full">
              {loading ? (
                <>
                  <span className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  {mode === 'signin' ? 'Connexion…' : 'Création…'}
                </>
              ) : mode === 'signin' ? (
                'Se connecter'
              ) : (
                'Créer mon compte'
              )}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-text-muted">
            {mode === 'signin' ? (
              <>
                Pas encore de compte ?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('signup'); setError(null) }}
                  className="text-link font-semibold hover:underline"
                >
                  Créer un compte
                </button>
              </>
            ) : (
              <>
                Déjà inscrit ?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('signin'); setError(null) }}
                  className="text-link font-semibold hover:underline"
                >
                  Se connecter
                </button>
              </>
            )}
          </p>

          {GOOGLE_AUTH_ENABLED && (
            <>
              <div className="my-5 flex items-center gap-3" role="presentation">
                <span className="h-px flex-1 bg-border" />
                <span className="text-xs text-text-dim">ou</span>
                <span className="h-px flex-1 bg-border" />
              </div>

              <Button
                onClick={handleGoogle}
                disabled={googleLoading}
                variant="ghost"
                size="lg"
                className="w-full"
              >
                {googleLoading ? (
                  <>
                    <span className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Redirection...
                  </>
                ) : (
                  <>
                    <GoogleIcon />
                    Continuer avec Google
                  </>
                )}
              </Button>
            </>
          )}

          <p className="mt-6 text-center text-xs text-text-dim leading-relaxed">
            En continuant vous acceptez nos{' '}
            <Link to="/legal/cgu" className="text-link hover:underline">
              CGU
            </Link>{' '}
            et notre{' '}
            <Link to="/legal/confidentialite" className="text-link hover:underline">
              politique de confidentialité
            </Link>
            .
          </p>
        </Card>

        <div className="mt-6 text-center text-sm text-text-muted">
          <Link to="/" className="hover:text-white">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  )
}

/** Traduit les erreurs Appwrite les plus courantes en message actionnable. */
function friendlyAuthError(e: unknown): string {
  const msg = e instanceof Error ? e.message : String(e)
  if (/invalid credentials|invalid email|password/i.test(msg) && !/at least/i.test(msg))
    return 'Email ou mot de passe incorrect.'
  if (/at least 8|password.*length/i.test(msg)) return 'Le mot de passe doit faire au moins 8 caractères.'
  if (/already exists|user_already_exists/i.test(msg))
    return 'Un compte existe déjà avec cet email — connectez-vous.'
  if (/rate limit/i.test(msg)) return 'Trop de tentatives. Réessayez dans quelques minutes.'
  if (/project.*not.*found|missing.*project/i.test(msg))
    return "Le backend n'est pas encore configuré (projet Appwrite manquant)."
  return msg || 'Erreur inconnue'
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853" />
      <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
    </svg>
  )
}
