import { safeAnalyticsPath } from './policy'

export type EnquiryKind = 'journey' | 'partner'
type EventName = 'enquiry_submitted' | 'contact_intent' | 'package_enquiry_intent'
type Sender = (name: EventName, data: Record<string, string>) => void
let sender: Sender | null = null
let publicPaths: readonly string[] = []

export function configureConversionTracking(next: Sender | null, paths: readonly string[]) {
  sender = next
  publicPaths = paths
}

function emit(name: EventName, dimensions: Record<string, string>) {
  if (!sender || typeof window === 'undefined') return
  const page = safeAnalyticsPath(window.location.href, publicPaths)
  if (!page) return
  // Reporting must never change the result of a form submission or navigation.
  try { sender(name, { ...dimensions, page }) } catch { /* Analytics is optional. */ }
}

export function trackEnquiryCompletion(kind: EnquiryKind) {
  if (kind === 'journey' || kind === 'partner') emit('enquiry_submitted', { form: kind })
}

export function trackContactIntent(href: string) {
  try {
    const url = new URL(href, window.location.href)
    const channel = url.protocol === 'tel:' ? 'phone' : url.protocol === 'mailto:' ? 'email'
      : url.protocol === 'https:' && url.hostname === 'wa.me' ? 'whatsapp' : null
    if (channel) emit('contact_intent', { channel })
  } catch { /* Not a contact link. */ }
}

export function trackPackageEnquiryIntent(href: string) {
  if (typeof window === 'undefined' || !window.location.pathname.startsWith('/expeditions/')) return
  try {
    const url = new URL(href, window.location.href)
    if (url.origin === window.location.origin && ((url.pathname === window.location.pathname && url.hash === '#enquire') || ['/plan', '/contact'].includes(url.pathname))) {
      emit('package_enquiry_intent', {})
    }
  } catch { /* Not an enquiry link. */ }
}
