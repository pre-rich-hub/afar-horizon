const assert = require('node:assert/strict')
const { test } = require('node:test')
const { createLoader } = require('./load-typescript.cjs')

const { getSiteConfig } = createLoader()('@/lib/config/site')
const production = {
  NODE_ENV: 'production', SITE_URL: 'https://www.afarhorizon.com/',
  SEO_INDEXABLE: 'true', DEPLOYMENT_ENV: 'production',
}

test('production metadata requires a valid origin and explicit indexing configuration', () => {
  assert.equal(getSiteConfig(production).url, 'https://www.afarhorizon.com')
  assert.equal(getSiteConfig(production).indexable, true)
  assert.throws(() => getSiteConfig({ NODE_ENV: 'production' }), /SITE_URL/)
  for (const origin of [
    'http://afarhorizon.com', 'https://www.afarhorizon.com/blog',
    'https://www.afarhorizon.com?campaign=1', 'https://www.afarhorizon.com/#top',
    'https://user:password@afarhorizon.com', 'https://localhost:3000', 'invalid',
  ]) assert.throws(() => getSiteConfig({ ...production, SITE_URL: origin }))
  assert.throws(() => getSiteConfig({ ...production, SEO_INDEXABLE: 'yes' }), /SEO_INDEXABLE/)
  assert.throws(() => getSiteConfig({ ...production, DEPLOYMENT_ENV: 'unknown' }), /DEPLOYMENT_ENV/)
  assert.equal(getSiteConfig({ ...production, SEO_INDEXABLE: undefined }).indexable, false)
  assert.equal(getSiteConfig({ ...production, DEPLOYMENT_ENV: undefined }).indexable, false)
})

test('preview markers override production flags and development stays noindex', () => {
  for (const marker of [
    { VERCEL_ENV: 'preview' }, { VERCEL_ENV: 'development' },
    { CONTEXT: 'deploy-preview' }, { CONTEXT: 'branch-deploy' },
    { DEPLOYMENT_ENV: 'staging' }, { DEPLOYMENT_ENV: 'preview' },
  ]) assert.equal(getSiteConfig({ ...production, ...marker }).indexable, false)
  assert.equal(getSiteConfig({ ...production, NODE_ENV: 'development' }).indexable, false)
  assert.equal(getSiteConfig({ NODE_ENV: 'development' }).url, 'http://localhost:3000')
  assert.equal(getSiteConfig({ ...production, DEPLOYMENT_ENV: undefined, VERCEL_ENV: 'production' }).indexable, true)
})

test('page metadata keeps canonical and social details on the same page', () => {
  const site = getSiteConfig(production)
  const { createPageMetadata, pageTitle } = createLoader({ '@/lib/config/site': { site } })('@/lib/seo/metadata')
  const image = 'https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/erta-ale.png'
  const article = createPageMetadata({
    title: 'Erta Ale | Afar Horizon', description: 'An expedition guide.',
    path: '/blog/erta-ale-what-to-expect', image, imageAlt: 'Erta Ale, Afar',
    type: 'article', author: 'Afar Horizon',
  })
  assert.equal(article.title.absolute, 'Erta Ale | Afar Horizon Expeditions')
  assert.equal(pageTitle(article.title.absolute), article.title.absolute)
  assert.equal(article.alternates.canonical, 'https://www.afarhorizon.com/blog/erta-ale-what-to-expect')
  assert.equal(article.openGraph.url, article.alternates.canonical)
  assert.equal(article.openGraph.title, article.title.absolute)
  assert.equal(article.twitter.title, article.title.absolute)
  assert.equal(article.twitter.card, 'summary_large_image')
  assert.deepEqual(article.openGraph.images, [{ url: image, alt: 'Erta Ale, Afar' }])
  assert.deepEqual(article.twitter.images, article.openGraph.images)
  assert.equal(article.openGraph.type, 'article')
  assert.deepEqual(article.authors, [{ name: 'Afar Horizon' }])
  assert.deepEqual(article.robots, { index: true, follow: true })
  assert.equal(createPageMetadata({ title: 'Credits', description: 'Photos', path: '/photo-credits', index: false }).robots.index, false)
  assert.throws(() => createPageMetadata({ title: 'Bad', description: 'Bad', path: '//another.example/path' }))
  assert.throws(() => createPageMetadata({ title: 'Bad', description: 'Bad', path: '/\\another.example/path' }))
})

test('a page cannot enable indexing in a preview deployment', () => {
  const site = getSiteConfig({ ...production, VERCEL_ENV: 'preview' })
  const { createPageMetadata } = createLoader({ '@/lib/config/site': { site } })('@/lib/seo/metadata')
  const metadata = createPageMetadata({ title: 'Afar', description: 'Afar travel', path: '/', index: true })
  assert.equal(metadata.robots.index, false)
  assert.equal(metadata.alternates.canonical, 'https://www.afarhorizon.com/')
  assert.equal(metadata.openGraph.url, metadata.alternates.canonical)
})
