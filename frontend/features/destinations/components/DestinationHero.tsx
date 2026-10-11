import {useDestinationsCopy} from '../data/localized'
import { useTranslations } from 'next-intl'

import { PageHero } from '@/components/common/PageHero'
import type { Destination } from '../types/destination.types'

export function DestinationHero({ d: based }: { d: Destination }) {
  const d = useDestinationsCopy('destination.destinations', based)

  const tr = useTranslations('UI.destinations.DestinationHero')

  return (
    <PageHero
        eyebrow={tr('valueValue', { value0: String(d.tag), value1: String(d.region) })}
        title={d.name}
        lede={d.headline ? `${d.headline}.` : d.intro}
        image={d.image}
        imageAlt={d.imageAlt ?? `${d.name}, Ethiopia`}
        crumbs={[
          { label: tr('home'), href: '/' },
          { label: tr('destinations'), href: '/destinations' },
          { label: d.name },
        ]}
        meta={[
          { label: tr('bestTime'), value: d.bestTime },
          { label: tr('suggestedStay'), value: d.duration },
          { label: tr('altitude'), value: d.altitude },
          { label: tr('region'), value: d.region },
        ]}
      />
  )
}
