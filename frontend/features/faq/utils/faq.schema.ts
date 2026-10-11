import { schemaUrl } from '@/lib/seo/schema'
import { faqGroups } from '../data/faq.data'

export function faqSchema(groups = faqGroups, locale: import('@/lib/i18n/locales').Locale = 'en') {
  return {
    '@context': 'https://schema.org', '@type': 'FAQPage', '@id': `${schemaUrl('/faq', locale)}#faq`,
    mainEntity: groups.flatMap(g => g.items.map(f => ({
      '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a },
    }))),
  }
}
