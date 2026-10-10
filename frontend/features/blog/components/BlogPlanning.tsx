import { CtaBand } from '@/components/common/CtaBand'

export function BlogPlanning() {
  return (
    <CtaBand
        title="Read something that changed your mind?"
        text="Most of these essays started as an answer to a guest question. Ask us yours and it may well become the next one."
        secondary={{ label: 'Browse Expeditions', href: '/expeditions' }}
        image="/images/hero-simien.png"
      />
  )
}
