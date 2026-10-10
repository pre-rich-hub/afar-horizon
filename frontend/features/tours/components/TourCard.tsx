import { InfoCard } from '@/components/common/InfoCard'
import { CalendarDays, Clock, MapPin, Users } from 'lucide-react'
import type { Tour } from '../types/tour.types'

export function TourCard({
  tour: t,
  sizes,
}: {
  tour: Tour
  sizes?: string
}) {
  const [kind] = t.style.split(' · ')
  return (
    <InfoCard
      href={`/expeditions/${t.slug}`}
      image={t.image}
      imageAlt={t.title}
      badge={kind}
      eyebrow={`From ${t.from.replace(' per person', '')} per person`}
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
