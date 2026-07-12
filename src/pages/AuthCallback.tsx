import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export function AuthCallback() {
  const navigate = useNavigate()
  const { refresh } = useAuth()

  useEffect(() => {
    let cancelled = false
    async function run() {
      // Appwrite a posé le cookie de session pendant la redirection OAuth :
      // on recharge le compte puis on route.
      try {
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
        <div className="size-12 mx-auto rounded-full border-4 border-[#2a3654] border-t-[#3b82f6] animate-spin" aria-hidden="true" />
        <p className="mt-4 text-[#a3b0c9]" role="status">Connexion en cours…</p>
      </div>
    </div>
  )
}
