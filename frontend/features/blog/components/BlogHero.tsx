import { PageHero } from '@/components/common/PageHero'

export function BlogHero() {
  return (
    <PageHero
        eyebrow="The Journal"
        title="Field notes from the highlands"
        lede="Written by the people who run these journeys — when to come, what to pack, how to sit through a coffee ceremony properly, and why we work the way we do."
        image="/images/coffee-ceremony.png"
        imageAlt="Green coffee beans roasting over coals during an Ethiopian coffee ceremony"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Journal' }]}
      />
  )
}
