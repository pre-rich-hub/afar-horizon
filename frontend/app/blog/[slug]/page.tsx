import { createPageMetadata } from '@/lib/seo/metadata'
import { ArticleBody, ArticleHeader, ArticleImage, ArticlePlanning, getPost, getRelatedPosts, posts, RelatedPosts } from '@/features/blog'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/common/JsonLd'
import { postSchema } from '@/features/blog'

export const dynamicParams = false

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const p = getPost(slug)
  if (!p) return { title: 'Article not found' }
  return createPageMetadata({
    title: p.title,
    description: p.excerpt,
    path: `/blog/${p.slug}`,
    image: p.image,
    imageAlt: p.imageAlt ?? p.title,
    type: 'article',
    author: p.author,
  })
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const { next, more } = getRelatedPosts(post)

  return (
    <article>
      <JsonLd data={postSchema(post)} />
      {/* Header */}
      <ArticleHeader post={post} />

      {/* Lead image */}
      <ArticleImage post={post} />

      {/* Body */}
      <ArticleBody post={post} next={next} />

      {/* More reading */}
      <RelatedPosts more={more} />

      <ArticlePlanning post={post} />
    </article>
  )
}
