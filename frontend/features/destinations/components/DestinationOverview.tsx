import {useToursCopy} from '@/features/tours'
import {useDestinationsCopy} from '../data/localized'
import { useTranslations } from 'next-intl'

import { Reveal } from '@/components/common/Reveal'
import type { Tour } from '@/features/tours'
import type { Destination } from '../types/destination.types'
import { DestinationBooking } from './DestinationBooking'
import { DestinationHighlights } from './DestinationHighlights'
import { DestinationJourneys } from './DestinationJourneys'
import {useBlogCopy} from '@/features/blog'
import { getPost } from '@/features/blog'
import Link from '@/components/common/SiteLink'

export function DestinationOverview({ d: based, fallback: basefallback }: { d: Destination; fallback: Tour[] }) {
  const d = useDestinationsCopy('destination.destinations', based)
  const fallback = useToursCopy('tour.tours', basefallback)

  const tr = useTranslations('UI.destinations.DestinationOverview')

  const guide = useBlogCopy('post.posts', d.guideSlug ? getPost(d.guideSlug) : undefined)
  return (
    <section className="shell grid gap-14 py-16 sm:py-20 lg:grid-cols-[1fr_360px] lg:gap-x-16 lg:gap-y-0 lg:py-28 xl:grid-cols-[1fr_380px] xl:gap-x-20">
          <Reveal className="lg:col-start-1 lg:row-start-1">
            <p className="eyebrow mb-5 text-accent">
              {tr('whyWeGo')}</p>
            <h2 className="max-w-[24ch] text-balance text-3xl leading-[1.1] text-foreground sm:text-4xl">
              {d.teaser}
            </h2>
            <div className="mt-8 space-y-6">
              {d.headline && (
                <p className="text-pretty leading-relaxed text-muted-foreground sm:text-lg">{d.intro}</p>
              )}
              {d.paragraphs.map((p) => (
                <p
                  key={p.slice(0, 24)}
                  className="text-pretty leading-relaxed text-muted-foreground sm:text-lg"
                >
                  {p}
                </p>
              ))}
              {guide && <p className="text-sm leading-relaxed text-muted-foreground">
                {tr('planningYourVisitRead')}{' '}
                <Link href={`/blog/${guide.slug}`} className="text-primary underline underline-offset-4 hover:text-accent">{guide.title}</Link>.
              </p>}
            </div>
          </Reveal>

        <DestinationBooking d={d} />

          <DestinationHighlights d={d} />

          {/* Related tours, in the left column so the card stays pinned */}
          <DestinationJourneys d={d} fallback={fallback} />
      </section>
  )
}
