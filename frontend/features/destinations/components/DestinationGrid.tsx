import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import { destinations } from '../data/destination.data'
import { regions } from '../utils/destination.utils'
import { DestinationInfoCard } from './DestinationCard'

export function DestinationGrid() {
  return (
    <section className="shell py-16 sm:py-20 lg:py-28">
        <SectionHeading
          eyebrow="The Map"
          title="Regions we build journeys around"
          aside="Most itineraries combine three or four of these. Tell us which pull at you and we will draw the line between them."
        />

        <Reveal className="mb-12 flex flex-wrap gap-2 sm:mb-16">
          {regions.map((r) => (
            <span
              key={r}
              className="border border-border bg-card px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:text-[11px]"
            >
              {r}
            </span>
          ))}
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {destinations.map((d, i) => (
            <Reveal key={d.slug} delay={(i % 3) * 90} className="h-full">
              <DestinationInfoCard destination={d} />
            </Reveal>
          ))}
        </div>
      </section>
  )
}
