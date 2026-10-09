'use client'

import { useScrollEdges } from './useScrollEdges'

export function useTourRail() {
  const { ref: track, edges } = useScrollEdges({ start: true, end: false }, 24)

  const step = (dir: 1 | -1) => {
    const el = track.current
    const card = el?.querySelector<HTMLElement>('[data-card]')
    if (!el || !card) return
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const perStep = window.matchMedia('(min-width: 1024px)').matches ? 2 : 1
    el.scrollBy({
      left: dir * (card.offsetWidth + gap) * perStep,
      behavior: reduce ? 'auto' : 'smooth',
    })
  }
  return { track, edges, step }
}
