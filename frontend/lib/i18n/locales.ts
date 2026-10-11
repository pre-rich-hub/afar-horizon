export const languages = [
  { locale: 'en', code: 'EN', label: 'English' },
  { locale: 'es', code: 'ES', label: 'Español' },
  { locale: 'fr', code: 'FR', label: 'Français' },
  { locale: 'de', code: 'DE', label: 'Deutsch' },
  { locale: 'zh-Hans', code: 'ZH', label: '简体中文' },
] as const
export type Locale = typeof languages[number]['locale']
export type DraftLocale = Exclude<Locale, 'en'>
export const draftLocales: DraftLocale[] = ['fr', 'es', 'de', 'zh-Hans']

export function isLocale(value: string): value is Locale {
  return languages.some(language => language.locale === value)
}

// Add only client-reviewed routes. Drafts must never advertise published alternates.
export const approvedTranslations: Record<DraftLocale, readonly string[]> = {
  fr: [], es: [], de: [], 'zh-Hans': [],
}

export function splitLocalePath(path: string): { locale: Locale; path: string } {
  const [first, ...rest] = path.slice(1).split('/')
  return isLocale(first) && first !== 'en'
    ? { locale: first, path: rest.length ? `/${rest.join('/')}` : '/' }
    : { locale: 'en', path }
}

export function localePath(path: string, locale: Locale) {
  if (!path.startsWith('/') || path.startsWith('//') || path.includes('\\')) throw new Error('Locale paths must be internal absolute paths.')
  const original = splitLocalePath(path).path
  return locale === 'en' ? original : `/${locale}${original === '/' ? '' : original}`
}

export function isApprovedTranslation(locale: Locale, path: string) {
  return locale === 'en' || approvedTranslations[locale].includes(splitLocalePath(path).path)
}

export function languageAlternates(path: string, origin: string) {
  const original = splitLocalePath(path).path
  const approved = draftLocales.filter(locale => isApprovedTranslation(locale, original))
  if (!approved.length) return undefined
  return Object.fromEntries([
    ['en', new URL(original, origin).href], ['x-default', new URL(original, origin).href],
    ...approved.map(locale => [locale, new URL(localePath(original, locale), origin).href]),
  ])
}
