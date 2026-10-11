
import { TranslationBoundary } from '@/components/common/TranslationBoundary'
import { SectionHeading } from '@/components/common/SectionHeading'
import { galleryCategories, galleryPhotos } from '../data/gallery.data'
import { GalleryGrid } from './GalleryGrid'

export function GalleryCollection() {
  return (
    <TranslationBoundary><section className="shell py-16 sm:py-20 lg:py-28">
        <SectionHeading
          eyebrow="The Collection"
          title="Moments from the road"
          aside="Explore mountain landscapes, rock-hewn churches, local crafts and moments along the journey. Filter by theme, then tap any photograph to see it in full and read its caption."
        />
        <GalleryGrid photos={galleryPhotos} categories={galleryCategories} />
      </section></TranslationBoundary>
  )
}
