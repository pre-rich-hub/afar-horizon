'use client'

import { useState } from 'react'
import { submitContact } from '../api/enquiry.api'
import { serviceOptions } from '../data/plan-form.data'
import { useChips } from '../hooks/useChips'
import { compose } from '../utils/compose'
import { Chips, Field, FormShell, Group, Sent } from './FormParts'

// The travel-trade partner form. Posts through the contact endpoint.
export function PartnerForm() {
  const services = useChips()
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState<string | null>(null)

  if (state === 'sent') {
    return (
      <Sent text="Thank you. We will review your programme and come back with questions or a ground proposal, usually within two working days." />
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
        await submitContact({ name: get('name'), email: get('email'), message })
      }}
      state={state}
      setState={setState}
      error={error}
      setError={setError}
      submitLabel="Send partner request"
      footnote="We reply personally. Net rates and commission structures are discussed with approved partners."
    >
      <Group title="Your company">
        <Field label="Company" id="company">
          <input id="company" name="company" required className="input" autoComplete="organization" />
        </Field>
        <Field label="Country" id="p-country">
          <input id="p-country" name="country" className="input" />
        </Field>
        <Field label="Contact name" id="p-name">
          <input id="p-name" name="name" required className="input" autoComplete="name" />
        </Field>
        <Field label="Email" id="p-email">
          <input id="p-email" name="email" type="email" required className="input" autoComplete="email" />
        </Field>
        <Field label="WhatsApp / phone" id="p-phone">
          <input id="p-phone" name="phone" type="tel" className="input" />
        </Field>
      </Group>

      <Group title="The programme">
        <Field label="Travel dates" id="p-dates">
          <input id="p-dates" name="dates" className="input" />
        </Field>
        <Field label="Group size" id="p-group">
          <input id="p-group" name="group" className="input" />
        </Field>
        <Field label="Destinations" id="p-destinations">
          <input id="p-destinations" name="destinations" className="input" placeholder="e.g. Danakil, Gheralta, Lalibela" />
        </Field>
      </Group>

      <Chips label="Services required" options={serviceOptions} {...services} />

      <Field label="Your programme or questions" id="p-message">
        <textarea id="p-message" name="message" rows={5} className="input resize-none" />
      </Field>
    </FormShell>
  )
}
