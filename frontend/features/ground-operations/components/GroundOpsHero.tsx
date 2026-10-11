import { PageHero } from '@/components/common/PageHero'

export function GroundOpsHero() {
  return (
    <PageHero
      eyebrow="Ground Operations"
      title="You bring the traveller. We handle the ground."
      lede="Local ground operations in Ethiopia for international tour operators, travel advisors, specialist agencies and travel designers."
      image="https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/danakil-depression.png"
      imageAlt="Dallol in the Danakil Depression"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Ground Operations' }]}
    />
  )
}
