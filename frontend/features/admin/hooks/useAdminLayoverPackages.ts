'use client'

import { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import { deleteAdminLayoverPackage, listAdminLayoverPackages, saveAdminLayoverPackage, updateAdminLayoverPackage } from '../api/layover-packages.api'
import type { LayoverPackageItem } from '../types/layover-packages.types'

export function useAdminLayoverPackages() {
  const [items, setItems] = useState<LayoverPackageItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [reorderingId, setReorderingId] = useState<number | null>(null)
  const [editing, setEditing] = useState<LayoverPackageItem | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [feedback, setFeedback] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      setItems(await listAdminLayoverPackages())
      setFeedback('')
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Layover packages could not be loaded.')
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

  function openEdit(item: LayoverPackageItem) {
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
      await saveAdminLayoverPackage(editing?.id, formData)
      setFormOpen(false)
      setEditing(null)
      await load()
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Layover package could not be saved.')
    } finally {
      setSaving(false)
    }
  }

  function rowPayload(item: LayoverPackageItem, sortOrder: number): FormData {
    const data = new FormData()
    data.set('hours', item.hours)
    data.set('title', item.title)
    data.set('price', item.price)
    data.set('teaser', item.teaser)
    data.set('itinerary', item.itinerary.join('\n'))
    data.set('includes', item.includes.join('\n'))
    data.set('bestFor', item.best)
    data.set('sortOrder', String(sortOrder))
    return data
  }

  // Swaps sortOrder between this row and its neighbour with two PUTs. The
  // payload carries every field so an order change never blanks the row.
  async function reorder(fromIndex: number, toIndex: number) {
    const a = items[fromIndex]
    const b = items[toIndex]
    if (!a || !b) return
    setReorderingId(a.id)
    setFeedback('')
    try {
      await updateAdminLayoverPackage(a.id, rowPayload(a, toIndex))
      await updateAdminLayoverPackage(b.id, rowPayload(b, fromIndex))
      await load()
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Order could not be updated.')
    } finally {
      setReorderingId(null)
    }
  }

  async function remove(item: LayoverPackageItem) {
    if (!window.confirm(`Delete “${item.title}”? This cannot be undone.`)) return
    setDeletingId(item.id)
    setFeedback('')
    try {
      await deleteAdminLayoverPackage(item.id)
      setItems((current) => current.filter((entry) => entry.id !== item.id))
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Layover package could not be deleted.')
    } finally {
      setDeletingId(null)
    }
  }
  return { items, loading, saving, deletingId, reorderingId, editing, formOpen, setFormOpen, feedback, formRef, openCreate, openEdit, submit, reorder, remove }
}
