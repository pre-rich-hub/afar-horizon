import {getTranslations, setRequestLocale} from 'next-intl/server'
import {requireLocale} from '@/i18n/locale'
import { createPageMetadata } from '@/lib/seo/metadata'
import { DestinationIndex, Experiences, FeaturedTours, Gallery, Hero, PlanJourney, Reviews, SignatureDestinations, StoryCarousel, WhyTravel } from '@/features/home'
import { getToursData } from '@/features/tours'

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
 const {locale: rawLocale} = await params
 const locale = requireLocale(rawLocale)
 const tr = await getTranslations({locale, namespace: 'Pages'})
 return createPageMetadata({
  "title": tr('home_title'),
  "description": tr('home_description'),
  "path": "/",
  "image": "https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/danakil-depression.png",
  "imageAlt": tr('home_imageAlt'),
  locale,
})
}

export default async function Page({params}: {params: Promise<{locale: string}>}) {
 const {locale: rawLocale} = await params
 const locale = requireLocale(rawLocale)
 setRequestLocale(locale)

  const tours = await getToursData()

  return (
    <>
      <Hero />
      <WhyTravel />
      <SignatureDestinations />
      <FeaturedTours tours={tours} />
      <StoryCarousel tours={tours} />
      <Experiences />
      <DestinationIndex />
      <Reviews />
      <Gallery />
      <PlanJourney />
    </>
  )
}
