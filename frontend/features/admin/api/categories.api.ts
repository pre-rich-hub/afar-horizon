import { adminRequest } from '@/lib/api/adminRequest'
import type { Category as TourCategoriesCategory } from '../types/tour-categories.types'
import type { Category as TourEditCategory } from '../types/tour-edit.types'

export function listAdminCategories(init?: RequestInit) {
  return adminRequest<TourCategoriesCategory[]>('/api/v1/admin/categories', init)
}

export function createAdminCategory(body: string) {
  return adminRequest<TourCategoriesCategory>('/api/v1/admin/categories', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body })
}

export function updateAdminCategory(id: number, body: string) {
  return adminRequest<TourCategoriesCategory>(`/api/v1/admin/categories/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body })
}

export function deleteAdminCategory(id: number) {
  return adminRequest<null>(`/api/v1/admin/categories/${id}`, { method: 'DELETE' })
}

export function listAdminCategoryOptions(init?: RequestInit) {
  return adminRequest<TourEditCategory[]>('/api/v1/admin/categories', init)
}
