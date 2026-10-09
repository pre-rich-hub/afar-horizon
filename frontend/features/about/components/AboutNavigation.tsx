import { SectionNav } from '@/components/common/SectionNav'
import { sections } from '../data/about.data'

export function AboutNavigation() {
  return (
    <SectionNav items={sections} />
  )
}
