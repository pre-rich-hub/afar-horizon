'use client'
import {useHomeCopy} from '../data/localized'
import { useTranslations } from 'next-intl'


import { shots as baseShots } from '../data/gallery.data'

import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export function Gallery() {
  const tr = useTranslations('UI.home.Gallery')
  const shots = useHomeCopy('gallery.shots', baseShots)

  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [previous, setPrevious] = useState<number | null>(null)
  const [inView, setInView] = useState(false)
  const [prepared, setPrepared] = useState<number | null>(null)
  const [loaded, setLoaded] = useState(new Set<number>())
  const loadedFrames = useRef(new Set<number>())
  const viewport = useRef<HTMLElement | null>(null)
  const select = (index: number) => {
    if (index === activeIndex) return
    setPrevious(loaded.has(activeIndex) ? activeIndex : previous ?? activeIndex)
    setActiveIndex(index)
  }

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motion.matches) setIsPlaying(false)
    const node = viewport.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.1 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isPlaying || !inView) return
    const next = (activeIndex + 1) % shots.length
    const prepare = window.setTimeout(() => setPrepared(next), 4500)
    const go = () => {
      if (!loadedFrames.current.has(next)) {
        advance = window.setTimeout(go, 250)
        return
      }
      setPrevious(activeIndex)
      setActiveIndex(next)
    }
    let advance = window.setTimeout(go, 7000)
    return () => { window.clearTimeout(prepare); window.clearTimeout(advance) }
  }, [isPlaying, inView, activeIndex])

  return (
    <section
      ref={viewport}
      id="journal"
      aria-label={tr('photoGallery')}
      className="group/viewport relative isolate h-[100svh] min-h-[560px] w-full overflow-hidden bg-charcoal"
    >
      {shots.map((shot, idx) => {
        const isActive = idx === activeIndex
        if (!isActive && idx !== previous && idx !== prepared) return null
        const displayed = (isActive && (previous === null || loaded.has(activeIndex))) || (idx === previous && !loaded.has(activeIndex))
        // Alternate animation direction/style
        const kbClass = idx % 2 === 0 ? tr('animateKb1') : tr('animateKb2')
        return (
          <div
            key={`${idx}-${shot.src}`}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${displayed ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
          >
            <Image
              src={shot.src}
              onLoad={() => {
                loadedFrames.current.add(idx)
                setLoaded(current => new Set(current).add(idx))
              }}
              alt={tr('valueEthiopia', { value0: String(shot.location) })}
              fill
              sizes="100vw"
              loading={inView ? 'eager' : 'lazy'}
              className={`object-cover ${isActive ? kbClass : 'scale-100'}`}
            />
          </div>
        )
      })}

      {/* Shading so the overlaid copy stays legible on any photo */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-charcoal/40 via-transparent via-35% to-charcoal/90" />
      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-charcoal/40 to-transparent" />

      {/* Bottom bar: caption, dots and controls, aligned to the page shell */}
      <div className="shell absolute inset-x-0 bottom-0 z-30 pb-8 sm:pb-10 lg:pb-12">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div key={activeIndex} className="max-w-md text-balance [animation:fade-up_0.8s_ease_both]">
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
              {String(activeIndex + 1).padStart(2, '0')} / {String(shots.length).padStart(2, '0')} {tr('capturedMoments')}</span>
            <h3 className="mt-2 font-serif text-3xl font-normal tracking-wide text-white sm:text-4xl lg:text-5xl">
              {shots[activeIndex].location}
            </h3>
            <p className="mt-2 font-sans text-sm leading-relaxed text-sand/80 sm:text-base">
              {shots[activeIndex].description}
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-start gap-5 sm:items-end">
            <div className="hidden items-center gap-2 sm:flex">
              {shots.map((_, idx) => {
                const isActive = idx === activeIndex
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      select(idx)
                      setIsPlaying(true) // reset timer & keep playing on selection
                    }}
                    className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${isActive ? 'w-8 bg-accent' : 'w-2 bg-white/40 hover:bg-white/80'
                      }`}
                    aria-label={tr('goToSlideValue', { value0: String(idx + 1) })}
                  />
                )
              })}
            </div>
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-3 rounded-full bg-charcoal/50 backdrop-blur-md border border-sand/20 hover:border-accent hover:bg-accent hover:text-accent-foreground text-sand transition-all duration-300 cursor-pointer"
                aria-label={isPlaying ? tr('pauseSlideshow') : tr('playSlideshow')}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={() => select((activeIndex - 1 + shots.length) % shots.length)}
                className="p-3 rounded-full bg-charcoal/50 backdrop-blur-md border border-sand/20 hover:border-accent hover:bg-accent hover:text-accent-foreground text-sand transition-all duration-300 cursor-pointer"
                aria-label={tr('previousSlide')}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => select((activeIndex + 1) % shots.length)}
                className="p-3 rounded-full bg-charcoal/50 backdrop-blur-md border border-sand/20 hover:border-accent hover:bg-accent hover:text-accent-foreground text-sand transition-all duration-300 cursor-pointer"
                aria-label={tr('nextSlide')}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

        {/* Dynamic CSS animations styles injected locally */}
        <style>{`
          @keyframes kb-pan-1 {
            0% { transform: scale(1.03) translate(0%, 0%); }
            100% { transform: scale(1.08) translate(-1%, -0.5%); }
          }
          @keyframes kb-pan-2 {
            0% { transform: scale(1.08) translate(0%, 0%); }
            100% { transform: scale(1.03) translate(1%, 0.5%); }
          }
          .animate-kb-1 {
            animation: kb-pan-1 8000ms ease-out forwards;
          }
          .animate-kb-2 {
            animation: kb-pan-2 8000ms ease-out forwards;
          }
          @keyframes progress-grow {
            from { transform: scaleX(0); }
            to { transform: scaleX(1); }
          }
          .animate-progress-grow {
            animation: progress-grow 7000ms linear forwards;
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-kb-1, .animate-kb-2, .animate-progress-grow { animation: none; }
          }
        `}</style>

        {/* Progress Bar indicating time remaining for current slide */}
        {isPlaying && inView && (
          <div
            key={activeIndex}
            className="absolute bottom-0 left-0 right-0 h-[3px] bg-accent/90 z-30 origin-left animate-progress-grow"
          />
        )}
    </section>
  )
}
