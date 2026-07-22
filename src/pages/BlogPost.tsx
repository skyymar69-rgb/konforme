import { Link, useParams } from 'react-router-dom'
import { Seo, SITE_URL } from '@/components/Seo'
import { POSTS } from '@/content/posts'
import { formatDate } from '@/lib/format'
import { NotFound } from '@/pages/NotFound'
import { Button } from '@/components/ui/button'

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = POSTS.find((p) => p.slug === slug)
  if (!post) return <NotFound />

  return (
    <article className="mx-auto max-w-3xl px-6 py-14">
      <Seo
        title={post.title}
        description={post.description}
        path={`/blog/${post.slug}`}
        type="article"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            inLanguage: 'fr-FR',
            url: `${SITE_URL}/blog/${post.slug}`,
            author: { '@type': 'Organization', name: 'Konforme' },
            publisher: { '@type': 'Organization', name: 'KAYZEN SASU' },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Blog', item: `${SITE_URL}/blog` },
              { '@type': 'ListItem', position: 2, name: post.title },
            ],
          },
        ]}
      />

      <nav aria-label="Fil d'Ariane" className="text-sm text-text-dim mb-6">
        <Link to="/blog" className="hover:text-white hover:underline">← Tous les articles</Link>
      </nav>

      <header className="mb-10">
        <p className="text-xs text-text-dim mb-3">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min de lecture
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
          {post.title}
        </h1>
      </header>

      <div className="space-y-8">
        {post.sections.map((section, i) => (
          <section key={i}>
            {section.heading && (
              <h2 className="text-2xl font-bold tracking-tight mb-3">{section.heading}</h2>
            )}
            {section.paragraphs.map((p, j) => (
              <p key={j} className="text-text-soft leading-relaxed mb-4">{p}</p>
            ))}
            {section.list && (
              <ul className="space-y-2 text-text-soft leading-relaxed list-disc pl-5">
                {section.list.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <div className="mt-14 rounded-[14px] border border-primary/40 bg-primary/10 p-8 text-center">
        <h2 className="text-xl font-bold mb-2">Où en est votre site ?</h2>
        <p className="text-sm text-text-muted mb-5">
          Audit d'accessibilité automatisé RGAA / WCAG, résultat en une minute.
        </p>
        <Link to="/login">
          <Button variant="primary">Lancer un audit gratuit</Button>
        </Link>
      </div>
    </article>
  )
}
