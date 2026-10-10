import { PhotoCreditsHero, PhotoCreditsList } from '@/features/photo-credits'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Photo Credits',
  description: 'The client-provided destination and expedition photo collection used on this website.',
  alternates: { canonical: '/photo-credits' },
  robots: { index: false },
}

export default function PhotoCreditsPage() {
  return (
    <>
      <PhotoCreditsHero />

      <PhotoCreditsList />
    </>
  )
}
