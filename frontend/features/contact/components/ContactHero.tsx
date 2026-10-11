import { useTranslations } from 'next-intl'

import { PageHero } from '@/components/common/PageHero'

export function ContactHero() {
  const tr = useTranslations('UI.contact.ContactHero')

  return (
    <PageHero
        eyebrow={tr('speakWithADesigner')}
        title={tr('everyJourneyBeginsWithAConversation')}
        lede={tr('noCallCentresAndNoTemplatesWrite')}
        image="https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/afar.png"
        imageAlt={tr('afarRegionEthiopia')}
        crumbs={[{ label: tr('home'), href: '/' }, { label: tr('contact') }]}
        meta={[
          { label: tr('replyTime'), value: 'Within 24 hrs' },
          { label: tr('basedIn'), value: 'Addis Ababa' },
          { label: tr('support'), value: '24/7 In-Country' },
          { label: tr('deposit'), value: 'Only When Right' },
        ]}
      />
  )
}
