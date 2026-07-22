// Konforme — assistant IA : explique une non-conformité et propose le
// correctif adapté au code réel de la page. Nécessite ANTHROPIC_API_KEY
// dans les variables de la fonction ; sans clé, renvoie 503 et le front
// masque simplement la fonctionnalité.
const MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-5'
const MAX_INPUT_CHARS = 4000

module.exports = async ({ req, res, log, error }) => {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.json({ error: "L'assistant IA n'est pas activé sur cette instance." }, 503)
  }

  let body = {}
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {})
  } catch {
    return res.json({ error: 'Corps JSON invalide' }, 400)
  }
  const title = String(body.title || '').slice(0, 300)
  const ruleId = String(body.rule_id || '').slice(0, 100)
  const description = String(body.description || '').slice(0, 1500)
  const snippet = String(body.html_snippet || '').slice(0, MAX_INPUT_CHARS)
  const selector = String(body.selector || '').slice(0, 500)
  const fix = String(body.suggested_fix || '').slice(0, 1000)
  if (!title) return res.json({ error: 'title requis' }, 400)

  const prompt = `Tu es un expert en accessibilité web (RGAA 4.1 / WCAG 2.2) qui aide un développeur français.

Non-conformité détectée par l'audit automatique :
- Règle : ${ruleId} — ${title}
- Description : ${description || '(non fournie)'}
- Sélecteur CSS : ${selector || '(non fourni)'}
- Piste générique : ${fix || '(non fournie)'}
${snippet ? `- Code HTML concerné :\n\`\`\`html\n${snippet}\n\`\`\`` : ''}

Réponds en français, de façon concise et directement actionnable :
1. **Pourquoi c'est un problème** (1-2 phrases, impact utilisateur concret).
2. **Le correctif** : le code HTML corrigé, adapté au code fourni (bloc \`\`\`html).
3. **Comment vérifier** (1 phrase : test clavier, lecteur d'écran ou re-scan).

Pas de préambule, pas de conclusion générique.`

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 900,
        messages: [{ role: 'user', content: prompt }],
      }),
    })
    const data = await r.json()
    if (!r.ok) {
      error(`API Anthropic ${r.status}: ${JSON.stringify(data).slice(0, 300)}`)
      return res.json({ error: "L'assistant IA est momentanément indisponible." }, 502)
    }
    const text = (data.content || [])
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
      .trim()
    log(`Explication générée (${text.length} caractères) pour ${ruleId}`)
    return res.json({ explanation: text })
  } catch (e) {
    error(String(e))
    return res.json({ error: "L'assistant IA est momentanément indisponible." }, 502)
  }
}
