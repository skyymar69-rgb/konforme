import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

export function AuthCallback() {
  const navigate = useNavigate()
  useEffect(() => {
    let cancelled = false
    async function run() {
      // Supabase auto-detects the session in the URL (PKCE).
      // We just wait briefly for the session to be persisted, then redirect.
      try {
        const { data } = await supabase.auth.getSession()
        if (cancelled) return
        if (data.session) navigate('/dashboard', { replace: true })
        else navigate('/login?error=session', { replace: true })
      } catch {
        navigate('/login?error=callback', { replace: true })
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [navigate])

  return (
    <div className="min-h-screen grid place-items-center px-6 py-10">
      <div className="text-center">
        <div className="size-12 mx-auto rounded-full border-4 border-[#2a3654] border-t-[#3b82f6] animate-spin" aria-hidden="true" />
        <p className="mt-4 text-[#a3b0c9]" role="status">Connexion en cours…</p>
      </div>
    </div>
  )
}
