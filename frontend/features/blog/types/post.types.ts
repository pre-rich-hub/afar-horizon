export type Post = {
  slug: string
  title: string
  category: string
  date: string
  readTime: string
  image: string
  imageAlt?: string
  author: string
  authorRole: string
  excerpt: string
  body: string[]
  featured?: boolean
}
