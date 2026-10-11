import type { Metadata } from 'next'
import { site } from '@/lib/config/site'
import { languageAlternates } from '@/lib/i18n/locales'

type PageMetadata = {
  title: string
  description: string
  path: string
  image?: string
  imageAlt?: string
  index?: boolean
  type?: 'website' | 'article'
  author?: string
}

export function pageTitle(title: string) {
  // A shared suffix avoids duplicated branding when a feature has an old SEO title.
  const topic = title.replace(/\s*(?:\||·|—|-)\s*Afar Horizon(?: Expeditions)?\s*$/i, '')
  return `${topic} | ${site.name}`
}

export function createPageMetadata({
  title, description, path, image = site.defaultImage,
  imageAlt = 'Danakil Depression, Afar, Ethiopia', index = true,
  type = 'website', author,
}: PageMetadata): Metadata {
  if (!path.startsWith('/') || path.startsWith('//') || path.includes('?') || path.includes('#')) {
    throw new Error('Page metadata needs an absolute route path without query parameters or fragments.')
  }
  const url = new URL(path, `${site.url}/`).href
  if (new URL(url).origin !== site.url || path.includes('\\')) {
    throw new Error('Canonical paths must stay on the configured site origin.')
  }
  const fullTitle = pageTitle(title)
  const images = [{ url: new URL(image, `${site.url}/`).href, alt: imageAlt }]

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url, ...(languageAlternates(path, site.url) ? { languages: languageAlternates(path, site.url) } : {}) },
    robots: { index: site.indexable && index, follow: true },
    ...(author ? { authors: [{ name: author }] } : {}),
    openGraph: {
      title: fullTitle, description, url, siteName: site.name,
      type, images,
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images },
  }
}
