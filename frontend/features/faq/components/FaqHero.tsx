import { useTranslations } from 'next-intl'

import { PageHero } from '@/components/common/PageHero'

export function FaqHero() {
  const tr = useTranslations('UI.faq.FaqHero')

  return (
    <PageHero
        eyebrow={tr('faq')}
        title={tr('questionsTravellersAsk')}
        lede={tr('straightAnswersAboutHowWeWorkWhat')}
        image="https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/danakil-depression.png"
        imageAlt={tr('dallolInTheDanakilDepression')}
        crumbs={[{ label: tr('home'), href: '/' }, { label: tr('faq') }]}
      />
  )
}
