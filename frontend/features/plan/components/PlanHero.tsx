import { PageHero } from '@/components/common/PageHero'

export function PlanHero() {
  return (
    <PageHero
        eyebrow="Plan My Journey"
        title="Tell us where you want to go"
        lede="We will help you work out how to get there. You don’t need a perfect itinerary: “I have two weeks” or “I want to see the Danakil” is enough to start."
        image="/images/hero-danakil/salt-flats.jpg"
        imageAlt="Salt crust stretching to the horizon in the Danakil Depression"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Plan My Journey' }]}
      />
  )
}
