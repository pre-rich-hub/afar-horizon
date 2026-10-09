import { AdminDestinations } from '@/features/admin'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Destinations',
  robots: { index: false, follow: false },
}

export default function AdminDestinationsPage() {
  return <AdminDestinations />
}
