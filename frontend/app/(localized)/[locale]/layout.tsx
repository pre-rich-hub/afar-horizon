import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SiteDocument } from '@/components/layout/SiteDocument'
import { isLocale } from '@/lib/i18n/locales'
import { getMessages } from '@/lib/i18n/messages'
import { site } from '@/lib/config/site'
import '../../globals.css'

export { viewport } from '../../(site)/layout'
export const metadata: Metadata = { metadataBase: new URL(site.url), robots: { index: false, follow: true } }

export default async function LocalizedLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale) || locale === 'en') notFound()
  return <SiteDocument locale={locale} messages={await getMessages(locale, 'shared')}>{children}</SiteDocument>
}
