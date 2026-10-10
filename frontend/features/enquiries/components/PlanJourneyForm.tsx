'use client'

import { useState } from 'react'
import { submitContact } from '../api/enquiry.api'
import { destinationOptions, interestOptions, styleOptions } from '../data/plan-form.data'
import { useChips } from '../hooks/useChips'
import { compose } from '../utils/compose'
import { Chips, Field, FormShell, Group, Sent } from './FormParts'

// The traveller's Plan My Journey form. Posts through the contact endpoint.
export function PlanJourneyForm({ subject }: { subject?: string }) {
  const destinations = useChips()
  const styles = useChips(['Private'])
  const interests = useChips()
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState<string | null>(null)

  if (state === 'sent') {
    return (
      <Sent text="Thank you. We read every request personally and will reply by email or WhatsApp, usually within one working day. We may ask a few questions before we suggest a route." />
    )
  }

  return (
    <FormShell
      onSubmit={async (data) => {
        const get = (k: string) => String(data.get(k) ?? '').trim()
        const message = compose('Plan My Journey request', {
          Expedition: subject ?? '',
          'WhatsApp / phone': get('phone'),
          'Country / nationality': get('country'),
          'Travel dates': get('dates'),
          'Dates are': get('flexibility'),
          'Number of travellers': get('travellers'),
          'Days available': get('days'),
          Destinations: destinations.selected,
          'Travel style': styles.selected,
          Interests: interests.selected,
          Pace: get('pace'),
          Accommodation: get('accommodation'),
          'Arrival city': get('arrival'),
          'Departure city': get('departure'),
          'Dietary requirements': get('diet'),
          'Approximate budget': get('budget'),
          'What would make this trip special': get('message'),
        })
        await submitContact({ name: get('name'), email: get('email'), message })
      }}
      state={state}
      setState={setState}
      error={error}
      setError={setError}
      submitLabel="Start my journey"
      footnote="No pressure and no automated itinerary. A conversation first."
    >
      {subject && (
        <p className="border-l-2 border-accent bg-muted/60 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
          Request about <span className="font-medium text-foreground">{subject}</span>
        </p>
      )}

      <Group title="About you">
        <Field label="Your name" id="name">
          <input id="name" name="name" required className="input" autoComplete="name" />
        </Field>
        <Field label="Email" id="email">
          <input id="email" name="email" type="email" required className="input" autoComplete="email" />
        </Field>
        <Field label="WhatsApp / phone" id="phone">
          <input id="phone" name="phone" type="tel" className="input" autoComplete="tel" placeholder="With country code" />
        </Field>
        <Field label="Country / nationality" id="country">
          <input id="country" name="country" className="input" autoComplete="country-name" />
        </Field>
      </Group>

      <Group title="Your dates">
        <Field label="Travel dates" id="dates">
          <input id="dates" name="dates" className="input" placeholder="e.g. 10 – 20 December" />
        </Field>
        <Field label="Your dates are" id="flexibility">
          <select id="flexibility" name="flexibility" className="input" defaultValue="Flexible">
            <option>Fixed</option>
            <option>Flexible</option>
            <option>Not decided yet</option>
          </select>
        </Field>
        <Field label="Number of travellers" id="travellers">
          <input id="travellers" name="travellers" className="input" placeholder="e.g. 2 adults" />
        </Field>
        <Field label="Days available" id="days">
          <input id="days" name="days" className="input" placeholder="e.g. 7" />
        </Field>
      </Group>

      <Chips label="Where do you want to go?" options={destinationOptions} {...destinations} />
      <Chips label="How are you travelling?" options={styleOptions} {...styles} />
      <Chips label="What interests you most?" options={interestOptions} {...interests} />

      <Group title="How you like to travel">
        <Field label="Preferred pace" id="pace">
          <select id="pace" name="pace" className="input" defaultValue="Balanced">
            <option>Relaxed</option>
            <option>Balanced</option>
            <option>Active</option>
          </select>
        </Field>
        <Field label="Accommodation" id="accommodation">
          <select id="accommodation" name="accommodation" className="input" defaultValue="Comfortable">
            <option>Camping is fine</option>
            <option>Comfortable</option>
            <option>Premium where available</option>
            <option>Mixed</option>
          </select>
        </Field>
        <Field label="Arriving in" id="arrival">
          <input id="arrival" name="arrival" className="input" placeholder="e.g. Addis Ababa, Semera" />
        </Field>
        <Field label="Leaving from" id="departure">
          <input id="departure" name="departure" className="input" placeholder="e.g. Addis Ababa" />
        </Field>
        <Field label="Dietary requirements" id="diet">
          <input id="diet" name="diet" className="input" placeholder="Optional" />
        </Field>
        <Field label="Approximate budget per person" id="budget">
          <input id="budget" name="budget" className="input" placeholder="Optional" />
        </Field>
      </Group>

      <Field label="What would make this trip special for you?" id="message">
        <textarea
          id="message"
          name="message"
          rows={5}
          className="input resize-none"
          placeholder="“I have six days and want the Danakil and Gheralta.” “I’m a photographer and want more time at Dallol.” Anything helps."
        />
      </Field>
    </FormShell>
  )
}
