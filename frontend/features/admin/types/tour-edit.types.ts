export type Destination = { id: number; name: string }

export type Category = { id: number; name: string }

export type GalleryImage = { id: number; imageUrl: string; tourId: number | null }

export type BlockedDate = { id: number; date: string; reason: string | null }

export type ItineraryDay = {
  day: number
  title: string
  activities: string
  overnight: string
  meals?: string
}

export type TourData = {
  id: number
  name: string
  overview: string
  adultPrice: number | null
  childPrice: number | null
  discount: string | null
  rating: number | null
  noOfRates: number | null
  isFeatured: boolean
  mainImage: string | null
  destination: { id: number; name: string } | null
  destinations: { id: number; name: string }[]
  categories: Category[]
  gallery: GalleryImage[]
  included: string[]
  excluded: string[]
  itinerary: ItineraryDay[]
  journeyMap: string | null
}
