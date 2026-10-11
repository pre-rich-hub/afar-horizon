import { useTranslations } from 'next-intl'

import { CtaBand } from '@/components/common/CtaBand'

export function FaqPlanning() {
  const tr = useTranslations('UI.faq.FaqPlanning')

  return (
    <CtaBand
        title={tr('didnTFindYourQuestion')}
        text={tr('askUsAboutCurrentConditionsYourDates')}
        secondary={{ label: tr('beforeYouGo'), href: '/before-you-go' }}
      />
  )
}
