import { request } from '@/lib/api/request'
import type { ContactPayload } from '../types/enquiry.types'

export async function submitContact(payload: ContactPayload): Promise<void> {
  await request<null>('/api/v1/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
