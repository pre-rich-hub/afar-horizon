import type { MetadataRoute } from 'next'
import { site } from '@/lib/config/site'

export default function robots(): MetadataRoute.Robots {
  return {
    // Noindex pages must remain crawlable so their directives can be read.
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/api'] },
    ...(site.indexable ? { sitemap: `${site.url}/sitemap.xml` } : {}),
  }
}
