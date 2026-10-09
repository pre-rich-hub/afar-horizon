import { CtaBand } from '@/components/common/CtaBand'
import type { Tour } from '../types/tour.types'

export function TourPlanning({ t }: { t: Tour }) {
  return (
    <CtaBand
        title="Questions before you enquire?"
        text="Altitude, road time, how hard the walking really is, whether the children will cope. Ask us anything — a designer will answer honestly."
        secondary={{ label: 'Layover Tours', href: '/layover' }}
        image={t.image}
      />
  )
}
