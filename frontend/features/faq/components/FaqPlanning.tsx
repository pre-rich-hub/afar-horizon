import { CtaBand } from '@/components/common/CtaBand'

export function FaqPlanning() {
  return (
    <CtaBand
        title="Didn’t find your question?"
        text="Ask us about current conditions, your dates or anything else. You will get an honest answer from the team that runs the route."
        secondary={{ label: 'Before You Go', href: '/before-you-go' }}
      />
  )
}
