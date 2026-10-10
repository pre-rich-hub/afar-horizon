import { PhotoCreditsHero, PhotoCreditsList } from '@/features/photo-credits'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Photo Credits',
  description: 'Credits and licences for the third-party photographs used on this website.',
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
