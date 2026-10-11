import { site } from '@/lib/config/site'
import { createPageMetadata, pageTitle } from '@/lib/seo/metadata'
import { getGoogleVerification } from '@/lib/config/measurement'

import type { Metadata, Viewport } from 'next'
import './globals.css'

const googleVerification = site.production ? getGoogleVerification() : undefined

export const metadata: Metadata = {
  ...(googleVerification ? { verification: { google: googleVerification } } : {}),
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
