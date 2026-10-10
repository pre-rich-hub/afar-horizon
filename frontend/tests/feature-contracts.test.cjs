const assert = require('node:assert/strict')
const { test } = require('node:test')
const { createLoader } = require('./load-typescript.cjs')

function mockFetch(t, implementation) {
  const original = global.fetch
  global.fetch = implementation
  t.after(() => { global.fetch = original })
}
const success = data => Response.json({ success: true, data })

test('tour catalogue keeps static content, overlays price/featured, and falls back on failure', async t => {
  const load = createLoader()
  const { tours } = load('@/features/tours/data/tour.data')
  const { getToursData, getTourData } = load('@/features/tours/utils/tour.catalog')
  const live = { canonical: { slug: tours[0].slug }, adultPrice: 1200, isFeatured: false, name: 'API title' }
  mockFetch(t, async url => success(url.includes('/slug/') ? live : { items: [live] }))
  const result = await getToursData()
  assert.deepEqual(result[0], { ...tours[0], from: '$1,200 per person', featured: false })
  assert.deepEqual(result.slice(1), tours.slice(1))
  assert.deepEqual(await getTourData(tours[0].slug), result[0])
  assert.equal(await getTourData('missing-tour'), undefined)
  global.fetch = async () => { throw new Error('offline') }
  assert.deepEqual(await getToursData(), tours)
  assert.deepEqual(await getTourData(tours[0].slug), tours[0])
})

test('enquiry and newsletter preserve JSON payloads and backend errors', async t => {
  const load = createLoader(), calls = []
  mockFetch(t, async (url, init) => { calls.push({ url, init }); return success(null) })
  const { submitContact } = load('@/features/enquiries/api/enquiry.api')
  const { subscribe } = load('@/features/newsletter/api/newsletter.api')
  const payload = { name: 'Test', email: 'test@example.com', message: 'A journey' }
  await submitContact(payload)
  await subscribe(payload.email)
  assert.deepEqual(calls.map(c => c.url), ['/api/v1/contact', '/api/v1/subscribe'])
  assert.deepEqual(JSON.parse(calls[0].init.body), payload)
  assert.deepEqual(JSON.parse(calls[1].init.body), { email: payload.email })
  assert.equal(calls[0].init.headers['Content-Type'], 'application/json')
  assert.ok(calls[0].init.signal instanceof AbortSignal)
  global.fetch = async () => Response.json({ success: false, message: 'Try again later' }, { status: 429 })
  await assert.rejects(subscribe(payload.email), /Try again later/)
})

test('admin resource APIs retain session cookies, multipart bodies, and error feedback', async t => {
  const load = createLoader(), calls = []
  mockFetch(t, async (url, init) => { calls.push({ url, init }); return success({ id: 7 }) })
  const { saveAdminDestination, deleteAdminDestination } = load('@/features/admin/api/destinations.api')
  const body = new FormData()
  body.set('name', 'Test destination')
  await saveAdminDestination(undefined, body)
  await saveAdminDestination(7, body)
  await deleteAdminDestination(7)
  assert.deepEqual(calls.map(c => [c.url, c.init.method]), [
    ['/api/v1/admin/destinations', 'POST'],
    ['/api/v1/admin/destinations/7', 'PUT'],
    ['/api/v1/admin/destinations/7', 'DELETE'],
  ])
  assert.equal(calls[0].init.body, body)
  assert.equal(calls[0].init.credentials, 'include')
  assert.equal(calls[0].init.headers['Content-Type'], undefined)
  global.fetch = async () => new Response('', { status: 401 })
  await assert.rejects(deleteAdminDestination(7), /session has expired/)
})

test('authentication preserves invalid-login and missing/failed-session behavior', async t => {
  let cookieList = []
  const load = createLoader({ 'server-only': {}, 'next/headers': { cookies: async () => ({ getAll: () => cookieList }) } })
  const { login, logout } = load('@/features/auth/api/auth.api')
  const { hasValidAdminSession } = load('@/features/auth/server')
  const calls = []
  mockFetch(t, async (url, init) => { calls.push({ url, init }); return success(null) })
  assert.equal(await hasValidAdminSession(), false)
  assert.equal(calls.length, 0)
  assert.equal(await login('test@example.com', 'example'), true)
  await logout()
  assert.equal(calls[1].url, '/api/v1/auth/logout')
  cookieList = [{ name: 'admin_session', value: 'test-session' }]
  assert.equal(await hasValidAdminSession(), true)
  assert.equal(calls[2].init.headers.Cookie, 'admin_session=test-session')
  assert.equal(calls[2].init.cache, 'no-store')
  global.fetch = async () => Response.json({ success: false }, { status: 401 })
  assert.equal(await login('test@example.com', 'wrong'), false)
  assert.equal(await hasValidAdminSession(), false)
  global.fetch = async () => { throw new Error('offline') }
  assert.equal(await hasValidAdminSession(), false)
})

test('assistant consumes split SSE frames, JSON fallback, and malformed replies', async t => {
  const { streamAssistantChat } = createLoader()('@/features/support/api/support.api')
  const events = [], handlers = {
    onMeta: (...args) => events.push(['meta', ...args]),
    onDelta: text => events.push(['delta', text]),
    onDone: value => events.push(['done', value]),
    onError: message => events.push(['error', message]),
  }
  const done = { sessionId: 's1', messageId: 1, handoff: { type: 'none' } }
  const frames = `event: meta\ndata: {"data":{"sessionId":"s1","resumed":true}}\n\nevent: delta\ndata: {"text":"Hello"}\n\nevent: done\ndata: ${JSON.stringify(done)}\n\n`
  mockFetch(t, async (url, init) => {
    assert.equal(url, '/api/v1/assistant')
    assert.equal(init.credentials, 'include')
    return new Response(new ReadableStream({ start(controller) {
      const bytes = new TextEncoder().encode(frames)
      controller.enqueue(bytes.slice(0, 27)); controller.enqueue(bytes.slice(27)); controller.close()
    } }), { headers: { 'Content-Type': 'text/event-stream' } })
  })
  await streamAssistantChat('Hello', 's1', handlers)
  assert.deepEqual(events, [['meta', 's1', true], ['delta', 'Hello'], ['done', done]])
  events.length = 0
  global.fetch = async () => success({ sessionId: 's2', messageId: 2, text: 'JSON reply' })
  await streamAssistantChat('Hello', null, handlers)
  assert.deepEqual(events[1], ['delta', 'JSON reply'])
  events.length = 0
  global.fetch = async () => new Response('not JSON')
  await streamAssistantChat('Hello', null, handlers)
  assert.match(events[0][1], /malformed response/)
})
