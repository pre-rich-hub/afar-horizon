import {getTranslations, setRequestLocale} from 'next-intl/server'
import {requireLocale} from '@/i18n/locale'
import { createPageMetadata } from '@/lib/seo/metadata'
import { SpecialistHero, SpecialistNavigation, SpecialistPlanning, SpecialistPricing, SpecialistTracks } from '@/features/specialist-travel'

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
 const {locale: rawLocale} = await params
 const locale = requireLocale(rawLocale)
 const tr = await getTranslations({locale, namespace: 'Pages'})
 return createPageMetadata({
  "title": tr('specialist-travel_title'),
  "description": tr('specialist-travel_description'),
  "path": "/specialist-travel",
  "image": "https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/danakil-depression.png",
  "imageAlt": tr('specialist-travel_imageAlt'),
  locale,
})
}

export default async function SpecialistTravelPage({params}: {params: Promise<{locale: string}>}) {
 const {locale: rawLocale} = await params
 const locale = requireLocale(rawLocale)
 setRequestLocale(locale)

  return (
    <>
      <SpecialistHero />

      <SpecialistNavigation />

      {/* Photography, film, research, trekking, groups */}
      <SpecialistTracks />

      <SpecialistPricing />

      <SpecialistPlanning />
    </>
  )
}
