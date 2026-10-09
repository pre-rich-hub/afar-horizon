import { Hero } from '@/features/home/components/hero'
import { WhyTravel } from '@/features/home/components/why-travel'
import { SignatureDestinations } from '@/features/home/components/signature-destinations'
import { FeaturedTours } from '@/features/home/components/featured-tours'
import { StoryCarousel } from '@/features/home/components/story-carousel'
import { Experiences } from '@/features/home/components/experiences'
import { DestinationIndex } from '@/features/home/components/destination-index'
import { Reviews } from '@/features/home/components/reviews'
import { Gallery } from '@/features/home/components/gallery'
import { PlanJourney } from '@/features/home/components/plan-journey'
import { getToursData } from '@/lib/catalog'

export default async function Page() {
  const tours = await getToursData()

  return (
    <>
      <Hero />
      <WhyTravel />
      <SignatureDestinations />
      <FeaturedTours tours={tours} />
      <StoryCarousel tours={tours} />
      <Experiences />
      <DestinationIndex />
      <Reviews />
      <Gallery />
      <PlanJourney />
    </>
  )
}

