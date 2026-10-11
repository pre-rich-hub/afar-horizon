import {getTranslations, setRequestLocale} from 'next-intl/server'
import {requireLocale} from '@/i18n/locale'
import { createPageMetadata } from '@/lib/seo/metadata'
import { AboutApproach, AboutBrief, AboutHero, AboutNavigation, AboutPlanning, AboutStory } from '@/features/about'

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
 const {locale: rawLocale} = await params
 const locale = requireLocale(rawLocale)
 const tr = await getTranslations({locale, namespace: 'Pages'})
 return createPageMetadata({
  "title": tr('about_title'),
  "description": tr('about_description'),
  "path": "/about",
  "image": "https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/afar.png",
  "imageAlt": tr('about_imageAlt'),
  locale,
})
}

export default async function AboutPage({params}: {params: Promise<{locale: string}>}) {
 const {locale: rawLocale} = await params
 const locale = requireLocale(rawLocale)
 setRequestLocale(locale)

  return (
    <>
      {/* Hero */}
      <AboutHero />

      <AboutNavigation />

      {/* In brief */}
      <AboutBrief />

      {/* Our story */}
      <AboutStory />

      {/* Our approach */}
      <AboutApproach />

      {/* Plan */}
      <AboutPlanning />
    </>
  )
}
