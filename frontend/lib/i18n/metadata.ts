import type { Metadata } from 'next'
import { languageAlternates, localePath, isApprovedTranslation, type Locale } from './locales'
import { translateText, type Messages } from './translate'

export function localizedMetadata(source: Metadata, locale: Locale, path: string, messages: Messages, origin: string): Metadata {
  const baseTitle = typeof source.title === 'string' ? source.title : source.title && 'absolute' in source.title ? source.title.absolute ?? '' : ''
  const title = baseTitle.includes(' | Afar Horizon Expeditions')
    ? `${translateText(baseTitle.split(' | Afar Horizon Expeditions')[0], messages)} | Afar Horizon Expeditions`
    : translateText(baseTitle, messages)
  const description = translateText(source.description ?? '', messages)
  const url = new URL(localePath(path, locale), origin).href
  const approved = isApprovedTranslation(locale, path)
  const sourceRobots = typeof source.robots === 'object' ? source.robots : undefined
  const images = source.openGraph && 'images' in source.openGraph ? source.openGraph.images : undefined
  const translatedImages = (Array.isArray(images) ? images : images ? [images] : []).map(image =>
    typeof image === 'object' && !(image instanceof URL) && 'alt' in image
      ? { ...image, alt: translateText(image.alt ?? '', messages) } : image)
  return {
    ...source, title: { absolute: title }, description,
    alternates: { canonical: url, ...(approved && languageAlternates(path, origin) ? { languages: languageAlternates(path, origin) } : {}) },
    robots: { ...sourceRobots, index: approved && sourceRobots?.index === true, follow: true },
    openGraph: { ...source.openGraph, title, description, url, images: translatedImages, locale: { en: 'en_US', fr: 'fr_FR', es: 'es_ES', de: 'de_DE', 'zh-Hans': 'zh_CN' }[locale] },
    twitter: { ...source.twitter, title, description, images: translatedImages },
  }
}
