import { useTranslations } from 'next-intl'

import { CtaBand } from '@/components/common/CtaBand'

export function BeforeYouGoPlanning() {
  const tr = useTranslations('UI.beforeyougo.BeforeYouGoPlanning')

  return (
    <CtaBand
        title={tr('askAboutCurrentConditions')}
        text={tr('tellUsYourDatesAndWeWill')}
        secondary={{ label: tr('readTheFaq'), href: '/faq' }}
        image="https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/danakil-depression.png"
      />
  )
}
