import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import { principles, services } from '../data/ground-operations.data'

export function GroundOpsServices() {
  return (
    <section className="shell py-16 sm:py-20 lg:py-24">
      <SectionHeading eyebrow="For travel companies" title="How we work with partners" />
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={(i % 3) * 80} className="border-t border-border pt-5">
            <h3 className="font-serif text-xl text-foreground">{s.title}</h3>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">{s.text}</p>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-12 flex flex-wrap gap-2">
        {principles.map((p) => (
          <span key={p} className="border border-border bg-card px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:text-[11px]">
            {p}
          </span>
        ))}
      </Reveal>
    </section>
  )
}
