import { useTranslations } from 'next-intl'

import { CtaBand } from '@/components/common/CtaBand'

export function ExpeditionsPlanning() {
  const tr = useTranslations('UI.tours.ExpeditionsPlanning')

  return (
    <CtaBand
        title={tr('notSureWhichExpeditionFits')}
        text={tr('tellUsYourDatesHowManyDays')}
        secondary={{ label: tr('seeDestinations'), href: '/destinations' }}
      />
  )
}
