import 'server-only'
import type { Locale } from './locales'
import type { Messages } from './translate'
import scopes from './message-scopes.json'
import source from './drafts/source.en.json'

async function dictionary(locale: Locale): Promise<Messages> {
  if (locale === 'en') return {}
  switch (locale) {
    case 'fr': return (await import('./drafts/fr.json')).default
    case 'es': return (await import('./drafts/es.json')).default
    case 'de': return (await import('./drafts/de.json')).default
    case 'zh-Hans': return (await import('./drafts/zh-Hans.json')).default
  }
}

export async function getMessages(locale: Locale, scope?: string): Promise<Messages> {
  const messages = await dictionary(locale)
  if (!scope) return messages
  const positions = (scopes as Record<string, number[]>)[scope]
  if (!positions) throw new Error(`Missing translation scope: ${scope}`)
  const keys = positions.map(index => source[index])
  const inherited = scope === 'shared' ? new Set<string>() : new Set(scopes.shared.map(index => source[index]))
  return Object.fromEntries(keys.filter(key => messages[key] && !inherited.has(key)).map(key => [key, messages[key]]))
}
