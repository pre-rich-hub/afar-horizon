import { PageHero } from '@/components/common/PageHero'

export function PhotoCreditsHero() {
  return (
    <PageHero
        eyebrow="Photo Credits"
        title="Photographs on this site"
        lede="Some photographs are freely licensed images from Wikimedia Commons, resized for the web. We are grateful to the photographers below."
        image="/images/hero-danakil/salt-flats.jpg"
        imageAlt="Salt crust in the Danakil Depression"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Photo Credits' }]}
      />
  )
}
