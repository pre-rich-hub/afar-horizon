import { Reveal } from '@/components/common/Reveal'
import type { Tour } from '../types/tour.types'

export function TourFaqs({ t }: { t: Tour }) {
  if (!t.faqs?.length) return null

  return (
    <section className="border-t border-border">
      <div className="shell grid gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_1.6fr] lg:gap-20 lg:py-28">
        <Reveal>
          <p className="eyebrow mb-5 text-accent">Before you go</p>
          <h2 className="max-w-[16ch] text-balance text-3xl leading-[1.1] text-foreground sm:text-4xl">
            Questions travellers ask
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <dl className="divide-y divide-border border-y border-border">
            {t.faqs.map((f) => (
              <div key={f.q} className="py-6">
                <dt className="font-serif text-xl text-foreground">{f.q}</dt>
                <dd className="mt-2 text-pretty leading-relaxed text-muted-foreground">{f.a}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
