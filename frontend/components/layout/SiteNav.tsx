'use client'
import { TranslationBoundary } from '@/components/common/TranslationBoundary'


import { destinationGroups, destinationsInGroup, getDestination } from '@/features/destinations'
import { expeditionCollections, tours } from '@/features/tours'
import { contact } from '@/lib/constants/company'
import { navLinks, planJourneyLink } from '@/lib/constants/navigation'
import { cn } from '@/lib/utils'
import {
ArrowRight,
Camera,
Check,
ChevronDown,
Globe,
Handshake,
type LucideIcon,
Mail,
Menu,
Phone,
X,
} from 'lucide-react'
import Link from '@/components/common/SiteLink'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { languages, localePath, splitLocalePath } from '@/lib/i18n/locales'
import { useSiteTranslation } from '@/components/common/TranslationBoundary'
import { useEffect, useRef, useState } from 'react'

// Cards shown in the desktop dropdowns: the signature expeditions and one
// destination from each part of the north.
const navExpeditions = ['danakil-deep', 'danakil-and-gheralta', 'northern-ethiopia-grand-horizon']
  .map((slug) => tours.find((t) => t.slug === slug))
  .filter((t) => t !== undefined)
const navDestinations = ['danakil-depression', 'dallol', 'gheralta', 'lalibela']
  .map((slug) => getDestination(slug))
  .filter((d) => d !== undefined)

// Icons for the small 'links' dropdown, keyed by child href.
const linkIcons: Record<string, LucideIcon> = {
  '/specialist-travel': Camera,
  '/ground-operations': Handshake,
}

function Wordmark({
  tone,
  onClick,
}: {
  tone: 'light' | 'dark'
  onClick?: () => void
}) {
  return (
    <TranslationBoundary><Link
      href="/"
      onClick={onClick}
      aria-label="Afar Horizon Expeditions — home"
      className="flex items-center"
    >
      <img
        src={tone === 'light' ? '/images/logo-light.webp' : '/images/logo.webp'}
        alt="Afar Horizon Expeditions Logo"
        width={520}
        height={341}
        className="h-12 w-auto object-contain transition-transform duration-300 hover:scale-105 sm:h-14"
      />
    </Link></TranslationBoundary>
  )
}

export function SiteNav() {
  const currentPath = usePathname()
  const pathname = splitLocalePath(currentPath).path
  const { locale, paths } = useSiteTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  // Desktop dropdown hidden after a click until the pointer leaves its item.
  const [closedMenu, setClosedMenu] = useState<string | null>(null)
  const [urlSuffix, setUrlSuffix] = useState('')
  const lang = languages.find(language => language.locale === locale) ?? languages[0]
  const langRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => setUrlSuffix(window.location.search + window.location.hash)
    update()
    window.addEventListener('hashchange', update)
    return () => window.removeEventListener('hashchange', update)
  }, [currentPath, langOpen, open])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setLangOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        setLangOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const tone: 'light' | 'dark' = scrolled ? 'dark' : 'light'

  return (
    <TranslationBoundary><>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled
            ? 'border-b border-border bg-background/92 backdrop-blur-xl'
            : 'bg-gradient-to-b from-charcoal/55 to-transparent',
        )}
      >
        <nav
          className={cn(
            'shell flex items-center justify-between transition-all duration-500',
            scrolled ? 'h-16 sm:h-[68px]' : 'h-[68px] sm:h-20',
          )}
        >
          <Wordmark tone={open ? 'dark' : tone} />

          <ul className="ml-auto mr-4 hidden items-center gap-3.5 lg:flex xl:mr-8 xl:gap-6 2xl:gap-8">
            {navLinks.map((link) => {
              const active = isActive(link.href)
              const hasDropdown = Boolean(link.menu)
              return (
                <TranslationBoundary key={link.href}><li
                  key={link.href}
                  className={cn('py-5', closedMenu !== link.href && 'group')}
                  onClick={(e) => {
                    if (!link.menu || !(e.target as Element).closest('a')) return
                    setClosedMenu(link.href)
                    ;(document.activeElement as HTMLElement | null)?.blur()
                  }}
                  onMouseLeave={() => setClosedMenu(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'relative flex items-center gap-1 whitespace-nowrap py-2 text-[10.5px] font-semibold uppercase tracking-[0.1em] transition-colors duration-300 xl:text-[11px] xl:tracking-[0.14em]',
                      tone === 'dark'
                        ? active
                          ? 'text-foreground'
                          : 'text-foreground/65 hover:text-foreground'
                        : active
                          ? 'text-background'
                          : 'text-background/75 hover:text-background',
                    )}
                  >
                    {link.label}
                    {hasDropdown && (
                      <ChevronDown className="h-3 w-3 transition-transform duration-300 group-hover:rotate-180" />
                    )}
                    <span
                      className={cn(
                        'absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-300',
                        active ? 'w-full' : 'w-0 group-hover:w-full',
                      )}
                    />
                  </Link>

                  {/* Dropdowns */}
                  {link.menu === 'destinations' && (
                    <div className="absolute left-0 top-full w-full bg-background/98 backdrop-blur-2xl border-t border-accent/25 border-b border-border/80 shadow-2xl opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto z-45 text-foreground">
                      <div className="shell grid grid-cols-[1fr_3.2fr] gap-12 py-10">
                        <div className="flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent mb-2 block">Afar · Tigray · Amhara</span>
                            <h3 className="font-serif text-2xl text-foreground mb-4">Our Destinations</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              From the salt and volcanoes of the Danakil to the cliff churches, ancient kingdoms and mountains of the north.
                            </p>
                            <ul className="mt-6 space-y-2.5 border-t border-border pt-5">
                              {destinationGroups.map((g) => (
                                <TranslationBoundary key={g.id}><li key={g.id}>
                                  <Link
                                    href={`/destinations#${g.id}`}
                                    className="flex items-baseline justify-between gap-3 text-[13px] text-foreground/80 transition-colors hover:text-accent"
                                  >
                                    {g.title}
                                    <span className="text-[10px] text-muted-foreground">{destinationsInGroup(g.id).length}</span>
                                  </Link>
                                </li></TranslationBoundary>
                              ))}
                            </ul>
                          </div>
                          <Link
                            href="/destinations"
                            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent hover:text-accent/80 transition-colors mt-6"
                          >
                            View All Destinations <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>

                        <div className="grid grid-cols-4 gap-6">
                          {navDestinations.map((d) => (
                            <TranslationBoundary key={d.slug}><Link
                              key={d.slug}
                              href={`/destinations/${d.slug}`}
                              className="group/item flex flex-col gap-3.5 rounded-lg overflow-hidden p-2.5 transition-all duration-300 hover:bg-muted/50"
                            >
                              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[4px]">
                                <Image
                                  src={d.image}
                                  alt={d.name}
                                  fill
                                  sizes="(max-width: 1024px) 25vw, 240px"
                                  className="object-cover transition-transform duration-700 group-hover/item:scale-105"
                                />
                                <span className="absolute left-2.5 top-2.5 rounded-full bg-charcoal/80 backdrop-blur-md px-3 py-1 text-[9px] font-semibold uppercase tracking-wider text-background">
                                  {d.tag}
                                </span>
                              </div>
                              <div>
                                <h4 className="font-serif text-[14px] text-foreground group-hover/item:text-accent transition-colors duration-300">
                                  {d.name}
                                </h4>
                                <p className="text-[10px] text-muted-foreground mt-0.5 block tracking-[0.06em] font-medium uppercase">
                                  {d.region}
                                </p>
                                <p className="text-[11px] text-muted-foreground/80 mt-1 line-clamp-2 leading-relaxed">
                                  {d.teaser}
                                </p>
                              </div>
                            </Link></TranslationBoundary>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {link.menu === 'links' && link.children && (
                    <div className="absolute left-0 top-full w-full bg-background/98 backdrop-blur-2xl border-t border-accent/25 border-b border-border/80 shadow-2xl opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto z-45 text-foreground">
                      <div className="shell grid grid-cols-[1fr_3.2fr] gap-12 py-10">
                        <div className="flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent mb-2 block">Beyond the classic route</span>
                            <h3 className="font-serif text-2xl text-foreground mb-4">Specialist &amp; Partners</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              Bespoke expeditions for photographers, film crews and researchers, and trusted ground handling for tour operators and agencies.
                            </p>
                            <ul className="mt-6 space-y-2.5 border-t border-border pt-5">
                              {link.children.map((c) => (
                                <TranslationBoundary key={c.href}><li key={c.href}>
                                  <Link
                                    href={c.href}
                                    className="flex items-center justify-between gap-3 text-[13px] text-foreground/80 transition-colors hover:text-accent"
                                  >
                                    {c.label}
                                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                                  </Link>
                                </li></TranslationBoundary>
                              ))}
                            </ul>
                          </div>
                          <a
                            href={`mailto:${contact.email}`}
                            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent hover:text-accent/80 transition-colors mt-6"
                          >
                            <Mail className="h-3.5 w-3.5" /> Talk to Our Team
                          </a>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                          {link.children.map((c) => {
                            const Icon = linkIcons[c.href] ?? ArrowRight
                            return (
                              <TranslationBoundary key={c.href}><Link
                                key={c.href}
                                href={c.href}
                                className="group/item flex flex-col gap-3.5 rounded-lg overflow-hidden p-2.5 transition-all duration-300 hover:bg-muted/50"
                              >
                                <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[4px]">
                                  {c.image && (
                                    <Image
                                      src={c.image}
                                      alt={c.label}
                                      fill
                                      sizes="(max-width: 1024px) 40vw, 480px"
                                      className="object-cover transition-transform duration-700 group-hover/item:scale-105"
                                    />
                                  )}
                                  <span className="absolute left-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-charcoal/80 text-background backdrop-blur-md transition-colors duration-300 group-hover/item:bg-accent group-hover/item:text-accent-foreground">
                                    <Icon className="h-4 w-4" />
                                  </span>
                                </div>
                                <div className="flex items-start justify-between gap-3">
                                  <div>
                                    <h4 className="font-serif text-[16px] text-foreground group-hover/item:text-accent transition-colors duration-300">
                                      {c.label}
                                    </h4>
                                    {c.text && (
                                      <p className="text-[11px] text-muted-foreground/80 mt-1 leading-relaxed">{c.text}</p>
                                    )}
                                  </div>
                                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 -translate-x-1 text-accent opacity-0 transition-all duration-300 group-hover/item:translate-x-0 group-hover/item:opacity-100" />
                                </div>
                              </Link></TranslationBoundary>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {link.menu === 'expeditions' && (
                    <div className="absolute left-0 top-full w-full bg-background/98 backdrop-blur-2xl border-t border-accent/25 border-b border-border/80 shadow-2xl opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto z-45 text-foreground">
                      <div className="shell grid grid-cols-[1fr_3.2fr] gap-12 py-10">
                        <div className="flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent mb-2 block">Afar · Danakil · Northern Ethiopia</span>
                            <h3 className="font-serif text-2xl text-foreground mb-4">Our Expeditions</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              Private expeditions from one day to three weeks, operated by our own team on the ground.
                            </p>
                            <ul className="mt-6 space-y-2.5 border-t border-border pt-5">
                              {expeditionCollections.map((c) => (
                                <TranslationBoundary key={c.id}><li key={c.id}>
                                  <Link
                                    href={`/expeditions#${c.id}`}
                                    className="flex items-baseline justify-between gap-3 text-[13px] text-foreground/80 transition-colors hover:text-accent"
                                  >
                                    {c.title}
                                    <span className="whitespace-nowrap text-[10px] text-muted-foreground">{c.span}</span>
                                  </Link>
                                </li></TranslationBoundary>
                              ))}
                            </ul>
                          </div>
                          <Link
                            href="/expeditions"
                            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent hover:text-accent/80 transition-colors mt-6"
                          >
                            Explore All Expeditions <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                          {navExpeditions.map((t) => (
                            <TranslationBoundary key={t.slug}><Link
                              key={t.slug}
                              href={`/expeditions/${t.slug}`}
                              className="group/item flex flex-col gap-3.5 rounded-lg overflow-hidden p-2.5 transition-all duration-300 hover:bg-muted/50"
                            >
                              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[4px]">
                                <Image
                                  src={t.image}
                                  alt={t.title}
                                  fill
                                  sizes="(max-width: 1024px) 33vw, 320px"
                                  className="object-cover transition-transform duration-700 group-hover/item:scale-105"
                                />
                                <span className="absolute left-2.5 top-2.5 rounded-full bg-accent px-3 py-1 text-[9px] font-semibold uppercase tracking-wider text-primary-foreground">
                                  {t.days}
                                </span>
                              </div>
                              <div>
                                <h4 className="font-serif text-[14px] text-foreground group-hover/item:text-accent transition-colors duration-300 line-clamp-1">
                                  {t.title}
                                </h4>
                                <p className="text-[10px] text-muted-foreground mt-0.5 block tracking-[0.06em] font-medium uppercase">
                                  {t.style}
                                </p>
                                <p className="text-[11px] text-muted-foreground/80 mt-1 line-clamp-2 leading-relaxed">
                                  {t.teaser}
                                </p>
                                <div className="mt-2.5 flex items-center justify-between border-t border-border/60 pt-2">
                                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">From</span>
                                  <span className="text-xs font-bold text-accent">{t.from.split(' per ')[0]}</span>
                                </div>
                              </div>
                            </Link></TranslationBoundary>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </li></TranslationBoundary>
              )
            })}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <div ref={langRef} className="relative">
              <button
                aria-label="Change language"
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                onClick={() => setLangOpen((v) => !v)}
                className={cn(
                  'flex h-10 items-center gap-1.5 rounded-full px-3 transition-colors duration-300',
                  tone === 'dark'
                    ? 'text-foreground/70 hover:bg-muted'
                    : 'text-background/80 hover:bg-background/10',
                )}
              >
                <Globe className="h-[17px] w-[17px]" />
                <span className="text-[11px] font-semibold tracking-[0.1em]">
                  {lang.code}
                </span>
                <ChevronDown
                  className={cn(
                    'h-3.5 w-3.5 transition-transform duration-300',
                    langOpen && 'rotate-180',
                  )}
                />
              </button>

              <ul
                role="listbox"
                aria-label="Language"
                className={cn(
                  'absolute right-0 top-12 w-44 overflow-hidden rounded-sm border border-border bg-popover shadow-xl transition-all duration-200',
                  langOpen
                    ? 'pointer-events-auto translate-y-0 opacity-100'
                    : 'pointer-events-none -translate-y-1 opacity-0',
                )}
              >
                {languages.map((l) => (
                  <TranslationBoundary key={l.code}><li key={l.code}>
                    <a
                      translate="no"
                      data-locale-link
                      role="option"
                      aria-selected={l.code === lang.code}
                      href={localePath(paths.includes(pathname) ? pathname : '/', l.locale) + urlSuffix}
                      onClick={() => {
                        setLangOpen(false)
                      }}
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-popover-foreground/80 transition-colors duration-200 hover:bg-muted"
                    >
                      <span>{l.label}</span>
                      {l.code === lang.code && (
                        <Check className="h-4 w-4 text-accent" />
                      )}
                    </a>
                  </li></TranslationBoundary>
                ))}
              </ul>
            </div>

            <Link
              href={planJourneyLink.href}
              className="hidden items-center whitespace-nowrap rounded-full bg-accent px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent-foreground shadow-[0_8px_22px_-12px_oklch(0.705_0.098_76/0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-sand xl:inline-flex xl:-mr-[min(3.5rem,calc((100vw-1280px)/2+1rem))]"
            >
              {planJourneyLink.label}
            </Link>

            <button
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className={cn(
                'flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 lg:hidden',
                open
                  ? 'border-border text-foreground'
                  : tone === 'dark'
                    ? 'border-border text-foreground hover:bg-muted'
                    : 'border-background/30 text-background hover:bg-background/10',
              )}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 flex flex-col bg-background transition-all duration-500 lg:hidden',
          open
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        )}
        aria-hidden={!open}
      >
        <div className="flex-1 overflow-y-auto px-5 pb-8 pt-24 sm:px-6">
          <ul className="border-t border-border">
            {navLinks.map((link, i) => {
              const active = isActive(link.href)
              return (
                <TranslationBoundary key={link.href}><li key={link.href} className="border-b border-border">
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    style={{ transitionDelay: open ? `${120 + i * 55}ms` : '0ms' }}
                    className={cn(
                      'flex items-center justify-between gap-4 py-5 transition-all duration-500',
                      open
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-3 opacity-0',
                    )}
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="text-[10px] font-semibold tracking-[0.18em] text-accent">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={cn(
                          'font-serif text-3xl sm:text-4xl',
                          active ? 'text-primary' : 'text-foreground',
                        )}
                      >
                        {link.label}
                      </span>
                    </span>
                    <ArrowRight
                      className={cn(
                        'h-5 w-5 shrink-0',
                        active ? 'text-accent' : 'text-muted-foreground',
                      )}
                    />
                  </Link>
                  {link.children && (
                    <ul className="-mt-2 flex flex-wrap gap-x-5 gap-y-2 pb-5 pl-8">
                      {link.children.map((c) => (
                        <TranslationBoundary key={c.href}><li key={c.href}>
                          <Link
                            href={c.href}
                            onClick={() => setOpen(false)}
                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                          >
                            {c.label}
                          </Link>
                        </li></TranslationBoundary>
                      ))}
                    </ul>
                  )}
                </li></TranslationBoundary>
              )
            })}
          </ul>

          <div className="mt-8">
            <span className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <Globe className="h-3.5 w-3.5" />
              Language
            </span>
            <div className="flex flex-wrap gap-2">
              {languages.map((l) => (
                <TranslationBoundary key={l.code}><a
                  translate="no"
                  data-locale-link
                  href={localePath(paths.includes(pathname) ? pathname : '/', l.locale) + urlSuffix}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm transition-colors duration-200',
                    l.code === lang.code
                      ? 'border-accent bg-accent/10 text-foreground'
                      : 'border-border text-muted-foreground',
                  )}
                >
                  {l.label}
                </a></TranslationBoundary>
              ))}
            </div>
          </div>

          <div className="mt-8 space-y-2 border-t border-border pt-6 text-sm text-muted-foreground">
            <a
              href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}
              className="flex items-center gap-3"
            >
              <Phone className="h-4 w-4 text-accent" />
              {contact.phone}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-3"
            >
              <Mail className="h-4 w-4 text-accent" />
              {contact.email}
            </a>
          </div>
        </div>

        <div className="border-t border-border bg-background px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 sm:px-6">
          <Link
            href={planJourneyLink.href}
            onClick={() => setOpen(false)}
            className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-accent px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-foreground shadow-[0_12px_32px_-12px_oklch(0.705_0.098_76/0.7)] transition-all duration-300 hover:bg-sand"
          >
            {planJourneyLink.label}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </></TranslationBoundary>
  )
}
