const assert = require('node:assert/strict')
const { test } = require('node:test')
const { createLoader } = require('./load-typescript.cjs')
const load = createLoader()
const loader = load('@/lib/config/image-loader').default

test('Cloudinary delivery changes size/encoding while retaining the original asset', () => {
  const src = 'https://res.cloudinary.com/xsrr0wfh/image/upload/v1791652743/Erta_Ale_approach.png'
  assert.equal(loader({ src, width: 640 }), 'https://res.cloudinary.com/xsrr0wfh/image/upload/f_auto,q_auto,c_limit,w_640/v1791652743/Erta_Ale_approach.png')
  assert.equal(loader({ src, width: 96 }), src.replace('/upload/', '/upload/f_auto,q_auto,c_limit,w_96/'))
  for (const src of ['/images/logo.png', '/images/logo-light.png', 'https://example.org/photo.png']) {
    assert.equal(loader({ src, width: 640 }), src)
  }
})
