import { createPageMetadata } from '@/lib/seo/metadata'
import { SafetyPanel } from '@/components/common/SafetyPanel'
import { GroundOpsHandle, GroundOpsHero, GroundOpsIntro, GroundOpsPartner, GroundOpsServices } from '@/features/ground-operations'

export const metadata = createPageMetadata({
  "title": "Ethiopia Ground Operations & Expedition Support",
  "description": "Local ground support for tour operators, film crews and research teams in Afar and northern Ethiopia: vehicles, guides, camps and route coordination.",
  "path": "/ground-operations",
  "image": "https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/danakil-depression.png",
  "imageAlt": "Dallol, Ethiopia"
})

export default function GroundOperationsPage() {
  return (
    <>
      <GroundOpsHero />

      <GroundOpsIntro />

      {/* What we handle */}
      <GroundOpsHandle />

      {/* Partner services */}
      <GroundOpsServices />

      <SafetyPanel title="Safety standards for your travellers" lede="Your clients travel under the same safety commitments as our own guests, with one local team responsible on the ground." />

      {/* Partner form */}
      <GroundOpsPartner />
    </>
  )
}
