import { createPageMetadata } from '@/lib/seo/metadata'
import { SafetyGuide, SafetyHero, SafetyPlanning } from '@/features/safety'
import { SafetyPanel } from '@/components/common/SafetyPanel'

export const metadata = createPageMetadata({
  "title": "Danakil & Afar Travel Safety",
  "description": "How Afar Horizon plans safe Danakil and Afar expeditions: conditions checked before every departure, local Afar guides, escorts where required and heat planning.",
  "path": "/safety",
  "image": "https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/erta-ale.png",
  "imageAlt": "Erta Ale, Ethiopia"
})

export default function SafetyPage() {
  return (
    <>
      <SafetyHero />

      <SafetyPanel eyebrow="Our Commitments" title="What we do on every journey" link={false} />

      <SafetyGuide />

      <SafetyPlanning />
    </>
  )
}
