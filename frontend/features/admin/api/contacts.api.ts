import { adminRequest } from '@/lib/api/adminRequest'
import type { Contact as ContactsContact } from '../types/contacts.types'

export function listAdminContacts(init?: RequestInit) {
  return adminRequest<ContactsContact[]>('/api/v1/admin/contacts', init)
}

export function replyToAdminContact(id: number, body: string) {
  return adminRequest<null>(`/api/v1/admin/contacts/${id}/reply`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body })
}

export function deleteAdminContact(id: number) {
  return adminRequest<null>(`/api/v1/admin/contacts/${id}`, { method: 'DELETE' })
}
