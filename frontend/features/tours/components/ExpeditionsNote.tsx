import { Reveal } from '@/components/common/Reveal'
import { accessUpdate } from '@/lib/constants/travelAdvice'
import { expeditionConditionsNote } from '../data/tour.data'

export function ExpeditionsNote() {
  return (
    <section className="border-y border-border bg-secondary text-secondary-foreground">
        <div className="shell grid gap-8 py-16 sm:py-20 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow mb-4 text-accent">How our itineraries work</p>
            <h2 className="max-w-[20ch] text-balance text-3xl leading-[1.1] text-background sm:text-4xl">
              A planned route, not a promise from nature
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-pretty leading-relaxed text-background/75 sm:text-lg">
              {expeditionConditionsNote}
            </p>
            <p className="mt-5 text-pretty leading-relaxed text-background/75">
              Prices are starting prices per person. Your final quotation depends on group
              size, dates, route, vehicles, accommodation and domestic flights, and we confirm
              it with you before you pay anything.
            </p>
            <p className="mt-5 text-pretty text-sm leading-relaxed text-background/60">
              Official travel advice ({accessUpdate.checked}): {accessUpdate.text}{' '}
              <a href={accessUpdate.source} target="_blank" rel="noopener noreferrer" className="text-background underline underline-offset-4">
                Read the current advice
              </a>
            </p>
          </Reveal>
        </div>
      </section>
  )
}
