'use client'

import { useCallback, useEffect, useState } from 'react'
import { loadAdminTours, removeAdminTour } from '../api/tour-list.api'
import type { TourListItem } from '../types/tours.types'

export function useAdminTours() {
  const [tours, setTours] = useState<TourListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [deleting, setDeleting] = useState<number | null>(null)
  const [feedback, setFeedback] = useState('')
  const [success, setSuccess] = useState('')

  const fetchTours = useCallback(async () => {
    try {
      const tours = await loadAdminTours()
      setTours(tours)
      setFeedback('')
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Tours could not be loaded.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const id = window.setTimeout(() => void fetchTours(), 0)
    return () => window.clearTimeout(id)
  }, [fetchTours])

  async function handleDelete(tour: TourListItem) {
    if (!confirm(`Delete “${tour.name}” from the website? This cannot be undone.`)) return
    setDeleting(tour.id)
    setFeedback('')
    setSuccess('')
    try {
      await removeAdminTour(tour.id)
      setTours((current) => current.filter((item) => item.id !== tour.id))
      setSuccess(`“${tour.name}” was removed from the website.`)
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Tour could not be deleted.')
    } finally {
      setDeleting(null)
    }
  }

  const filtered = tours.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  )
  return { tours, loading, search, setSearch, deleting, feedback, success, handleDelete, filtered }
}
