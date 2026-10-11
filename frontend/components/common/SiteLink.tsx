'use client'

import Link from 'next/link'
import type { ComponentProps } from 'react'
import { TranslationBoundary, useSiteTranslation } from './TranslationBoundary'
import { translatedHref } from '@/lib/i18n/translate'

// Resolve the language at the final link render, including server-composed children.
export default function SiteLink(props: ComponentProps<typeof Link> & { 'data-locale-link'?: boolean }) {
  const { locale, paths } = useSiteTranslation()
  const href = typeof props.href === 'string' && !props['data-locale-link']
    ? translatedHref(props.href, locale, paths)
    : props.href
  return <Link {...props} href={href}><TranslationBoundary>{props.children}</TranslationBoundary></Link>
}
