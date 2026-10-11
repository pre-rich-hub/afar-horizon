import {getTranslations, setRequestLocale} from 'next-intl/server'
import {requireLocale} from '@/i18n/locale'
import { createPageMetadata } from '@/lib/seo/metadata'
import { DestinationGrid, DestinationsHero, DestinationsPlanning } from '@/features/destinations'

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
 const {locale: rawLocale} = await params
 const locale = requireLocale(rawLocale)
 const tr = await getTranslations({locale, namespace: 'Pages'})
 return createPageMetadata({
  "title": tr('destinations_title'),
  "description": tr('destinations_description'),
  "path": "/destinations",
  "image": "https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/erta-ale.png",
  "imageAlt": tr('destinations_imageAlt'),
  locale,
})
}

export default async function DestinationsPage({params}: {params: Promise<{locale: string}>}) {
 const {locale: rawLocale} = await params
 const locale = requireLocale(rawLocale)
 setRequestLocale(locale)

  return (
    <>
      <DestinationsHero />

      <DestinationGrid />

      <DestinationsPlanning />
    </>
  )
}
