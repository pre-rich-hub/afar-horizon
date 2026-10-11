import { useTranslations } from 'next-intl'

import { PageHero } from '@/components/common/PageHero'

export function SpecialistHero() {
  const tr = useTranslations('UI.specialisttravel.SpecialistHero')

  return (
    <PageHero
      eyebrow={tr('specialistTravel')}
      title={tr('yourPurposeIsDifferentSoYourJourney')}
      lede={tr('someTravellersArriveWithACameraA')}
      image="https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/danakil-depression.png"
      imageAlt={tr('dallolInTheDanakilDepression')}
      crumbs={[{ label: tr('home'), href: '/' }, { label: tr('specialistTravel') }]}
    />
  )
}
