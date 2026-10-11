const assert = require('node:assert/strict')
const { test } = require('node:test')
const { createLoader } = require('./load-typescript.cjs')
const site = { url: 'https://www.afarhorizon.com', name: 'Afar Horizon Expeditions' }
const load = createLoader({ '@/lib/config/site': { site } })
const { serializeJsonLd } = load('@/lib/seo/json-ld')
const { businessSchema } = load('@/features/about/utils/business.schema')
const { postSchema } = load('@/features/blog/utils/post.schema')
const { destinationSchema } = load('@/features/destinations/utils/destination.schema')
const { tourSchema } = load('@/features/tours/utils/tour.schema')
const { faqSchema } = load('@/features/faq/utils/faq.schema')
const { posts } = load('@/features/blog/data/post.data')
const { destinations } = load('@/features/destinations/data/destination.data')
const { tours } = load('@/features/tours/data/tour.data')
const { faqGroups } = load('@/features/faq/data/faq.data')
const { contact } = load('@/lib/constants/company')
const { isoDate, formatEditorialDate } = load('@/lib/utils/date')

test('serialization prevents script breakouts and preserves editorial text', () => {
  const payload = { headline: '</script><script>alert(1)</script>', answer: '<b>Afar</b> & salt' }
  const json = serializeJsonLd(payload)
  assert(!json.includes('<'))
  assert.deepEqual(JSON.parse(json), payload)
})

test('business identity uses confirmed contact data without unconfirmed claims', () => {
  const [agency, website] = businessSchema()['@graph']
  assert.equal(agency['@type'], 'TravelAgency')
  for (const key of ['email', 'address']) assert.equal(agency[key], contact[key])
  assert.equal(agency.telephone, contact.phone)
  assert.equal(agency.logo, site.url + '/images/logo.png')
  assert.equal(website.publisher['@id'], agency['@id'])
  for (const key of ['sameAs', 'aggregateRating', 'review']) assert.equal(agency[key], undefined)
})

test('article dates and authors match the confirmed editorial record', () => {
  for (const post of posts) {
    const [breadcrumb, article] = postSchema(post)['@graph']
    assert.equal(article.headline, post.title)
    assert.equal(article.description, post.excerpt)
    assert.deepEqual(article.image, [post.image])
    assert.equal(article.datePublished, post.publishedAt)
    assert.equal(article.dateModified, post.updatedAt)
    assert.equal(formatEditorialDate(post.publishedAt), post.date)
    assert(article.datePublished <= article.dateModified)
    assert.equal(breadcrumb.itemListElement[2].item, article.url)
    assert.equal(article.author.url, undefined)
    if (post.author === 'Afar Horizon') assert.equal(article.author['@id'], site.url + '/#organization')
    else assert.equal(article.author.name, post.author)
  }
  const undated = postSchema({ ...posts[0], publishedAt: undefined, updatedAt: undefined })['@graph'][1]
  assert.equal(undated.datePublished, undefined)
  assert.equal(undated.dateModified, undefined)
  for (const date of ['not a date', '2026-02-30', '2026-1-1']) assert.throws(() => isoDate(date))
})

test('destination/trip schemas match content and omit offers, ratings and departures', () => {
  for (const d of destinations) {
    const [breadcrumb, entity] = destinationSchema(d)['@graph']
    assert.equal(entity.name, d.name)
    assert.equal(entity.description, d.intro)
    assert.equal(entity.image, d.image)
    assert.equal(breadcrumb.itemListElement[2].item, entity.url)
  }
  for (const t of tours) {
    const [breadcrumb, entity] = tourSchema(t)['@graph']
    assert.equal(entity.name, t.title)
    assert.equal(entity.description, t.summary)
    assert.deepEqual(entity.itinerary.itemListElement.map(p => p.name), t.places)
    assert.deepEqual(entity.subTrip.map(p => p.description), t.itinerary.map(d => d.text))
    assert.equal(entity.provider['@id'], site.url + '/#organization')
    assert.equal(breadcrumb.itemListElement[2].item, entity.url)
    for (const key of ['offers', 'aggregateRating', 'review', 'departureTime']) assert.equal(entity[key], undefined)
  }
})

test('FAQ entities contain every visible question and answer, exactly once', () => {
  assert.deepEqual(faqSchema().mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })), faqGroups.flatMap(g => g.items))
})
