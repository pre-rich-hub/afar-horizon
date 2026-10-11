import createMiddleware from 'next-intl/middleware'
import {NextResponse, type NextRequest} from 'next/server'
import {publicPaths} from '@/i18n/public-paths'
import {routing} from '@/i18n/routing'
import {site} from '@/lib/config/site'
import {splitLocalePath, isApprovedTranslation} from '@/lib/i18n/locales'
const handleLocale = createMiddleware(routing)
export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname
  const privateRoute = /^\/(admin|login|api)(\/|$)/.test(path)
  let response = privateRoute || path.includes('.') ? NextResponse.next() : handleLocale(request)
  const localized = splitLocalePath(path)
  // Set the status before any layout can stream: unknown catalogue records
  // must return 404 to browsers as well as crawlers. Render the known static
  // error route so strict static params never fall into a framework error.
  if (!privateRoute && !path.includes('.') && !publicPaths.has(localized.path)) {
    response = NextResponse.rewrite(new URL('/_not-found', request.url), {status: 404})
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    return response
  }
  if (!site.indexable || privateRoute || !isApprovedTranslation(localized.locale, localized.path)) response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  else if (localized.path === '/plan') response.headers.set('X-Robots-Tag', 'noindex, follow')
  return response
}
export const config = {matcher: ['/((?!_next|api|.*\\..*).*)']}
