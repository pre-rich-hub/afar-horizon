import { useTranslations } from 'next-intl'

import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from '@/components/common/SiteLink'

export function AboutHero() {
  const tr = useTranslations('UI.about.AboutHero')

  return (
    <section className="relative isolate flex min-h-[88svh] items-end overflow-hidden">
        <Image
          src="https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/danakil-depression.png"
          alt={tr('danakilDepressionAfar')}
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="-z-10 animate-slow-zoom object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-charcoal/60 via-charcoal/30 to-charcoal/90" />

        <div className="shell pb-14 pt-36 sm:pb-20 lg:pb-24">
          <nav aria-label={tr('breadcrumb')} className="mb-8 flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-background/60">
            <Link href="/" className="transition-colors hover:text-accent">{tr('home')}</Link>
            <ChevronRight className="h-3 w-3 opacity-50" />
            <span className="text-background/90">{tr('aboutUs')}</span>
          </nav>
          <h1 className="eyebrow mb-5 font-sans text-accent [animation:fade-up_1s_ease_0.1s_both]">
            {tr('aboutAfarHorizonExpeditions')}</h1>
          <blockquote className="max-w-[22ch] text-balance font-serif text-[2.4rem] leading-[1.08] text-background text-shadow-soft [animation:fade-up_1s_ease_0.2s_both] sm:text-6xl lg:text-7xl">
            {tr('ldquoWeWantPeopleToExperienceThe')}</blockquote>
          <p className="mt-7 max-w-[52ch] text-pretty leading-relaxed text-background/80 [animation:fade-up_1s_ease_0.35s_both] sm:text-lg">
            {tr('aLocallyOwnedTeamInAddisAbaba')}</p>
        </div>
      </section>
  )
}
