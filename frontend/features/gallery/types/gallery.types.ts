export type GalleryCategory = 'Landscapes' | 'Heritage' | 'Culture' | 'Wildlife' | 'Stays'

export type GalleryPhoto = {
  src: string
  alt: string
  title: string
  location: string
  category: GalleryCategory
  caption: string
  /** Frame used in the grid; the lightbox always shows the full image. */
  shape: 'portrait' | 'landscape' | 'square'
}
