import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import { steps } from '../data/contact.data'

export function ContactProcess() {
  return (
    <section className="border-y border-border bg-muted/40">
        <div className="shell py-16 sm:py-20 lg:py-28">
          <SectionHeading
            eyebrow="What Happens Next"
            title="How a journey gets designed"
            aside="Four steps, and no money changes hands until the third one reads right to you."
          />
          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal
                key={s.n}
                delay={i * 90}
                className="border-t border-border pt-6"
              >
                <p className="font-serif text-3xl text-accent">{s.n}</p>
                <p className="mt-3 font-serif text-xl text-foreground sm:text-2xl">
                  {s.title}
                </p>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {s.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
  )
}
