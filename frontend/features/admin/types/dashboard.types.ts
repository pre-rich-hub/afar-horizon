export type Stats = {
  totals: {
    tours: number
    destinations: number
    bookings: number
    galleryImages: number
    contacts: number
  }
  bookingTrends: { date: string; count: number }[]
  topTours: { id: number; name: string; bookingCount: number }[]
}
