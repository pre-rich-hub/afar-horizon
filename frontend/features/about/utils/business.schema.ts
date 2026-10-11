import { site } from '@/lib/config/site'
import { contact } from '@/lib/constants/company'
import { businessId, schemaUrl, websiteId } from '@/lib/seo/schema'

export function businessSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TravelAgency', '@id': businessId,
        name: site.name, alternateName: 'Afar Horizon', url: `${site.url}/`,
        logo: schemaUrl('/images/logo.png'),
        telephone: contact.phone, email: contact.email, address: contact.address,
      },
      {
        '@type': 'WebSite', '@id': websiteId,
        name: site.name, url: `${site.url}/`, inLanguage: 'en',
        publisher: { '@id': businessId },
      },
    ],
  }
}
