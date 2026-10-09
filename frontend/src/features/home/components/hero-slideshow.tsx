'use client'

import { useEffect, useState, type ReactNode } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

type Slide = {
  src: string
  alt: string
  place: string
  credit: string
  license: string
  source: string
}

// Freely licensed photographs from Wikimedia Commons; the credit line shown
// under each slide is required by their licences.
const slides: Slide[] = [
  {
    src: '/images/hero-danakil/dallol-springs.jpg',
    alt: 'Acid-green pools and sulfur terraces at Dallol in the Danakil Depression',
    place: 'Dallol, Danakil Depression',
    credit: 'A. Savin',
    license: 'FAL',
    source: 'https://commons.wikimedia.org/wiki/File:ET_Afar_asv2018-01_img48_Dallol.jpg',
  },
  {
    src: '/images/hero-danakil/erta-ale-lava-lake.jpg',
    alt: 'The glowing lava lake inside the crater of Erta Ale volcano',
    place: 'Erta Ale lava lake',
    credit: 'Hervé Sthioul',
    license: 'CC BY 2.5',
    source: 'https://commons.wikimedia.org/wiki/File:Erta-ale_lac-de-lave_2001.jpg',
  },
  {
    src: '/images/hero-danakil/salt-flats.jpg',
    alt: 'Cracked salt crust stretching to the horizon across the Danakil Depression',
    place: 'Salt flats of the Afar',
    credit: 'Thomas Fuhrmann',
    license: 'CC BY-SA 4.0',
    source:
      'https://commons.wikimedia.org/wiki/File:Ethiopia_-_dry_landscape_in_the_Danakil_Depression.jpg',
  },
  {
    src: '/images/hero-danakil/dallol-sulfur.jpg',
    alt: 'Yellow sulfur chimneys rising among rust-red mineral formations at Dallol',
    place: 'Sulfur springs, Dallol',
    credit: 'A. Savin',
    license: 'FAL',
    source: 'https://commons.wikimedia.org/wiki/File:ET_Afar_asv2018-01_img36_Dallol.jpg',
  },
  {
    src: '/images/hero-danakil/salt-cutters.jpg',
    alt: 'An Afar salt cutter shaping blocks of salt by hand on Lake Asale',
    place: 'Salt cutters, Lake Asale',
    credit: 'Charliefleurene',
    license: 'CC BY 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Ethiopia_Asale_MenCarvingSalt_01.jpg',
  },
  {
    src: '/images/hero-danakil/dallol-aerial.jpg',
    alt: 'Aerial view of steaming hydrothermal fields at Dallol',
    place: 'Dallol from above',
    credit: 'Thomas Fuhrmann',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Ethiopia_-_Dallol.jpg',
  },
]

const INTERVAL = 7000

export function HeroSlideshow({ children }: { children?: ReactNode }) {
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
