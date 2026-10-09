import { adminRequest } from '@/lib/api/adminRequest'
import type { Subscriber as SubscribersSubscriber } from '../types/subscribers.types'

export function listAdminSubscribers(init?: RequestInit) {
  return adminRequest<SubscribersSubscriber[]>('/api/v1/admin/subscribers', init)
}

export function deleteAdminSubscriber(id: number) {
  return adminRequest<null>(`/api/v1/admin/subscribers/${id}`, { method: 'DELETE' })
}
