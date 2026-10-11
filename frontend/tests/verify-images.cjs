const assert = require('node:assert/strict')
const { createLoader } = require('./load-typescript.cjs')
const load = createLoader()
const { indexableStaticRoutes } = load('@/lib/seo/routes')
const { posts } = load('@/features/blog/data/post.data')
const { destinations } = load('@/features/destinations/data/destination.data')
const { tours } = load('@/features/tours/data/tour.data')
const base = process.argv.find(arg => arg.startsWith('--base-url='))?.slice(11)
assert(base, 'Provide --base-url=http://localhost:<port>')
const routes = [...indexableStaticRoutes, '/plan', ...posts.map(p => `/blog/${p.slug}`), ...destinations.map(d => `/destinations/${d.slug}`), ...tours.map(t => `/expeditions/${t.slug}`)]
async function main() {
  let count = 0
  for (const route of routes) {
    const response = await fetch(base + route)
    assert.equal(response.status, 200, route)
    const html = await response.text()
    const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map(m => m[0])
    const photos = imgs.filter(tag => tag.includes('res.cloudinary.com'))
    assert(photos.length, `${route}: missing photos`)
    for (const tag of photos) {
      assert(tag.includes('srcSet='), `${route}: missing responsive candidates`)
      assert(tag.includes('sizes='), `${route}: missing sizes`)
      assert(tag.includes('/upload/f_auto,q_auto,c_limit,w_'), `${route}: raw upload`)
      assert(!tag.includes('/_next/image'), `${route}: double optimization`)
      assert(tag.includes('position:absolute') || /width="\d+"/.test(tag), `${route}: unreserved image geometry`)
      count++
    }
    assert(photos.filter(tag => !tag.includes('loading="lazy"')).length <= 1, `${route}: multiple eager photos in initial HTML`)
    for (const tag of photos.filter(tag => !tag.includes('loading="lazy"'))) {
      assert(tag.includes('fetchPriority="high"'), `${route}: initial hero lacks fetch priority`)
    }
    assert(html.includes('rel="preconnect" href="https://res.cloudinary.com"'), `${route}: CDN connection hint`)
    assert(imgs.some(tag => /src="\/images\/logo(?:-light)?\.png"/.test(tag)), `${route}: local logo`)
    if (route === '/') {
      assert.equal(photos.filter(tag => tag.includes('data-hero-frame')).length, 1, 'Homepage initially emits only the first hero frame')
    }
  }
  console.log(`Verified ${count} responsive photos across ${routes.length} public pages; local logos, lazy loading and reserved image geometry preserved.`)
}
main().catch(error => { console.error(error); process.exitCode = 1 })
