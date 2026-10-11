import { AdminBookings } from '@/features/admin'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bookings',
  robots: { index: false, follow: false },
}

export default function AdminBookingsPage() {
  return <AdminBookings />
}
