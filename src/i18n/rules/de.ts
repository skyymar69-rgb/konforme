import type { RuleL10n } from '@/i18n/rules-i18n'

/** Titres et correctifs des 40 règles du moteur, en allemand. */
export const RULES_DE: Record<string, RuleL10n> = {
  'RGAA 1.1 / WCAG 1.1.1': {
    title: 'Bild ohne Textalternative',
    fix: 'Fügen Sie alt="Bildbeschreibung" hinzu (oder alt="", wenn das Bild rein dekorativ ist).',
  },
  'RGAA 1.3 / WCAG 1.1.1': {
    title: 'Textalternative ohne Aussagekraft',
    fix: 'Ersetzen Sie den alt-Text durch eine echte Beschreibung des Inhalts oder der Funktion des Bildes.',
  },
  'RGAA 8.3 / WCAG 3.1.1': {
    title: 'Sprache des Dokuments fehlt oder ist ungültig',
    fix: 'Fügen Sie lang="de" (oder die tatsächliche Sprache des Inhalts) im <html>-Tag hinzu.',
  },
  'RGAA 8.5 / WCAG 2.4.2': {
    title: 'Seitentitel fehlt oder ist leer',
    fix: 'Fügen Sie im <head> einen eindeutigen, beschreibenden <title> hinzu.',
  },
  'RGAA 9.1 / WCAG 1.3.1': {
    title: 'Fehlerhafte Überschriftenhierarchie',
    fix: 'Strukturieren Sie die Seite mit einer einzigen h1 und anschließend h2/h3, ohne Ebenen zu überspringen.',
  },
  'RGAA 11.1 / WCAG 3.3.2': {
    title: 'Formularfeld ohne Beschriftung',
    fix: 'Verknüpfen Sie ein <label for="feld-id"> oder ergänzen Sie aria-label="…" am Feld.',
  },
  'RGAA 11.10 / WCAG 3.3.2': {
    title: 'Platzhalter als einzige Beschriftung verwendet',
    fix: 'Behalten Sie den Platzhalter als Beispiel, ergänzen Sie aber ein echtes <label> oder ein aria-label.',
  },
  'RGAA 6.2 / WCAG 2.4.4': {
    title: 'Link ohne Beschriftung',
    fix: 'Fügen Sie sichtbaren Text, ein aria-label oder ein alt-Attribut am Bild im Link hinzu.',
  },
  'RGAA 6.1 / WCAG 2.4.4': {
    title: 'Linktext nicht aussagekräftig',
    fix: 'Formulieren Sie den Linktext so um, dass er das Ziel beschreibt, oder ergänzen Sie ihn mit einem aria-label.',
  },
  'RGAA 11.9 / WCAG 4.1.2': {
    title: 'Schaltfläche ohne Beschriftung',
    fix: 'Fügen Sie Text, ein aria-label oder ein <title>-Element im SVG der Schaltfläche hinzu.',
  },
  'RGAA 8.2 / HTML valide': {
    title: 'Doppelte Bezeichner (id)',
    fix: 'Machen Sie jede id innerhalb der Seite eindeutig.',
  },
  'RGAA 2.1 / WCAG 4.1.2': {
    title: 'Rahmen (iframe) ohne Titel',
    fix: 'Fügen Sie title="Beschreibung des Rahmeninhalts" am iframe hinzu.',
  },
  'RGAA 5.6 / WCAG 1.3.1': {
    title: 'Datentabelle ohne Kopfzellen',
    fix: 'Verwenden Sie <th scope="col"> / <th scope="row"> für die Kopfzellen der Tabelle.',
  },
  'RGAA 13.2 / WCAG 3.2.5': {
    title: 'Neues Fenster ohne Vorwarnung',
    fix: 'Weisen Sie in der Beschriftung (Text oder aria-label) darauf hin, dass der Link ein neues Fenster öffnet.',
  },
  'RGAA 13.1 / WCAG 2.2.1': {
    title: 'Automatische Weiterleitung (meta refresh)',
    fix: 'Entfernen Sie das meta refresh; nutzen Sie eine serverseitige Weiterleitung oder einen expliziten Link.',
  },
  'WCAG 1.4.4 / Zoom': {
    title: 'Zoom durch Nutzende blockiert',
    fix: 'Entfernen Sie user-scalable=no und maximum-scale aus dem meta viewport.',
  },
  'RGAA 12.8 / WCAG 2.4.3': {
    title: 'Positiver tabindex',
    fix: 'Verwenden Sie ausschließlich tabindex="0" oder tabindex="-1".',
  },
  'RGAA 4.10 / WCAG 1.4.2': {
    title: 'Medium wird automatisch abgespielt',
    fix: 'Entfernen Sie das Attribut autoplay oder schalten Sie das Medium standardmäßig stumm (muted).',
  },
  'RGAA 4.3 / WCAG 1.2.2': {
    title: 'Keine Untertitel im Video erkannt',
    fix: 'Fügen Sie <track kind="captions" srclang="de" src="…"> zum Video hinzu.',
  },
  'RGAA 12.6 / Landmarks': {
    title: 'Hauptinhaltsbereich nicht ausgezeichnet',
    fix: 'Umschließen Sie den Hauptinhalt mit einem einzigen <main>-Element.',
  },
  'RGAA 12.7 / WCAG 2.4.1': {
    title: 'Sprunglink fehlt',
    fix: 'Fügen Sie als erstes fokussierbares Element einen internen Link zum Hauptinhalt hinzu.',
  },
  'WCAG 4.1.2 / aria-hidden': {
    title: 'Fokussierbares Element vor Screenreadern verborgen',
    fix: 'Entfernen Sie aria-hidden oder machen Sie das Element nicht fokussierbar (tabindex="-1", disabled).',
  },
  'ARIA refs / WCAG 1.3.1': {
    title: 'ARIA-Referenz verweist auf eine nicht vorhandene id',
    fix: 'Korrigieren Sie die referenzierte id oder ersetzen Sie sie durch ein aria-label.',
  },
  'RGAA 11.6 / WCAG 1.3.1': {
    title: 'Feldgruppe ohne Legende',
    fix: 'Fügen Sie eine <legend> als erstes Kindelement des fieldset hinzu.',
  },
  'RGAA 10.1 / Présentation': {
    title: 'Veraltete Präsentations-Tags',
    fix: 'Entfernen Sie diese Tags und regeln Sie die Darstellung per CSS.',
  },
  'RGAA 6.1 / Lien-image': {
    title: 'Bildlink ohne Alternative',
    fix: 'Setzen Sie das alt des Bildes auf das Ziel des Links (z. B. alt="Startseite").',
  },
  'Contraste inline / WCAG 1.4.3': {
    title: 'Unzureichender Textkontrast (Inline-Styles)',
    fix: 'Passen Sie die Farben an, um mindestens 4,5:1 (normaler Text) bzw. 3:1 (großer Text) zu erreichen.',
  },
  'RGAA 1.1 / WCAG 1.1.1 (area)': {
    title: 'Bereich einer Image-Map ohne Alternative',
    fix: 'Fügen Sie alt="Ziel des Bereichs" an jedem <area href="…"> hinzu.',
  },
  'RGAA 1.1 / WCAG 1.1.1 (input image)': {
    title: 'Bild-Schaltfläche ohne Alternative',
    fix: 'Fügen Sie alt="Funktion der Schaltfläche" am input type="image" hinzu.',
  },
  'RGAA 1.1 / WCAG 1.1.1 (svg)': {
    title: 'Informationstragendes SVG ohne Alternative',
    fix: 'Fügen Sie aria-label="Beschreibung" oder ein <title>-Element als erstes Kindelement des SVG hinzu.',
  },
  'RGAA 9.1 / WCAG 1.3.1 (titre vide)': {
    title: 'Leere Überschrift (h1-h6)',
    fix: 'Tragen Sie den Überschriftentext ein oder entfernen Sie das leere Tag.',
  },
  'RGAA 11.1 / WCAG 3.3.2 (label orphelin)': {
    title: 'Beschriftung ohne zugehöriges Feld',
    fix: 'Stimmen Sie das for-Attribut des Labels auf die id des Feldes ab.',
  },
  'ARIA role / WCAG 4.1.2': {
    title: 'Ungültige ARIA-Rolle',
    fix: 'Verwenden Sie eine gültige ARIA-Rolle (button, navigation, dialog…) oder entfernen Sie das Attribut.',
  },
  'Imbrication / WCAG 4.1.2': {
    title: 'Verschachtelte interaktive Elemente',
    fix: 'Verschieben Sie das verschachtelte Element aus dem übergeordneten Link bzw. der Schaltfläche heraus.',
  },
  'RGAA 7.3 / WCAG 2.1.1': {
    title: 'Klickbares Element nicht per Tastatur bedienbar',
    fix: 'Verwenden Sie ein <button> oder ergänzen Sie role="button" + tabindex="0" + die Behandlung der Tasten Enter/Leertaste.',
  },
  'WCAG 3.2.2 / Formulaire': {
    title: 'Formular ohne Absende-Schaltfläche',
    fix: 'Fügen Sie dem Formular eine sichtbare <button type="submit"> (oder input type="submit") hinzu.',
  },
  'RGAA 8.2 / Listes': {
    title: 'Listenelement außerhalb einer Liste',
    fix: 'Platzieren Sie die <li>-Elemente in einem <ul> oder <ol>.',
  },
  'WCAG 1.4.10 / Viewport': {
    title: 'Meta viewport fehlt',
    fix: 'Fügen Sie <meta name="viewport" content="width=device-width, initial-scale=1"> im <head> hinzu.',
  },
  'RGAA 1.3 / Alt trop long': {
    title: 'Textalternative zu lang',
    fix: 'Kürzen Sie den alt-Text und verschieben Sie die ausführliche Beschreibung in den umgebenden Inhalt.',
  },
  'WCAG 1.3.5 / Autocomplete': {
    title: 'Persönliches Feld ohne autocomplete',
    fix: 'Fügen Sie autocomplete="email" (oder "tel") am Feld hinzu.',
  },
}
