const fs = require('node:fs')
const assert = require('node:assert/strict')
const { createLoader } = require('./load-typescript.cjs')
const { inventory } = require('../docs/seo-phase7-inventory.json')
const routes = [...inventory.staticIndexablePaths, '/plan', ...inventory.records.map(item => item.path)]
const locales = ['fr', 'es', 'de', 'zh-Hans']
const origin = process.env.SEO_BASE_URL || 'http://127.0.0.1:3101'
const source = require('../lib/i18n/drafts/source.en.json')
const scopes = require('../lib/i18n/message-scopes.json')
const normalize = value => value.replace(/\s+/g, ' ').trim()
const decode = value => value.replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
function texts(html) {
  return [...html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/<section\b[^>]*data-no-translate[^>]*>[\s\S]*?<\/section>/g, '').matchAll(/>([^<>]+)</g)].map(match => normalize(decode(match[1])))
}
async function get(path) {
  const response = await fetch(origin + path, { redirect: 'manual' })
  return { status: response.status, robots: response.headers.get('x-robots-tag'), html: await response.text() }
}
async function main() {
  const { localePath } = createLoader()('@/lib/i18n/locales')
  const reports = []
  const english = new Map()
  for (const route of routes) {
    const page = await get(route)
    assert.equal(page.status, 200, route)
    english.set(route, page)
  }
  for (const locale of locales) {
    const messages = require(`../lib/i18n/drafts/${locale}.json`)
    assert.deepEqual(Object.keys(messages).sort(), [...source].sort(), locale + ' dictionary coverage')
    const findings = []
    for (const route of routes) {
      const path = localePath(route, locale)
      const page = await get(path)
      assert.equal(page.status, 200, path)
      assert.match(page.html, new RegExp(`<html[^>]*lang="${locale}"`))
      assert.match(page.html, new RegExp(`<link rel="canonical" href="https://www.afarhorizon.com${path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`))
      assert.match(page.html, /<meta name="robots" content="[^"]*noindex/)
      assert.match(page.robots || '', /noindex/)
      assert.doesNotMatch(page.html, /hrefLang=/i)
      for (const script of page.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
        const schema = JSON.parse(script[1])
        const visit = item => {
          if (!item || typeof item !== 'object') return
          if (Array.isArray(item)) return item.forEach(visit)
          if (['Article', 'BlogPosting', 'WebPage'].includes(item['@type'])) assert.equal(item.inLanguage, locale, path)
          if (typeof item['@id'] === 'string' && item['@id'].startsWith('https://www.afarhorizon.com/') && !['https://www.afarhorizon.com/#organization', 'https://www.afarhorizon.com/#website'].includes(item['@id'])) {
            assert.ok(item['@id'].startsWith('https://www.afarhorizon.com/' + locale + '/'), path + ' schema ID')
          }
          Object.values(item).forEach(visit)
        }
        visit(schema)
      }
      const main = page.html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1]
      assert.ok(main, path + ' main content')
      const visible = new Set(texts(main))
      const missed = [...new Set(texts(english.get(route).html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] || ''))].filter(key => key.length > 80 && messages[key] && messages[key] !== key && visible.has(key) && !/[$€£]\s*\d/.test(key))
      for (const key of missed) findings.push({ path, source: key, scoped: scopes[route].includes(source.indexOf(key)) })
      const originalTitle = english.get(route).html.match(/<title>(.*?)<\/title>/)?.[1]
      const title = page.html.match(/<title>(.*?)<\/title>/)?.[1]
      assert.ok(title && title !== originalTitle, path + ' translated title')
      const translatedMain = main.replace(/<section\b[^>]*data-no-translate[^>]*>[\s\S]*?<\/section>/g, '')
      for (const match of translatedMain.matchAll(/href="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
        if (routes.includes(match[1])) assert.fail(path + ' English internal link: ' + match[1])
      }
    }
    assert.deepEqual(findings, [], locale + ' untranslated long paragraphs')
    reports.push({ locale, pages: routes.length, sourceStrings: source.length, missingDictionaryEntries: 0, untranslatedLongParagraphs: findings.length, noindex: true, selfCanonical: true, draftHreflangExcluded: true })
    console.log(`Passed ${routes.length} ${locale} draft pages`)
  }
  const sitemap = (await get('/sitemap.xml')).html
  assert.equal((sitemap.match(/<loc>/g) || []).length, 59)
  assert.doesNotMatch(sitemap, /afarhorizon.com\/(fr|es|de|zh-Hans)(?:\/|<)/)
  const invalid = ['/it/about', '/en/about', '/fr/admin', '/de/login', '/es/not-a-real-page', '/zh-Hans/destinations/not-a-record']
  for (const route of invalid) assert.equal((await get(route)).status, 404, route)
  fs.writeFileSync('docs/seo-phase8-validation.json', JSON.stringify({ date: '2026-10-11', origin, EnglishPages: routes.length, draftPages: routes.length * locales.length, sitemapURLs: 59, invalidRoutesChecked: invalid.length, reports }, null, 2) + '\n')
}
main().catch(error => { console.error(error); process.exitCode = 1 })
