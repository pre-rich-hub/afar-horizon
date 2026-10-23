import { createPageMetadata } from '@/lib/seo/metadata'
import { SafetyPanel } from '@/components/common/SafetyPanel'
import { SpecialistHero, SpecialistNavigation, SpecialistPlanning, SpecialistPricing, SpecialistTracks } from '@/features/specialist-travel'

export const metadata = createPageMetadata({
  "title": "Specialist Afar & Ethiopia Expeditions",
  "description": "Plan photography, filming, research and mountain journeys in Afar and northern Ethiopia, with local route planning and expedition logistics.",
  "path": "/specialist-travel",
  "image": "https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/danakil-depression.png",
  "imageAlt": "Dallol, Ethiopia"
})

export default function SpecialistTravelPage() {
  return (
    <>
      <SpecialistHero />

      <SpecialistNavigation />

      {/* Photography, film, research, trekking, groups */}
      <SpecialistTracks />

      <SpecialistPricing />

      <SafetyPanel title="Safety for crews and specialist teams" lede="Photography, filming and research put people closer to hazardous ground for longer. We plan positions, timings and access around safety first." />

      <SpecialistPlanning />
    </>
  )
}
