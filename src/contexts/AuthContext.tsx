/* eslint-disable react-refresh/only-export-components -- hook useAuth co-localisé avec le provider */
import * as React from 'react'
import { OAuthProvider } from 'appwrite'
import { account, type AppUser } from '@/lib/appwrite'

type AuthState = {
  user: AppUser | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  refresh: () => Promise<void>
}

const AuthContext = React.createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AppUser | null>(null)
  const [loading, setLoading] = React.useState(true)

  const refresh = React.useCallback(async () => {
    try {
      const me = await account.get()
      setUser({ id: me.$id, email: me.email, name: me.name })
    } catch {
      // 401 = simple visiteur non connecté
      setUser(null)
    }
  }, [])

  React.useEffect(() => {
    let mounted = true
    account
      .get()
      .then((me) => {
        if (mounted) setUser({ id: me.$id, email: me.email, name: me.name })
      })
      .catch(() => {
        // 401 = simple visiteur non connecté
        if (mounted) setUser(null)
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })
    return () => {
      mounted = false
    }
  }, [])

  const signInWithGoogle = React.useCallback(async () => {
    const origin = window.location.origin
    // Redirection complète vers Google via Appwrite, puis retour sur /auth/callback
    account.createOAuth2Session({
      provider: OAuthProvider.Google,
      success: `${origin}/auth/callback`,
      failure: `${origin}/login?error=oauth`,
    })
  }, [])

  const signOut = React.useCallback(async () => {
    try {
      await account.deleteSession({ sessionId: 'current' })
    } finally {
      setUser(null)
    }
  }, [])

  const value: AuthState = { user, loading, signInWithGoogle, signOut, refresh }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthState {
  const ctx = React.useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
