import {NotFoundShell} from '@/components/layout/NotFoundShell'
import {inter, cormorant} from '@/components/layout/fonts'
export default function NotFound() {
  return <html lang="en" className={`${inter.variable} ${cormorant.variable} bg-background`}>
    <head><link rel="preconnect" href="https://res.cloudinary.com" /></head>
    <body className="antialiased"><NotFoundShell /></body>
  </html>
}
