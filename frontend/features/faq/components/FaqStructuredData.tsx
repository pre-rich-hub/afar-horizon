import { JsonLd } from '@/components/common/JsonLd'
import { faqSchema } from '../utils/faq.schema'

export function FaqStructuredData() {
  return <JsonLd data={faqSchema()} />
}
