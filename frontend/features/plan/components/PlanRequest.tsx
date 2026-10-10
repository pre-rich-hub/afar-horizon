import { Reveal } from '@/components/common/Reveal'
import { PlanJourneyForm } from '@/features/enquiries'
import { contact } from '@/lib/constants/company'
import { Mail, MessageCircle, Phone } from 'lucide-react'
import Link from 'next/link'
import { steps } from '../data/plan.data'

export function PlanRequest({ subject }: { subject?: string }) {
  const whatsapp = `https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`

  return (
    <section className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.6fr] lg:gap-20 lg:py-28">
      <Reveal>
        <p className="eyebrow mb-5 text-accent">How it works</p>
        <h2 className="max-w-[18ch] text-balance text-3xl leading-[1.1] text-foreground sm:text-4xl">
          A conversation first, not an instant booking
        </h2>
        <ol className="mt-10 space-y-7">
          {steps.map((s, i) => (
            <li key={s.title} className="flex gap-5">
              <span className="font-serif text-2xl leading-none text-accent">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <p className="font-semibold text-foreground">{s.title}</p>
                <p className="mt-1 text-pretty text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 border-t border-border pt-8">
          <p className="eyebrow mb-4 text-primary">Prefer to talk?</p>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-foreground hover:text-accent">
                <MessageCircle className="h-4 w-4 text-accent" /> WhatsApp {contact.whatsapp}
              </a>
            </li>
            <li>
              <a href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`} className="flex items-center gap-3 text-foreground hover:text-accent">
                <Phone className="h-4 w-4 text-accent" /> {contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-foreground hover:text-accent">
                <Mail className="h-4 w-4 text-accent" /> {contact.email}
              </a>
            </li>
          </ul>
          <p className="mt-6 text-pretty text-sm leading-relaxed text-muted-foreground">
            Planning for a group of clients? Use our{' '}
            <Link href="/ground-operations#partner" className="text-primary underline-offset-4 hover:underline">
              partner form
            </Link>{' '}
            instead.
          </p>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <PlanJourneyForm subject={subject} />
      </Reveal>
    </section>
  )
}
