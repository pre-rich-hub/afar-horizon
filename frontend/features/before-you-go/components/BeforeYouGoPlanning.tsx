import { CtaBand } from '@/components/common/CtaBand'

export function BeforeYouGoPlanning() {
  return (
    <CtaBand
        title="Ask about current conditions"
        text="Tell us your dates and we will tell you honestly what is possible, what the route involves and what we would recommend."
        secondary={{ label: 'Read the FAQ', href: '/faq' }}
        image="/images/danakil.png"
      />
  )
}
