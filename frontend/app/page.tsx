import { DestinationIndex, Experiences, FeaturedTours, Gallery, Hero, PlanJourney, Reviews, SignatureDestinations, StoryCarousel, WhyTravel } from '@/features/home'
import { getToursData } from '@/features/tours'

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
