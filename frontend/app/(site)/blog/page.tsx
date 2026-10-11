import { createPageMetadata } from '@/lib/seo/metadata'
import { BlogHero, BlogNewsletter, BlogPlanning, FeaturedPost, getPostCollection, PostArchive } from '@/features/blog'

export const metadata = createPageMetadata({
  "title": "Afar & Danakil Travel Guides",
  "description": "Plan your Afar journey with guides to Danakil seasons, packing, Erta Ale, Dallol, salt lakes and Semera, alongside wider Ethiopian travel stories.",
  "path": "/blog",
  "image": "https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/afar.png",
  "imageAlt": "Afar, Ethiopia"
})

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
