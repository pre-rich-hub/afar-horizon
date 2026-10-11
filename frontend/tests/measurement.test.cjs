const test = require('node:test')
const assert = require('node:assert/strict')
const { createLoader } = require('./load-typescript.cjs')
const load = createLoader()
const config = load('@/lib/config/measurement')
const policy = load('@/lib/analytics/policy')

test('measurement requires confirmed Vercel production; custom events default off on Hobby', () => {
  assert.deepEqual(config.getMeasurementConfig(true, { VERCEL_ENV: 'production' }), { pageviews: true, events: false })
  for (const env of [{}, { VERCEL_ENV: 'preview' }, { VERCEL_ENV: 'development' }, { VERCEL_ENV: 'production', ANALYTICS_ENABLED: 'false' }]) {
    assert.deepEqual(config.getMeasurementConfig(true, env), { pageviews: false, events: false })
  }
  assert.equal(config.getMeasurementConfig(false, { VERCEL_ENV: 'production', ANALYTICS_CUSTOM_EVENTS_ENABLED: 'true' }).events, false)
  assert.equal(config.getMeasurementConfig(true, { VERCEL_ENV: 'production', ANALYTICS_CUSTOM_EVENTS_ENABLED: 'true' }).events, true)
  assert.throws(() => config.getMeasurementConfig(true, { ANALYTICS_ENABLED: 'yes' }))
})

test('Google verification is optional and accepts only a token', () => {
  assert.equal(config.getGoogleVerification({}), undefined)
  assert.equal(config.getGoogleVerification({ GOOGLE_SITE_VERIFICATION: ' abcDEF123_-token ' }), 'abcDEF123_-token')
  for (const token of ['<meta name="google-site-verification">', 'google-site-verification=abc123', 'short']) {
    assert.throws(() => config.getGoogleVerification({ GOOGLE_SITE_VERIFICATION: token }))
  }
})

test('analytics strips query/hash contents and drops private and unknown paths', () => {
  const paths = ['/', '/contact', '/plan']
  assert.deepEqual(policy.redactAnalyticsEvent({ type: 'pageview', url: 'https://preview.vercel.app/contact/?email=private@example.com#name' }, paths, 'https://www.afarhorizon.com'), { type: 'pageview', url: 'https://www.afarhorizon.com/contact' })
  for (const url of ['/admin', '/login', '/unknown-personal-name', 'mailto:private@example.com', 'not://valid']) {
    assert.equal(policy.redactAnalyticsEvent({ url }, paths, 'https://www.afarhorizon.com'), null)
  }
})

test('conversion events use only public pages and categories, with at most two properties', () => {
  const events = load('@/lib/analytics/events')
  const received = []
  const previous = global.window
  global.window = { location: new URL('https://www.afarhorizon.com/expeditions/test-trip?email=private@example.com') }
  try {
    events.configureConversionTracking((name, data) => received.push({ name, data }), ['/expeditions/test-trip', '/contact'])
    events.trackEnquiryCompletion('journey')
    events.trackEnquiryCompletion('partner')
    events.trackContactIntent('mailto:private@example.com?body=secret')
    events.trackContactIntent('tel:+123456789')
    events.trackContactIntent('https://wa.me/123456789?text=secret')
    events.trackContactIntent('https://example.com')
    events.trackPackageEnquiryIntent('#enquire')
    events.trackPackageEnquiryIntent('/plan?email=private@example.com')
    events.trackPackageEnquiryIntent('https://other.example/contact')
    assert.deepEqual(received.map(item => item.name), ['enquiry_submitted', 'enquiry_submitted', 'contact_intent', 'contact_intent', 'contact_intent', 'package_enquiry_intent', 'package_enquiry_intent'])
    assert.deepEqual(received[2].data, { channel: 'email', page: '/expeditions/test-trip' })
    for (const item of received) assert.ok(Object.keys(item.data).length <= 2)
    assert.ok(!JSON.stringify(received).includes('private'))
    global.window.location = new URL('https://www.afarhorizon.com/admin')
    events.trackEnquiryCompletion('journey')
    assert.equal(received.length, 7)
    events.configureConversionTracking(null, ['/contact'])
    global.window.location = new URL('https://www.afarhorizon.com/contact')
    events.trackEnquiryCompletion('journey')
    assert.equal(received.length, 7)
  } finally { events.configureConversionTracking(null, []); global.window = previous }
})

const submission = createLoader({ '../api/enquiry.api': { submitContact: async () => {} } })('@/features/enquiries/utils/submission')
const payload = { name: 'Test', email: 'test@example.invalid', message: 'Local test only' }

test('concurrent submits share a request and accepted submissions count once', async () => {
  let resolve, sends = 0
  const completions = []
  const submit = submission.createEnquirySubmission(() => { sends++; return new Promise(done => { resolve = done }) }, kind => completions.push(kind))
  const first = submit(payload, 'partner')
  assert.equal(submit(payload, 'partner'), first)
  assert.equal(sends, 1)
  assert.deepEqual(completions, [])
  resolve()
  await first
  await submit(payload, 'partner')
  assert.equal(sends, 1)
  assert.deepEqual(completions, ['partner'])
})

test('failed requests count nothing, permit retry, and reporting errors preserve success', async () => {
  let sends = 0, completed = 0
  const submit = submission.createEnquirySubmission(async () => { if (++sends === 1) throw new Error('Backend rejected') }, () => { completed++; throw new Error('Analytics unavailable') })
  await assert.rejects(submit(payload), /Backend rejected/)
  assert.equal(completed, 0)
  await submit(payload)
  assert.equal(completed, 1)
  await submit(payload)
  assert.equal(sends, 2)
})

test('HTTP 200 with a rejected API envelope never counts as an accepted enquiry', async () => {
  const previous = global.fetch
  let completed = 0
  const realSubmission = createLoader()('@/features/enquiries/utils/submission')
  const submit = realSubmission.createEnquirySubmission(undefined, () => { completed++ })
  try {
    global.fetch = async () => new Response(JSON.stringify({ success: false, message: 'Not accepted' }), { status: 200 })
    await assert.rejects(submit(payload), /Not accepted/)
    assert.equal(completed, 0)
    global.fetch = async () => new Response(JSON.stringify({ success: true, data: null }), { status: 200 })
    await submit(payload)
    assert.equal(completed, 1)
  } finally { global.fetch = previous }
})
