import {getToursCopy} from '@/features/tours'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {requireLocale} from '@/i18n/locale'
import { createPageMetadata } from '@/lib/seo/metadata'
import { getRelatedTours, getTour, getTourData, RelatedTours, TourEnquiry, TourFaqs, TourHero, TourInclusions, TourOverview, TourPlanning, tours } from '@/features/tours'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDestinationForPlace } from '@/features/destinations'
import { JsonLd } from '@/components/common/JsonLd'
import { tourSchema } from '@/features/tours'

export const dynamicParams = false

export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  const { slug, locale: rawLocale } = await params
  const locale = requireLocale(rawLocale)
  setRequestLocale(locale)
  const baset = getTour(slug)
  const t = baset && getToursCopy('tour.tours', baset, locale)
  if (!t) return { title: 'Expedition not found' }
  return createPageMetadata({
    locale,
    title: `${t.days} ${t.title}`,
    description: t.summary,
    path: `/expeditions/${t.slug}`,
    image: t.image,
    imageAlt: t.imageAlt ?? t.title,
  })
}

export default async function ExpeditionPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale: rawLocale } = await params
  const locale = requireLocale(rawLocale)
  setRequestLocale(locale)
  const baset = await getTourData(slug)
  const t = baset && getToursCopy('tour.tours', baset, locale)
  if (!t) notFound()

  const { others } = getRelatedTours(baset!)
  const placeLinks = Object.fromEntries(t.places.flatMap(place => {
    const destination = getDestinationForPlace(place)
    return destination ? [[place, `/destinations/${destination.slug}`]] : []
  }))

  return (
    <>
      <JsonLd data={tourSchema(t, locale, {home: (await getTranslations({locale, namespace: 'Schema'}))('home'), index: (await getTranslations({locale, namespace: 'Schema'}))('expeditions')})} />
      <TourHero t={t} />

      {/* Overview + itinerary, with the pricing card pinned alongside */}
      <TourOverview t={t} placeLinks={placeLinks} />

      {/* Includes / excludes */}
      <TourInclusions t={t} />

      {/* Questions */}
      <TourFaqs t={t} />

      {/* Enquire */}
      <TourEnquiry t={baset!} />

      {/* Other expeditions */}
      <RelatedTours others={others} />

      <TourPlanning t={t} />
    </>
  )
}
