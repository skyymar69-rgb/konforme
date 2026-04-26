import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Logo } from '@/components/ui/logo'
import { useAuth } from '@/contexts/AuthContext'

export function Login() {
  const { signInWithGoogle, user } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  if (user) {
    navigate('/dashboard', { replace: true })
  }

  async function handleGoogle() {
    setError(null)
    setLoading(true)
    try {
      await signInWithGoogle()
      // OAuth will redirect; nothing to do here
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Erreur inconnue'
      setError(msg)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid place-items-center px-6 py-10">
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <Link to="/" aria-label="Konforme accueil">
            <Logo />
          </Link>
        </div>

        <Card className="p-8">
          <h1 className="gradient-text text-2xl font-bold tracking-tight text-center mb-2">
            Bienvenue
          </h1>
          <p className="text-center text-sm text-[#a3b0c9] mb-6">
            Connectez-vous pour accéder à votre tableau de bord d'accessibilité
          </p>

          <Button
            onClick={handleGoogle}
            disabled={loading}
            variant="primary"
            size="lg"
            className="w-full"
          >
            {loading ? (
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

          {error && (
            <p
              role="alert"
              className="mt-4 rounded-[10px] border border-[#ef4444]/40 bg-[#ef4444]/10 px-4 py-2.5 text-sm text-[#fecaca]"
            >
              {error}
            </p>
          )}

          <p className="mt-6 text-center text-xs text-[#6b7794] leading-relaxed">
            En continuant vous acceptez nos{' '}
            <Link to="/legal/cgu" className="text-[#67e8f9] hover:underline">
              CGU
            </Link>{' '}
            et notre{' '}
            <Link to="/legal/confidentialite" className="text-[#67e8f9] hover:underline">
              politique de confidentialité
            </Link>
            .
          </p>
        </Card>

        <div className="mt-6 text-center text-sm text-[#a3b0c9]">
          <Link to="/" className="hover:text-white">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  )
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
