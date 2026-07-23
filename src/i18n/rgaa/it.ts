import type { CriterionL10n } from '@/i18n/rgaa-i18n'

/** Traductions italiennes des 106 critères RGAA 4.1.2. */
export const CRITERIA_IT: Record<string, CriterionL10n> = {

    '1.1': {
      title: 'Ogni immagine portatrice di informazione ha un’alternativa testuale',
      plain: 'Una persona cieca “legge” le immagini grazie al testo alternativo (attributo alt). Senza di esso, il lettore di schermo annuncia soltanto “immagine”, senza altri dettagli: l’informazione va persa.',
    },
    '1.2': {
      title: 'Ogni immagine decorativa viene ignorata dalle tecnologie assistive',
      plain: 'Un’immagine puramente decorativa (filetto, icona d’ambiente) deve avere un alt vuoto (alt="") per non appesantire la lettura vocale con annunci inutili.',
    },
    '1.3': {
      title: 'L’alternativa testuale di ogni immagine informativa è pertinente',
      plain: 'Un alt del tipo “IMG_0123.jpg” o “foto” non aggiunge nulla. L’alternativa deve trasmettere la stessa informazione dell’immagine: che cosa si capirebbe se la si dovesse descrivere al telefono?',
    },
    '1.4': {
      title: 'L’alternativa di un CAPTCHA o di un’immagine-test ne identifica la natura e la funzione',
      plain: 'Un CAPTCHA a immagine deve come minimo annunciare “CAPTCHA: test di sicurezza”, affinché l’utente capisca che cosa gli viene chiesto anche senza vedere l’immagine.',
    },
    '1.5': {
      title: 'Ogni CAPTCHA propone una soluzione di accesso alternativa',
      plain: 'Un CAPTCHA visivo deve offrire un’alternativa (versione audio, domanda logica…), altrimenti blocca del tutto le persone cieche o ipovedenti — spesso nel passaggio più critico (pagamento, contatto).',
    },
    '1.6': {
      title: 'Ogni immagine portatrice di informazione ha, se necessario, una descrizione dettagliata',
      plain: 'Un grafico, uno schema o un’infografica complessa non stanno in un alt breve: serve una descrizione lunga (testo adiacente, pagina dedicata) che restituisca tutti i dati.',
    },
    '1.7': {
      title: 'La descrizione dettagliata di ogni immagine è pertinente',
      plain: 'La descrizione lunga deve riprendere davvero l’informazione dell’immagine (i valori di un grafico, i passaggi di uno schema), non limitarsi a parafrasarla.',
    },
    '1.8': {
      title: 'Le immagini di testo sono sostituite da testo formattato quando è possibile',
      plain: 'Un testo inserito in un’immagine diventa sfocato con lo zoom, è illeggibile per i lettori di schermo e non si adatta alle impostazioni dell’utente. Lo stesso risultato visivo è quasi sempre ottenibile con i CSS.',
    },
    '1.9': {
      title: 'Ogni didascalia di immagine è correttamente collegata alla propria immagine',
      plain: 'Una didascalia deve essere associata a livello di codice alla sua immagine (figure/figcaption), altrimenti il lettore di schermo non mette in relazione le due.',
    },
    '2.1': {
      title: 'Ogni cornice (iframe) ha un titolo',
      plain: 'Senza attributo title, un lettore di schermo annuncia “cornice” senza dire che cosa contiene (mappa, video, pagamento…). L’utente deve indovinare se entrarvi o no.',
    },
    '2.2': {
      title: 'Il titolo di ogni cornice è pertinente',
      plain: 'Un title generico (“iframe”, “widget”) non serve a nulla. Deve descrivere il contenuto reale: “Mappa per raggiungere i nostri uffici”, “Video di presentazione”.',
    },
    '3.1': {
      title: 'L’informazione non è mai veicolata dal solo colore',
      plain: 'Circa l’8 % degli uomini è daltonico. “I campi in rosso sono obbligatori” non funziona per loro: servono anche un testo, un’icona o un motivo grafico.',
    },
    '3.2': {
      title: 'Il contrasto tra il testo e il suo sfondo è sufficiente (4,5:1)',
      plain: 'Un testo grigio chiaro su fondo bianco è illeggibile per le persone ipovedenti, per gli anziani o semplicemente in pieno sole sullo smartphone. Il rapporto di contrasto minimo è 4,5:1 (3:1 per i titoli di grandi dimensioni).',
    },
    '3.3': {
      title: 'I componenti dell’interfaccia e gli elementi grafici informativi sono sufficientemente contrastati (3:1)',
      plain: 'Bordi dei campi, icone funzionali, curve dei grafici: se sono troppo tenui (rapporto inferiore a 3:1), una parte degli utenti semplicemente non li distingue.',
    },
    '4.1': {
      title: 'Ogni media preregistrato ha, se necessario, una trascrizione testuale o un’audiodescrizione',
      plain: 'Una trascrizione testuale permette alle persone sorde di leggere un podcast e alle persone cieche di accedere al contenuto di un video. È anche un notevole vantaggio per il posizionamento sui motori di ricerca.',
    },
    '4.2': {
      title: 'La trascrizione o l’audiodescrizione di ogni media è pertinente',
      plain: 'La trascrizione deve essere completa e fedele: dialoghi, interlocutori, informazioni visive importanti — non un semplice riassunto.',
    },
    '4.3': {
      title: 'Ogni video preregistrato ha, se necessario, sottotitoli sincronizzati',
      plain: 'Senza sottotitoli, un video è inaccessibile alle persone sorde o con problemi di udito — e a chiunque guardi senza audio (l’80 % dei video su dispositivi mobili).',
    },
    '4.4': {
      title: 'I sottotitoli di ogni video sono pertinenti',
      plain: 'Sottotitoli generati automaticamente e pieni di errori non bastano: devono essere sincronizzati, fedeli e identificare chi parla e i suoni significativi.',
    },
    '4.5': {
      title: 'Ogni video preregistrato ha, se necessario, un’audiodescrizione sincronizzata',
      plain: 'L’audiodescrizione racconta ciò che accade sullo schermo (azioni, testi visualizzati) durante le pause dei dialoghi, per le persone cieche o ipovedenti.',
    },
    '4.6': {
      title: 'L’audiodescrizione di ogni video è pertinente',
      plain: 'L’audiodescrizione deve coprire tutti gli elementi visivi necessari alla comprensione, al momento giusto, senza sovrapporsi ai dialoghi.',
    },
    '4.7': {
      title: 'Ogni media temporale è chiaramente identificabile',
      plain: 'L’utente deve sapere che è presente un lettore video o audio e che cosa contiene (titolo adiacente, etichetta) prima di avviarlo.',
    },
    '4.8': {
      title: 'Ogni media non temporale (mappa, animazione interattiva…) ha, se necessario, un’alternativa',
      plain: 'Una mappa interattiva o un’animazione complessa devono avere un equivalente accessibile: elenco di indirizzi, tabella di dati, testo descrittivo.',
    },
    '4.9': {
      title: 'L’alternativa di ogni media non temporale è pertinente',
      plain: 'L’alternativa deve dare accesso alle stesse informazioni e alle stesse funzioni del media originale, non a una versione impoverita.',
    },
    '4.10': {
      title: 'Ogni suono avviato automaticamente è controllabile',
      plain: 'Un suono che parte da solo copre la voce sintetica dei lettori di schermo: l’utente cieco non sente più nulla. Deve essere possibile fermarlo immediatamente.',
    },
    '4.11': {
      title: 'La consultazione di ogni media temporale è controllabile da tastiera e da puntatore',
      plain: 'Riproduzione, pausa, volume, sottotitoli: tutti i comandi del lettore devono funzionare con la sola tastiera, per le persone che non possono usare il mouse.',
    },
    '4.12': {
      title: 'La consultazione di ogni media non temporale è controllabile da tastiera e da puntatore',
      plain: 'Una mappa interattiva deve poter essere esplorata da tastiera (zoom, spostamento, selezione dei punti di interesse), non soltanto con il mouse o al tocco.',
    },
    '4.13': {
      title: 'Ogni media è compatibile con le tecnologie assistive',
      plain: 'Il lettore video/audio deve esporre i propri comandi ai lettori di schermo (nomi, ruoli, stati). I lettori “fatti in casa” falliscono spesso su questo punto.',
    },
    '5.1': {
      title: 'Ogni tabella di dati complessa ha una sintesi',
      plain: 'Una tabella a doppia entrata o con più livelli di intestazione deve essere preceduta da una sintesi che ne spieghi la struttura, affinché chi usa un lettore di schermo sappia come percorrerla.',
    },
    '5.2': {
      title: 'La sintesi di ogni tabella complessa è pertinente',
      plain: 'La sintesi deve descrivere davvero l’organizzazione della tabella (che cosa rappresentano righe e colonne), non ripeterne il titolo.',
    },
    '5.3': {
      title: 'Il contenuto di ogni tabella di impaginazione resta comprensibile una volta linearizzato',
      plain: 'Se una tabella serve solo all’impaginazione, il suo contenuto letto riga per riga (come fa un lettore di schermo) deve mantenere un ordine logico.',
    },
    '5.4': {
      title: 'Il titolo di ogni tabella di dati è correttamente associato (caption)',
      plain: 'Il titolo di una tabella deve essere marcato con <caption>, non scritto come semplice paragrafo sopra di essa: è ciò che consente al lettore di schermo di annunciarlo insieme alla tabella.',
    },
    '5.5': {
      title: 'Il titolo di ogni tabella di dati è pertinente',
      plain: 'Il caption deve permettere di capire di che cosa tratta la tabella senza leggerla per intero: “Tariffe 2026 per piano” invece di “Tabella 3”.',
    },
    '5.6': {
      title: 'Ogni intestazione di riga e di colonna è correttamente dichiarata (th)',
      plain: 'Senza celle di intestazione marcate <th>, un lettore di schermo legge i valori senza contesto: “42” invece di “Prezzo mensile: 42”. La tabella diventa una sequenza di cifre priva di senso.',
    },
    '5.7': {
      title: 'Ogni cella è associata alle proprie intestazioni (scope, headers)',
      plain: 'Nelle tabelle complesse ogni cella deve essere collegata alle proprie intestazioni tramite scope o headers/id, affinché la lettura vocale annunci il contesto corretto.',
    },
    '5.8': {
      title: 'Le tabelle di impaginazione non usano elementi propri delle tabelle di dati',
      plain: 'Una tabella di impaginazione non deve contenere né <th>, né <caption>, né scope: questi marcatori farebbero credere al lettore di schermo di trovarsi davanti a dati strutturati.',
    },
    '6.1': {
      title: 'Ogni collegamento è esplicito',
      plain: 'Chi usa un lettore di schermo naviga spesso di collegamento in collegamento: una serie di “clicca qui” o “scopri di più” tutti uguali non permette di sapere dove porta ciascuno.',
    },
    '6.2': {
      title: 'Ogni collegamento ha un’etichetta',
      plain: 'Un collegamento vuoto (icona senza testo, immagine senza alt) viene annunciato come “collegamento”, senza alcuna destinazione. L’utente non può sapere se cliccare.',
    },
    '7.1': {
      title: 'Ogni script è, se necessario, compatibile con le tecnologie assistive',
      plain: 'Menu a tendina, schede, finestre modali, caroselli: ogni componente interattivo deve esporre nome, ruolo e stato (aperto/chiuso, selezionato…) ai lettori di schermo, tramite gli attributi ARIA appropriati.',
    },
    '7.2': {
      title: 'L’alternativa di ogni script è pertinente',
      plain: 'Quando una funzionalità JavaScript propone un’alternativa accessibile, questa deve dare accesso alle stesse informazioni e alle stesse azioni.',
    },
    '7.3': {
      title: 'Ogni script è controllabile da tastiera e con qualsiasi dispositivo di puntamento',
      plain: 'Tutto ciò che si fa con il mouse deve poter essere fatto da tastiera: aprire un menu, chiudere una finestra modale, far scorrere un carosello. Un div cliccabile senza gestione della tastiera esclude chi usa la sola tastiera.',
    },
    '7.4': {
      title: 'L’utente è avvisato dei cambiamenti di contesto o ne mantiene il controllo',
      plain: 'Una pagina che si ricarica o reindirizza da sola (alla scelta in un elenco, alla digitazione in un campo) disorienta completamente chi usa un lettore di schermo.',
    },
    '7.5': {
      title: 'I messaggi di stato sono correttamente restituiti dalle tecnologie assistive',
      plain: '“Prodotto aggiunto al carrello”, “3 risultati trovati”, “Modulo inviato”: questi messaggi devono essere annunciati vocalmente (role="status", aria-live) senza spostare il focus.',
    },
    '8.1': {
      title: 'Ogni pagina ha un tipo di documento (doctype) valido',
      plain: 'Senza doctype, i browser e le tecnologie assistive interpretano la pagina in modalità degradata, con comportamenti imprevedibili.',
    },
    '8.2': {
      title: 'Il codice sorgente di ogni pagina è valido',
      plain: 'Tag chiusi male, identificatori duplicati, annidamenti vietati: un codice non valido manda fuori strada i lettori di schermo, che leggono il contenuto due volte o non lo leggono affatto.',
    },
    '8.3': {
      title: 'Ogni pagina ha una lingua predefinita',
      plain: 'L’attributo lang indica al lettore di schermo quale voce utilizzare. Senza di esso, una pagina in italiano può essere letta con pronuncia inglese, risultando incomprensibile.',
    },
    '8.4': {
      title: 'Il codice di lingua di ogni pagina è pertinente',
      plain: 'Un lang="en" su una pagina in italiano fa leggere tutto il contenuto con accento inglese. Il codice deve corrispondere alla lingua reale della pagina.',
    },
    '8.5': {
      title: 'Ogni pagina ha un titolo di pagina (title)',
      plain: 'Il <title> è la prima cosa annunciata da un lettore di schermo ed è ciò che compare nelle schede del browser. Senza di esso è impossibile orientarsi tra più pagine.',
    },
    '8.6': {
      title: 'Il titolo di ogni pagina è pertinente',
      plain: 'Ogni pagina deve avere un titolo unico e descrittivo: “Carrello — Il mio negozio” e non “Home” dappertutto. È il principale punto di riferimento per muoversi tra le schede.',
    },
    '8.7': {
      title: 'Ogni cambio di lingua è indicato nel codice',
      plain: 'Una parola o un passaggio in un’altra lingua (una citazione, “newsletter”…) deve avere un attributo lang per essere pronunciato correttamente dalla sintesi vocale.',
    },
    '8.8': {
      title: 'Il codice di lingua di ogni cambio di lingua è valido e pertinente',
      plain: 'I codici di lingua utilizzati (it, en, de…) devono essere codici ISO validi e corrispondere alla lingua reale del passaggio.',
    },
    '8.9': {
      title: 'I marcatori non sono usati unicamente a scopo di presentazione',
      plain: 'Usare un <h2> perché “sta bene” o <blockquote> per rientrare il testo inganna i lettori di schermo: ogni marcatore ha un significato, non solo uno stile.',
    },
    '8.10': {
      title: 'I cambiamenti del senso di lettura sono segnalati',
      plain: 'Un passaggio in arabo o in ebraico (lettura da destra a sinistra) deve essere segnalato con l’attributo dir="rtl" per essere visualizzato e letto correttamente.',
    },
    '9.1': {
      title: 'L’informazione è strutturata con titoli (h1-h6) appropriati',
      plain: 'Chi usa un lettore di schermo naviga di titolo in titolo per scorrere una pagina. Una gerarchia incoerente (h1 e poi h4, titoli vuoti) rende la pagina illeggibile.',
    },
    '9.2': {
      title: 'La struttura del documento è coerente (header, main, footer, nav)',
      plain: 'Le aree principali della pagina (intestazione, contenuto, piè di pagina, navigazione) devono essere marcate con gli elementi HTML previsti, per consentire una navigazione rapida per regioni.',
    },
    '9.3': {
      title: 'Ogni elenco è correttamente strutturato (ul, ol, dl)',
      plain: 'Un elenco realmente marcato annuncia “elenco di 5 elementi” al lettore di schermo, che può saltarlo o percorrerlo. Dei trattini dentro <div> non forniscono nessuna di queste informazioni.',
    },
    '9.4': {
      title: 'Ogni citazione è correttamente indicata (blockquote, q)',
      plain: 'Le citazioni devono essere marcate con <blockquote> o <q>, affinché l’utente sappia che quel testo è una citazione e non un’affermazione del sito.',
    },
    '10.1': {
      title: 'La presentazione è controllata da fogli di stile (nessun attributo di presentazione HTML)',
      plain: 'La formattazione deve passare dai CSS, non da tag o attributi obsoleti (<font>, align, bgcolor…): è ciò che permette all’utente di adattare la visualizzazione alle proprie esigenze.',
    },
    '10.2': {
      title: 'Il contenuto visibile resta presente quando i fogli di stile sono disattivati',
      plain: 'Nessuna informazione deve essere veicolata unicamente dai CSS (contenuto in ::before/::after, immagine di sfondo informativa): sparirebbe per le tecnologie assistive.',
    },
    '10.3': {
      title: 'L’informazione resta comprensibile senza i fogli di stile',
      plain: 'Senza CSS il contenuto deve comparire in un ordine logico. Se la pagina diventa incoerente, chi usa un lettore di schermo subisce quel disordine in permanenza.',
    },
    '10.4': {
      title: 'Il testo resta leggibile con uno zoom al 200 %',
      plain: 'Molte persone ipovedenti ingrandiscono al 200 %. Il testo deve ingrandirsi senza essere tagliato, sovrapposto o nascosto — e lo zoom non deve mai essere bloccato (user-scalable=no).',
    },
    '10.5': {
      title: 'I colori di sfondo e dei caratteri definiti in CSS sono usati correttamente',
      plain: 'Se si definisce un colore del testo occorre definire anche il colore di sfondo (e viceversa), altrimenti le impostazioni personali dell’utente possono rendere il testo invisibile (bianco su bianco).',
    },
    '10.6': {
      title: 'Ogni collegamento è distinguibile visivamente dal testo circostante',
      plain: 'Un collegamento all’interno di un paragrafo deve riconoscersi per qualcosa di più del solo colore (sottolineatura, contrasto 3:1 più un indicatore): indispensabile per le persone daltoniche.',
    },
    '10.7': {
      title: 'La presa di focus è visibile per ogni elemento interattivo',
      plain: 'Quando si naviga da tastiera (Tab) si deve sempre vedere dove ci si trova. Eliminare il contorno del focus (outline: none) senza sostituirlo rende impossibile la navigazione da tastiera.',
    },
    '10.8': {
      title: 'I contenuti nascosti sono destinati a essere ignorati dalle tecnologie assistive',
      plain: 'Un contenuto nascosto visivamente (menu richiuso, finestra modale chiusa) deve essere nascosto anche ai lettori di schermo — e, viceversa, non deve esserci contenuto raggiungibile dal focus in un’area aria-hidden.',
    },
    '10.9': {
      title: 'L’informazione non è veicolata solo dalla forma, dalla dimensione o dalla posizione',
      plain: '“Clicchi sul pulsante rotondo a destra” non ha alcun senso per una persona cieca o su una visualizzazione ricomposta. L’istruzione deve funzionare senza riferimenti visivi.',
    },
    '10.10': {
      title: 'L’informazione veicolata da forma, dimensione o posizione è disponibile anche in altro modo',
      plain: 'Quando l’impaginazione veicola un significato (elemento messo in evidenza, raggruppamenti visivi), quel significato deve essere espresso anche nel contenuto o nella struttura.',
    },
    '10.11': {
      title: 'Il contenuto si presenta senza scorrimento orizzontale a 320 px di larghezza (reflow)',
      plain: 'Con uno zoom elevato o su schermi piccoli il contenuto deve riorganizzarsi su una sola colonna. Dover scorrere orizzontalmente a ogni riga rende la lettura sfibrante.',
    },
    '10.12': {
      title: 'Le spaziature del testo possono essere aumentate senza perdita di contenuto',
      plain: 'Le persone dislessiche aumentano spesso l’interlinea e la spaziatura tra le lettere. La pagina deve sopportarlo senza che il testo venga tagliato o si sovrapponga.',
    },
    '10.13': {
      title: 'I contenuti che compaiono al passaggio del mouse o al focus sono controllabili',
      plain: 'Un suggerimento a comparsa o un sottomenu che appare al passaggio del mouse deve poter essere chiuso (tasto Esc), essere sorvolabile senza sparire e restare visibile per tutto il tempo necessario.',
    },
    '10.14': {
      title: 'I contenuti aggiuntivi mostrati tramite CSS sono raggiungibili da tastiera',
      plain: 'Un menu che si apre solo al passaggio del mouse (:hover) è inaccessibile da tastiera. L’apertura deve funzionare anche alla presa di focus.',
    },
    '11.1': {
      title: 'Ogni campo del modulo ha un’etichetta',
      plain: 'Senza un’etichetta (label) collegata al campo, un lettore di schermo annuncia “casella di modifica” senza dire che cosa inserire. Un placeholder che sparisce durante la digitazione non basta.',
    },
    '11.2': {
      title: 'Ogni etichetta di campo è pertinente',
      plain: 'L’etichetta deve dire chiaramente che cosa ci si aspetta, formato compreso: “Data di nascita (GG/MM/AAAA)” invece di “Data”.',
    },
    '11.3': {
      title: 'Le etichette con la stessa funzione sono coerenti in tutto il sito',
      plain: 'Lo stesso campo deve avere lo stesso nome ovunque: se “E-mail” diventa “Posta elettronica” e poi “Indirizzo elettronico”, l’utente perde i propri riferimenti.',
    },
    '11.4': {
      title: 'Ogni etichetta è posta accanto al proprio campo',
      plain: 'L’etichetta deve essere visivamente vicina al campo. Per chi usa un ingranditore di schermo, un’etichetta lontana finisce fuori dal campo visivo.',
    },
    '11.5': {
      title: 'I campi della stessa natura sono raggruppati, se necessario',
      plain: 'I blocchi di campi collegati (indirizzo di spedizione e indirizzo di fatturazione) devono essere raggruppati (fieldset), così da capire a quale blocco appartiene ciascun campo.',
    },
    '11.6': {
      title: 'Ogni raggruppamento di campi ha una legenda',
      plain: 'Un gruppo di pulsanti di opzione o di caselle di controllo deve avere una legenda (legend): senza di essa si sente “Sì / No” senza sapere a quale domanda si riferisce.',
    },
    '11.7': {
      title: 'Ogni legenda di raggruppamento è pertinente',
      plain: 'La legenda deve enunciare la domanda o il tema del gruppo di campi, in modo comprensibile anche fuori dal contesto visivo.',
    },
    '11.8': {
      title: 'Gli elementi della stessa natura di un elenco di scelta sono raggruppati in modo pertinente',
      plain: 'Negli elenchi a discesa lunghi le opzioni devono essere raggruppate per categoria (optgroup) per restare percorribili.',
    },
    '11.9': {
      title: 'L’etichetta di ogni pulsante è pertinente',
      plain: 'Un pulsante deve dire che cosa fa: “Invia la mia richiesta” e non “OK”. Un pulsante-icona senza testo accessibile viene annunciato come “pulsante” — inutilizzabile senza la vista.',
    },
    '11.10': {
      title: 'Il controllo dei dati inseriti è usato in modo pertinente',
      plain: 'I campi obbligatori devono essere segnalati prima dell’invio e gli errori indicati con chiarezza: quale campo, quale problema, come correggerlo.',
    },
    '11.11': {
      title: 'Il controllo dei dati inseriti è accompagnato da suggerimenti di correzione',
      plain: 'Quando un formato è errato, il messaggio deve proporre la soluzione: “La data deve essere nel formato GG/MM/AAAA, ad esempio 01/06/2026” invece di “Campo non valido”.',
    },
    '11.12': {
      title: 'Gli inserimenti con conseguenze (finanziarie, giuridiche…) sono verificabili, modificabili o confermabili',
      plain: 'Prima di un ordine, di una disdetta o di un pagamento, l’utente deve poter verificare e correggere i dati inseriti, oppure disporre di un modo per annullare.',
    },
    '11.13': {
      title: 'La finalità dei campi relativi ai dati personali è identificabile (autocomplete)',
      plain: 'Gli attributi autocomplete (name, email, tel…) consentono il riempimento automatico: un aiuto decisivo per le persone con disturbi cognitivi o motori.',
    },
    '12.1': {
      title: 'Il sito dispone di almeno due sistemi di navigazione diversi',
      plain: 'Ognuno naviga a modo proprio: servono almeno due strumenti tra menu, mappa del sito e motore di ricerca per raggiungere ogni pagina.',
    },
    '12.2': {
      title: 'Menu e barre di navigazione si trovano sempre nello stesso posto',
      plain: 'La navigazione deve comparire nello stesso punto e nello stesso ordine in tutte le pagine: gli utenti abituali (e i lettori di schermo) contano su questa stabilità.',
    },
    '12.3': {
      title: 'La pagina “mappa del sito” è pertinente',
      plain: 'La mappa del sito deve riflettere la struttura reale e rimandare a pagine esistenti: è una porta d’accesso alternativa essenziale.',
    },
    '12.4': {
      title: 'La mappa del sito è raggiungibile allo stesso modo da tutte le pagine',
      plain: 'Il collegamento alla mappa del sito deve trovarsi nello stesso punto in ogni pagina (di solito nel piè di pagina).',
    },
    '12.5': {
      title: 'Il motore di ricerca è raggiungibile allo stesso modo da tutte le pagine',
      plain: 'Se esiste una ricerca interna, deve essere disponibile nello stesso punto in tutto il sito.',
    },
    '12.6': {
      title: 'Le aree di raggruppamento dei contenuti possono essere raggiunte o evitate (landmark)',
      plain: 'Le grandi aree (navigazione, contenuto principale, piè di pagina) devono essere marcate come regioni, così chi usa un lettore di schermo salta direttamente a ciò che gli interessa.',
    },
    '12.7': {
      title: 'È presente un collegamento di salto verso il contenuto principale',
      plain: 'Senza un collegamento “Vai al contenuto”, chi naviga da tastiera deve riattraversare tutto il menu (a volte 40 collegamenti) in ogni pagina prima di arrivare al contenuto.',
    },
    '12.8': {
      title: 'L’ordine di tabulazione è coerente',
      plain: 'Il tasto Tab deve percorrere la pagina in un ordine logico. I tabindex positivi o gli inserimenti dinamici gestiti male fanno saltare il focus in ogni direzione.',
    },
    '12.9': {
      title: 'La navigazione non contiene trappole per la tastiera',
      plain: 'Un componente da cui non si riesce più a uscire con la tastiera (lettore video, widget, finestra modale) blocca definitivamente l’utente: è uno dei difetti più gravi.',
    },
    '12.10': {
      title: 'Le scorciatoie da tastiera a tasto singolo sono controllabili',
      plain: 'Una scorciatoia legata a una sola lettera può essere attivata per errore dalla dettatura vocale. Deve poter essere disattivata o riconfigurata.',
    },
    '12.11': {
      title: 'I contenuti aggiuntivi (al passaggio del mouse, al focus o all’attivazione) sono raggiungibili da tastiera',
      plain: 'Suggerimenti a comparsa, sottomenu e popover devono poter essere aperti e percorsi da tastiera, non soltanto con il mouse.',
    },
    '13.1': {
      title: 'L’utente controlla ogni limite di tempo che modifica il contenuto',
      plain: 'Aggiornamento automatico, disconnessione rapida, reindirizzamento a tempo: l’utente deve poter interrompere, prolungare o eliminare qualsiasi limite di tempo.',
    },
    '13.2': {
      title: 'Nessuna nuova finestra si apre senza un’azione dell’utente',
      plain: 'Una finestra o una scheda che si apre da sola disorienta chi usa un lettore di schermo, che perde il contesto di navigazione senza capirne il motivo.',
    },
    '13.3': {
      title: 'Ogni documento scaricabile (PDF…) ha, se necessario, una versione accessibile',
      plain: 'Un PDF scansionato o privo di marcatura non è leggibile da un lettore di schermo. Serve un PDF con marcatura oppure una versione alternativa (HTML, documento accessibile).',
    },
    '13.4': {
      title: 'La versione accessibile di ogni documento offre le stesse informazioni',
      plain: 'La versione accessibile di un documento deve essere completa e aggiornata quanto l’originale, non un riassunto.',
    },
    '13.5': {
      title: 'Ogni contenuto criptico (ASCII art, emoticon, sintassi criptica) ha un’alternativa',
      plain: 'Uno smiley composto da caratteri “:-)” o un disegno in ASCII viene letto carattere per carattere dalla sintesi vocale: serve un’alternativa testuale chiara.',
    },
    '13.6': {
      title: 'L’alternativa di ogni contenuto criptico è pertinente',
      plain: 'L’alternativa deve esprimere il significato reale del contenuto (“sorriso”, “logo in ASCII”…), in modo comprensibile.',
    },
    '13.7': {
      title: 'I lampeggiamenti e i bruschi cambiamenti di luminosità sono usati correttamente',
      plain: 'Più di 3 lampeggiamenti al secondo possono scatenare crisi di epilessia fotosensibile. È un criterio di sicurezza per le persone interessate.',
    },
    '13.8': {
      title: 'Ogni contenuto in movimento o lampeggiante è controllabile',
      plain: 'Caroselli automatici, testi scorrevoli, animazioni: l’utente deve poterli mettere in pausa. Un movimento continuo impedisce ad alcune persone di leggere il resto della pagina.',
    },
    '13.9': {
      title: 'Il contenuto è consultabile qualunque sia l’orientamento dello schermo',
      plain: 'Il sito deve funzionare sia in verticale sia in orizzontale: alcune persone hanno il dispositivo fissato alla carrozzina in un orientamento preciso.',
    },
    '13.10': {
      title: 'I gesti complessi hanno un’alternativa con un gesto semplice',
      plain: 'Pizzicare per ingrandire, scorrere con due dita: ogni funzionalità deve funzionare anche con un semplice tocco, per le persone con mobilità ridotta.',
    },
    '13.11': {
      title: 'Le azioni effettuate con il puntatore possono essere annullate',
      plain: 'Un’azione non deve scattare già alla pressione (pointer-down): si deve poter scivolare fuori dal pulsante per annullare un clic involontario.',
    },
    '13.12': {
      title: 'Le funzionalità attivate dal movimento del dispositivo hanno un’alternativa',
      plain: 'Scuotere il telefono per annullare, inclinarlo per navigare: serve un’alternativa con un pulsante classico e deve essere possibile disattivare il rilevamento del movimento.',
    },
}
