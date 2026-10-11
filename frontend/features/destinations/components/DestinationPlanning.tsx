import {useDestinationsCopy} from '../data/localized'
import { useTranslations } from 'next-intl'

import { CtaBand } from '@/components/common/CtaBand'
import type { Destination } from '../types/destination.types'

export function DestinationPlanning({ d: based }: { d: Destination }) {
  const d = useDestinationsCopy('destination.destinations', based)

  const tr = useTranslations('UI.destinations.DestinationPlanning')

  return (
    <CtaBand
        title={tr('yourEthiopiaShouldNotFeelLikeSomeone')}
        text={tr('askAboutRoadConditionsTheSeasonOr')}
        secondary={{ label: tr('allDestinations'), href: '/destinations' }}
        image={d.image}
      />
  )
}
