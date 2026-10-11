import { PageHero } from '@/components/common/PageHero'

export function BeforeYouGoHero() {
  return (
    <PageHero
        eyebrow="Before You Go"
        title="What the journey is really like"
        lede="The Danakil and northern Ethiopia are not ordinary sightseeing. Here is what to expect, honestly, so you arrive prepared rather than surprised."
        image="https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/danakil-depression.png"
        imageAlt="Dallol in the Danakil Depression"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Before You Go' }]}
      />
  )
}
