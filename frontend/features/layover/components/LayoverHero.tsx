import { PageHero } from '@/components/common/PageHero';

export function LayoverHero({ packageCount, shortest, from }: { packageCount: number; shortest: string; from: string }) {
  return (
    <PageHero
        eyebrow="Addis Layover Tours"
        title="Six hours in Addis is not a waiting room"
        lede="Ethiopian Airlines connects half of Africa through Bole. If your connection is long enough for coffee, it is long enough for a private city loop — met at the gate, back at check-in with time to spare."
        image="/images/addis-skyline.png"
        imageAlt="The Addis Ababa skyline at dusk seen from the Entoto hills"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Layover' }]}
        meta={[
          { label: 'Packages', value: String(packageCount) },
          { label: 'Shortest', value: shortest },
          { label: 'From', value: from },
          { label: 'Airport', value: 'Bole (ADD)' },
        ]}
      />
  )
}
