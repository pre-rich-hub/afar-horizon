export function formatAdminDate(value: string | null | undefined): string {
  if (!value) return '—'
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value))
}

export function isoDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) !== value) {
    throw new Error('Editorial dates must be valid ISO calendar dates (YYYY-MM-DD).')
  }
  return value
}

export function formatEditorialDate(value: string) {
  return new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${isoDate(value)}T00:00:00Z`))
}
