import { useTranslations } from 'next-intl'

import { CtaBand } from '@/components/common/CtaBand'

export function GalleryPlanning() {
  const tr = useTranslations('UI.gallery.GalleryPlanning')

  return (
    <CtaBand
        title={tr('seeItForYourself')}
        text={tr('tellUsWhichOfThesePlacesPulls')}
        primary={{ label: tr('planYourJourney'), href: '/contact' }}
        secondary={{ label: tr('browseExpeditions'), href: '/expeditions' }}
        image="https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/danakil-depression.png"
      />
  )
}
