import {getTranslations, setRequestLocale} from 'next-intl/server'
import {requireLocale} from '@/i18n/locale'
import { createPageMetadata } from '@/lib/seo/metadata'
import { PlanHero, PlanRequest } from '@/features/plan'
import { getTour } from '@/features/tours'

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
 const {locale: rawLocale} = await params
 const locale = requireLocale(rawLocale)
 const tr = await getTranslations({locale, namespace: 'Pages'})
 return createPageMetadata({
  "title": tr('plan_title'),
  "description": tr('plan_description'),
  "path": "/plan",
  "image": "https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/lake-assale.png",
  "imageAlt": tr('plan_imageAlt'),
  "index": false,
  locale,
})
}

export default async function PlanPage({
  searchParams,
  params,
}: {
  params: Promise<{locale: string}>
  searchParams: Promise<{ expedition?: string }>
}) {
  const {locale: rawLocale} = await params
  const locale = requireLocale(rawLocale)
  setRequestLocale(locale)
  const { expedition } = await searchParams
  const tour = expedition ? getTour(expedition) : undefined

  return (
    <>
      <PlanHero />

      <PlanRequest subject={tour ? `${tour.days} ${tour.title}` : undefined} />
    </>
  )
}
