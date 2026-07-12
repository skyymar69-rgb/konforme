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
      <p className="text-xs font-semibold uppercase tracking-wider text-[#67e8f9] mb-3">Blog</p>
      <h1 className="text-4xl font-extrabold tracking-tight mb-4">
        Accessibilité web, en pratique
      </h1>
      <p className="text-lg text-[#a3b0c9] mb-12">
        Guides RGAA, WCAG et EAA écrits pour les équipes produit et les développeurs.
      </p>

      <ul className="space-y-6">
        {POSTS.map((post) => (
          <li key={post.slug}>
            <article className="rounded-[14px] border border-[#2a3654] bg-[#131a2c]/60 p-7 hover:border-[#3b4970] transition-colors">
              <p className="text-xs text-[#8b98b8] mb-2">
                <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min de lecture
              </p>
              <h2 className="text-xl font-bold tracking-tight mb-2">
                <Link to={`/blog/${post.slug}`} className="hover:text-[#93c5fd] hover:underline underline-offset-4">
                  {post.title}
                </Link>
              </h2>
              <p className="text-sm text-[#a3b0c9] leading-relaxed">{post.description}</p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  )
}
