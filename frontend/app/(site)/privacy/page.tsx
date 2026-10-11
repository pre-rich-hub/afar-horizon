import { LegalContent, privacy } from '@/features/legal'
import { createPageMetadata } from '@/lib/seo/metadata'

export const metadata = createPageMetadata({
  title: 'Privacy Policy', path: '/privacy',
  description: 'How Afar Horizon Expeditions handles website enquiries, newsletter subscriptions, travel assistant conversations and website analytics.',
})

export default function PrivacyPage() { return <LegalContent page={privacy} /> }
