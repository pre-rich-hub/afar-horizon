import { promises } from '@/lib/constants/company'
import { destinationImageBase } from '@/lib/config/cloudinary'

export const promiseImages = [
  { image: `${destinationImageBase}/afar.png`, alt: 'Afar region, Ethiopia' },
  { image: `${destinationImageBase}/danakil-depression.png`, alt: 'Dallol in the Danakil Depression' },
  { image: `${destinationImageBase}/gheralta.png`, alt: 'Gheralta in the northern Ethiopian highlands' },
  { image: `${destinationImageBase}/hamed-ela.png`, alt: 'Hamed Ela in the Danakil Depression' },
  { image: `${destinationImageBase}/simien-mountains.png`, alt: 'Simien Mountains, Ethiopia' },
]

export const slides = promises.map((p, i) => ({ ...p, ...promiseImages[i % promiseImages.length] }))

export const LAYERS = [
  { x: 0, scale: 1, opacity: 1 },
  { x: 50, scale: 0.8, opacity: 1 },
  { x: 72, scale: 0.62, opacity: 1 },
  { x: 72, scale: 0.5, opacity: 0 },
]

export const AUTOPLAY_MS = 6000
