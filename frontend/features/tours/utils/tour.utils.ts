import { tours } from '../data/tour.data'
import type { ExpeditionCollection, Tour } from '../types/tour.types'

export function getTour(slug: string) {
  return tours.find((t) => t.slug === slug)
}

export function toursInCollection(id: ExpeditionCollection) {
  return tours.filter((t) => t.collection === id)
}

export function getRelatedTours(t: Tour) {
  const sameCollection = tours.filter((o) => o.slug !== t.slug && o.collection === t.collection)
  const others = (sameCollection.length >= 3 ? sameCollection : tours.filter((o) => o.slug !== t.slug))
    .slice(0, 3)
  return { others }
}

// "Semera – Addis Ababa", or one place when the route starts and ends there.
export function getStartEnd(t: Tour) {
  if (t.start && t.end) return t.start === t.end ? t.start : `${t.start} – ${t.end}`
  const first = t.places[0]
  const last = t.places[t.places.length - 1]
  return first === last ? first : `${first} – ${last}`
}

export function formatDuration(t: Tour) {
  return t.nights ? `${t.days} / ${t.nights} Nights` : t.days
}
