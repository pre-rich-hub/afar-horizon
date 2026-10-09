import { PageHero } from '@/components/common/PageHero'

export function DestinationsHero() {
  return (
    <PageHero
        eyebrow="Where We Travel"
        title="Eight Ethiopias, and the routes between them"
        lede="From churches carved downward into the rock to a lava lake burning below sea level. These are the places our designers know by name, season and hour of day."
        image="/images/gondar.png"
        imageAlt="The royal enclosure of Fasil Ghebbi in Gondar at golden hour"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Destinations' }]}
        meta={[
          { label: 'Destinations', value: '8' },
          { label: 'UNESCO Sites', value: '4' },
          { label: 'Altitude Range', value: '-125 – 4,533 m' },
          { label: 'Best Months', value: 'Oct – Mar' },
        ]}
      />
  )
}
