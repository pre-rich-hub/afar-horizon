const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const { createRequire } = require('node:module')
const ts = require('typescript')

// Load feature modules without adding a test runner or changing application output.
function createLoader(overrides = {}, root = path.resolve(__dirname, '..')) {
  const cache = new Map()
  const nativeRequire = createRequire(path.join(root, 'package.json'))
  function load(specifier, parent = path.join(root, 'entry.ts')) {
    if (Object.hasOwn(overrides, specifier)) return overrides[specifier]
    if (!specifier.startsWith('.') && !specifier.startsWith('@/')) return nativeRequire(specifier)
    const base = specifier.startsWith('@/')
      ? path.join(root, specifier.slice(2))
      : path.resolve(path.dirname(parent), specifier)
    const file = [base, `${base}.ts`, `${base}.tsx`, path.join(base, 'index.ts')]
      .find(candidate => fs.existsSync(candidate) && fs.statSync(candidate).isFile())
    if (!file) throw new Error(`Cannot resolve ${specifier} from ${parent}`)
    if (cache.has(file)) return cache.get(file).exports
    const module = { exports: {} }
    cache.set(file, module)
    const { outputText } = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
      fileName: file,
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    })
    const execute = vm.runInThisContext(`(function(require, module, exports) {\n${outputText}\n})`, { filename: file })
    execute(specifier => load(specifier, file), module, module.exports)
    return module.exports
  }
  return load
}

module.exports = { createLoader }
