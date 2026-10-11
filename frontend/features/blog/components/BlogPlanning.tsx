
import { TranslationBoundary } from '@/components/common/TranslationBoundary'
import { CtaBand } from '@/components/common/CtaBand'

export function BlogPlanning() {
  return (
    <TranslationBoundary><CtaBand
        title="Read something that changed your mind?"
        text="Most of these essays started as an answer to a guest question. Ask us yours and it may well become the next one."
        secondary={{ label: 'Browse Expeditions', href: '/expeditions' }}
        image="https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/simien-mountains.png"
      /></TranslationBoundary>
  )
}
