'use client'

import { useCallback, useEffect, useState } from 'react'
import { deleteAdminBooking, listAdminBookings, updateAdminBookingStatus } from '../api/bookings.api'
import type { Booking, BookingStatus } from '../types/bookings.types'

export function useAdminBookings() {
  const [items, setItems] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<number | null>(null)
  const [feedback, setFeedback] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      setItems(await listAdminBookings())
      setFeedback('')
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Bookings could not be loaded.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const id = window.setTimeout(() => void load(), 0)
    return () => window.clearTimeout(id)
  }, [load])

  async function setStatus(booking: Booking, status: BookingStatus) {
    setUpdatingId(booking.id)
    try {
      const updated = await updateAdminBookingStatus(booking.id, JSON.stringify({ status }))
      setItems((current) => current.map((entry) => entry.id === booking.id ? updated : entry))
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Booking status could not be updated.')
    } finally {
      setUpdatingId(null)
    }
  }

  async function remove(booking: Booking) {
    if (!window.confirm(`Delete booking #${booking.id}?`)) return
    try {
      await deleteAdminBooking(booking.id)
      setItems((current) => current.filter((entry) => entry.id !== booking.id))
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Booking could not be deleted.')
    }
  }
  return { items, loading, updatingId, feedback, setStatus, remove }
}
