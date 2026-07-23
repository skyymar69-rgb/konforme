import type { RuleL10n } from '@/i18n/rules-i18n'

/** Titres et correctifs des 40 règles du moteur, en espagnol. */
export const RULES_ES: Record<string, RuleL10n> = {
  'RGAA 1.1 / WCAG 1.1.1': {
    title: 'Imagen sin alternativa textual',
    fix: 'Añada alt="descripción de la imagen" (o alt="" si la imagen es puramente decorativa).',
  },
  'RGAA 1.3 / WCAG 1.1.1': {
    title: 'Alternativa textual no pertinente',
    fix: 'Sustituya el texto alt por una descripción real del contenido o de la función de la imagen.',
  },
  'RGAA 8.3 / WCAG 3.1.1': {
    title: 'Idioma del documento ausente o no válido',
    fix: 'Añada lang="es" (o el idioma real del contenido) en la etiqueta <html>.',
  },
  'RGAA 8.5 / WCAG 2.4.2': {
    title: 'Título de página ausente o vacío',
    fix: 'Añada un <title> único y descriptivo en el <head>.',
  },
  'RGAA 9.1 / WCAG 1.3.1': {
    title: 'Jerarquía de encabezados incorrecta',
    fix: 'Estructure la página con un único h1 y después h2/h3 sin saltar niveles.',
  },
  'RGAA 11.1 / WCAG 3.3.2': {
    title: 'Campo de formulario sin etiqueta',
    fix: 'Asocie un <label for="id-del-campo"> o añada aria-label="…" al campo.',
  },
  'RGAA 11.10 / WCAG 3.3.2': {
    title: 'Placeholder usado como única etiqueta',
    fix: 'Mantenga el placeholder como ejemplo, pero añada una <label> real o un aria-label.',
  },
  'RGAA 6.2 / WCAG 2.4.4': {
    title: 'Enlace sin texto',
    fix: 'Añada un texto visible, un aria-label o un atributo alt en la imagen contenida en el enlace.',
  },
  'RGAA 6.1 / WCAG 2.4.4': {
    title: 'Texto del enlace poco explícito',
    fix: 'Reformule el texto del enlace para describir su destino, o complételo con un aria-label.',
  },
  'RGAA 11.9 / WCAG 4.1.2': {
    title: 'Botón sin etiqueta',
    fix: 'Añada un texto, un aria-label o un elemento <title> dentro del SVG del botón.',
  },
  'RGAA 8.2 / HTML valide': {
    title: 'Identificadores (id) duplicados',
    fix: 'Haga que cada id sea único dentro de la página.',
  },
  'RGAA 2.1 / WCAG 4.1.2': {
    title: 'Marco (iframe) sin título',
    fix: 'Añada title="descripción del contenido del marco" al iframe.',
  },
  'RGAA 5.6 / WCAG 1.3.1': {
    title: 'Tabla de datos sin encabezados',
    fix: 'Utilice <th scope="col"> / <th scope="row"> para los encabezados de la tabla.',
  },
  'RGAA 13.2 / WCAG 3.2.5': {
    title: 'Nueva ventana sin aviso',
    fix: 'Indique en el texto del enlace (texto o aria-label) que se abre en una ventana nueva.',
  },
  'RGAA 13.1 / WCAG 2.2.1': {
    title: 'Redirección automática (meta refresh)',
    fix: 'Elimine el meta refresh; utilice una redirección de servidor o un enlace explícito.',
  },
  'WCAG 1.4.4 / Zoom': {
    title: 'Zoom del usuario bloqueado',
    fix: 'Elimine user-scalable=no y maximum-scale del meta viewport.',
  },
  'RGAA 12.8 / WCAG 2.4.3': {
    title: 'tabindex positivo',
    fix: 'Utilice únicamente tabindex="0" o tabindex="-1".',
  },
  'RGAA 4.10 / WCAG 1.4.2': {
    title: 'Reproducción automática de un medio',
    fix: 'Elimine el atributo autoplay, o silencie el medio de forma predeterminada (muted).',
  },
  'RGAA 4.3 / WCAG 1.2.2': {
    title: 'No se han detectado subtítulos en el vídeo',
    fix: 'Añada <track kind="captions" srclang="es" src="…"> al vídeo.',
  },
  'RGAA 12.6 / Landmarks': {
    title: 'Zona de contenido principal no identificada',
    fix: 'Envuelva el contenido principal en un único elemento <main>.',
  },
  'RGAA 12.7 / WCAG 2.4.1': {
    title: 'Falta el enlace de salto al contenido',
    fix: 'Añada, como primer elemento enfocable, un enlace interno al contenido principal.',
  },
  'WCAG 4.1.2 / aria-hidden': {
    title: 'Elemento enfocable oculto a los lectores de pantalla',
    fix: 'Elimine aria-hidden, o haga que el elemento no sea enfocable (tabindex="-1", disabled).',
  },
  'ARIA refs / WCAG 1.3.1': {
    title: 'Referencia ARIA a un id inexistente',
    fix: 'Corrija el id referenciado o sustitúyalo por un aria-label.',
  },
  'RGAA 11.6 / WCAG 1.3.1': {
    title: 'Grupo de campos sin leyenda',
    fix: 'Añada una <legend> como primer hijo del fieldset.',
  },
  'RGAA 10.1 / Présentation': {
    title: 'Etiquetas de presentación obsoletas',
    fix: 'Elimine estas etiquetas y gestione la presentación con CSS.',
  },
  'RGAA 6.1 / Lien-image': {
    title: 'Enlace-imagen sin alternativa',
    fix: 'Indique en el alt de la imagen el destino del enlace (p. ej. alt="Inicio").',
  },
  'Contraste inline / WCAG 1.4.3': {
    title: 'Contraste de texto insuficiente (estilos inline)',
    fix: 'Ajuste los colores para alcanzar al menos 4,5:1 (texto normal) o 3:1 (texto grande).',
  },
  'RGAA 1.1 / WCAG 1.1.1 (area)': {
    title: 'Zona de mapa de imagen sin alternativa',
    fix: 'Añada alt="destino de la zona" en cada <area href="…">.',
  },
  'RGAA 1.1 / WCAG 1.1.1 (input image)': {
    title: 'Botón de imagen sin alternativa',
    fix: 'Añada alt="función del botón" al input type="image".',
  },
  'RGAA 1.1 / WCAG 1.1.1 (svg)': {
    title: 'SVG informativo sin alternativa',
    fix: 'Añada aria-label="descripción" o un elemento <title> como primer hijo del SVG.',
  },
  'RGAA 9.1 / WCAG 1.3.1 (titre vide)': {
    title: 'Encabezado (h1-h6) vacío',
    fix: 'Rellene el texto del encabezado o elimine la etiqueta vacía.',
  },
  'RGAA 11.1 / WCAG 3.3.2 (label orphelin)': {
    title: 'Etiqueta sin campo asociado',
    fix: 'Haga coincidir el atributo for de la etiqueta con el id del campo.',
  },
  'ARIA role / WCAG 4.1.2': {
    title: 'Rol ARIA no válido',
    fix: 'Utilice un rol ARIA válido (button, navigation, dialog…) o elimine el atributo.',
  },
  'Imbrication / WCAG 4.1.2': {
    title: 'Elementos interactivos anidados',
    fix: 'Saque el elemento anidado fuera del enlace o del botón que lo contiene.',
  },
  'RGAA 7.3 / WCAG 2.1.1': {
    title: 'Elemento clicable no accesible por teclado',
    fix: 'Utilice un <button>, o añada role="button" + tabindex="0" + la gestión de las teclas Intro/Espacio.',
  },
  'WCAG 3.2.2 / Formulaire': {
    title: 'Formulario sin botón de envío',
    fix: 'Añada al formulario un <button type="submit"> visible (o input type="submit").',
  },
  'RGAA 8.2 / Listes': {
    title: 'Elemento de lista fuera de una lista',
    fix: 'Coloque los elementos <li> dentro de un <ul> o de un <ol>.',
  },
  'WCAG 1.4.10 / Viewport': {
    title: 'Falta la etiqueta meta viewport',
    fix: 'Añada <meta name="viewport" content="width=device-width, initial-scale=1"> en el <head>.',
  },
  'RGAA 1.3 / Alt trop long': {
    title: 'Alternativa textual demasiado larga',
    fix: 'Acorte el texto alt y traslade la descripción detallada al contenido adyacente.',
  },
  'WCAG 1.3.5 / Autocomplete': {
    title: 'Campo personal sin autocomplete',
    fix: 'Añada autocomplete="email" (o "tel") al campo.',
  },
}
