import type { Post } from '@/content/posts'

/** Articles de blog traduits en italien. */
export const POSTS_IT: Post[] = [
  {
    slug: 'european-accessibility-act-2025-obligations',
    title: 'EAA 2025: quali obblighi di accessibilità per il vostro sito?',
    description:
      'Dal 28 giugno 2025 si applica l’European Accessibility Act. Chi è coinvolto, quali sono i rischi e da dove iniziare per mettere il vostro sito a norma.',
    date: '2026-06-02',
    readingMinutes: 6,
    sections: [
      {
        paragraphs: [
          'Il 28 giugno 2025 ha segnato una svolta: l’European Accessibility Act (direttiva UE 2019/882) è entrato in applicazione in tutta l’Unione europea. Per la prima volta, l’obbligo di accessibilità digitale non riguarda più soltanto il settore pubblico, ma la maggior parte dei servizi digitali privati destinati al grande pubblico.',
        ],
      },
      {
        heading: 'Chi è coinvolto?',
        paragraphs: [
          'Sono interessati in particolare: il commercio elettronico (qualsiasi sito che vende online), i servizi bancari, i trasporti (biglietteria, applicazioni), i libri digitali, i media audiovisivi e le comunicazioni elettroniche. Le microimprese di servizi (meno di 10 dipendenti e meno di 2 milioni di euro di fatturato) beneficiano di un’esenzione, che tuttavia non copre i prodotti che esse vendono.',
          'In Francia la direttiva è recepita dalla legge francese n. 2023-171 e dai relativi decreti attuativi. Le autorità di controllo (la DGCCRF, l’autorità francese per la tutela dei consumatori, l’ARCOM, l’autorità francese di regolazione della comunicazione audiovisiva e digitale, o la Banque de France a seconda del settore) possono irrogare sanzioni ed esigere la messa a norma.',
        ],
      },
      {
        heading: 'Che cosa occorre fare concretamente?',
        paragraphs: ['L’iter si articola in quattro fasi:'],
        list: [
          'Verificare: misurare lo scarto rispetto alle WCAG 2.1/2.2 livello AA (in Francia il RGAA 4.1.2).',
          'Correggere: trattare in via prioritaria i blocchi critici — immagini prive di alternativa, moduli senza etichetta, contrasti insufficienti, navigazione da tastiera impossibile.',
          'Dichiarare: pubblicare una dichiarazione di accessibilità che indichi il vostro livello di conformità e i mezzi di ricorso.',
          'Mantenere: ogni messa in produzione può reintrodurre regressioni; un audit ricorrente è indispensabile.',
        ],
      },
      {
        heading: 'Il rischio di non fare nulla',
        paragraphs: [
          'Al di là delle sanzioni amministrative, l’inaccessibilità priva il vostro sito del 15-20% degli utenti (disabilità visive, motorie, uditive, cognitive — permanenti o temporanee). È anche un fattore SEO: un sito ben strutturato, con alternative testuali e una semantica pulita, viene compreso meglio dai motori di ricerca.',
          'Un audit automatizzato Konforme richiede meno di un minuto e vi fornisce immediatamente l’elenco prioritizzato delle vostre non conformità. È il primo passo più redditizio del vostro percorso di messa a norma.',
        ],
      },
    ],
  },
  {
    slug: 'rgaa-vs-wcag-differences',
    title: 'RGAA e WCAG: quali differenze, quale adottare?',
    description:
      'Il RGAA applica le WCAG al contesto francese. Comprendere ciò che li distingue per scegliere il referenziale corretto ed evitare errori di conformità.',
    date: '2026-05-12',
    readingMinutes: 5,
    sections: [
      {
        paragraphs: [
          'WCAG, RGAA, EN 301 549… i referenziali di accessibilità formano una stratificazione che scoraggia più di un team. La buona notizia è che si incastrano in modo logico.',
        ],
      },
      {
        heading: 'WCAG: la base internazionale',
        paragraphs: [
          'Le Web Content Accessibility Guidelines, pubblicate dal W3C, definiscono criteri di successo classificati su tre livelli (A, AA, AAA). Il livello AA è l’obiettivo legale pressoché universale. La versione 2.2 (ottobre 2023) aggiunge 9 criteri, in particolare sulla visibilità del focus e sulle alternative ai gesti di trascinamento.',
        ],
      },
      {
        heading: 'RGAA: il metodo applicativo francese',
        paragraphs: [
          'Il RGAA 4.1.2 traduce le WCAG in 106 criteri e oltre 2.500 test operativi. Precisa come effettuare i test, aspetto che le WCAG lasciano talvolta all’interpretazione. È obbligatorio per il settore pubblico francese e costituisce il riferimento per gli audit svolti in Francia.',
          'In concreto: essere conformi al RGAA implica essere conformi alle WCAG 2.1 AA. Il contrario non è garantito, perché il RGAA impone test più precisi (per esempio sugli elementi obbligatori del documento HTML).',
        ],
      },
      {
        heading: 'Quale adottare?',
        paragraphs: [
          'Se il vostro mercato è francese, puntate al RGAA: include le WCAG ed è quello che utilizzeranno gli auditor francesi. Se il vostro prodotto è internazionale, le WCAG 2.2 AA sono sufficienti ed è il riferimento adottato dall’EAA tramite la norma EN 301 549.',
          'Konforme misura entrambi: ogni audit produce un punteggio RGAA 4.1.2 e un punteggio WCAG 2.2, con i riferimenti incrociati su ciascuna non conformità.',
        ],
      },
    ],
  },
  {
    slug: '10-erreurs-accessibilite-les-plus-courantes',
    title: 'I 10 errori di accessibilità più comuni (e le relative correzioni)',
    description:
      'Immagini senza alt, contrasti troppo deboli, link «clicca qui»… la top 10 delle non conformità rilevate sui siti francesi, con la correzione per ciascuna.',
    date: '2026-04-20',
    readingMinutes: 7,
    sections: [
      {
        paragraphs: [
          'Sulle migliaia di pagine analizzate, gli stessi errori si ripresentano incessantemente. Correggerli copre la maggior parte dei blocchi reali incontrati dagli utenti di tecnologie assistive.',
        ],
      },
      {
        heading: 'La top 10',
        paragraphs: [],
        list: [
          '1. Immagini prive di alternativa testuale — aggiungete alt="…" (oppure alt="" se decorative).',
          '2. Contrasti insufficienti — puntate a 4,5:1 per il testo normale e a 3:1 per il testo di grandi dimensioni.',
          '3. Campi di modulo senza etichetta — ogni input deve avere un label associato.',
          '4. Link vuoti o «clicca qui» — la dicitura deve descrivere la destinazione.',
          '5. Gerarchia dei titoli interrotta — un solo h1, senza salti di livello.',
          '6. Pulsanti-icona senza nome accessibile — aggiungete aria-label.',
          '7. Zoom bloccato su mobile — rimuovete user-scalable=no dal viewport.',
          '8. Iframe senza titolo — ogni iframe deve descrivere il proprio contenuto.',
          '9. Assenza di link di salto — consentite di raggiungere direttamente il contenuto.',
          '10. Focus da tastiera invisibile — non rimuovete mai outline senza un’alternativa visibile.',
        ],
      },
      {
        heading: 'Come rilevarli sul vostro sito?',
        paragraphs: [
          'Nove di questi dieci errori sono rilevabili automaticamente. Un audit Konforme li individua in un minuto, pagina per pagina, con il codice HTML interessato e la correzione da applicare. Avviate un audit gratuito e saprete immediatamente a che punto siete.',
        ],
      },
    ],
  },
]
