import { request } from '@/lib/api/request'
import type { ApiLayoverPackage } from '../types/layover-api.types'

export async function getLayoverPackages(): Promise<ApiLayoverPackage[]> {
  return request<ApiLayoverPackage[]>('/api/v1/layover-packages')
}
