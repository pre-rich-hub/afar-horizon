'use client'

import { serializeJsonLd } from '@/lib/seo/json-ld'
import { useSiteTranslation } from './TranslationBoundary'
import { translateSchema } from '@/lib/i18n/translate'

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const { locale, messages, paths, origin } = useSiteTranslation()
  const localized = locale === 'en' ? data : translateSchema(data, locale, messages, paths, origin)
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(localized as Record<string, unknown>) }} />
}
