import {getTranslations, setRequestLocale} from 'next-intl/server'
import {requireLocale} from '@/i18n/locale'
import { createPageMetadata } from '@/lib/seo/metadata'
import { SafetyGuide, SafetyHero, SafetyPlanning } from '@/features/safety'
import { SafetyPanel } from '@/components/common/SafetyPanel'

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
 const {locale: rawLocale} = await params
 const locale = requireLocale(rawLocale)
 const tr = await getTranslations({locale, namespace: 'Pages'})
 return createPageMetadata({
  "title": tr('safety_title'),
  "description": tr('safety_description'),
  "path": "/safety",
  "image": "https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/erta-ale.png",
  "imageAlt": tr('safety_imageAlt'),
  locale,
})
}

export default async function SafetyPage({params}: {params: Promise<{locale: string}>}) {
 const {locale: rawLocale} = await params
 const locale = requireLocale(rawLocale)
 setRequestLocale(locale)

  return (
    <>
      <SafetyHero />

      <SafetyPanel variant="safetyPage" />

      <SafetyGuide />

      <SafetyPlanning />
    </>
  )
}
