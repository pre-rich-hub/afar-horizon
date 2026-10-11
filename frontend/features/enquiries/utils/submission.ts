import { trackEnquiryCompletion, type EnquiryKind } from '@/lib/analytics/events'
import { submitContact } from '../api/enquiry.api'
import type { ContactPayload } from '../types/enquiry.types'

// Each form instance owns a single submission lifecycle, including retries.
export function createEnquirySubmission(send = submitContact, completed = trackEnquiryCompletion) {
  let pending: Promise<void> | null = null
  let accepted = false
  return (payload: ContactPayload, kind: EnquiryKind = 'journey'): Promise<void> => {
    if (accepted) return Promise.resolve()
    if (pending) return pending
    pending = (async () => {
      await send(payload)
      accepted = true
      try { completed(kind) } catch { /* Accepted requests remain successful. */ }
    })().finally(() => { pending = null })
    return pending
  }
}
