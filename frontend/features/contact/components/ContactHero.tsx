
import { TranslationBoundary } from '@/components/common/TranslationBoundary'
import { PageHero } from '@/components/common/PageHero'

export function ContactHero() {
  return (
    <TranslationBoundary><PageHero
        eyebrow="Speak With a Designer"
        title="Every journey begins with a conversation"
        lede="No call centres and no templates. Write to us and an Addis-based designer replies personally, usually the same day."
        image="https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/afar.png"
        imageAlt="Afar region, Ethiopia"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        meta={[
          { label: 'Reply Time', value: 'Within 24 hrs' },
          { label: 'Based In', value: 'Addis Ababa' },
          { label: 'Support', value: '24/7 In-Country' },
          { label: 'Deposit', value: 'Only When Right' },
        ]}
      /></TranslationBoundary>
  )
}
