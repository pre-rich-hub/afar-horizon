'use client'

import { reviewSummary, testimonials } from '../data/review.data'
import { useScrollEdges } from './useScrollEdges'

export function useReviews() {
  const { ref: track, edges } = useScrollEdges({ start: true, end: true })
  const count = reviewSummary.count ?? testimonials.length

  const step = (dir: 1 | -1) => {
    const el = track.current
    const card = el?.firstElementChild as HTMLElement | null
    if (!el || !card) return
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: 'smooth' })
  }
  return { track, edges, count, step }
}
