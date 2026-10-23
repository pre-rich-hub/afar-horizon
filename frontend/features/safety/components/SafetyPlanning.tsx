import { useTranslations } from 'next-intl'

import { CtaBand } from '@/components/common/CtaBand'

export function SafetyPlanning() {
  const tr = useTranslations('UI.safety.SafetyPlanning')

  return (
    <CtaBand
        title={tr('askAboutSafetyForYourDates')}
        text={tr('tellUsWhenYouWantToTravel')}
        secondary={{ label: tr('readTheFaq'), href: '/faq' }}
        image="https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/erta-ale.png"
      />
  )
}
