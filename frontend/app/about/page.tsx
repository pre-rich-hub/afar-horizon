import { AboutApproach, AboutBrief, AboutHero, AboutNavigation, AboutPlanning, AboutStory } from '@/features/about'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Afar Horizon Expeditions is a locally owned travel company in Addis Ababa, designing private journeys from the salt flats of the Afar to the highlands of northern Ethiopia.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <AboutHero />

      <AboutNavigation />

      {/* In brief */}
      <AboutBrief />

      {/* Our story */}
      <AboutStory />

      {/* Our approach */}
      <AboutApproach />

      {/* Plan */}
      <AboutPlanning />
    </>
  )
}
