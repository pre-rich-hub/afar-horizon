
import { TranslationBoundary } from '@/components/common/TranslationBoundary'
import { CtaBand } from '@/components/common/CtaBand'

export function BeforeYouGoPlanning() {
  return (
    <TranslationBoundary><CtaBand
        title="Ask about current conditions"
        text="Tell us your dates and we will tell you honestly what is possible, what the route involves and what we would recommend."
        secondary={{ label: 'Read the FAQ', href: '/faq' }}
        image="https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/danakil-depression.png"
      /></TranslationBoundary>
  )
}
