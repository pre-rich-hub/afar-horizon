import type { LayoverPackage } from '../types/layover.types'

export function getLayoverSummary(packages: LayoverPackage[]) {
  const packageCount = packages.length
  const shortest = packages[0]?.hours ?? '6 Hours'
  const from = packages[0]?.price ?? '$95 pp'
  return { packageCount, shortest, from }
}
