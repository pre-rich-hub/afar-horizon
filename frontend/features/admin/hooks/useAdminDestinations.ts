'use client'

import { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import { deleteAdminDestination, listAdminDestinations, saveAdminDestination } from '../api/destinations.api'
import type { Destination } from '../types/destinations.types'

export function useAdminDestinations() {
  const [items, setItems] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [editing, setEditing] = useState<Destination | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [feedback, setFeedback] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      setItems(await listAdminDestinations())
      setFeedback('')
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Destinations could not be loaded.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const id = window.setTimeout(() => void load(), 0)
    return () => window.clearTimeout(id)
  }, [load])

  function openCreate() {
    setEditing(null)
    setFormOpen(true)
    setFeedback('')
    window.setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth' }), 0)
  }

  function openEdit(item: Destination) {
    setEditing(item)
    setFormOpen(true)
    setFeedback('')
    window.setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth' }), 0)
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setFeedback('')
    const formData = new FormData(event.currentTarget)

    try {
      await saveAdminDestination(editing?.id, formData)
      setFormOpen(false)
      setEditing(null)
      await load()
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Destination could not be saved.')
    } finally {
      setSaving(false)
    }
  }

  async function remove(item: Destination) {
    if (!window.confirm(`Delete “${item.name}”?`)) return
    setDeletingId(item.id)
    setFeedback('')
    try {
      await deleteAdminDestination(item.id)
      setItems((current) => current.filter((entry) => entry.id !== item.id))
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Destination could not be deleted.')
    } finally {
      setDeletingId(null)
    }
  }
  return { items, loading, saving, deletingId, editing, formOpen, setFormOpen, feedback, formRef, openCreate, openEdit, submit, remove }
}
