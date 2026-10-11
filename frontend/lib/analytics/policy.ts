export function safeAnalyticsPath(url: string, paths: readonly string[]): string | null {
  try {
    const parsed = new URL(url, 'https://www.afarhorizon.com')
    if (!['http:', 'https:'].includes(parsed.protocol)) return null
    const path = parsed.pathname === '/' ? '/' : parsed.pathname.replace(/\/$/, '')
    return paths.includes(path) ? path : null
  } catch { return null }
}

// Strip query/hash data; ignore private and unknown paths rather than guessing.
export function redactAnalyticsEvent<T extends { url: string }>(event: T, paths: readonly string[], origin: string): T | null {
  const path = safeAnalyticsPath(event.url, paths)
  return path ? { ...event, url: new URL(path, origin).href } : null
}
