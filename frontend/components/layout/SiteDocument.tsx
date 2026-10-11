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
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { JsonLd } from '@/components/common/JsonLd'
import { businessSchema } from '@/features/about'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const measurement = getMeasurementConfig(site.production)
const analyticsPaths = [
  ...indexableStaticRoutes, '/plan', '/photo-credits',
  ...destinations.map(d => `/destinations/${d.slug}`),
  ...tours.map(t => `/expeditions/${t.slug}`),
  ...posts.map(p => `/blog/${p.slug}`),
]

import { TranslationProvider, TranslationBoundary } from '@/components/common/TranslationBoundary'
import type { Locale } from '@/lib/i18n/locales'
import type { Messages } from '@/lib/i18n/translate'
export function SiteDocument({
  children, locale = 'en', messages = {},
}: Readonly<{
  children: React.ReactNode; locale?: Locale; messages?: Messages
}>) {
  return (
    <html
      lang={locale}
      className={`${inter.variable} ${cormorant.variable} bg-background`}
    >
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
      </head>
      <body className="antialiased">
        <TranslationProvider locale={locale} messages={messages} paths={analyticsPaths} origin={site.url}>
        <JsonLd data={businessSchema()} />
        <TranslationBoundary><a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-[0.14em] focus:text-primary-foreground"
        >
          Skip to content
        </a></TranslationBoundary>
        <SiteNav />
        <main id="main">{children}</main>
        <SiteFooter />
        <FloatingSupport />
        {measurement.pageviews && locale === 'en' && <SiteAnalytics paths={analyticsPaths} origin={site.url} events={measurement.events} />}
        </TranslationProvider>
      </body>
    </html>
  )
}
