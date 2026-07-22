import { Link, Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only fixed top-0 left-0 z-50 bg-[#fbbf24] text-black font-bold px-4 py-2 rounded-br-[10px]"
      >
        Aller au contenu principal
      </a>
      <Link
        to="/#checker"
        className="block bg-gradient-to-r from-[#2563eb] to-[#0e7490] px-4 py-2 text-center text-xs sm:text-sm font-semibold text-white hover:underline"
      >
        Quel est le score d'accessibilité de votre site ? Testez-le gratuitement en 20 secondes →
      </Link>
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
