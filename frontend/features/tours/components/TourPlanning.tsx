
import { TranslationBoundary } from '@/components/common/TranslationBoundary'
import { CtaBand } from '@/components/common/CtaBand'
import type { Tour } from '../types/tour.types'

export function TourPlanning({ t }: { t: Tour }) {
  return (
    <TranslationBoundary><CtaBand
        title="Questions before you enquire?"
        text="Heat, road time, how hard the walking really is, what camping means in the Danakil. Ask us anything and we will answer honestly."
        secondary={{ label: 'All Expeditions', href: '/expeditions' }}
        image={t.image}
      /></TranslationBoundary>
  )
}
