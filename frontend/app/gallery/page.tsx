import { createPageMetadata } from '@/lib/seo/metadata'
import { GalleryCollection, GalleryHero, GalleryPlanning } from '@/features/gallery'

export const metadata = createPageMetadata({
  "title": "Afar & Northern Ethiopia Photo Gallery",
  "description": "Explore photographs of Afar, the Danakil Depression, salt lakes, volcanoes and northern Ethiopia. Discover landscapes and heritage along our routes.",
  "path": "/gallery",
  "image": "https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/simien-mountains.png",
  "imageAlt": "Simien Mountains, Ethiopia"
})

export default function GalleryPage() {
  return (
    <>
      <GalleryHero />

      <GalleryCollection />

      <GalleryPlanning />
    </>
  )
}
