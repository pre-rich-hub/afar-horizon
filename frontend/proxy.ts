import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { site } from '@/lib/config/site'

export function proxy(request: NextRequest) {
  const response = NextResponse.next()
  const path = request.nextUrl.pathname
  if (!site.indexable || path === '/login' || path === '/admin' || path.startsWith('/admin/')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  } else if (path === '/plan' || path === '/photo-credits') {
    response.headers.set('X-Robots-Tag', 'noindex, follow')
  }
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
}
