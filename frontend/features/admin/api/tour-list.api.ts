import type { TourListItem } from '../types/tours.types'

export async function loadAdminTours(): Promise<TourListItem[]> {
  const res = await fetch('/api/v1/admin/tours', { credentials: 'include' })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message || 'Tours could not be loaded.')
      return data.data
}

export async function removeAdminTour(id: number): Promise<void> {
  const res = await fetch(`/api/v1/admin/tours/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message || 'Tour could not be deleted.')

}
