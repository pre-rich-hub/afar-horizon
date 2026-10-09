'use client'

import { INTERVAL, slides } from '../data/hero-slideshow.data'

import { useEffect, useState } from 'react'

export function useHeroSlideshow() {
  const [index, setIndex] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => {
      setStarted(true)
      setIndex((i) => (i + 1) % slides.length)
    }, INTERVAL)
    return () => window.clearInterval(id)
  }, [])

  const current = slides[index]
  // The outgoing slide keeps its zoom running while it fades out.
  const prev = started ? (index - 1 + slides.length) % slides.length : null
  return { index, current, prev }
}
