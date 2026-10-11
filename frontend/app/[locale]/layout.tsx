import {NextIntlClientProvider} from 'next-intl'
import {setRequestLocale, getMessages} from 'next-intl/server'
import {notFound} from 'next/navigation'
import {SiteDocument} from '@/components/layout/SiteDocument'
import {isLocale, languages} from '@/lib/i18n/locales'
export const dynamicParams = false
export function generateStaticParams() {return languages.map(({locale})=>({locale}))}
export default async function LocaleLayout({children, params}: {children: React.ReactNode; params: Promise<{locale: string}>}) {
 const {locale} = await params
 if (!isLocale(locale)) notFound()
 setRequestLocale(locale)
 return <NextIntlClientProvider locale={locale} messages={await getMessages()}><SiteDocument locale={locale}>{children}</SiteDocument></NextIntlClientProvider>
}
