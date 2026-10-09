import { AdminDashboard } from '@/features/admin'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminPage() {
  return <AdminDashboard />
}
