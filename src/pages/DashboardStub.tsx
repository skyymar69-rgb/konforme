import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

/** Generic placeholder for dashboard sub-pages not yet built. */
export function DashboardStub({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-[#a3b0c9] mt-1">{description}</p>
      </div>
      <Card className="text-center py-16">
        <div className="size-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#2563eb]/20 to-[#06b6d4]/10 border border-[#2563eb]/30 flex items-center justify-center text-2xl">
          🚧
        </div>
        <h2 className="text-lg font-bold mb-2">Bientôt disponible</h2>
        <p className="text-sm text-[#a3b0c9] mb-6 max-w-md mx-auto">
          Cette section est en cours de développement. Les premières fonctionnalités arrivent dans les prochains jours.
        </p>
        <Button variant="ghost" onClick={() => history.back()}>← Retour</Button>
      </Card>
    </div>
  )
}
