'use client'

import { Analytics } from '@vercel/analytics/next'
import { track } from '@vercel/analytics'
import { useEffect } from 'react'
import { configureConversionTracking, trackContactIntent, trackPackageEnquiryIntent } from '@/lib/analytics/events'
import { redactAnalyticsEvent } from '@/lib/analytics/policy'

export function SiteAnalytics({ paths, origin, events }: { paths: string[]; origin: string; events: boolean }) {
  useEffect(() => {
    configureConversionTracking(events ? track : null, paths)
    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || !(event.target instanceof Element)) return
      const link = event.target.closest('a[href]')
      if (!link) return
      const href = link.getAttribute('href')!
      trackContactIntent(href)
      trackPackageEnquiryIntent(href)
    }
    if (events) document.addEventListener('click', click)
    return () => {
      document.removeEventListener('click', click)
      configureConversionTracking(null, [])
    }
  }, [events, paths])

  return <Analytics beforeSend={event => redactAnalyticsEvent(event, paths, origin)} />
}
