import { createPageMetadata } from '@/lib/seo/metadata'
import { DestinationEnquiry, DestinationHero, DestinationOverview, DestinationPlanning, destinations, getDestination, getDestinationRelations } from '@/features/destinations'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

// The catalogue is authoritative; reject unknown slugs before streamed rendering.
export const dynamicParams = false

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const d = getDestination(slug)
  if (!d) return { title: 'Destination not found' }
  const title = d.seoTitle ?? d.name
  const description = d.seoDescription ?? d.intro
  return createPageMetadata({
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
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const d = getDestination(slug)
  if (!d) notFound()

  const { fallback, others } = getDestinationRelations(d)

  return (
    <>
      <DestinationHero d={d} />

      {/* Essay + highlights, with the planning card pinned alongside */}
      <DestinationOverview d={d} fallback={fallback} />

      {/* Enquiry */}
      <DestinationEnquiry d={d} others={others} />

      <DestinationPlanning d={d} />
    </>
  )
}
