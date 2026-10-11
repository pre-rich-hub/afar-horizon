import { useTranslations } from 'next-intl'

import { CtaBand } from '@/components/common/CtaBand'

export function SpecialistPlanning() {
  const tr = useTranslations('UI.specialisttravel.SpecialistPlanning')

  return (
    <CtaBand
      title={tr('tellUsWhatYouArePlanning')}
      text={tr('shareYourPurposeDatesGroupSizeAnd')}
      secondary={{ label: tr('groundOperations'), href: '/ground-operations' }}
      image="https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/lake-assale.png"
    />
  )
}
