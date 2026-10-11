
import { TranslationBoundary } from '@/components/common/TranslationBoundary'
import { PageHero } from '@/components/common/PageHero'

export function PlanHero() {
  return (
    <TranslationBoundary><PageHero
        eyebrow="Plan My Journey"
        title="Tell us where you want to go"
        lede="We will help you work out how to get there. You don’t need a perfect itinerary: “I have two weeks” or “I want to see the Danakil” is enough to start."
        image="https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/lake-assale.png"
        imageAlt="Lake Assale in the Danakil Depression"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Plan My Journey' }]}
      /></TranslationBoundary>
  )
}
