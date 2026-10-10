import { SpecialistHero, SpecialistNavigation, SpecialistPlanning, SpecialistPricing, SpecialistTracks } from '@/features/specialist-travel'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Specialist Travel',
  description:
    'Custom Ethiopian expeditions for photographers, filmmakers, researchers, universities, trekkers, runners and private groups, with local logistics in the Danakil and the north.',
  alternates: { canonical: '/specialist-travel' },
}

export default function SpecialistTravelPage() {
  return (
    <>
      <SpecialistHero />

      <SpecialistNavigation />

      {/* Photography, film, research, trekking, groups */}
      <SpecialistTracks />

      <SpecialistPricing />

      <SpecialistPlanning />
    </>
  )
}
