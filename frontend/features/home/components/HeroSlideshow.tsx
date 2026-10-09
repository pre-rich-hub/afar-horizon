'use client'

import { useHeroSlideshow } from '../hooks/useHeroSlideshow'

import { slides } from '../data/hero-slideshow.data'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import { type ReactNode } from 'react'

// Freely licensed photographs from Wikimedia Commons; the credit line shown
// under each slide is required by their licences.

export function HeroSlideshow({ children }: { children?: ReactNode }) {
  const { index, current, prev } = useHeroSlideshow()

  return (
    <>
      <div className="absolute inset-0 -z-10">
        {slides.map((slide, i) => {
          const visible = i === index || i === prev
          return (
            <div
              key={slide.src}
              aria-hidden={i !== index}
              className={cn(
                'absolute inset-0 overflow-hidden transition-opacity duration-[1800ms] ease-in-out',
                i === index ? 'opacity-100' : 'opacity-0',
              )}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className={cn(
                  'object-cover',
                  visible && 'motion-safe:animate-ken-burns',
                  i % 2 === 1 && 'origin-top-right',
                )}
              />
            </div>
          )
        })}
        {children}
      </div>

      <p className="absolute bottom-3 right-4 z-10 max-w-[70vw] truncate text-right text-[10px] tracking-wide text-background/60 sm:right-6">
        {current.place} ·{' '}
        <a
          href={current.source}
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-2 hover:text-background hover:underline"
        >
          Photo: {current.credit}, {current.license}
        </a>
      </p>
    </>
  )
}
