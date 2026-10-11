import { createPageMetadata } from '@/lib/seo/metadata'
import { PlanHero, PlanRequest } from '@/features/plan'
import { getTour } from '@/features/tours'

export const metadata = createPageMetadata({
  "title": "Plan Your Private Afar & Ethiopia Journey",
  "description": "Share your dates, interests and preferred pace. Plan a private Danakil expedition, an Afar journey or a combined northern Ethiopia route with our team.",
  "path": "/plan",
  "image": "https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/lake-assale.png",
  "imageAlt": "Lake Assale, Ethiopia",
  "index": false
})

export default async function PlanPage({
  searchParams,
}: {
  searchParams: Promise<{ expedition?: string }>
}) {
  const { expedition } = await searchParams
  const tour = expedition ? getTour(expedition) : undefined

  return (
    <>
      <PlanHero />

      <PlanRequest subject={tour ? `${tour.days} ${tour.title}` : undefined} />
    </>
  )
}
