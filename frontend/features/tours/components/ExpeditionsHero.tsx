import { PageHero } from '@/components/common/PageHero'

export function ExpeditionsHero({ count }: { count: number }) {
  return (
    <PageHero
        eyebrow="Expeditions"
        title="Choose your horizon"
        lede="From a single day in Afar to three weeks across Northern Ethiopia. Every itinerary is a planned route that we operate ourselves and adapt when conditions on the ground change."
        image="/images/hero-danakil/salt-flats.jpg"
        imageAlt="Cracked salt crust stretching to the horizon across the Danakil Depression"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Expeditions' }]}
        meta={[
          { label: 'Expeditions', value: String(count) },
          { label: 'Length', value: '1 – 21 Days' },
          { label: 'Danakil Gateway', value: 'Semera' },
          { label: 'Style', value: 'Private' },
        ]}
      />
  )
}
