import { posts } from '../data/post.data'

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug)
}

export function getPostCollection() {
  const featured = posts.find((p) => p.featured) ?? posts[0]
  const rest = posts.filter((p) => p.slug !== featured.slug)
  return { featured, rest }
}

import type { Post } from '../types/post.types'

export function getRelatedPosts(post: Post) {
  const index = posts.findIndex((p) => p.slug === post.slug)
  const next = posts[(index + 1) % posts.length]
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3)
  return { next, more }
}
