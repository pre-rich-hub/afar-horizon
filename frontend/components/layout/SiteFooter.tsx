import { useTranslations } from 'next-intl'

import {
FacebookIcon,
GetYourGuideMark,
InstagramIcon,
MastercardMark,
PayPalMark,
SafariBookingsMark,
TikTokIcon,
TripadvisorMark,
ViatorMark,
VisaMark,
XIcon,
YouTubeIcon,
} from '@/components/common/BrandMarks'
import { useDestinationsCopy, destinations as baseDestinations } from '@/features/destinations'
import { NewsletterForm } from '@/features/newsletter'
import { useToursCopy, expeditionCollections as baseExpeditionCollections } from '@/features/tours'
import { contact } from '@/lib/constants/company'
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import Link from '@/components/common/SiteLink'

// Social links, shown as brand marks on white discs.
const socials: { name: string; href: string; icon: React.ReactNode }[] = [
  {
    name: 'Instagram',
    href: '#',
    icon: <InstagramIcon />,
  },
  {
    name: 'YouTube',
    href: '#',
    icon: <YouTubeIcon />,
  },
  {
    name: 'Facebook',
    href: '#',
    icon: <FacebookIcon />,
  },
  {
    name: 'TikTok',
    href: '#',
    icon: <TikTokIcon />,
  },
  {
    name: 'X',
    href: '#',
    icon: <XIcon />,
  },
]



// Logo tiles: brand marks are set in type and simple shapes on light cards.
const logoTile =
  'flex h-[72px] items-center justify-center rounded-md bg-ivory px-3 shadow-[0_10px_24px_-16px_black] transition-transform duration-300 hover:-translate-y-0.5'

const platforms: { name: string; href: string; mark: React.ReactNode }[] = [
  {
    name: 'Viator',
    href: '#',
    mark: <ViatorMark />,
  },
  {
    name: 'Tripadvisor',
    href: '#',
    mark: <TripadvisorMark />,
  },
  {
    name: 'SafariBookings',
    href: '#',
    mark: <SafariBookingsMark />,
  },
  {
    name: 'GetYourGuide',
    href: '#',
    mark: <GetYourGuideMark />,
  },
]

const payments: { name: string; mark: React.ReactNode }[] = [
  {
    name: 'Visa',
    mark: <VisaMark />,
  },
  {
    name: 'Mastercard',
    mark: <MastercardMark />,
  },
  {
    name: 'PayPal',
    mark: <PayPalMark />,
  },
]

export function SiteFooter() {
  const tr = useTranslations('UI.layout.SiteFooter')
  const destinations = useDestinationsCopy('destination.destinations', baseDestinations)
  const expeditionCollections = useToursCopy('tour.expeditionCollections', baseExpeditionCollections)
  const columns = [
    {
      title: tr('expeditions'),
      links: [
        ...expeditionCollections.map((c) => ({ label: c.title, href: `/expeditions#${c.id}` })),
        { label: tr('specialistTravel'), href: '/specialist-travel' },
        { label: tr('groundOperations'), href: '/ground-operations' },
        { label: tr('planMyJourney'), href: '/plan' },
      ],
      more: { label: tr('allExpeditions'), href: '/expeditions' },
    },
    {
      title: tr('destinations'),
      links: [
        'danakil-depression',
        'afar',
        'erta-ale',
        'dallol',
        'gheralta',
        'axum',
        'lalibela',
        'simien-mountains',
      ].map((slug) => {
        const d = destinations.find((x) => x.slug === slug)!
        return { label: d.name, href: `/destinations/${d.slug}` }
      }),
      more: { label: tr('allDestinations'), href: '/destinations' },
    },
    {
      title: tr('company'),
      links: [
        { label: tr('aboutUs'), href: '/about' },
        { label: tr('beforeYouGo'), href: '/before-you-go' },
        { label: tr('faq'), href: '/faq' },
        { label: tr('gallery'), href: '/gallery' },
        { label: tr('journal'), href: '/blog' },
        { label: tr('contact'), href: '/contact' },
      ],
    },
  ]

  return (
    <footer className="bg-charcoal text-background">
      <div className="shell pb-10 pt-16 sm:pt-20 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr_1fr_1fr] lg:gap-x-12 lg:gap-y-14">
          {/* Brand, contact and socials */}
          <div className="lg:row-span-2">
            <Link href="/" className="inline-flex" aria-label={tr('afarHorizonExpeditionsHome')}>
              <img
                src="/images/logo-light.webp"
                alt={tr('afarHorizonExpeditionsLogo')}
                width={520}
                height={341}
                className="h-28 w-auto object-contain"
              />
            </Link>
            <p className="mt-6 max-w-sm text-pretty text-[15px] leading-relaxed text-background/65">
              {tr('introducingTravellersToOneOfHumanityApos')}</p>

            <ul className="mt-8 space-y-4 text-[15px] text-background/80">
              <li className="flex items-start gap-3.5">
                <MapPin className="mt-0.5 h-[18px] w-[18px] shrink-0 text-accent" strokeWidth={1.6} />
                <span className="max-w-[30ch]">{tr('address')}</span>
              </li>
              <li>
                <a
                  href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}
                  className="flex items-center gap-3.5 transition-colors hover:text-accent"
                >
                  <Phone className="h-[18px] w-[18px] shrink-0 text-accent" strokeWidth={1.6} />
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3.5 transition-colors hover:text-accent"
                >
                  <Mail className="h-[18px] w-[18px] shrink-0 text-accent" strokeWidth={1.6} />
                  {contact.email}
                </a>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-[0_8px_20px_-10px_black] transition-transform duration-300 hover:-translate-y-1"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="mb-6 font-sans text-[12px] font-semibold uppercase tracking-[0.26em] text-accent">
                {col.title}
              </h3>
              <ul className="space-y-4">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[15px] text-background/80 transition-colors duration-300 hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {col.more && (
                <Link
                  href={col.more.href}
                  className="group mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.22em] text-accent transition-colors hover:text-sand"
                >
                  {col.more.label}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              )}
            </nav>
          ))}

          {/* Newsletter, spanning the link columns */}
          <div className="flex flex-col gap-6 lg:col-span-3 lg:col-start-2 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-md">
              <p className="font-serif text-[1.9rem] leading-tight text-background">
                {tr('continueExploringEthiopia')}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-background/65">
                {tr('curatedTravelStoriesAndSeasonalInspirationFrom')}</p>
            </div>
            <NewsletterForm />
          </div>
        </div>

        {/* Review platforms + accepted payments */}
        <div className="mt-16 grid gap-12 border-t border-background/15 pt-14 lg:grid-cols-[4fr_3fr] lg:gap-14">
          <div>
            <p className="font-serif text-[1.9rem] leading-tight text-background">
              {tr('trustedTravelPlatforms')}</p>
            <p className="mt-2 text-[15px] text-background/60">
              {tr('findAndReviewUsWhereSeasonedTravellers')}</p>
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {platforms.map((p) => (
                <li key={p.name}>
                  <a href={p.href} aria-label={p.name} className={logoTile}>
                    {p.mark}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-serif text-[1.9rem] leading-tight text-background">
              {tr('weAccept')}</p>
            <p className="mt-2 text-[15px] text-background/60">
              {tr('securePaymentsByCardOrPaypal')}</p>
            <ul className="mt-6 grid grid-cols-3 gap-3">
              {payments.map((p) => (
                <li key={p.name} aria-label={p.name} className={logoTile}>
                  {p.mark}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 grid gap-4 border-t border-background/15 pt-8 text-[13px] text-background/50 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8">
          <p>
            {tr('copy')}{' '}{new Date().getFullYear()} {tr('afarHorizonExpeditionsAllRightsReserved')}</p>
          <p className="text-[15px] text-background/70 md:text-center">
            {tr('builtBy')}{' '}
            <a
              href="https://melba.et"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-background transition-colors hover:text-accent"
            >
              {tr('melbaTechnology')}</a>
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-2 md:justify-end">
            <Link href="/privacy" className="transition-colors hover:text-background/85">
              {tr('privacyPolicy')}</Link>
            <Link href="/terms" className="transition-colors hover:text-background/85">
              {tr('termsAmpConditions')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
