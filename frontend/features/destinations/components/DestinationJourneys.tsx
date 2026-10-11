import {useToursCopy} from '@/features/tours'
import {useDestinationsCopy} from '../data/localized'
import {getDestination} from '../utils/destination.utils'
import { useTranslations } from 'next-intl'

import { Reveal } from '@/components/common/Reveal'
import type { Tour } from '@/features/tours'
import { TourCard } from '@/features/tours'
import { ArrowRight } from 'lucide-react'
import Link from '@/components/common/SiteLink'
import type { Destination } from '../types/destination.types'

export function DestinationJourneys({ d: based, fallback: basefallback }: { d: Destination; fallback: Tour[] }) {
  const d = useDestinationsCopy('destination.destinations', based)
  const fallback = useToursCopy('tour.tours', basefallback)

  const tr = useTranslations('UI.destinations.DestinationJourneys')

  const source = getDestination(d.slug)!
  const placeNames = source.places ?? [source.name]
  const includesDestination = fallback.some((t) => t.places.some((place) => placeNames.includes(place)))
  return (<div className="border-t border-border pt-12 lg:col-start-1 lg:row-start-3 lg:mt-14">
            <Reveal className="mb-10 flex flex-col justify-between gap-6 sm:mb-12 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className="eyebrow mb-4 text-accent sm:mb-5">
                  {includesDestination ? tr('expeditionsIncluding', {value0: d.name}) : tr('exploreOurExpeditions')}
                </p>
                <h2 className="text-balance text-3xl leading-[1.1] text-foreground sm:text-4xl">
                  {includesDestination ? tr('routesThatPassThroughHere') : tr('otherJourneysToConsider')}
                </h2>
              </div>
              <Link
                href="/expeditions"
                className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary transition-colors hover:text-accent sm:text-xs"
              >
                {tr('allExpeditions')}<ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2">
              {fallback.map((t, i) => (
                <Reveal key={t.slug} delay={(i % 2) * 90} className="h-full">
                  <TourCard tour={t} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw" />
                </Reveal>
              ))}
            </div>
          </div>)
}
