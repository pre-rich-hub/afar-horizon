import {getLegalCopy} from '@/features/legal'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {requireLocale} from '@/i18n/locale'
import { LegalContent, privacy } from '@/features/legal'
import { createPageMetadata } from '@/lib/seo/metadata'

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
 const {locale: rawLocale} = await params
 const locale = requireLocale(rawLocale)
 const tr = await getTranslations({locale, namespace: 'Pages'})
 return createPageMetadata({
  title: tr('privacy_title'), path: '/privacy',
  description: tr('privacy_description'), locale
})
}

export default async function PrivacyPage({params}: {params: Promise<{locale: string}>}) {
 const {locale: rawLocale} = await params
 const locale = requireLocale(rawLocale)
 setRequestLocale(locale)
 return <LegalContent page={getLegalCopy('legal.privacy', privacy, locale)} /> }
