import { site } from '@/lib/config/site'
import { createPageMetadata, pageTitle } from '@/lib/seo/metadata'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteNav } from '@/components/layout/SiteNav'
import { FloatingSupport } from '@/features/support'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

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

export const metadata: Metadata = {
  ...createPageMetadata({
    title: 'Private Afar & Danakil Expeditions',
    description: 'Private Afar and Danakil expeditions with a locally owned Ethiopian operator, connecting volcanoes, salt country and the northern highlands.',
    path: '/',
  }),
  metadataBase: new URL(site.url),
  title: {
    default: pageTitle('Private Afar & Danakil Expeditions'),
    template: `%s | ${site.name}`,
  },
  // Each page declares its own canonical; do not inherit the homepage's URL.
  alternates: { canonical: null },
}

export const viewport: Viewport = {
  themeColor: '#2a1d16',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} bg-background`}
    >
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-[0.14em] focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <SiteNav />
        <main id="main">{children}</main>
        <SiteFooter />
        <FloatingSupport />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
