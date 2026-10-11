import {getTranslations, setRequestLocale} from 'next-intl/server'
import {requireLocale} from '@/i18n/locale'
import { createPageMetadata } from '@/lib/seo/metadata'
import { PhotoCreditsHero, PhotoCreditsList } from '@/features/photo-credits'

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
 const {locale: rawLocale} = await params
 const locale = requireLocale(rawLocale)
 const tr = await getTranslations({locale, namespace: 'Pages'})
 return createPageMetadata({
  "title": tr('photo-credits_title'),
  "description": tr('photo-credits_description'),
  "path": "/photo-credits",
  "image": "https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/lake-assale.png",
  "imageAlt": tr('photo-credits_imageAlt'),
  "index": false,
  locale,
})
}

export default async function PhotoCreditsPage({params}: {params: Promise<{locale: string}>}) {
 const {locale: rawLocale} = await params
 const locale = requireLocale(rawLocale)
 setRequestLocale(locale)

  return (
    <>
      <PhotoCreditsHero />

      <PhotoCreditsList />
    </>
  )
}
