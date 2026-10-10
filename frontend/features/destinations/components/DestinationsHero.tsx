import { PageHero } from '@/components/common/PageHero'
import { destinations } from '../data/destination.data'

export function DestinationsHero() {
  const ertaAle = destinations.find((d) => d.slug === 'erta-ale')!

  return (
    <PageHero
        eyebrow="Where We Travel"
        title="From the lowest landscapes to the highest horizons"
        lede="Salt and volcanoes in Afar, cliff churches in Gheralta, the ancient kingdom of Axum and the mountains of the Simien. These are the places we know from the ground up."
        image={ertaAle.image}
        imageAlt="Erta Ale volcano in Afar, Ethiopia"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Destinations' }]}
        meta={[
          { label: 'Destinations', value: String(destinations.length) },
          { label: 'Lowest Point', value: 'Below sea level' },
          { label: 'Highest Point', value: '4,550 m' },
          { label: 'Danakil Season', value: 'Nov – Jan' },
        ]}
      />
  )
}
