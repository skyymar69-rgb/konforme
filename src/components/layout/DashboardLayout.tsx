import { Suspense } from 'react'
import { NavLink, Outlet, Link } from 'react-router-dom'
import { Logo } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'

const NAV = [
  { to: '/dashboard', label: 'Vue d’ensemble', icon: HomeIcon },
  { to: '/dashboard/sites', label: 'Sites', icon: SitesIcon },
  { to: '/dashboard/scans', label: 'Scans', icon: ScanIcon },
  { to: '/dashboard/declarations', label: 'Déclarations', icon: DocIcon },
  { to: '/dashboard/settings', label: 'Paramètres', icon: GearIcon },
]

export function DashboardLayout() {
  const { user, signOut } = useAuth()
  const initial = (user?.name?.[0] || user?.email?.[0] || 'K').toUpperCase()

  return (
    <div className="min-h-screen flex bg-[#0a0e1a]">
      <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-[#2a3654] bg-[#0a0e1a]/80 backdrop-blur-md">
        <div className="px-6 py-5 border-b border-[#2a3654]">
          <Link to="/" className="flex items-center gap-2">
            <Logo />
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1" aria-label="Navigation tableau de bord">
          {NAV.map((n) => {
            const Icon = n.icon
            return (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === '/dashboard'}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-medium text-[#a3b0c9] hover:text-[#f1f5fb] hover:bg-white/5 transition-colors',
                    isActive && 'bg-gradient-to-r from-[#2563eb]/20 to-[#06b6d4]/10 text-white border border-[#2563eb]/30'
                  )
                }
              >
                <Icon />
                {n.label}
              </NavLink>
            )
          })}
        </nav>
        <div className="p-3 border-t border-[#2a3654]">
          <div className="flex items-center gap-3 rounded-[10px] p-2.5 bg-white/5">
            <div className="size-9 rounded-full bg-gradient-to-br from-[#2563eb] to-[#0e7490] flex items-center justify-center text-white text-sm font-bold shrink-0">
              {initial}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium truncate">
                {user?.name || user?.email?.split('@')[0] || 'Invité'}
              </div>
              <div className="text-xs text-[#8b98b8] truncate">{user?.email}</div>
            </div>
          </div>
          <Button size="sm" variant="ghost" className="w-full mt-2" onClick={() => signOut()}>
            Se déconnecter
          </Button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden sticky top-0 z-30 flex items-center justify-between border-b border-[#2a3654] bg-[#0a0e1a]/85 backdrop-blur-md px-4 py-3">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Logo />
          </Link>
          <Button size="sm" variant="ghost" onClick={() => signOut()}>
            Sortir
          </Button>
        </header>
        <main className="flex-1 px-4 py-6 md:px-8 md:py-10 max-w-7xl w-full mx-auto">
          <Suspense
            fallback={
              <div className="min-h-[40vh] grid place-items-center" role="status">
                <div className="size-10 rounded-full border-4 border-[#2a3654] border-t-[#3b82f6] animate-spin" aria-hidden="true" />
                <span className="sr-only">Chargement…</span>
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  )
}

function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12l9-9 9 9" />
      <path d="M5 10v10h14V10" />
    </svg>
  )
}
function SitesIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
    </svg>
  )
}
function ScanIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2M3 12h18" />
    </svg>
  )
}
function DocIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6M9 13h6M9 17h6M9 9h2" />
    </svg>
  )
}
function GearIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 008 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 8a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  )
}
