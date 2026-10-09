export type AdminApiEnvelope<T> = {
  success: boolean
  message: string
  data: T
  errors?: Array<{ path?: string; message: string }>
}

export async function adminRequest<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const response = await fetch(path, {
    ...init,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      ...init.headers,
    },
  })

  const payload = (await response.json().catch(() => null)) as AdminApiEnvelope<T> | null

  if (!response.ok || !payload?.success) {
    const detail = payload?.errors?.map((error) => error.message).join(', ')
    const statusMessage =
      response.status === 413
        ? 'The selected images are too large. Use files no larger than 4 MB each.'
        : response.status === 401
          ? 'Your admin session has expired. Sign in and try again.'
          : 'The request could not be completed.'
    throw new Error(detail || payload?.message || statusMessage)
  }

  return payload.data
}
