import { Link } from 'react-router-dom'
import { Logo } from '@/components/ui/logo'

const SECTIONS = [
  {
    title: 'Produit',
    links: [
      { to: '/', label: 'Accueil' },
      { to: '/dashboard', label: 'Tableau de bord' },
      { to: '/blog', label: 'Blog' },
      { to: '/rgaa', label: 'RGAA' },
      { to: '/guide-accessibilite', label: 'Guide EAA / RGAA' },
      { to: '/glossaire', label: 'Glossaire RGAA' },
      { to: '/developpeurs', label: 'API & CI (développeurs)' },
    ],
  },
  {
    title: 'Entreprise',
    links: [
      { to: '/a-propos', label: 'À propos' },
      { to: '/contact', label: 'Contact' },
      { to: '/accessibilite', label: "Déclaration d'accessibilité" },
    ],
  },
  {
    title: 'Légal',
    links: [
      { to: '/legal/mentions-legales', label: 'Mentions légales' },
      { to: '/legal/cgu', label: 'CGU' },
      { to: '/legal/cgv', label: 'CGV' },
      { to: '/legal/confidentialite', label: 'Confidentialité' },
      { to: '/legal/rgpd', label: 'RGPD' },
      { to: '/legal/cookies', label: 'Cookies' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-bg/60" role="contentinfo">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-3 text-sm text-text-muted max-w-xs leading-relaxed">
              Plateforme d'accessibilité web RGAA 4.1.2 &amp; WCAG 2.2 automatisée par IA. Édité par KAYZEN SASU.
            </p>
            <p className="mt-4 text-xs text-text-dim">
              6 rue Pierre Termier, 69009 Lyon
              <br />
              SIREN 999 418 346 — TVA FR85 999 418 346
            </p>
          </div>
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-4">
                {s.title}
              </h3>
              <ul className="space-y-2.5">
                {s.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-text-soft hover:text-white hover:underline underline-offset-4"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-text-dim md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} KAYZEN SASU — Tous droits réservés.</p>
          <p>
            Fièrement réalisé par{' '}
            <a href="https://internet.kayzen-lyon.fr" rel="noopener" target="_blank" className="text-link hover:underline">
              Kayzen Web
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
