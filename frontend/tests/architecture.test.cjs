const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { test } = require('node:test')
const ts = require('typescript')
const root = path.resolve(__dirname, '..')

function files(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(directory, entry.name)
    return entry.isDirectory() ? files(file) : /\.tsx?$/.test(file) ? [file] : []
  })
}

test('feature boundaries have explicit public entry points and no domain cycles', () => {
  assert.equal(fs.existsSync(path.join(root, 'src')), false)
  const edges = new Map()
  for (const folder of ['app', 'features', 'components', 'lib']) {
    for (const file of files(path.join(root, folder))) {
      const relative = path.relative(root, file).replaceAll(path.sep, '/')
      const domain = relative.startsWith('features/') ? relative.split('/')[1] : null
      const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true)
      for (const statement of source.statements) {
        if (!ts.isImportDeclaration(statement) && !ts.isExportDeclaration(statement)) continue
        const specifier = statement.moduleSpecifier?.text
        if (!specifier) continue
        assert.ok(!/^@\/(src|content|types|hooks)(\/|$)/.test(specifier), `${relative}: stale import ${specifier}`)
        if (specifier.startsWith('@/features/')) {
          const [, , target, ...rest] = specifier.split('/')
          assert.notEqual(target, domain, `${relative}: own-feature imports must be relative`)
          assert.ok(rest.length === 0 || (target === 'auth' && rest.join('/') === 'server' && folder === 'app'), `${relative}: private feature import ${specifier}`)
          if (domain && !statement.importClause?.isTypeOnly) {
            if (!edges.has(domain)) edges.set(domain, new Set())
            edges.get(domain).add(target)
          }
        }
        if (folder === 'lib') assert.ok(!specifier.startsWith('@/features/'), `${relative}: infrastructure depends on a feature`)
      }
      if (relative.startsWith('app/')) {
        assert.match(path.basename(file), /^(page|layout|loading|not-found)\.tsx$/, `Unexpected route implementation: ${relative}`)
        assert.ok(!fs.readFileSync(file, 'utf8').includes('fetch('), `${relative}: request belongs in a feature`)
      }
    }
  }
  function visit(domain, stack = []) {
    assert.ok(!stack.includes(domain), `Feature cycle: ${[...stack, domain].join(' -> ')}`)
    for (const target of edges.get(domain) ?? []) visit(target, [...stack, domain])
  }
  for (const domain of edges.keys()) visit(domain)
  const authIndex = fs.readFileSync(path.join(root, 'features/auth/index.ts'), 'utf8')
  assert.ok(!authIndex.includes('./server'), 'Server-only auth must remain a separate entry point')
})
