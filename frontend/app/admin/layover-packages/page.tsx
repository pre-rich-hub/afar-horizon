import { AdminLayoverPackages } from '@/features/admin'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Layover Packages',
  robots: { index: false, follow: false },
}

export default function AdminLayoverPackagesPage() {
  return <AdminLayoverPackages />
}
