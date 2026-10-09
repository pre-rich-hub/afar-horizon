import { AdminTours } from '@/features/admin'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tours',
  robots: { index: false, follow: false },
}

export default function AdminToursPage() {
  return <AdminTours />
}
