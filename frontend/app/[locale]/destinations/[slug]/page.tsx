import {getDestinationsCopy} from '@/features/destinations'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {requireLocale} from '@/i18n/locale'
import { createPageMetadata } from '@/lib/seo/metadata'
import { DestinationEnquiry, DestinationHero, DestinationOverview, DestinationPlanning, destinations, getDestination, getDestinationRelations } from '@/features/destinations'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/common/JsonLd'
import { destinationSchema } from '@/features/destinations'

// The catalogue is authoritative; reject unknown slugs before streamed rendering.
export const dynamicParams = false

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  const { slug, locale: rawLocale } = await params
  const locale = requireLocale(rawLocale)
  setRequestLocale(locale)
  const based = getDestination(slug)
  const d = based && getDestinationsCopy('destination.destinations', based, locale)
  if (!d) return { title: 'Destination not found' }
  const title = d.seoTitle ?? d.name
  const description = d.seoDescription ?? d.intro
  return createPageMetadata({
    locale,
    title,
    description,
    path: `/destinations/${d.slug}`,
    image: d.image,
    imageAlt: d.imageAlt ?? `${d.name}, Ethiopia`,
  })
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale: rawLocale } = await params
  const locale = requireLocale(rawLocale)
  setRequestLocale(locale)
  const based = getDestination(slug)
  const d = based && getDestinationsCopy('destination.destinations', based, locale)
  if (!d) notFound()

  const { fallback, others } = getDestinationRelations(based!)

  return (
    <>
      <JsonLd data={destinationSchema(d, locale, {home: (await getTranslations({locale, namespace: 'Schema'}))('home'), index: (await getTranslations({locale, namespace: 'Schema'}))('destinations')})} />
      <DestinationHero d={d} />

      {/* Essay + highlights, with the planning card pinned alongside */}
      <DestinationOverview d={d} fallback={fallback} />

      {/* Enquiry */}
      <DestinationEnquiry d={based!} others={others} />

      <DestinationPlanning d={d} />
    </>
  )
}
