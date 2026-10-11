// Run against a built server: node tests/verify-crawl.cjs --base-url=http://localhost:3101 [--preview]
const assert = require('node:assert/strict')
const { createLoader } = require('./load-typescript.cjs')
const load = createLoader()
const { destinations } = load('@/features/destinations/data/destination.data')
const { tours } = load('@/features/tours/data/tour.data')
const { posts } = load('@/features/blog/data/post.data')
const { indexableStaticRoutes } = load('@/lib/seo/routes')
const base = process.argv.find(arg => arg.startsWith('--base-url='))?.slice(11)
assert(base, 'Provide --base-url=http://localhost:<port>')
const preview = process.argv.includes('--preview')
const origin = 'https://www.afarhorizon.com'
const routes = [
  ...indexableStaticRoutes,
  ...destinations.map(d => `/destinations/${d.slug}`),
  ...tours.map(t => `/expeditions/${t.slug}`),
  ...posts.map(p => `/blog/${p.slug}`),
]
const decode = s => s.replaceAll('&amp;', '&').replaceAll('&quot;', '"')
const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(m => [m[1], decode(m[2])]))
async function get(path, userAgent) {
  return fetch(base + path, { redirect: 'manual', headers: userAgent ? { 'User-Agent': userAgent } : {} })
}
async function main() {
  const sitemap = await get('/sitemap.xml')
  assert.equal(sitemap.status, 200)
  assert(sitemap.headers.get('content-type').includes('xml'))
  const xml = await sitemap.text()
  assert(xml.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'))
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => decode(m[1]))
  assert.deepEqual(urls.sort(), preview ? [] : routes.map(path => new URL(path, origin).href).sort())
  assert(!xml.includes('<lastmod>'), 'Do not manufacture last-modified timestamps')
  const robots = await get('/robots.txt')
  assert.equal(robots.status, 200)
  assert(robots.headers.get('content-type').includes('text/plain'))
  const text = await robots.text()
  assert(text.includes('Allow: /') && text.includes('Disallow: /api/'))
  assert(!/Disallow: \/(?:admin|login|plan)/.test(text))
  assert.equal(text.includes(`Sitemap: ${origin}/sitemap.xml`), !preview)

  const graph = new Map()
  for (const path of [...routes, '/plan', '/login']) {
    const response = await get(path)
    assert.equal(response.status, 200, `${path}: public status`)
    const html = await response.text()
    const metas = [...html.matchAll(/<meta\b[^>]*>/g)].map(m => attributes(m[0]))
    const noindex = preview || ['/plan', '/login'].includes(path)
    assert.equal(metas.find(m => m.name === 'robots')?.content.includes('noindex'), noindex, `${path}: robots`)
    assert.equal(response.headers.get('x-robots-tag')?.includes('noindex') ?? false, noindex, `${path}: indexing header`)
    if (routes.includes(path)) {
      const canonical = [...html.matchAll(/<link\b[^>]*>/g)].map(m => attributes(m[0])).find(m => m.rel === 'canonical')?.href
      assert.equal(new URL(canonical).href, new URL(path, origin).href, `${path}: canonical`)
    }
    const links = new Set()
    for (const match of html.matchAll(/<a\b[^>]*>/g)) {
      const attrs = attributes(match[0])
      if (!attrs.href || attrs.rel?.split(' ').includes('nofollow')) continue
      const url = new URL(attrs.href, origin + path)
      if (url.origin === origin) links.add(url.pathname)
    }
    graph.set(path, links)
  }
  const reached = new Set(['/'])
  const queue = ['/']
  while (queue.length) {
    for (const target of graph.get(queue.shift()) ?? []) {
      if (!reached.has(target)) { reached.add(target); queue.push(target) }
    }
  }
  assert.deepEqual(routes.filter(path => !reached.has(path)), [], 'Orphaned sitemap pages')

  const redirects = [
    ['/layover', '/expeditions'], ['/tours', '/expeditions'],
    ['/tours/danakil-expedition', '/expeditions/danakil-deep'],
    ['/tours/old-package', '/expeditions'],
    ['/blog/responsible-travel-in-the-omo', '/blog/responsible-travel-in-afar'],
    ['/destinations/', '/destinations'], ['/expeditions/', '/expeditions'],
  ]
  for (const [from, to] of redirects) {
    const response = await get(from)
    assert.equal(response.status, 308, `${from}: permanent redirect`)
    assert.equal(new URL(response.headers.get('location'), base).pathname, to)
    assert.equal((await get(to)).status, 200, `${from}: redirect chain`)
  }
  const missing = ['/not-a-real-page', '/destinations/not-a-real-place', '/expeditions/not-a-real-package', '/blog/not-a-real-article', '/blog/the-coffee-ceremony']
  for (const path of missing) {
    for (const agent of [undefined, 'Googlebot']) {
      const response = await get(path, agent)
      assert.equal(response.status, 404, `${path}: missing page (${agent ?? 'browser'})`)
      assert((await response.text()).includes('noindex'), `${path}: noindex`)
    }
  }
  for (const path of ['/admin', '/admin/tours', '/admin/blog']) {
    const response = await get(path)
    assert([307, 308].includes(response.status), `${path}: unauthenticated redirect`)
    assert.equal(new URL(response.headers.get('location'), base).pathname, '/login')
    assert.equal(response.headers.get('x-robots-tag'), 'noindex, nofollow')
  }
  for (const path of ['/?utm_source=test', '/destinations/erta-ale?region=afar', '/blog/when-to-visit-ethiopia?utm_campaign=test']) {
    const response = await get(path)
    assert.equal(response.status, 200)
    const canonical = [...(await response.text()).matchAll(/<link\b[^>]*>/g)].map(m => attributes(m[0])).find(m => m.rel === 'canonical')?.href
    assert.equal(new URL(canonical).href, new URL(path.split('?')[0], origin).href)
  }
  console.log(`Verified ${preview ? 'preview' : 'production'} crawl policy: ${urls.length} sitemap URLs, ${routes.length} linked public pages, redirects, 404s, query canonicals and admin protection.`)
}
main().catch(error => { console.error(error); process.exitCode = 1 })
