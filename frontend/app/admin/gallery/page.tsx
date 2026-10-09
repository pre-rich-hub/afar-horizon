import { AdminGallery } from '@/features/admin'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery',
  robots: { index: false, follow: false },
}

export default function AdminGalleryPage() {
  return <AdminGallery />
}
