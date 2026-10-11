
import { TranslationBoundary } from '@/components/common/TranslationBoundary'
import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import { destinationGroups } from '../data/destination.data'
import { destinationsInGroup } from '../utils/destination.utils'
import { DestinationInfoCard } from './DestinationCard'

export function DestinationGrid() {
  return (
    <TranslationBoundary><>
      {destinationGroups.map((g, gi) => {
        const items = destinationsInGroup(g.id)
        return (
          <TranslationBoundary key={g.id}><section
            key={g.id}
            id={g.id}
            className={gi > 0 ? 'scroll-mt-24 border-t border-border' : 'scroll-mt-24'}
          >
            <div className="shell py-16 sm:py-20 lg:py-24">
              <SectionHeading eyebrow={`${items.length} ${items.length === 1 ? 'destination' : 'destinations'}`} title={g.title} aside={g.text} />
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {items.map((d, i) => (
                  <TranslationBoundary key={d.slug}><Reveal key={d.slug} delay={(i % 3) * 90} className="h-full">
                    <DestinationInfoCard destination={d} />
                  </Reveal></TranslationBoundary>
                ))}
              </div>
            </div>
          </section></TranslationBoundary>
        )
      })}
    </></TranslationBoundary>
  )
}
