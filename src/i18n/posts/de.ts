import type { Post } from '@/content/posts'

/** Articles de blog traduits en allemand. */
export const POSTS_DE: Post[] = [
  {
    slug: 'european-accessibility-act-2025-obligations',
    title: 'EAA 2025: Welche Barrierefreiheitspflichten gelten für Ihre Website?',
    description:
      'Seit dem 28. Juni 2025 gilt der European Accessibility Act. Wer betroffen ist, welche Risiken bestehen und wo Sie anfangen sollten, um Ihre Website konform zu machen.',
    date: '2026-06-02',
    readingMinutes: 6,
    sections: [
      {
        paragraphs: [
          'Der 28. Juni 2025 markierte eine Zeitenwende: Der European Accessibility Act (EU-Richtlinie 2019/882) ist in der gesamten Europäischen Union anwendbar geworden. Zum ersten Mal betrifft die Pflicht zur digitalen Barrierefreiheit nicht mehr nur den öffentlichen Sektor, sondern die Mehrheit der privatwirtschaftlichen digitalen Dienstleistungen für Verbraucherinnen und Verbraucher.',
        ],
      },
      {
        heading: 'Wer ist betroffen?',
        paragraphs: [
          'Betroffen sind insbesondere: der elektronische Handel (jede Website, die online verkauft), Bankdienstleistungen, der Verkehrssektor (Ticketing, Anwendungen), E-Books, audiovisuelle Medien und die elektronische Kommunikation. Kleinstunternehmen im Dienstleistungsbereich (weniger als 10 Beschäftigte und weniger als 2 Mio. € Jahresumsatz) sind ausgenommen — diese Ausnahme erstreckt sich jedoch nicht auf die Produkte, die sie verkaufen.',
          'In Frankreich wurde die Richtlinie durch das französische Gesetz Nr. 2023-171 und dessen Durchführungsverordnungen umgesetzt. Die Aufsichtsbehörden (die DGCCRF — die französische Verbraucherschutzbehörde —, die ARCOM — die französische Medienregulierungsbehörde — sowie die Banque de France, je nach Branche) können Sanktionen verhängen und die Herstellung der Konformität verlangen.',
        ],
      },
      {
        heading: 'Was ist konkret zu tun?',
        paragraphs: ['Das Vorgehen umfasst vier Schritte:'],
        list: [
          'Prüfen: Ermitteln Sie den Abstand zu den WCAG 2.1/2.2 Stufe AA (in Frankreich RGAA 4.1.2).',
          'Beheben: Bearbeiten Sie vorrangig die kritischen Blockaden — Bilder ohne Alternativtext, Formulare ohne Beschriftung, unzureichende Kontraste, fehlende Tastaturbedienbarkeit.',
          'Erklären: Veröffentlichen Sie eine Barrierefreiheitserklärung mit Ihrem Konformitätsgrad und den Rechtsbehelfsmöglichkeiten.',
          'Aufrechterhalten: Jede Inbetriebnahme kann Regressionen zurückbringen; eine wiederkehrende Prüfung ist unverzichtbar.',
        ],
      },
      {
        heading: 'Das Risiko, nichts zu tun',
        paragraphs: [
          'Über behördliche Sanktionen hinaus schließt mangelnde Barrierefreiheit 15 bis 20 % Ihrer Nutzerinnen und Nutzer von Ihrer Website aus (Seh-, Bewegungs-, Hör- oder kognitive Einschränkungen — dauerhaft oder vorübergehend). Zudem ist es ein SEO-Faktor: Eine gut strukturierte Website mit Textalternativen und sauberer Semantik wird von Suchmaschinen besser verstanden.',
          'Eine automatisierte Prüfung mit Konforme dauert weniger als eine Minute und liefert Ihnen sofort die priorisierte Liste Ihrer Nichtkonformitäten. Das ist der rentabelste erste Schritt auf Ihrem Weg zur Konformität.',
        ],
      },
    ],
  },
  {
    slug: 'rgaa-vs-wcag-differences',
    title: 'RGAA vs. WCAG: Worin liegen die Unterschiede und welchen Standard sollten Sie anstreben?',
    description:
      'Der RGAA überträgt die WCAG auf den französischen Kontext. Verstehen Sie die Unterschiede, um das richtige Regelwerk zu wählen und Konformitätsfehler zu vermeiden.',
    date: '2026-05-12',
    readingMinutes: 5,
    sections: [
      {
        paragraphs: [
          'WCAG, RGAA, EN 301 549 … die Regelwerke zur Barrierefreiheit bilden ein vielschichtiges Geflecht, das so manches Team abschreckt. Die gute Nachricht: Sie greifen logisch ineinander.',
        ],
      },
      {
        heading: 'WCAG: die internationale Grundlage',
        paragraphs: [
          'Die vom W3C veröffentlichten Web Content Accessibility Guidelines definieren Erfolgskriterien in drei Stufen (A, AA, AAA). Stufe AA ist nahezu weltweit das gesetzlich vorgeschriebene Ziel. Version 2.2 (Oktober 2023) ergänzt 9 Kriterien, insbesondere zur Sichtbarkeit des Fokus und zu Alternativen für Ziehbewegungen (Drag-and-drop).',
        ],
      },
      {
        heading: 'RGAA: die französische Anwendungsmethode',
        paragraphs: [
          'Der RGAA 4.1.2 überträgt die WCAG in 106 Kriterien und mehr als 2 500 operative Tests. Er legt fest, wie zu testen ist — etwas, das die WCAG mitunter der Auslegung überlassen. Er ist für den französischen öffentlichen Sektor verbindlich und dient in Frankreich als Referenz für Prüfungen.',
          'Konkret bedeutet das: RGAA-konform zu sein setzt Konformität mit WCAG 2.1 AA voraus. Umgekehrt gilt das nicht zwangsläufig, denn der RGAA schreibt präzisere Tests vor (etwa zu den obligatorischen Elementen des HTML-Dokuments).',
        ],
      },
      {
        heading: 'Welchen Standard sollten Sie anstreben?',
        paragraphs: [
          'Wenn Ihr Markt Frankreich ist: Streben Sie den RGAA an — er schließt die WCAG ein und wird von französischen Prüferinnen und Prüfern herangezogen. Wenn Ihr Produkt international ausgerichtet ist: Die WCAG 2.2 AA genügen, und sie sind über die Norm EN 301 549 auch die vom EAA herangezogene Referenz.',
          'Konforme misst beides: Jede Prüfung liefert einen RGAA-4.1.2-Score und einen WCAG-2.2-Score, mit Querverweisen zu jeder einzelnen Nichtkonformität.',
        ],
      },
    ],
  },
  {
    slug: '10-erreurs-accessibilite-les-plus-courantes',
    title: 'Die 10 häufigsten Barrierefreiheitsfehler (und wie Sie sie beheben)',
    description:
      'Bilder ohne alt-Attribut, zu schwache Kontraste, Links mit dem Text „hier klicken“ … die Top 10 der auf französischen Websites festgestellten Nichtkonformitäten, jeweils mit der passenden Korrektur.',
    date: '2026-04-20',
    readingMinutes: 7,
    sections: [
      {
        paragraphs: [
          'Bei tausenden analysierten Seiten tauchen immer wieder dieselben Fehler auf. Werden sie behoben, ist der Großteil der tatsächlichen Hindernisse beseitigt, auf die Nutzerinnen und Nutzer von assistiven Technologien stoßen.',
        ],
      },
      {
        heading: 'Die Top 10',
        paragraphs: [],
        list: [
          '1. Bilder ohne Textalternative — ergänzen Sie alt="…" (oder alt="", wenn das Bild rein dekorativ ist).',
          '2. Unzureichende Kontraste — streben Sie 4,5:1 für normalen Text und 3:1 für großen Text an.',
          '3. Formularfelder ohne Beschriftung — jedes Eingabefeld braucht ein zugeordnetes Label.',
          '4. Leere Links oder Links mit dem Text „hier klicken“ — die Beschriftung muss das Ziel beschreiben.',
          '5. Zerbrochene Überschriftenhierarchie — nur eine h1, keine übersprungenen Ebenen.',
          '6. Icon-Buttons ohne zugänglichen Namen — ergänzen Sie aria-label.',
          '7. Zoom auf Mobilgeräten blockiert — entfernen Sie user-scalable=no aus dem Viewport.',
          '8. Iframes ohne Titel — jedes iframe muss seinen Inhalt beschreiben.',
          '9. Fehlender Sprunglink — ermöglichen Sie den direkten Zugang zum Inhalt.',
          '10. Unsichtbarer Tastaturfokus — entfernen Sie niemals outline ohne sichtbare Alternative.',
        ],
      },
      {
        heading: 'Wie erkennen Sie diese Fehler auf Ihrer Website?',
        paragraphs: [
          'Neun dieser zehn Fehler lassen sich automatisch erkennen. Eine Prüfung mit Konforme identifiziert sie in einer Minute, Seite für Seite, mit dem betroffenen HTML-Code und der anzuwendenden Korrektur. Starten Sie eine kostenlose Prüfung und Sie wissen sofort, wo Sie stehen.',
        ],
      },
    ],
  },
]
