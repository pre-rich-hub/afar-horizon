
import { TranslationBoundary } from '@/components/common/TranslationBoundary'
import { SectionNav } from '@/components/common/SectionNav'
import { sections } from '../data/about.data'

export function AboutNavigation() {
  return (
    <TranslationBoundary><SectionNav items={sections} /></TranslationBoundary>
  )
}
