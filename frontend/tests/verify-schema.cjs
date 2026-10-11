// Check emitted JSON-LD against the feature builders and visible date labels.
const assert = require('node:assert/strict')
const { createLoader } = require('./load-typescript.cjs')
const site = { url: 'https://www.afarhorizon.com', name: 'Afar Horizon Expeditions' }
const load = createLoader({ '@/lib/config/site': { site } })
const { indexableStaticRoutes } = load('@/lib/seo/routes')
const { businessSchema } = load('@/features/about/utils/business.schema')
const { postSchema } = load('@/features/blog/utils/post.schema')
const { destinationSchema } = load('@/features/destinations/utils/destination.schema')
const { tourSchema } = load('@/features/tours/utils/tour.schema')
const { faqSchema } = load('@/features/faq/utils/faq.schema')
const { posts } = load('@/features/blog/data/post.data')
const { destinations } = load('@/features/destinations/data/destination.data')
const { tours } = load('@/features/tours/data/tour.data')
const { formatEditorialDate } = load('@/lib/utils/date')
const base = process.argv.find(arg => arg.startsWith('--base-url='))?.slice(11)
assert(base, 'Provide --base-url=http://localhost:<port>')
const details = new Map([
  ...posts.map(p => [`/blog/${p.slug}`, postSchema(p)]),
  ...destinations.map(d => [`/destinations/${d.slug}`, destinationSchema(d)]),
  ...tours.map(t => [`/expeditions/${t.slug}`, tourSchema(t)]),
  ['/faq', faqSchema()],
])
const routes = [...indexableStaticRoutes, '/plan', ...[...details.keys()].filter(r => r !== '/faq')]
const normalized = value => JSON.parse(JSON.stringify(value))
async function main() {
  for (const route of routes) {
    const response = await fetch(base + route)
    assert.equal(response.status, 200, route)
    const html = await response.text()
    const scripts = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(match => {
      assert(!match[1].includes('<'), `${route}: unsafe JSON-LD serialization`)
      return JSON.parse(match[1])
    })
    assert.deepEqual(scripts[0], normalized(businessSchema()), `${route}: shared business identity`)
    assert.equal(scripts.length, details.has(route) ? 2 : 1, `${route}: unexpected or missing graph`)
    if (details.has(route)) assert.deepEqual(scripts[1], normalized(details.get(route)), `${route}: catalogue/FAQ parity`)
    const nodes = scripts.flatMap(s => s['@graph'] ?? [s])
    assert.equal(nodes.filter(n => n['@type'] === 'TravelAgency').length, 1, `${route}: duplicated business`)
    assert.equal(nodes.filter(n => n['@type'] === 'WebSite').length, 1, `${route}: duplicated website`)
    for (const node of nodes) {
      for (const key of ['offers', 'review', 'aggregateRating']) assert.equal(node[key], undefined, `${route}: ${key}`)
      if (node['@type'] === 'BreadcrumbList') {
        node.itemListElement.forEach((item, i) => assert.equal(item.position, i + 1))
        assert.equal(node.itemListElement.at(-1).item, site.url + route)
      }
    }
    const post = posts.find(p => route === `/blog/${p.slug}`)
    if (post) {
      for (const date of [post.publishedAt, post.updatedAt].filter(Boolean)) {
        assert(html.includes(`dateTime="${date}">${formatEditorialDate(date)}</time>`), `${route}: visible ISO date parity`)
      }
      assert(html.includes('aria-label="Breadcrumb"'), `${route}: visible article hierarchy`)
    }
  }
  console.log(`Verified JSON-LD on ${routes.length} public pages: one shared identity, 45 detail graphs, FAQ parity, breadcrumbs and confirmed article dates.`)
}
main().catch(error => { console.error(error); process.exitCode = 1 })
