import { createPageMetadata } from '@/lib/seo/metadata'
import { ContactEnquiry, ContactHero, ContactProcess, ContactPromises } from '@/features/contact'

export const metadata = createPageMetadata({
  "title": "Contact Us to Plan Your Afar Journey",
  "description": "Speak with Afar Horizon about private Danakil expeditions, Afar travel and northern Ethiopia routes. Share your dates, interests and planning questions.",
  "path": "/contact",
  "image": "https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/afar.png",
  "imageAlt": "Afar, Ethiopia"
})

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
