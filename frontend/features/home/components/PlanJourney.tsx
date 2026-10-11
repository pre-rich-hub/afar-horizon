import { useTranslations } from 'next-intl'

import { Reveal } from '@/components/common/Reveal'
import { EnquiryForm } from '@/features/enquiries'
import { Check } from 'lucide-react'
import Image from 'next/image'

export function PlanJourney() {
  const tr = useTranslations('UI.home.PlanJourney')

  return (
    <section
      id="plan"
      className="relative overflow-hidden bg-primary text-primary-foreground"
    >
      <div className="absolute inset-0 opacity-15">
        <Image
          src="https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/lake-assale.png"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/90 to-primary/75" />
      </div>

      <div className="shell relative grid gap-12 py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:py-32">
        <Reveal>
          <p className="eyebrow mb-6 text-accent">
            {tr('planYourJourney')}</p>
          <h2 className="max-w-[16ch] text-balance font-serif text-[2.1rem] leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
            {tr('planYourExpeditionWithUs')}</h2>
          <p className="mt-7 max-w-md text-pretty text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
            {tr('tellUsYourDatesHowManyDays')}</p>
          <ul className="mt-10 space-y-4">
            {[
              tr('locallyOwned'),
              tr('clearPricing'),
              tr('honestConditions'),
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-relaxed text-primary-foreground/90 sm:text-base"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <Check className="h-3 w-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <EnquiryForm defaultStyles={[]} />
        </Reveal>
      </div>
    </section>
  )
}
