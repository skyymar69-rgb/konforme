import { Outlet } from 'react-router-dom'
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
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
