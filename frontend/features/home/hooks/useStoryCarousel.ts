'use client'

import { COPIES } from '../data/story-carousel.data'

import type { Tour } from '@/features/tours'
import { tours as staticTours } from '@/features/tours'
import { useCallback, useEffect, useRef } from 'react'

export function useStoryCarousel({ tours = staticTours }: { tours?: Tour[] }) {
  const track = useRef<HTMLDivElement>(null)

  const copyWidth = () => (track.current ? track.current.scrollWidth / COPIES : 0)

  const recenter = useCallback(() => {
    const el = track.current
    if (!el) return
    const w = copyWidth()
    if (el.scrollLeft < w * 0.5) el.scrollLeft += w
    else if (el.scrollLeft > w * 1.5) el.scrollLeft -= w
  }, [])

  useEffect(() => {
    const el = track.current
    if (!el) return
    // Start on the middle copy, with its first card centred.
    const first = el.children[tours.length] as HTMLElement | undefined
    if (first) {
      el.scrollLeft = first.offsetLeft - (el.clientWidth - first.offsetWidth) / 2
    }

    let timer: ReturnType<typeof setTimeout>
    const onScroll = () => {
      clearTimeout(timer)
      timer = setTimeout(recenter, 140)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      el.removeEventListener('scroll', onScroll)
    }
  }, [recenter, tours.length])

  const step = (dir: 1 | -1) => {
    const el = track.current
    const card = el?.children[0] as HTMLElement | undefined
    if (!el || !card) return
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({
      left: dir * (card.offsetWidth + gap),
      behavior: reduce ? 'auto' : 'smooth',
    })
  }

  const slides = Array.from({ length: COPIES }, (_, copy) =>
    tours.map((t, i) => ({ tour: t, copy, index: i })),
  ).flat()
  return { track, step, slides }
}
