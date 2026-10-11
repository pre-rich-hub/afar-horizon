import { createPageMetadata } from '@/lib/seo/metadata'
import { SpecialistHero, SpecialistNavigation, SpecialistPlanning, SpecialistPricing, SpecialistTracks } from '@/features/specialist-travel'

export const metadata = createPageMetadata({
  "title": "Specialist Afar & Ethiopia Expeditions",
  "description": "Plan photography, filming, research and mountain journeys in Afar and northern Ethiopia, with local route planning and expedition logistics.",
  "path": "/specialist-travel",
  "image": "https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/dallol.png",
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

      <SpecialistPlanning />
    </>
  )
}
