import {useAboutCopy} from '../data/localized'

import { SectionNav } from '@/components/common/SectionNav'
import { sections as baseSections } from '../data/about.data'

export function AboutNavigation() {
  const sections = useAboutCopy('about.sections', baseSections)

  return (
    <SectionNav items={sections} />
  )
}
