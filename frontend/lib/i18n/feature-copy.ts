import {useLocale} from 'next-intl'
import type {Locale} from './locales'

type Tree = {[key: string]: unknown}
function recordKey(value: unknown, index: number): string {
  if (value && typeof value === 'object') {
    const v = value as Record<string, unknown>
    if (typeof v.slug === 'string') return v.slug
    if (typeof v.id === 'string' || typeof v.id === 'number') return String(v.id)
    if (typeof v.src === 'string') return v.src.split('/').pop()!.replace(/\.[^.]+$/, '')
  }
  return String(index)
}
const structuralKeys = new Set(['slug', 'id', 'src', 'image', 'href', 'url', 'from', 'nights', 'group', 'collection', 'category', 'style', 'shape', 'date', 'publishedAt', 'updatedAt', 'author', 'start', 'end', 'places', 'relatedSlugs', 'tourSlug', 'topics', 'phone', 'email', 'whatsapp', 'haystack', 'kind'])
function merge<T>(base: T, overlay: unknown): T {
  if (overlay === undefined) return base
  if (typeof base === 'string') return (typeof overlay === 'string' ? overlay : base) as T
  if (Array.isArray(base)) {
    return base.map((item, i) => merge(item, (overlay as Tree)[recordKey(item, i)])) as T
  }
  if (base && typeof base === 'object' && overlay && typeof overlay === 'object') {
    return Object.fromEntries(Object.entries(base).map(([key, value]) => [key, structuralKeys.has(key) ? value : merge(value, (overlay as Tree)[key])])) as T
  }
  return base
}
const cache = new WeakMap<object, Map<string, unknown>>()
export function getLocalizedData<T>(overlays: Partial<Record<Locale, Tree>>, dataset: string, base: T, locale: Locale): T {
  if (locale === 'en') return base
  let overlay: unknown = overlays[locale]?.[dataset]
  // Components can receive either the catalogue or a single slug-keyed record.
  if (base && !Array.isArray(base) && typeof base === 'object' && 'slug' in base) {
    overlay = (overlay as Tree | undefined)?.[String((base as {slug: unknown}).slug)]
  }
  if (!base || typeof base !== 'object') return merge(base, overlay)
  const key = `${dataset}:${locale}`
  let cached = cache.get(base)
  if (!cached) {cached = new Map(); cache.set(base, cached)}
  if (!cached.has(key)) cached.set(key, merge(base, overlay))
  return cached.get(key) as T
}
export function useLocalizedData<T>(overlays: Partial<Record<Locale, Tree>>, dataset: string, base: T): T {
  return getLocalizedData(overlays, dataset, base, useLocale() as Locale)
}
