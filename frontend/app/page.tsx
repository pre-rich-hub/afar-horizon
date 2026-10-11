import { createPageMetadata } from '@/lib/seo/metadata'
import { DestinationIndex, Experiences, FeaturedTours, Gallery, Hero, PlanJourney, Reviews, SignatureDestinations, StoryCarousel, WhyTravel } from '@/features/home'
import { getToursData } from '@/features/tours'

export const metadata = createPageMetadata({
  "title": "Private Afar & Danakil Expeditions",
  "description": "Explore Afar, Erta Ale, Dallol and the Danakil salt lakes with a locally owned Ethiopian operator. Private expeditions and northern highlands journeys.",
  "path": "/",
  "image": "https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/danakil-depression.png",
  "imageAlt": "Danakil Depression, Ethiopia"
})

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
