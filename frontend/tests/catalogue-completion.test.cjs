const test = require('node:test')
const assert = require('node:assert/strict')
const {createLoader} = require('./load-typescript.cjs')
const load = createLoader()
const {tours, expeditionCollections} = load('@/features/tours/data/tour.data')
const {destinations} = load('@/features/destinations/data/destination.data')
const simien = tours.filter(t => t.collection === 'simien')
const additions = ['afar-people', 'salt-caravans', 'abune-yemata-guh', 'maryam-korkor', 'daniel-korkor']
const camp = name => name === 'None' ? name : name.split(/ |,/)[0]

test('client catalogue additions are unique, grouped and complete', () => {
  assert.equal(destinations.length, 24)
  assert.equal(tours.length, 31)
  for (const records of [destinations, tours]) assert.equal(new Set(records.map(r => r.slug)).size, records.length)
  for (const slug of additions) assert(destinations.some(d => d.slug === slug))
  assert.deepEqual(simien.map(t => t.itinerary.length), [1,2,3,4,5,6,7,8,9,10,11,12,13,15])
  assert.equal(new Set(expeditionCollections.map(c => c.id)).size, 4)
  for (const t of tours) assert(expeditionCollections.some(c => c.id === t.collection), t.slug)
  for (const t of simien) {
    assert.equal(t.from, 'Price on request', t.slug)
    assert.equal(t.nights, t.itinerary.length - 1, t.slug)
    assert.equal(t.itinerary.filter(d => d.overnight !== 'None').length, t.nights, t.slug)
    assert.equal(t.itinerary.at(-1).overnight, 'None', t.slug)
    assert.equal(t.start, 'Gondar')
  }
})

test('source overnight progressions and acclimatization days remain distinct', () => {
  const byDays = n => simien.find(t => t.itinerary.length === n)
  const expected = {
    5: ['Sankaber','Geech','Geech','Chenek','None'],
    8: ['Sankaber','Geech','Geech','Chenek','Ambiko','Ambiko','Ambiko','None'],
    10: ['Sankaber','Geech','Geech','Chenek','Ambiko','Ambiko','Sona','Mekarebia','Mulit','None'],
    12: ['Sankaber','Sankaber','Geech','Geech','Chenek','Chenek','Ambiko','Ambiko','Ambiko','Sona','Mulit','None'],
    13: ['Sankaber','Geech','Geech','Chenek','Ambiko','Ambiko','Beyeda','Zhukzuke','Sekota','Lalibela','Lalibela','Lalibela','None'],
    15: ['Sankaber','Sankaber','Geech','Geech','Chenek','Chenek','Ambiko','Ambiko','Ambiko','Ambiko','Sona','Mekarebia','Mulit','Aderkay','None'],
  }
  for (const [n, nights] of Object.entries(expected)) assert.deepEqual(byDays(Number(n)).itinerary.map(d => camp(d.overnight)), nights)
  assert.match(byDays(8).itinerary[5].title, /Acclimatization/)
  assert.match(byDays(15).itinerary[9].title, /Recovery/)
  assert.equal(byDays(13).end, 'Lalibela')
  assert.match(byDays(13).includes[0], /onward to Lalibela/)
  assert.equal(byDays(1).nights, 0)
  assert.equal(byDays(1).itinerary[0].meals, 'Breakfast depending on hotel arrangement; lunch included')
  assert(!byDays(1).includes.some(i => /camp accommodation/i.test(i)))
  assert(!byDays(1).itinerary[0].text.includes('Activities not specifically listed'))
})

test('new editorial pages recommend relevant areas and Simien prioritizes its treks', () => {
  const {getDestinationRelations, getDestinationForPlace} = createLoader({'@/features/tours': {tours}})('@/features/destinations/utils/destination.utils')
  const relation = slug => getDestinationRelations(destinations.find(d => d.slug === slug)).fallback
  assert(relation('simien-mountains').every(t => t.collection === 'simien'))
  for (const slug of additions.slice(2)) assert(relation(slug).every(t => t.places.includes('Gheralta')))
  assert(relation('salt-caravans').every(t => t.places.includes('Lake Asale') || t.places.includes('Hamed Ela')))
  assert.equal(getDestinationForPlace('Lake Asale').slug, 'lake-assale')
  assert.equal(getDestinationForPlace('Simien Mountains').slug, 'simien-mountains')
})

test('every added route has translated draft copy with the same source itinerary structure', () => {
  const {getLocalizedData} = createLoader({'next-intl': {useLocale: () => 'fr'}})('@/lib/i18n/feature-copy')
  for (const locale of ['fr','es','de','zh-Hans']) {
    const tourOverlay = require('../features/tours/data/overlays/' + locale + '.json')
    assert(tourOverlay['tour.expeditionCollections'].simien.text)
    for (const t of simien) {
      const entry = tourOverlay['tour.tours'][t.slug]
      assert(entry, locale + ': ' + t.slug)
      for (const key of ['title','summary','why','season','accessNote']) assert(entry[key] && entry[key] !== t[key], `${locale}: ${t.slug}.${key}`)
      const translated = getLocalizedData({[locale]: tourOverlay}, 'tour.tours', t, locale)
      assert.equal(translated.from, t.from)
      assert.equal(translated.nights, t.nights)
      assert.equal(translated.itinerary.length, t.itinerary.length)
      for (let i = 0; i < t.itinerary.length; i++) {
        assert(entry.itinerary[i].text !== t.itinerary[i].text, `${locale}: ${t.slug} day ${i + 1}`)
        assert.equal(translated.itinerary[i].overnight === 'None', t.itinerary[i].overnight === 'None')
        if (t.slug === 'simien-to-lalibela-grand-trek' && i === 12) {
          assert.equal(translated.itinerary[i].meals, {fr: 'Petit-déjeuner', es: 'Desayuno', de: 'Frühstück', 'zh-Hans': '早餐'}[locale])
        }
      }
      for (const field of ['includes','excludes','faqs']) assert.equal(Object.keys(entry[field]).length, t[field].length, `${locale}: ${t.slug}.${field}`)
    }
    const destOverlay = require('../features/destinations/data/overlays/' + locale + '.json')
    for (const slug of additions) {
      const d = destinations.find(d => d.slug === slug)
      const entry = destOverlay['destination.destinations'][slug]
      for (const field of ['intro','teaser','bestTime','duration','altitude']) assert(entry[field] && entry[field] !== d[field], `${locale}: ${slug}.${field}`)
      for (const field of ['highlights','paragraphs','sections','faqs']) assert.equal(Object.keys(entry[field]).length, d[field].length)
    }
  }
})
