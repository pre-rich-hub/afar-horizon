import { useTranslations } from 'next-intl'

import { Reveal } from '@/components/common/Reveal'

export function SpecialistPricing() {
  const tr = useTranslations('UI.specialisttravel.SpecialistPricing')

  return (
    <section className="shell py-16 sm:py-20">
      <Reveal className="max-w-3xl">
        <p className="eyebrow mb-4 text-accent">{tr('howSpecialistTripsArePriced')}</p>
        <p className="text-pretty leading-relaxed text-muted-foreground sm:text-lg">
          {tr('specialistWorkIsQuotedIndividuallyRatherThan')}</p>
      </Reveal>
    </section>
  )
}
