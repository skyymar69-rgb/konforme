import type { Post } from '@/content/posts'

/** Articles de blog traduits en espagnol. */
export const POSTS_ES: Post[] = [
  {
    slug: 'european-accessibility-act-2025-obligations',
    title: '¿Qué obligaciones de accesibilidad impone la EAA 2025 a su sitio web?',
    description:
      'Desde el 28 de junio de 2025 se aplica el European Accessibility Act. Quién está afectado, qué riesgos existen y por dónde empezar para adecuar su sitio web.',
    date: '2026-06-02',
    readingMinutes: 6,
    sections: [
      {
        paragraphs: [
          'El 28 de junio de 2025 marcó un punto de inflexión: el European Accessibility Act (Directiva UE 2019/882) entró en aplicación en toda la Unión Europea. Por primera vez, la obligación de accesibilidad digital ya no afecta únicamente al sector público, sino a la mayoría de los servicios digitales privados dirigidos al gran público.',
        ],
      },
      {
        heading: '¿Quién está afectado?',
        paragraphs: [
          'Están especialmente afectados: el comercio electrónico (todo sitio que venda en línea), los servicios bancarios, el transporte (venta de billetes, aplicaciones), los libros digitales, los medios audiovisuales y las comunicaciones electrónicas. Las microempresas de servicios (menos de 10 empleados y menos de 2 M€ de facturación) disfrutan de una exención, pero esta no cubre los productos que comercializan.',
          'En Francia, la directiva se transpone mediante la ley francesa n.º 2023-171 y sus decretos de aplicación. Las autoridades de control (la DGCCRF —la autoridad francesa de protección del consumidor—, la ARCOM —el regulador francés de la comunicación audiovisual y digital— y el Banco de Francia, según el sector) pueden imponer sanciones y exigir la subsanación.',
        ],
      },
      {
        heading: '¿Qué hay que hacer en la práctica?',
        paragraphs: ['El proceso se resume en cuatro etapas:'],
        list: [
          'Auditar: medir la distancia respecto a las WCAG 2.1/2.2 nivel AA (el RGAA 4.1.2 en Francia).',
          'Corregir: tratar de forma prioritaria los bloqueos críticos: imágenes sin alternativa, formularios sin etiqueta, contrastes insuficientes, navegación por teclado imposible.',
          'Declarar: publicar una declaración de accesibilidad que indique su nivel de conformidad y las vías de reclamación.',
          'Mantener: cada puesta en producción puede reintroducir regresiones; una auditoría recurrente resulta indispensable.',
        ],
      },
      {
        heading: 'El riesgo de no hacer nada',
        paragraphs: [
          'Más allá de las sanciones administrativas, la inaccesibilidad priva a su sitio web de entre un 15 y un 20 % de usuarios (con discapacidad visual, motriz, auditiva o cognitiva, permanente o temporal). Es también un factor SEO: un sitio bien estructurado, con alternativas textuales y una semántica limpia, resulta mejor comprendido por los motores de búsqueda.',
          'Una auditoría automatizada de Konforme tarda menos de un minuto y le ofrece de inmediato la lista priorizada de sus incumplimientos. Es el primer paso más rentable de su proceso de adecuación.',
        ],
      },
    ],
  },
  {
    slug: 'rgaa-vs-wcag-differences',
    title: 'RGAA frente a WCAG: ¿qué diferencias hay y cuál conviene aplicar?',
    description:
      'El RGAA aplica las WCAG al contexto francés. Comprenda lo que los distingue para elegir el referencial adecuado y evitar errores de conformidad.',
    date: '2026-05-12',
    readingMinutes: 5,
    sections: [
      {
        paragraphs: [
          'WCAG, RGAA, EN 301 549… los referenciales de accesibilidad forman un entramado de capas que desanima a más de un equipo. La buena noticia: encajan entre sí de forma lógica.',
        ],
      },
      {
        heading: 'WCAG: la base internacional',
        paragraphs: [
          'Las Web Content Accessibility Guidelines, publicadas por el W3C, definen criterios de éxito clasificados en tres niveles (A, AA, AAA). El nivel AA es el objetivo legal prácticamente universal. La versión 2.2 (octubre de 2023) añade 9 criterios, en particular sobre la visibilidad del foco y las alternativas a los gestos de arrastrar y soltar.',
        ],
      },
      {
        heading: 'RGAA: el método de aplicación francés',
        paragraphs: [
          'El RGAA 4.1.2 traduce las WCAG en 106 criterios y más de 2.500 pruebas operativas. Precisa cómo probar aquello que las WCAG dejan a veces a la interpretación. Es obligatorio para el sector público francés y sirve de referencia en las auditorías realizadas en Francia.',
          'En concreto: ser conforme con el RGAA implica ser conforme con las WCAG 2.1 AA. Lo contrario no está garantizado, ya que el RGAA impone pruebas más precisas (por ejemplo, sobre los elementos obligatorios del documento HTML).',
        ],
      },
      {
        heading: '¿Cuál conviene aplicar?',
        paragraphs: [
          'Si su mercado es francés, apunte al RGAA: incluye las WCAG y es el que utilizarán los auditores franceses. Si su producto es internacional, las WCAG 2.2 AA bastan, y son la referencia adoptada por la EAA a través de la norma EN 301 549.',
          'Konforme mide ambos: cada auditoría produce una puntuación RGAA 4.1.2 y una puntuación WCAG 2.2, con las referencias cruzadas en cada incumplimiento.',
        ],
      },
    ],
  },
  {
    slug: '10-erreurs-accessibilite-les-plus-courantes',
    title: 'Los 10 errores de accesibilidad más frecuentes (y cómo corregirlos)',
    description:
      'Imágenes sin alt, contrastes demasiado bajos, enlaces del tipo «haga clic aquí»… el top 10 de incumplimientos detectados en los sitios franceses, con la corrección de cada uno.',
    date: '2026-04-20',
    readingMinutes: 7,
    sections: [
      {
        paragraphs: [
          'De entre los miles de páginas analizadas, los mismos errores se repiten incansablemente. Corregirlos cubre lo esencial de los bloqueos reales que encuentran los usuarios de tecnologías de apoyo.',
        ],
      },
      {
        heading: 'El top 10',
        paragraphs: [],
        list: [
          '1. Imágenes sin alternativa textual: añada alt="…" (o alt="" si es decorativa).',
          '2. Contrastes insuficientes: apunte a 4,5:1 para el texto normal y a 3:1 para el texto grande.',
          '3. Campos de formulario sin etiqueta: cada input debe tener un label asociado.',
          '4. Enlaces vacíos o del tipo «haga clic aquí»: el texto debe describir el destino.',
          '5. Jerarquía de encabezados rota: un solo h1, sin saltos de nivel.',
          '6. Botones de icono sin nombre accesible: añada aria-label.',
          '7. Zoom bloqueado en móvil: elimine user-scalable=no del viewport.',
          '8. Iframes sin título: cada iframe debe describir su contenido.',
          '9. Ausencia de enlace de salto: permita ir directamente al contenido.',
          '10. Foco de teclado invisible: nunca suprima outline sin una alternativa visible.',
        ],
      },
      {
        heading: '¿Cómo detectarlos en su sitio?',
        paragraphs: [
          'Nueve de estos diez errores se pueden detectar automáticamente. Una auditoría de Konforme los identifica en un minuto, página por página, con el código HTML afectado y la corrección que debe aplicarse. Lance una auditoría gratuita y sabrá de inmediato en qué situación se encuentra.',
        ],
      },
    ],
  },
]
