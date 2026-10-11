import { PageHero } from '@/components/common/PageHero'

export function SpecialistHero() {
  return (
    <PageHero
      eyebrow="Specialist Travel"
      title="Your purpose is different, so your journey should be too"
      lede="Some travellers arrive with a camera, a research question, a film crew or a running goal. These journeys need different logistics, and we build them around you."
      image="https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/danakil-depression.png"
      imageAlt="Dallol in the Danakil Depression"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Specialist Travel' }]}
    />
  )
}
