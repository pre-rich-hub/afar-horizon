import { adminRequest } from '@/lib/api/adminRequest'
import type { GalleryItem as GalleryGalleryItem } from '../types/gallery.types'

export function listAdminGallery(init?: RequestInit) {
  return adminRequest<GalleryGalleryItem[]>('/api/v1/admin/gallery', init)
}

export function createAdminGalleryImage(body: FormData) {
  return adminRequest<GalleryGalleryItem>('/api/v1/admin/gallery', { method: 'POST', body })
}

export function deleteAdminGalleryImage(id: number) {
  return adminRequest<null>(`/api/v1/admin/gallery/${id}`, { method: 'DELETE' })
}
