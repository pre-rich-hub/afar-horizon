import { site } from '@/lib/config/site'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteNav } from '@/components/layout/SiteNav'
import { FloatingSupport } from '@/features/support'
import { SiteAnalytics } from '@/components/common/SiteAnalytics'
import { getMeasurementConfig } from '@/lib/config/measurement'
import { indexableStaticRoutes } from '@/lib/seo/routes'
import { destinations } from '@/features/destinations'
import { tours } from '@/features/tours'
import { posts } from '@/features/blog'
import {inter, cormorant} from './fonts'
import { JsonLd } from '@/components/common/JsonLd'
import { businessSchema } from '@/features/about'

const measurement = getMeasurementConfig(site.production)
const analyticsPaths = [
  ...indexableStaticRoutes, '/plan',
  ...destinations.map(d => `/destinations/${d.slug}`),
  ...tours.map(t => `/expeditions/${t.slug}`),
  ...posts.map(p => `/blog/${p.slug}`),
]

import {useTranslations} from 'next-intl'
import type { Locale } from '@/lib/i18n/locales'

export function SiteDocument({
  children, locale = 'en',
}: Readonly<{
  children: React.ReactNode; locale?: Locale
}>) {
  const tr = useTranslations('Common')
  return (
    <html
      lang={locale}
      className={`${inter.variable} ${cormorant.variable} bg-background`}
    >
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
      </head>
      <body className="antialiased">

        <JsonLd data={businessSchema()} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-[0.14em] focus:text-primary-foreground"
        >
          {tr('skipToContent')}
        </a>
        <SiteNav paths={analyticsPaths} />
        <main id="main">{children}</main>
        <SiteFooter />
        <FloatingSupport />
        {measurement.pageviews && locale === 'en' && <SiteAnalytics paths={analyticsPaths} origin={site.url} events={measurement.events} />}

      </body>
    </html>
  )
}
