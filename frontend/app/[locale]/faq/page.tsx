import {getTranslations, setRequestLocale} from 'next-intl/server'
import {requireLocale} from '@/i18n/locale'
import { createPageMetadata } from '@/lib/seo/metadata'
import { FaqGroups, FaqHero, FaqPlanning, FaqStructuredData } from '@/features/faq'

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
 const {locale: rawLocale} = await params
 const locale = requireLocale(rawLocale)
 const tr = await getTranslations({locale, namespace: 'Pages'})
 return createPageMetadata({
  "title": tr('faq_title'),
  "description": tr('faq_description'),
  "path": "/faq",
  "image": "https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/danakil-depression.png",
  "imageAlt": tr('faq_imageAlt'),
  locale,
})
}

export default async function FaqPage({params}: {params: Promise<{locale: string}>}) {
 const {locale: rawLocale} = await params
 const locale = requireLocale(rawLocale)
 setRequestLocale(locale)

  return (
    <>
      <FaqStructuredData />

      <FaqHero />

      <FaqGroups />

      <FaqPlanning />
    </>
  )
}
