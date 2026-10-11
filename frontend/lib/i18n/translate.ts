import { localePath, type Locale } from './locales'

export type Messages = Record<string, string>
export const normalizeText = (text: string) => text.replace(/\s+/g, ' ').trim()

export function translateText(text: string, messages: Messages) {
  const key = normalizeText(text)
  // Preserve numeric prices and the business's proper name.
  if (!key || /[$€£]\s*\d/.test(key) || key === 'Afar Horizon Expeditions' || key === 'Afar Horizon') return text
  const translated = messages[key]
  if (!translated) return text
  return `${/^\s/.test(text) ? ' ' : ''}${translated}${/\s$/.test(text) ? ' ' : ''}`
}

export function translatedHref(href: string, locale: Locale, paths: readonly string[]) {
  if (!href.startsWith('/') || href.startsWith('//')) return href
  const url = new URL(href, 'https://www.afarhorizon.com')
  const original = url.pathname.replace(/^\/(?:fr|es|de|zh-Hans)(?=\/|$)/, '') || '/'
  if (!paths.includes(original)) return href
  return `${localePath(original, locale)}${url.search}${url.hash}`
}

export function translateSchema(data: unknown, locale: Locale, messages: Messages, paths: readonly string[], origin: string): unknown {
  if (Array.isArray(data)) return data.map(value => translateSchema(value, locale, messages, paths, origin))
  if (!data || typeof data !== 'object') return data
  const record = data as Record<string, unknown>
  return Object.fromEntries(Object.entries(record).map(([key, value]) => {
    if (typeof value === 'string') {
      if (['name', 'description', 'headline', 'touristType', 'text'].includes(key)) value = translateText(value, messages)
      if (['url', '@id', 'item', 'mainEntityOfPage'].includes(key) && typeof value === 'string' && value.startsWith(origin)) {
        const url = new URL(value)
        // The business and website identity stay shared across languages.
        if (!['#organization', '#website'].includes(url.hash) && !['Organization', 'TravelAgency', 'WebSite'].includes(String(record['@type']))) {
          value = new URL(translatedHref(url.pathname + url.hash, locale, paths), origin).href
        }
      }
    } else value = translateSchema(value, locale, messages, paths, origin)
    return [key, value]
  }).concat(['Article', 'BlogPosting', 'WebPage'].includes(String(record['@type'])) ? [['inLanguage', locale]] : []))
}
