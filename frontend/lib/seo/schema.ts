import { site } from '@/lib/config/site'

export const businessId = `${site.url}/#organization`
export const websiteId = `${site.url}/#website`
export const schemaUrl = (path: string) => new URL(path, `${site.url}/`).href

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList', '@id': `${schemaUrl(items[items.length - 1].path)}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem', position: i + 1, name: item.name, item: schemaUrl(item.path),
    })),
  }
}
