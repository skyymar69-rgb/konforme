import type { Post } from '@/content/posts'

/** Articles de blog traduits en anglais. */
export const POSTS_EN: Post[] = [
  {
    slug: 'european-accessibility-act-2025-obligations',
    title: 'EAA 2025: which accessibility obligations apply to your website?',
    description:
      'The European Accessibility Act has applied since 28 June 2025. Who is covered, what the risks are, and where to start to bring your website into compliance.',
    date: '2026-06-02',
    readingMinutes: 6,
    sections: [
      {
        paragraphs: [
          '28 June 2025 marked a turning point: the European Accessibility Act (EU Directive 2019/882) became applicable across the entire European Union. For the first time, digital accessibility obligations no longer concern only the public sector, but the majority of consumer-facing private digital services.',
        ],
      },
      {
        heading: 'Who is covered?',
        paragraphs: [
          'The following are notably targeted: e-commerce (any website selling online), banking services, transport (ticketing, applications), e-books, audiovisual media services and electronic communications. Service micro-enterprises (fewer than 10 employees and less than EUR 2M in annual turnover) benefit from an exemption — but it does not cover the products they sell.',
          'In France, the directive is transposed by French act no. 2023-171 and its implementing decrees. The supervisory authorities (the DGCCRF, the French consumer-protection authority, ARCOM, the French audiovisual and digital regulator, and the Banque de France, depending on the sector) may impose penalties and require compliance.',
        ],
      },
      {
        heading: 'What do you actually need to do?',
        paragraphs: ['The process comes down to four steps:'],
        list: [
          'Audit: measure the gap against WCAG 2.1/2.2 level AA (RGAA 4.1.2 in France).',
          'Fix: address critical blockers first — images without alternative text, form fields without labels, insufficient contrast, keyboard navigation that is impossible.',
          'Declare: publish an accessibility statement setting out your level of compliance and the available means of redress.',
          'Maintain: every release can reintroduce regressions; recurring audits are essential.',
        ],
      },
      {
        heading: 'The risk of doing nothing',
        paragraphs: [
          'Beyond administrative penalties, an inaccessible website shuts out 15 to 20% of users (visual, motor, hearing or cognitive impairments — permanent or temporary). It is also an SEO factor: a well-structured site, with text alternatives and clean semantics, is better understood by search engines.',
          'An automated Konforme audit takes less than a minute and immediately gives you a prioritised list of your non-conformities. It is the most cost-effective first step towards compliance.',
        ],
      },
    ],
  },
  {
    slug: 'rgaa-vs-wcag-differences',
    title: 'RGAA vs WCAG: what sets them apart, and which one should you target?',
    description:
      'The RGAA applies WCAG to the French context. Understand what distinguishes them so you can choose the right framework and avoid compliance mistakes.',
    date: '2026-05-12',
    readingMinutes: 5,
    sections: [
      {
        paragraphs: [
          'WCAG, RGAA, EN 301 549… accessibility frameworks form a layer cake that discourages more than one team. The good news: they fit together logically.',
        ],
      },
      {
        heading: 'WCAG: the international foundation',
        paragraphs: [
          'The Web Content Accessibility Guidelines, published by the W3C, define success criteria classified into three levels (A, AA, AAA). Level AA is the near-universal legal target. Version 2.2 (October 2023) adds 9 criteria, notably on focus visibility and alternatives to dragging movements.',
        ],
      },
      {
        heading: 'RGAA: the French implementation method',
        paragraphs: [
          'RGAA 4.1.2 translates WCAG into 106 criteria and more than 2,500 operational tests. It specifies how to test what WCAG sometimes leaves open to interpretation. It is mandatory for the French public sector and serves as the reference for audits carried out in France.',
          'In practice: being RGAA compliant implies being WCAG 2.1 AA compliant. The reverse is not guaranteed, because the RGAA imposes more precise tests (for example on the mandatory elements of the HTML document).',
        ],
      },
      {
        heading: 'Which one should you target?',
        paragraphs: [
          'If your market is French: target the RGAA — it includes WCAG and it is the framework French auditors will use. If your product is international: WCAG 2.2 AA is enough, and it is the reference adopted by the EAA through the EN 301 549 standard.',
          'Konforme measures both: every audit produces an RGAA 4.1.2 score and a WCAG 2.2 score, with cross-references on each non-conformity.',
        ],
      },
    ],
  },
  {
    slug: '10-erreurs-accessibilite-les-plus-courantes',
    title: 'The 10 most common accessibility mistakes (and how to fix them)',
    description:
      'Images without alt text, contrast that is too low, "click here" links… the top 10 non-conformities found on French websites, with the fix for each one.',
    date: '2026-04-20',
    readingMinutes: 7,
    sections: [
      {
        paragraphs: [
          'Across the thousands of pages analysed, the same mistakes come back time and time again. Fixing them covers most of the real barriers encountered by users of assistive technologies.',
        ],
      },
      {
        heading: 'The top 10',
        paragraphs: [],
        list: [
          '1. Images without a text alternative — add alt="…" (or alt="" if decorative).',
          '2. Insufficient contrast — aim for 4.5:1 for normal text and 3:1 for large text.',
          '3. Form fields without a label — every input must have an associated label.',
          '4. Empty links or "click here" — the link text must describe the destination.',
          '5. Broken heading hierarchy — a single h1, and no skipped levels.',
          '6. Icon buttons without an accessible name — add aria-label.',
          '7. Zoom disabled on mobile — remove user-scalable=no from the viewport.',
          '8. Iframes without a title — every iframe must describe its content.',
          '9. No skip link — let users jump straight to the main content.',
          '10. Invisible keyboard focus — never remove outline without a visible alternative.',
        ],
      },
      {
        heading: 'How do you detect them on your own site?',
        paragraphs: [
          'Nine of these ten mistakes can be detected automatically. A Konforme audit identifies them in one minute, page by page, with the HTML code concerned and the fix to apply. Run a free audit and you will know exactly where you stand.',
        ],
      },
    ],
  },
]
