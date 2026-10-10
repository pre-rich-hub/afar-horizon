import { BlogHero, BlogNewsletter, BlogPlanning, FeaturedPost, getPostCollection, PostArchive } from '@/features/blog'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Journal',
  description:
    'Afar and Danakil travel guides: when to visit, what to pack, Erta Ale, Dallol and the salt lakes, alongside culture and northern Ethiopia journeys.',
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
