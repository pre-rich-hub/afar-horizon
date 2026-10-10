import { BeforeYouGoGuide, BeforeYouGoHero, BeforeYouGoPlanning } from '@/features/before-you-go'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Before You Go',
  description:
    'What a Danakil and Northern Ethiopia expedition is really like: heat, 4×4 roads, walking, camping, food and water, connectivity, safety, packing and respect.',
  alternates: { canonical: '/before-you-go' },
}

export default function BeforeYouGoPage() {
  return (
    <>
      <BeforeYouGoHero />

      <BeforeYouGoGuide />

      <BeforeYouGoPlanning />
    </>
  )
}
