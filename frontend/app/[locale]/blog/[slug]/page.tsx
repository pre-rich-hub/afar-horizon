import {getBlogCopy} from '@/features/blog'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {requireLocale} from '@/i18n/locale'
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
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  const { slug, locale: rawLocale } = await params
  const locale = requireLocale(rawLocale)
  setRequestLocale(locale)
  const basep = getPost(slug)
  const p = basep && getBlogCopy('post.posts', basep, locale)
  if (!p) return { title: 'Article not found' }
  return createPageMetadata({
    locale,
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
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale: rawLocale } = await params
  const locale = requireLocale(rawLocale)
  setRequestLocale(locale)
  const basepost = getPost(slug)
  const post = basepost && getBlogCopy('post.posts', basepost, locale)
  if (!post) notFound()

  const { next, more } = getRelatedPosts(post)

  return (
    <article>
      <JsonLd data={postSchema(post, locale, {home: (await getTranslations({locale, namespace: 'Schema'}))('home'), index: (await getTranslations({locale, namespace: 'Schema'}))('blog')})} />
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
