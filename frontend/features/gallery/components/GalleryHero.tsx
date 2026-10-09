import { PageHero } from '@/components/common/PageHero'

export function GalleryHero() {
  return (
    <PageHero
        eyebrow="The Gallery"
        title="Ethiopia, seen slowly"
        lede="Salt and fire in the Afar, stone churches in the north, mist on the high plateaus and the people who make each place what it is."
        image="/images/hero-simien.png"
        imageAlt="Mist rolling through the Simien Mountains escarpment at sunrise"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]}
      />
  )
}
