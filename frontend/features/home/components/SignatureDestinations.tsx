import {useDestinationsCopy} from '@/features/destinations'
import { useTranslations } from 'next-intl'

import { LinkButton } from '@/components/common/LinkButton'
import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import { DestinationFeatureCard, destinations as baseDestinations } from '@/features/destinations'

export function SignatureDestinations() {
  const tr = useTranslations('UI.home.SignatureDestinations')
  const destinations = useDestinationsCopy('destination.destinations', baseDestinations)

  const featured = destinations.slice(0, 6)

  return (
    <section id="destinations" className="bg-muted/50 py-20 sm:py-24 lg:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow={tr('whereWeTravel')}
          title={tr('afarTheDanakilAndTheNorth')}
          aside={tr('volcanoSaltAndGeothermalColourBelowSea')}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {featured.map((d, i) => (
            <Reveal key={d.slug} delay={(i % 3) * 120}>
              <DestinationFeatureCard destination={d} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex justify-center sm:mt-14">
          <LinkButton href="/destinations" variant="outline">
            {tr('exploreAllDestinations')}</LinkButton>
        </Reveal>
      </div>
    </section>
  )
}
