import {useGalleryCopy} from '../data/localized'
import { useTranslations } from 'next-intl'

import { SectionHeading } from '@/components/common/SectionHeading'
import { galleryCategories as baseGalleryCategories, galleryPhotos as baseGalleryPhotos } from '../data/gallery.data'
import { GalleryGrid } from './GalleryGrid'

export function GalleryCollection() {
  const tr = useTranslations('UI.gallery.GalleryCollection')
  const galleryPhotos = useGalleryCopy('gallery.galleryPhotos', baseGalleryPhotos)
  const galleryCategories = useGalleryCopy('gallery.galleryCategories', baseGalleryCategories)

  return (
    <section className="shell py-16 sm:py-20 lg:py-28">
        <SectionHeading
          eyebrow={tr('theCollection')}
          title={tr('momentsFromTheRoad')}
          aside={tr('exploreMountainLandscapesRockHewnChurchesLocal')}
        />
        <GalleryGrid photos={galleryPhotos} categories={baseGalleryCategories} categoryLabels={galleryCategories} />
      </section>
  )
}
