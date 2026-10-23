'use client'

import { TranslationBoundary } from '@/components/common/TranslationBoundary'
import Link from '@/components/common/SiteLink'
import { splitLocalePath } from '@/lib/i18n/locales'
import { safety } from '@/lib/constants/company'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { usePathname } from 'next/navigation'

// Pages where the reminder would be redundant or out of place.
const hiddenOn = ['/safety', '/privacy', '/terms', '/login']

// Site-wide safety reminder, shown above the footer on every public page.
export function SafetyStrip() {
  const path = splitLocalePath(usePathname()).path
  if (hiddenOn.includes(path) || path.startsWith('/admin')) return null

  return (
    <TranslationBoundary><aside aria-label="Our safety commitment" className="border-t border-border bg-muted/40">
      <div className="shell flex flex-col gap-6 py-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="flex items-start gap-5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <ShieldCheck className="h-6 w-6" strokeWidth={1.6} />
          </span>
          <div>
            <p className="font-serif text-2xl text-foreground sm:text-3xl">{safety.headline}</p>
            <p className="mt-2 max-w-[70ch] text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
              {safety.summary}
            </p>
            {safety.record && (
              <p className="mt-2 max-w-[70ch] text-pretty text-sm font-medium leading-relaxed text-foreground sm:text-base">
                {safety.record}
              </p>
            )}
          </div>
        </div>
        <Link
          href="/safety"
          className="inline-flex shrink-0 items-center gap-2 self-start text-xs font-semibold uppercase tracking-[0.14em] text-primary transition-colors hover:text-accent lg:self-center"
        >
          How we keep you safe <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </aside></TranslationBoundary>
  )
}
