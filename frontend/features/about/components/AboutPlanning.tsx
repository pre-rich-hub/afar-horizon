
import { TranslationBoundary } from '@/components/common/TranslationBoundary'
import { CtaBand } from '@/components/common/CtaBand'

export function AboutPlanning() {
  return (
    <TranslationBoundary><div id="plan" className="scroll-mt-32">
        <CtaBand
          title="Start with a conversation"
          text="Tell us how much time you have and what draws you to Ethiopia. A designer will reply within a day with honest advice and a first outline of the journey."
          primary={{ label: 'Plan with us', href: '/contact' }}
          secondary={{ label: 'Browse expeditions', href: '/expeditions' }}
          image="https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/lalibela.png"
        />
      </div></TranslationBoundary>
  )
}
