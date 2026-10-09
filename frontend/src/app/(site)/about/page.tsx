import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { SectionNav } from '@/components/ui/section-nav'
import { CtaBand } from '@/components/layout/cta-band'
import { contact } from '@/content'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Afar Horizon Expeditions is a locally owned travel company in Addis Ababa, designing private journeys from the salt flats of the Afar to the highlands of northern Ethiopia.',
}

const sections = [
  { id: 'in-brief', label: 'In brief' },
  { id: 'our-story', label: 'Our story' },
  { id: 'our-approach', label: 'Our approach' },
  { id: 'plan', label: 'Plan with us' },
]

const brief = [
  {
    title: 'Who we are',
    text: 'Afar Horizon Expeditions is a locally owned travel company: a small Addis Ababa team of journey designers, scholar-guides and drivers who have worked side by side for years.',
  },
  {
    title: 'Where we operate',
    text: `Our office is at ${contact.address}. We travel across Ethiopia — the Danakil and the Afar lowlands, the historic north, the Simien and Bale highlands, and the Omo Valley in the south.`,
  },
  {
    title: 'How planning works',
    text: 'Planning starts with a conversation, not a fixed package. Tell us your dates, your pace and what draws you here; a written proposal then sets out the journey in full.',
  },
]

const principles = [
  {
    title: 'Room for the unexpected',
    text: 'A caravan crossing the salt at first light, a conversation at a roadside coffee stall, a ridge appearing through the cloud. The moment travellers remember most is often the one that was never on the itinerary — so we leave space for it.',
  },
  {
    title: 'Honest advice',
    text: 'If a route asks too much of the time you have, we say so. If the Danakil heat or local conditions change the plan, we adapt it. Wildlife sightings, clear skies and crater views are hoped for, never promised.',
  },
  {
    title: 'Respect for the places we share',
    text: 'The Afar, the highlands and the south are homes before they are destinations. We travel with local guides, ask before we photograph, and move at a pace that leaves communities and landscapes as we found them.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[88svh] items-end overflow-hidden">
        <Image
          src="/images/danakil.png"
          alt="Salt and sulphur terraces of the Danakil Depression at dusk"
          fill
          priority
          sizes="100vw"
          className="-z-10 animate-slow-zoom object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-charcoal/60 via-charcoal/30 to-charcoal/90" />

        <div className="shell pb-14 pt-36 sm:pb-20 lg:pb-24">
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-background/60">
            <Link href="/" className="transition-colors hover:text-accent">Home</Link>
            <ChevronRight className="h-3 w-3 opacity-50" />
            <span className="text-background/90">About Us</span>
          </nav>
          <p className="eyebrow mb-5 text-accent [animation:fade-up_1s_ease_0.1s_both]">
            The story starts here
          </p>
          <blockquote className="max-w-[22ch] text-balance font-serif text-[2.4rem] leading-[1.08] text-background text-shadow-soft [animation:fade-up_1s_ease_0.2s_both] sm:text-6xl lg:text-7xl">
            &ldquo;We want people to experience the Ethiopia we know — not just visit it.&rdquo;
          </blockquote>
          <p className="mt-7 max-w-[52ch] text-pretty leading-relaxed text-background/80 [animation:fade-up_1s_ease_0.35s_both] sm:text-lg">
            A locally owned team in Addis Ababa, designing private journeys from
            the salt and fire of the Afar to the country&apos;s ancient highlands.
          </p>
        </div>
      </section>

      <SectionNav items={sections} />

      {/* In brief */}
      <section id="in-brief" className="scroll-mt-32 shell py-20 sm:py-24 lg:py-28">
        <Reveal className="mb-12 max-w-2xl sm:mb-16">
          <p className="eyebrow mb-5 text-accent">In brief</p>
          <h2 className="text-balance text-3xl leading-[1.1] text-foreground sm:text-4xl lg:text-5xl">
            Who, where and how we plan.
          </h2>
        </Reveal>

        <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
          {brief.map((b, i) => (
            <Reveal key={b.title} delay={i * 100} className="flex flex-col bg-card p-8 sm:p-10">
              <span className="font-serif text-5xl leading-none text-accent">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-6 text-2xl text-foreground">{b.title}</h3>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{b.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex justify-center sm:mt-12">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-foreground shadow-[0_12px_32px_-14px_oklch(0.705_0.098_76/0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-sand sm:text-xs"
          >
            Plan with us
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </section>

      {/* Our story */}
      <section id="our-story" className="scroll-mt-32 border-y border-border bg-muted/40">
        <div className="shell py-20 sm:py-24 lg:py-32">
          <Chapter
            eyebrow="The road out of Addis"
            title="Before the Afar became an itinerary."
            image="/images/hero-simien.png"
            imageAlt="Mist lifting off the escarpment of the Ethiopian highlands at sunrise"
          >
            <p>
              There is a road out of Addis Ababa we never tire of taking. The city
              thins behind you, the highlands fold away, and the land drops
              towards the Rift — until the air turns hot and wide and the Afar
              opens out to the horizon. Every time, it reminds us why we chose
              this work.
            </p>
            <p>
              We named the company for that horizon. Long before these places sat
              on a travel plan, they were simply part of our country: the salt
              caravans of the Danakil, the market towns of the highlands, the
              churches carved into Lalibela&apos;s rock.
            </p>
            <p>
              Over the years we learned how a familiar road changes with the
              season, how a feast day can transform a town overnight, and how
              the desert keeps its own timetable. Knowing a place is different
              from simply knowing the way through it.
            </p>
          </Chapter>

          <div className="mt-20 sm:mt-28">
            <Chapter
              eyebrow="Then we started guiding"
              title="Seeing home through new eyes."
              image="/images/coffee-ceremony.png"
              imageAlt="Coffee poured from a clay jebena during a traditional ceremony"
              reverse
            >
              <p>
                A traveller stops to watch a gelada troop and asks one more
                question. Someone wonders why a village sits exactly where it
                does. Someone tastes Ethiopian coffee at its source for the first
                time. Someone reaches the rim of Erta Ale and goes quiet.
              </p>
              <p>
                Guiding taught us to notice what we once took for granted, and
                showed us that the job is to help people understand where they
                are — not simply to point the way.
              </p>
              <p>
                That is why every journey is built personally. A couple seeking
                quiet, a photographer waiting for the light and a trekker
                training for the high Simien need very different trips. The first
                step is always listening.
              </p>
            </Chapter>
          </div>
        </div>
      </section>

      {/* Our approach */}
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

      {/* Plan */}
      <div id="plan" className="scroll-mt-32">
        <CtaBand
          title="Start with a conversation"
          text="Tell us how much time you have and what draws you to Ethiopia. A designer will reply within a day with honest advice and a first outline of the journey."
          primary={{ label: 'Plan with us', href: '/contact' }}
          secondary={{ label: 'Browse tours', href: '/tours' }}
          image="/images/lalibela.png"
        />
      </div>
    </>
  )
}

function Chapter({
  eyebrow,
  title,
  image,
  imageAlt,
  reverse,
  children,
}: {
  eyebrow: string
  title: string
  image: string
  imageAlt: string
  reverse?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
      <Reveal className={reverse ? 'lg:order-2' : undefined}>
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted shadow-[0_40px_80px_-40px_oklch(0.185_0.012_58/0.55)]">
          <Image src={image} alt={imageAlt} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
        </div>
      </Reveal>
      <Reveal delay={120}>
        <p className="eyebrow mb-5 text-accent">{eyebrow}</p>
        <h2 className="max-w-[18ch] text-balance text-3xl leading-[1.1] text-foreground sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        <div className="mt-8 space-y-5 text-pretty leading-relaxed text-muted-foreground sm:text-lg">
          {children}
        </div>
      </Reveal>
    </div>
  )
}
