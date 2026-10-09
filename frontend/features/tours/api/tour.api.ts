import { queryString, request } from '@/lib/api/request'
import type { ApiTour, ToursPage, ToursParams } from '../types/tour-api.types'

export async function getTours(params: ToursParams = {}): Promise<ToursPage> {
  return request<ToursPage>(`/api/v1/tours${queryString(params)}`)
}

export async function getTourBySlug(slug: string): Promise<ApiTour> {
  return request<ApiTour>(`/api/v1/tours/slug/${encodeURIComponent(slug)}`)
}
