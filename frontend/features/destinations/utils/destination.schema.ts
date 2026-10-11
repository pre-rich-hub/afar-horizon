import type {Locale} from '@/lib/i18n/locales'
import { breadcrumbSchema, schemaUrl } from '@/lib/seo/schema'
import type { Destination } from '../types/destination.types'

export function destinationSchema(destination: Destination, locale: Locale = 'en', labels = {home: 'Home', index: 'Destinations'}) {
  const path = `/destinations/${destination.slug}`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbSchema([{ name: labels.home, path: '/' }, { name: labels.index, path: '/destinations' }, { name: destination.name, path }], locale),
      {
        '@type': 'TouristDestination', '@id': `${schemaUrl(path, locale)}#destination`,
        url: schemaUrl(path, locale), name: destination.name, description: destination.intro, image: destination.image,
      },
    ],
  }
}
