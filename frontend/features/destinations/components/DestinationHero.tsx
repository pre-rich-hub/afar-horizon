import { PageHero } from '@/components/common/PageHero'
import type { Destination } from '../types/destination.types'

export function DestinationHero({ d }: { d: Destination }) {
  return (
    <PageHero
        eyebrow={`${d.tag} · ${d.region}`}
        title={d.name}
        lede={d.headline ? `${d.headline}.` : d.intro}
        image={d.image}
        imageAlt={`${d.name}, Ethiopia`}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Destinations', href: '/destinations' },
          { label: d.name },
        ]}
        meta={[
          { label: 'Best Time', value: d.bestTime },
          { label: 'Suggested Stay', value: d.duration },
          { label: 'Altitude', value: d.altitude },
          { label: 'Region', value: d.region },
        ]}
      />
  )
}
