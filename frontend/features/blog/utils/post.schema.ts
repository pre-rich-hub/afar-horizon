import { breadcrumbSchema, businessId, schemaUrl, websiteId } from '@/lib/seo/schema'
import { isoDate } from '@/lib/utils/date'
import type { Post } from '../types/post.types'

export function postSchema(post: Post) {
  const path = `/blog/${post.slug}`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'The Journal', path: '/blog' }, { name: post.title, path }]),
      {
        '@type': 'BlogPosting', '@id': `${schemaUrl(path)}#article`,
        url: schemaUrl(path), mainEntityOfPage: schemaUrl(path),
        headline: post.title, description: post.excerpt, image: [post.image],
        articleSection: post.category, inLanguage: 'en',
        isPartOf: { '@id': websiteId }, publisher: { '@id': businessId },
        author: post.author === 'Afar Horizon' ? { '@id': businessId } : { '@type': 'Person', name: post.author },
        ...(post.publishedAt ? { datePublished: isoDate(post.publishedAt) } : {}),
        ...(post.updatedAt ? { dateModified: isoDate(post.updatedAt) } : {}),
      },
    ],
  }
}
