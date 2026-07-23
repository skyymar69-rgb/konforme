import type { CriterionL10n } from '@/i18n/rgaa-i18n'

/** Traductions allemandes des 106 critères RGAA 4.1.2. */
export const CRITERIA_DE: Record<string, CriterionL10n> = {

    '1.1': {
      title: 'Jedes informationstragende Bild hat eine Textalternative',
      plain: 'Eine blinde Person „liest“ Bilder über den Alternativtext (alt-Attribut). Fehlt er, meldet der Screenreader nur „Grafik“ ohne weitere Angabe: Die Information geht verloren.',
    },
    '1.2': {
      title: 'Jedes dekorative Bild wird von assistiven Technologien ignoriert',
      plain: 'Ein rein dekoratives Bild (Trennlinie, Stimmungs-Icon) muss ein leeres alt tragen (alt=""), damit die Sprachausgabe nicht mit überflüssigen Ansagen überfrachtet wird.',
    },
    '1.3': {
      title: 'Die Textalternative jedes informationstragenden Bildes ist aussagekräftig',
      plain: 'Ein alt wie „IMG_0123.jpg“ oder „Foto“ bringt nichts. Die Alternative muss dieselbe Information vermitteln wie das Bild: Was würde man verstehen, wenn man es am Telefon beschreiben müsste?',
    },
    '1.4': {
      title: 'Die Alternative eines CAPTCHA oder Testbildes benennt dessen Art und Funktion',
      plain: 'Ein Bild-CAPTCHA muss mindestens „CAPTCHA: Sicherheitstest“ ansagen, damit Nutzende verstehen, was von ihnen verlangt wird – auch ohne das Bild zu sehen.',
    },
    '1.5': {
      title: 'Jedes CAPTCHA bietet eine alternative Zugangsmöglichkeit',
      plain: 'Ein visuelles CAPTCHA muss eine Alternative anbieten (Audioversion, Logikfrage …), sonst blockiert es blinde oder sehbehinderte Menschen vollständig – oft im kritischsten Schritt (Bezahlung, Kontakt).',
    },
    '1.6': {
      title: 'Jedes informationstragende Bild hat, sofern nötig, eine ausführliche Beschreibung',
      plain: 'Ein Diagramm, ein Schaubild oder eine komplexe Infografik passt nicht in ein kurzes alt: Es braucht eine Langbeschreibung (benachbarter Text, eigene Seite), die alle Daten wiedergibt.',
    },
    '1.7': {
      title: 'Die ausführliche Beschreibung jedes Bildes ist aussagekräftig',
      plain: 'Die Langbeschreibung muss die Information des Bildes wirklich wiedergeben (Zahlen eines Diagramms, Schritte eines Schaubilds) und darf sie nicht nur umschreiben.',
    },
    '1.8': {
      title: 'Schriftgrafiken werden nach Möglichkeit durch formatierten Text ersetzt',
      plain: 'In ein Bild eingebetteter Text wird beim Zoomen unscharf, ist für Screenreader unlesbar und passt sich den Einstellungen der Nutzenden nicht an. Dieselbe Darstellung ist fast immer per CSS möglich.',
    },
    '1.9': {
      title: 'Jede Bildunterschrift ist korrekt mit ihrem Bild verknüpft',
      plain: 'Eine Bildunterschrift muss programmatisch mit ihrem Bild verbunden sein (figure/figcaption), sonst stellt der Screenreader den Zusammenhang nicht her.',
    },
    '2.1': {
      title: 'Jeder Rahmen (iframe) hat einen Titel',
      plain: 'Ohne title-Attribut meldet ein Screenreader nur „Rahmen“, ohne den Inhalt zu nennen (Karte, Video, Bezahlung …). Nutzende müssen raten, ob sie hineinwechseln sollen.',
    },
    '2.2': {
      title: 'Der Titel jedes Rahmens ist aussagekräftig',
      plain: 'Ein generischer title („iframe“, „Widget“) hilft nicht weiter. Er muss den tatsächlichen Inhalt beschreiben: „Anfahrtskarte zu unseren Räumen“, „Vorstellungsvideo“.',
    },
    '3.1': {
      title: 'Information wird nie allein durch Farbe vermittelt',
      plain: 'Etwa 8 % der Männer sind farbenblind. „Rot markierte Felder sind Pflichtfelder“ funktioniert für sie nicht: Es braucht zusätzlich einen Text, ein Symbol oder ein Muster.',
    },
    '3.2': {
      title: 'Der Kontrast zwischen Text und Hintergrund ist ausreichend (4,5:1)',
      plain: 'Hellgrauer Text auf weißem Grund ist für sehbehinderte Menschen, Senioren oder einfach bei Sonnenlicht auf dem Handy unlesbar. Das Mindest-Kontrastverhältnis beträgt 4,5:1 (3:1 für große Überschriften).',
    },
    '3.3': {
      title: 'Bedienelemente und informationstragende Grafiken sind ausreichend kontrastreich (3:1)',
      plain: 'Feldrahmen, funktionale Symbole, Diagrammkurven: Sind sie zu blass (Kontrastverhältnis unter 3:1), kann ein Teil der Nutzenden sie schlicht nicht erkennen.',
    },
    '4.1': {
      title: 'Jedes aufgezeichnete Medium hat, sofern nötig, ein Transkript oder eine Audiodeskription',
      plain: 'Ein Texttranskript ermöglicht gehörlosen Menschen das Lesen eines Podcasts und blinden Menschen den Zugang zum Inhalt eines Videos. Es ist zudem ein großer SEO-Vorteil.',
    },
    '4.2': {
      title: 'Das Transkript oder die Audiodeskription jedes Mediums ist aussagekräftig',
      plain: 'Das Transkript muss vollständig und originalgetreu sein: Dialoge, sprechende Personen, wichtige visuelle Informationen – keine bloße Zusammenfassung.',
    },
    '4.3': {
      title: 'Jedes aufgezeichnete Video hat, sofern nötig, synchronisierte Untertitel',
      plain: 'Ohne Untertitel ist ein Video für gehörlose oder schwerhörige Menschen unzugänglich – und für alle, die ohne Ton schauen (80 % der Videos auf Mobilgeräten).',
    },
    '4.4': {
      title: 'Die Untertitel jedes Videos sind aussagekräftig',
      plain: 'Automatisch erzeugte, fehlerhafte Untertitel genügen nicht: Sie müssen synchron und korrekt sein und Sprechende sowie bedeutsame Geräusche kennzeichnen.',
    },
    '4.5': {
      title: 'Jedes aufgezeichnete Video hat, sofern nötig, eine synchronisierte Audiodeskription',
      plain: 'Die Audiodeskription schildert in den Dialogpausen, was auf dem Bildschirm geschieht (Handlungen, eingeblendete Texte) – für blinde oder sehbehinderte Menschen.',
    },
    '4.6': {
      title: 'Die Audiodeskription jedes Videos ist aussagekräftig',
      plain: 'Die Audiodeskription muss alle für das Verständnis nötigen visuellen Elemente abdecken, zum richtigen Zeitpunkt und ohne die Dialoge zu überlagern.',
    },
    '4.7': {
      title: 'Jedes zeitbasierte Medium ist klar erkennbar',
      plain: 'Nutzende müssen wissen, dass ein Video- oder Audioplayer vorhanden ist und was er enthält (benachbarte Überschrift, Beschriftung), bevor sie ihn starten.',
    },
    '4.8': {
      title: 'Jedes nicht zeitbasierte Medium (Karte, interaktive Animation …) hat, sofern nötig, eine Alternative',
      plain: 'Eine interaktive Karte oder eine komplexe Animation braucht ein zugängliches Äquivalent: Adressliste, Datentabelle, beschreibender Text.',
    },
    '4.9': {
      title: 'Die Alternative jedes nicht zeitbasierten Mediums ist aussagekräftig',
      plain: 'Die Alternative muss Zugang zu denselben Informationen und Funktionen bieten wie das ursprüngliche Medium, nicht zu einer abgespeckten Fassung.',
    },
    '4.10': {
      title: 'Jeder automatisch startende Ton ist kontrollierbar',
      plain: 'Ein Ton, der von selbst startet, übertönt die Sprachausgabe von Screenreadern: Blinde Nutzende hören nichts mehr. Er muss sich sofort stoppen lassen.',
    },
    '4.11': {
      title: 'Jedes zeitbasierte Medium ist per Tastatur und Zeigegerät bedienbar',
      plain: 'Wiedergabe, Pause, Lautstärke, Untertitel: Alle Bedienelemente des Players müssen allein mit der Tastatur funktionieren – für Menschen, die keine Maus nutzen können.',
    },
    '4.12': {
      title: 'Jedes nicht zeitbasierte Medium ist per Tastatur und Zeigegerät bedienbar',
      plain: 'Eine interaktive Karte muss sich mit der Tastatur erkunden lassen (Zoom, Verschieben, Auswahl von Punkten), nicht nur mit Maus oder Touch.',
    },
    '4.13': {
      title: 'Jedes Medium ist mit assistiven Technologien kompatibel',
      plain: 'Der Video- bzw. Audioplayer muss seine Bedienelemente an Screenreader weitergeben (Name, Rolle, Zustand). Exotische „selbstgebaute“ Player scheitern hier häufig.',
    },
    '5.1': {
      title: 'Jede komplexe Datentabelle hat eine Zusammenfassung',
      plain: 'Eine Kreuztabelle oder eine Tabelle mit mehreren Kopfzeilenebenen braucht eine vorangestellte Zusammenfassung ihres Aufbaus, damit Screenreader-Nutzende wissen, wie sie sie durchgehen.',
    },
    '5.2': {
      title: 'Die Zusammenfassung jeder komplexen Tabelle ist aussagekräftig',
      plain: 'Die Zusammenfassung muss den Aufbau der Tabelle tatsächlich beschreiben (wofür Zeilen und Spalten stehen) und nicht bloß ihren Titel wiederholen.',
    },
    '5.3': {
      title: 'Der Inhalt jeder Layouttabelle bleibt linearisiert verständlich',
      plain: 'Dient eine Tabelle nur dem Layout, muss ihr Inhalt auch Zeile für Zeile gelesen (so wie es ein Screenreader tut) in einer logischen Reihenfolge bleiben.',
    },
    '5.4': {
      title: 'Der Titel jeder Datentabelle ist korrekt zugeordnet (caption)',
      plain: 'Der Titel einer Tabelle muss als <caption> ausgezeichnet sein, nicht als einfacher Absatz darüber: Nur so kann der Screenreader ihn gemeinsam mit der Tabelle ansagen.',
    },
    '5.5': {
      title: 'Der Titel jeder Datentabelle ist aussagekräftig',
      plain: 'Die caption muss verständlich machen, worum es in der Tabelle geht, ohne sie ganz zu lesen: „Preise 2026 je Tarif“ statt „Tabelle 3“.',
    },
    '5.6': {
      title: 'Jede Zeilen- und Spaltenüberschrift ist korrekt ausgezeichnet (th)',
      plain: 'Ohne als <th> ausgezeichnete Kopfzellen liest ein Screenreader die Werte ohne Zusammenhang vor: „42“ statt „Monatspreis: 42“. Die Tabelle wird zu einer sinnlosen Zahlenreihe.',
    },
    '5.7': {
      title: 'Jede Zelle ist ihren Überschriften zugeordnet (scope, headers)',
      plain: 'In komplexen Tabellen muss jede Zelle über scope oder headers/id mit ihren Überschriften verknüpft sein, damit die Sprachausgabe den richtigen Zusammenhang ansagt.',
    },
    '5.8': {
      title: 'Layouttabellen verwenden keine Elemente, die Datentabellen vorbehalten sind',
      plain: 'Eine Layouttabelle darf weder <th> noch <caption> noch scope enthalten: Diese Auszeichnungen würden dem Screenreader strukturierte Daten vortäuschen.',
    },
    '6.1': {
      title: 'Jeder Link ist aussagekräftig',
      plain: 'Screenreader-Nutzende springen oft von Link zu Link: Eine Reihe identischer „Hier klicken“ oder „Mehr erfahren“ verrät nicht, wohin der jeweilige Link führt.',
    },
    '6.2': {
      title: 'Jeder Link hat eine Beschriftung',
      plain: 'Ein leerer Link (Symbol ohne Text, Bild ohne alt) wird nur als „Link“ ohne jedes Ziel angesagt. Nutzende können nicht wissen, ob sie klicken sollen.',
    },
    '7.1': {
      title: 'Jedes Skript ist, sofern nötig, mit assistiven Technologien kompatibel',
      plain: 'Aufklappmenüs, Tabs, Dialoge, Karussells: Jede interaktive Komponente muss Name, Rolle und Zustand (geöffnet/geschlossen, ausgewählt …) über die passenden ARIA-Attribute an Screenreader weitergeben.',
    },
    '7.2': {
      title: 'Die Alternative jedes Skripts ist aussagekräftig',
      plain: 'Bietet eine JavaScript-Funktion eine zugängliche Alternative, muss diese Zugang zu denselben Informationen und Aktionen geben.',
    },
    '7.3': {
      title: 'Jedes Skript ist per Tastatur und mit jedem Zeigegerät bedienbar',
      plain: 'Alles, was mit der Maus geht, muss auch mit der Tastatur gehen: ein Menü öffnen, einen Dialog schließen, ein Karussell weiterschalten. Ein klickbares div ohne Tastaturbedienung schließt Menschen aus, die nur die Tastatur nutzen.',
    },
    '7.4': {
      title: 'Nutzende werden über Kontextwechsel informiert oder behalten die Kontrolle darüber',
      plain: 'Eine Seite, die sich von selbst neu lädt oder weiterleitet (bei der Auswahl in einer Liste, bei der Eingabe in ein Feld), verwirrt Screenreader-Nutzende vollständig.',
    },
    '7.5': {
      title: 'Statusmeldungen werden von assistiven Technologien korrekt wiedergegeben',
      plain: '„Produkt in den Warenkorb gelegt“, „3 Treffer gefunden“, „Formular gesendet“: Solche Meldungen müssen vorgelesen werden (role="status", aria-live), ohne den Fokus zu verschieben.',
    },
    '8.1': {
      title: 'Jede Seite hat einen gültigen Dokumenttyp (doctype)',
      plain: 'Ohne doctype interpretieren Browser und assistive Technologien die Seite in einem eingeschränkten Modus – mit unvorhersehbarem Verhalten.',
    },
    '8.2': {
      title: 'Der Quellcode jeder Seite ist valide',
      plain: 'Nicht geschlossene Tags, doppelte IDs, unzulässige Verschachtelungen: Ungültiger Code bringt Screenreader aus dem Takt, sodass sie Inhalte doppelt oder gar nicht vorlesen.',
    },
    '8.3': {
      title: 'Jede Seite hat eine Standardsprache',
      plain: 'Das Attribut lang="de" sagt dem Screenreader, welche Stimme er verwenden soll. Ohne es kann eine deutsche Seite mit englischer Aussprache vorgelesen werden – unverständlich.',
    },
    '8.4': {
      title: 'Der Sprachcode jeder Seite ist zutreffend',
      plain: 'Ein lang="en" auf einer deutschen Seite lässt den gesamten Inhalt mit englischem Akzent vorlesen. Der Code muss der tatsächlichen Sprache der Seite entsprechen.',
    },
    '8.5': {
      title: 'Jede Seite hat einen Seitentitel (title)',
      plain: 'Das <title> ist das Erste, was ein Screenreader ansagt, und es erscheint im Browser-Tab. Ohne Titel lässt sich zwischen mehreren Seiten nicht orientieren.',
    },
    '8.6': {
      title: 'Der Titel jeder Seite ist aussagekräftig',
      plain: 'Jede Seite braucht einen eindeutigen, beschreibenden Titel: „Warenkorb – Mein Shop“ und nicht überall „Startseite“. Er ist der wichtigste Orientierungspunkt zwischen Tabs.',
    },
    '8.7': {
      title: 'Jeder Sprachwechsel ist im Code gekennzeichnet',
      plain: 'Ein Wort oder Abschnitt in einer anderen Sprache (ein Zitat, „Newsletter“ …) braucht ein lang-Attribut, damit die Sprachsynthese es korrekt ausspricht.',
    },
    '8.8': {
      title: 'Der Sprachcode jedes Sprachwechsels ist gültig und zutreffend',
      plain: 'Die verwendeten Sprachcodes (fr, en, de …) müssen gültige ISO-Codes sein und der tatsächlichen Sprache des Abschnitts entsprechen.',
    },
    '8.9': {
      title: 'Auszeichnungen werden nicht allein zu Gestaltungszwecken verwendet',
      plain: 'Ein <h2> zu nutzen, weil es „gut aussieht“, oder <blockquote> zum Einrücken führt Screenreader in die Irre: Jede Auszeichnung hat eine Bedeutung, nicht nur einen Stil.',
    },
    '8.10': {
      title: 'Wechsel der Leserichtung sind gekennzeichnet',
      plain: 'Ein Abschnitt auf Arabisch oder Hebräisch (von rechts nach links gelesen) muss mit dem Attribut dir="rtl" gekennzeichnet sein, um korrekt dargestellt und vorgelesen zu werden.',
    },
    '9.1': {
      title: 'Die Information ist durch passende Überschriften (h1-h6) strukturiert',
      plain: 'Screenreader-Nutzende springen von Überschrift zu Überschrift, um eine Seite zu überfliegen. Eine unstimmige Hierarchie (h1, dann h4, leere Überschriften) macht die Seite für sie unlesbar.',
    },
    '9.2': {
      title: 'Die Dokumentstruktur ist schlüssig (header, main, footer, nav)',
      plain: 'Die Hauptbereiche der Seite (Kopfbereich, Inhalt, Fußbereich, Navigation) müssen mit den dafür vorgesehenen HTML-Elementen ausgezeichnet sein, damit eine schnelle Navigation nach Bereichen möglich ist.',
    },
    '9.3': {
      title: 'Jede Liste ist korrekt strukturiert (ul, ol, dl)',
      plain: 'Eine richtig ausgezeichnete Liste wird dem Screenreader als „Liste mit 5 Einträgen“ angesagt und lässt sich überspringen oder durchgehen. Bindestriche in <div>-Elementen liefern nichts davon.',
    },
    '9.4': {
      title: 'Jedes Zitat ist korrekt gekennzeichnet (blockquote, q)',
      plain: 'Zitate müssen mit <blockquote> oder <q> ausgezeichnet sein, damit Nutzende erkennen, dass es sich um ein Zitat handelt und nicht um eine Aussage der Website.',
    },
    '10.1': {
      title: 'Stylesheets steuern die Darstellung (keine HTML-Präsentationsattribute)',
      plain: 'Die Gestaltung muss über CSS erfolgen, nicht über veraltete Tags oder Attribute (<font>, align, bgcolor …): Nur so können Nutzende die Anzeige an ihre Bedürfnisse anpassen.',
    },
    '10.2': {
      title: 'Sichtbare Inhalte bleiben erhalten, wenn Stylesheets deaktiviert sind',
      plain: 'Keine Information darf allein über CSS transportiert werden (Inhalt in ::before/::after, informatives Hintergrundbild): Für assistive Technologien wäre sie nicht vorhanden.',
    },
    '10.3': {
      title: 'Die Information bleibt ohne Stylesheets verständlich',
      plain: 'Ohne CSS muss der Inhalt in einer logischen Reihenfolge erscheinen. Wird die Seite dann unschlüssig, erleben Screenreader-Nutzende diese Unordnung dauerhaft.',
    },
    '10.4': {
      title: 'Text bleibt bei 200 % Zoom lesbar',
      plain: 'Viele sehbehinderte Menschen zoomen auf 200 %. Der Text muss sich vergrößern lassen, ohne abgeschnitten, überlagert oder verdeckt zu werden – und das Zoomen darf nie blockiert sein (user-scalable=no).',
    },
    '10.5': {
      title: 'Hintergrund- und Schriftfarben werden in CSS korrekt eingesetzt',
      plain: 'Wer eine Textfarbe festlegt, muss auch die Hintergrundfarbe festlegen (und umgekehrt), sonst können persönliche Einstellungen der Nutzenden den Text unsichtbar machen (Weiß auf Weiß).',
    },
    '10.6': {
      title: 'Jeder Link ist visuell vom umgebenden Text unterscheidbar',
      plain: 'Ein Link im Fließtext muss sich über mehr als nur die Farbe erkennen lassen (Unterstreichung, Kontrastverhältnis 3:1 plus Kennzeichnung): unverzichtbar für farbenblinde Menschen.',
    },
    '10.7': {
      title: 'Der Fokus ist bei jedem interaktiven Element sichtbar',
      plain: 'Bei der Tastaturbedienung (Tab) muss stets erkennbar sein, wo man sich befindet. Den Fokusrahmen zu entfernen (outline: none), ohne ihn zu ersetzen, macht die Tastaturbedienung unmöglich.',
    },
    '10.8': {
      title: 'Versteckte Inhalte sollen von assistiven Technologien ignoriert werden',
      plain: 'Visuell verborgene Inhalte (eingeklapptes Menü, geschlossener Dialog) müssen auch vor Screenreadern verborgen sein – und umgekehrt darf in einem aria-hidden-Bereich nichts fokussierbar sein.',
    },
    '10.9': {
      title: 'Information wird nicht allein durch Form, Größe oder Position vermittelt',
      plain: '„Klicken Sie auf den runden Knopf rechts“ ergibt für eine blinde Person oder bei umgebrochener Darstellung keinen Sinn. Die Anweisung muss ohne visuellen Bezug funktionieren.',
    },
    '10.10': {
      title: 'Durch Form, Größe oder Position vermittelte Information ist auch anders verfügbar',
      plain: 'Wenn das Layout Bedeutung trägt (hervorgehobenes Element, visuelle Gruppierungen), muss diese Bedeutung auch im Inhalt oder in der Struktur ausgedrückt sein.',
    },
    '10.11': {
      title: 'Inhalte werden bei 320 px Breite ohne horizontales Scrollen dargestellt (Reflow)',
      plain: 'Bei starkem Zoom oder auf kleinem Bildschirm muss sich der Inhalt einspaltig umbrechen. Für jede Zeile horizontal scrollen zu müssen, macht das Lesen unzumutbar.',
    },
    '10.12': {
      title: 'Textabstände lassen sich ohne Inhaltsverlust vergrößern',
      plain: 'Menschen mit Legasthenie vergrößern häufig Zeilen- und Buchstabenabstand. Die Seite muss das aushalten, ohne dass Text abgeschnitten wird oder sich überlappt.',
    },
    '10.13': {
      title: 'Bei Hover oder Fokus eingeblendete Inhalte sind kontrollierbar',
      plain: 'Ein Tooltip oder Untermenü, das beim Überfahren erscheint, muss ausblendbar sein (Escape), sich überfahren lassen, ohne zu verschwinden, und so lange sichtbar bleiben wie nötig.',
    },
    '10.14': {
      title: 'Über CSS eingeblendete Zusatzinhalte sind per Tastatur erreichbar',
      plain: 'Ein Menü, das sich nur beim Überfahren mit der Maus öffnet (:hover), ist per Tastatur unzugänglich. Es muss sich auch beim Erhalt des Fokus öffnen.',
    },
    '11.1': {
      title: 'Jedes Formularfeld hat eine Beschriftung',
      plain: 'Ohne ein mit dem Feld verknüpftes label meldet ein Screenreader nur „Eingabefeld“, ohne zu sagen, was einzutragen ist. Ein Platzhalter, der beim Tippen verschwindet, genügt nicht.',
    },
    '11.2': {
      title: 'Jede Feldbeschriftung ist aussagekräftig',
      plain: 'Die Beschriftung muss klar sagen, was erwartet wird – einschließlich des Formats: „Geburtsdatum (TT.MM.JJJJ)“ statt nur „Datum“.',
    },
    '11.3': {
      title: 'Beschriftungen mit gleicher Funktion sind auf der gesamten Website einheitlich',
      plain: 'Dasselbe Feld muss überall denselben Namen tragen: Wird aus „E-Mail“ erst „Mailadresse“ und dann „Elektronische Adresse“, verlieren Nutzende die Orientierung.',
    },
    '11.4': {
      title: 'Jede Beschriftung steht unmittelbar bei ihrem Feld',
      plain: 'Die Beschriftung muss visuell nah am Feld stehen. Wer eine Bildschirmlupe nutzt, sieht eine weit entfernte Beschriftung gar nicht mehr.',
    },
    '11.5': {
      title: 'Gleichartige Felder sind, sofern nötig, gruppiert',
      plain: 'Zusammengehörige Feldblöcke (Lieferadresse vs. Rechnungsadresse) müssen gruppiert sein (fieldset), damit erkennbar ist, zu welchem Block ein Feld gehört.',
    },
    '11.6': {
      title: 'Jede Feldgruppe hat eine Legende',
      plain: 'Eine Gruppe von Optionsfeldern oder Kontrollkästchen braucht eine Legende (legend): Ohne sie hört man „Ja / Nein“, ohne zu wissen, auf welche Frage sich das bezieht.',
    },
    '11.7': {
      title: 'Jede Gruppenlegende ist aussagekräftig',
      plain: 'Die Legende muss die Frage oder das Thema der Feldgruppe benennen – verständlich auch ohne visuellen Kontext.',
    },
    '11.8': {
      title: 'Gleichartige Einträge einer Auswahlliste sind sinnvoll gruppiert',
      plain: 'In langen Aufklapplisten müssen die Optionen nach Kategorien gruppiert sein (optgroup), damit sie durchgehbar bleiben.',
    },
    '11.9': {
      title: 'Die Beschriftung jeder Schaltfläche ist aussagekräftig',
      plain: 'Eine Schaltfläche muss sagen, was sie tut: „Anfrage senden“ statt „OK“. Eine Symbolschaltfläche ohne zugänglichen Text wird nur als „Schaltfläche“ angesagt – ohne Sicht unbrauchbar.',
    },
    '11.10': {
      title: 'Die Eingabeprüfung wird sinnvoll eingesetzt',
      plain: 'Pflichtfelder müssen bereits vor dem Absenden gekennzeichnet sein und Fehler klar gemeldet werden: welches Feld, welches Problem, wie zu beheben.',
    },
    '11.11': {
      title: 'Die Eingabeprüfung enthält Korrekturvorschläge',
      plain: 'Bei einem falschen Format muss die Meldung die Lösung anbieten: „Das Datum muss im Format TT.MM.JJJJ angegeben werden, zum Beispiel 01.06.2026“ statt „Ungültiges Feld“.',
    },
    '11.12': {
      title: 'Folgenreiche Eingaben (finanziell, rechtlich …) sind prüfbar, änderbar oder bestätigungspflichtig',
      plain: 'Vor einer Bestellung, einer Kündigung oder einer Zahlung müssen Nutzende ihre Eingaben prüfen und korrigieren können oder eine Möglichkeit zum Widerruf haben.',
    },
    '11.13': {
      title: 'Der Zweck von Feldern mit persönlichen Daten ist erkennbar (autocomplete)',
      plain: 'Die autocomplete-Attribute (name, email, tel …) ermöglichen das automatische Ausfüllen: eine entscheidende Hilfe für Menschen mit kognitiven oder motorischen Einschränkungen.',
    },
    '12.1': {
      title: 'Die Website bietet mindestens zwei unterschiedliche Navigationssysteme',
      plain: 'Jede Person navigiert anders: Es braucht mindestens zwei Wege aus Menü, Sitemap und Suchfunktion, um jede Seite zu erreichen.',
    },
    '12.2': {
      title: 'Menüs und Navigationsleisten befinden sich immer an derselben Stelle',
      plain: 'Die Navigation muss auf allen Seiten an derselben Stelle und in derselben Reihenfolge erscheinen: Stammnutzende (und Screenreader) verlassen sich auf diese Beständigkeit.',
    },
    '12.3': {
      title: 'Die Seite „Sitemap“ ist aussagekräftig',
      plain: 'Die Sitemap muss die tatsächliche Struktur abbilden und auf vorhandene Seiten verweisen: Sie ist ein unverzichtbarer alternativer Einstieg.',
    },
    '12.4': {
      title: 'Die Sitemap ist von allen Seiten aus auf gleiche Weise erreichbar',
      plain: 'Der Link zur Sitemap muss auf jeder Seite an derselben Stelle stehen (meist im Fußbereich).',
    },
    '12.5': {
      title: 'Die Suchfunktion ist von allen Seiten aus auf gleiche Weise erreichbar',
      plain: 'Gibt es eine interne Suche, muss sie auf der gesamten Website an derselben Stelle verfügbar sein.',
    },
    '12.6': {
      title: 'Inhaltsbereiche können angesteuert oder übersprungen werden (Landmarks)',
      plain: 'Die großen Bereiche (Navigation, Hauptinhalt, Fußbereich) müssen als Regionen ausgezeichnet sein, damit Screenreader-Nutzende direkt zu dem springen können, was sie interessiert.',
    },
    '12.7': {
      title: 'Ein Sprunglink zum Hauptinhalt ist vorhanden',
      plain: 'Ohne einen Link „Zum Inhalt springen“ muss man mit der Tastatur auf jeder Seite das gesamte Menü (manchmal 40 Links) erneut durchlaufen, bevor man den Inhalt erreicht.',
    },
    '12.8': {
      title: 'Die Tabulatorreihenfolge ist schlüssig',
      plain: 'Die Tabulatortaste muss die Seite in einer logischen Reihenfolge durchlaufen. Positive tabindex-Werte oder schlecht gehandhabte dynamische Einfügungen lassen den Fokus wild umherspringen.',
    },
    '12.9': {
      title: 'Die Navigation enthält keine Tastaturfalle',
      plain: 'Eine Komponente, die man mit der Tastatur nicht mehr verlassen kann (Videoplayer, Widget, Dialog), blockiert Nutzende endgültig: einer der schwerwiegendsten Mängel.',
    },
    '12.10': {
      title: 'Tastaturkürzel aus einem einzelnen Zeichen sind kontrollierbar',
      plain: 'Ein Kürzel auf einem einzelnen Buchstaben kann durch Spracheingabe versehentlich ausgelöst werden. Es muss sich deaktivieren oder neu belegen lassen.',
    },
    '12.11': {
      title: 'Zusatzinhalte (bei Hover, Fokus oder Aktivierung) sind per Tastatur erreichbar',
      plain: 'Tooltips, Untermenüs und Popover müssen sich mit der Tastatur öffnen und durchgehen lassen, nicht nur mit der Maus.',
    },
    '13.1': {
      title: 'Nutzende kontrollieren jede Zeitbegrenzung, die den Inhalt verändert',
      plain: 'Automatische Aktualisierung, schnelle Abmeldung, zeitgesteuerte Weiterleitung: Nutzende müssen jede Zeitbegrenzung anhalten, verlängern oder aufheben können.',
    },
    '13.2': {
      title: 'Kein neues Fenster öffnet sich ohne Zutun der Nutzenden',
      plain: 'Ein Fenster oder Tab, das sich von selbst öffnet, verwirrt Screenreader-Nutzende, die ihren Navigationskontext verlieren, ohne zu verstehen, warum.',
    },
    '13.3': {
      title: 'Jedes herunterladbare Dokument (PDF …) hat, sofern nötig, eine zugängliche Fassung',
      plain: 'Ein gescanntes oder nicht getaggtes PDF kann ein Screenreader nicht vorlesen. Nötig ist ein getaggtes PDF oder eine alternative Fassung (HTML, zugängliches Dokument).',
    },
    '13.4': {
      title: 'Die zugängliche Fassung jedes Dokuments bietet dieselben Informationen',
      plain: 'Die zugängliche Fassung eines Dokuments muss ebenso vollständig und aktuell sein wie das Original und darf keine Zusammenfassung sein.',
    },
    '13.5': {
      title: 'Jeder kryptische Inhalt (ASCII-Art, Emoticon, kryptische Syntax) hat eine Alternative',
      plain: 'Ein aus Zeichen gebautes Smiley „:-)“ oder ASCII-Art wird von einer Sprachsynthese Zeichen für Zeichen vorgelesen: Es braucht eine klare Textalternative.',
    },
    '13.6': {
      title: 'Die Alternative jedes kryptischen Inhalts ist aussagekräftig',
      plain: 'Die Alternative muss die tatsächliche Bedeutung des Inhalts wiedergeben („Lächeln“, „Logo in ASCII“ …), und zwar verständlich.',
    },
    '13.7': {
      title: 'Blitzeffekte und abrupte Helligkeitswechsel werden korrekt eingesetzt',
      plain: 'Mehr als 3 Blitze pro Sekunde können fotosensible epileptische Anfälle auslösen. Für die betroffenen Menschen ist das ein Sicherheitskriterium.',
    },
    '13.8': {
      title: 'Jeder bewegte oder blinkende Inhalt ist kontrollierbar',
      plain: 'Automatische Karussells, Lauftexte, Animationen: Nutzende müssen sie anhalten können. Dauerhafte Bewegung hindert manche Menschen daran, den Rest der Seite zu lesen.',
    },
    '13.9': {
      title: 'Der Inhalt ist unabhängig von der Bildschirmausrichtung nutzbar',
      plain: 'Die Website muss im Hoch- wie im Querformat funktionieren: Manche Menschen haben ihr Gerät in einer festen Ausrichtung am Rollstuhl montiert.',
    },
    '13.10': {
      title: 'Komplexe Gesten haben eine Alternative mit einfacher Geste',
      plain: 'Zum Zoomen aufziehen, mit zwei Fingern wischen: Jede Funktion muss auch mit einem einfachen Tippen bedienbar sein – für Menschen mit eingeschränkter Beweglichkeit.',
    },
    '13.11': {
      title: 'Zeigeraktionen lassen sich abbrechen',
      plain: 'Eine Aktion darf nicht schon beim Drücken auslösen (pointer-down): Man muss von der Schaltfläche wegziehen können, um einen versehentlichen Klick abzubrechen.',
    },
    '13.12': {
      title: 'Durch Gerätebewegung ausgelöste Funktionen haben eine Alternative',
      plain: 'Schütteln zum Rückgängigmachen, Kippen zum Navigieren: Es braucht eine Alternative über eine gewöhnliche Schaltfläche, und die Bewegungserkennung muss abschaltbar sein.',
    },
}
