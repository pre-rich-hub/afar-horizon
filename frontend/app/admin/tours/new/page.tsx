import { AdminTourNew } from '@/features/admin'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'New Tour',
  robots: { index: false, follow: false },
}

export default function AdminTourNewPage() {
  return <AdminTourNew />
}
