import { SectionHeading } from '@/components/common/SectionHeading'
import { galleryCategories, galleryPhotos } from '../data/gallery.data'
import { GalleryGrid } from './GalleryGrid'

export function GalleryCollection() {
  return (
    <section className="shell py-16 sm:py-20 lg:py-28">
        <SectionHeading
          eyebrow="The Collection"
          title="Moments from the road"
          aside="Tap any photograph to see it in full. Every scene here sits on a route we run — ask us how to stand where the camera stood."
        />
        <GalleryGrid photos={galleryPhotos} categories={galleryCategories} />
      </section>
  )
}
