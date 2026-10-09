import { CtaBand } from '@/components/common/CtaBand'

export function DestinationsPlanning() {
  return (
    <CtaBand
        title="Not sure which Ethiopia is yours?"
        text="Send us a sentence about the trip you have in mind — the altitude, the pace, the time of year — and a designer will come back with two or three routes worth considering."
        secondary={{ label: 'Browse Tours', href: '/tours' }}
        image="/images/hero-simien.png"
      />
  )
}
