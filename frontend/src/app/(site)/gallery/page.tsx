import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/page-hero'
import { CtaBand } from '@/components/layout/cta-band'
import { SectionHeading } from '@/components/ui/section-heading'
import { GalleryGrid } from '@/features/gallery/components/gallery-grid'
import { galleryCategories, galleryPhotos } from '@/content'

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Salt flats, rock-hewn churches, highland wildlife and living traditions — a gallery of Ethiopia as our travellers see it.',
}

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="The Gallery"
        title="Ethiopia, seen slowly"
        lede="Salt and fire in the Afar, stone churches in the north, mist on the high plateaus and the people who make each place what it is."
        image="/images/hero-simien.png"
        imageAlt="Mist rolling through the Simien Mountains escarpment at sunrise"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]}
      />

      <section className="shell py-16 sm:py-20 lg:py-28">
        <SectionHeading
          eyebrow="The Collection"
          title="Moments from the road"
          aside="Tap any photograph to see it in full. Every scene here sits on a route we run — ask us how to stand where the camera stood."
        />
        <GalleryGrid photos={galleryPhotos} categories={galleryCategories} />
      </section>

      <CtaBand
        title="See it for yourself"
        text="Tell us which of these places pulls at you, and a designer will shape a journey around the light, the season and the pace you prefer."
        primary={{ label: 'Plan Your Journey', href: '/contact' }}
        secondary={{ label: 'Browse Tours', href: '/tours' }}
        image="/images/danakil.png"
      />
    </>
  )
}
