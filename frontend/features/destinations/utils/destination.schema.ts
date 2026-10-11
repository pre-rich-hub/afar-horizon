import { breadcrumbSchema, schemaUrl } from '@/lib/seo/schema'
import type { Destination } from '../types/destination.types'

export function destinationSchema(destination: Destination) {
  const path = `/destinations/${destination.slug}`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Destinations', path: '/destinations' }, { name: destination.name, path }]),
      {
        '@type': 'TouristDestination', '@id': `${schemaUrl(path)}#destination`,
        url: schemaUrl(path), name: destination.name, description: destination.intro, image: destination.image,
      },
    ],
  }
}
