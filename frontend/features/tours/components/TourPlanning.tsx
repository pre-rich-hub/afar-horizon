import {useToursCopy} from '../data/localized'
import { useTranslations } from 'next-intl'

import { CtaBand } from '@/components/common/CtaBand'
import type { Tour } from '../types/tour.types'

export function TourPlanning({ t: baset }: { t: Tour }) {
  const t = useToursCopy('tour.tours', baset)

  const tr = useTranslations('UI.tours.TourPlanning')

  return (
    <CtaBand
        title={tr('questionsBeforeYouEnquire')}
        text={tr('heatRoadTimeHowHardTheWalking')}
        secondary={{ label: tr('allExpeditions'), href: '/expeditions' }}
        image={t.image}
      />
  )
}
