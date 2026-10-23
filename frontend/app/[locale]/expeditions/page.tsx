import {getTranslations, setRequestLocale} from 'next-intl/server'
import {requireLocale} from '@/i18n/locale'
import { SafetyPanel } from '@/components/common/SafetyPanel'
import { createPageMetadata } from '@/lib/seo/metadata'
import { ExpeditionCollections, ExpeditionsHero, ExpeditionsNote, ExpeditionsPlanning, getToursData } from '@/features/tours'

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
 const {locale: rawLocale} = await params
 const locale = requireLocale(rawLocale)
 const tr = await getTranslations({locale, namespace: 'Pages'})
 return createPageMetadata({
  "title": tr('expeditions_title'),
  "description": tr('expeditions_description'),
  "path": "/expeditions",
  "image": "https://res.cloudinary.com/xsrr0wfh/image/upload/v1791652748/LakeAfdera.png",
  "imageAlt": tr('expeditions_imageAlt'),
  locale,
})
}

export default async function ExpeditionsPage({params}: {params: Promise<{locale: string}>}) {
 const {locale: rawLocale} = await params
 const locale = requireLocale(rawLocale)
 setRequestLocale(locale)

  const tours = await getToursData()

  return (
    <>
      <ExpeditionsHero count={tours.length} />

      {/* Collections */}
      <ExpeditionCollections tours={tours} />

      {/* Operating note */}
      <ExpeditionsNote />

      <SafetyPanel variant="expeditions" />

      <ExpeditionsPlanning />
    </>
  )
}
