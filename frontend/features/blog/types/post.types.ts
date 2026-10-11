export type ArticleLink = { text: string; href: string }
export type ArticleParagraph = { heading?: string; text: string; links?: ArticleLink[] }

export type Post = {
  slug: string
  title: string
  category: string
  date: string
  publishedAt?: string
  readTime: string
  image: string
  imageAlt?: string
  author: string
  authorRole: string
  excerpt: string
  body: (string | ArticleParagraph)[]
  updatedAt?: string
  topics?: string[]
  relatedSlugs?: string[]
  tourSlug?: string
  sources?: ArticleLink[]
  featured?: boolean
}
