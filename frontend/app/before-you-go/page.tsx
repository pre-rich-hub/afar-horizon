import { createPageMetadata } from '@/lib/seo/metadata'
import { BeforeYouGoGuide, BeforeYouGoHero, BeforeYouGoPlanning } from '@/features/before-you-go'

export const metadata = createPageMetadata({
  "title": "Preparing for Afar & Danakil Travel",
  "description": "Prepare for an Afar or Danakil expedition: heat, walking, basic camps, packing, food, water and respectful travel, with notes for the northern highlands.",
  "path": "/before-you-go",
  "image": "https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/danakil-depression.png",
  "imageAlt": "Dallol, Ethiopia"
})

export default function BeforeYouGoPage() {
  return (
    <>
      <BeforeYouGoHero />

      <BeforeYouGoGuide />

      <BeforeYouGoPlanning />
    </>
  )
}
