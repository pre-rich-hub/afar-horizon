import { tours } from '@/features/tours'
import { destinations } from '../data/destination.data'
import type { Destination, DestinationGroup } from '../types/destination.types'

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug)
}

export function destinationsInGroup(id: DestinationGroup) {
  return destinations.filter((d) => d.group === id)
}

export function getDestinationRelations(d: Destination) {
  const placeNames = d.places ?? [d.name]
  const related = tours.filter((t) => t.places.some((p) => placeNames.includes(p)))
  const fallback = (related.length ? related : tours).slice(0, 4)
  // Neighbours from the same group first.
  const others = destinations
    .filter((o) => o.slug !== d.slug)
    .sort((a, b) => Number(b.group === d.group) - Number(a.group === d.group))
    .slice(0, 4)
  return { fallback, others }
}
