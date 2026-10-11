import {defineRouting} from 'next-intl/routing'
import {languages} from '@/lib/i18n/locales'

export const routing = defineRouting({
  locales: languages.map(language => language.locale),
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeDetection: false,
  localeCookie: false,
  alternateLinks: false, // Publish only client-approved alternates through SEO helpers.
})
