import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Seo } from '@/components/Seo'

const CURL_EXAMPLE = `curl -s -X POST "https://fra.cloud.appwrite.io/v1/functions/scan-site/executions" \\
  -H "Content-Type: application/json" \\
  -H "X-Appwrite-Project: konforme" \\
  -d '{"body":"{\\"url\\":\\"https://votre-site.fr\\"}","async":false}'`

const RESPONSE_EXAMPLE = `{
  "url": "https://votre-site.fr/",
  "score": 84.2,
  "rgaa_score": 86.1,
  "wcag_score": 82.7,
  "issues_count": 12,
  "rules_checked": 74,
  "by_severity": { "critical": 2, "serious": 3, "moderate": 5, "minor": 2 },
  "top_issues": [
    { "rule_id": "RGAA 1.1 / WCAG 1.1.1", "severity": "critical", "title": "Image sans alternative textuelle", "count": 4 }
  ]
}`

const ACTION_EXAMPLE = `name: Audit accessibilité (Konforme)
on:
  push:
    branches: [main]
jobs:
  accessibilite:
    runs-on: ubuntu-latest
    steps:
      - name: Audit de la page d'accueil
        run: |
          RES=$(curl -s -X POST "https://fra.cloud.appwrite.io/v1/functions/scan-site/executions" \\
            -H "Content-Type: application/json" \\
            -H "X-Appwrite-Project: konforme" \\
            -d '{"body":"{\\"url\\":\\"https://votre-site.fr\\"}","async":false}')
          SCORE=$(echo "$RES" | jq -r '.responseBody | fromjson | .score')
          echo "Score d'accessibilité : \${SCORE} %"
          awk "BEGIN { exit !(\${SCORE} >= 80) }" || {
            echo "::error::Score d'accessibilité \${SCORE} % sous le seuil de 80 %"
            exit 1
          }`

/**
 * Documentation développeurs : audit d'une page en un appel HTTP (le même
 * moteur que le vérificateur public de la landing) et intégration CI.
 */
export function Developpeurs() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <Seo
        title="API & CI : auditez l'accessibilité en un appel HTTP"
        description="Intégrez l'audit d'accessibilité RGAA/WCAG de Konforme dans votre CI : un appel HTTP sans clé pour auditer une page, et une GitHub Action prête à copier qui bloque les régressions."
        path="/developpeurs"
      />

      <p className="text-xs font-semibold uppercase tracking-wider text-link mb-3">Développeurs</p>
      <h1 className="text-4xl font-extrabold tracking-tight mb-6">
        Auditez l'accessibilité en un appel HTTP
      </h1>
      <p className="text-lg text-text-muted leading-relaxed mb-10">
        Le mini-audit public de Konforme (une page, ~100 règles RGAA 4.1.2 / WCAG 2.2) est accessible en
        HTTP sans clé d'API ni compte. Idéal pour un contrôle en CI : bloquez le déploiement quand le
        score régresse.
      </p>

      <section className="mb-10" aria-labelledby="endpoint-title">
        <h2 id="endpoint-title" className="text-2xl font-bold tracking-tight mb-3">L'appel</h2>
        <pre className="overflow-x-auto rounded-[12px] border border-border bg-bg px-4 py-3 text-xs text-text-soft leading-relaxed">
          <code>{CURL_EXAMPLE}</code>
        </pre>
        <p className="text-sm text-text-dim mt-2">
          Réponse : le champ <code className="text-primary-soft">responseBody</code> contient le résultat JSON.
          Les cibles privées (localhost, IP internes) sont refusées, et l'audit d'une page prend 5 à 25 secondes.
        </p>
      </section>

      <section className="mb-10" aria-labelledby="response-title">
        <h2 id="response-title" className="text-2xl font-bold tracking-tight mb-3">La réponse</h2>
        <pre className="overflow-x-auto rounded-[12px] border border-border bg-bg px-4 py-3 text-xs text-text-soft leading-relaxed">
          <code>{RESPONSE_EXAMPLE}</code>
        </pre>
      </section>

      <section className="mb-10" aria-labelledby="action-title">
        <h2 id="action-title" className="text-2xl font-bold tracking-tight mb-3">
          GitHub Action : bloquer les régressions
        </h2>
        <p className="text-text-soft leading-relaxed mb-3">
          Copiez ce workflow dans <code className="text-primary-soft">.github/workflows/accessibilite.yml</code> :
          à chaque push, la page est auditée et le build échoue sous 80 % (ajustez le seuil).
        </p>
        <pre className="overflow-x-auto rounded-[12px] border border-border bg-bg px-4 py-3 text-xs text-text-soft leading-relaxed">
          <code>{ACTION_EXAMPLE}</code>
        </pre>
      </section>

      <section className="mb-10" aria-labelledby="limits-title">
        <h2 id="limits-title" className="text-2xl font-bold tracking-tight mb-3">Limites et suite</h2>
        <ul className="space-y-2 text-text-soft leading-relaxed list-disc pl-5">
          <li>Le mode public audite <strong className="text-text">une page à la fois</strong>, sans persistance ni historique.</li>
          <li>
            Pour un audit multi-pages, le suivi des 106 critères, les évaluations manuelles, les exports et
            le monitoring : <Link to="/login" className="underline text-link hover:text-white">créez un compte gratuit</Link>.
          </li>
          <li>Usage raisonnable : cet endpoint partage les ressources du vérificateur public. Une API dédiée avec clé arrive pour les usages intensifs.</li>
        </ul>
      </section>

      <section className="rounded-[16px] border border-border bg-surface px-6 py-8 text-center">
        <h2 className="text-xl font-bold tracking-tight mb-2">Besoin de plus ?</h2>
        <p className="text-text-muted mb-5">Audit multi-pages, tickets Jira, badge, déclaration légale — tout est dans l'app.</p>
        <Link to="/login">
          <Button variant="primary">Commencer gratuitement</Button>
        </Link>
      </section>
    </div>
  )
}
