import { useTranslations } from 'next-intl'

import { CtaBand } from '@/components/common/CtaBand'

export function AboutPlanning() {
  const tr = useTranslations('UI.about.AboutPlanning')

  return (
    <div id="plan" className="scroll-mt-32">
        <CtaBand
          title={tr('startWithAConversation')}
          text={tr('tellUsHowMuchTimeYouHave')}
          primary={{ label: tr('planWithUs'), href: '/contact' }}
          secondary={{ label: tr('browseExpeditions'), href: '/expeditions' }}
          image="https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/lalibela.png"
        />
      </div>
  )
}
