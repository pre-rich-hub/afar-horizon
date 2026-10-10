// Expeditions are grouped into collections on /expeditions and in the nav.
export type ExpeditionCollection = 'danakil' | 'danakil-highlands' | 'northern-ethiopia'

export type ItineraryDay = {
  day: string
  title: string
  text: string
  overnight?: string
  meals?: string
}

export type Tour = {
  slug: string
  title: string
  image: string
  days: string
  nights: number
  style: string
  season: string
  from: string
  group: string
  teaser: string
  summary: string
  includes: string[]
  excludes: string[]
  itinerary: ItineraryDay[]
  places: string[]
  featured?: boolean
  // Expedition detail. Optional so the API overlay and older records still fit.
  collection?: ExpeditionCollection
  start?: string
  end?: string
  difficulty?: string
  why?: string
  idealFor?: string
  notFor?: string
  accessNote?: string
  faqs?: { q: string; a: string }[]
}
