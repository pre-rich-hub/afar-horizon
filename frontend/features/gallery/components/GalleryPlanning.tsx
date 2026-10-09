import { CtaBand } from '@/components/common/CtaBand'

export function GalleryPlanning() {
  return (
    <CtaBand
        title="See it for yourself"
        text="Tell us which of these places pulls at you, and a designer will shape a journey around the light, the season and the pace you prefer."
        primary={{ label: 'Plan Your Journey', href: '/contact' }}
        secondary={{ label: 'Browse Tours', href: '/tours' }}
        image="/images/danakil.png"
      />
  )
}
