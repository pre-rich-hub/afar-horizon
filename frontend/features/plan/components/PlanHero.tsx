import { useTranslations } from 'next-intl'

import { PageHero } from '@/components/common/PageHero'

export function PlanHero() {
  const tr = useTranslations('UI.plan.PlanHero')

  return (
    <PageHero
        eyebrow={tr('planMyJourney')}
        title={tr('tellUsWhereYouWantToGo')}
        lede={tr('weWillHelpYouWorkOutHow')}
        image="https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/lake-assale.png"
        imageAlt={tr('lakeAssaleInTheDanakilDepression')}
        crumbs={[{ label: tr('home'), href: '/' }, { label: tr('planMyJourney') }]}
      />
  )
}
