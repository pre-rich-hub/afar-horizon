import { tours } from '@/features/tours'
import { destinations } from '../data/destination.data'
import type { Destination, DestinationGroup } from '../types/destination.types'

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug)
}

export function getDestinationForPlace(place: string) {
  return destinations.find(d => d.name === place)
    ?? destinations.filter(d => d.places?.includes(place))
      .sort((a, b) => (a.places?.length ?? 0) - (b.places?.length ?? 0))[0]
}

export function destinationsInGroup(id: DestinationGroup) {
  return destinations.filter((d) => d.group === id)
}

export function getDestinationRelations(d: Destination) {
  const parentSlug: Record<string, string> = {
    'afar-people': 'afar',
    'salt-caravans': 'lake-assale',
    'abune-yemata-guh': 'gheralta',
    'maryam-korkor': 'gheralta',
    'daniel-korkor': 'gheralta',
  }
  const parent = getDestination(parentSlug[d.slug])
  const placeNames = [...(d.places ?? [d.name]), ...(parent?.places ?? [])]
  const related = tours.filter((t) => t.places.some((p) => placeNames.includes(p)))
  const ranked = d.slug === 'simien-mountains'
    ? [...related].sort((a, b) => Number(b.collection === 'simien') - Number(a.collection === 'simien'))
    : related
  const fallback = (ranked.length ? ranked : tours).slice(0, 4)
  // Neighbours from the same group first.
  const others = destinations
    .filter((o) => o.slug !== d.slug)
    .sort((a, b) => Number(b.group === d.group) - Number(a.group === d.group))
    .slice(0, 4)
  return { fallback, others }
}
