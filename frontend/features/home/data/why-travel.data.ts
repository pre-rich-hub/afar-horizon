import { promises } from '@/lib/constants/company'

export const promiseImages = [
  { image: '/images/addis-skyline.png', alt: 'Addis Ababa at dusk from the Entoto hills' },
  { image: '/images/textile.png', alt: 'A weaver working cotton on a traditional loom' },
  { image: '/images/hero-lalibela.png', alt: 'The rock-hewn Church of St George in Lalibela at dawn' },
  { image: '/images/coffee-ceremony.png', alt: 'Coffee poured from a jebena during a coffee ceremony' },
]

export const slides = [
  ...promises.map((p, i) => ({ ...p, ...promiseImages[i] })),
  {
    title: 'Timed to the light and the calendar',
    text: 'We plan around feast days, harvests and the hours when the highlands glow — so you arrive where the moment is, not where the crowd is.',
    image: '/images/hero-simien.png',
    alt: 'Mist rolling through the Simien Mountains at sunrise',
  },
  {
    title: 'Rest as considered as the route',
    text: 'Lodges and guesthouses chosen for their character and their quiet, so each day ends somewhere worth waking up in.',
    image: '/images/luxury-lodge.png',
    alt: 'A stone lodge terrace overlooking clouded mountains',
  },
]

export const LAYERS = [
  { x: 0, scale: 1, opacity: 1 },
  { x: 50, scale: 0.8, opacity: 1 },
  { x: 72, scale: 0.62, opacity: 1 },
  { x: 72, scale: 0.5, opacity: 0 },
]

export const AUTOPLAY_MS = 6000
