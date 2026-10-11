import { useTranslations } from 'next-intl'

import { PageHero } from '@/components/common/PageHero'

export function BeforeYouGoHero() {
  const tr = useTranslations('UI.beforeyougo.BeforeYouGoHero')

  return (
    <PageHero
        eyebrow={tr('beforeYouGo')}
        title={tr('whatTheJourneyIsReallyLike')}
        lede={tr('theDanakilAndNorthernEthiopiaAreNot')}
        image="https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/danakil-depression.png"
        imageAlt={tr('dallolInTheDanakilDepression')}
        crumbs={[{ label: tr('home'), href: '/' }, { label: tr('beforeYouGo') }]}
      />
  )
}
