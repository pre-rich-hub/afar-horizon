import {useCatalogueLabel} from '@/lib/i18n/labels'
import {useToursCopy} from '../data/localized'

import { InfoCard } from '@/components/common/InfoCard'
import { CalendarDays, Clock, MapPin, Users } from 'lucide-react'
import type { Tour } from '../types/tour.types'

export function TourCard({
  tour: baset,
  sizes,
}: {
  tour: Tour
  sizes?: string
}) {
  const catalogueLabel = useCatalogueLabel()

  const t = useToursCopy('tour.tours', baset)

  const [kind] = t.style.split(' · ')
  const priceOnRequest = t.from === 'Price on request'
  return (
    <InfoCard
      href={`/expeditions/${t.slug}`}
      image={t.image}
      imageAlt={t.imageAlt ?? t.title}
      badge={catalogueLabel(kind)}
      eyebrow={priceOnRequest ? catalogueLabel(t.from) : `From ${t.from.replace(' per person', '')} per person`}
      title={t.title}
      summary={t.teaser}
      facts={[
        { icon: MapPin, label: `${t.places.length} places` },
        { icon: Users, label: t.group },
        { icon: Clock, label: t.season },
        {
          icon: CalendarDays,
          label: t.nights ? `${t.days} · ${t.nights} ${t.nights === 1 ? 'night' : 'nights'}` : t.days,
        },
      ]}
      sizes={sizes}
    />
  )
}
