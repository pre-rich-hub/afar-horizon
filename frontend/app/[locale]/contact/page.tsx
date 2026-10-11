import {getTranslations, setRequestLocale} from 'next-intl/server'
import {requireLocale} from '@/i18n/locale'
import { createPageMetadata } from '@/lib/seo/metadata'
import { ContactEnquiry, ContactHero, ContactProcess, ContactPromises } from '@/features/contact'

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
 const {locale: rawLocale} = await params
 const locale = requireLocale(rawLocale)
 const tr = await getTranslations({locale, namespace: 'Pages'})
 return createPageMetadata({
  "title": tr('contact_title'),
  "description": tr('contact_description'),
  "path": "/contact",
  "image": "https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/afar.png",
  "imageAlt": tr('contact_imageAlt'),
  locale,
})
}

export default async function ContactPage({params}: {params: Promise<{locale: string}>}) {
 const {locale: rawLocale} = await params
 const locale = requireLocale(rawLocale)
 setRequestLocale(locale)

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
