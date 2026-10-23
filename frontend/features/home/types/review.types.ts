export type Testimonial = {
  quote: string
  name: string
  detail: string
  image: string
}

export type ReviewSummary = {
  platform: string
  // The business name the reviews are listed under on the platform.
  listing: string
  url: string | null
  count: number | null
}
