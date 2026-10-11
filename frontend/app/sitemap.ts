import type { MetadataRoute } from 'next'
import { destinations } from '@/features/destinations'
import { tours } from '@/features/tours'
import { posts } from '@/features/blog'
import { site } from '@/lib/config/site'
import { indexableStaticRoutes } from '@/lib/seo/routes'
import { approvedTranslations, draftLocales, languageAlternates, localePath } from '@/lib/i18n/locales'

export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.indexable) return []
  const paths = [
    ...indexableStaticRoutes,
    ...destinations.map(d => `/destinations/${d.slug}`),
    ...tours.map(t => `/expeditions/${t.slug}`),
    ...posts.map(p => `/blog/${p.slug}`),
  ]
  // No trustworthy editorial modification timestamps are maintained yet.
  const approvedPaths = paths.flatMap(path => [path, ...draftLocales.filter(locale => approvedTranslations[locale].includes(path)).map(locale => localePath(path, locale))])
  return approvedPaths.map(path => ({ url: new URL(path, `${site.url}/`).href, ...(languageAlternates(path, site.url) ? { alternates: { languages: languageAlternates(path, site.url)! } } : {}) }))
}
