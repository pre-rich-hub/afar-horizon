import { CtaBand } from '@/components/common/CtaBand'
import type { Destination } from '../types/destination.types'

export function DestinationPlanning({ d }: { d: Destination }) {
  return (
    <CtaBand
        title="Your Ethiopia should not feel like someone else’s itinerary"
        text="Ask about road conditions, the season or what a day here is really like. You will get a straight answer from the team that runs the route."
        secondary={{ label: 'All Destinations', href: '/destinations' }}
        image={d.image}
      />
  )
}
