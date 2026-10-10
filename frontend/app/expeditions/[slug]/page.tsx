import { getRelatedTours, getTour, getTourData, RelatedTours, TourEnquiry, TourFaqs, TourHero, TourInclusions, TourOverview, TourPlanning, tours } from '@/features/tours'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const t = getTour(slug)
  if (!t) return { title: 'Expedition not found' }
  return {
    title: `${t.days} ${t.title}`,
    description: t.summary,
    alternates: { canonical: `/expeditions/${t.slug}` },
    openGraph: { title: t.title, description: t.summary, images: [t.image] },
  }
}

export default async function ExpeditionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const t = await getTourData(slug)
  if (!t) notFound()

  const { others } = getRelatedTours(t)

  return (
    <>
      <TourHero t={t} />

      {/* Overview + itinerary, with the pricing card pinned alongside */}
      <TourOverview t={t} />

      {/* Includes / excludes */}
      <TourInclusions t={t} />

      {/* Questions */}
      <TourFaqs t={t} />

      {/* Enquire */}
      <TourEnquiry t={t} />

      {/* Other expeditions */}
      <RelatedTours others={others} />

      <TourPlanning t={t} />
    </>
  )
}
