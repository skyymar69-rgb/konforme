import { Link, Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { defineMessages, localizePath, useLang, useMessages } from '@/i18n'

const L = defineMessages({
  fr: {
    skipToContent: 'Aller au contenu principal',
    banner: "Quel est le score d'accessibilité de votre site ? Testez-le gratuitement en 20 secondes →",
  },
  en: {
    skipToContent: 'Skip to main content',
    banner: "What is your website's accessibility score? Test it free in 20 seconds →",
  },
  de: {
    skipToContent: 'Zum Hauptinhalt springen',
    banner: 'Wie barrierefrei ist Ihre Website? Testen Sie sie kostenlos in 20 Sekunden →',
  },
  es: {
    skipToContent: 'Ir al contenido principal',
    banner: '¿Cuál es la puntuación de accesibilidad de su sitio? Pruébelo gratis en 20 segundos →',
  },
  it: {
    skipToContent: 'Vai al contenuto principale',
    banner: 'Qual è il punteggio di accessibilità del suo sito? Lo verifichi gratis in 20 secondi →',
  },
})

export function PublicLayout() {
  const t = useMessages(L)
  const lang = useLang()
  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only fixed top-0 left-0 z-50 bg-warning text-black font-bold px-4 py-2 rounded-br-[10px]"
      >
        {t.skipToContent}
      </a>
      <Link
        to={`${localizePath(lang, '/')}#checker`}
        className="block bg-gradient-to-r from-primary to-accent-deep px-4 py-2 text-center text-xs sm:text-sm font-semibold text-white hover:underline"
      >
        {t.banner}
      </Link>
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
