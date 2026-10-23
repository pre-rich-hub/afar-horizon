import { promises } from '@/lib/constants/company'
import { destinationImageBase } from '@/lib/config/cloudinary'

export const promiseImages = [
  { image: `${destinationImageBase}/afar.png`, alt: 'Afar region, Ethiopia' },
  { image: `${destinationImageBase}/danakil-depression.png`, alt: 'Dallol in the Danakil Depression' },
  { image: `${destinationImageBase}/gheralta.png`, alt: 'Gheralta in the northern Ethiopian highlands' },
  { image: `${destinationImageBase}/hamed-ela.png`, alt: 'Hamed Ela in the Danakil Depression' },
  { image: `${destinationImageBase}/simien-mountains.png`, alt: 'Simien Mountains, Ethiopia' },
  { image: `${destinationImageBase}/erta-ale.png`, alt: 'Erta Ale, Ethiopia' },
  { image: `${destinationImageBase}/lake-afdera.png`, alt: 'Lake Afdera, Ethiopia' },
  { image: `${destinationImageBase}/lake-assale.png`, alt: 'Lake Assale, Ethiopia' },
  { image: `${destinationImageBase}/semera.png`, alt: 'Semera, Ethiopia' },
  { image: `${destinationImageBase}/dallol.png`, alt: 'Dallol, Ethiopia' },
]

// Rotate all ten photographs through the brand promises.
export const slides = promiseImages.map((photo, i) => ({ ...promises[i % promises.length], ...photo }))

export const LAYERS = [
  { x: 0, scale: 1, opacity: 1 },
  { x: 50, scale: 0.8, opacity: 1 },
  { x: 72, scale: 0.62, opacity: 1 },
  { x: 72, scale: 0.5, opacity: 0 },
]

export const AUTOPLAY_MS = 6000
