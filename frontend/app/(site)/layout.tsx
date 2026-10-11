import {NextIntlClientProvider} from 'next-intl'
import {setRequestLocale, getMessages} from 'next-intl/server'
import {SiteDocument} from '@/components/layout/SiteDocument'
export const metadata = {robots: {index: false, follow: false}}
export default async function PrivateLayout({children}: {children: React.ReactNode}) {
 setRequestLocale('en')
 return <NextIntlClientProvider locale="en" messages={await getMessages()}><SiteDocument>{children}</SiteDocument></NextIntlClientProvider>
}
