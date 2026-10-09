export type TourListItem = {
  id: number
  name: string
  adultPrice: number | null
  childPrice: number | null
  discount: string | null
  rating: number | null
  isFeatured: boolean
  mainImage: string | null
  destination: { id: number; name: string } | null
  destinations: { id: number; name: string }[]
  createdAt: string | null
}
