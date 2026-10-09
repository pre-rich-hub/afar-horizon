import { adminRequest } from '@/lib/api/adminRequest'
import type { LayoverPackageItem as LayoverPackagesLayoverPackageItem } from '../types/layover-packages.types'

export function listAdminLayoverPackages(init?: RequestInit) {
  return adminRequest<LayoverPackagesLayoverPackageItem[]>('/api/v1/admin/layover-packages', init)
}

export function saveAdminLayoverPackage(id: number | undefined, body: FormData) {
  return adminRequest<LayoverPackagesLayoverPackageItem>(id !== undefined ? `/api/v1/admin/layover-packages/${id}` : '/api/v1/admin/layover-packages', { method: id !== undefined ? 'PUT' : 'POST', body })
}

export function updateAdminLayoverPackage(id: number, body: FormData) {
  return adminRequest<LayoverPackagesLayoverPackageItem>(`/api/v1/admin/layover-packages/${id}`, { method: 'PUT', body })
}

export function deleteAdminLayoverPackage(id: number) {
  return adminRequest<null>(`/api/v1/admin/layover-packages/${id}`, { method: 'DELETE' })
}
