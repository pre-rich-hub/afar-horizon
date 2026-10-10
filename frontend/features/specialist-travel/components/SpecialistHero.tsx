import { PageHero } from '@/components/common/PageHero'

export function SpecialistHero() {
  return (
    <PageHero
      eyebrow="Specialist Travel"
      title="Your purpose is different, so your journey should be too"
      lede="Some travellers arrive with a camera, a research question, a film crew or a running goal. These journeys need different logistics, and we build them around you."
      image="/images/hero-danakil/dallol-springs.jpg"
      imageAlt="Green pools and sulphur terraces at Dallol"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Specialist Travel' }]}
    />
  )
}
