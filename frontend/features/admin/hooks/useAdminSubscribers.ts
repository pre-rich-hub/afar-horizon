'use client'

import { useCallback, useEffect, useState } from 'react'
import { deleteAdminSubscriber, listAdminSubscribers } from '../api/subscribers.api'
import type { Subscriber } from '../types/subscribers.types'

export function useAdminSubscribers() {
  const [items, setItems] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [feedback, setFeedback] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      setItems(await listAdminSubscribers())
      setFeedback('')
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Subscribers could not be loaded.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const id = window.setTimeout(() => void load(), 0)
    return () => window.clearTimeout(id)
  }, [load])

  async function remove(subscriber: Subscriber) {
    if (!window.confirm(`Remove ${subscriber.email} from the subscriber list?`)) return
    try {
      await deleteAdminSubscriber(subscriber.id)
      setItems((current) => current.filter((entry) => entry.id !== subscriber.id))
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Subscriber could not be removed.')
    }
  }

  function exportCsv() {
    const csv = ['Email,Subscribed', ...items.map((item) => `"${item.email.replaceAll('"', '""')}","${item.createdAt}"`)].join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'afar-horizon-subscribers.csv'
    link.click()
    URL.revokeObjectURL(url)
  }
  return { items, loading, feedback, remove, exportCsv }
}
