import {useDestinationsCopy} from '../data/localized'
import { useTranslations } from 'next-intl'

import { BookingCard } from '@/components/common/BookingCard'
import { Reveal } from '@/components/common/Reveal'
import type { Destination } from '../types/destination.types'

export function DestinationBooking({ d: based }: { d: Destination }) {
  const d = useDestinationsCopy('destination.destinations', based)

  const tr = useTranslations('UI.destinations.DestinationBooking')

  return (<aside className="lg:col-start-2 lg:row-span-3 lg:row-start-1">
          <div className="lg:sticky lg:top-28">
            <Reveal delay={120}>
              <BookingCard
                label={tr('planYourVisit')}
                title={d.name}
                subtitle={`${d.tag} · ${d.region}`}
                rows={[
                  { k: tr('suggestedStay'), v: d.duration },
                  { k: tr('bestTime'), v: d.bestTime },
                  { k: tr('altitude'), v: d.altitude },
                  { k: tr('region'), v: d.region },
                ]}
                primary={{ label: tr('planMyJourney'), href: '#enquire' }}
                secondary={{ label: tr('askAboutCurrentConditions'), href: '/contact' }}
              />
            </Reveal>
          </div>
        </aside>)
}
