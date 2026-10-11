import { breadcrumbSchema, businessId, schemaUrl } from '@/lib/seo/schema'
import type { Tour } from '../types/tour.types'

export function tourSchema(tour: Tour) {
  const path = `/expeditions/${tour.slug}`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Expeditions', path: '/expeditions' }, { name: tour.title, path }]),
      {
        '@type': 'TouristTrip', '@id': `${schemaUrl(path)}#trip`,
        url: schemaUrl(path), name: tour.title, description: tour.summary, image: tour.image,
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
