const assert = require('node:assert/strict')
const { test } = require('node:test')
const { createLoader } = require('./load-typescript.cjs')
const load = createLoader()
const { destinations } = load('@/features/destinations/data/destination.data')
const { tours } = load('@/features/tours/data/tour.data')
const { posts } = load('@/features/blog/data/post.data')
const { indexableStaticRoutes } = load('@/lib/seo/routes')
const site = { url: 'https://www.afarhorizon.com', indexable: true }

function routeLoader(indexable, extra = {}) {
  return createLoader({
    '@/lib/config/site': { site: { ...site, indexable } },
    '@/features/destinations': { destinations: [...destinations, ...(extra.destinations ?? [])] },
    '@/features/tours': { tours: [...tours, ...(extra.tours ?? [])] },
    '@/features/blog': { posts: [...posts, ...(extra.posts ?? [])] },
  })
}

test('sitemap follows published catalogues and excludes utility/private URLs', () => {
  const entries = routeLoader(true)('@/app/sitemap').default()
  assert.equal(entries.length, indexableStaticRoutes.length + destinations.length + tours.length + posts.length)
  assert.equal(new Set(entries.map(e => e.url)).size, entries.length)
  for (const entry of entries) {
    const url = new URL(entry.url)
    assert.equal(url.origin, site.url)
    assert.equal(url.search, '')
    assert.equal(url.hash, '')
    assert(!/^\/(admin|login|plan|api|tours)(\/|$)/.test(url.pathname))
    assert.equal(entry.lastModified, undefined, 'Do not invent modification dates')
  }
  const future = routeLoader(true, {
    destinations: [{ slug: 'new-destination' }],
    tours: [{ slug: 'new-expedition' }], posts: [{ slug: 'new-article' }],
  })('@/app/sitemap').default().map(e => e.url)
  for (const path of ['/destinations/new-destination', '/expeditions/new-expedition', '/blog/new-article']) {
    assert(future.includes(site.url + path), `Future catalogue addition missing: ${path}`)
  }
})

test('previews advertise no sitemap while noindex pages remain crawlable', () => {
  for (const indexable of [true, false]) {
    const loader = routeLoader(indexable)
    const robots = loader('@/app/robots').default()
    assert.equal(robots.rules.allow, '/')
    assert.deepEqual(robots.rules.disallow, ['/api/', '/api'])
    assert.equal(robots.sitemap, indexable ? site.url + '/sitemap.xml' : undefined)
    if (!indexable) assert.deepEqual(loader('@/app/sitemap').default(), [])
  }
})

test('response headers protect previews, utilities and unauthenticated admin redirects', () => {
  for (const indexable of [true, false]) {
    const { proxy } = createLoader({ '@/lib/config/site': { site: { ...site, indexable } } })('@/proxy')
    for (const path of ['/', '/destinations/erta-ale', '/plan', '/admin', '/admin/tours', '/login', '/missing']) {
      const header = proxy({ nextUrl: { pathname: path } }).headers.get('X-Robots-Tag')
      const expected = !indexable || path.startsWith('/admin') || path === '/login'
        ? 'noindex, nofollow' : path === '/plan' ? 'noindex, follow' : null
      assert.equal(header, expected, path)
    }
  }
})
