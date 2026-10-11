const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const {createTranslator} = require('next-intl')
const {createLoader} = require('./load-typescript.cjs')
const locales = ['fr', 'es', 'de', 'zh-Hans']
function flatten(value, prefix = '') {
  return Object.entries(value).flatMap(([key, entry]) => typeof entry === 'string'
    ? [[prefix + key, entry]] : flatten(entry, prefix + key + '.'))
}
test('English URLs stay unchanged and language links preserve deep links', () => {
  const {localePath} = createLoader()('@/lib/i18n/locales')
  assert.equal(localePath('/destinations/erta-ale', 'fr'), '/fr/destinations/erta-ale')
  assert.equal(localePath('/fr/plan?expedition=danakil-deep#enquire', 'en'), '/plan?expedition=danakil-deep#enquire')
  assert.equal(localePath('/', 'zh-Hans'), '/zh-Hans')
  assert.throws(() => localePath('//external.example', 'fr'))
})
test('drafts remain excluded from alternates until reciprocal approval', () => {
  const {approvedTranslations, languageAlternates, isApprovedTranslation} = createLoader()('@/lib/i18n/locales')
  assert.equal(languageAlternates('/contact', 'https://www.afarhorizon.com'), undefined)
  for (const locale of locales) assert.equal(isApprovedTranslation(locale, '/contact'), false)
  approvedTranslations.fr = ['/contact']
  const expected = {en: 'https://www.afarhorizon.com/contact', 'x-default': 'https://www.afarhorizon.com/contact', fr: 'https://www.afarhorizon.com/fr/contact'}
  assert.deepEqual(languageAlternates('/contact', 'https://www.afarhorizon.com'), expected)
  assert.deepEqual(languageAlternates('/fr/contact', 'https://www.afarhorizon.com'), expected)
})
test('localized metadata is self-canonical and noindex with the same origin and safe image URLs', () => {
  const site = {url: 'https://www.afarhorizon.com', name: 'Afar Horizon Expeditions', defaultImage: 'https://res.cloudinary.com/xsrr0wfh/image/upload/default.png', indexable: true}
  const {createPageMetadata} = createLoader({'@/lib/config/site': {site}})('@/lib/seo/metadata')
  const result = createPageMetadata({title: 'Contactez-nous', description: 'Préparez votre voyage', path: '/contact', locale: 'fr'})
  assert.equal(result.alternates.canonical, site.url + '/fr/contact')
  assert.equal(result.robots.index, false)
  assert.equal(result.openGraph.url, result.alternates.canonical)
  assert.equal(result.alternates.languages, undefined)
  assert.equal(createPageMetadata({title: 'Contact', description: 'Plan', path: '/contact'}).robots.index, true)
})
test('all UI languages have matching stable keys and valid ICU messages', () => {
  const english = require('../messages/en.json')
  const source = flatten(english)
  for (const locale of ['en', ...locales]) {
    const messages = require('../messages/' + locale + '.json')
    assert.deepEqual(flatten(messages).map(([key]) => key).sort(), source.map(([key]) => key).sort())
    const errors = []
    const tr = createTranslator({locale, messages, onError: error => errors.push(error.message)})
    for (const [key, value] of flatten(messages)) {
      assert(value.trim(), key)
      tr(key, {value0: '1', value1: 'Afar', value2: '38', count: 2})
    }
    assert.deepEqual(errors, [], locale + ' ICU errors')
  }
})
test('feature overlays preserve slugs, prices, dates, filters and backend values', () => {
  const load = createLoader({'next-intl': {useLocale: () => 'fr'}})
  const {getLocalizedData} = load('@/lib/i18n/feature-copy')
  const {tours} = load('@/features/tours/data/tour.data')
  const original = JSON.stringify(tours)
  const protectedFields = ['slug', 'image', 'from', 'nights', 'group', 'collection', 'style', 'places', 'start', 'end']
  for (const locale of locales) {
    const overlays = {[locale]: require('../features/tours/data/overlays/' + locale + '.json')}
    const translated = getLocalizedData(overlays, 'tour.tours', tours, locale)
    assert.equal(translated.length, tours.length)
    for (let i = 0; i < tours.length; i++) {
      for (const field of protectedFields) assert.deepEqual(translated[i][field], tours[i][field], locale + ': ' + field)
      assert.equal(translated[i].itinerary.length, tours[i].itinerary.length)
    }
    assert.notEqual(translated[0].summary, tours[0].summary)
    assert.equal(getLocalizedData(overlays, 'tour.tours', tours[0], locale).summary, translated[0].summary)
    assert.equal(getLocalizedData(overlays, 'tour.tours', tours, 'en'), tours)
  }
  assert.equal(JSON.stringify(tours), original)
  // Even a mistaken overlay cannot overwrite pricing or routing fields.
  const base = {slug: 'sample', title: 'Sample', from: '$100', places: ['Erta Ale']}
  const unsafe = {fr: {catalogue: {sample: {title: 'Exemple', slug: 'changed', from: '$0', places: {'0': 'Changed'}}}}}
  const result = getLocalizedData(unsafe, 'catalogue', base, 'fr')
  assert.equal(result.title, 'Exemple')
  assert.equal(result.slug, base.slug)
  assert.equal(result.from, base.from)
  assert.deepEqual(result.places, base.places)
})
test('all 38 gallery photographs have four translated title, alt and caption drafts', () => {
  const {galleryPhotos} = createLoader()('@/features/gallery/data/gallery.data')
  assert.equal(galleryPhotos.length, 38)
  for (const locale of locales) {
    const photos = require('../features/gallery/data/overlays/' + locale + '.json')['gallery.galleryPhotos']
    for (const photo of galleryPhotos) {
      const key = photo.src.split('/').at(-1).replace(/\.[^.]+$/, '')
      for (const field of ['title', 'alt', 'caption']) assert(photos[key][field] && photos[key][field] !== photo[field], `${locale}: ${key}.${field}`)
    }
  }
})
test('article drafts retain every inline link and use locale-aware confirmed dates', () => {
  const load = createLoader({'next-intl': {useLocale: () => 'fr'}})
  const {getLocalizedData} = load('@/lib/i18n/feature-copy')
  const {posts} = load('@/features/blog/data/post.data')
  const {articleParagraph} = load('@/features/blog/utils/article.utils')
  const {formatEditorialDate} = load('@/lib/utils/date')
  for (const locale of locales) {
    const translated = getLocalizedData({[locale]: require('../features/blog/data/overlays/' + locale + '.json')}, 'post.posts', posts, locale)
    for (let i = 0; i < posts.length; i++) {
      assert.equal(translated[i].publishedAt, posts[i].publishedAt)
      for (let j = 0; j < posts[i].body.length; j++) {
        const links = typeof posts[i].body[j] === 'string' ? [] : posts[i].body[j].links ?? []
        assert.deepEqual(articleParagraph(translated[i].body[j]).parts.filter(p => p.href).map(p => p.href).sort(), links.map(l => l.href).sort(), locale + ': ' + posts[i].slug)
      }
    }
    assert.notEqual(formatEditorialDate('2026-10-11', locale), formatEditorialDate('2026-10-11'))
  }
})
