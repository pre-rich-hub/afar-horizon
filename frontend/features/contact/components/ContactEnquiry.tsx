import { useTranslations } from 'next-intl'

import { Reveal } from '@/components/common/Reveal'
import { EnquiryForm } from '@/features/enquiries'
import { contact } from '@/lib/constants/company'
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Detail } from './Detail'

export function ContactEnquiry() {
  const tr = useTranslations('UI.contact.ContactEnquiry')

  return (
    <section className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.15fr] lg:gap-20 lg:py-28">
        <Reveal>
          <p className="eyebrow mb-5 text-accent">
            {tr('getInTouch')}</p>
          <h2 className="max-w-[18ch] text-balance text-3xl leading-[1.08] text-foreground sm:text-4xl lg:text-5xl">
            {tr('tellUsAboutTheJourneyInYour')}</h2>
          <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground sm:text-lg">
            {tr('howeverRoughTheIdeaItIsEnough')}
          </p>

          <dl className="mt-12 space-y-7">
            <Detail icon={Phone} label={tr('telephone')}>
              <a
                href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}
                className="border-b border-accent/40 pb-0.5 transition-colors hover:border-accent hover:text-primary"
              >
                {contact.phone}
              </a>
            </Detail>
            <Detail icon={MessageCircle} label={tr('whatsapp')}>
              <a
                href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-accent/40 pb-0.5 transition-colors hover:border-accent hover:text-primary"
              >
                {contact.whatsapp}
              </a>
            </Detail>
            <Detail icon={Mail} label={tr('email')}>
              <a
                href={`mailto:${contact.email}`}
                className="break-all border-b border-accent/40 pb-0.5 transition-colors hover:border-accent hover:text-primary"
              >
                {contact.email}
              </a>
            </Detail>
            <Detail icon={MapPin} label={tr('office')}>
              {contact.address}
            </Detail>
            <Detail icon={Clock} label={tr('hours')}>
              {contact.hours}
            </Detail>
          </dl>
        </Reveal>

        <Reveal delay={120}>
          <EnquiryForm />
        </Reveal>
      </section>
  )
}
