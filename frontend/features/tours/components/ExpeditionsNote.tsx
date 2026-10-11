import { useTranslations } from 'next-intl'

import { Reveal } from '@/components/common/Reveal'
import { expeditionConditionsNote } from '../data/tour.data'

export function ExpeditionsNote() {
  const tr = useTranslations('UI.tours.ExpeditionsNote')

  return (
    <section className="border-y border-border bg-secondary text-secondary-foreground">
        <div className="shell grid gap-8 py-16 sm:py-20 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow mb-4 text-accent">{tr('howOurItinerariesWork')}</p>
            <h2 className="max-w-[20ch] text-balance text-3xl leading-[1.1] text-background sm:text-4xl">
              {tr('aPlannedRouteNotAPromiseFrom')}</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-pretty leading-relaxed text-background/75 sm:text-lg">
              {expeditionConditionsNote}
            </p>
            <p className="mt-5 text-pretty leading-relaxed text-background/75">
              {tr('pricesAreStartingPricesPerPersonYour')}</p>
          </Reveal>
        </div>
      </section>
  )
}
