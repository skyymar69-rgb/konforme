import type { RuleL10n } from '@/i18n/rules-i18n'

/** Titres et correctifs des 40 règles du moteur, en italien. */
export const RULES_IT: Record<string, RuleL10n> = {
  'RGAA 1.1 / WCAG 1.1.1': {
    title: 'Immagine senza alternativa testuale',
    fix: 'Aggiunga alt="descrizione dell’immagine" (oppure alt="" se l’immagine è puramente decorativa).',
  },
  'RGAA 1.3 / WCAG 1.1.1': {
    title: 'Alternativa testuale non pertinente',
    fix: 'Sostituisca il testo alt con una descrizione reale del contenuto o della funzione dell’immagine.',
  },
  'RGAA 8.3 / WCAG 3.1.1': {
    title: 'Lingua del documento assente o non valida',
    fix: 'Aggiunga lang="it" (o la lingua reale del contenuto) al tag <html>.',
  },
  'RGAA 8.5 / WCAG 2.4.2': {
    title: 'Titolo della pagina assente o vuoto',
    fix: 'Aggiunga un <title> univoco e descrittivo nel <head>.',
  },
  'RGAA 9.1 / WCAG 1.3.1': {
    title: 'Gerarchia dei titoli non corretta',
    fix: 'Strutturi la pagina con un solo h1, poi con h2/h3 senza saltare livelli.',
  },
  'RGAA 11.1 / WCAG 3.3.2': {
    title: 'Campo di modulo senza etichetta',
    fix: 'Associ un <label for="id-del-campo"> oppure aggiunga aria-label="…" al campo.',
  },
  'RGAA 11.10 / WCAG 3.3.2': {
    title: 'Placeholder usato come unica etichetta',
    fix: 'Mantenga il placeholder come esempio, ma aggiunga una vera <label> o un aria-label.',
  },
  'RGAA 6.2 / WCAG 2.4.4': {
    title: 'Collegamento senza testo',
    fix: 'Aggiunga un testo visibile, un aria-label o un attributo alt sull’immagine contenuta nel collegamento.',
  },
  'RGAA 6.1 / WCAG 2.4.4': {
    title: 'Testo del collegamento non esplicito',
    fix: 'Riformuli il testo del collegamento per descriverne la destinazione, oppure lo completi con un aria-label.',
  },
  'RGAA 11.9 / WCAG 4.1.2': {
    title: 'Pulsante senza etichetta',
    fix: 'Aggiunga un testo, un aria-label o un elemento <title> nell’SVG del pulsante.',
  },
  'RGAA 8.2 / HTML valide': {
    title: 'Identificatori (id) duplicati',
    fix: 'Renda univoco ogni id all’interno della pagina.',
  },
  'RGAA 2.1 / WCAG 4.1.2': {
    title: 'Frame (iframe) senza titolo',
    fix: 'Aggiunga title="descrizione del contenuto del frame" all’iframe.',
  },
  'RGAA 5.6 / WCAG 1.3.1': {
    title: 'Tabella di dati senza intestazioni',
    fix: 'Utilizzi <th scope="col"> / <th scope="row"> per le intestazioni della tabella.',
  },
  'RGAA 13.2 / WCAG 3.2.5': {
    title: 'Nuova finestra senza avviso',
    fix: 'Indichi nell’etichetta del collegamento (testo o aria-label) che si apre in una nuova finestra.',
  },
  'RGAA 13.1 / WCAG 2.2.1': {
    title: 'Reindirizzamento automatico (meta refresh)',
    fix: 'Rimuova il meta refresh; utilizzi un reindirizzamento lato server o un collegamento esplicito.',
  },
  'WCAG 1.4.4 / Zoom': {
    title: 'Zoom dell’utente bloccato',
    fix: 'Rimuova user-scalable=no e maximum-scale dal meta viewport.',
  },
  'RGAA 12.8 / WCAG 2.4.3': {
    title: 'tabindex positivo',
    fix: 'Utilizzi esclusivamente tabindex="0" o tabindex="-1".',
  },
  'RGAA 4.10 / WCAG 1.4.2': {
    title: 'Riproduzione automatica del media',
    fix: 'Rimuova l’attributo autoplay, oppure disattivi l’audio per impostazione predefinita (muted).',
  },
  'RGAA 4.3 / WCAG 1.2.2': {
    title: 'Nessun sottotitolo rilevato nel video',
    fix: 'Aggiunga <track kind="captions" srclang="it" src="…"> al video.',
  },
  'RGAA 12.6 / Landmarks': {
    title: 'Area del contenuto principale non identificata',
    fix: 'Racchiuda il contenuto principale in un unico elemento <main>.',
  },
  'RGAA 12.7 / WCAG 2.4.1': {
    title: 'Collegamento di salto al contenuto assente',
    fix: 'Aggiunga, come primo elemento attivabile da tastiera, un collegamento interno al contenuto principale.',
  },
  'WCAG 4.1.2 / aria-hidden': {
    title: 'Elemento attivabile nascosto ai lettori di schermo',
    fix: 'Rimuova aria-hidden, oppure renda l’elemento non attivabile da tastiera (tabindex="-1", disabled).',
  },
  'ARIA refs / WCAG 1.3.1': {
    title: 'Riferimento ARIA a un id inesistente',
    fix: 'Corregga l’id referenziato oppure lo sostituisca con un aria-label.',
  },
  'RGAA 11.6 / WCAG 1.3.1': {
    title: 'Gruppo di campi senza didascalia',
    fix: 'Aggiunga una <legend> come primo figlio del fieldset.',
  },
  'RGAA 10.1 / Présentation': {
    title: 'Tag di presentazione obsoleti',
    fix: 'Rimuova questi tag e gestisca la presentazione con i CSS.',
  },
  'RGAA 6.1 / Lien-image': {
    title: 'Collegamento-immagine senza alternativa',
    fix: 'Indichi nell’alt dell’immagine la destinazione del collegamento (es. alt="Home").',
  },
  'Contraste inline / WCAG 1.4.3': {
    title: 'Contrasto del testo insufficiente (stili inline)',
    fix: 'Regoli i colori per raggiungere almeno 4,5:1 (testo normale) o 3:1 (testo grande).',
  },
  'RGAA 1.1 / WCAG 1.1.1 (area)': {
    title: 'Area di mappa immagine senza alternativa',
    fix: 'Aggiunga alt="destinazione dell’area" su ogni <area href="…">.',
  },
  'RGAA 1.1 / WCAG 1.1.1 (input image)': {
    title: 'Pulsante immagine senza alternativa',
    fix: 'Aggiunga alt="funzione del pulsante" all’input type="image".',
  },
  'RGAA 1.1 / WCAG 1.1.1 (svg)': {
    title: 'SVG informativo senza alternativa',
    fix: 'Aggiunga aria-label="descrizione" oppure un elemento <title> come primo figlio dell’SVG.',
  },
  'RGAA 9.1 / WCAG 1.3.1 (titre vide)': {
    title: 'Titolo (h1-h6) vuoto',
    fix: 'Inserisca il testo del titolo oppure rimuova il tag vuoto.',
  },
  'RGAA 11.1 / WCAG 3.3.2 (label orphelin)': {
    title: 'Etichetta senza campo associato',
    fix: 'Faccia corrispondere l’attributo for dell’etichetta all’id del campo.',
  },
  'ARIA role / WCAG 4.1.2': {
    title: 'Ruolo ARIA non valido',
    fix: 'Utilizzi un ruolo ARIA valido (button, navigation, dialog…) oppure rimuova l’attributo.',
  },
  'Imbrication / WCAG 4.1.2': {
    title: 'Elementi interattivi annidati',
    fix: 'Sposti l’elemento annidato fuori dal collegamento o dal pulsante che lo contiene.',
  },
  'RGAA 7.3 / WCAG 2.1.1': {
    title: 'Elemento cliccabile non accessibile da tastiera',
    fix: 'Utilizzi un <button>, oppure aggiunga role="button" + tabindex="0" + la gestione dei tasti Invio/Spazio.',
  },
  'WCAG 3.2.2 / Formulaire': {
    title: 'Modulo senza pulsante di invio',
    fix: 'Aggiunga al modulo un <button type="submit"> visibile (o input type="submit").',
  },
  'RGAA 8.2 / Listes': {
    title: 'Elemento di elenco fuori da un elenco',
    fix: 'Collochi gli elementi <li> all’interno di un <ul> o di un <ol>.',
  },
  'WCAG 1.4.10 / Viewport': {
    title: 'Meta viewport assente',
    fix: 'Aggiunga <meta name="viewport" content="width=device-width, initial-scale=1"> nel <head>.',
  },
  'RGAA 1.3 / Alt trop long': {
    title: 'Alternativa testuale troppo lunga',
    fix: 'Accorci il testo alt e sposti la descrizione dettagliata nel contenuto adiacente.',
  },
  'WCAG 1.3.5 / Autocomplete': {
    title: 'Campo personale senza autocomplete',
    fix: 'Aggiunga autocomplete="email" (o "tel") al campo.',
  },
}
