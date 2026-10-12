import {useCatalogueLabel} from '@/lib/i18n/labels'
import {useToursCopy} from '../data/localized'
import { useTranslations } from 'next-intl'

import { Reveal } from '@/components/common/Reveal'
import { EnquiryForm } from '@/features/enquiries'
import type { Tour } from '../types/tour.types'

export function TourEnquiry({ t: baset }: { t: Tour }) {
  const catalogueLabel = useCatalogueLabel()

  const priceOnRequest = baset.from === 'Price on request'
  const t = useToursCopy('tour.tours', baset)

  const tr = useTranslations('UI.tours.TourEnquiry')

  return (
    <section
        id="enquire"
        className="border-t border-border bg-secondary text-secondary-foreground"
      >
        <div className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.15fr] lg:gap-20 lg:py-28">
          <Reveal>
            <p className="eyebrow mb-5 text-accent">
              {tr('enquire')}</p>
            <h2 className="max-w-[20ch] text-balance text-3xl leading-[1.08] text-background sm:text-4xl lg:text-5xl">
              {tr('make')}{' '}{t.title} {tr('yours')}</h2>
            <p className="mt-6 max-w-md text-pretty leading-relaxed text-background/70 sm:text-lg">
              {tr('sendUsYourDatesAndGroupSize')}</p>
            <p className="mt-8 border-l-2 border-accent pl-5 text-sm leading-relaxed text-background/70">
              {t.days} · {catalogueLabel(t.group)} {!priceOnRequest && tr('from')}{' '}
              <span className="text-background">{priceOnRequest ? catalogueLabel(t.from) : t.from}</span>
            </p>
          </Reveal>
          <Reveal delay={120}>
            <EnquiryForm subject={`${baset.days} ${baset.title}`} subjectLabel={`${t.days} ${t.title}`} defaultStyles={[]} />
          </Reveal>
        </div>
      </section>
  )
}
