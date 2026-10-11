import {getTranslations, setRequestLocale} from 'next-intl/server'
import {requireLocale} from '@/i18n/locale'
import { createPageMetadata } from '@/lib/seo/metadata'
import { GalleryCollection, GalleryHero, GalleryPlanning } from '@/features/gallery'

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
 const {locale: rawLocale} = await params
 const locale = requireLocale(rawLocale)
 const tr = await getTranslations({locale, namespace: 'Pages'})
 return createPageMetadata({
  "title": tr('gallery_title'),
  "description": tr('gallery_description'),
  "path": "/gallery",
  "image": "https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/simien-mountains.png",
  "imageAlt": tr('gallery_imageAlt'),
  locale,
})
}

export default async function GalleryPage({params}: {params: Promise<{locale: string}>}) {
 const {locale: rawLocale} = await params
 const locale = requireLocale(rawLocale)
 setRequestLocale(locale)

  return (
    <>
      <GalleryHero />

      <GalleryCollection />

      <GalleryPlanning />
    </>
  )
}
