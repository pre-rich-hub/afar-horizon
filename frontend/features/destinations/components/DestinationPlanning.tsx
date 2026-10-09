import { CtaBand } from '@/components/common/CtaBand'
import type { Destination } from '../types/destination.types'

export function DestinationPlanning({ d }: { d: Destination }) {
  return (
    <CtaBand
        title="Speak to someone who has been there this season"
        text="Our designers travel these routes themselves. Ask about road conditions, festival dates or which lodge has the better view — you will get a straight answer."
        secondary={{ label: 'All Destinations', href: '/destinations' }}
        image={d.image}
      />
  )
}
