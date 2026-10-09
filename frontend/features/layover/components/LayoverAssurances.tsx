import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import { assurances } from '../data/layover.data'

export function LayoverAssurances() {
  return (
    <section className="border-y border-border bg-secondary text-secondary-foreground">
        <div className="shell py-16 sm:py-20 lg:py-28">
          <SectionHeading
            eyebrow="Logistics First"
            title="On a layover, timing is the whole product"
            lede="Sights are easy. Not missing your onward flight is the part that takes experience."
            tone="dark"
          />
          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {assurances.map((a, i) => (
              <Reveal
                key={a.title}
                delay={i * 90}
                className="border-t border-background/20 pt-6"
              >
                <a.icon className="mb-4 h-5 w-5 text-accent" aria-hidden />
                <p className="mb-3 font-serif text-xl text-background sm:text-2xl">
                  {a.title}
                </p>
                <p className="text-pretty text-sm leading-relaxed text-background/70">
                  {a.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
  )
}
