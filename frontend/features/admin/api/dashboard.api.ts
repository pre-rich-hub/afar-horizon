import type { Stats } from '../types/dashboard.types';

export async function getAdminDashboard(): Promise<{ success: boolean; data: Stats }> {
  const response = await fetch('/api/v1/admin/dashboard/stats', { credentials: 'include' })
  return response.json()
}
