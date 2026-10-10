import { Reveal } from '@/components/common/Reveal'
import { PartnerForm } from '@/features/enquiries'

export function GroundOpsPartner() {
  return (
    <section id="partner" className="scroll-mt-24 border-t border-border bg-secondary text-secondary-foreground">
      <div className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.4fr] lg:gap-20 lg:py-28">
        <Reveal>
          <p className="eyebrow mb-5 text-accent">Send your programme</p>
          <h2 className="max-w-[16ch] text-balance text-3xl leading-[1.08] text-background sm:text-4xl lg:text-5xl">
            Need Ethiopia on the ground?
          </h2>
          <p className="mt-6 max-w-md text-pretty leading-relaxed text-background/70 sm:text-lg">
            Send your dates, group size, destinations, accommodation level, vehicles, guides and any
            special requirements. We review it and return a professional Ethiopian ground proposal.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <PartnerForm />
        </Reveal>
      </div>
    </section>
  )
}
