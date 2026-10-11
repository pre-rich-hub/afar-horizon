import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { site } from '@/lib/config/site'
import { splitLocalePath, isApprovedTranslation } from '@/lib/i18n/locales'

export function proxy(request: NextRequest) {
  const response = NextResponse.next()
  const path = request.nextUrl.pathname
  const localized = splitLocalePath(path)
  if (!site.indexable || !isApprovedTranslation(localized.locale, localized.path) || path === '/login' || path === '/admin' || path.startsWith('/admin/')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  } else if (localized.path === '/plan') {
    response.headers.set('X-Robots-Tag', 'noindex, follow')
  }
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
}
