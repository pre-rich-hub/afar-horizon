'use client'
import {NextIntlClientProvider} from 'next-intl'
import messages from '@/messages/en.json'
import {SiteNav} from './SiteNav'
import {SiteFooter} from './SiteFooter'
import {FloatingSupport} from '@/features/support'
import {NotFoundContent} from '@/components/common/NotFoundContent'

// A static English fallback for URLs outside the locale route tree. Keeping
// request headers out of this root boundary preserves public static generation.
export function NotFoundShell() {
  return <NextIntlClientProvider locale="en" messages={messages} timeZone="Africa/Addis_Ababa">
    <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-[0.14em] focus:text-primary-foreground">{messages.Common.skipToContent}</a>
    <SiteNav />
    <main id="main"><NotFoundContent /></main>
    <SiteFooter />
    <FloatingSupport />
  </NextIntlClientProvider>
}
