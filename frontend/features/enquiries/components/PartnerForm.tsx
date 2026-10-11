'use client'
import {useEnquiriesCopy} from '../data/localized'
import { useTranslations } from 'next-intl'


import { useRef, useState } from 'react'
import { createEnquirySubmission } from '../utils/submission'
import { serviceOptions as baseServiceOptions } from '../data/plan-form.data'
import { useChips } from '../hooks/useChips'
import { compose } from '../utils/compose'
import { Chips, Field, FormShell, Group, Sent } from './FormParts'

// The travel-trade partner form. Posts through the contact endpoint.
export function PartnerForm() {
  const tr = useTranslations('UI.enquiries.PartnerForm')
  const serviceLabels = useEnquiriesCopy('plan-form.serviceOptions', baseServiceOptions)

  const services = useChips()
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState<string | null>(null)
  const submission = useRef(createEnquirySubmission())

  if (state === 'sent') {
    return (
      <Sent text={tr('thankYouWeWillReviewYourProgramme')} />
    )
  }

  return (
    <FormShell
      onSubmit={async (data) => {
        const get = (k: string) => String(data.get(k) ?? '').trim()
        const message = compose('Partner request (travel trade)', {
          Company: get('company'),
          Country: get('country'),
          'WhatsApp / phone': get('phone'),
          'Travel dates': get('dates'),
          'Group size': get('group'),
          Destinations: get('destinations'),
          'Services required': services.selected,
          Message: get('message'),
        })
        await submission.current({ name: get('name'), email: get('email'), message }, 'partner')
      }}
      state={state}
      setState={setState}
      error={error}
      setError={setError}
      submitLabel={tr('sendPartnerRequest')}
      footnote={tr('weReplyPersonallyNetRatesAndCommission')}
    >
      <Group title={tr('yourCompany')}>
        <Field label={tr('company')} id="company">
          <input id="company" name="company" required className="input" autoComplete="organization" />
        </Field>
        <Field label={tr('country')} id="p-country">
          <input id="p-country" name="country" className="input" />
        </Field>
        <Field label={tr('contactName')} id="p-name">
          <input id="p-name" name="name" required className="input" autoComplete="name" />
        </Field>
        <Field label={tr('email')} id="p-email">
          <input id="p-email" name="email" type="email" required className="input" autoComplete="email" />
        </Field>
        <Field label={tr('whatsappPhone')} id="p-phone">
          <input id="p-phone" name="phone" type="tel" className="input" />
        </Field>
      </Group>

      <Group title={tr('theProgramme')}>
        <Field label={tr('travelDates')} id="p-dates">
          <input id="p-dates" name="dates" className="input" />
        </Field>
        <Field label={tr('groupSize')} id="p-group">
          <input id="p-group" name="group" className="input" />
        </Field>
        <Field label={tr('destinations')} id="p-destinations">
          <input id="p-destinations" name="destinations" className="input" placeholder={tr('eGDanakilGheraltaLalibela')} />
        </Field>
      </Group>

      <Chips label={tr('servicesRequired')} options={baseServiceOptions} labels={serviceLabels} {...services} />

      <Field label={tr('yourProgrammeOrQuestions')} id="p-message">
        <textarea id="p-message" name="message" rows={5} className="input resize-none" />
      </Field>
    </FormShell>
  )
}
