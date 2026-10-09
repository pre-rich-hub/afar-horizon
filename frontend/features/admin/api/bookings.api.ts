import { adminRequest } from '@/lib/api/adminRequest'
import type { Booking as BookingsBooking } from '../types/bookings.types'

export function listAdminBookings(init?: RequestInit) {
  return adminRequest<BookingsBooking[]>('/api/v1/admin/bookings', init)
}

export function updateAdminBookingStatus(id: number, body: string) {
  return adminRequest<BookingsBooking>(`/api/v1/admin/bookings/${id}/status`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body })
}

export function deleteAdminBooking(id: number) {
  return adminRequest<null>(`/api/v1/admin/bookings/${id}`, { method: 'DELETE' })
}
