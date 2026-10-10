import { getTourBySlug, getTours } from '../api/tour.api'
import { tours as staticTours } from '../data/tour.data'
import type { ApiTour } from '../types/tour-api.types'
import type { Tour } from '../types/tour.types'
import { getTour as getStaticTour } from './tour.utils'

// Live prices overlay the static catalogue; featured selection stays curated.

function formatPrice(price: number | null): string | null {
  if (price === null || price === undefined) return null
  return `$${price.toLocaleString('en-US')} per person`
}

function overlayLive(staticTour: Tour, live: ApiTour): Tour {
  const price = formatPrice(live.adultPrice)
  return {
    ...staticTour,
    // Price overlay only — everything else stays on the static
    // record so rendering is byte-identical with the frozen UI.
    ...(price ? { from: price } : {}),
  }
}

export async function getToursData(): Promise<Tour[]> {
  let liveTours: ApiTour[] = []
  try {
    const page = await getTours({ limit: 100 })
    liveTours = page.items ?? []
  } catch {
    liveTours = []
  }

  const bySlug = new Map(liveTours.map((t) => [t.canonical?.slug, t]))

  return staticTours.map((t) => {
    const live = bySlug.get(t.slug)
    return live ? overlayLive(t, live) : t
  })
}

export async function getTourData(slug: string): Promise<Tour | undefined> {
  const staticTour = getStaticTour(slug)
  if (!staticTour) return undefined

  try {
    const live = await getTourBySlug(slug)
    if (live && live.canonical?.slug === slug) {
      return overlayLive(staticTour, live)
    }
  } catch {
    // Fall through to the static record.
  }

  return staticTour
}
