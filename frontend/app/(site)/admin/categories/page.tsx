import { AdminTourCategories } from '@/features/admin'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tour Categories',
  robots: { index: false, follow: false },
}

export default function AdminCategoriesPage() {
  return <AdminTourCategories />
}
