import { LegalContent, terms } from '@/features/legal'
import { createPageMetadata } from '@/lib/seo/metadata'

export const metadata = createPageMetadata({
  title: 'Website Terms', path: '/terms',
  description: 'Website terms for Afar Horizon Expeditions: journey information, quotations, changing access, the travel assistant and responsible website use.',
})

export default function TermsPage() { return <LegalContent page={terms} /> }
