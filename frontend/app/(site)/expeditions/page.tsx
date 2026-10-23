import { createPageMetadata } from '@/lib/seo/metadata'
import { SafetyPanel } from '@/components/common/SafetyPanel'
import { ExpeditionCollections, ExpeditionsHero, ExpeditionsNote, ExpeditionsPlanning, getToursData } from '@/features/tours'

export const metadata = createPageMetadata({
  "title": "Private Danakil & Ethiopia Tour Packages",
  "description": "Compare private Afar and Danakil expeditions, combined highlands routes and northern Ethiopia tours. Explore durations, itineraries and inclusions.",
  "path": "/expeditions",
  "image": "https://res.cloudinary.com/xsrr0wfh/image/upload/v1791652748/LakeAfdera.png",
  "imageAlt": "Lake Afdera, Afar, Ethiopia"
})

export default async function ExpeditionsPage() {
  const tours = await getToursData()

  return (
    <>
      <ExpeditionsHero count={tours.length} />

      {/* Collections */}
      <ExpeditionCollections tours={tours} />

      {/* Operating note */}
      <ExpeditionsNote />

      <SafetyPanel lede="Every expedition, from a short Danakil route to a long highlands journey, is planned around the same safety commitments." />

      <ExpeditionsPlanning />
    </>
  )
}
