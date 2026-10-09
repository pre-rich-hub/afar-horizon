'use client'

import { AUTOPLAY_MS, slides } from '../data/why-travel.data'

import { useCallback, useEffect, useRef, useState } from 'react'

export function useWhyTravel() {
  const n = slides.length
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const dragStart = useRef<number | null>(null)

  const go = useCallback((i: number) => setActive(((i % n) + n) % n), [n])

  useEffect(() => {
    if (paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setTimeout(() => go(active + 1), AUTOPLAY_MS)
    return () => clearTimeout(id)
  }, [active, paused, go])

  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStart.current === null) return
    const dx = e.clientX - dragStart.current
    dragStart.current = null
    if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1))
  }
  return { n, active, paused, setPaused, dragStart, go, onPointerUp }
}
