import { BookingCard } from '@/components/common/BookingCard'
import { Reveal } from '@/components/common/Reveal'
import { MapPin } from 'lucide-react'
import type { Tour } from '../types/tour.types'

export function TourOverview({ t }: { t: Tour }) {
  return (
    <section className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_360px] lg:gap-x-16 lg:gap-y-0 xl:grid-cols-[1fr_380px] xl:gap-x-20 lg:py-28">
        <Reveal className="lg:col-start-1 lg:row-start-1">
          <p className="eyebrow mb-5 text-accent">
            The Journey
          </p>
          <h2 className="max-w-[22ch] text-balance text-3xl leading-[1.1] text-foreground sm:text-4xl">
            {t.nights} nights, designed around the hours that matter
          </h2>
          <p className="mt-7 text-pretty leading-relaxed text-muted-foreground sm:text-lg">
            {t.summary}
          </p>

          <div className="mt-10">
            <p className="eyebrow mb-5 text-primary">
              Places
            </p>
            <ul className="flex flex-wrap gap-2">
              {t.places.map((p) => (
                <li
                  key={p}
                  className="inline-flex items-center gap-2 border border-border bg-card px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:text-[11px]"
                >
                  <MapPin className="h-3 w-3 text-accent" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <aside className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <div className="lg:sticky lg:top-28">
        <Reveal delay={120}>
          <BookingCard
            label="Pricing"
            title={`From ${t.from.split(' per')[0]}`}
            subtitle="per person, twin share"
            rows={[
              { k: 'Duration', v: `${t.days} / ${t.nights} Nights` },
              { k: 'Group size', v: t.group },
              { k: 'Best season', v: t.season },
              {
                k: 'Start & finish',
                v:
                  t.places[0] === t.places[t.places.length - 1]
                    ? t.places[0]
                    : `${t.places[0]} – ${t.places[t.places.length - 1]}`,
              },
            ]}
            primary={{ label: 'Book this tour', href: '#enquire' }}
          />
        </Reveal>
          </div>
        </aside>

        {/* Itinerary */}
        <div className="border-t border-border pt-16 sm:pt-20 lg:col-start-1 lg:row-start-2 lg:mt-20 lg:pt-20">
          <Reveal className="mb-12 max-w-2xl sm:mb-16">
            <p className="eyebrow mb-5 text-accent">
              Day by Day
            </p>
            <h2 className="text-balance text-3xl leading-[1.1] text-foreground sm:text-4xl lg:text-5xl">
              The itinerary, as it usually runs
            </h2>
            <p className="mt-5 text-pretty leading-relaxed text-muted-foreground sm:text-lg">
              A working draft rather than a fixed schedule — we move days around
              for weather, festivals and how you are feeling.
            </p>
          </Reveal>

          <ol className="relative border-l border-border pl-8 sm:pl-12">
            {t.itinerary.map((step, i) => (
              <Reveal
                key={step.day}
                delay={i * 70}
                as="li"
                className="relative pb-10 last:pb-0"
              >
                <span
                  aria-hidden
                  className="absolute -left-[38px] top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-accent ring-4 ring-background sm:-left-[54px]"
                />
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent sm:text-[11px]">
                  {step.day}
                </p>
                <h3 className="mt-2 font-serif text-2xl text-foreground sm:text-[1.75rem]">
                  {step.title}
                </h3>
                <p className="mt-2.5 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
                  {step.text}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
  )
}
