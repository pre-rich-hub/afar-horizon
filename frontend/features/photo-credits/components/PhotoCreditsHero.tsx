
import { TranslationBoundary } from '@/components/common/TranslationBoundary'
import { PageHero } from '@/components/common/PageHero'

export function PhotoCreditsHero() {
  return (
    <TranslationBoundary><PageHero
        eyebrow="Photo Credits"
        title="Photographs on this site"
        lede="The destination and expedition photographs on this site were supplied by the client and are hosted on Cloudinary. Browse the collection below."
        image="https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/lake-assale.png"
        imageAlt="Lake Assale in the Danakil Depression"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Photo Credits' }]}
      /></TranslationBoundary>
  )
}
