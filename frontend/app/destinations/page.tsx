import { DestinationGrid, DestinationsHero, DestinationsPlanning } from '@/features/destinations'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Destinations',
  description:
    'Rock-hewn churches, Afro-alpine plateaus, sulphur springs below sea level and the most culturally dense valley on earth — the eight regions of Ethiopia we know best.',
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
