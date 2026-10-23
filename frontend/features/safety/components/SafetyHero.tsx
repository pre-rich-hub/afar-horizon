
import { TranslationBoundary } from '@/components/common/TranslationBoundary'
import { PageHero } from '@/components/common/PageHero'

export function SafetyHero() {
  return (
    <TranslationBoundary><PageHero
        eyebrow="Safety"
        title="Safety is our first priority"
        lede="The Danakil is one of the most extraordinary places on Earth, and one of the most demanding. Here is exactly how we plan, guide and adapt so you can travel there responsibly."
        image="https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/erta-ale.png"
        imageAlt="Erta Ale volcano in the Afar region"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Safety' }]}
      /></TranslationBoundary>
  )
}
