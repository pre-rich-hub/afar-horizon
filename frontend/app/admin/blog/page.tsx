import { AdminBlog } from '@/features/admin'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  robots: { index: false, follow: false },
}

export default function AdminBlogPage() {
  return <AdminBlog />
}
