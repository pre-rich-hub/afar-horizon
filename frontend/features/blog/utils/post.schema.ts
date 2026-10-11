import type {Locale} from '@/lib/i18n/locales'
import { breadcrumbSchema, businessId, schemaUrl, websiteId } from '@/lib/seo/schema'
import { isoDate } from '@/lib/utils/date'
import type { Post } from '../types/post.types'

export function postSchema(post: Post, locale: Locale = 'en', labels = {home: 'Home', index: 'The Journal'}) {
  const path = `/blog/${post.slug}`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbSchema([{ name: labels.home, path: '/' }, { name: labels.index, path: '/blog' }, { name: post.title, path }], locale),
      {
        '@type': 'BlogPosting', '@id': `${schemaUrl(path, locale)}#article`,
        url: schemaUrl(path, locale), mainEntityOfPage: schemaUrl(path, locale),
        headline: post.title, description: post.excerpt, image: [post.image],
        articleSection: post.category, inLanguage: locale,
        isPartOf: { '@id': websiteId }, publisher: { '@id': businessId },
        author: post.author === 'Afar Horizon' ? { '@id': businessId } : { '@type': 'Person', name: post.author },
        ...(post.publishedAt ? { datePublished: isoDate(post.publishedAt) } : {}),
        ...(post.updatedAt ? { dateModified: isoDate(post.updatedAt) } : {}),
      },
    ],
  }
}
