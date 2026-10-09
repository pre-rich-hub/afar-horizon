import { adminRequest } from '@/lib/api/adminRequest'
import type { Tour as GalleryTour } from '../types/gallery.types'
import type { BlockedDate as TourEditBlockedDate, TourData as TourEditTourData } from '../types/tour-edit.types'

export function listAdminTourOptions(init?: RequestInit) {
  return adminRequest<GalleryTour[]>('/api/v1/admin/tours', init)
}

export function getAdminTour(id: number, init?: RequestInit) {
  return adminRequest<TourEditTourData>(`/api/v1/admin/tours/${id}`, init)
}

export function listAdminBlockedDates(id: number, init?: RequestInit) {
  return adminRequest<TourEditBlockedDate[]>(`/api/v1/admin/tours/${id}/blocked-dates`, init)
}

export function createAdminBlockedDates(id: number, body: string) {
  return adminRequest<unknown>(`/api/v1/admin/tours/${id}/blocked-dates`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body })
}

export function deleteAdminBlockedDate(id: number, childId: number) {
  return adminRequest<null>(`/api/v1/admin/tours/${id}/blocked-dates/${childId}`, { method: 'DELETE' })
}

export function updateAdminTour(id: number, body: FormData) {
  return adminRequest<unknown>(`/api/v1/admin/tours/${id}`, { method: 'PUT', body })
}

export function createAdminTour(body: FormData) {
  return adminRequest<unknown>('/api/v1/admin/tours', { method: 'POST', body })
}
