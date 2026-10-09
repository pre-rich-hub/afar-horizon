import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function AboutHero() {
  return (
    <section className="relative isolate flex min-h-[88svh] items-end overflow-hidden">
        <Image
          src="/images/danakil.png"
          alt="Salt and sulphur terraces of the Danakil Depression at dusk"
          fill
          priority
          sizes="100vw"
          className="-z-10 animate-slow-zoom object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-charcoal/60 via-charcoal/30 to-charcoal/90" />

        <div className="shell pb-14 pt-36 sm:pb-20 lg:pb-24">
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-background/60">
            <Link href="/" className="transition-colors hover:text-accent">Home</Link>
            <ChevronRight className="h-3 w-3 opacity-50" />
            <span className="text-background/90">About Us</span>
          </nav>
          <p className="eyebrow mb-5 text-accent [animation:fade-up_1s_ease_0.1s_both]">
            The story starts here
          </p>
          <blockquote className="max-w-[22ch] text-balance font-serif text-[2.4rem] leading-[1.08] text-background text-shadow-soft [animation:fade-up_1s_ease_0.2s_both] sm:text-6xl lg:text-7xl">
            &ldquo;We want people to experience the Ethiopia we know — not just visit it.&rdquo;
          </blockquote>
          <p className="mt-7 max-w-[52ch] text-pretty leading-relaxed text-background/80 [animation:fade-up_1s_ease_0.35s_both] sm:text-lg">
            A locally owned team in Addis Ababa, designing private journeys from
            the salt and fire of the Afar to the country&apos;s ancient highlands.
          </p>
        </div>
      </section>
  )
}
