import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Seo } from '@/components/Seo'

/**
 * Landing pages européennes (EN/DE/ES/IT) : l'EAA est le même texte dans les
 * 27 États membres — ces pages captent la recherche non francophone.
 * Le produit reste en français pour l'instant (annoncé honnêtement).
 */

export type IntlLang = 'en' | 'de' | 'es' | 'it'

type Dict = {
  seoTitle: string
  seoDescription: string
  kicker: string
  title: string
  subtitle: string
  deadline: string
  features: { title: string; text: string }[]
  stepsTitle: string
  steps: string[]
  langNote: string
  cta: string
  ctaSecondary: string
}

const DICTS: Record<IntlLang, Dict> = {
  en: {
    seoTitle: 'European Accessibility Act compliance scanner — RGAA / WCAG 2.2 / EN 301 549',
    seoDescription:
      'Audit your website against the European Accessibility Act (EAA): automated WCAG 2.2 / EN 301 549 scan, all 106 RGAA criteria, guided fixes, legal statement, compliance badge and monitoring.',
    kicker: 'European Accessibility Act · EN 301 549 · WCAG 2.2',
    title: 'Is your website ready for the European Accessibility Act?',
    subtitle:
      'Since 28 June 2025, the EAA requires e-commerce, banking, transport and media services in all 27 EU member states to be accessible. Konforme scans your site, explains every issue in plain language and guides you to compliance — no consultants needed.',
    deadline:
      'Enforcement is active: in France, fines reach €50,000 per non-compliant service and €25,000 for a missing accessibility statement.',
    features: [
      { title: 'Automated audit', text: '~100 automated checks (WCAG 2.2 AA / EN 301 549 / RGAA 4.1.2), page by page, with the exact HTML element and a suggested fix for every issue.' },
      { title: 'All 106 criteria', text: 'The full official criteria list with plain-language explanations, manual review workflow and the official conformity rate — the method regulators expect.' },
      { title: 'Proof you can show', text: 'Audit reports (PDF, HTML, Markdown), a dated audit attestation, a compliance badge for your site and a shareable read-only report link.' },
      { title: 'Stay compliant', text: 'Scheduled re-scans, regression alerts and audit-to-audit comparison. Export issues as Jira/Trello/Linear tickets or block regressions in CI.' },
    ],
    stepsTitle: 'How it works',
    steps: [
      'Enter your URL — get a free instant audit of your homepage.',
      'Review every issue with its location, code and suggested fix.',
      'Fix, re-scan, publish your accessibility statement and badge.',
    ],
    langNote: 'The product interface is currently in French — English interface is on our roadmap. The audit engine, reports and exports work for websites in any language.',
    cta: 'Scan my website for free',
    ctaSecondary: 'Read about the EAA (in French)',
  },
  de: {
    seoTitle: 'European Accessibility Act : Barrierefreiheits-Scanner — WCAG 2.2 / EN 301 549',
    seoDescription:
      'Prüfen Sie Ihre Website auf Konformität mit dem European Accessibility Act (EAA) und dem BFSG: automatisierter WCAG 2.2 / EN 301 549 Scan, verständliche Erklärungen, Berichte, Badge und Monitoring.',
    kicker: 'European Accessibility Act · BFSG · EN 301 549 · WCAG 2.2',
    title: 'Ist Ihre Website bereit für den European Accessibility Act?',
    subtitle:
      'Seit dem 28. Juni 2025 verpflichtet der EAA (in Deutschland: BFSG) E-Commerce, Banken, Verkehr und Medien in allen 27 EU-Staaten zur Barrierefreiheit. Konforme scannt Ihre Website, erklärt jeden Fehler verständlich und begleitet Sie zur Konformität.',
    deadline:
      'Die Marktüberwachung ist aktiv: Verstöße gegen das BFSG können mit Bußgeldern bis zu 100.000 € geahndet werden.',
    features: [
      { title: 'Automatisierter Audit', text: '~100 automatische Prüfungen (WCAG 2.2 AA / EN 301 549), Seite für Seite, mit dem exakten HTML-Element und einem Korrekturvorschlag für jeden Fehler.' },
      { title: 'Vollständige Kriterienliste', text: 'Alle Prüfkriterien mit verständlichen Erklärungen, manuellem Bewertungs-Workflow und offizieller Konformitätsquote.' },
      { title: 'Nachweisbare Konformität', text: 'Audit-Berichte (PDF, HTML, Markdown), datierte Bescheinigung, Konformitäts-Badge und teilbarer Berichtslink.' },
      { title: 'Konform bleiben', text: 'Geplante Re-Scans, Regressionswarnungen, Audit-Vergleich, Ticket-Export (Jira/Trello/Linear) und CI-Integration.' },
    ],
    stepsTitle: 'So funktioniert es',
    steps: [
      'URL eingeben — kostenloser Sofort-Audit Ihrer Startseite.',
      'Jeden Fehler mit Position, Code und Korrekturvorschlag prüfen.',
      'Korrigieren, erneut scannen, Erklärung zur Barrierefreiheit und Badge veröffentlichen.',
    ],
    langNote: 'Die Produktoberfläche ist derzeit auf Französisch — eine deutsche Oberfläche ist geplant. Die Audit-Engine, Berichte und Exporte funktionieren für Websites in jeder Sprache.',
    cta: 'Website kostenlos scannen',
    ctaSecondary: 'Mehr über den EAA (auf Französisch)',
  },
  es: {
    seoTitle: 'European Accessibility Act : escáner de accesibilidad web — WCAG 2.2 / EN 301 549',
    seoDescription:
      'Audite su sitio web según el European Accessibility Act (EAA): escaneo automático WCAG 2.2 / EN 301 549, explicaciones claras, informes, insignia de conformidad y monitorización.',
    kicker: 'European Accessibility Act · EN 301 549 · WCAG 2.2',
    title: '¿Está su sitio web preparado para el European Accessibility Act?',
    subtitle:
      'Desde el 28 de junio de 2025, el EAA exige que el comercio electrónico, la banca, el transporte y los medios sean accesibles en los 27 Estados miembros. Konforme escanea su sitio, explica cada error con claridad y le guía hacia la conformidad.',
    deadline:
      'La vigilancia del mercado está activa: en España, la Ley 11/2023 prevé sanciones que pueden alcanzar los 600.000 € en casos muy graves.',
    features: [
      { title: 'Auditoría automática', text: '~100 comprobaciones automáticas (WCAG 2.2 AA / EN 301 549), página a página, con el elemento HTML exacto y una corrección sugerida para cada error.' },
      { title: 'Todos los criterios', text: 'La lista completa de criterios con explicaciones claras, flujo de evaluación manual y la tasa oficial de conformidad.' },
      { title: 'Pruebas demostrables', text: 'Informes (PDF, HTML, Markdown), certificado de auditoría fechado, insignia de conformidad y enlace de informe compartible.' },
      { title: 'Mantenerse conforme', text: 'Re-escaneos programados, alertas de regresión, comparación entre auditorías, exportación de tickets (Jira/Trello/Linear) e integración CI.' },
    ],
    stepsTitle: 'Cómo funciona',
    steps: [
      'Introduzca su URL — auditoría gratuita e instantánea de su página de inicio.',
      'Revise cada error con su ubicación, código y corrección sugerida.',
      'Corrija, vuelva a escanear y publique su declaración de accesibilidad y su insignia.',
    ],
    langNote: 'La interfaz del producto está actualmente en francés — la versión en español está en nuestra hoja de ruta. El motor de auditoría, los informes y las exportaciones funcionan con sitios web en cualquier idioma.',
    cta: 'Escanear mi sitio gratis',
    ctaSecondary: 'Más sobre el EAA (en francés)',
  },
  it: {
    seoTitle: 'European Accessibility Act : scanner di accessibilità web — WCAG 2.2 / EN 301 549',
    seoDescription:
      "Verifica il tuo sito secondo l'European Accessibility Act (EAA): scansione automatica WCAG 2.2 / EN 301 549, spiegazioni chiare, report, badge di conformità e monitoraggio.",
    kicker: 'European Accessibility Act · EN 301 549 · WCAG 2.2',
    title: "Il tuo sito è pronto per l'European Accessibility Act?",
    subtitle:
      "Dal 28 giugno 2025 l'EAA impone l'accessibilità a e-commerce, banche, trasporti e media nei 27 Stati membri. Konforme scansiona il tuo sito, spiega ogni errore in modo chiaro e ti guida alla conformità.",
    deadline:
      "La vigilanza del mercato è attiva: in Italia (AgID) le sanzioni possono raggiungere il 5 % del fatturato per i soggetti obbligati.",
    features: [
      { title: 'Audit automatico', text: '~100 controlli automatici (WCAG 2.2 AA / EN 301 549), pagina per pagina, con l’elemento HTML esatto e una correzione suggerita per ogni errore.' },
      { title: 'Tutti i criteri', text: 'L’elenco completo dei criteri con spiegazioni chiare, flusso di valutazione manuale e tasso ufficiale di conformità.' },
      { title: 'Prove dimostrabili', text: 'Report (PDF, HTML, Markdown), attestazione di audit datata, badge di conformità e link di report condivisibile.' },
      { title: 'Restare conformi', text: 'Nuove scansioni programmate, avvisi di regressione, confronto tra audit, esportazione ticket (Jira/Trello/Linear) e integrazione CI.' },
    ],
    stepsTitle: 'Come funziona',
    steps: [
      'Inserisci il tuo URL — audit gratuito e immediato della home page.',
      'Esamina ogni errore con posizione, codice e correzione suggerita.',
      'Correggi, riscansiona e pubblica la dichiarazione di accessibilità e il badge.',
    ],
    langNote: "L'interfaccia del prodotto è attualmente in francese — la versione italiana è nella nostra roadmap. Il motore di audit, i report e le esportazioni funzionano con siti in qualsiasi lingua.",
    cta: 'Scansiona il mio sito gratis',
    ctaSecondary: "Approfondisci l'EAA (in francese)",
  },
}

const INTL_ALTERNATES: Record<string, string> = {
  fr: '/',
  en: '/en',
  de: '/de',
  es: '/es',
  it: '/it',
  'x-default': '/en',
}

export function LandingIntl({ lang }: { lang: IntlLang }) {
  const d = DICTS[lang]
  return (
    <div lang={lang} className="mx-auto max-w-4xl px-6 py-14">
      <Seo
        title={d.seoTitle}
        description={d.seoDescription}
        path={`/${lang}`}
        lang={lang}
        alternates={INTL_ALTERNATES}
      />

      <p className="text-xs font-semibold uppercase tracking-wider text-link mb-3">{d.kicker}</p>
      <h1 className="text-4xl font-extrabold tracking-tight mb-5 text-balance">{d.title}</h1>
      <p className="text-lg text-text-muted leading-relaxed mb-5">{d.subtitle}</p>
      <p className="mb-8 rounded-[12px] border border-warning/40 bg-warning-bg/25 px-4 py-3 text-sm text-text-soft leading-relaxed">
        {d.deadline}
      </p>

      <div className="mb-10 flex flex-wrap gap-3">
        <Link to="/">
          <Button variant="primary" size="lg">{d.cta}</Button>
        </Link>
        <Link to="/guide-accessibilite">
          <Button variant="outline" size="lg">{d.ctaSecondary}</Button>
        </Link>
      </div>

      <div className="mb-12 grid gap-4 sm:grid-cols-2">
        {d.features.map((f) => (
          <div key={f.title} className="rounded-[14px] border border-border px-5 py-4">
            <h2 className="font-bold text-text mb-1.5">{f.title}</h2>
            <p className="text-sm text-text-soft leading-relaxed">{f.text}</p>
          </div>
        ))}
      </div>

      <section className="mb-12" aria-labelledby={`steps-${lang}`}>
        <h2 id={`steps-${lang}`} className="text-2xl font-bold tracking-tight mb-4">{d.stepsTitle}</h2>
        <ol className="space-y-3">
          {d.steps.map((s, i) => (
            <li key={s} className="flex gap-4 rounded-[12px] border border-border px-4 py-3">
              <span className="shrink-0 font-extrabold text-link">{i + 1}.</span>
              <span className="text-text-soft leading-relaxed">{s}</span>
            </li>
          ))}
        </ol>
      </section>

      <p className="text-sm text-text-dim leading-relaxed">{d.langNote}</p>
    </div>
  )
}
