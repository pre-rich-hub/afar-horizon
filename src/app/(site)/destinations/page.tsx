import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/page-hero'
import { Reveal } from '@/components/ui/reveal'
import { DestinationInfoCard } from '@/features/destinations/components/destination-card'
import { SectionHeading } from '@/components/ui/section-heading'
import { CtaBand } from '@/components/layout/cta-band'
import { destinations } from '@/content'

export const metadata: Metadata = {
  title: 'Destinations',
  description:
    'Rock-hewn churches, Afro-alpine plateaus, sulphur springs below sea level and the most culturally dense valley on earth — the eight regions of Ethiopia we know best.',
}

const regions = Array.from(new Set(destinations.map((d) => d.region)))

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Where We Travel"
        title="Eight Ethiopias, and the routes between them"
        lede="From churches carved downward into the rock to a lava lake burning below sea level. These are the places our designers know by name, season and hour of day."
        image="/images/gondar.png"
        imageAlt="The royal enclosure of Fasil Ghebbi in Gondar at golden hour"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Destinations' }]}
        meta={[
          { label: 'Destinations', value: '8' },
          { label: 'UNESCO Sites', value: '4' },
          { label: 'Altitude Range', value: '-125 – 4,533 m' },
          { label: 'Best Months', value: 'Oct – Mar' },
        ]}
      />

      <section className="shell py-16 sm:py-20 lg:py-28">
        <SectionHeading
          eyebrow="The Map"
          title="Regions we build journeys around"
          aside="Most itineraries combine three or four of these. Tell us which pull at you and we will draw the line between them."
        />

        <Reveal className="mb-12 flex flex-wrap gap-2 sm:mb-16">
          {regions.map((r) => (
            <span
              key={r}
              className="border border-border bg-card px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:text-[11px]"
            >
              {r}
            </span>
          ))}
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {destinations.map((d, i) => (
            <Reveal key={d.slug} delay={(i % 3) * 90} className="h-full">
              <DestinationInfoCard destination={d} />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        title="Not sure which Ethiopia is yours?"
        text="Send us a sentence about the trip you have in mind — the altitude, the pace, the time of year — and a designer will come back with two or three routes worth considering."
        secondary={{ label: 'Browse Tours', href: '/tours' }}
        image="/images/hero-simien.png"
      />
    </>
  )
}
