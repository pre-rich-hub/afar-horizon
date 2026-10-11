'use client'
import {useSharedCopy} from '@/lib/i18n/localized'
import { useTranslations } from 'next-intl'


import { journeyStyles as baseJourneyStyles } from '@/lib/constants/journeyStyles'
import { ArrowRight, Check } from 'lucide-react'
import { useRef, useState } from 'react'
import { createEnquirySubmission } from '../utils/submission'

export function EnquiryForm({
  defaultStyles = ['Private'],
  subject,
  subjectLabel = subject,
}: {
  defaultStyles?: string[]
  subject?: string
  subjectLabel?: string
}) {
  const tr = useTranslations('UI.enquiries.EnquiryForm')
  const styleLabels = useSharedCopy('journeyStyles.journeyStyles', baseJourneyStyles)

  const journeyStyles = baseJourneyStyles
  const [selected, setSelected] = useState<string[]>(defaultStyles)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sending, setSending] = useState(false)
  const submission = useRef(createEnquirySubmission())

  const toggle = (style: string) =>
    setSelected((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style],
    )

  if (submitted) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center border border-border bg-card px-6 py-16 text-center">
        <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="font-serif text-3xl text-foreground">
          {tr('requestReceived')}</h3>
        <p className="mt-4 max-w-sm text-pretty leading-relaxed text-muted-foreground">
          {tr('weReadEveryRequestPersonallyAndWill')}</p>
      </div>
    )
  }

  return (
    <div className="border border-border bg-card p-6 shadow-[0_28px_70px_-40px_oklch(0.185_0.012_58/0.4)] sm:p-8 lg:p-10">
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          if (sending) return
          setError(null)
          setSending(true)
          const data = new FormData(e.currentTarget)
          const name = String(data.get('name') ?? '').trim()
          const email = String(data.get('email') ?? '').trim()
          const when = String(data.get('when') ?? '').trim()
          const travellers = String(data.get('travellers') ?? '').trim()
          const dream = String(data.get('dream') ?? '').trim()

          const lines: string[] = []
          if (subject) lines.push(`Journey: ${subject}`)
          if (when) lines.push(`Preferred dates: ${when}`)
          if (travellers) lines.push(`Travellers: ${travellers}`)
          if (selected.length) lines.push(`Journey styles: ${selected.join(', ')}`)
          if (dream) lines.push('')
          lines.push(dream)

          try {
            await submission.current({ name, email, message: lines.join('\n') })
            setSubmitted(true)
          } catch (err) {
            setError(
              err instanceof Error ? err.message : tr('fallbackError'),
            )
          } finally { setSending(false) }
        }}
        className="space-y-6"
      >
        {subject ? (
          <p className="border-l-2 border-accent bg-muted/60 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
            {tr('enquiryAbout')}{' '}
            <span className="font-medium text-foreground">{subjectLabel}</span>
          </p>
        ) : null}

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={tr('fullName')} id="name">
            <input id="name" name="name" required className="input" placeholder={tr('yourName')} />
          </Field>
          <Field label={tr('emailAddress')} id="email">
            <input
              id="email"
              name="email"
              type="email"
              required
              className="input"
              placeholder={tr('youEmailCom')}
            />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={tr('preferredTravelDates')} id="when">
            <input id="when" name="when" className="input" placeholder={tr('eGMarch2026')} />
          </Field>
          <Field label={tr('numberOfTravellers')} id="travellers">
            <input id="travellers" name="travellers" className="input" placeholder={tr('2Adults')} />
          </Field>
        </div>

        <div>
          <span className="mb-3 block text-sm font-medium text-foreground">
            {tr('whatKindOfJourneyDoYouImagine')}</span>
          <div className="flex flex-wrap gap-2">
            {journeyStyles.map((style) => {
              const active = selected.includes(style)
              return (
                <button
                  type="button"
                  key={styleLabels[journeyStyles.indexOf(style)]}
                  aria-pressed={active}
                  onClick={() => toggle(style)}
                  className={`border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 ${
                    active
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground'
                  }`}
                >
                  {styleLabels[journeyStyles.indexOf(style)]}
                </button>
              )
            })}
          </div>
        </div>

        <Field label={tr('tellUsAboutTheJourneyYouVe')} id="dream">
          <textarea
            id="dream"
            name="dream"
            rows={4}
            className="input resize-none"
            placeholder={tr('howManyDaysYouHaveWhatYou')}
          />
        </Field>

        {error ? (
          <p className="text-xs text-red-600" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={sending}
          className="group inline-flex w-full items-center justify-center gap-2.5 bg-primary px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-colors duration-300 hover:bg-charcoal sm:w-auto"
        >
          {tr('beginTheConversation')}<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
        <p className="text-xs leading-relaxed text-muted-foreground">
          {tr('weReplyPersonallyYourDetailsAreNever')}</p>
      </form>
    </div>
  )
}

function Field({
  label,
  id,
  children,
}: {
  label: string
  id: string
  children: React.ReactNode
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  )
}
