import { Reveal } from '@/components/common/Reveal'
import { principles } from '../data/about.data'

export function AboutApproach() {
  return (
    <section id="our-approach" className="scroll-mt-32 shell py-20 sm:py-24 lg:py-32">
        <Reveal className="mb-12 max-w-2xl sm:mb-16">
          <p className="eyebrow mb-5 text-accent">The kind of travel we believe in</p>
          <h2 className="text-balance text-3xl leading-[1.1] text-foreground sm:text-4xl lg:text-5xl">
            The right things. At the right pace.
          </h2>
        </Reveal>

        <ol className="divide-y divide-border border-y border-border">
          {principles.map((p, i) => (
            <Reveal
              key={p.title}
              as="li"
              delay={i * 80}
              className="grid gap-4 py-9 sm:grid-cols-[110px_1fr] sm:py-11 lg:grid-cols-[140px_1fr_1.4fr] lg:gap-12"
            >
              <span className="font-serif text-4xl leading-none text-accent sm:text-5xl">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-2xl text-foreground sm:text-3xl">{p.title}</h3>
              <p className="text-pretty leading-relaxed text-muted-foreground sm:col-start-2 sm:text-lg lg:col-start-3">
                {p.text}
              </p>
            </Reveal>
          ))}
        </ol>
      </section>
  )
}
