import { LinkButton } from '@/components/common/LinkButton'
import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import { DestinationFeatureCard, destinations } from '@/features/destinations'

export function SignatureDestinations() {
  const featured = destinations.slice(0, 6)

  return (
    <section id="destinations" className="bg-muted/50 py-20 sm:py-24 lg:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Where We Travel"
          title="Afar, the Danakil and the north"
          aside="Volcano, salt and geothermal colour below sea level; cliff churches, ancient kingdoms and mountains above it."
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
            Explore All Destinations
          </LinkButton>
        </Reveal>
      </div>
    </section>
  )
}
