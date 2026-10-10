import { CtaBand } from '@/components/common/CtaBand'

export function DestinationsPlanning() {
  return (
    <CtaBand
        title="Not sure where to start?"
        text="Tell us how many days you have and what pulls at you, whether it is salt and volcanoes, cliff churches or mountains, and we will suggest a route that works for current conditions."
        secondary={{ label: 'Browse Expeditions', href: '/expeditions' }}
        image="https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/simien-mountains.png"
      />
  )
}
