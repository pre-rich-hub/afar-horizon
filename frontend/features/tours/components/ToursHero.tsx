import { PageHero } from '@/components/common/PageHero'

export function ToursHero() {
  return (
    <PageHero
        eyebrow="Tours & Journeys"
        title="Six routes, and none of them fixed"
        lede="Consider these starting points rather than packages. Each one has been run dozens of times, and each one gets redrawn around the guests travelling it."
        image="/images/luxury-lodge.png"
        imageAlt="A terrace at a highland lodge above the Ethiopian escarpment at dusk"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Tours' }]}
        meta={[
          { label: 'Journeys', value: '6' },
          { label: 'Length', value: '6 – 11 Days' },
          { label: 'Group Size', value: '2 – 10 Guests' },
          { label: 'Guiding', value: 'Private' },
        ]}
      />
  )
}
