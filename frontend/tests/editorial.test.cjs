const assert = require('node:assert/strict')
const { test } = require('node:test')
const { createLoader } = require('./load-typescript.cjs')
const load = createLoader()
const { posts } = load('@/features/blog/data/post.data')
const { destinations } = load('@/features/destinations/data/destination.data')
const { tours } = load('@/features/tours/data/tour.data')
const { indexableStaticRoutes } = load('@/lib/seo/routes')
const { articleParagraph } = load('@/features/blog/utils/article.utils')
const { getRelatedPosts } = load('@/features/blog/utils/post.utils')
const routes = new Set([
  ...indexableStaticRoutes, '/plan',
  ...posts.map(p => `/blog/${p.slug}`), ...tours.map(t => `/expeditions/${t.slug}`),
  ...destinations.map(d => `/destinations/${d.slug}`),
])

test('article formatting preserves legacy paragraphs and literal text around links', () => {
  assert.deepEqual(articleParagraph('Old plain paragraph').parts, [{ text: 'Old plain paragraph' }])
  const result = articleParagraph({ text: 'See Erta Ale, then Dallol.', links: [
    { text: 'Dallol', href: '/destinations/dallol' }, { text: 'Erta Ale', href: '/destinations/erta-ale' },
  ] })
  assert.equal(result.parts.map(p => p.text).join(''), 'See Erta Ale, then Dallol.')
  assert.deepEqual(result.parts.filter(p => p.href).map(p => p.href), ['/destinations/erta-ale', '/destinations/dallol'])
})

test('editorial links resolve, topic recommendations are curated and every guide has a journey path', () => {
  assert.equal(posts.filter(p => p.topics?.includes('afar')).length, 7)
  for (const post of posts) {
    assert(tours.some(t => t.slug === post.tourSlug), `${post.slug}: missing suitable package`)
    assert(!Number.isNaN(Date.parse(post.updatedAt)), `${post.slug}: update date`)
    assert(post.body.filter(p => typeof p !== 'string' && p.heading).length >= 3)
    for (const value of post.body) {
      const paragraph = articleParagraph(value)
      assert.equal(paragraph.parts.map(p => p.text).join(''), paragraph.text)
      for (const link of paragraph.links ?? []) {
        assert(paragraph.text.includes(link.text), `${post.slug}: absent anchor text ${link.text}`)
        assert(routes.has(link.href), `${post.slug}: broken link ${link.href}`)
      }
    }
    for (const slug of post.relatedSlugs) assert(posts.some(p => p.slug === slug && p.slug !== post.slug))
    const { next, more } = getRelatedPosts(post)
    assert.equal(next.slug, post.relatedSlugs[0])
    assert.equal(new Set([post.slug, next.slug, ...more.map(p => p.slug)]).size, 5)
  }
})

test('place links select specific destinations rather than broad regions', () => {
  // Avoid loading client components through the tour public barrel in this unit test.
  const { getDestinationForPlace } = createLoader({ '@/features/tours': { tours } })('@/features/destinations/utils/destination.utils')
  for (const [place, slug] of [['Erta Ale', 'erta-ale'], ['Lake Asale', 'lake-assale'], ['Aksum', 'axum'], ['Lake Tana', 'lake-tana'], ['Hamed Ela', 'hamed-ela']]) {
    assert.equal(getDestinationForPlace(place)?.slug, slug)
  }
  assert.equal(getDestinationForPlace('Unlisted stop'), undefined)
})
