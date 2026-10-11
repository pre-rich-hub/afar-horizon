import {useBlogCopy} from '../data/localized'
import { useTranslations } from 'next-intl'

import { CtaBand } from '@/components/common/CtaBand'
import type { Post } from '../types/post.types'
import {useToursCopy} from '@/features/tours'
import { getTour } from '@/features/tours'

export function ArticlePlanning({ post: basepost }: { post: Post }) {
  const post = useBlogCopy('post.posts', basepost)

  const tr = useTranslations('UI.blog.ArticlePlanning')

  const tour = useToursCopy('tour.tours', post.tourSlug ? getTour(post.tourSlug) : undefined)
  return (
    <CtaBand
        title={tr('readyToSeeItForYourself')}
        text={tr('everyEssayHereComesOutOfA')}
        secondary={tour ? { label: tour.title, href: `/expeditions/${tour.slug}` } : { label: tr('seeDestinations'), href: '/destinations' }}
        image={post.image}
      />
  )
}
