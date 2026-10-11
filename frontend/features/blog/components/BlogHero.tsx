import { useTranslations } from 'next-intl'

import { PageHero } from '@/components/common/PageHero'

export function BlogHero() {
  const tr = useTranslations('UI.blog.BlogHero')

  return (
    <PageHero
        eyebrow={tr('theJournal')}
        title={tr('fieldNotesFromAfarAndBeyond')}
        lede={tr('planYourJourneyIntoAfarWhenTo')}
        image="https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/afar.png"
        imageAlt={tr('afarRegionEthiopia')}
        crumbs={[{ label: tr('home'), href: '/' }, { label: tr('journal') }]}
      />
  )
}
