import { AdminContacts } from '@/features/admin'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contacts',
  robots: { index: false, follow: false },
}

export default function AdminContactsPage() {
  return <AdminContacts />
}
