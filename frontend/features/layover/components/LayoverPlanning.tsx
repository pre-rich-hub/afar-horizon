import { CtaBand } from '@/components/common/CtaBand'

export function LayoverPlanning() {
  return (
    <CtaBand
        title="Long stopover? Go north instead."
        text="With two nights you can fly to Lalibela, see the rock churches at dawn and be back at Bole for your onward leg. It is the best 48 hours in the country."
        primary={{ label: 'Plan a Stopover', href: '/contact' }}
        secondary={{ label: 'See Tours', href: '/tours' }}
        image="/images/lalibela.png"
      />
  )
}
