import { PageHero } from '@/components/common/PageHero'
import type { Tour } from '../types/tour.types'

export function TourHero({ t }: { t: Tour }) {
  return (
    <PageHero
        eyebrow={t.style}
        title={t.title}
        lede={t.teaser}
        image={t.image}
        imageAlt={t.title}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Tours', href: '/tours' },
          { label: t.title },
        ]}
        meta={[
          { label: 'Duration', value: t.days },
          { label: 'Season', value: t.season },
          { label: 'Group Size', value: t.group },
          { label: 'From', value: t.from.split(' ')[0] },
        ]}
      />
  )
}
