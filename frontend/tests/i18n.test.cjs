const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { createLoader } = require('./load-typescript.cjs')

test('English URLs remain unchanged; language routes preserve deep links', () => {
  const { localePath, splitLocalePath } = createLoader()('@/lib/i18n/locales')
  assert.equal(localePath('/destinations/erta-ale', 'fr'), '/fr/destinations/erta-ale')
  assert.equal(localePath('/fr/destinations/erta-ale', 'en'), '/destinations/erta-ale')
  assert.equal(localePath('/', 'zh-Hans'), '/zh-Hans')
  assert.deepEqual(splitLocalePath('/de/blog/erta-ale-what-to-expect'), { locale: 'de', path: '/blog/erta-ale-what-to-expect' })
  assert.throws(() => localePath('//external.example', 'fr'))
})

test('internal links stay in the selected language without changing APIs or external links', () => {
  const { translatedHref } = createLoader()('@/lib/i18n/translate')
  const paths = ['/', '/plan', '/destinations/erta-ale']
  assert.equal(translatedHref('/plan?expedition=danakil-deep#form', 'de', paths), '/de/plan?expedition=danakil-deep#form')
  assert.equal(translatedHref('/fr/destinations/erta-ale', 'es', paths), '/es/destinations/erta-ale')
  for (const href of ['https://wa.me/123', '//example.com', 'mailto:info@example.com', '/api/v1/contact', '/admin', '/login', '#enquire', '/images/logo.png']) {
    assert.equal(translatedHref(href, 'fr', paths), href)
  }
})

test('all new languages are drafts; approved alternates must be reciprocal', () => {
  const { approvedTranslations, languageAlternates, isApprovedTranslation } = createLoader()('@/lib/i18n/locales')
  assert.equal(languageAlternates('/contact', 'https://www.afarhorizon.com'), undefined)
  for (const locale of ['fr', 'es', 'de', 'zh-Hans']) assert.equal(isApprovedTranslation(locale, '/contact'), false)
  approvedTranslations.fr = ['/contact']
  approvedTranslations.de = ['/contact']
  const expected = { en: 'https://www.afarhorizon.com/contact', 'x-default': 'https://www.afarhorizon.com/contact', fr: 'https://www.afarhorizon.com/fr/contact', de: 'https://www.afarhorizon.com/de/contact' }
  assert.deepEqual(languageAlternates('/contact', 'https://www.afarhorizon.com'), expected)
  assert.deepEqual(languageAlternates('/fr/contact', 'https://www.afarhorizon.com'), expected)
  assert.deepEqual(languageAlternates('/de/contact', 'https://www.afarhorizon.com'), expected)
})

test('draft metadata is translated, self-canonical and noindex, without draft hreflang', () => {
  const { localizedMetadata } = createLoader()('@/lib/i18n/metadata')
  const source = { title: { absolute: 'Contact Us | Afar Horizon Expeditions' }, description: 'Plan your journey', robots: { index: true }, openGraph: { type: 'website', images: [{ url: 'https://example.com/photo.png', alt: 'Salt plain' }] }, twitter: { card: 'summary_large_image' } }
  const result = localizedMetadata(source, 'fr', '/contact', { 'Contact Us': 'Contactez-nous', 'Plan your journey': 'Préparez votre voyage', 'Salt plain': 'Plaine de sel' }, 'https://www.afarhorizon.com')
  assert.equal(result.title.absolute, 'Contactez-nous | Afar Horizon Expeditions')
  assert.equal(result.description, 'Préparez votre voyage')
  assert.deepEqual(result.alternates, { canonical: 'https://www.afarhorizon.com/fr/contact' })
  assert.equal(result.openGraph.url, result.alternates.canonical)
  assert.equal(result.openGraph.images[0].alt, 'Plaine de sel')
  assert.equal(result.robots.index, false)
  assert.equal(source.robots.index, true)
})

test('translation preserves brand identity and prices; schema keeps the shared business ID', () => {
  const { translateText, translateSchema } = createLoader()('@/lib/i18n/translate')
  const messages = { 'Afar Horizon Expeditions': 'Do not use', '$950 per person': 'Do not use', 'Erta Ale journey': 'Voyage à Erta Ale' }
  assert.equal(translateText('Afar Horizon Expeditions', messages), 'Afar Horizon Expeditions')
  assert.equal(translateText('$950 per person', messages), '$950 per person')
  const schema = { '@type': 'TouristTrip', '@id': 'https://www.afarhorizon.com/expeditions/test#trip', url: 'https://www.afarhorizon.com/expeditions/test', name: 'Erta Ale journey', provider: { '@id': 'https://www.afarhorizon.com/#organization' } }
  const result = translateSchema(schema, 'fr', messages, ['/expeditions/test', '/'], 'https://www.afarhorizon.com')
  assert.equal(result.name, 'Voyage à Erta Ale')
  assert.equal(result['@id'], 'https://www.afarhorizon.com/fr/expeditions/test#trip')
  assert.equal(result.provider['@id'], 'https://www.afarhorizon.com/#organization')
})

test('assistant language rules preserve the existing factual grounding', () => {
  const { BUSINESS_INFO, NO_INVENTED_FACTS } = createLoader()('../backend/src/modules/assistant/business-info')
  assert.match(NO_INVENTED_FACTS, /Reply in the customer's language/)
  assert.match(NO_INVENTED_FACTS, /Never invent a product, a price, a policy or a date/)
  assert.match(BUSINESS_INFO, /info@afarhorizon\.com/)
})

// Dictionary completeness is checked separately by the rendered verifier after
// draft generation, so this test also works while new review entries are added.
test('each draft dictionary contains only nonempty text values', () => {
  for (const locale of ['fr', 'es', 'de', 'zh-Hans']) {
    const messages = JSON.parse(fs.readFileSync(path.join(__dirname, '../lib/i18n/drafts', `${locale}.json`), 'utf8'))
    for (const [key, value] of Object.entries(messages)) {
      assert.ok(key.trim())
      assert.ok(typeof value === 'string' && value.trim())
    }
  }
})

test('route scopes contain shared labels and only available source keys', () => {
  const source = require('../lib/i18n/drafts/source.en.json')
  const keys = new Set(source)
  const scopes = require('../lib/i18n/message-scopes.json')
  assert.equal(Object.keys(scopes).length, 61)
  for (const [route, entries] of Object.entries(scopes)) {
    assert.equal(new Set(entries).size, entries.length, route)
    for (const entry of entries) assert.ok(keys.has(source[entry]), `${route}: ${entry}`)
    if (route !== 'shared') for (const entry of scopes.shared) assert.ok(entries.includes(entry), `${route}: missing shared label`)
  }
  for (const locale of ['fr', 'es', 'de', 'zh-Hans']) {
    assert.deepEqual(Object.keys(require(`../lib/i18n/drafts/${locale}.json`)).sort(), [...source].sort())
  }
})
