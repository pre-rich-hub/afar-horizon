import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import { expeditionCollections } from '../data/tour.data'
import type { Tour } from '../types/tour.types'
import { TourCard } from './TourCard'

export function ExpeditionCollections({ tours }: { tours: Tour[] }) {
  return (
    <>
      {/* Collection index */}
      <nav aria-label="Expedition collections" className="border-b border-border">
        <ul className="shell grid py-4 sm:grid-cols-3 sm:py-6">
          {expeditionCollections.map((c, i) => (
            <li key={c.id} className={i > 0 ? 'border-t border-border sm:border-l sm:border-t-0' : ''}>
              <a
                href={`#${c.id}`}
                className={`group flex flex-col gap-1 py-4 transition-colors sm:py-2 ${i > 0 ? 'sm:px-8' : 'sm:pr-8'}`}
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
                  {c.span}
                </span>
                <span className="font-serif text-xl text-foreground transition-colors group-hover:text-accent">
                  {c.title}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {expeditionCollections.map((c, ci) => {
        const items = tours.filter((t) => t.collection === c.id)
        return (
          <section
            key={c.id}
            id={c.id}
            className={ci > 0 ? 'scroll-mt-24 border-t border-border' : 'scroll-mt-24'}
          >
            <div className="shell py-16 sm:py-20 lg:py-24">
              <SectionHeading eyebrow={c.span} title={c.title} aside={c.text} />
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {items.map((t, i) => (
                  <Reveal key={t.slug} delay={(i % 3) * 90} className="h-full">
                    <TourCard tour={t} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}
