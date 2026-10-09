import { destinations } from '@/features/destinations'
import { tours } from '@/features/tours'
import type { Result } from '../types/hero-actions.types'

export const index: Result[] = [
  ...destinations.map((d) => ({
    kind: 'Destination' as const,
    href: `/destinations/${d.slug}`,
    title: d.name,
    meta: d.region,
    image: d.image,
    haystack: [d.name, d.region, d.tag].join(' ').toLowerCase(),
  })),
  ...tours.map((t) => ({
    kind: 'Journey' as const,
    href: `/tours/${t.slug}`,
    title: t.title,
    meta: `${t.days} · ${t.style}`,
    image: t.image,
    haystack: [t.title, t.style, ...t.places].join(' ').toLowerCase(),
  })),
]

export const popular = index.filter((r) => r.kind === 'Destination').slice(0, 4)
