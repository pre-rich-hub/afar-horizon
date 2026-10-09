export async function login(email: string, password: string): Promise<boolean> {
  const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })

      const data = await res.json()

return res.ok && data.success
}

export function logout() {
  return fetch('/api/v1/auth/logout', { method: 'POST', credentials: 'include' })
}
