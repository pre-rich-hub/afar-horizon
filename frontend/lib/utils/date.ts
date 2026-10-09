export function formatAdminDate(value: string | null | undefined): string {
  if (!value) return '—'
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value))
}
