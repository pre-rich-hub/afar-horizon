// Run after a production/preview build. Inspect rendered tags, not source objects.
const fs = require('node:fs')
const path = require('node:path')
const assert = require('node:assert/strict')
const { createLoader } = require('./load-typescript.cjs')
const root = path.resolve(__dirname, '..')
const load = createLoader()
const { destinations } = load('@/features/destinations/data/destination.data')
const { tours } = load('@/features/tours/data/tour.data')
const { posts } = load('@/features/blog/data/post.data')
const preview = process.argv.includes('--preview')
const baseUrl = process.argv.find(arg => arg.startsWith('--base-url='))?.slice(11)
const origin = 'https://afarhorizon.com'

function staticRoutes(dir, parts = []) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    if (entry.isDirectory()) {
      if (entry.name === 'admin' || entry.name.startsWith('[')) return []
      return staticRoutes(path.join(dir, entry.name), [...parts, entry.name])
    }
    if (entry.name !== 'page.tsx') return []
    const route = '/' + parts.filter(part => !part.startsWith('(')).join('/')
    return route === '/login' ? [] : [{ route }]
  })
}

const pages = [
  ...staticRoutes(path.join(root, 'app')),
  ...destinations.map(d => ({ route: `/destinations/${d.slug}`, image: d.image })),
  ...tours.map(t => ({ route: `/expeditions/${t.slug}`, image: t.image })),
  ...posts.map(p => ({ route: `/blog/${p.slug}`, image: p.image, article: true })),
]

function decode(value) {
  return value?.replace(/&(?:amp|quot|lt|gt|#x27|#39);/g, entity => ({
    '&amp;': '&', '&quot;': '"', '&lt;': '<', '&gt;': '>', '&#x27;': "'", '&#39;': "'",
  })[entity])
}
function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(m => [m[1], decode(m[2])]))
}
function verify(html, page) {
  const tags = [...html.matchAll(/<meta\b[^>]*>/g)].map(m => attributes(m[0]))
  const meta = name => tags.find(t => t.name === name || t.property === name)?.content
  const title = decode(html.match(/<title>(.*?)<\/title>/)?.[1])
  const canonical = [...html.matchAll(/<link\b[^>]*>/g)].map(m => attributes(m[0])).find(t => t.rel === 'canonical')?.href
  assert(title, `${page.route}: missing title`)
  assert(title.endsWith(' | Afar Horizon Expeditions'), `${page.route}: missing brand suffix`)
  assert.equal((title.match(/\| Afar Horizon Expeditions/g) ?? []).length, 1, `${page.route}: duplicate brand suffix`)
  assert(meta('description'), `${page.route}: missing description`)
  assert.equal(new URL(canonical).href, new URL(origin + page.route).href, `${page.route}: canonical`)
  assert.equal(new URL(meta('og:url')).href, new URL(canonical).href, `${page.route}: sharing URL`)
  assert.equal(meta('og:title'), title, `${page.route}: sharing title`)
  assert.equal(meta('twitter:title'), title, `${page.route}: Twitter title`)
  assert.equal(meta('og:description'), meta('description'))
  assert.equal(meta('twitter:description'), meta('description'))
  assert.equal(meta('twitter:card'), 'summary_large_image')
  assert(meta('og:image').startsWith('https://res.cloudinary.com/xsrr0wfh/'))
  assert.equal(meta('twitter:image'), meta('og:image'))
  if (page.image) assert.equal(meta('og:image'), page.image, `${page.route}: wrong feature image`)
  if (page.article) assert.equal(meta('og:type'), 'article')
  const noindex = preview || ['/plan', '/photo-credits'].includes(page.route)
  assert.equal(meta('robots')?.includes('noindex'), noindex, `${page.route}: indexing`)
  assert(!canonical.includes('localhost') && !meta('og:url').includes('localhost'))
  return { title, description: meta('description') }
}

async function main() {
  const checked = []
  for (const page of pages) {
    const file = path.join(root, '.next/server/app', page.route === '/' ? 'index.html' : `${page.route.slice(1)}.html`)
    let html
    if (fs.existsSync(file)) html = fs.readFileSync(file, 'utf8')
    else {
      assert(baseUrl, `${page.route}: dynamic page needs --base-url=http://localhost:<port>`)
      const response = await fetch(baseUrl + page.route)
      assert.equal(response.status, 200, `${page.route}: response status`)
      html = await response.text()
    }
    checked.push(verify(html, page))
  }
  assert.equal(new Set(checked.map(p => p.title)).size, checked.length, 'Duplicate page titles')
  assert.equal(new Set(checked.map(p => p.description)).size, checked.length, 'Duplicate page descriptions')
  if (baseUrl) {
    const login = await (await fetch(baseUrl + '/login')).text()
    assert(/<meta name="robots" content="noindex, nofollow"/.test(login), 'Login must remain noindex, nofollow')
  }
  console.log(`Verified ${pages.length} rendered public pages in ${preview ? 'preview' : 'production'} mode: canonical, social, image and indexing metadata.`)
}
main().catch(error => { console.error(error); process.exitCode = 1 })
