import { CtaBand } from '@/components/common/CtaBand'

export function ExpeditionsPlanning() {
  return (
    <CtaBand
        title="Not sure which expedition fits?"
        text="Tell us your dates, how many days you have and what you most want to experience. We will build the route around you."
        secondary={{ label: 'See Destinations', href: '/destinations' }}
      />
  )
}
