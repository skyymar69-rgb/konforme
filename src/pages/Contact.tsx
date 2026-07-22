import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ORGANIZATION_JSONLD, Seo } from '@/components/Seo'

export function Contact() {
  const [sent, setSent] = useState(false)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = String(fd.get('name') ?? '')
    const subject = String(fd.get('subject') ?? 'Contact Konforme')
    const message = String(fd.get('message') ?? '')
    const body = `${message}\n\n— ${name}`
    // Pas de serveur d'email : on ouvre le client mail de l'utilisateur, pré-rempli.
    window.location.href = `mailto:contact@kayzen-lyon.fr?subject=${encodeURIComponent(`[Konforme] ${subject}`)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <Seo
        title="Contact"
        description="Une question sur l'accessibilité de votre site, le RGAA ou l'EAA ? L'équipe Konforme (Lyon) vous répond sous 24 h ouvrées."
        path="/contact"
        jsonLd={[ORGANIZATION_JSONLD]}
      />
      <p className="text-xs font-semibold uppercase tracking-wider text-link mb-3">Contact</p>
      <h1 className="text-4xl font-extrabold tracking-tight mb-4">Parlons de votre conformité</h1>
      <p className="text-lg text-text-muted mb-10">
        Audit accompagné, question technique ou demande de devis : nous répondons sous 24 h ouvrées.
      </p>

      <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <Card>
          <h2 className="text-lg font-bold mb-4">Écrivez-nous</h2>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="ct-name" className="block text-sm font-semibold mb-1.5">Votre nom</label>
              <input
                id="ct-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className="w-full rounded-[10px] border border-border-strong bg-bg px-3.5 py-2.5 text-sm text-text"
              />
            </div>
            <div>
              <label htmlFor="ct-subject" className="block text-sm font-semibold mb-1.5">Sujet</label>
              <select
                id="ct-subject"
                name="subject"
                className="w-full rounded-[10px] border border-border-strong bg-bg px-3.5 py-2.5 text-sm text-text"
              >
                <option>Demande de devis</option>
                <option>Question sur un audit</option>
                <option>Accessibilité / RGAA</option>
                <option>Autre</option>
              </select>
            </div>
            <div>
              <label htmlFor="ct-message" className="block text-sm font-semibold mb-1.5">Message</label>
              <textarea
                id="ct-message"
                name="message"
                required
                rows={5}
                className="w-full rounded-[10px] border border-border-strong bg-bg px-3.5 py-2.5 text-sm text-text"
              />
            </div>
            <Button type="submit" variant="primary">Envoyer via votre messagerie</Button>
            {sent && (
              <p role="status" className="text-sm text-success-soft">
                Votre logiciel de messagerie s'est ouvert avec le message pré-rempli. Si rien ne
                s'est passé, écrivez-nous directement à contact@kayzen-lyon.fr.
              </p>
            )}
          </form>
        </Card>

        <Card>
          <h2 className="text-lg font-bold mb-4">Coordonnées</h2>
          <address className="not-italic space-y-3 text-sm text-text-soft leading-relaxed">
            <p>
              <strong className="text-text">KAYZEN SASU</strong>
              <br />6 rue Pierre Termier
              <br />69009 Lyon, France
            </p>
            <p>
              <a href="tel:+33487776861" className="text-link hover:underline">+33 (0)4 87 77 68 61</a>
              <br />
              <a href="mailto:contact@kayzen-lyon.fr" className="text-link hover:underline">contact@kayzen-lyon.fr</a>
            </p>
            <p className="text-xs text-text-dim">Du lundi au vendredi, 9 h – 18 h.</p>
          </address>
        </Card>
      </div>
    </div>
  )
}
