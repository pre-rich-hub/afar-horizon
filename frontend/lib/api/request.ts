// JSON transport for the public API. Domain endpoints live in features.

const REQUEST_TIMEOUT_MS = 5_000

type ApiEnvelope<T> = {
  success: boolean
  message?: string
  data?: T
}

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
  })

  let envelope: ApiEnvelope<T> | undefined
  try {
    envelope = (await response.json()) as ApiEnvelope<T>
  } catch {
    // Non-JSON error body (proxy down, HTML error page, …)
  }

  if (!response.ok || !envelope?.success) {
    throw new Error(envelope?.message ?? `Request failed (${response.status})`)
  }

  return envelope.data as T
}

export function queryString(params: Record<string, unknown> = {}): string {
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      search.set(key, String(value))
    }
  }
  const qs = search.toString()
  return qs ? `?${qs}` : ''
}
