import { useTranslations } from 'next-intl'

import { PageHero } from '@/components/common/PageHero'

export function GroundOpsHero() {
  const tr = useTranslations('UI.groundoperations.GroundOpsHero')

  return (
    <PageHero
      eyebrow={tr('groundOperations')}
      title={tr('youBringTheTravellerWeHandleThe')}
      lede={tr('localGroundOperationsInEthiopiaForInternational')}
      image="https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/danakil-depression.png"
      imageAlt={tr('dallolInTheDanakilDepression')}
      crumbs={[{ label: tr('home'), href: '/' }, { label: tr('groundOperations') }]}
    />
  )
}
