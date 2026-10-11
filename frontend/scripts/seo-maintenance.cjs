// Read-only website checks. Writes a local report; never submits forms or edits services.
const fs = require('node:fs')
const path = require('node:path')
const { spawnSync } = require('node:child_process')
const { createLoader } = require('../tests/load-typescript.cjs')
const root = path.resolve(__dirname, '..')
const args = process.argv.slice(2)
const value = name => args.find(arg => arg.startsWith(`--${name}=`))?.slice(name.length + 3)
const inventoryOnly = args.includes('--inventory-only')
const preview = args.includes('--preview')
const base = value('base-url')
const output = path.resolve(root, value('output') || 'docs/seo-reports/latest.json')

async function main() {
  if (!inventoryOnly) {
    if (!base) throw new Error('Provide --base-url=https://www.afarhorizon.com or --inventory-only.')
    const url = new URL(base)
    const local = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)
    if (url.username || url.password || url.search || url.hash || url.pathname !== '/' || (url.protocol !== 'https:' && !(local && url.protocol === 'http:'))) {
      throw new Error('The base URL must be an HTTPS origin, or HTTP localhost, without credentials, path or query.')
    }
  }
  const load = createLoader()
  const { indexableStaticRoutes } = load('@/lib/seo/routes')
  const { destinations } = load('@/features/destinations/data/destination.data')
  const { tours } = load('@/features/tours/data/tour.data')
  const { posts } = load('@/features/blog/data/post.data')
  const records = [
    ...destinations.map(item => ({ type: 'destination', path: `/destinations/${item.slug}`, title: item.name, image: item.image })),
    ...tours.map(item => ({ type: 'expedition', path: `/expeditions/${item.slug}`, title: item.title, image: item.image })),
    ...posts.map(item => ({ type: 'article', path: `/blog/${item.slug}`, title: item.title, image: item.image, topics: item.topics, publishedAt: item.publishedAt, updatedAt: item.updatedAt })),
  ]
  const afar = posts.filter(post => post.topics?.includes('afar')).length
  const report = {
    checkedAt: new Date().toISOString(),
    target: inventoryOnly ? null : new URL(base).origin,
    mode: inventoryOnly ? 'inventory_only' : preview ? 'preview' : 'production_policy',
    inventory: {
      destinations: destinations.length, expeditions: tours.length, articles: posts.length,
      afarArticles: afar, afarArticlePercent: posts.length ? Math.round(afar / posts.length * 100) : null,
      expectedProductionSitemapUrls: indexableStaticRoutes.length + records.length,
      staticIndexablePaths: indexableStaticRoutes, records,
    },
    checks: [],
    externalMeasurements: { searchConsole: 'not_collected', pageviews: 'not_collected', enquiries: 'not_collected', fieldVitals: 'not_collected' },
  }
  if (!inventoryOnly) {
    for (const name of ['seo-build', 'crawl', 'content', 'schema', 'images']) {
      const command = [`tests/verify-${name}.cjs`, `--base-url=${report.target}`]
      if (preview && ['seo-build', 'crawl'].includes(name)) command.push('--preview')
      const started = Date.now()
      const result = spawnSync(process.execPath, command, { cwd: root, encoding: 'utf8', timeout: 180_000, maxBuffer: 1024 * 1024 })
      const passed = result.status === 0 && !result.error
      report.checks.push({ name, status: passed ? 'passed' : 'failed', durationMs: Date.now() - started, output: [result.stdout, result.stderr, result.error?.message].filter(Boolean).join('\n').trim().slice(-8000) })
      console.log(`${passed ? 'PASS' : 'FAIL'} ${name}`)
    }
    if (args.includes('--check-image-responses')) {
      // Catalogue photos only. Fetch a small rendition and consume its response.
      for (const image of [...new Set(records.map(item => item.image))]) {
        let status = 'failed', detail
        try {
          const url = new URL(image)
          if (url.origin !== 'https://res.cloudinary.com' || !url.pathname.startsWith('/xsrr0wfh/image/upload/')) throw new Error('Unexpected catalogue image host/path')
          const response = await fetch(image.replace('/image/upload/', '/image/upload/f_auto,q_auto,c_limit,w_64/'), { signal: AbortSignal.timeout(15_000) })
          const bytes = (await response.arrayBuffer()).byteLength
          detail = `${response.status}; ${response.headers.get('content-type')}; ${bytes} bytes`
          if (response.ok && response.headers.get('content-type')?.startsWith('image/') && bytes > 0) status = 'passed'
        } catch (error) { detail = error.message }
        report.checks.push({ name: 'catalogue-image-response', image, status, output: detail })
      }
    }
  }
  report.status = inventoryOnly ? 'inventory_only' : report.checks.some(check => check.status === 'failed') ? 'failed' : 'passed'
  report.imageResponseScope = !inventoryOnly && args.includes('--check-image-responses') ? 'unique_catalogue_photos_at_width_64' : 'not_checked'
  fs.mkdirSync(path.dirname(output), { recursive: true })
  fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n')
  console.log(`Inventory: ${destinations.length} destinations, ${tours.length} expeditions, ${posts.length} articles (${afar} Afar); ${report.inventory.expectedProductionSitemapUrls} production sitemap URLs.`)
  console.log(`Report: ${output}`)
  if (report.status === 'failed') process.exitCode = 1
}

main().catch(error => { console.error(error.message); process.exitCode = 1 })
