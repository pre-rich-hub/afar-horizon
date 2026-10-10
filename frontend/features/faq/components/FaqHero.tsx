import { PageHero } from '@/components/common/PageHero'

export function FaqHero() {
  return (
    <PageHero
        eyebrow="FAQ"
        title="Questions travellers ask"
        lede="Straight answers about how we work, what a Danakil expedition involves and how booking works."
        image="https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/dallol.png"
        imageAlt="Dallol in the Danakil Depression"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]}
      />
  )
}
