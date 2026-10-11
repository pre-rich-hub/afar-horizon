import {useDuration} from '@/lib/i18n/labels'
import {useToursCopy} from '../data/localized'
import { useTranslations } from 'next-intl'

import { BookingCard } from '@/components/common/BookingCard'
import { Reveal } from '@/components/common/Reveal'
import { AlertTriangle, MapPin, Moon, Utensils } from 'lucide-react'
import { expeditionConditionsNote } from '../data/tour.data'
import type { Tour } from '../types/tour.types'
import { formatDuration, getStartEnd } from '../utils/tour.utils'
import Link from '@/components/common/SiteLink'

export function TourOverview({ t: baset, placeLinks = {} }: { t: Tour; placeLinks?: Record<string, string> }) {
  const duration = useDuration()

  const t = useToursCopy('tour.tours', baset)

  const tr = useTranslations('UI.tours.TourOverview')

  const startEnd = getStartEnd(t)
  const priceOnRequest = t.from === 'Price on request'

  return (
    <section className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_360px] lg:gap-x-16 lg:gap-y-0 xl:grid-cols-[1fr_380px] xl:gap-x-20 lg:py-28">
        <Reveal className="lg:col-start-1 lg:row-start-1">
          <p className="eyebrow mb-5 text-accent">
            {tr('theJourney')}</p>
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
                  <dt className="eyebrow mb-2 text-primary">{tr('whoItIsFor')}</dt>
                  <dd className="text-pretty text-sm leading-relaxed text-foreground">{t.idealFor}</dd>
                </div>
              )}
              {t.notFor && (
                <div className="border-t-2 border-border pt-4">
                  <dt className="eyebrow mb-2 text-muted-foreground">{tr('considerAnotherItineraryIf')}</dt>
                  <dd className="text-pretty text-sm leading-relaxed text-muted-foreground">{t.notFor}</dd>
                </div>
              )}
            </dl>
          )}

          <div className="mt-10">
            <p className="eyebrow mb-5 text-primary">
              {tr('places')}</p>
            <ul className="flex flex-wrap gap-2">
              {t.places.map((p) => (
                <li
                  key={p}
                  className="inline-flex items-center gap-2 border border-border bg-card px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:text-[11px]"
                >
                  <MapPin className="h-3 w-3 text-accent" />
                  {placeLinks[p] ? <Link href={placeLinks[p]} className="transition-colors hover:text-primary focus-visible:underline">{p}</Link> : p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <aside className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <div className="lg:sticky lg:top-28">
        <Reveal delay={120}>
          <BookingCard
            label={tr('pricing')}
            title={priceOnRequest ? t.from : tr('fromPrice', {value0: t.from.split(' per')[0]})}
            subtitle={priceOnRequest ? tr('confirmedOnQuotation') : tr('perPersonConfirmedOnQuotation')}
            rows={[
              { k: tr('duration'), v: duration(t) },
              { k: tr('startFinish'), v: startEnd },
              ...(t.difficulty ? [{ k: tr('difficulty'), v: t.difficulty }] : []),
              { k: tr('group'), v: t.group },
              { k: tr('bestSeason'), v: t.season },
            ]}
            primary={{ label: tr('checkMyDates'), href: '#enquire' }}
            secondary={{ label: tr('askAboutCurrentConditions'), href: '/contact' }}
          />
        </Reveal>
          </div>
        </aside>

        {/* Itinerary */}
        <div className="border-t border-border pt-16 sm:pt-20 lg:col-start-1 lg:row-start-2 lg:mt-20 lg:pt-20">
          <Reveal className="mb-12 max-w-2xl sm:mb-16">
            <p className="eyebrow mb-5 text-accent">
              {tr('dayByDay')}</p>
            <h2 className="text-balance text-3xl leading-[1.1] text-foreground sm:text-4xl lg:text-5xl">
              {tr('thePlannedRoute')}</h2>
            <p className="mt-5 text-pretty leading-relaxed text-muted-foreground sm:text-lg">
              {tr('exactTimingsCampLocationsAndAccessAre')}</p>
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
                        <dt className="sr-only">{tr('overnight')}</dt>
                        <dd>{step.overnight === 'None' ? tr('noOvernight') : step.overnight}</dd>
                      </div>
                    )}
                    {step.meals && (
                      <div className="flex items-center gap-1.5">
                        <Utensils aria-hidden className="h-3.5 w-3.5 text-accent" />
                        <dt className="sr-only">{tr('meals')}</dt>
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
              <p className="font-semibold text-foreground">{tr('operatingSubjectToCurrentAccessAndConditions')}</p>
              {t.accessNote && <p>{t.accessNote}</p>}
              <p>{expeditionConditionsNote}</p>
            </div>
          </Reveal>
        </div>
      </section>
  )
}
