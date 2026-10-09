import { GalleryCollection, GalleryHero, GalleryPlanning } from '@/features/gallery'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Salt flats, rock-hewn churches, highland wildlife and living traditions — a gallery of Ethiopia as our travellers see it.',
}

export default function GalleryPage() {
  return (
    <>
      <GalleryHero />

      <GalleryCollection />

      <GalleryPlanning />
    </>
  )
}
