import { PageHero } from '@/components/common/PageHero'

export function GalleryHero() {
  return (
    <PageHero
        eyebrow="The Gallery"
        title="Ethiopia, seen slowly"
        lede="Salt and fire in the Afar, stone churches in the north, mist on the high plateaus and the people who make each place what it is."
        image="https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/simien-mountains.png"
        imageAlt="Simien Mountains, Ethiopia"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]}
      />
  )
}
