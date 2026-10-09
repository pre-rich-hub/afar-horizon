import { Reveal } from '@/components/common/Reveal'
import type { Post } from '../types/post.types'
import { PostCard } from './PostCard'

export function FeaturedPost({ featured }: { featured: Post }) {
  return (
    <section className="shell py-16 sm:py-20 lg:py-24">
        <Reveal className="mb-8">
          <p className="eyebrow text-accent">
            Latest Dispatch
          </p>
        </Reveal>
        <Reveal delay={80}>
          <PostCard post={featured} wide />
        </Reveal>
      </section>
  )
}
