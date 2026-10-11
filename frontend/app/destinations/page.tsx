import { createPageMetadata } from '@/lib/seo/metadata'
import { DestinationGrid, DestinationsHero, DestinationsPlanning } from '@/features/destinations'

export const metadata = createPageMetadata({
  "title": "Afar, Danakil & Northern Ethiopia Destinations",
  "description": "Discover Erta Ale, Dallol, Lake Assale and Lake Afdera in Afar, alongside Gheralta, Lalibela and the northern highlands. Find places for your journey.",
  "path": "/destinations",
  "image": "https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/erta-ale.png",
  "imageAlt": "Erta Ale, Ethiopia"
})

export default function DestinationsPage() {
  return (
    <>
      <DestinationsHero />

      <DestinationGrid />

      <DestinationsPlanning />
    </>
  )
}
