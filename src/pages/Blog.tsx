import { Link } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { POSTS } from '@/content/posts'
import { formatDate } from '@/lib/format'

export function Blog() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <Seo
        title="Blog accessibilité web : RGAA, WCAG, EAA"
        description="Guides pratiques et actualités sur l'accessibilité numérique : RGAA 4.1, WCAG 2.2, European Accessibility Act, corrections concrètes."
        path="/blog"
      />
      <p className="text-xs font-semibold uppercase tracking-wider text-link mb-3">Blog</p>
      <h1 className="text-4xl font-extrabold tracking-tight mb-4">
        Accessibilité web, en pratique
      </h1>
      <p className="text-lg text-text-muted mb-12">
        Guides RGAA, WCAG et EAA écrits pour les équipes produit et les développeurs.
      </p>

      <ul className="space-y-6">
        {POSTS.map((post) => (
          <li key={post.slug}>
            <article className="rounded-[14px] border border-border bg-surface/60 p-7 hover:border-border-strong transition-colors">
              <p className="text-xs text-text-dim mb-2">
                <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min de lecture
              </p>
              <h2 className="text-xl font-bold tracking-tight mb-2">
                <Link to={`/blog/${post.slug}`} className="hover:text-primary-soft hover:underline underline-offset-4">
                  {post.title}
                </Link>
              </h2>
              <p className="text-sm text-text-muted leading-relaxed">{post.description}</p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  )
}
