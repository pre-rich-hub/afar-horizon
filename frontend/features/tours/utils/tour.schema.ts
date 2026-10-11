import type {Locale} from '@/lib/i18n/locales'
import { breadcrumbSchema, businessId, schemaUrl } from '@/lib/seo/schema'
import type { Tour } from '../types/tour.types'

export function tourSchema(tour: Tour, locale: Locale = 'en', labels = {home: 'Home', index: 'Expeditions'}) {
  const path = `/expeditions/${tour.slug}`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbSchema([{ name: labels.home, path: '/' }, { name: labels.index, path: '/expeditions' }, { name: tour.title, path }], locale),
      {
        '@type': 'TouristTrip', '@id': `${schemaUrl(path, locale)}#trip`,
        url: schemaUrl(path, locale), name: tour.title, description: tour.summary, image: tour.image,
        provider: { '@id': businessId },
        ...(tour.idealFor ? { touristType: tour.idealFor } : {}),
        itinerary: {
          '@type': 'ItemList', itemListOrder: 'https://schema.org/ItemListUnordered',
          itemListElement: tour.places.map(name => ({ '@type': 'Place', name })),
        },
        subTrip: tour.itinerary.map(step => ({ '@type': 'Trip', name: `${step.day}: ${step.title}`, description: step.text })),
      },
    ],
  }
}
