import { PageHero } from '@/components/common/PageHero'

export function GroundOpsHero() {
  return (
    <PageHero
      eyebrow="Ground Operations"
      title="You bring the traveller. We handle the ground."
      lede="Local ground operations in Ethiopia for international tour operators, travel advisors, specialist agencies and travel designers."
      image="/images/hero-danakil/dallol-aerial.jpg"
      imageAlt="Aerial view of the hydrothermal fields at Dallol"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Ground Operations' }]}
    />
  )
}
