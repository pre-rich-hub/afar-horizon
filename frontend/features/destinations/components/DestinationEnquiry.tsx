import {useDestinationsCopy} from '../data/localized'
import { useTranslations } from 'next-intl'

import { defaultImage } from '@/lib/config/cloudinary'
import { Reveal } from '@/components/common/Reveal'
import { EnquiryForm } from '@/features/enquiries'
import Image from 'next/image'
import Link from '@/components/common/SiteLink'
import type { Destination } from '../types/destination.types'

export function DestinationEnquiry({ d: based, others: baseothers }: { d: Destination; others: Destination[] }) {
  const d = useDestinationsCopy('destination.destinations', based)
  const others = useDestinationsCopy('destination.destinations', baseothers)

  const tr = useTranslations('UI.destinations.DestinationEnquiry')

  return (
    <section id="enquire" className="scroll-mt-24 shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.15fr] lg:gap-20 lg:py-28">
        <Reveal>
          <p className="eyebrow mb-5 text-accent">
            {tr('planThisDestination')}</p>
          <h2 className="max-w-[20ch] text-balance text-3xl leading-[1.08] text-foreground sm:text-4xl lg:text-5xl">
            {tr('build')}{' '}{d.name} {tr('intoYourJourney')}</h2>
          <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground sm:text-lg">
            {tr('tellUsWhatYouAreCuriousAbout')}</p>

          <div className="mt-12">
            <p className="eyebrow mb-6 text-primary">
              {tr('alsoConsider')}</p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/destinations/${o.slug}`}
                    className="group flex items-center gap-4 border border-border bg-card p-3 transition-colors hover:border-primary/40"
                  >
                    <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-sm">
                      <Image
                        src={o.image || defaultImage}
                        alt=""
                        aria-hidden
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-serif text-lg text-foreground transition-colors group-hover:text-primary">
                        {o.name}
                      </span>
                      <span className="block text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                        {o.region}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <EnquiryForm subject={based.name} subjectLabel={d.name} defaultStyles={[]} />
        </Reveal>
      </section>
  )
}
