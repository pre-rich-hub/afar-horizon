import { useTranslations } from 'next-intl'

import { PageHero } from '@/components/common/PageHero'

export function ExpeditionsHero({ count }: { count: number }) {
  const tr = useTranslations('UI.tours.ExpeditionsHero')

  return (
    <PageHero
        eyebrow={tr('expeditions')}
        title={tr('chooseYourHorizon')}
        lede={tr('fromASingleDayInAfarTo')}
        image="https://res.cloudinary.com/xsrr0wfh/image/upload/v1791652748/LakeAfdera.png"
        imageAlt={tr('lakeAfderaInTheAfarRegion')}
        crumbs={[{ label: tr('home'), href: '/' }, { label: tr('expeditions') }]}
        meta={[
          { label: tr('expeditions'), value: String(count) },
          { label: tr('length'), value: '1 – 21 Days' },
          { label: tr('danakilGateway'), value: 'Semera' },
          { label: tr('style'), value: 'Private' },
        ]}
      />
  )
}
