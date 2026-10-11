'use client'

import type { ImageLoaderProps } from 'next/image'

// Preserve the upload version, public ID and aspect ratio. CSS owns the crop.
export default function cloudinaryLoader({ src, width }: ImageLoaderProps): string {
  const base = 'https://res.cloudinary.com/xsrr0wfh/image/upload/'
  if (!src.startsWith(base)) return src
  return `${base}f_auto,q_auto,c_limit,w_${width}/${src.slice(base.length)}`
}
