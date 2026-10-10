import { CtaBand } from '@/components/common/CtaBand'

export function SpecialistPlanning() {
  return (
    <CtaBand
      title="Tell us what you are planning"
      text="Share your purpose, dates, group size and the places you need to reach. We will tell you what is possible under current conditions and how we would run it."
      secondary={{ label: 'Ground Operations', href: '/ground-operations' }}
      image="/images/hero-danakil/salt-cutters.jpg"
    />
  )
}
