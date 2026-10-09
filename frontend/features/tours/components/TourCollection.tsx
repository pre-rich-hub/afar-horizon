import { SectionHeading } from '@/components/common/SectionHeading'
import type { Tour } from '../types/tour.types'
import { ToursGrid } from './ToursGrid'

export function TourCollection({ tours }: { tours: Tour[] }) {
  return (
    <section className="shell py-16 sm:py-20 lg:py-28">
        <SectionHeading
          eyebrow="The Collection"
          title="Every journey we run"
          aside="Filter by the kind of travelling you want to do. Any of these can be lengthened, shortened or combined."
        />
        <ToursGrid tours={tours} />
      </section>
  )
}
