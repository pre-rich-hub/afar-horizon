import { Reveal } from '@/components/common/Reveal'

export function SpecialistPricing() {
  return (
    <section className="shell py-16 sm:py-20">
      <Reveal className="max-w-3xl">
        <p className="eyebrow mb-4 text-accent">How specialist trips are priced</p>
        <p className="text-pretty leading-relaxed text-muted-foreground sm:text-lg">
          Specialist work is quoted individually rather than from a price list, because vehicles,
          extra days, equipment, permits and staffing all depend on what you need. Tell us your
          purpose and dates and we will come back with a proposal.
        </p>
      </Reveal>
    </section>
  )
}
