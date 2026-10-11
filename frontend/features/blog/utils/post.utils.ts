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
  const curated = post.relatedSlugs ?? []
  const score = (candidate: Post) => {
    const position = curated.indexOf(candidate.slug)
    if (position >= 0) return 100 - position
    return (candidate.topics ?? []).filter(topic => post.topics?.includes(topic)).length * 10
      + Number(candidate.category === post.category)
  }
  const relevant = posts.filter(p => p.slug !== post.slug).sort((a, b) => score(b) - score(a))
  const next = relevant[0]
  const more = relevant.slice(1, 4)
  return { next, more }
}
