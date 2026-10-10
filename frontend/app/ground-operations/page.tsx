import { GroundOpsHandle, GroundOpsHero, GroundOpsIntro, GroundOpsPartner, GroundOpsServices } from '@/features/ground-operations'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ground Operations',
  description:
    'Ethiopia ground operations for international tour operators, agencies, researchers and specialist groups: 4×4 vehicles, guides, camps, accommodation and expedition support.',
  alternates: { canonical: '/ground-operations' },
}

export default function GroundOperationsPage() {
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
