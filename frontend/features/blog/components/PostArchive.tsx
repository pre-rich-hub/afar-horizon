import { SectionHeading } from '@/components/common/SectionHeading'
import type { Post } from '../types/post.types'
import { PostsGrid } from './PostsGrid'

export function PostArchive({ rest }: { rest: Post[] }) {
  return (
    <section className="border-t border-border">
        <div className="shell py-16 sm:py-20 lg:py-28">
          <SectionHeading
            eyebrow="Archive"
            title="Everything we have written down"
            aside="Six essays and counting, filed by what they are actually useful for."
          />
          <PostsGrid posts={rest} />
        </div>
      </section>
  )
}
