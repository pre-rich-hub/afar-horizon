import { createPageMetadata } from '@/lib/seo/metadata'
import { AboutApproach, AboutBrief, AboutHero, AboutNavigation, AboutPlanning, AboutStory } from '@/features/about'

export const metadata = createPageMetadata({
  "title": "About Our Ethiopian Expedition Team",
  "description": "Meet Afar Horizon Expeditions, a locally owned Ethiopian company planning private Afar, Danakil and northern highlands journeys from Addis Ababa.",
  "path": "/about",
  "image": "https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/afar.png",
  "imageAlt": "Afar, Ethiopia"
})

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <AboutHero />

      <AboutNavigation />

      {/* In brief */}
      <AboutBrief />

      {/* Our story */}
      <AboutStory />

      {/* Our approach */}
      <AboutApproach />

      {/* Plan */}
      <AboutPlanning />
    </>
  )
}
