import { adminRequest } from '@/lib/api/adminRequest'
import type { Destination as DestinationsDestination } from '../types/destinations.types'
import type { Destination as TourEditDestination } from '../types/tour-edit.types'

export function listAdminDestinations(init?: RequestInit) {
  return adminRequest<DestinationsDestination[]>('/api/v1/admin/destinations', init)
}

export function saveAdminDestination(id: number | undefined, body: FormData) {
  return adminRequest<DestinationsDestination>(id !== undefined ? `/api/v1/admin/destinations/${id}` : '/api/v1/admin/destinations', { method: id !== undefined ? 'PUT' : 'POST', body })
}

export function deleteAdminDestination(id: number) {
  return adminRequest<null>(`/api/v1/admin/destinations/${id}`, { method: 'DELETE' })
}

export function listAdminDestinationOptions(init?: RequestInit) {
  return adminRequest<TourEditDestination[]>('/api/v1/admin/destinations', init)
}
