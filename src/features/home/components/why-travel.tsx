'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { promises } from '@/content'
import { cn } from '@/lib/utils'

const promiseImages = [
  { image: '/images/addis-skyline.png', alt: 'Addis Ababa at dusk from the Entoto hills' },
  { image: '/images/textile.png', alt: 'A weaver working cotton on a traditional loom' },
  { image: '/images/hero-lalibela.png', alt: 'The rock-hewn Church of St George in Lalibela at dawn' },
  { image: '/images/coffee-ceremony.png', alt: 'Coffee poured from a jebena during a coffee ceremony' },
]

const slides = [
  ...promises.map((p, i) => ({ ...p, ...promiseImages[i] })),
  {
    title: 'Timed to the light and the calendar',
    text: 'We plan around feast days, harvests and the hours when the highlands glow — so you arrive where the moment is, not where the crowd is.',
    image: '/images/hero-simien.png',
    alt: 'Mist rolling through the Simien Mountains at sunrise',
  },
  {
    title: 'Rest as considered as the route',
    text: 'Lodges and guesthouses chosen for their character and their quiet, so each day ends somewhere worth waking up in.',
    image: '/images/luxury-lodge.png',
    alt: 'A stone lodge terrace overlooking clouded mountains',
  },
]

// Position of each card relative to the active one: translate (in % of the
// card's own width) and scale. Cards further than two steps away tuck behind.
const LAYERS = [
  { x: 0, scale: 1, opacity: 1 },
  { x: 50, scale: 0.8, opacity: 1 },
  { x: 72, scale: 0.62, opacity: 1 },
  { x: 72, scale: 0.5, opacity: 0 },
]

const AUTOPLAY_MS = 6000

export function WhyTravel() {
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

  return (
    <section
      id="why-us"
      aria-labelledby="why-us-title"
      className="relative overflow-hidden bg-background py-20 sm:py-24 lg:py-32"
    >
      <div aria-hidden className="hairline-grid pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />

      <Reveal className="shell relative mb-12 text-center sm:mb-16">
        <p className="eyebrow mb-5 justify-center text-accent">
          The Afar Horizon Difference
        </p>
        <h2
          id="why-us-title"
          className="text-balance text-4xl leading-[1.05] text-foreground sm:text-5xl"
        >
          Why travel with Afar Horizon<span className="text-accent">.</span>
        </h2>
      </Reveal>

      <Reveal delay={120} className="relative">
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Why travel with Afar Horizon"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') go(active + 1)
            if (e.key === 'ArrowLeft') go(active - 1)
          }}
        >
          <div
            className="relative mx-auto aspect-[16/10] w-[74vw] touch-pan-y select-none sm:w-[56vw] lg:w-[600px]"
            onPointerDown={(e) => (dragStart.current = e.clientX)}
            onPointerUp={onPointerUp}
            onPointerCancel={() => (dragStart.current = null)}
          >
            {slides.map((s, i) => {
              // Shortest signed distance around the loop.
              let offset = (i - active + n) % n
              if (offset > n / 2) offset -= n
              const depth = Math.min(Math.abs(offset), LAYERS.length - 1)
              const layer = LAYERS[depth]
              const dir = Math.sign(offset)
              const isActive = offset === 0

              return (
                <button
                  key={s.title}
                  type="button"
                  tabIndex={isActive ? -1 : depth === 1 ? 0 : -1}
                  aria-hidden={!isActive && depth !== 1}
                  aria-label={isActive ? undefined : `Show: ${s.title}`}
                  onClick={() => !isActive && go(i)}
                  className={cn(
                    'absolute inset-0 overflow-hidden rounded-sm bg-muted shadow-[0_24px_60px_-28px_oklch(0.185_0.012_58/0.55)] transition-[transform,opacity,filter] duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none',
                    isActive ? 'cursor-default' : 'cursor-pointer',
                  )}
                  style={{
                    transform: `translateX(${dir * layer.x}%) scale(${layer.scale})`,
                    opacity: layer.opacity,
                    zIndex: 30 - depth * 10,
                    filter: isActive ? 'none' : 'saturate(0.85) brightness(0.92)',
                  }}
                >
                  <Image
                    src={s.image}
                    alt={isActive ? s.alt : ''}
                    fill
                    draggable={false}
                    sizes="(max-width: 640px) 74vw, (max-width: 1024px) 56vw, 600px"
                    className={cn(
                      'object-cover transition-transform duration-[6000ms] ease-out',
                      isActive && !paused && 'scale-[1.05]',
                    )}
                  />
                </button>
              )
            })}

            <Arrow side="left" onClick={() => go(active - 1)} />
            <Arrow side="right" onClick={() => go(active + 1)} />
          </div>

          <div className="shell mt-12 sm:mt-14">
            <div className="mx-auto grid max-w-[60ch] text-center" aria-live="polite">
              {slides.map((s, i) => (
                <div
                  key={s.title}
                  aria-hidden={i !== active}
                  className={cn(
                    '[grid-area:1/1] transition-all duration-700 ease-out motion-reduce:transition-none',
                    i === active
                      ? 'translate-y-0 opacity-100'
                      : 'pointer-events-none translate-y-3 opacity-0',
                  )}
                >
                  <h3 className="text-2xl text-foreground sm:text-3xl">{s.title}</h3>
                  <p className="mt-4 text-pretty leading-relaxed text-muted-foreground sm:text-lg">
                    {s.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center justify-center gap-4">
              <span className="font-serif text-sm tabular-nums text-foreground">
                {String(active + 1).padStart(2, '0')}
              </span>
              <div className="flex gap-1.5">
                {slides.map((s, i) => (
                  <button
                    key={s.title}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Go to slide ${i + 1}: ${s.title}`}
                    aria-current={i === active}
                    className="group flex h-6 items-center"
                  >
                    <span
                      className={cn(
                        'block h-px transition-all duration-500',
                        i === active
                          ? 'w-10 bg-accent'
                          : 'w-5 bg-foreground/25 group-hover:bg-foreground/50',
                      )}
                    />
                  </button>
                ))}
              </div>
              <span className="font-serif text-sm tabular-nums text-muted-foreground">
                {String(n).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function Arrow({ side, onClick }: { side: 'left' | 'right'; onClick: () => void }) {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      onPointerDown={(e) => e.stopPropagation()}
      aria-label={side === 'left' ? 'Previous reason' : 'Next reason'}
      className={cn(
        'absolute top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background text-accent shadow-[0_8px_24px_-8px_oklch(0.185_0.012_58/0.45)] transition-all duration-300 hover:scale-110 hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:h-12 sm:w-12',
        side === 'left' ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2',
      )}
    >
      <Icon className="h-5 w-5" strokeWidth={1.75} />
    </button>
  )
}
