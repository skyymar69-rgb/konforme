import type { RuleL10n } from '@/i18n/rules-i18n'

/** Titres et correctifs des 40 règles du moteur, en anglais. */
export const RULES_EN: Record<string, RuleL10n> = {
  'RGAA 1.1 / WCAG 1.1.1': {
    title: 'Image without a text alternative',
    fix: 'Add alt="description of the image" (or alt="" if the image is purely decorative).',
  },
  'RGAA 1.3 / WCAG 1.1.1': {
    title: 'Text alternative is not meaningful',
    fix: "Replace the alt text with a real description of the image's content or function.",
  },
  'RGAA 8.3 / WCAG 3.1.1': {
    title: 'Document language missing or invalid',
    fix: 'Add lang="en" (or the actual language of the content) to the <html> tag.',
  },
  'RGAA 8.5 / WCAG 2.4.2': {
    title: 'Page title missing or empty',
    fix: 'Add a unique, descriptive <title> in the <head>.',
  },
  'RGAA 9.1 / WCAG 1.3.1': {
    title: 'Incorrect heading hierarchy',
    fix: 'Structure the page with a single h1, then h2/h3 without skipping levels.',
  },
  'RGAA 11.1 / WCAG 3.3.2': {
    title: 'Form field without a label',
    fix: 'Associate a <label for="field-id"> or add aria-label="…" to the field.',
  },
  'RGAA 11.10 / WCAG 3.3.2': {
    title: 'Placeholder used as the only label',
    fix: 'Keep the placeholder as an example, but add a real <label> or an aria-label.',
  },
  'RGAA 6.2 / WCAG 2.4.4': {
    title: 'Link without a label',
    fix: 'Add visible text, an aria-label, or an alt attribute on the image inside the link.',
  },
  'RGAA 6.1 / WCAG 2.4.4': {
    title: 'Link text is not explicit',
    fix: 'Reword the link text to describe its destination, or complete it with an aria-label.',
  },
  'RGAA 11.9 / WCAG 4.1.2': {
    title: 'Button without a label',
    fix: 'Add text, an aria-label, or a <title> element inside the button’s SVG.',
  },
  'RGAA 8.2 / HTML valide': {
    title: 'Duplicate identifiers (id)',
    fix: 'Make every id unique within the page.',
  },
  'RGAA 2.1 / WCAG 4.1.2': {
    title: 'Frame (iframe) without a title',
    fix: 'Add title="description of the frame content" to the iframe.',
  },
  'RGAA 5.6 / WCAG 1.3.1': {
    title: 'Data table without headers',
    fix: 'Use <th scope="col"> / <th scope="row"> for the table headers.',
  },
  'RGAA 13.2 / WCAG 3.2.5': {
    title: 'New window opened without warning',
    fix: 'State that the link opens in a new window in its label (text or aria-label).',
  },
  'RGAA 13.1 / WCAG 2.2.1': {
    title: 'Automatic redirection (meta refresh)',
    fix: 'Remove the meta refresh; use a server-side redirect or an explicit link.',
  },
  'WCAG 1.4.4 / Zoom': {
    title: 'User zoom is blocked',
    fix: 'Remove user-scalable=no and maximum-scale from the meta viewport.',
  },
  'RGAA 12.8 / WCAG 2.4.3': {
    title: 'Positive tabindex',
    fix: 'Use only tabindex="0" or tabindex="-1".',
  },
  'RGAA 4.10 / WCAG 1.4.2': {
    title: 'Media plays automatically',
    fix: 'Remove the autoplay attribute, or mute the media by default.',
  },
  'RGAA 4.3 / WCAG 1.2.2': {
    title: 'No captions detected on video',
    fix: 'Add <track kind="captions" srclang="en" src="…"> to the video.',
  },
  'RGAA 12.6 / Landmarks': {
    title: 'Main content area not identified',
    fix: 'Wrap the main content in a single <main> element.',
  },
  'RGAA 12.7 / WCAG 2.4.1': {
    title: 'Skip link missing',
    fix: 'Add an internal link to the main content as the first focusable element.',
  },
  'WCAG 4.1.2 / aria-hidden': {
    title: 'Focusable element hidden from screen readers',
    fix: 'Remove aria-hidden, or make the element non-focusable (tabindex="-1", disabled).',
  },
  'ARIA refs / WCAG 1.3.1': {
    title: 'ARIA reference points to a non-existent id',
    fix: 'Fix the referenced id or replace it with an aria-label.',
  },
  'RGAA 11.6 / WCAG 1.3.1': {
    title: 'Field group without a legend',
    fix: 'Add a <legend> as the first child of the fieldset.',
  },
  'RGAA 10.1 / Présentation': {
    title: 'Obsolete presentational tags',
    fix: 'Remove these tags and handle presentation with CSS.',
  },
  'RGAA 6.1 / Lien-image': {
    title: 'Image link without an alternative',
    fix: 'Set the image alt to the link destination (e.g. alt="Home").',
  },
  'Contraste inline / WCAG 1.4.3': {
    title: 'Insufficient text contrast (inline styles)',
    fix: 'Adjust the colours to reach at least 4.5:1 (normal text) or 3:1 (large text).',
  },
  'RGAA 1.1 / WCAG 1.1.1 (area)': {
    title: 'Image map area without an alternative',
    fix: 'Add alt="destination of the area" to every <area href="…">.',
  },
  'RGAA 1.1 / WCAG 1.1.1 (input image)': {
    title: 'Image button without an alternative',
    fix: 'Add alt="button function" to the input type="image".',
  },
  'RGAA 1.1 / WCAG 1.1.1 (svg)': {
    title: 'Informative SVG without an alternative',
    fix: 'Add aria-label="description" or a <title> element as the first child of the SVG.',
  },
  'RGAA 9.1 / WCAG 1.3.1 (titre vide)': {
    title: 'Empty heading (h1-h6)',
    fix: 'Fill in the heading text or remove the empty tag.',
  },
  'RGAA 11.1 / WCAG 3.3.2 (label orphelin)': {
    title: 'Label with no associated field',
    fix: "Match the label's for attribute to the field's id.",
  },
  'ARIA role / WCAG 4.1.2': {
    title: 'Invalid ARIA role',
    fix: 'Use a valid ARIA role (button, navigation, dialog…) or remove the attribute.',
  },
  'Imbrication / WCAG 4.1.2': {
    title: 'Nested interactive elements',
    fix: 'Move the nested element outside its parent link or button.',
  },
  'RGAA 7.3 / WCAG 2.1.1': {
    title: 'Clickable element not keyboard accessible',
    fix: 'Use a <button>, or add role="button" + tabindex="0" + Enter/Space key handling.',
  },
  'WCAG 3.2.2 / Formulaire': {
    title: 'Form without a submit button',
    fix: 'Add a visible <button type="submit"> (or input type="submit") to the form.',
  },
  'RGAA 8.2 / Listes': {
    title: 'List item outside a list',
    fix: 'Place the <li> elements inside a <ul> or <ol>.',
  },
  'WCAG 1.4.10 / Viewport': {
    title: 'Meta viewport missing',
    fix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1"> to the <head>.',
  },
  'RGAA 1.3 / Alt trop long': {
    title: 'Text alternative too long',
    fix: 'Shorten the alt text and move the detailed description into the adjacent content.',
  },
  'WCAG 1.3.5 / Autocomplete': {
    title: 'Personal field without autocomplete',
    fix: 'Add autocomplete="email" (or "tel") to the field.',
  },
}
