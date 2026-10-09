import { CtaBand } from '@/components/common/CtaBand'

export function ToursPlanning() {
  return (
    <CtaBand
        title="Or start with a blank page"
        text="Most of our guests end up somewhere between two of these routes. Describe the journey in your head and a designer will draw it properly."
        secondary={{ label: 'See Destinations', href: '/destinations' }}
      />
  )
}
