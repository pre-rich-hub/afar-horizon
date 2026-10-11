'use client'

import { useSiteTranslation } from './TranslationBoundary'
import { translateText } from '@/lib/i18n/translate'

// Explicit scalar props keep server-composed text available at its final render.
export function TranslatedText({ text }: { text: string }) {
  const { locale, messages } = useSiteTranslation()
  return locale === 'en' ? text : translateText(text, messages)
}
