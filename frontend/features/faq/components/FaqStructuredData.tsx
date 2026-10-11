import {useLocale} from 'next-intl'
import {useFaqCopy} from '../data/localized'
import {faqGroups} from '../data/faq.data'
import type {Locale} from '@/lib/i18n/locales'

import { JsonLd } from '@/components/common/JsonLd'
import { faqSchema } from '../utils/faq.schema'

export function FaqStructuredData() {
  const groups = useFaqCopy('faq.faqGroups', faqGroups)
  return <JsonLd data={faqSchema(groups, useLocale() as Locale)} />
}
