import { Reveal } from '@/components/common/Reveal'

export function GroundOpsIntro() {
  return (
    <section className="shell grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:gap-20 lg:py-24">
      <Reveal>
        <p className="eyebrow mb-5 text-accent">One local partner</p>
        <h2 className="max-w-[18ch] text-balance text-3xl leading-[1.1] text-foreground sm:text-4xl">
          One responsible contact, one team on the ground
        </h2>
      </Reveal>
      <Reveal delay={120} className="space-y-5 text-pretty leading-relaxed text-muted-foreground sm:text-lg">
        <p>
          Instead of an overseas agency coordinating five different Ethiopian suppliers, Afar Horizon
          acts as your local operational partner. You stay close to your client; we stay close to the
          operation.
        </p>
        <p>
          We specialise in the Danakil, Afar and northern Ethiopia, where remote routes, heat and changing
          access make local knowledge part of the product.
        </p>
      </Reveal>
    </section>
  )
}
