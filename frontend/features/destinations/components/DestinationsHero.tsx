import {useDestinationsCopy} from '../data/localized'
import { useTranslations } from 'next-intl'

import { PageHero } from '@/components/common/PageHero'
import { destinations as baseDestinations } from '../data/destination.data'

export function DestinationsHero() {
  const tr = useTranslations('UI.destinations.DestinationsHero')
  const destinations = useDestinationsCopy('destination.destinations', baseDestinations)

  const ertaAle = destinations.find((d) => d.slug === 'erta-ale')!

  return (
    <PageHero
        eyebrow={tr('whereWeTravel')}
        title={tr('fromTheLowestLandscapesToTheHighest')}
        lede={tr('saltAndVolcanoesInAfarCliffChurches')}
        image={ertaAle.image}
        imageAlt={tr('ertaAleVolcanoInAfarEthiopia')}
        crumbs={[{ label: tr('home'), href: '/' }, { label: tr('destinations') }]}
        meta={[
          { label: tr('destinations'), value: String(destinations.length) },
          { label: tr('lowestPoint'), value: 'Below sea level' },
          { label: tr('highestPoint'), value: '4,550 m' },
          { label: tr('danakilSeason'), value: 'Nov – Jan' },
        ]}
      />
  )
}
