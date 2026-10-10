import { PageHero } from '@/components/common/PageHero'
import type { Tour } from '../types/tour.types'
import { formatDuration, getStartEnd } from '../utils/tour.utils'

export function TourHero({ t }: { t: Tour }) {
  const priceOnRequest = t.from === 'Price on request'
  return (
    <PageHero
        eyebrow={t.style}
        title={t.title}
        lede={t.teaser}
        image={t.image}
        imageAlt={t.title}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Expeditions', href: '/expeditions' },
          { label: t.title },
        ]}
        meta={[
          { label: 'Duration', value: formatDuration(t) },
          { label: 'Start & Finish', value: getStartEnd(t) },
          { label: 'Difficulty', value: t.difficulty ?? t.style },
          { label: priceOnRequest ? 'Pricing' : 'From', value: priceOnRequest ? t.from : t.from.split(' ')[0] },
        ]}
      />
  )
}
