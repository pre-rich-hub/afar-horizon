import { BookingCard } from '@/components/common/BookingCard'
import { Reveal } from '@/components/common/Reveal'
import { accessUpdate } from '@/lib/constants/travelAdvice'
import { AlertTriangle, MapPin, Moon, Utensils } from 'lucide-react'
import { expeditionConditionsNote } from '../data/tour.data'
import type { Tour } from '../types/tour.types'
import { formatDuration, getStartEnd } from '../utils/tour.utils'

export function TourOverview({ t }: { t: Tour }) {
  const startEnd = getStartEnd(t)

  return (
    <section className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_360px] lg:gap-x-16 lg:gap-y-0 xl:grid-cols-[1fr_380px] xl:gap-x-20 lg:py-28">
        <Reveal className="lg:col-start-1 lg:row-start-1">
          <p className="eyebrow mb-5 text-accent">
            The Journey
          </p>
          <h2 className="max-w-[22ch] text-balance text-3xl leading-[1.1] text-foreground sm:text-4xl">
            {t.teaser}
          </h2>
          <p className="mt-7 text-pretty leading-relaxed text-muted-foreground sm:text-lg">
            {t.summary}
          </p>
          {t.why && (
            <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">{t.why}</p>
          )}

          {(t.idealFor || t.notFor) && (
            <dl className="mt-10 grid gap-6 sm:grid-cols-2">
              {t.idealFor && (
                <div className="border-t-2 border-accent pt-4">
                  <dt className="eyebrow mb-2 text-primary">Who it is for</dt>
                  <dd className="text-pretty text-sm leading-relaxed text-foreground">{t.idealFor}</dd>
                </div>
              )}
              {t.notFor && (
                <div className="border-t-2 border-border pt-4">
                  <dt className="eyebrow mb-2 text-muted-foreground">Consider another itinerary if</dt>
                  <dd className="text-pretty text-sm leading-relaxed text-muted-foreground">{t.notFor}</dd>
                </div>
              )}
            </dl>
          )}

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
            subtitle="per person, confirmed on quotation"
            rows={[
              { k: 'Duration', v: formatDuration(t) },
              { k: 'Start & finish', v: startEnd },
              ...(t.difficulty ? [{ k: 'Difficulty', v: t.difficulty }] : []),
              { k: 'Group', v: t.group },
              { k: 'Best season', v: t.season },
            ]}
            primary={{ label: 'Check my dates', href: '#enquire' }}
            secondary={{ label: 'Ask about current conditions', href: '/contact' }}
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
              The planned route
            </h2>
            <p className="mt-5 text-pretty leading-relaxed text-muted-foreground sm:text-lg">
              Exact timings, camp locations and access are confirmed for your dates.
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
                {(step.overnight || step.meals) && (
                  <dl className="mt-3.5 flex flex-wrap gap-x-6 gap-y-1.5 text-[13px] text-muted-foreground">
                    {step.overnight && (
                      <div className="flex items-center gap-1.5">
                        <Moon aria-hidden className="h-3.5 w-3.5 text-accent" />
                        <dt className="sr-only">Overnight</dt>
                        <dd>{step.overnight === 'None' ? 'No overnight' : step.overnight}</dd>
                      </div>
                    )}
                    {step.meals && (
                      <div className="flex items-center gap-1.5">
                        <Utensils aria-hidden className="h-3.5 w-3.5 text-accent" />
                        <dt className="sr-only">Meals</dt>
                        <dd>{step.meals}</dd>
                      </div>
                    )}
                  </dl>
                )}
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-14 flex gap-4 border border-border bg-card p-6 sm:p-7">
            <AlertTriangle aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <div className="space-y-3 text-pretty text-sm leading-relaxed text-muted-foreground">
              <p className="font-semibold text-foreground">Operating subject to current access and conditions</p>
              {t.accessNote && <p>{t.accessNote}</p>}
              <p>{expeditionConditionsNote}</p>
              <p>
                <span className="font-medium text-foreground">Official travel advice ({accessUpdate.checked}):</span>{' '}
                {accessUpdate.text}{' '}
                <a href={accessUpdate.source} target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">
                  Read the current advice
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>
  )
}
