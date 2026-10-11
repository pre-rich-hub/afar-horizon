import {localePath, type Locale} from '@/lib/i18n/locales'
import { site } from '@/lib/config/site'

export const businessId = `${site.url}/#organization`
export const websiteId = `${site.url}/#website`
export const schemaUrl = (path: string, locale: Locale = 'en') => new URL(localePath(path, locale), `${site.url}/`).href

export function breadcrumbSchema(items: { name: string; path: string }[], locale: Locale = 'en') {
  return {
    '@type': 'BreadcrumbList', '@id': `${schemaUrl(items[items.length - 1].path, locale)}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem', position: i + 1, name: item.name, item: schemaUrl(item.path, locale),
    })),
  }
}
