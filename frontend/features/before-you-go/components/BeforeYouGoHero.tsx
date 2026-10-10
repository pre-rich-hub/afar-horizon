import { PageHero } from '@/components/common/PageHero'

export function BeforeYouGoHero() {
  return (
    <PageHero
        eyebrow="Before You Go"
        title="What the journey is really like"
        lede="The Danakil and northern Ethiopia are not ordinary sightseeing. Here is what to expect, honestly, so you arrive prepared rather than surprised."
        image="/images/hero-danakil/dallol-aerial.jpg"
        imageAlt="Aerial view of the hydrothermal fields at Dallol"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Before You Go' }]}
      />
  )
}
