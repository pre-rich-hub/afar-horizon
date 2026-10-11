import {useBlogCopy} from '../data/localized'
import { useTranslations } from 'next-intl'

import { Reveal } from '@/components/common/Reveal'
import type { Post } from '../types/post.types'
import { PostCard } from './PostCard'

export function FeaturedPost({ featured: basefeatured }: { featured: Post }) {
  const featured = useBlogCopy('post.posts', basefeatured)

  const tr = useTranslations('UI.blog.FeaturedPost')

  return (
    <section className="shell py-16 sm:py-20 lg:py-24">
        <Reveal className="mb-8">
          <p className="eyebrow text-accent">
            {tr('latestDispatch')}</p>
        </Reveal>
        <Reveal delay={80}>
          <PostCard post={featured} wide />
        </Reveal>
      </section>
  )
}
