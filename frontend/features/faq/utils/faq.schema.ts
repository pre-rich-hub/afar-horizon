import { schemaUrl } from '@/lib/seo/schema'
import { faqGroups } from '../data/faq.data'

export function faqSchema() {
  return {
    '@context': 'https://schema.org', '@type': 'FAQPage', '@id': `${schemaUrl('/faq')}#faq`,
    mainEntity: faqGroups.flatMap(g => g.items.map(f => ({
      '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a },
    }))),
  }
}
