import type { CriterionL10n } from '@/i18n/rgaa-i18n'

/** Traductions anglaises des 106 critères RGAA 4.1.2. */
export const CRITERIA_EN: Record<string, CriterionL10n> = {

    '1.1': {
      title: 'Each informative image has a text alternative',
      plain: 'A blind person “reads” images through the alternative text (alt attribute). Without it, the screen reader announces “image” with no further detail: the information is lost.',
    },
    '1.2': {
      title: 'Each decorative image is ignored by assistive technologies',
      plain: 'A purely decorative image (divider, ambient icon) must carry an empty alt (alt="") so it does not clutter speech output with useless announcements.',
    },
    '1.3': {
      title: 'The text alternative of each informative image is relevant',
      plain: 'An alt such as “IMG_0123.jpg” or “photo” adds nothing. The alternative must convey the same information as the image: what would you understand if it were described over the phone?',
    },
    '1.4': {
      title: 'The alternative of a CAPTCHA or test image identifies its nature and function',
      plain: 'An image CAPTCHA must at least announce “CAPTCHA: security test” so the user understands what is being asked, even without seeing the image.',
    },
    '1.5': {
      title: 'Each CAPTCHA offers an alternative access solution',
      plain: 'A visual CAPTCHA must offer an alternative (audio version, logic question…), otherwise it completely blocks blind or visually impaired people — often at the most critical step (payment, contact).',
    },
    '1.6': {
      title: 'Each informative image has, where needed, a detailed description',
      plain: 'A complex chart, diagram or infographic does not fit in a short alt: it needs a long description (adjacent text, dedicated page) that conveys all the data.',
    },
    '1.7': {
      title: 'The detailed description of each image is relevant',
      plain: 'The long description must genuinely restate the information in the image (figures of a chart, steps of a diagram), not merely paraphrase it.',
    },
    '1.8': {
      title: 'Images of text are replaced with styled text whenever possible',
      plain: 'Text embedded in an image becomes blurry when zoomed, is unreadable for screen readers and does not adapt to user settings. The same rendering is almost always achievable with CSS.',
    },
    '1.9': {
      title: 'Each image caption is correctly associated with its image',
      plain: 'A caption must be programmatically associated with its image (figure/figcaption), otherwise the screen reader cannot connect the two.',
    },
    '2.1': {
      title: 'Each frame (iframe) has a title',
      plain: 'Without a title attribute, a screen reader announces “frame” without saying what it contains (map, video, payment…). The user has to guess whether to enter it or not.',
    },
    '2.2': {
      title: 'The title of each frame is relevant',
      plain: 'A generic title (“iframe”, “widget”) is useless. It must describe the actual content: “Map to our offices”, “Introduction video”.',
    },
    '3.1': {
      title: 'Information is never conveyed by color alone',
      plain: 'About 8% of men are color-blind. “Fields in red are required” does not work for them: a text, an icon or a pattern is also needed.',
    },
    '3.2': {
      title: 'The contrast between text and its background is sufficient (4.5:1)',
      plain: 'Light gray text on a white background is unreadable for visually impaired people, seniors, or simply in bright sunlight on a phone. The minimum ratio is 4.5:1 (3:1 for large headings).',
    },
    '3.3': {
      title: 'UI components and informative graphical elements have sufficient contrast (3:1)',
      plain: 'Field borders, functional icons, chart lines: if they are too pale (ratio below 3:1), some users simply cannot make them out.',
    },
    '4.1': {
      title: 'Each pre-recorded media has, where needed, a text transcript or an audio description',
      plain: 'A text transcript lets deaf people read a podcast and blind people access the content of a video. It is also a major SEO asset.',
    },
    '4.2': {
      title: 'The transcript or audio description of each media is relevant',
      plain: 'The transcript must be complete and faithful: dialogue, speakers, important visual information — not a mere summary.',
    },
    '4.3': {
      title: 'Each pre-recorded video has, where needed, synchronized captions',
      plain: 'Without captions, a video is inaccessible to deaf or hard-of-hearing people — and to everyone watching without sound (80% of videos on mobile).',
    },
    '4.4': {
      title: 'The captions of each video are relevant',
      plain: 'Auto-generated captions riddled with errors are not enough: they must be synchronized, accurate, and identify speakers and meaningful sounds.',
    },
    '4.5': {
      title: 'Each pre-recorded video has, where needed, synchronized audio description',
      plain: 'Audio description narrates what happens on screen (actions, displayed text) during pauses in dialogue, for blind or visually impaired people.',
    },
    '4.6': {
      title: 'The audio description of each video is relevant',
      plain: 'The audio description must cover every visual element needed for understanding, at the right moment, without overlapping the dialogue.',
    },
    '4.7': {
      title: 'Each time-based media is clearly identifiable',
      plain: 'The user must know that a video or audio player is present and what it contains (adjacent heading, label) before starting it.',
    },
    '4.8': {
      title: 'Each non-time-based media (map, interactive animation…) has, where needed, an alternative',
      plain: 'An interactive map or a complex animation must have an accessible equivalent: list of addresses, data table, descriptive text.',
    },
    '4.9': {
      title: 'The alternative of each non-time-based media is relevant',
      plain: 'The alternative must give access to the same information and the same functions as the original media, not an impoverished version.',
    },
    '4.10': {
      title: 'Each automatically triggered sound can be controlled',
      plain: 'A sound that starts by itself drowns out the synthetic voice of screen readers: the blind user can no longer hear anything. It must be possible to stop it immediately.',
    },
    '4.11': {
      title: 'Each time-based media can be operated with the keyboard and a pointer',
      plain: 'Play, pause, volume, captions: every player control must work with the keyboard alone, for people who cannot use a mouse.',
    },
    '4.12': {
      title: 'Each non-time-based media can be operated with the keyboard and a pointer',
      plain: 'An interactive map must be navigable with the keyboard (zoom, panning, selecting points of interest), not only with the mouse or touch.',
    },
    '4.13': {
      title: 'Each media is compatible with assistive technologies',
      plain: 'The video/audio player must expose its controls to screen readers (names, roles, states). Exotic “home-made” players often fail here.',
    },
    '5.1': {
      title: 'Each complex data table has a summary',
      plain: 'A cross-referenced table or one with multiple header levels must be preceded by a summary explaining its structure, so a screen reader user knows how to navigate it.',
    },
    '5.2': {
      title: 'The summary of each complex table is relevant',
      plain: 'The summary must actually describe how the table is organized (what rows and columns represent), not repeat its title.',
    },
    '5.3': {
      title: 'The content of each layout table remains understandable when linearized',
      plain: 'If a table is used purely for layout, its content read row by row (as a screen reader does) must remain in a logical order.',
    },
    '5.4': {
      title: 'The title of each data table is correctly associated (caption)',
      plain: 'A table title must be marked up as <caption>, not as a plain paragraph above it: this is what lets the screen reader announce it together with the table.',
    },
    '5.5': {
      title: 'The title of each data table is relevant',
      plain: 'The caption must make it possible to understand what the table is about without reading it in full: “2026 prices per plan” rather than “Table 3”.',
    },
    '5.6': {
      title: 'Each row and column header is correctly declared (th)',
      plain: 'Without header cells marked up as <th>, a screen reader reads values without context: “42” instead of “Monthly price: 42”. The table becomes a meaningless string of numbers.',
    },
    '5.7': {
      title: 'Each cell is associated with its headers (scope, headers)',
      plain: 'In complex tables, each cell must be linked to its headers via scope or headers/id so that speech output announces the right context.',
    },
    '5.8': {
      title: 'Layout tables do not use elements meant for data tables',
      plain: 'A layout table must contain no <th>, <caption> or scope: these tags would make the screen reader believe it is structured data.',
    },
    '6.1': {
      title: 'Each link is explicit',
      plain: 'Screen reader users often navigate from link to link: a series of identical “click here” or “read more” links gives no clue where each one leads.',
    },
    '6.2': {
      title: 'Each link has a label',
      plain: 'An empty link (icon without text, image without alt) is announced as “link” with no destination at all. The user cannot know whether to click.',
    },
    '7.1': {
      title: 'Each script is, where needed, compatible with assistive technologies',
      plain: 'Dropdown menus, tabs, modals, carousels: every interactive component must expose its name, role and state (open/closed, selected…) to screen readers, using the appropriate ARIA attributes.',
    },
    '7.2': {
      title: 'The alternative of each script is relevant',
      plain: 'When a JavaScript feature offers an accessible alternative, it must give access to the same information and actions.',
    },
    '7.3': {
      title: 'Each script can be operated with the keyboard and any pointing device',
      plain: 'Everything doable with a mouse must be doable with the keyboard: opening a menu, closing a modal, scrolling a carousel. A clickable div without keyboard handling excludes keyboard-only users.',
    },
    '7.4': {
      title: 'The user is warned of, or keeps control over, context changes',
      plain: 'A page that reloads or redirects on its own (when picking from a list, when typing in a field) completely disorients screen reader users.',
    },
    '7.5': {
      title: 'Status messages are correctly rendered by assistive technologies',
      plain: '“Product added to cart”, “3 results found”, “Form sent”: these messages must be announced aloud (role="status", aria-live) without moving the focus.',
    },
    '8.1': {
      title: 'Each page has a valid document type (doctype)',
      plain: 'Without a doctype, browsers and assistive technologies interpret the page in a degraded mode, with unpredictable behavior.',
    },
    '8.2': {
      title: 'The source code of each page is valid',
      plain: 'Unclosed tags, duplicate ids, forbidden nesting: invalid code derails screen readers, which read content twice or not at all.',
    },
    '8.3': {
      title: 'Each page has a default language',
      plain: 'The lang="fr" attribute tells the screen reader which voice to use. Without it, a French page may be read with English pronunciation, making it incomprehensible.',
    },
    '8.4': {
      title: 'The language code of each page is relevant',
      plain: 'A lang="en" on a French page makes all content read with an English accent. The code must match the actual language of the page.',
    },
    '8.5': {
      title: 'Each page has a page title (title)',
      plain: 'The <title> is the first thing a screen reader announces and what appears in browser tabs. Without it, there is no way to find your bearings between pages.',
    },
    '8.6': {
      title: 'The title of each page is relevant',
      plain: 'Each page must have a unique, descriptive title: “Cart — My Shop” and not “Home” everywhere. It is the main landmark for navigating between tabs.',
    },
    '8.7': {
      title: 'Each change of language is indicated in the code',
      plain: 'A word or passage in another language (a quotation, “newsletter”…) must carry a lang attribute to be pronounced correctly by speech synthesis.',
    },
    '8.8': {
      title: 'The language code of each change of language is valid and relevant',
      plain: 'The language codes used (fr, en, de…) must be valid ISO codes and match the actual language of the passage.',
    },
    '8.9': {
      title: 'Tags are not used solely for presentation purposes',
      plain: 'Using an <h2> because it “looks nice” or <blockquote> for indentation misleads screen readers: every tag has a meaning, not just a style.',
    },
    '8.10': {
      title: 'Changes in reading direction are indicated',
      plain: 'A passage in Arabic or Hebrew (read right to left) must be flagged with the dir="rtl" attribute to be displayed and read correctly.',
    },
    '9.1': {
      title: 'Information is structured with appropriate headings (h1-h6)',
      plain: 'Screen reader users navigate from heading to heading to skim a page. An inconsistent hierarchy (h1 then h4, empty headings) makes the page unreadable for them.',
    },
    '9.2': {
      title: 'The document structure is consistent (header, main, footer, nav)',
      plain: 'The main areas of the page (header, content, footer, navigation) must be marked up with the intended HTML elements to allow fast navigation by region.',
    },
    '9.3': {
      title: 'Each list is correctly structured (ul, ol, dl)',
      plain: 'A properly marked-up list announces “list, 5 items” to the screen reader, which can skip or browse it. Dashes inside <div> elements provide none of that information.',
    },
    '9.4': {
      title: 'Each quotation is correctly indicated (blockquote, q)',
      plain: 'Quotations must be marked up with <blockquote> or <q> so the user knows the text is a quotation and not a statement by the site.',
    },
    '10.1': {
      title: 'Style sheets control the presentation (no HTML presentation attributes)',
      plain: 'Formatting must go through CSS, not through obsolete tags or attributes (<font>, align, bgcolor…): this is what lets users adapt the display to their needs.',
    },
    '10.2': {
      title: 'Visible content remains present when style sheets are disabled',
      plain: 'No information may be carried by CSS alone (content in ::before/::after, informative background image): it would disappear for assistive technologies.',
    },
    '10.3': {
      title: 'Information remains understandable without style sheets',
      plain: 'Without CSS, content must appear in a logical order. If the page becomes incoherent, screen reader users experience that disorder permanently.',
    },
    '10.4': {
      title: 'Text remains readable at 200% zoom',
      plain: 'Many visually impaired people zoom to 200%. Text must enlarge without being cut off, overlapped or hidden — and zooming must never be blocked (user-scalable=no).',
    },
    '10.5': {
      title: 'CSS background and font colors are used correctly',
      plain: 'If you set a text color, you must also set the background color (and vice versa), otherwise the user’s personal settings can make the text invisible (white on white).',
    },
    '10.6': {
      title: 'Each link is visually distinguishable from the surrounding text',
      plain: 'A link within a paragraph must be identifiable by more than its color alone (underline, 3:1 contrast plus an indicator): essential for color-blind people.',
    },
    '10.7': {
      title: 'Focus is visible for each interactive element',
      plain: 'When navigating with the keyboard (Tab), you must always see where you are. Removing the focus outline (outline: none) without replacing it makes keyboard navigation impossible.',
    },
    '10.8': {
      title: 'Hidden content is meant to be ignored by assistive technologies',
      plain: 'Content hidden visually (collapsed menu, closed modal) must also be hidden from screen readers — and conversely, no focusable content inside an aria-hidden area.',
    },
    '10.9': {
      title: 'Information is not conveyed by shape, size or position alone',
      plain: '“Click the round button on the right” means nothing to a blind person or on a reflowed display. The instruction must work without visual reference.',
    },
    '10.10': {
      title: 'Information conveyed by shape, size or position is also available otherwise',
      plain: 'When the layout carries meaning (highlighted element, visual groupings), that meaning must also be expressed in the content or the structure.',
    },
    '10.11': {
      title: 'Content displays without horizontal scrolling at 320 px wide (reflow)',
      plain: 'At high zoom or on a small screen, content must reflow into a single column. Having to scroll horizontally for every line makes reading exhausting.',
    },
    '10.12': {
      title: 'Text spacing can be increased without loss of content',
      plain: 'Dyslexic people often increase line height and letter spacing. The page must support this without text being cut off or overlapping.',
    },
    '10.13': {
      title: 'Content that appears on hover or focus can be controlled',
      plain: 'A tooltip or submenu that appears on hover must be dismissible (Escape), hoverable without disappearing, and remain visible as long as needed.',
    },
    '10.14': {
      title: 'Additional content displayed via CSS is reachable with the keyboard',
      plain: 'A menu that only opens on mouse hover (:hover) is inaccessible with the keyboard. It must also open when the element receives focus.',
    },
    '11.1': {
      title: 'Each form field has a label',
      plain: 'Without a label linked to the field, a screen reader announces “edit” without saying what to type. A placeholder that vanishes while typing is not enough.',
    },
    '11.2': {
      title: 'Each field label is relevant',
      plain: 'The label must state clearly what is expected, including the format: “Date of birth (DD/MM/YYYY)” rather than “Date”.',
    },
    '11.3': {
      title: 'Labels with the same function are consistent across the site',
      plain: 'The same field must bear the same name everywhere: if “E-mail” becomes “Email address” and then “Electronic address”, users lose their bearings.',
    },
    '11.4': {
      title: 'Each label is placed next to its field',
      plain: 'The label must be visually close to its field. For someone using a screen magnifier, a distant label falls outside the field of view.',
    },
    '11.5': {
      title: 'Fields of the same nature are grouped, where needed',
      plain: 'Blocks of related fields (shipping address vs billing address) must be grouped (fieldset) so it is clear which block each field belongs to.',
    },
    '11.6': {
      title: 'Each group of fields has a legend',
      plain: 'A group of radio buttons or checkboxes must have a legend: without it, you hear “Yes / No” with no idea which question it answers.',
    },
    '11.7': {
      title: 'Each group legend is relevant',
      plain: 'The legend must state the question or the topic of the field group in a way that is understandable without visual context.',
    },
    '11.8': {
      title: 'Items of the same nature in a selection list are grouped in a relevant way',
      plain: 'In long dropdown lists, options must be grouped by category (optgroup) to remain browsable.',
    },
    '11.9': {
      title: 'The label of each button is relevant',
      plain: 'A button must say what it does: “Send my request”, not “OK”. An icon button with no accessible text is announced as “button” — unusable without sight.',
    },
    '11.10': {
      title: 'Input validation is used in a relevant way',
      plain: 'Required fields must be indicated before submission, and errors reported clearly: which field, what problem, how to fix it.',
    },
    '11.11': {
      title: 'Input validation comes with correction suggestions',
      plain: 'When a format is wrong, the message must offer the solution: “The date must use the DD/MM/YYYY format, e.g. 01/06/2026” rather than “Invalid field”.',
    },
    '11.12': {
      title: 'High-stakes inputs (financial, legal…) can be reviewed, changed or confirmed',
      plain: 'Before an order, a cancellation or a payment, the user must be able to review and correct their input, or have a way to undo it.',
    },
    '11.13': {
      title: 'The purpose of personal data fields is identifiable (autocomplete)',
      plain: 'Autocomplete attributes (name, email, tel…) enable autofill: a decisive help for people with cognitive or motor impairments.',
    },
    '12.1': {
      title: 'The site offers at least two different navigation systems',
      plain: 'Everyone navigates in their own way: at least two means among menu, site map and search engine are needed to reach every page.',
    },
    '12.2': {
      title: 'Menus and navigation bars are always in the same place',
      plain: 'Navigation must appear in the same place and the same order on every page: regular users (and screen readers) rely on that stability.',
    },
    '12.3': {
      title: 'The “site map” page is relevant',
      plain: 'The site map must reflect the actual structure and point to existing pages: it is an essential alternative entry point.',
    },
    '12.4': {
      title: 'The site map can be reached in the same way from every page',
      plain: 'The link to the site map must be in the same place on every page (usually the footer).',
    },
    '12.5': {
      title: 'The search engine can be reached in the same way from every page',
      plain: 'If there is an internal search, it must be available in the same place across the whole site.',
    },
    '12.6': {
      title: 'Content grouping areas can be reached or skipped (landmarks)',
      plain: 'The main areas (navigation, main content, footer) must be marked up as regions so a screen reader user can jump straight to what interests them.',
    },
    '12.7': {
      title: 'A skip link to the main content is present',
      plain: 'Without a “Skip to content” link, a keyboard user has to re-traverse the whole menu (sometimes 40 links) on every page before reaching the content.',
    },
    '12.8': {
      title: 'The tab order is consistent',
      plain: 'The Tab key must move through the page in a logical order. Positive tabindex values or poorly handled dynamic insertions make the focus jump all over.',
    },
    '12.9': {
      title: 'Navigation contains no keyboard trap',
      plain: 'A component you can no longer leave with the keyboard (video player, widget, modal) permanently blocks the user: one of the most serious defects.',
    },
    '12.10': {
      title: 'Single-key keyboard shortcuts can be controlled',
      plain: 'A shortcut on a single letter can be triggered by mistake by voice dictation. It must be possible to disable or remap it.',
    },
    '12.11': {
      title: 'Additional content (on hover, focus or activation) is reachable with the keyboard',
      plain: 'Tooltips, submenus and popovers must be openable and browsable with the keyboard, not only with the mouse.',
    },
    '13.1': {
      title: 'The user controls every time limit that changes the content',
      plain: 'Automatic refresh, quick logout, timed redirect: the user must be able to stop, extend or remove any time limit.',
    },
    '13.2': {
      title: 'No new window opens without user action',
      plain: 'A window or tab that opens on its own disorients screen reader users, who lose their navigation context without understanding why.',
    },
    '13.3': {
      title: 'Each downloadable document (PDF…) has, where needed, an accessible version',
      plain: 'A scanned or untagged PDF cannot be read by a screen reader. A tagged PDF or an alternative version (HTML, accessible document) is required.',
    },
    '13.4': {
      title: 'The accessible version of each document provides the same information',
      plain: 'The accessible version of a document must be as complete and up to date as the original, not a summary.',
    },
    '13.5': {
      title: 'Each cryptic content (ASCII art, emoticon, cryptic syntax) has an alternative',
      plain: 'A character-based smiley “:-)” or ASCII art is read character by character by speech synthesis: a clear text alternative is needed.',
    },
    '13.6': {
      title: 'The alternative of each cryptic content is relevant',
      plain: 'The alternative must express the actual meaning of the content (“smile”, “ASCII logo”…) in an understandable way.',
    },
    '13.7': {
      title: 'Flashes and sudden brightness changes are used correctly',
      plain: 'More than 3 flashes per second can trigger photosensitive epileptic seizures. This is a safety criterion for the people concerned.',
    },
    '13.8': {
      title: 'Each moving or blinking content can be controlled',
      plain: 'Auto-playing carousels, scrolling text, animations: the user must be able to pause them. Constant motion prevents some people from reading the rest of the page.',
    },
    '13.9': {
      title: 'Content can be viewed regardless of screen orientation',
      plain: 'The site must work in portrait as well as landscape: some people have their device mounted on a wheelchair in a fixed orientation.',
    },
    '13.10': {
      title: 'Complex gestures have a simple-gesture alternative',
      plain: 'Pinch to zoom, two-finger swipe: every feature must also work with a single tap, for people with reduced mobility.',
    },
    '13.11': {
      title: 'Pointer actions can be cancelled',
      plain: 'An action must not fire on press (pointer-down): you must be able to slide off the button to cancel an accidental click.',
    },
    '13.12': {
      title: 'Features triggered by device motion have an alternative',
      plain: 'Shake to undo, tilt to navigate: a conventional button alternative is required, and motion detection must be able to be turned off.',
    },
}