import { FaqGroups, FaqHero, FaqPlanning, FaqStructuredData } from '@/features/faq'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Answers about Afar Horizon Expeditions: private Danakil and Northern Ethiopia trips, prices, deposits, what is included, changing conditions and specialist travel.',
  alternates: { canonical: '/faq' },
}

export default function FaqPage() {
  return (
    <>
      <FaqStructuredData />

      <FaqHero />

      <FaqGroups />

      <FaqPlanning />
    </>
  )
}
