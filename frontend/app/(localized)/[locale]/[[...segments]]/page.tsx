import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { destinations } from '@/features/destinations'
import { tours } from '@/features/tours'
import { posts } from '@/features/blog'
import { indexableStaticRoutes } from '@/lib/seo/routes'
import { draftLocales, isLocale } from '@/lib/i18n/locales'
import { getMessages } from '@/lib/i18n/messages'
import { localizedMetadata } from '@/lib/i18n/metadata'
import { site } from '@/lib/config/site'
import { TranslationProvider } from '@/components/common/TranslationBoundary'
import * as Home from '../../../(site)/page'
import * as About from '../../../(site)/about/page'
import * as Contact from '../../../(site)/contact/page'
import * as BeforeYouGo from '../../../(site)/before-you-go/page'
import * as Faq from '../../../(site)/faq/page'
import * as Gallery from '../../../(site)/gallery/page'
import * as GroundOperations from '../../../(site)/ground-operations/page'
import * as SpecialistTravel from '../../../(site)/specialist-travel/page'
import * as DestinationIndex from '../../../(site)/destinations/page'
import * as ExpeditionIndex from '../../../(site)/expeditions/page'
import * as BlogIndex from '../../../(site)/blog/page'
import * as Privacy from '../../../(site)/privacy/page'
import * as Terms from '../../../(site)/terms/page'
import * as Plan from '../../../(site)/plan/page'
import * as Destination from '../../../(site)/destinations/[slug]/page'
import * as Expedition from '../../../(site)/expeditions/[slug]/page'
import * as Article from '../../../(site)/blog/[slug]/page'

// Reuse the existing route compositions and feature UI for every language.
// Private/auth/API routes deliberately have no translated entry point.
type Props = { params: Promise<{ locale: string; segments?: string[] }>; searchParams: Promise<Record<string, string | string[] | undefined>> }
type Route = { default: (props: { params: Promise<{ slug: string }>; searchParams: Props['searchParams'] }) => ReactNode | Promise<ReactNode>; metadata?: Metadata; generateMetadata?: (props: { params: Promise<{ slug: string }> }) => Promise<Metadata> }
const staticPages = {
  '/': Home, '/about': About, '/contact': Contact, '/before-you-go': BeforeYouGo,
  '/faq': Faq, '/gallery': Gallery, '/ground-operations': GroundOperations,
  '/specialist-travel': SpecialistTravel, '/destinations': DestinationIndex,
  '/expeditions': ExpeditionIndex, '/blog': BlogIndex, '/privacy': Privacy,
  '/terms': Terms, '/plan': Plan,
} as unknown as Record<string, Route>
const routes = [
  ...indexableStaticRoutes, '/plan',
  ...destinations.map(item => `/destinations/${item.slug}`),
  ...tours.map(item => `/expeditions/${item.slug}`),
  ...posts.map(item => `/blog/${item.slug}`),
]
export const dynamicParams = false

export function generateStaticParams() {
  return draftLocales.flatMap(locale => routes.map(path => ({ locale, segments: path === '/' ? [] : path.slice(1).split('/') })))
}

async function resolve(params: Props['params']) {
  const { locale, segments = [] } = await params
  const path = `/${segments.join('/')}`
  if (!isLocale(locale) || locale === 'en' || !routes.includes(path)) notFound()
  const route = staticPages[path] ?? (segments[0] === 'destinations' ? Destination : segments[0] === 'expeditions' ? Expedition : Article) as Route
  return { locale, path, route, pageParams: Promise.resolve({ slug: segments[1] ?? '' }) }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, path, route, pageParams } = await resolve(params)
  const source = route.generateMetadata ? await route.generateMetadata({ params: pageParams }) : route.metadata!
  return localizedMetadata(source, locale, path, await getMessages(locale), site.url)
}

export default async function LocalizedPage({ params, searchParams }: Props) {
  const { locale, path, route, pageParams } = await resolve(params)
  return <TranslationProvider locale={locale} messages={await getMessages(locale, path)} paths={routes} origin={site.url}>
    {await route.default({ params: pageParams, searchParams })}
  </TranslationProvider>
}
