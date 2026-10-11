import {useCatalogueLabel, useDuration} from '@/lib/i18n/labels'
import {useToursCopy} from '../data/localized'
import { useTranslations } from 'next-intl'

import { PageHero } from '@/components/common/PageHero'
import type { Tour } from '../types/tour.types'
import { formatDuration, getStartEnd } from '../utils/tour.utils'

export function TourHero({ t: baset }: { t: Tour }) {
  const catalogueLabel = useCatalogueLabel()
  const duration = useDuration()

  const t = useToursCopy('tour.tours', baset)

  const tr = useTranslations('UI.tours.TourHero')

  const priceOnRequest = t.from === 'Price on request'
  return (
    <PageHero
        eyebrow={catalogueLabel(t.style)}
        title={t.title}
        lede={t.teaser}
        image={t.image}
        imageAlt={t.imageAlt ?? t.title}
        crumbs={[
          { label: tr('home'), href: '/' },
          { label: tr('expeditions'), href: '/expeditions' },
          { label: t.title },
        ]}
        meta={[
          { label: tr('duration'), value: duration(t) },
          { label: tr('startFinish'), value: getStartEnd(t) },
          { label: tr('difficulty'), value: t.difficulty ?? t.style },
          { label: priceOnRequest ? tr('pricing') : tr('from'), value: priceOnRequest ? t.from : t.from.split(' ')[0] },
        ]}
      />
  )
}
