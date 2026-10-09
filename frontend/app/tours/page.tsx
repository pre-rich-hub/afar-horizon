import { FeaturedJourney, getFeaturedTour, getToursData, TourCollection, TourPromises, ToursHero, ToursPlanning } from '@/features/tours'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tours & Journeys',
  description:
    'Private, tailor-made Ethiopian itineraries — historic route, highland wildlife, Danakil expedition, Omo immersion and festival journeys. Every route drawn from scratch.',
}

export default async function ToursPage() {
  const tours = await getToursData()
  const { hero } = getFeaturedTour(tours)

  return (
    <>
      <ToursHero />

      {/* Featured journey */}
      <FeaturedJourney hero={hero} />

      {/* All journeys */}
      <TourCollection tours={tours} />

      {/* Promises */}
      <TourPromises />

      <ToursPlanning />
    </>
  )
}
