import { CalendarDays, Clock, MapPin, Users } from 'lucide-react'
import { InfoCard } from '@/components/cards/info-card'
import type { Tour } from '@/types'

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
      href={`/tours/${t.slug}`}
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
        { icon: CalendarDays, label: `${t.days} · ${t.nights} nights` },
      ]}
      sizes={sizes}
    />
  )
}
