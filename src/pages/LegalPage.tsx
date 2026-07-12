import { useParams } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { LEGAL_DOCS } from '@/content/legal'
import { formatDate } from '@/lib/format'
import { NotFound } from '@/pages/NotFound'

export function LegalPage() {
  const { slug } = useParams<{ slug: string }>()
  const doc = LEGAL_DOCS.find((d) => d.slug === slug)
  if (!doc) return <NotFound />

  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <Seo title={doc.title} description={doc.description} path={`/legal/${doc.slug}`} />
      <p className="text-xs font-semibold uppercase tracking-wider text-[#67e8f9] mb-3">Légal</p>
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">{doc.title}</h1>
      <p className="text-sm text-[#8b98b8] mb-8">
        Dernière mise à jour : <time dateTime={doc.updated}>{formatDate(doc.updated)}</time>
      </p>
      <div>{doc.body}</div>
    </div>
  )
}
