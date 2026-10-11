import {useSharedCopy} from '@/lib/i18n/localized'
import { useTranslations } from 'next-intl'

import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import { promises as basePromises } from '@/lib/constants/company'

export function ContactPromises() {
  const tr = useTranslations('UI.contact.ContactPromises')
  const promises = useSharedCopy('company.promises', basePromises)

  return (
    <section className="shell py-16 sm:py-20 lg:py-28">
        <SectionHeading
          eyebrow={tr('ourPromise')}
          title={tr('whatYouGetFromWorkingWithUs')}
          align="center"
        />
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {promises.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 90}
              className="border-t border-border pt-6"
            >
              <p className="mb-3 font-serif text-xl text-foreground sm:text-2xl">
                {p.title}
              </p>
              <p className="text-pretty leading-relaxed text-muted-foreground">
                {p.text}
              </p>
            </Reveal>
          ))}
        </div>
      </section>
  )
}
