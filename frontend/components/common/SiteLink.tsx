'use client'
import Link from 'next/link'
import {useLocale} from 'next-intl'
import type {ComponentProps} from 'react'
import {localePath, type Locale} from '@/lib/i18n/locales'
export default function SiteLink(props: ComponentProps<typeof Link> & {'data-locale-link'?: boolean}) {
  const locale = useLocale() as Locale
  const href = typeof props.href === 'string' && props.href.startsWith('/') && !props.href.startsWith('//') && !/^\/(admin|login|api)(\/|[?#]|$)/.test(props.href) && !props['data-locale-link']
    ? localePath(props.href, locale) : props.href
  return <Link {...props} href={href} />
}
