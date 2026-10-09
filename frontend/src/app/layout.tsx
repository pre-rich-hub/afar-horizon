import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { SiteNav } from '@/components/layout/site-nav'
import { SiteFooter } from '@/components/layout/site-footer'
import { FloatingSupport } from '@/components/layout/floating-support'
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
  title: {
    default: 'Afar Horizon Expeditions — The Soul of Ethiopia, Curated',
    template: '%s · Afar Horizon Expeditions',
  },
  description:
    'Private, tailor-made luxury journeys through Ethiopia. Walk through kingdoms carved from stone, wake above the clouds, and share coffee with families who have welcomed travellers for generations.',
  keywords: [
    'Luxury Ethiopia Tours',
    'Private Ethiopia Tours',
    'Addis Ababa layover tour',
    'Lalibela',
    'Simien Mountains',
    'Danakil Depression',
    'Omo Valley',
    'Ethiopia travel',
  ],
  openGraph: {
    title: 'Afar Horizon Expeditions — The Soul of Ethiopia, Curated',
    description:
      'Private, tailor-made luxury journeys through Ethiopia, designed around you.',
    type: 'website',
  },
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
