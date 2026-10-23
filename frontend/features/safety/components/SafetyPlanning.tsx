
import { TranslationBoundary } from '@/components/common/TranslationBoundary'
import { CtaBand } from '@/components/common/CtaBand'

export function SafetyPlanning() {
  return (
    <TranslationBoundary><CtaBand
        title="Ask about safety for your dates"
        text="Tell us when you want to travel and we will explain current conditions, what the route involves and how we would run it safely."
        secondary={{ label: 'Read the FAQ', href: '/faq' }}
        image="https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/erta-ale.png"
      /></TranslationBoundary>
  )
}
