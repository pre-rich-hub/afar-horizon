import { AdminTestimonials } from '@/features/admin'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Testimonials',
  robots: { index: false, follow: false },
}

export default function AdminTestimonialsPage() {
  return <AdminTestimonials />
}
