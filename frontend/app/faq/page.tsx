import { createPageMetadata } from '@/lib/seo/metadata'
import { FaqGroups, FaqHero, FaqPlanning, FaqStructuredData } from '@/features/faq'

export const metadata = createPageMetadata({
  "title": "Afar & Danakil Expedition FAQs",
  "description": "Find answers about private Afar and Danakil expeditions: booking, inclusions, camps, walking, changing conditions and journeys into northern Ethiopia.",
  "path": "/faq",
  "image": "https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/danakil-depression.png",
  "imageAlt": "Dallol, Ethiopia"
})

export default function FaqPage() {
  return (
    <>
      <FaqStructuredData />

      <FaqHero />

      <FaqGroups />

      <FaqPlanning />
    </>
  )
}
