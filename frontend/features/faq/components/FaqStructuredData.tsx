
import { TranslationBoundary } from '@/components/common/TranslationBoundary'
import { JsonLd } from '@/components/common/JsonLd'
import { faqSchema } from '../utils/faq.schema'

export function FaqStructuredData() {
  return <TranslationBoundary><JsonLd data={faqSchema()} /></TranslationBoundary>
}
