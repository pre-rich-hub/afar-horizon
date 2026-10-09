import { BlogHero, BlogNewsletter, BlogPlanning, FeaturedPost, getPostCollection, PostArchive } from '@/features/blog'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Journal',
  description:
    'Planning guidance, destination essays and dispatches from the designers and guides who run our Ethiopian journeys.',
}

export default function BlogPage() {
  const { featured, rest } = getPostCollection()

  return (
    <>
      <BlogHero />

      {/* Featured */}
      <FeaturedPost featured={featured} />

      {/* All posts */}
      <PostArchive rest={rest} />

      {/* Newsletter */}
      <BlogNewsletter />

      <BlogPlanning />
    </>
  )
}
