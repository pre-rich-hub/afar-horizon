import { LoginForm } from '@/features/auth'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Login',
  robots: {
    index: false,
    follow: false,
  },
}

export default function LoginPage() {
  return <LoginForm />
}
