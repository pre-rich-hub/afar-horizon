import { promises } from '@/lib/constants/company'

export const promiseImages = [
  { image: '/images/addis-skyline.png', alt: 'Addis Ababa at dusk from the Entoto hills' },
  { image: '/images/hero-danakil/dallol-aerial.jpg', alt: 'Hydrothermal fields at Dallol seen from above' },
  { image: '/images/coffee-ceremony.png', alt: 'Coffee poured from a jebena during a coffee ceremony' },
  { image: '/images/hero-danakil/salt-flats.jpg', alt: 'Salt crust stretching to the horizon in the Danakil' },
  { image: '/images/hero-simien.png', alt: 'Mist rolling through the Simien Mountains at sunrise' },
]

export const slides = promises.map((p, i) => ({ ...p, ...promiseImages[i % promiseImages.length] }))

export const LAYERS = [
  { x: 0, scale: 1, opacity: 1 },
  { x: 50, scale: 0.8, opacity: 1 },
  { x: 72, scale: 0.62, opacity: 1 },
  { x: 72, scale: 0.5, opacity: 0 },
]

export const AUTOPLAY_MS = 6000
