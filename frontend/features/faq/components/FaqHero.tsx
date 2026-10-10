import { PageHero } from '@/components/common/PageHero'

export function FaqHero() {
  return (
    <PageHero
        eyebrow="FAQ"
        title="Questions travellers ask"
        lede="Straight answers about how we work, what a Danakil expedition involves and how booking works."
        image="/images/hero-danakil/dallol-sulfur.jpg"
        imageAlt="Yellow sulphur chimneys among rust-red mineral formations at Dallol"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]}
      />
  )
}
