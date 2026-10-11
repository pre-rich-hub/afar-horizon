import { createPageMetadata } from '@/lib/seo/metadata'
import { PhotoCreditsHero, PhotoCreditsList } from '@/features/photo-credits'

export const metadata = createPageMetadata({
  "title": "Website Photo Collection",
  "description": "Browse the client-provided Afar Horizon destination and expedition photographs hosted on Cloudinary, with links to the original photo collection.",
  "path": "/photo-credits",
  "image": "https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/lake-assale.png",
  "imageAlt": "Lake Assale, Ethiopia",
  "index": false
})

export default function PhotoCreditsPage() {
  return (
    <>
      <PhotoCreditsHero />

      <PhotoCreditsList />
    </>
  )
}
