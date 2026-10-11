import type { MetadataRoute } from 'next'
import { destinations } from '@/features/destinations'
import { tours } from '@/features/tours'
import { posts } from '@/features/blog'
import { site } from '@/lib/config/site'
import { indexableStaticRoutes } from '@/lib/seo/routes'

export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.indexable) return []
  const paths = [
    ...indexableStaticRoutes,
    ...destinations.map(d => `/destinations/${d.slug}`),
    ...tours.map(t => `/expeditions/${t.slug}`),
    ...posts.map(p => `/blog/${p.slug}`),
  ]
  // No trustworthy editorial modification timestamps are maintained yet.
  return paths.map(path => ({ url: new URL(path, `${site.url}/`).href }))
}
