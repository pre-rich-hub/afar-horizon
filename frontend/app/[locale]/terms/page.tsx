import {getLegalCopy} from '@/features/legal'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {requireLocale} from '@/i18n/locale'
import { LegalContent, terms } from '@/features/legal'
import { createPageMetadata } from '@/lib/seo/metadata'

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
 const {locale: rawLocale} = await params
 const locale = requireLocale(rawLocale)
 const tr = await getTranslations({locale, namespace: 'Pages'})
 return createPageMetadata({
  title: tr('terms_title'), path: '/terms',
  description: tr('terms_description'), locale
})
}

export default async function TermsPage({params}: {params: Promise<{locale: string}>}) {
 const {locale: rawLocale} = await params
 const locale = requireLocale(rawLocale)
 setRequestLocale(locale)
 return <LegalContent page={getLegalCopy('legal.terms', terms, locale)} /> }
