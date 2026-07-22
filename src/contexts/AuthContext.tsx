/* eslint-disable react-refresh/only-export-components -- hook useAuth co-localisé avec le provider */
import * as React from 'react'
import { ID, OAuthProvider } from 'appwrite'
import { account, appwriteConfigured, type AppUser } from '@/lib/appwrite'

const NOT_CONFIGURED_MSG =
  "Le backend n'est pas encore configuré (projet Appwrite manquant). Contactez l'administrateur du site."

function assertConfigured() {
  if (!appwriteConfigured) throw new Error(NOT_CONFIGURED_MSG)
}

type AuthState = {
  user: AppUser | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signInWithEmail: (email: string, password: string) => Promise<void>
  signUpWithEmail: (name: string, email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  refresh: () => Promise<void>
}

const AuthContext = React.createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AppUser | null>(null)
  // Backend non configuré : pas de session à restaurer, on démarre déjà « chargé »
  const [loading, setLoading] = React.useState(appwriteConfigured)

  const refresh = React.useCallback(async () => {
    if (!appwriteConfigured) {
      setUser(null)
      return
    }
    try {
      const me = await account.get()
      setUser({ id: me.$id, email: me.email, name: me.name })
    } catch {
      // 401 = simple visiteur non connecté
      setUser(null)
    }
  }, [])

  React.useEffect(() => {
    if (!appwriteConfigured) return
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
    assertConfigured()
    const origin = window.location.origin
    // Redirection complète vers Google via Appwrite, puis retour sur /auth/callback
    account.createOAuth2Session({
      provider: OAuthProvider.Google,
      success: `${origin}/auth/callback`,
      failure: `${origin}/login?error=oauth`,
    })
  }, [])

  const signInWithEmail = React.useCallback(
    async (email: string, password: string) => {
      assertConfigured()
      await account.createEmailPasswordSession({ email, password })
      await refresh()
    },
    [refresh],
  )

  const signUpWithEmail = React.useCallback(
    async (name: string, email: string, password: string) => {
      assertConfigured()
      await account.create({ userId: ID.unique(), email, password, name })
      await account.createEmailPasswordSession({ email, password })
      await refresh()
    },
    [refresh],
  )

  const signOut = React.useCallback(async () => {
    try {
      await account.deleteSession({ sessionId: 'current' })
    } finally {
      setUser(null)
    }
  }, [])

  const value: AuthState = {
    user,
    loading,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    refresh,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthState {
  const ctx = React.useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
