import {getTranslations, setRequestLocale} from 'next-intl/server'
import {requireLocale} from '@/i18n/locale'
import { createPageMetadata } from '@/lib/seo/metadata'
import { BeforeYouGoGuide, BeforeYouGoHero, BeforeYouGoPlanning } from '@/features/before-you-go'

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
 const {locale: rawLocale} = await params
 const locale = requireLocale(rawLocale)
 const tr = await getTranslations({locale, namespace: 'Pages'})
 return createPageMetadata({
  "title": tr('before-you-go_title'),
  "description": tr('before-you-go_description'),
  "path": "/before-you-go",
  "image": "https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/danakil-depression.png",
  "imageAlt": tr('before-you-go_imageAlt'),
  locale,
})
}

export default async function BeforeYouGoPage({params}: {params: Promise<{locale: string}>}) {
 const {locale: rawLocale} = await params
 const locale = requireLocale(rawLocale)
 setRequestLocale(locale)

  return (
    <>
      <BeforeYouGoHero />

      <BeforeYouGoGuide />

      <BeforeYouGoPlanning />
    </>
  )
}
