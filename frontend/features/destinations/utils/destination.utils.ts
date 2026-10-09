import { destinations } from '../data/destination.data'

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug)
}

export const regions = Array.from(new Set(destinations.map((d) => d.region)))

import { tours } from '@/features/tours'
import type { Destination } from '../types/destination.types'

export function getDestinationRelations(d: Destination) {
  const related = tours.filter((t) => t.places.some((p) => p.includes(d.name.split(' ')[0]))).slice(0, 3)
  const fallback = related.length ? related : tours.slice(0, 3)
  const others = destinations.filter((o) => o.slug !== d.slug).slice(0, 4)
  return { fallback, others }
}
