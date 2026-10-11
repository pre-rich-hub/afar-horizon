import {useBlogCopy} from '../data/localized'
import { useTranslations } from 'next-intl'

import { SectionHeading } from '@/components/common/SectionHeading'
import type { Post } from '../types/post.types'
import { PostsGrid } from './PostsGrid'

export function PostArchive({ rest: baserest }: { rest: Post[] }) {
  const rest = useBlogCopy('post.posts', baserest)

  const tr = useTranslations('UI.blog.PostArchive')

  return (
    <section className="border-t border-border">
        <div className="shell py-16 sm:py-20 lg:py-28">
          <SectionHeading
            eyebrow={tr('archive')}
            title={tr('everythingWeHaveWrittenDown')}
            aside={tr('sixEssaysAndCountingFiledByWhat')}
          />
          <PostsGrid posts={rest} />
        </div>
      </section>
  )
}
