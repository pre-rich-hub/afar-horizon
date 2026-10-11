import { useTranslations } from 'next-intl'

import { CtaBand } from '@/components/common/CtaBand'

export function BlogPlanning() {
  const tr = useTranslations('UI.blog.BlogPlanning')

  return (
    <CtaBand
        title={tr('readSomethingThatChangedYourMind')}
        text={tr('mostOfTheseEssaysStartedAsAn')}
        secondary={{ label: tr('browseExpeditions'), href: '/expeditions' }}
        image="https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/simien-mountains.png"
      />
  )
}
