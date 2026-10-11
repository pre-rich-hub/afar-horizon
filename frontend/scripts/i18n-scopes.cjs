// Run against the English production build after changing public copy.
const fs = require('node:fs')
const path = require('node:path')
const ts = require('typescript')
const root = path.resolve(__dirname, '..')
const source = require('../lib/i18n/drafts/source.en.json')
const normalize = value => value.replace(/\s+/g, ' ').trim()
const keys = new Set(Array.isArray(source) ? source : Object.keys(source))
const shared = new Set(['Skip to content'])
const data = new Map()
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(dir, entry.name)) : /\.tsx?$/.test(entry.name) ? [path.join(dir, entry.name)] : [])
}
for (const dir of ['components', 'features', 'lib/constants']) for (const file of walk(path.join(root, dir))) {
  if (/\/(admin|auth)\//.test(file) || /Reviews\.tsx$/.test(file)) continue
  const feature = file.match(/\/features\/([^/]+)\//)?.[1]
  const bucket = /\/(data|types|utils)\//.test(file) && feature ? (data.get(feature) ?? new Set()) : shared
  if (feature && bucket !== shared) data.set(feature, bucket)
  const tree = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true)
  function visit(node) {
    if (ts.isJsxText(node) || ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const key = normalize(node.text)
      if (keys.has(key)) bucket.add(key)
      const parent = node.parent
      if (feature && keys.has(key) && ts.isPropertyAssignment(parent) &&
          ['name', 'title', 'teaser', 'tag', 'region', 'imageAlt'].includes(parent.name.getText(tree).replace(/^['"]|['"]$/g, ''))) shared.add(key)
    }
    ts.forEachChild(node, visit)
  }
  visit(tree)
}
for (const feature of ['support', 'enquiries', 'newsletter']) for (const key of data.get(feature) ?? []) shared.add(key)
const inventory = require('../docs/seo-phase7-inventory.json').inventory
const routes = [...inventory.staticIndexablePaths, '/plan', '/photo-credits', ...inventory.records.map(item => item.path)]
function decode(html) {
  return html.replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
}
async function main() {
  const cached = process.env.I18N_SOURCE_CACHE ? JSON.parse(fs.readFileSync(process.env.I18N_SOURCE_CACHE, 'utf8')) : null
  const scopes = { shared: [...shared].sort() }
  for (const route of routes) {
    let html
    if (cached) html = cached.find(page => page.route === route).html
    else {
      const response = await fetch((process.env.SEO_BASE_URL || 'http://127.0.0.1:3101') + route)
      if (!response.ok) throw Error(`${route}: HTTP ${response.status}`)
      html = await response.text()
    }
    const text = normalize(decode(html))
    const scope = new Set(shared)
    for (const key of keys) if (text.includes(key)) scope.add(key)
    const feature = ({ expeditions: 'tours', privacy: 'legal', terms: 'legal' })[route.split('/')[1]] ?? route.split('/')[1]
    const features = route === '/' ? ['home', 'destinations', 'tours', 'blog', 'gallery'] : [feature]
    for (const name of features) for (const key of data.get(name) ?? []) scope.add(key)
    scopes[route] = [...scope].sort()
  }
  const positions = new Map(source.map((key, index) => [key, index]))
  const compact = Object.fromEntries(Object.entries(scopes).map(([route, entries]) => [route, entries.map(key => positions.get(key))]))
  fs.writeFileSync(path.join(root, 'lib/i18n/message-scopes.json'), JSON.stringify(compact) + '\n')
  console.log(`Generated ${routes.length} route scopes; ${shared.size} shared labels.`)
}
main().catch(error => { console.error(error); process.exitCode = 1 })
