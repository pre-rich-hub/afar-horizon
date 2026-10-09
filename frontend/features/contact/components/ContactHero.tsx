import { PageHero } from '@/components/common/PageHero'

export function ContactHero() {
  return (
    <PageHero
        eyebrow="Speak With a Designer"
        title="Every journey begins with a conversation"
        lede="No call centres and no templates. Write to us and an Addis-based designer replies personally, usually the same day."
        image="/images/traveler-portrait.png"
        imageAlt="A traveller looking out over the Ethiopian highlands at dawn"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        meta={[
          { label: 'Reply Time', value: 'Within 24 hrs' },
          { label: 'Based In', value: 'Addis Ababa' },
          { label: 'Support', value: '24/7 In-Country' },
          { label: 'Deposit', value: 'Only When Right' },
        ]}
      />
  )
}
