import { TranslatedText } from '@/components/common/TranslatedText'
import { TranslationBoundary } from '@/components/common/TranslationBoundary'
import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import { safetyCommitments } from '@/lib/constants/company'
import { ShieldCheck } from 'lucide-react'

interface SafetyPanelProps {
  eyebrow?: string
  title?: string
  lede?: string
  // Off on /safety itself.
  link?: boolean
}

// The safety commitments in full, for pages where travellers weigh a booking.
export function SafetyPanel({
  eyebrow = 'Safety First',
  title = 'How we keep you safe',
  lede,
  link = true,
}: SafetyPanelProps) {
  return (
    <TranslationBoundary><section className="border-y border-border bg-muted/40">
      <div className="shell py-16 sm:py-20 lg:py-24">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          lede={lede}
          action={link ? { href: '/safety', label: 'Our safety approach' } : undefined}
        />
        <ul className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {safetyCommitments.map((c, i) => (
            <TranslationBoundary key={c.title}><Reveal key={c.title} as="li" delay={i * 70} className="flex gap-4 border-t border-border pt-6">
              <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-accent" strokeWidth={1.6} />
              <div>
                <h3 className="font-serif text-xl text-foreground"><TranslatedText text={c.title} /></h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground"><TranslatedText text={c.text} /></p>
              </div>
            </Reveal></TranslationBoundary>
          ))}
        </ul>
      </div>
    </section></TranslationBoundary>
  )
}
