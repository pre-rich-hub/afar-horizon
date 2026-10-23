import { useTranslations } from 'next-intl'

import { PageHero } from '@/components/common/PageHero'

export function SafetyHero() {
  const tr = useTranslations('UI.safety.SafetyHero')

  return (
    <PageHero
        eyebrow={tr('safety')}
        title={tr('safetyIsOurFirstPriority')}
        lede={tr('theDanakilIsOneOfTheMost')}
        image="https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/erta-ale.png"
        imageAlt={tr('ertaAleVolcanoInTheAfarRegion')}
        crumbs={[{ label: tr('home'), href: '/' }, { label: tr('safety') }]}
      />
  )
}
