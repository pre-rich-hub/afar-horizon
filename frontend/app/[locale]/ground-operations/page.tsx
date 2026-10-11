import {getTranslations, setRequestLocale} from 'next-intl/server'
import {requireLocale} from '@/i18n/locale'
import { createPageMetadata } from '@/lib/seo/metadata'
import { GroundOpsHandle, GroundOpsHero, GroundOpsIntro, GroundOpsPartner, GroundOpsServices } from '@/features/ground-operations'

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
 const {locale: rawLocale} = await params
 const locale = requireLocale(rawLocale)
 const tr = await getTranslations({locale, namespace: 'Pages'})
 return createPageMetadata({
  "title": tr('ground-operations_title'),
  "description": tr('ground-operations_description'),
  "path": "/ground-operations",
  "image": "https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/danakil-depression.png",
  "imageAlt": tr('ground-operations_imageAlt'),
  locale,
})
}

export default async function GroundOperationsPage({params}: {params: Promise<{locale: string}>}) {
 const {locale: rawLocale} = await params
 const locale = requireLocale(rawLocale)
 setRequestLocale(locale)

  return (
    <>
      <GroundOpsHero />

      <GroundOpsIntro />

      {/* What we handle */}
      <GroundOpsHandle />

      {/* Partner services */}
      <GroundOpsServices />

      {/* Partner form */}
      <GroundOpsPartner />
    </>
  )
}
