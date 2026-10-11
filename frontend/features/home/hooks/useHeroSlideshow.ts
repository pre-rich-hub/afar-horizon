'use client'

import { INTERVAL, slides } from '../data/hero-slideshow.data'

import { useEffect, useRef, useState } from 'react'

export function useHeroSlideshow() {
  const [index, setIndex] = useState(0)
  const [started, setStarted] = useState(false)
  const [prepared, setPrepared] = useState<number | null>(null)
  const loaded = useRef(new Set<number>())
  const markLoaded = (index: number) => { loaded.current.add(index) }

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Fetch only the upcoming frame shortly before its transition.
    const id = window.setTimeout(() => setPrepared((index + 1) % slides.length), INTERVAL - 2500)
    return () => window.clearTimeout(id)
  }, [index])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const next = (index + 1) % slides.length
    const advance = () => {
      if (!loaded.current.has(next)) {
        id = window.setTimeout(advance, 250)
        return
      }
      setStarted(true)
      setIndex(next)
    }
    let id = window.setTimeout(advance, INTERVAL)
    return () => window.clearTimeout(id)
  }, [index])

  const current = slides[index]
  // The outgoing slide keeps its zoom running while it fades out.
  const prev = started ? (index - 1 + slides.length) % slides.length : null
  return { index, current, prev, prepared, markLoaded }
}
