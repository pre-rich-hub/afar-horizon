import { adminRequest } from '@/lib/api/adminRequest'
import type { BlogCategory as BlogBlogCategory, BlogPost as BlogBlogPost } from '../types/blog.types'

export function listAdminPosts(init?: RequestInit) {
  return adminRequest<BlogBlogPost[]>('/api/v1/admin/blog', init)
}

export function listAdminBlogCategories(init?: RequestInit) {
  return adminRequest<BlogBlogCategory[]>('/api/v1/admin/blog-categories', init)
}

export function saveAdminPost(id: number | undefined, body: FormData) {
  return adminRequest<BlogBlogPost>(id !== undefined ? `/api/v1/admin/blog/${id}` : '/api/v1/admin/blog', { method: id !== undefined ? 'PUT' : 'POST', body })
}

export function createAdminBlogCategory(body: string) {
  return adminRequest<BlogBlogCategory>('/api/v1/admin/blog-categories', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body })
}

export function updateAdminBlogCategory(id: number, body: string) {
  return adminRequest<BlogBlogCategory>(`/api/v1/admin/blog-categories/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body })
}

export function deleteAdminBlogCategory(id: number) {
  return adminRequest<null>(`/api/v1/admin/blog-categories/${id}`, { method: 'DELETE' })
}

export function deleteAdminPost(id: number) {
  return adminRequest<null>(`/api/v1/admin/blog/${id}`, { method: 'DELETE' })
}
