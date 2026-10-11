'use client'

import { cloneElement, createContext, isValidElement, useContext, type ReactNode, type ReactElement } from 'react'
import { type Locale } from '@/lib/i18n/locales'
import { translateText, translatedHref, type Messages } from '@/lib/i18n/translate'

type Translation = { locale: Locale; messages: Messages; paths: string[]; origin: string }
const TranslationContext = createContext<Translation>({ locale: 'en', messages: {}, paths: [], origin: 'https://www.afarhorizon.com' })

export function TranslationProvider({ children, ...value }: Translation & { children: ReactNode }) {
  const parent = useContext(TranslationContext)
  const messages = parent.locale === value.locale ? { ...parent.messages, ...value.messages } : value.messages
  return <TranslationContext.Provider value={{ ...value, messages }}>{children}</TranslationContext.Provider>
}

export const useSiteTranslation = () => useContext(TranslationContext)

// Translate rendered text/accessible labels without changing elements, events,
// CSS, IDs, form values, route slugs, catalogue matching or application state.
export function TranslationBoundary({ children }: { children: ReactNode }) {
  const { locale, messages, paths } = useSiteTranslation()
  if (locale === 'en') return children
  const visit = (node: ReactNode): ReactNode => {
    if (typeof node === 'string') return translateText(node, messages)
    if (Array.isArray(node)) return node.map(visit)
    if (!isValidElement(node)) return node
    const element = node as ReactElement<Record<string, unknown>>
    if (element.props['data-no-translate'] || element.props.translate === 'no') return node
    const props: Record<string, unknown> = {}
    for (const key of ['alt', 'title', 'placeholder', 'aria-label', 'aria-description']) {
      if (typeof element.props[key] === 'string') props[key] = translateText(element.props[key], messages)
    }
    if (typeof element.props.href === 'string' && !element.props['data-locale-link']) props.href = translatedHref(element.props.href, locale, paths)
    if ('children' in element.props) props.children = visit(element.props.children as ReactNode)
    return cloneElement(element, props)
  }
  return visit(children)
}
