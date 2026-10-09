import { ContactEnquiry, ContactHero, ContactProcess, ContactPromises } from '@/features/contact'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Speak directly with an Addis-based travel designer about your Ethiopian journey. We are available Monday to Saturday, 8:00 AM - 5:30 PM.',
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      {/* Form + details */}
      <ContactEnquiry />

      {/* Process */}
      <ContactProcess />

      {/* Promises */}
      <ContactPromises />
    </>
  )
}
