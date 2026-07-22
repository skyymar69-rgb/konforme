import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Seo } from '@/components/Seo'

export function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <Seo title="Page introuvable (404)" description="Cette page n'existe pas ou a été déplacée." path="/404" noindex />
      <p className="text-6xl font-extrabold gradient-text mb-4" aria-hidden="true">404</p>
      <h1 className="text-2xl font-bold tracking-tight mb-3">Page introuvable</h1>
      <p className="text-text-muted mb-8">
        Cette page n'existe pas ou a été déplacée. Vérifiez l'adresse, ou repartez de l'accueil.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link to="/"><Button variant="primary">Retour à l'accueil</Button></Link>
        <Link to="/contact"><Button variant="ghost">Nous contacter</Button></Link>
      </div>
    </div>
  )
}
