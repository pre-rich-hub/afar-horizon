'use client'

import { useReviews } from '../hooks/useReviews'

import { avatarTones, reviewPhotos } from '../data/reviews.data'

import { TripadvisorOwl } from '@/components/common/BrandMarks'
import { Reveal } from '@/components/common/Reveal'
import { cn } from '@/lib/utils'
import { ArrowUpRight, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { reviewSummary, testimonials } from '../data/review.data'

// A photo from the journey each guest took, shown beside their review.

export function Reviews() {
  const { track, edges, count, step } = useReviews()

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="bg-background py-20 sm:py-24 lg:py-28">
      <div className="shell grid gap-10 lg:grid-cols-[260px_1fr] lg:items-center lg:gap-12">
        {/* Summary */}
        <Reveal>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Guest reviews
          </p>
          <h2
            id="reviews-title"
            className="mt-3 font-sans text-[2rem] font-extrabold uppercase leading-none tracking-[0.02em] text-foreground"
          >
            Excellent
          </h2>
          <Stars className="mt-4 gap-1" size="h-9 w-9" />
          <p className="mt-4 text-[15px] text-foreground/80">
            Based on{' '}
            <span className="font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4">
              {count} {count === 1 ? 'review' : 'reviews'}
            </span>
          </p>

          <div className="mt-6 flex h-[72px] w-[72px] items-center justify-center rounded-lg bg-tripadvisor shadow-[0_12px_28px_-14px_oklch(0.185_0.012_58/0.6)]">
            <TripadvisorOwl className="h-11 w-11" />
          </div>

          {reviewSummary.url && (
            <a
              href={reviewSummary.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-accent"
            >
              View all {reviewSummary.platform} reviews
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          )}
        </Reveal>

        {/* Cards */}
        <Reveal delay={120} className="relative min-w-0">
          <div
            ref={track}
            role="region"
            aria-label="Guest reviews"
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((t, i) => (
              <ReviewCard
                key={t.name}
                name={t.name}
                detail={t.detail}
                quote={t.quote}
                photo={reviewPhotos[i % reviewPhotos.length]}
                tone={avatarTones[i % avatarTones.length]}
              />
            ))}
          </div>

          <Arrow side="left" hidden={edges.start} onClick={() => step(-1)} />
          <Arrow side="right" hidden={edges.end} onClick={() => step(1)} />
        </Reveal>
      </div>
    </section>
  )
}

function ReviewCard({
  name,
  detail,
  quote,
  photo,
  tone,
}: {
  name: string
  detail: string
  quote: string
  photo: string
  tone: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <article className="flex w-[300px] shrink-0 snap-start flex-col sm:w-[330px] xl:w-[calc((100%-3rem)/3)]">
      <header className="flex items-start gap-3">
        <span
          aria-hidden
          className={cn(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-serif text-xl text-background',
            tone,
          )}
        >
          {name.charAt(0)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[15px] font-semibold text-foreground">{name}</span>
          <span className="block truncate text-[13px] text-muted-foreground">{detail}</span>
        </span>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-tripadvisor">
          <TripadvisorOwl className="h-5 w-5" />
        </span>
      </header>

      <Stars className="mt-3 gap-0.5" size="h-[18px] w-[18px]" />

      <div className="mt-3 flex gap-4">
        <p
          className={cn(
            'min-w-0 flex-1 self-start text-pretty text-[15px] leading-relaxed text-foreground/85',
            !open && '[display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden',
          )}
        >
          {quote}
        </p>
        <span className="relative hidden h-[84px] w-[84px] shrink-0 overflow-hidden rounded-md bg-muted sm:block">
          <Image src={photo} alt="" fill sizes="84px" className="object-cover" />
        </span>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="mt-auto self-start pt-4 text-[13px] font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
      >
        {open ? 'Show less' : 'Read full review'}
      </button>
    </article>
  )
}

function Stars({ className, size }: { className?: string; size: string }) {
  return (
    <span className={cn('flex items-center', className)} aria-label="5 out of 5 stars" role="img">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} aria-hidden className={cn(size, 'fill-accent text-accent')} strokeWidth={1} />
      ))}
    </span>
  )
}

function Arrow({
  side,
  hidden,
  onClick,
}: {
  side: 'left' | 'right'
  hidden: boolean
  onClick: () => void
}) {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === 'left' ? 'Previous reviews' : 'Next reviews'}
      className={cn(
        'absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-[0_8px_24px_-10px_oklch(0.185_0.012_58/0.45)] transition-all duration-300 hover:border-accent hover:bg-accent hover:text-accent-foreground',
        side === 'left' ? '-left-5' : '-right-5',
        hidden && 'invisible',
      )}
    >
      <Icon className="h-5 w-5" strokeWidth={1.6} />
    </button>
  )
}
