import {getRequestConfig} from 'next-intl/server'
import {isLocale} from '@/lib/i18n/locales'

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale
  const locale = requested && isLocale(requested) ? requested : 'en'
  return {locale, timeZone: 'Africa/Addis_Ababa', messages: (await import(`../messages/${locale}.json`)).default}
})
