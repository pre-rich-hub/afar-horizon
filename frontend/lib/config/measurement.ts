type Environment = Record<string, string | undefined>

export function getMeasurementConfig(production: boolean, env: Environment = process.env) {
  for (const key of ['ANALYTICS_ENABLED', 'ANALYTICS_CUSTOM_EVENTS_ENABLED']) {
    if (env[key] && !['true', 'false'].includes(env[key]!)) throw new Error(`${key} must be true or false.`)
  }
  // Vercel provides this marker. Local builds and previews do not send analytics.
  const pageviews = production && env.VERCEL_ENV === 'production' && env.ANALYTICS_ENABLED !== 'false'
  return { pageviews, events: pageviews && env.ANALYTICS_CUSTOM_EVENTS_ENABLED === 'true' }
}

export function getGoogleVerification(env: Environment = process.env): string | undefined {
  const token = env.GOOGLE_SITE_VERIFICATION?.trim()
  if (!token) return undefined
  if (!/^[A-Za-z0-9_-]{10,256}$/.test(token)) throw new Error('GOOGLE_SITE_VERIFICATION must contain only the token from Google, not the HTML tag or a DNS record.')
  return token
}
