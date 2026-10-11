import { useTranslations } from 'next-intl'

import { PageHero } from '@/components/common/PageHero'

export function PhotoCreditsHero() {
  const tr = useTranslations('UI.photocredits.PhotoCreditsHero')

  return (
    <PageHero
        eyebrow={tr('photoCredits')}
        title={tr('photographsOnThisSite')}
        lede={tr('theDestinationAndExpeditionPhotographsOnThis')}
        image="https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/lake-assale.png"
        imageAlt={tr('lakeAssaleInTheDanakilDepression')}
        crumbs={[{ label: tr('home'), href: '/' }, { label: tr('photoCredits') }]}
      />
  )
}
