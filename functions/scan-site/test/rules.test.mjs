// Tests unitaires du moteur d'audit RGAA/WCAG (functions/scan-site).
// Chaque règle est vérifiée avec au moins un cas en échec et un cas conforme.
import { describe, it, expect } from 'vitest'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const engine = require('../src/main.js')
const { parse } = require('node-html-parser')

const { RULES, analyzePage, computeScores, accessibleName, runAxe, isForbiddenTarget, SEVERITY_WEIGHT, registrableDomain, isSameSite, discoverLinks } = engine
const { parse: parseHtml } = require('node-html-parser')

function runRule(id, html) {
  const rule = RULES.find((r) => r.id === id)
  if (!rule) throw new Error(`Règle inconnue : ${id}`)
  const doc = parse(html)
  const ids = new Set(
    doc.querySelectorAll('[id]').map((el) => el.getAttribute('id')).filter(Boolean),
  )
  return rule.check(doc, ids)
}

describe('règles — images', () => {
  it('signale une image sans alt', () => {
    const out = runRule('RGAA 1.1 / WCAG 1.1.1', '<img src="a.png">')
    expect(out).toHaveLength(1)
  })
  it('accepte alt vide (décorative) et role=presentation', () => {
    expect(runRule('RGAA 1.1 / WCAG 1.1.1', '<img src="a.png" alt="">')).toHaveLength(0)
    expect(runRule('RGAA 1.1 / WCAG 1.1.1', '<img src="a.png" role="presentation">')).toHaveLength(0)
  })
  it('renvoie null (non applicable) sans image', () => {
    expect(runRule('RGAA 1.1 / WCAG 1.1.1', '<p>rien</p>')).toBeNull()
  })
  it('signale un alt nom de fichier', () => {
    expect(runRule('RGAA 1.3 / WCAG 1.1.1', '<img src="a.png" alt="photo-123.jpg">')).toHaveLength(1)
    expect(runRule('RGAA 1.3 / WCAG 1.1.1', '<img src="a.png" alt="Vue du port de Lyon">')).toHaveLength(0)
  })
  it('signale une zone <area> sans alt', () => {
    const html = '<map><area href="/a" shape="rect"><area href="/b" alt="Accueil"></map>'
    expect(runRule('RGAA 1.1 / WCAG 1.1.1 (area)', html)).toHaveLength(1)
  })
  it('signale un input type=image sans alt', () => {
    expect(runRule('RGAA 1.1 / WCAG 1.1.1 (input image)', '<input type="image" src="go.png">')).toHaveLength(1)
    expect(runRule('RGAA 1.1 / WCAG 1.1.1 (input image)', '<input type="image" src="go.png" alt="Rechercher">')).toHaveLength(0)
  })
  it('signale un svg role=img sans nom accessible', () => {
    expect(runRule('RGAA 1.1 / WCAG 1.1.1 (svg)', '<svg role="img"><path d="M0 0"/></svg>')).toHaveLength(1)
    expect(runRule('RGAA 1.1 / WCAG 1.1.1 (svg)', '<svg role="img" aria-label="Logo"><path/></svg>')).toHaveLength(0)
    expect(runRule('RGAA 1.1 / WCAG 1.1.1 (svg)', '<svg role="img"><title>Logo</title></svg>')).toHaveLength(0)
  })
  it('signale un alt de plus de 250 caractères', () => {
    const long = 'x'.repeat(260)
    expect(runRule('RGAA 1.3 / Alt trop long', `<img src="a.png" alt="${long}">`)).toHaveLength(1)
    expect(runRule('RGAA 1.3 / Alt trop long', '<img src="a.png" alt="courte">')).toHaveLength(0)
  })
})

describe('règles — éléments obligatoires', () => {
  it('signale un lang absent ou invalide', () => {
    expect(runRule('RGAA 8.3 / WCAG 3.1.1', '<html><body></body></html>')).toHaveLength(1)
    expect(runRule('RGAA 8.3 / WCAG 3.1.1', '<html lang="!!"><body></body></html>')).toHaveLength(1)
    expect(runRule('RGAA 8.3 / WCAG 3.1.1', '<html lang="fr"><body></body></html>')).toHaveLength(0)
    expect(runRule('RGAA 8.3 / WCAG 3.1.1', '<html lang="fr-FR"><body></body></html>')).toHaveLength(0)
  })
  it('signale un title absent ou vide', () => {
    expect(runRule('RGAA 8.5 / WCAG 2.4.2', '<head></head>')).toHaveLength(1)
    expect(runRule('RGAA 8.5 / WCAG 2.4.2', '<head><title>  </title></head>')).toHaveLength(1)
    expect(runRule('RGAA 8.5 / WCAG 2.4.2', '<head><title>Accueil — Konforme</title></head>')).toHaveLength(0)
  })
  it('signale les id dupliqués', () => {
    expect(runRule('RGAA 8.2 / HTML valide', '<div id="a"></div><span id="a"></span>')).toHaveLength(1)
    expect(runRule('RGAA 8.2 / HTML valide', '<div id="a"></div><span id="b"></span>')).toHaveLength(0)
  })
})

describe('règles — structuration', () => {
  it('signale h1 absent, h1 multiple et saut de niveau', () => {
    const none = runRule('RGAA 9.1 / WCAG 1.3.1', '<h2>Sous-titre</h2>')
    expect(none.some((o) => o.detail === 'Aucun <h1> sur la page')).toBe(true)
    const multi = runRule('RGAA 9.1 / WCAG 1.3.1', '<h1>A</h1><h1>B</h1>')
    expect(multi.some((o) => o.detail === 'h1 multiple')).toBe(true)
    const skip = runRule('RGAA 9.1 / WCAG 1.3.1', '<h1>A</h1><h3>C</h3>')
    expect(skip.some((o) => String(o.detail).includes('saut'))).toBe(true)
    expect(runRule('RGAA 9.1 / WCAG 1.3.1', '<h1>A</h1><h2>B</h2><h3>C</h3>')).toHaveLength(0)
  })
  it('signale un titre vide', () => {
    expect(runRule('RGAA 9.1 / WCAG 1.3.1 (titre vide)', '<h2>  </h2>')).toHaveLength(1)
    expect(runRule('RGAA 9.1 / WCAG 1.3.1 (titre vide)', '<h2><img src="a.png" alt="Section"></h2>')).toHaveLength(0)
    expect(runRule('RGAA 9.1 / WCAG 1.3.1 (titre vide)', '<h2>Contact</h2>')).toHaveLength(0)
  })
  it('signale un li hors liste', () => {
    expect(runRule('RGAA 8.2 / Listes', '<div><li>item</li></div>')).toHaveLength(1)
    expect(runRule('RGAA 8.2 / Listes', '<ul><li>item</li></ul>')).toHaveLength(0)
    expect(runRule('RGAA 8.2 / Listes', '<div role="list"><li>item</li></div>')).toHaveLength(0)
  })
})

describe('règles — formulaires', () => {
  it('signale un champ sans étiquette', () => {
    expect(runRule('RGAA 11.1 / WCAG 3.3.2', '<input type="text">')).toHaveLength(1)
    expect(runRule('RGAA 11.1 / WCAG 3.3.2', '<label for="e">Email</label><input id="e" type="text">')).toHaveLength(0)
    expect(runRule('RGAA 11.1 / WCAG 3.3.2', '<input type="text" aria-label="Email">')).toHaveLength(0)
    expect(runRule('RGAA 11.1 / WCAG 3.3.2', '<label>Email <input type="text"></label>')).toHaveLength(0)
    expect(runRule('RGAA 11.1 / WCAG 3.3.2', '<input type="hidden">')).toBeNull()
  })
  it('signale un placeholder seul', () => {
    expect(runRule('RGAA 11.10 / WCAG 3.3.2', '<input placeholder="Votre email">')).toHaveLength(1)
    expect(runRule('RGAA 11.10 / WCAG 3.3.2', '<input placeholder="ex." aria-label="Email">')).toHaveLength(0)
  })
  it('signale un label orphelin (for sans id)', () => {
    expect(runRule('RGAA 11.1 / WCAG 3.3.2 (label orphelin)', '<label for="absent">Email</label>')).toHaveLength(1)
    expect(runRule('RGAA 11.1 / WCAG 3.3.2 (label orphelin)', '<label for="e">Email</label><input id="e">')).toHaveLength(0)
  })
  it('signale un bouton sans intitulé', () => {
    expect(runRule('RGAA 11.9 / WCAG 4.1.2', '<button></button>')).toHaveLength(1)
    expect(runRule('RGAA 11.9 / WCAG 4.1.2', '<button aria-label="Fermer"></button>')).toHaveLength(0)
    expect(runRule('RGAA 11.9 / WCAG 4.1.2', '<button>Envoyer</button>')).toHaveLength(0)
  })
  it('signale un fieldset sans legend', () => {
    expect(runRule('RGAA 11.6 / WCAG 1.3.1', '<fieldset><input aria-label="a"></fieldset>')).toHaveLength(1)
    expect(runRule('RGAA 11.6 / WCAG 1.3.1', '<fieldset><legend>Adresse</legend></fieldset>')).toHaveLength(0)
  })
  it("signale un formulaire sans bouton d'envoi", () => {
    expect(runRule('WCAG 3.2.2 / Formulaire', '<form><input type="text" aria-label="q"></form>')).toHaveLength(1)
    expect(runRule('WCAG 3.2.2 / Formulaire', '<form><input type="text" aria-label="q"><button>OK</button></form>')).toHaveLength(0)
    expect(runRule('WCAG 3.2.2 / Formulaire', '<form><input type="text"><input type="submit" value="OK"></form>')).toHaveLength(0)
    // Formulaire sans champ visible : non signalé
    expect(runRule('WCAG 3.2.2 / Formulaire', '<form><input type="hidden"></form>')).toHaveLength(0)
  })
  it('signale un champ email/tel sans autocomplete', () => {
    expect(runRule('WCAG 1.3.5 / Autocomplete', '<input type="email" aria-label="Email">')).toHaveLength(1)
    expect(runRule('WCAG 1.3.5 / Autocomplete', '<input type="email" autocomplete="email" aria-label="Email">')).toHaveLength(0)
  })
})

describe('règles — liens', () => {
  it('signale un lien sans intitulé', () => {
    expect(runRule('RGAA 6.2 / WCAG 2.4.4', '<a href="/x"></a>')).toHaveLength(1)
    expect(runRule('RGAA 6.2 / WCAG 2.4.4', '<a href="/x">Contact</a>')).toHaveLength(0)
    expect(runRule('RGAA 6.2 / WCAG 2.4.4', '<a href="/x"><img src="a.png" alt="Accueil"></a>')).toHaveLength(0)
  })
  it('signale un intitulé générique', () => {
    expect(runRule('RGAA 6.1 / WCAG 2.4.4', '<a href="/x">cliquez ici</a>')).toHaveLength(1)
    expect(runRule('RGAA 6.1 / WCAG 2.4.4', '<a href="/x">Voir nos tarifs</a>')).toHaveLength(0)
  })
  it('signale un lien-image sans alternative', () => {
    expect(runRule('RGAA 6.1 / Lien-image', '<a href="/"><img src="logo.png"></a>')).toHaveLength(1)
    expect(runRule('RGAA 6.1 / Lien-image', '<a href="/"><img src="logo.png" alt="Accueil"></a>')).toHaveLength(0)
  })
  it('signale des éléments interactifs imbriqués', () => {
    expect(runRule('Imbrication / WCAG 4.1.2', '<a href="/x"><button>Go</button></a>')).toHaveLength(1)
    expect(runRule('Imbrication / WCAG 4.1.2', '<a href="/x">Simple</a><button>Go</button>')).toHaveLength(0)
  })
  it('signale target=_blank sans avertissement', () => {
    expect(runRule('RGAA 13.2 / WCAG 3.2.5', '<a href="/x" target="_blank">Doc</a>')).toHaveLength(1)
    expect(runRule('RGAA 13.2 / WCAG 3.2.5', '<a href="/x" target="_blank">Doc (nouvelle fenêtre)</a>')).toHaveLength(0)
  })
})

describe('règles — ARIA et scripts', () => {
  it('signale un rôle ARIA invalide', () => {
    expect(runRule('ARIA role / WCAG 4.1.2', '<div role="bouton">x</div>')).toHaveLength(1)
    expect(runRule('ARIA role / WCAG 4.1.2', '<div role="button">x</div>')).toHaveLength(0)
    // Liste de rôles de repli : valide si au moins un token est connu
    expect(runRule('ARIA role / WCAG 4.1.2', '<div role="doc-toc navigation">x</div>')).toHaveLength(0)
  })
  it('signale une référence ARIA cassée', () => {
    expect(runRule('ARIA refs / WCAG 1.3.1', '<div aria-labelledby="absent">x</div>')).toHaveLength(1)
    expect(runRule('ARIA refs / WCAG 1.3.1', '<span id="t">Titre</span><div aria-labelledby="t">x</div>')).toHaveLength(0)
  })
  it('signale un élément focusable sous aria-hidden', () => {
    expect(runRule('WCAG 4.1.2 / aria-hidden', '<div aria-hidden="true"><a href="/x">lien</a></div>')).toHaveLength(1)
    expect(runRule('WCAG 4.1.2 / aria-hidden', '<div aria-hidden="true"><a href="/x" tabindex="-1">lien</a></div>')).toHaveLength(0)
  })
  it('signale un onclick sur élément non interactif', () => {
    expect(runRule('RGAA 7.3 / WCAG 2.1.1', '<div onclick="go()">Menu</div>')).toHaveLength(1)
    expect(runRule('RGAA 7.3 / WCAG 2.1.1', '<div onclick="go()" role="button" tabindex="0">Menu</div>')).toHaveLength(0)
    expect(runRule('RGAA 7.3 / WCAG 2.1.1', '<button onclick="go()">Menu</button>')).toHaveLength(0)
  })
  it('signale un tabindex positif', () => {
    expect(runRule('RGAA 12.8 / WCAG 2.4.3', '<input tabindex="3" aria-label="x">')).toHaveLength(1)
    expect(runRule('RGAA 12.8 / WCAG 2.4.3', '<input tabindex="0" aria-label="x">')).toHaveLength(0)
  })
})

describe('règles — navigation et consultation', () => {
  it('signale l’absence de <main> et les <main> multiples', () => {
    expect(runRule('RGAA 12.6 / Landmarks', '<body><div>contenu</div></body>')).toHaveLength(1)
    expect(runRule('RGAA 12.6 / Landmarks', '<body><main>a</main><main>b</main></body>')).toHaveLength(1)
    expect(runRule('RGAA 12.6 / Landmarks', '<body><main>contenu</main></body>')).toHaveLength(0)
  })
  it("signale l'absence de lien d'évitement", () => {
    expect(runRule('RGAA 12.7 / WCAG 2.4.1', '<body><a href="/x">Nav</a></body>')).toHaveLength(1)
    expect(runRule('RGAA 12.7 / WCAG 2.4.1', '<a href="#main">Aller au contenu</a>')).toHaveLength(0)
  })
  it('signale un iframe sans title', () => {
    expect(runRule('RGAA 2.1 / WCAG 4.1.2', '<iframe src="/x"></iframe>')).toHaveLength(1)
    expect(runRule('RGAA 2.1 / WCAG 4.1.2', '<iframe src="/x" title="Carte"></iframe>')).toHaveLength(0)
  })
  it('signale un meta refresh', () => {
    expect(runRule('RGAA 13.1 / WCAG 2.2.1', '<meta http-equiv="refresh" content="5;url=/x">')).toHaveLength(1)
  })
  it('signale le zoom bloqué', () => {
    expect(runRule('WCAG 1.4.4 / Zoom', '<meta name="viewport" content="width=device-width, user-scalable=no">')).toHaveLength(1)
    expect(runRule('WCAG 1.4.4 / Zoom', '<meta name="viewport" content="width=device-width, maximum-scale=1">')).toHaveLength(1)
    expect(runRule('WCAG 1.4.4 / Zoom', '<meta name="viewport" content="width=device-width, initial-scale=1">')).toHaveLength(0)
  })
  it('signale le meta viewport absent', () => {
    expect(runRule('WCAG 1.4.10 / Viewport', '<head><title>x</title></head>')).toHaveLength(1)
    expect(runRule('WCAG 1.4.10 / Viewport', '<meta name="viewport" content="width=device-width">')).toHaveLength(0)
  })
})

describe('règles — tableaux, multimédia, présentation', () => {
  it('signale un tableau de données sans th', () => {
    expect(runRule('RGAA 5.6 / WCAG 1.3.1', '<table><tr><td>a</td><td>b</td><td>c</td></tr></table>')).toHaveLength(1)
    expect(runRule('RGAA 5.6 / WCAG 1.3.1', '<table><tr><th>A</th></tr><tr><td>a</td><td>b</td><td>c</td></tr></table>')).toHaveLength(0)
  })
  it('signale un autoplay non muet', () => {
    expect(runRule('RGAA 4.10 / WCAG 1.4.2', '<video autoplay src="v.mp4"></video>')).toHaveLength(1)
    expect(runRule('RGAA 4.10 / WCAG 1.4.2', '<video autoplay muted src="v.mp4"></video>')).toHaveLength(0)
  })
  it('signale une vidéo sans sous-titres', () => {
    expect(runRule('RGAA 4.3 / WCAG 1.2.2', '<video src="v.mp4"></video>')).toHaveLength(1)
    expect(runRule('RGAA 4.3 / WCAG 1.2.2', '<video src="v.mp4"><track kind="captions" srclang="fr"></video>')).toHaveLength(0)
  })
  it('signale les balises obsolètes', () => {
    expect(runRule('RGAA 10.1 / Présentation', '<center>vieux</center>')).toHaveLength(1)
  })
  it('signale un contraste inline insuffisant', () => {
    expect(runRule('Contraste inline / WCAG 1.4.3', '<p style="color:#777;background-color:#888">texte</p>')).toHaveLength(1)
    expect(runRule('Contraste inline / WCAG 1.4.3', '<p style="color:#000;background-color:#fff">texte</p>')).toHaveLength(0)
  })
})

describe('accessibleName', () => {
  it('résout aria-labelledby vers le texte des éléments référencés', () => {
    const doc = parse('<span id="t1">Fermer</span><span id="t2">la fenêtre</span><button aria-labelledby="t1 t2"></button>')
    const btn = doc.querySelector('button')
    expect(accessibleName(btn)).toBe('Fermer la fenêtre')
  })
  it('privilégie aria-label', () => {
    const doc = parse('<button aria-label="Envoyer">X</button>')
    expect(accessibleName(doc.querySelector('button'))).toBe('Envoyer')
  })
})

describe('analyzePage / computeScores', () => {
  const badPage = `<!doctype html><html><head></head><body>
    <img src="a.png">
    <a href="/x"></a>
    <input type="text">
  </body></html>`

  it('collecte les violations et les ensembles applicable/échoué', async () => {
    const page = await analyzePage('https://exemple.fr', badPage, { withAxe: false })
    const ruleIds = page.issues.map((i) => i.rule.id)
    expect(ruleIds).toContain('RGAA 1.1 / WCAG 1.1.1')
    expect(ruleIds).toContain('RGAA 6.2 / WCAG 2.4.4')
    expect(ruleIds).toContain('RGAA 11.1 / WCAG 3.3.2')
    expect(page.failed.has('RGAA 1.1 / WCAG 1.1.1')).toBe(true)
    expect(page.applicable.size).toBeGreaterThan(page.failed.size)
  })

  it('calcule un score de 100 quand aucune règle applicable n’échoue', async () => {
    const cleanPage = `<!doctype html><html lang="fr"><head><title>Page propre</title>
      <meta name="viewport" content="width=device-width, initial-scale=1"></head>
      <body><a href="#main">Aller au contenu</a><main id="main"><h1>Bienvenue</h1>
      <p>Contenu.</p></main></body></html>`
    const page = await analyzePage('https://exemple.fr', cleanPage, { withAxe: false })
    expect(page.issues).toHaveLength(0)
    expect(page.score).toBe(100)
    const scores = computeScores([page])
    expect(scores.score).toBe(100)
    expect(scores.rgaa_score).toBe(100)
    expect(scores.wcag_score).toBe(100)
  })

  it('agrège les scores sur plusieurs pages', async () => {
    const p1 = await analyzePage('https://exemple.fr/a', badPage, { withAxe: false })
    const scores = computeScores([p1])
    expect(scores.score).toBeLessThan(100)
    expect(scores.score).toBeGreaterThanOrEqual(0)
  })

  it('pondère par sévérité : un échec critique pèse plus qu’un mineur', () => {
    const mk = (sev, fails) => {
      const applicable = new Map([
        ['r1', { severity: sev, rgaa: true, wcag: true }],
        ['r2', { severity: 'serious', rgaa: true, wcag: true }],
        ['r3', { severity: 'serious', rgaa: true, wcag: true }],
      ])
      return { applicable, failed: new Set(fails ? ['r1'] : []) }
    }
    const critical = computeScores([mk('critical', true)])
    const minor = computeScores([mk('minor', true)])
    expect(critical.score).toBeLessThan(minor.score)
    expect(SEVERITY_WEIGHT.critical).toBeGreaterThan(SEVERITY_WEIGHT.minor)
  })
})

describe('axe-core (jsdom)', () => {
  it('détecte des violations WCAG supplémentaires en français', async () => {
    const html = `<!doctype html><html lang="fr"><head><title>t</title></head><body>
      <main><h1>Titre</h1>
        <div role="checkbox">case</div>
        <table><tr><th></th></tr><tr><td>x</td></tr></table>
      </main></body></html>`
    const res = await runAxe('https://exemple.fr/', html)
    expect(res.issues.length).toBeGreaterThan(0)
    expect([...res.applicable.keys()].every((id) => id.startsWith('axe:'))).toBe(true)
    // aria-required-attr : un role=checkbox sans aria-checked
    expect(res.failed.has('axe:aria-required-attr')).toBe(true)
    const issue = res.issues.find((i) => i.rule.id === 'axe:aria-required-attr')
    expect(issue.rule.title.length).toBeGreaterThan(5)
    expect(issue.rule.wcag ?? true).toBeTruthy()
  })

  it("ne re-signale pas ce que les règles maison couvrent (dédoublonnage)", async () => {
    const res = await runAxe('https://exemple.fr/', '<!doctype html><html><body><img src="a.png"></body></html>')
    expect(res.failed.has('axe:image-alt')).toBe(false)
    expect(res.failed.has('axe:html-has-lang')).toBe(false)
  })

  it('analyzePage fusionne règles maison et axe', async () => {
    const html = `<!doctype html><html><head></head><body><img src="a.png">
      <div role="checkbox">case</div></body></html>`
    const page = await analyzePage('https://exemple.fr/', html)
    const ids = page.issues.map((i) => i.rule.id)
    expect(ids).toContain('RGAA 1.1 / WCAG 1.1.1')
    expect(ids.some((id) => id.startsWith('axe:'))).toBe(true)
  })
})

describe('crawl multi-sous-domaines', () => {
  it('calcule le domaine enregistrable (suffixes composés inclus)', () => {
    expect(registrableDomain('internet.kayzen-lyon.fr')).toBe('kayzen-lyon.fr')
    expect(registrableDomain('kayzen-lyon.fr')).toBe('kayzen-lyon.fr')
    expect(registrableDomain('www.exemple.com')).toBe('exemple.com')
    expect(registrableDomain('shop.exemple.co.uk')).toBe('exemple.co.uk')
    expect(registrableDomain('ville.gouv.fr')).toBe('ville.gouv.fr')
  })
  it('considère les sous-domaines comme le même site', () => {
    const base = new URL('https://internet.kayzen-lyon.fr/')
    expect(isSameSite(new URL('https://kayzen-lyon.fr/contact'), base)).toBe(true)
    expect(isSameSite(new URL('https://www.kayzen-lyon.fr/'), base)).toBe(true)
    expect(isSameSite(new URL('https://autre-site.fr/'), base)).toBe(false)
    expect(isSameSite(new URL('https://kayzen-lyon.fr.evil.com/'), base)).toBe(false)
  })
  it('discoverLinks suit les liens vers les sous-domaines mais pas ailleurs', () => {
    const html = `<a href="https://kayzen-lyon.fr/services">a</a>
      <a href="https://www.kayzen-lyon.fr/equipe">b</a>
      <a href="/contact">c</a>
      <a href="https://facebook.com/kayzen">externe</a>
      <a href="https://127.0.0.1/admin">interdit</a>`
    const links = discoverLinks(parseHtml(html), new URL('https://internet.kayzen-lyon.fr/'), 10)
    expect(links).toContain('https://kayzen-lyon.fr/services')
    expect(links).toContain('https://www.kayzen-lyon.fr/equipe')
    expect(links).toContain('https://internet.kayzen-lyon.fr/contact')
    expect(links.some((l) => l.includes('facebook'))).toBe(false)
    expect(links.some((l) => l.includes('127.0.0.1'))).toBe(false)
  })
})

describe('parseSitemapLocs (plan B pour les SPA)', () => {
  it('extrait les URLs des balises <loc>', () => {
    const xml = `<?xml version="1.0"?><urlset>
      <url><loc>https://exemple.fr/</loc></url>
      <url><loc> https://exemple.fr/services </loc></url>
      <url><loc>https://exemple.fr/contact</loc></url>
    </urlset>`
    expect(engine.parseSitemapLocs(xml)).toEqual([
      'https://exemple.fr/',
      'https://exemple.fr/services',
      'https://exemple.fr/contact',
    ])
  })
  it('renvoie une liste vide sans <loc>', () => {
    expect(engine.parseSitemapLocs('<html>pas un sitemap</html>')).toEqual([])
  })
})

describe('isForbiddenTarget (anti-SSRF)', () => {
  it('refuse les cibles locales et privées', () => {
    for (const u of [
      'http://localhost/', 'http://127.0.0.1/', 'http://10.0.0.5/', 'http://192.168.1.1/',
      'http://172.16.0.1/', 'http://169.254.169.254/latest/meta-data', 'http://0.0.0.0/',
      'http://foo.local/', 'http://[::1]/',
    ]) {
      expect(isForbiddenTarget(new URL(u)), u).toBe(true)
    }
  })
  it('accepte les cibles publiques', () => {
    for (const u of ['https://example.com/', 'https://konforme-neon.vercel.app/', 'http://8.8.8.8/']) {
      expect(isForbiddenTarget(new URL(u)), u).toBe(false)
    }
  })
})
