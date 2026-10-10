import { PlanHero, PlanRequest } from '@/features/plan'
import { getTour } from '@/features/tours'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Plan My Journey',
  description:
    'Tell us your dates, interests and travel style and we will help design your private Danakil, Afar or Northern Ethiopia expedition.',
  alternates: { canonical: '/plan' },
}

export default async function PlanPage({
  searchParams,
}: {
  searchParams: Promise<{ expedition?: string }>
}) {
  const { expedition } = await searchParams
  const tour = expedition ? getTour(expedition) : undefined

  return (
    <>
      <PlanHero />

      <PlanRequest subject={tour ? `${tour.days} ${tour.title}` : undefined} />
    </>
  )
}
