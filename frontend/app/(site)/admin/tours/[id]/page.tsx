import { AdminTourEdit } from '@/features/admin'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Edit Tour',
  robots: { index: false, follow: false },
}

export default async function AdminTourEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <AdminTourEdit tourId={Number(id)} />
}
