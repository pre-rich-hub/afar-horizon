import { tours } from '../data/tour.data'

export function getTour(slug: string) {
  return tours.find((t) => t.slug === slug)
}

import type { Tour } from '../types/tour.types'

export function getRelatedTours(t: Tour) {
  const others = tours.filter((o) => o.slug !== t.slug).slice(0, 3)
  return { others }
}

export function getFeaturedTour(tours: Tour[]) {
  const hero = tours.find((t) => t.featured) ?? tours[0]
  return { hero }
}
