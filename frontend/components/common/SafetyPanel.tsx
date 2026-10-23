import {useSharedCopy} from '@/lib/i18n/localized'
import { useTranslations } from 'next-intl'

import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import { safetyCommitments as baseSafetyCommitments } from '@/lib/constants/company'
import { ShieldCheck } from 'lucide-react'

// Each page's heading and introduction; 'destination' adds the place name.
type Variant = 'default' | 'expeditions' | 'destination' | 'groundOperations' | 'specialist' | 'safetyPage'

interface SafetyPanelProps {
  variant?: Variant
  name?: string
}

// The safety commitments in full, for pages where travellers weigh a booking.
export function SafetyPanel({ variant = 'default', name = '' }: SafetyPanelProps) {
  const tr = useTranslations('UI.common.SafetyPanel')
  const safetyCommitments = useSharedCopy('company.safetyCommitments', baseSafetyCommitments)
  const heading = {
    default: { eyebrow: tr('safetyFirst'), title: tr('howWeKeepYouSafe') },
    expeditions: { eyebrow: tr('safetyFirst'), title: tr('howWeKeepYouSafe'), lede: tr('expeditionsLede') },
    destination: { eyebrow: tr('safetyFirst'), title: tr('visitingSafely', { value0: name }) },
    groundOperations: { eyebrow: tr('safetyFirst'), title: tr('groundOperationsTitle'), lede: tr('groundOperationsLede') },
    specialist: { eyebrow: tr('safetyFirst'), title: tr('specialistTitle'), lede: tr('specialistLede') },
    safetyPage: { eyebrow: tr('ourCommitments'), title: tr('whatWeDoOnEveryJourney') },
  }[variant]

  return (
    <section className="border-y border-border bg-muted/40">
      <div className="shell py-16 sm:py-20 lg:py-24">
        <SectionHeading
          {...heading}
          action={variant === 'safetyPage' ? undefined : { href: '/safety', label: tr('ourSafetyApproach') }}
        />
        <ul className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {safetyCommitments.map((c, i) => (
            <Reveal key={c.title} as="li" delay={i * 70} className="flex gap-4 border-t border-border pt-6">
              <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-accent" strokeWidth={1.6} />
              <div>
                <h3 className="font-serif text-xl text-foreground">{c.title}</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
