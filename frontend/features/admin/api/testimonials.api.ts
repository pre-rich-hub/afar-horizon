import { adminRequest } from '@/lib/api/adminRequest'
import type { Testimonial as TestimonialsTestimonial } from '../types/testimonials.types'

export function listAdminTestimonials(init?: RequestInit) {
  return adminRequest<TestimonialsTestimonial[]>('/api/v1/admin/testimonials', init)
}

export function saveAdminTestimonial(id: number | undefined, body: string) {
  return adminRequest<TestimonialsTestimonial>(id !== undefined ? `/api/v1/admin/testimonials/${id}` : '/api/v1/admin/testimonials', { method: id !== undefined ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body })
}

export function deleteAdminTestimonial(id: number) {
  return adminRequest<null>(`/api/v1/admin/testimonials/${id}`, { method: 'DELETE' })
}
