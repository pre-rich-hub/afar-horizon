export type BlogCategory = { id: number; name: string; slug: string; postCount: number }

export type BlogPost = {
  id: number
  title: string
  description: string | null
  imageUrl: string | null
  category: { id: number; name: string } | null
  createdAt: string | null
}
