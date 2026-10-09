import { CtaBand } from '@/components/common/CtaBand'
import type { Post } from '../types/post.types'

export function ArticlePlanning({ post }: { post: Post }) {
  return (
    <CtaBand
        title="Ready to see it for yourself?"
        text="Every essay here comes out of a journey we designed for someone. Tell us what you want yours to feel like."
        secondary={{ label: 'See Destinations', href: '/destinations' }}
        image={post.image}
      />
  )
}
