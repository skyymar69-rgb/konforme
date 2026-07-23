import type { CriterionL10n } from '@/i18n/rgaa-i18n'

/** Traductions espagnoles des 106 critères RGAA 4.1.2. */
export const CRITERIA_ES: Record<string, CriterionL10n> = {

    '1.1': {
      title: 'Cada imagen portadora de información tiene una alternativa textual',
      plain: 'Una persona ciega “lee” las imágenes gracias al texto alternativo (atributo alt). Sin él, el lector de pantalla anuncia “imagen” y nada más: la información se pierde.',
    },
    '1.2': {
      title: 'Cada imagen decorativa es ignorada por las tecnologías de apoyo',
      plain: 'Una imagen puramente decorativa (filete, icono ambiental) debe llevar un alt vacío (alt="") para no saturar la lectura por voz con anuncios inútiles.',
    },
    '1.3': {
      title: 'La alternativa textual de cada imagen informativa es pertinente',
      plain: 'Un alt del tipo “IMG_0123.jpg” o “foto” no aporta nada. La alternativa debe transmitir la misma información que la imagen: ¿qué entendería alguien si tuviera que describírsela por teléfono?',
    },
    '1.4': {
      title: 'La alternativa de un CAPTCHA o de una imagen de prueba identifica su naturaleza y su función',
      plain: 'Un CAPTCHA en imagen debe anunciar como mínimo “CAPTCHA: prueba de seguridad”, para que la persona usuaria entienda qué se le pide aunque no vea la imagen.',
    },
    '1.5': {
      title: 'Cada CAPTCHA ofrece una solución de acceso alternativa',
      plain: 'Un CAPTCHA visual debe ofrecer una alternativa (versión de audio, pregunta lógica…); de lo contrario bloquea por completo a las personas ciegas o con baja visión, a menudo en el paso más crítico (pago, contacto).',
    },
    '1.6': {
      title: 'Cada imagen portadora de información tiene, si es necesario, una descripción detallada',
      plain: 'Un gráfico, un esquema o una infografía compleja no caben en un alt corto: hace falta una descripción larga (texto adyacente, página dedicada) que restituya todos los datos.',
    },
    '1.7': {
      title: 'La descripción detallada de cada imagen es pertinente',
      plain: 'La descripción larga debe recoger realmente la información de la imagen (cifras de un gráfico, etapas de un esquema), no limitarse a parafrasearla.',
    },
    '1.8': {
      title: 'Las imágenes de texto se sustituyen por texto con estilos siempre que es posible',
      plain: 'Un texto insertado como imagen se vuelve borroso al ampliarlo, resulta ilegible para los lectores de pantalla y no se adapta a los ajustes de la persona usuaria. El mismo resultado casi siempre se puede lograr con CSS.',
    },
    '1.9': {
      title: 'Cada leyenda de imagen está correctamente vinculada a su imagen',
      plain: 'Una leyenda debe estar asociada mediante el código a su imagen (figure/figcaption); si no, el lector de pantalla no relaciona las dos.',
    },
    '2.1': {
      title: 'Cada marco (iframe) tiene un título',
      plain: 'Sin atributo title, un lector de pantalla anuncia “marco” sin decir qué contiene (mapa, vídeo, pago…). La persona usuaria tiene que adivinar si debe entrar o no.',
    },
    '2.2': {
      title: 'El título de cada marco es pertinente',
      plain: 'Un title genérico (“iframe”, “widget”) no sirve de nada. Debe describir el contenido real: “Mapa de acceso a nuestras oficinas”, “Vídeo de presentación”.',
    },
    '3.1': {
      title: 'La información nunca se transmite únicamente mediante el color',
      plain: 'Alrededor del 8 % de los hombres tiene daltonismo. “Los campos en rojo son obligatorios” no funciona para ellos: hace falta además un texto, un icono o una trama.',
    },
    '3.2': {
      title: 'El contraste entre el texto y su fondo es suficiente (4,5:1)',
      plain: 'Un texto gris claro sobre fondo blanco resulta ilegible para las personas con baja visión, para las personas mayores o simplemente a pleno sol en el móvil. La relación de contraste mínima es de 4,5:1 (3:1 para los títulos grandes).',
    },
    '3.3': {
      title: 'Los componentes de interfaz y los elementos gráficos portadores de información tienen suficiente contraste (3:1)',
      plain: 'Bordes de campos, iconos funcionales, curvas de gráficos: si son demasiado pálidos (relación inferior a 3:1), una parte de las personas usuarias simplemente no los distingue.',
    },
    '4.1': {
      title: 'Cada medio pregrabado tiene, si es necesario, una transcripción textual o una audiodescripción',
      plain: 'Una transcripción de texto permite a las personas sordas leer un pódcast y a las personas ciegas acceder al contenido de un vídeo. Además, es una gran ventaja para el SEO.',
    },
    '4.2': {
      title: 'La transcripción o la audiodescripción de cada medio es pertinente',
      plain: 'La transcripción debe ser completa y fiel: diálogos, intervinientes, información visual importante; no un simple resumen.',
    },
    '4.3': {
      title: 'Cada vídeo pregrabado tiene, si es necesario, subtítulos sincronizados',
      plain: 'Sin subtítulos, un vídeo resulta inaccesible para las personas sordas o con discapacidad auditiva, y para todas las que miran sin sonido (el 80 % de los vídeos en el móvil).',
    },
    '4.4': {
      title: 'Los subtítulos de cada vídeo son pertinentes',
      plain: 'Unos subtítulos generados automáticamente y plagados de errores no bastan: deben estar sincronizados, ser fieles e identificar a quien habla y los sonidos significativos.',
    },
    '4.5': {
      title: 'Cada vídeo pregrabado tiene, si es necesario, una audiodescripción sincronizada',
      plain: 'La audiodescripción cuenta lo que ocurre en pantalla (acciones, textos mostrados) durante los silencios, para las personas ciegas o con baja visión.',
    },
    '4.6': {
      title: 'La audiodescripción de cada vídeo es pertinente',
      plain: 'La audiodescripción debe cubrir todos los elementos visuales necesarios para la comprensión, en el momento adecuado y sin solaparse con los diálogos.',
    },
    '4.7': {
      title: 'Cada medio temporal es claramente identificable',
      plain: 'La persona usuaria debe saber que hay un reproductor de vídeo o de audio y qué contiene (título adyacente, etiqueta) antes de iniciarlo.',
    },
    '4.8': {
      title: 'Cada medio no temporal (mapa, animación interactiva…) tiene, si es necesario, una alternativa',
      plain: 'Un mapa interactivo o una animación compleja debe tener un equivalente accesible: lista de direcciones, tabla de datos, texto descriptivo.',
    },
    '4.9': {
      title: 'La alternativa de cada medio no temporal es pertinente',
      plain: 'La alternativa debe dar acceso a la misma información y a las mismas funciones que el medio original, no a una versión empobrecida.',
    },
    '4.10': {
      title: 'Cada sonido que se activa automáticamente es controlable',
      plain: 'Un sonido que se inicia solo tapa la voz sintética de los lectores de pantalla: la persona ciega deja de oír nada. Debe poder detenerse de inmediato.',
    },
    '4.11': {
      title: 'La consulta de cada medio temporal se puede controlar con el teclado y con el puntero',
      plain: 'Reproducir, pausar, volumen, subtítulos: todos los botones del reproductor deben funcionar solo con el teclado, para las personas que no pueden usar el ratón.',
    },
    '4.12': {
      title: 'La consulta de cada medio no temporal se puede controlar con el teclado y con el puntero',
      plain: 'Un mapa interactivo debe poder recorrerse con el teclado (zoom, desplazamiento, selección de puntos de interés), no únicamente con el ratón o de forma táctil.',
    },
    '4.13': {
      title: 'Cada medio es compatible con las tecnologías de apoyo',
      plain: 'El reproductor de vídeo o de audio debe exponer sus botones a los lectores de pantalla (nombres, roles, estados). Los reproductores exóticos “caseros” suelen fallar aquí.',
    },
    '5.1': {
      title: 'Cada tabla de datos compleja tiene un resumen',
      plain: 'Una tabla de doble entrada o con varios niveles de encabezado debe ir precedida de un resumen que explique su estructura, para que quien usa un lector de pantalla sepa cómo recorrerla.',
    },
    '5.2': {
      title: 'El resumen de cada tabla compleja es pertinente',
      plain: 'El resumen debe describir realmente la organización de la tabla (qué representan las filas y las columnas), no repetir su título.',
    },
    '5.3': {
      title: 'El contenido de cada tabla de maquetación sigue siendo comprensible una vez linealizado',
      plain: 'Si una tabla solo sirve para maquetar, su contenido leído fila por fila (como hace un lector de pantalla) debe mantener un orden lógico.',
    },
    '5.4': {
      title: 'El título de cada tabla de datos está correctamente asociado (caption)',
      plain: 'El título de una tabla debe marcarse con <caption>, no como un simple párrafo encima: es lo que permite al lector de pantalla anunciarlo junto con la tabla.',
    },
    '5.5': {
      title: 'El título de cada tabla de datos es pertinente',
      plain: 'El caption debe permitir entender de qué trata la tabla sin leerla entera: “Tarifas 2026 por plan” en lugar de “Tabla 3”.',
    },
    '5.6': {
      title: 'Cada encabezado de fila y de columna está correctamente declarado (th)',
      plain: 'Sin celdas de encabezado marcadas con <th>, un lector de pantalla lee los valores sin contexto: “42” en vez de “Precio mensual: 42”. La tabla se convierte en una sucesión de cifras sin sentido.',
    },
    '5.7': {
      title: 'Cada celda está asociada a sus encabezados (scope, headers)',
      plain: 'En las tablas complejas, cada celda debe vincularse a sus encabezados mediante scope o headers/id para que la lectura por voz anuncie el contexto correcto.',
    },
    '5.8': {
      title: 'Las tablas de maquetación no utilizan elementos propios de las tablas de datos',
      plain: 'Una tabla de maquetación no debe contener <th>, <caption> ni scope: esas marcas harían creer al lector de pantalla que se trata de datos estructurados.',
    },
    '6.1': {
      title: 'Cada enlace es explícito',
      plain: 'Quienes usan un lector de pantalla navegan a menudo de enlace en enlace: una serie de “haga clic aquí” o “leer más” idénticos no permite saber adónde lleva cada uno.',
    },
    '6.2': {
      title: 'Cada enlace tiene una etiqueta',
      plain: 'Un enlace vacío (icono sin texto, imagen sin alt) se anuncia como “enlace”, sin destino alguno. La persona usuaria no puede saber si debe pulsarlo.',
    },
    '7.1': {
      title: 'Cada script es, si es necesario, compatible con las tecnologías de apoyo',
      plain: 'Menús desplegables, pestañas, ventanas modales, carruseles: cada componente interactivo debe exponer su nombre, su rol y su estado (abierto/cerrado, seleccionado…) a los lectores de pantalla, mediante los atributos ARIA adecuados.',
    },
    '7.2': {
      title: 'La alternativa de cada script es pertinente',
      plain: 'Cuando una funcionalidad JavaScript ofrece una alternativa accesible, esta debe dar acceso a la misma información y a las mismas acciones.',
    },
    '7.3': {
      title: 'Cada script se puede controlar con el teclado y con cualquier dispositivo de puntero',
      plain: 'Todo lo que se hace con el ratón debe poder hacerse con el teclado: abrir un menú, cerrar una ventana modal, desplazar un carrusel. Un div pulsable sin gestión del teclado excluye a las personas que solo usan el teclado.',
    },
    '7.4': {
      title: 'Se avisa a la persona usuaria de los cambios de contexto o esta mantiene su control',
      plain: 'Una página que se recarga o redirige sola (al elegir en una lista, al escribir en un campo) desorienta por completo a quienes usan un lector de pantalla.',
    },
    '7.5': {
      title: 'Los mensajes de estado son correctamente restituidos por las tecnologías de apoyo',
      plain: '“Producto añadido al carrito”, “3 resultados encontrados”, “Formulario enviado”: estos mensajes deben anunciarse por voz (role="status", aria-live) sin desplazar el foco.',
    },
    '8.1': {
      title: 'Cada página tiene un tipo de documento (doctype) válido',
      plain: 'Sin doctype, los navegadores y las tecnologías de apoyo interpretan la página en modo degradado, con comportamientos imprevisibles.',
    },
    '8.2': {
      title: 'El código fuente de cada página es válido',
      plain: 'Etiquetas mal cerradas, identificadores duplicados, anidamientos prohibidos: un código no válido descarrila a los lectores de pantalla, que leen contenido por duplicado o no lo leen en absoluto.',
    },
    '8.3': {
      title: 'Cada página tiene un idioma predeterminado',
      plain: 'El atributo lang="es" indica al lector de pantalla qué voz debe usar. Sin él, una página en español puede leerse con pronunciación inglesa, resultando incomprensible.',
    },
    '8.4': {
      title: 'El código de idioma de cada página es pertinente',
      plain: 'Un lang="en" en una página en español hace que todo el contenido se lea con acento inglés. El código debe corresponder al idioma real de la página.',
    },
    '8.5': {
      title: 'Cada página tiene un título de página (title)',
      plain: 'El <title> es lo primero que anuncia un lector de pantalla y lo que se muestra en las pestañas del navegador. Sin él, es imposible orientarse entre varias páginas.',
    },
    '8.6': {
      title: 'El título de cada página es pertinente',
      plain: 'Cada página debe tener un título único y descriptivo: “Carrito — Mi Tienda” y no “Inicio” en todas partes. Es la principal referencia para navegar entre pestañas.',
    },
    '8.7': {
      title: 'Cada cambio de idioma se indica en el código',
      plain: 'Una palabra o un pasaje en otro idioma (una cita, “newsletter”…) debe llevar un atributo lang para que la síntesis de voz lo pronuncie correctamente.',
    },
    '8.8': {
      title: 'El código de idioma de cada cambio de idioma es válido y pertinente',
      plain: 'Los códigos de idioma utilizados (es, en, fr…) deben ser códigos ISO válidos y corresponder al idioma real del pasaje.',
    },
    '8.9': {
      title: 'Las etiquetas no se utilizan únicamente con fines de presentación',
      plain: 'Usar un <h2> porque “queda bien” o un <blockquote> para sangrar engaña a los lectores de pantalla: cada etiqueta tiene un significado, no solo un estilo.',
    },
    '8.10': {
      title: 'Los cambios del sentido de lectura están señalados',
      plain: 'Un pasaje en árabe o en hebreo (lectura de derecha a izquierda) debe señalarse con el atributo dir="rtl" para mostrarse y leerse correctamente.',
    },
    '9.1': {
      title: 'La información está estructurada mediante títulos (h1-h6) apropiados',
      plain: 'Quienes usan un lector de pantalla navegan de título en título para recorrer una página. Una jerarquía incoherente (un h1 y después un h4, títulos vacíos) les vuelve la página ilegible.',
    },
    '9.2': {
      title: 'La estructura del documento es coherente (header, main, footer, nav)',
      plain: 'Las zonas principales de la página (cabecera, contenido, pie de página, navegación) deben marcarse con los elementos HTML previstos, para permitir una navegación rápida por regiones.',
    },
    '9.3': {
      title: 'Cada lista está correctamente estructurada (ul, ol, dl)',
      plain: 'Una lista realmente marcada anuncia “lista de 5 elementos” al lector de pantalla, que puede saltarla o recorrerla. Unos guiones dentro de <div> no aportan ninguna de esas informaciones.',
    },
    '9.4': {
      title: 'Cada cita está correctamente indicada (blockquote, q)',
      plain: 'Las citas deben marcarse con <blockquote> o <q> para que la persona usuaria sepa que ese texto es una cita y no una afirmación del sitio.',
    },
    '10.1': {
      title: 'Las hojas de estilo controlan la presentación (sin atributos de presentación HTML)',
      plain: 'El formato debe aplicarse con CSS, no con etiquetas o atributos obsoletos (<font>, align, bgcolor…): es lo que permite a cada persona adaptar la visualización a sus necesidades.',
    },
    '10.2': {
      title: 'El contenido visible sigue presente cuando se desactivan las hojas de estilo',
      plain: 'Ninguna información debe depender únicamente del CSS (contenido en ::before/::after, imagen de fondo informativa): desaparecería para las tecnologías de apoyo.',
    },
    '10.3': {
      title: 'La información sigue siendo comprensible sin las hojas de estilo',
      plain: 'Sin CSS, el contenido debe aparecer en un orden lógico. Si la página se vuelve incoherente, quienes usan un lector de pantalla sufren ese desorden de forma permanente.',
    },
    '10.4': {
      title: 'El texto sigue siendo legible con un zoom del 200 %',
      plain: 'Muchas personas con baja visión amplían al 200 %. El texto debe agrandarse sin cortarse, superponerse ni ocultarse, y el zoom nunca debe estar bloqueado (user-scalable=no).',
    },
    '10.5': {
      title: 'Los colores de fondo y de fuente en CSS se utilizan correctamente',
      plain: 'Si se define un color de texto, hay que definir también el color de fondo (y a la inversa); de lo contrario, los ajustes personales de la persona usuaria pueden dejar el texto invisible (blanco sobre blanco).',
    },
    '10.6': {
      title: 'Cada enlace se distingue visualmente del texto que lo rodea',
      plain: 'Un enlace dentro de un párrafo debe poder identificarse por algo más que su color (subrayado, contraste 3:1 más un indicador): es imprescindible para las personas con daltonismo.',
    },
    '10.7': {
      title: 'El foco es visible en cada elemento interactivo',
      plain: 'Al navegar con el teclado (Tab) hay que ver siempre dónde se está. Eliminar el contorno del foco (outline: none) sin sustituirlo hace imposible la navegación con teclado.',
    },
    '10.8': {
      title: 'Los contenidos ocultos están destinados a ser ignorados por las tecnologías de apoyo',
      plain: 'Un contenido oculto visualmente (menú plegado, ventana modal cerrada) debe estar oculto también para los lectores de pantalla y, a la inversa, no debe haber contenido focalizable dentro de una zona con aria-hidden.',
    },
    '10.9': {
      title: 'La información no se transmite únicamente mediante la forma, el tamaño o la posición',
      plain: '“Pulse el botón redondo de la derecha” no significa nada para una persona ciega ni en una presentación reorganizada. La instrucción debe funcionar sin referencia visual.',
    },
    '10.10': {
      title: 'La información transmitida por la forma, el tamaño o la posición está disponible también de otra manera',
      plain: 'Cuando la maquetación aporta significado (elemento destacado, agrupaciones visuales), ese significado debe expresarse también en el contenido o en la estructura.',
    },
    '10.11': {
      title: 'El contenido se presenta sin desplazamiento horizontal a 320 px de ancho (reflow)',
      plain: 'Con mucho zoom o en una pantalla pequeña, el contenido debe reorganizarse en una sola columna. Tener que desplazarse horizontalmente en cada línea vuelve agotadora la lectura.',
    },
    '10.12': {
      title: 'Los espaciados del texto se pueden aumentar sin pérdida de contenido',
      plain: 'Las personas con dislexia suelen aumentar el interlineado y el espaciado entre letras. La página debe admitirlo sin que el texto se corte ni se superponga.',
    },
    '10.13': {
      title: 'Los contenidos que aparecen al pasar el cursor o al recibir el foco son controlables',
      plain: 'Una información emergente o un submenú que aparece al pasar el cursor debe poder ocultarse (Esc), poder recorrerse con el cursor sin desaparecer y permanecer visible el tiempo necesario.',
    },
    '10.14': {
      title: 'Los contenidos adicionales mostrados mediante CSS son alcanzables con el teclado',
      plain: 'Un menú que solo se abre al pasar el ratón (:hover) es inaccesible con el teclado. La apertura debe funcionar también al recibir el foco.',
    },
    '11.1': {
      title: 'Cada campo de formulario tiene una etiqueta',
      plain: 'Sin una etiqueta (label) vinculada al campo, un lector de pantalla anuncia “edición” sin decir qué hay que escribir. Un texto de marcador de posición que desaparece al escribir no basta.',
    },
    '11.2': {
      title: 'Cada etiqueta de campo es pertinente',
      plain: 'La etiqueta debe indicar con claridad lo que se espera, incluido el formato: “Fecha de nacimiento (DD/MM/AAAA)” en lugar de “Fecha”.',
    },
    '11.3': {
      title: 'Las etiquetas con la misma función son coherentes en todo el sitio',
      plain: 'El mismo campo debe llamarse igual en todas partes: si “Correo electrónico” pasa a ser “E-mail” y después “Dirección electrónica”, la persona usuaria pierde sus referencias.',
    },
    '11.4': {
      title: 'Cada etiqueta está situada junto a su campo',
      plain: 'La etiqueta debe estar visualmente cerca de su campo. Para quien utiliza una lupa de pantalla, una etiqueta alejada queda fuera del campo de visión.',
    },
    '11.5': {
      title: 'Los campos de la misma naturaleza se agrupan, si es necesario',
      plain: 'Los bloques de campos relacionados (dirección de envío frente a dirección de facturación) deben agruparse (fieldset) para que se sepa a qué bloque pertenece cada campo.',
    },
    '11.6': {
      title: 'Cada agrupación de campos tiene una leyenda',
      plain: 'Un grupo de botones de opción o de casillas de verificación debe tener una leyenda (legend): sin ella se oye “Sí / No” sin saber a qué pregunta responde.',
    },
    '11.7': {
      title: 'Cada leyenda de agrupación es pertinente',
      plain: 'La leyenda debe enunciar la pregunta o el tema del grupo de campos, de forma comprensible fuera del contexto visual.',
    },
    '11.8': {
      title: 'Los elementos de la misma naturaleza de una lista de opciones se agrupan de manera pertinente',
      plain: 'En las listas desplegables largas, las opciones deben agruparse por categorías (optgroup) para que se puedan seguir recorriendo.',
    },
    '11.9': {
      title: 'La etiqueta de cada botón es pertinente',
      plain: 'Un botón debe decir lo que hace: “Enviar mi solicitud” y no “Aceptar”. Un botón de icono sin texto accesible se anuncia como “botón”, inutilizable sin ver la pantalla.',
    },
    '11.10': {
      title: 'El control de la entrada de datos se utiliza de manera pertinente',
      plain: 'Los campos obligatorios deben señalarse antes de la validación, y los errores indicarse con claridad: qué campo, qué problema y cómo corregirlo.',
    },
    '11.11': {
      title: 'El control de la entrada de datos va acompañado de sugerencias de corrección',
      plain: 'Cuando un formato es erróneo, el mensaje debe proponer la solución: “La fecha debe tener el formato DD/MM/AAAA, por ejemplo 01/06/2026” en lugar de “Campo no válido”.',
    },
    '11.12': {
      title: 'Las entradas con consecuencias (financieras, jurídicas…) se pueden verificar, modificar o confirmar',
      plain: 'Antes de un pedido, una baja o un pago, la persona usuaria debe poder revisar y corregir lo que ha introducido, o disponer de un medio de anulación.',
    },
    '11.13': {
      title: 'La finalidad de los campos de datos personales es identificable (autocomplete)',
      plain: 'Los atributos autocomplete (name, email, tel…) permiten el relleno automático: una ayuda decisiva para las personas con trastornos cognitivos o motores.',
    },
    '12.1': {
      title: 'El sitio dispone de al menos dos sistemas de navegación diferentes',
      plain: 'Cada persona navega a su manera: hacen falta al menos dos medios entre el menú, el mapa del sitio y el buscador para llegar a cada página.',
    },
    '12.2': {
      title: 'Los menús y las barras de navegación están siempre en el mismo lugar',
      plain: 'La navegación debe aparecer en el mismo sitio y en el mismo orden en todas las páginas: quienes ya conocen el sitio (y los lectores de pantalla) cuentan con esa estabilidad.',
    },
    '12.3': {
      title: 'La página “mapa del sitio” es pertinente',
      plain: 'El mapa del sitio debe reflejar la estructura real y apuntar a páginas existentes: es una puerta de entrada alternativa esencial.',
    },
    '12.4': {
      title: 'El mapa del sitio es alcanzable de la misma manera desde todas las páginas',
      plain: 'El enlace al mapa del sitio debe encontrarse en el mismo lugar en cada página (por lo general, en el pie de página).',
    },
    '12.5': {
      title: 'El buscador es alcanzable de la misma manera desde todas las páginas',
      plain: 'Si existe una búsqueda interna, debe estar disponible en el mismo lugar en todo el sitio.',
    },
    '12.6': {
      title: 'Las zonas de agrupación de contenidos se pueden alcanzar o evitar (landmarks)',
      plain: 'Las grandes zonas (navegación, contenido principal, pie de página) deben marcarse como regiones para que quien usa un lector de pantalla salte directamente a lo que le interesa.',
    },
    '12.7': {
      title: 'Existe un enlace de salto al contenido principal',
      plain: 'Sin un enlace “Ir al contenido”, quien navega con el teclado debe recorrer de nuevo todo el menú (a veces 40 enlaces) en cada página antes de llegar al contenido.',
    },
    '12.8': {
      title: 'El orden de tabulación es coherente',
      plain: 'La tecla Tab debe recorrer la página en un orden lógico. Los tabindex positivos o las inserciones dinámicas mal gestionadas hacen que el foco salte de un lado a otro.',
    },
    '12.9': {
      title: 'La navegación no contiene ninguna trampa de teclado',
      plain: 'Un componente del que ya no se puede salir con el teclado (reproductor de vídeo, widget, ventana modal) bloquea definitivamente a la persona usuaria: es uno de los defectos más graves.',
    },
    '12.10': {
      title: 'Los atajos de teclado de una sola tecla son controlables',
      plain: 'Un atajo asignado a una sola letra puede activarse por error con el dictado por voz. Debe poder desactivarse o reconfigurarse.',
    },
    '12.11': {
      title: 'Los contenidos adicionales (al pasar el cursor, al recibir el foco o al activarse) son alcanzables con el teclado',
      plain: 'Las informaciones emergentes, los submenús y los popovers deben poder abrirse y recorrerse con el teclado, no solo con el ratón.',
    },
    '13.1': {
      title: 'La persona usuaria controla cada límite de tiempo que modifica el contenido',
      plain: 'Actualización automática, cierre de sesión exprés, redirección cronometrada: se debe poder detener, prolongar o suprimir cualquier límite de tiempo.',
    },
    '13.2': {
      title: 'Ninguna ventana nueva se abre sin una acción de la persona usuaria',
      plain: 'Una ventana o una pestaña que se abre sola desorienta a quienes usan un lector de pantalla, que pierden su contexto de navegación sin entender por qué.',
    },
    '13.3': {
      title: 'Cada documento descargable (PDF…) tiene, si es necesario, una versión accesible',
      plain: 'Un PDF escaneado o sin etiquetar resulta ilegible para un lector de pantalla. Hace falta un PDF etiquetado o una versión alternativa (HTML, documento accesible).',
    },
    '13.4': {
      title: 'La versión accesible de cada documento ofrece la misma información',
      plain: 'La versión accesible de un documento debe ser tan completa y estar tan actualizada como el original, no ser un resumen.',
    },
    '13.5': {
      title: 'Cada contenido críptico (arte ASCII, emoticono, sintaxis críptica) tiene una alternativa',
      plain: 'Un emoticono hecho con caracteres “:-)” o un dibujo en ASCII se lee carácter por carácter con una síntesis de voz: hace falta una alternativa textual clara.',
    },
    '13.6': {
      title: 'La alternativa de cada contenido críptico es pertinente',
      plain: 'La alternativa debe expresar el significado real del contenido (“sonrisa”, “logotipo en ASCII”…), de forma comprensible.',
    },
    '13.7': {
      title: 'Los destellos y los cambios bruscos de luminosidad se utilizan correctamente',
      plain: 'Más de 3 destellos por segundo pueden provocar crisis de epilepsia fotosensible. Es un criterio de seguridad para las personas afectadas.',
    },
    '13.8': {
      title: 'Cada contenido en movimiento o parpadeante es controlable',
      plain: 'Carruseles automáticos, textos deslizantes, animaciones: la persona usuaria debe poder ponerlos en pausa. Un movimiento permanente impide a algunas personas leer el resto de la página.',
    },
    '13.9': {
      title: 'El contenido se puede consultar sea cual sea la orientación de la pantalla',
      plain: 'El sitio debe funcionar tanto en vertical como en horizontal: algunas personas llevan el dispositivo fijado a una silla de ruedas en una orientación determinada.',
    },
    '13.10': {
      title: 'Los gestos complejos tienen una alternativa con un gesto simple',
      plain: 'Pellizcar para ampliar, deslizar con dos dedos: toda funcionalidad debe funcionar también con una sola pulsación, para las personas con movilidad reducida.',
    },
    '13.11': {
      title: 'Las acciones con el puntero se pueden anular',
      plain: 'Una acción no debe activarse ya al pulsar (pointer-down): hay que poder deslizar fuera del botón para anular un clic accidental.',
    },
    '13.12': {
      title: 'Las funcionalidades activadas por un movimiento del dispositivo tienen una alternativa',
      plain: 'Agitar el teléfono para deshacer, inclinarlo para navegar: hace falta una alternativa mediante un botón convencional y poder desactivar la detección de movimiento.',
    },
}
