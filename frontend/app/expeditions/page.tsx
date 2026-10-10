import { ExpeditionCollections, ExpeditionsHero, ExpeditionsNote, ExpeditionsPlanning, getToursData } from '@/features/tours'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Expeditions',
  description:
    'Private expeditions into the Danakil Depression, Afar and Northern Ethiopia, from a one-day Afar introduction to a 21-day journey. Locally operated from Ethiopia.',
}

export default async function ExpeditionsPage() {
  const tours = await getToursData()

  return (
    <>
      <ExpeditionsHero count={tours.length} />

      {/* Collections */}
      <ExpeditionCollections tours={tours} />

      {/* Operating note */}
      <ExpeditionsNote />

      <ExpeditionsPlanning />
    </>
  )
}
