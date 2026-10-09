import { AdminSidebar } from '@/features/admin'
import { hasValidAdminSession } from '@/features/auth/server'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: {
    default: 'Admin',
    template: '%s | Admin',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const authenticated = await hasValidAdminSession()

  if (!authenticated) {
    redirect('/login')
  }

  // Fixed overlay: the admin lives inside the marketing root layout, so we
  // paint over the public nav/footer instead of touching them.
  return (
    <div className="fixed inset-0 z-[60] flex bg-background">
      <AdminSidebar />
      <main className="h-full flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
