import { AdminSubscribers } from '@/features/admin'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Subscribers',
  robots: { index: false, follow: false },
}

export default function AdminSubscribersPage() {
  return <AdminSubscribers />
}
