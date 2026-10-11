// Run against a production build to check the actual rendered editorial content.
const assert = require('node:assert/strict')
const { createLoader } = require('./load-typescript.cjs')
const load = createLoader()
const { indexableStaticRoutes } = load('@/lib/seo/routes')
const { posts } = load('@/features/blog/data/post.data')
const { destinations } = load('@/features/destinations/data/destination.data')
const { tours } = load('@/features/tours/data/tour.data')
const base = process.argv.find(arg => arg.startsWith('--base-url='))?.slice(11)
assert(base, 'Provide --base-url=http://localhost:<port>')
const routes = [...indexableStaticRoutes, '/plan', '/photo-credits',
  ...posts.map(p => `/blog/${p.slug}`), ...destinations.map(d => `/destinations/${d.slug}`),
  ...tours.map(t => `/expeditions/${t.slug}`)]
async function main() {
  const pages = new Map()
  for (const route of routes) {
    const response = await fetch(base + route)
    assert.equal(response.status, 200, route)
    const html = await response.text()
    const main = html.match(/<main id="main">([\s\S]*?)<\/main>/)?.[1]
    assert(main, `${route}: main content`)
    // Suspense HTML can arrive after the initial main closing tag; Next moves it
    // into the document on hydration. Inspect all rendered chunks, not RSC JSON.
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `${route}: single primary heading`)
    assert(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1].replace(/<[^>]*>/g, '').trim(), `${route}: empty heading`)
    pages.set(route, html)
    assert(html.includes('href="/privacy"') && html.includes('href="/terms"'), `${route}: footer legal links`)
  }
  for (const post of posts) {
    const main = pages.get(`/blog/${post.slug}`)
    assert(main.toLowerCase().includes(`datetime="${post.updatedAt}"`), `${post.slug}: visible update date`)
    assert([...main.matchAll(/<h2\b/g)].length >= 3, `${post.slug}: article sections`)
    assert(main.includes(`href="/expeditions/${post.tourSlug}"`), `${post.slug}: suitable journey`)
    assert(main.includes('href="/plan"'), `${post.slug}: enquiry path`)
    assert(main.includes(`href="/blog/${post.relatedSlugs[0]}"`), `${post.slug}: related guide`)
    for (const paragraph of post.body) {
      for (const link of typeof paragraph === 'string' ? [] : paragraph.links ?? []) {
        assert(main.includes(`href="${link.href}"`), `${post.slug}: missing inline link`)
      }
    }
  }
  for (const d of destinations.filter(d => d.guideSlug)) {
    assert(pages.get(`/destinations/${d.slug}`).includes(`href="/blog/${d.guideSlug}"`), `${d.slug}: planning guide`)
  }
  for (const tour of tours) {
    const main = pages.get(`/expeditions/${tour.slug}`)
    assert(main.includes('href="/destinations/'), `${tour.slug}: place links`)
    assert(main.includes('href="#enquire"'), `${tour.slug}: enquiry`)
  }
  console.log(`Verified ${routes.length} public pages: primary headings, nine structured guides, package/destination links, enquiry paths and legal footer targets.`)
}
main().catch(error => { console.error(error); process.exitCode = 1 })
