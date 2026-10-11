import { useTranslations } from 'next-intl'

import { CtaBand } from '@/components/common/CtaBand'

export function DestinationsPlanning() {
  const tr = useTranslations('UI.destinations.DestinationsPlanning')

  return (
    <CtaBand
        title={tr('notSureWhereToStart')}
        text={tr('tellUsHowManyDaysYouHave')}
        secondary={{ label: tr('browseExpeditions'), href: '/expeditions' }}
        image="https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/simien-mountains.png"
      />
  )
}
