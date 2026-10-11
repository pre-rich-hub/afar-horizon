const fs = require('node:fs')
const assert = require('node:assert/strict')
const {createLoader} = require('./load-typescript.cjs')
const load = createLoader({'@/lib/config/site': {site: {url: 'https://www.afarhorizon.com'}}})
const {localePath} = load('@/lib/i18n/locales')
const {indexableStaticRoutes} = load('@/lib/seo/routes')
const {destinations} = load('@/features/destinations/data/destination.data')
const {tours} = load('@/features/tours/data/tour.data')
const {posts} = load('@/features/blog/data/post.data')
const routes = [...indexableStaticRoutes, '/plan', ...destinations.map(d => '/destinations/' + d.slug), ...tours.map(t => '/expeditions/' + t.slug), ...posts.map(p => '/blog/' + p.slug)]
const locales = ['fr', 'es', 'de', 'zh-Hans']
const base = process.env.SEO_BASE_URL || 'http://127.0.0.1:3101'
const canonicalOrigin = process.env.SITE_URL || 'https://www.afarhorizon.com'
const normalize = text => text.replace(/\s+/g, ' ').trim()
const decode = text => text.replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
function texts(html) {
  return [...html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/g, '').replace(/<section\b[^>]*data-no-translate[^>]*>[\s\S]*?<\/section>/g, '').matchAll(/>([^<>]+)</g)].map(m => normalize(decode(m[1])))
}
async function get(path) {
  const response = await fetch(base + path, {redirect: 'manual'})
  return {status: response.status, robots: response.headers.get('x-robots-tag'), location: response.headers.get('location'), html: await response.text()}
}
async function main() {
  const english = new Map(), reports = []
  for (const route of routes) {
    const page = await get(route)
    assert.equal(page.status, 200, route)
    english.set(route, page)
  }
  for (const locale of locales) {
    for (const route of routes) {
      const path = localePath(route, locale), page = await get(path)
      assert.equal(page.status, 200, path)
      assert.match(page.html, new RegExp(`<html[^>]*lang="${locale}"`))
      const canonical = page.html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]
      assert.equal(canonical, canonicalOrigin + path, path + ' canonical')
      assert.match(page.html, /<meta name="robots" content="[^"]*noindex/)
      assert.match(page.robots || '', /noindex/)
      assert.doesNotMatch(page.html, /hrefLang=/i)
      assert.equal((page.html.match(/<h1\b/g) || []).length, 1, path + ' h1')
      for (const script of page.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
        assert(!script[1].includes('<'), path + ' safe schema')
        function visit(item) {
          if (!item || typeof item !== 'object') return
          if (Array.isArray(item)) return item.forEach(visit)
          if (['Article', 'BlogPosting', 'WebPage'].includes(item['@type'])) assert.equal(item.inLanguage, locale, path)
          if (typeof item['@id'] === 'string' && item['@id'].startsWith(canonicalOrigin + '/') && ![canonicalOrigin + '/#organization', canonicalOrigin + '/#website'].includes(item['@id'])) assert(item['@id'].startsWith(canonicalOrigin + '/' + locale + '/'), path + ' localized schema ID')
          Object.values(item).forEach(visit)
        }
        visit(JSON.parse(script[1]))
      }
      const main = page.html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1]
      assert(main, path + ' main')
      const visible = new Set(texts(main))
      const original = texts(english.get(route).html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] || '')
      const untranslated = original.filter(text => text.length > 80 && !/[$€£]\s*\d/.test(text) && visible.has(text))
      assert.deepEqual(untranslated, [], path + ' untranslated long copy')
      for (const match of main.matchAll(/href="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) if (routes.includes(match[1])) assert.fail(path + ' English public link: ' + match[1])
      if (route.startsWith('/blog/')) {
        const post = posts.find(p => route === '/blog/' + p.slug)
        for (const para of post.body) for (const link of typeof para === 'string' ? [] : para.links ?? []) assert(page.html.includes(`href="${localePath(link.href, locale)}"`), path + ' inline link')
      }
    }
    reports.push({locale, pages: routes.length, noindex: true, selfCanonical: true, draftHreflangExcluded: true, untranslatedLongParagraphs: 0, inlineLinksPreserved: true})
    console.log('Passed ' + routes.length + ' ' + locale + ' draft pages')
  }
  const sitemap = (await get('/sitemap.xml')).html
  assert.equal((sitemap.match(/<loc>/g) || []).length, 58)
  assert.doesNotMatch(sitemap, /afarhorizon.com\/(fr|es|de|zh-Hans)(?:\/|<)/)
  const invalid = ['/it/about', '/fr/admin', '/de/login', '/es/not-a-real-page', '/zh-Hans/destinations/not-a-record']
  for (const route of invalid) assert.equal((await get(route)).status, 404, route)
  const redirect = await get('/en/about')
  assert([307, 308].includes(redirect.status))
  assert.equal(new URL(redirect.location, base).pathname, '/about')
  fs.writeFileSync('docs/seo-phase8-validation.json', JSON.stringify({date: '2026-10-11', architecture: 'next-intl explicit locale routes and feature overlays', origin: base, EnglishPages: routes.length, draftPages: routes.length * locales.length, sitemapURLs: 58, invalidRoutesChecked: invalid.length, EnglishPrefixRedirect: true, reports}, null, 2) + '\n')
}
main().catch(error => {console.error(error); process.exitCode = 1})
