import { getLayoverPackagesData, getLayoverSummary, LayoverAssurances, LayoverEnquiry, LayoverHero, LayoverPackages, LayoverPlanning } from '@/features/layover'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Addis Ababa Layover Tours',
  description:
    'Private 6, 12, 24 and 48-hour layover tours from Bole International. Met at the gate, visa on arrival, back at check-in with time to spare.',
}

export default async function LayoverPage() {
  const packages = await getLayoverPackagesData()
  const { packageCount, shortest, from } = getLayoverSummary(packages)

  return (
    <>
      <LayoverHero packageCount={packageCount} shortest={shortest} from={from} />

      {/* Packages */}
      <LayoverPackages packages={packages} />

      {/* Assurances */}
      <LayoverAssurances />

      {/* Enquiry */}
      <LayoverEnquiry />

      <LayoverPlanning />
    </>
  )
}

// ISR: admin edits surface within an hour (deliberate deviation from the
// statically frozen tours pages — the catalog is now API-backed).
export const revalidate = 3600
