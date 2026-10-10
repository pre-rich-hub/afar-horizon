import { DestinationGrid, DestinationsHero, DestinationsPlanning } from '@/features/destinations'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Destinations',
  description:
    'The Danakil Depression, Afar, Erta Ale, Dallol, Lake Assale, Gheralta, Axum, Lalibela, the Simien Mountains and Gondar: the places in northern Ethiopia we operate in.',
  alternates: { canonical: '/destinations' },
}

export default function DestinationsPage() {
  return (
    <>
      <DestinationsHero />

      <DestinationGrid />

      <DestinationsPlanning />
    </>
  )
}
