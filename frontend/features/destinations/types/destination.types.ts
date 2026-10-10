// Destinations are grouped in the nav and on /destinations.
export type DestinationGroup = 'danakil' | 'highlands' | 'hub'

export type Destination = {
  slug: string
  name: string
  region: string
  tag: string
  image: string
  imageAlt?: string
  teaser: string
  intro: string
  bestTime: string
  duration: string
  altitude: string
  highlights: string[]
  paragraphs: string[]
  // Destination detail. Optional so the API and older records still fit.
  group?: DestinationGroup
  headline?: string
  seoTitle?: string
  seoDescription?: string
  sections?: { title: string; text?: string; items?: string[] }[]
  note?: { title: string; text: string }
  faqs?: { q: string; a: string }[]
  // Place names matched against Tour.places to find related expeditions.
  places?: string[]
}
