import { Link, NavLink } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { Logo } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'

const NAV = [
  { to: '/', label: 'Accueil' },
  { to: '/tarifs', label: 'Tarifs' },
  { to: '/blog', label: 'Blog' },
  { to: '/rgaa', label: 'RGAA' },
  { to: '/guide-accessibilite', label: 'Guide EAA' },
  { to: '/a-propos', label: 'À propos' },
]

export function Header() {
  const { user, signOut } = useAuth()
  const [contactOpen, setContactOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastFocus = useRef<HTMLElement | null>(null)
  const drawerFirstBtn = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!contactOpen) return
    lastFocus.current = document.activeElement as HTMLElement
    drawerFirstBtn.current?.focus()
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setContactOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      lastFocus.current?.focus?.()
    }
  }, [contactOpen])

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-bg/75 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Konforme accueil">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Navigation principale">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-[10px] px-3 py-2 text-sm font-medium text-text-muted hover:text-text hover:bg-raise',
                  isActive && 'text-text bg-raise'
                )
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            aria-haspopup="dialog"
            aria-controls="kf-contact-drawer"
            aria-expanded={contactOpen}
            onClick={() => setContactOpen(true)}
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-primary to-accent-deep px-3.5 py-2 text-xs font-semibold text-white shadow-[0_6px_16px_rgba(37,99,235,0.35)] hover:-translate-y-px transition-transform"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M7 8h6M7 12h10M7 16h7" />
            </svg>
            Contact
          </button>

          {user ? (
            <>
              <Link to="/dashboard">
                <Button size="sm" variant="primary">Tableau de bord</Button>
              </Link>
              <Button size="sm" variant="ghost" onClick={() => signOut()}>
                Sortir
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button size="sm" variant="primary">Connexion</Button>
            </Link>
          )}

          <button
            type="button"
            className="md:hidden rounded-[10px] border border-border p-2 text-text"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
            aria-controls="kf-mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="kf-mobile-nav" className="md:hidden border-t border-border px-4 py-3" aria-label="Navigation mobile">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                cn(
                  'block rounded-[10px] px-3 py-2 text-sm font-medium text-text-muted',
                  isActive && 'text-text bg-raise'
                )
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
      )}

      {/* Contact drawer */}
      {contactOpen && (
        <div role="presentation" className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-bg/70 backdrop-blur-md"
            onClick={() => setContactOpen(false)}
            aria-hidden="true"
          />
          <aside
            id="kf-contact-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="kf-contact-title"
            className="absolute right-0 top-0 h-full w-full max-w-md border-l border-border bg-gradient-to-b from-surface to-surface-2 shadow-[-20px_0_60px_rgba(0,0,0,0.5)] overflow-y-auto"
          >
            <header className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 id="kf-contact-title" className="font-bold text-base">Konforme · KAYZEN SASU</h2>
              <button
                ref={drawerFirstBtn}
                type="button"
                aria-label="Fermer"
                onClick={() => setContactOpen(false)}
                className="size-9 rounded-[10px] border border-border hover:bg-raise inline-flex items-center justify-center"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </header>
            <div className="p-5 space-y-4">
              <p className="text-sm text-text-soft leading-relaxed">
                6 rue Pierre Termier, 69009 Lyon —{' '}
                <a className="text-link hover:underline" href="tel:+33487776861">+33 (0)4 87 77 68 61</a>
                <br />
                <a className="text-link hover:underline" href="mailto:contact@kayzen-lyon.fr">contact@kayzen-lyon.fr</a>
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Site', src: '/contact/qr-site.svg' },
                  { label: 'vCard', src: '/contact/qr-vcard.svg' },
                  { label: 'Maps', src: '/contact/qr-maps.svg' },
                  { label: 'Avis', src: '/contact/qr-avis.svg' },
                ].map((qr) => (
                  <figure key={qr.label} className="rounded-[12px] border border-border bg-white p-2.5 text-center">
                    <img src={qr.src} alt={`QR code vers ${qr.label}`} loading="lazy" className="aspect-square w-full" />
                    <figcaption className="mt-1.5 text-[0.65rem] font-bold uppercase tracking-wider text-surface-2">
                      {qr.label}
                    </figcaption>
                  </figure>
                ))}
              </div>

              <div className="grid gap-2">
                <a className="inline-flex justify-center rounded-[10px] bg-primary px-4 py-2.5 text-sm font-semibold hover:bg-primary-2" href="/contact/kayzen-konforme.vcf" download>
                  Télécharger la vCard
                </a>
                <a className="inline-flex justify-center rounded-[10px] border border-border px-4 py-2.5 text-sm font-semibold hover:bg-raise" href="https://www.google.com/maps/search/?api=1&query=KAYZEN+SASU+6+rue+Pierre+Termier+69009+Lyon" rel="noopener" target="_blank">
                  Itinéraire Maps
                </a>
                <a className="inline-flex justify-center rounded-[10px] border border-border px-4 py-2.5 text-sm font-semibold hover:bg-raise" href="https://www.google.com/search?q=KAYZEN+Lyon+avis" rel="noopener" target="_blank">
                  Voir les avis
                </a>
              </div>
            </div>
          </aside>
        </div>
      )}
    </header>
  )
}
