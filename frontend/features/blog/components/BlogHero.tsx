import { PageHero } from '@/components/common/PageHero'

export function BlogHero() {
  return (
    <PageHero
        eyebrow="The Journal"
        title="Field notes from Afar and beyond"
        lede="Plan your journey into Afar: when to visit, what to pack, and how to understand the volcanoes, salt country and communities of the Danakil. Alongside these guides, explore the culture and historic routes of wider Ethiopia."
        image="https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/afar.png"
        imageAlt="Afar region, Ethiopia"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Journal' }]}
      />
  )
}
