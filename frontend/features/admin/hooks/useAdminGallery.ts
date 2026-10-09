'use client'

import { FormEvent, useCallback, useEffect, useState } from 'react'
import { createAdminGalleryImage, deleteAdminGalleryImage, listAdminGallery } from '../api/gallery.api'
import { listAdminTourOptions } from '../api/tours.api'
import type { GalleryItem, Tour } from '../types/gallery.types'

export function useAdminGallery() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [tours, setTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [feedback, setFeedback] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [gallery, tourList] = await Promise.all([
        listAdminGallery(),
        listAdminTourOptions(),
      ])
      setItems(gallery)
      setTours(tourList)
      setFeedback('')
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Gallery could not be loaded.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const id = window.setTimeout(() => void load(), 0)
    return () => window.clearTimeout(id)
  }, [load])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    setSaving(true)
    setFeedback('')
    try {
      await createAdminGalleryImage(formData)
      form.reset()
      setFormOpen(false)
      await load()
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Image could not be uploaded.')
    } finally {
      setSaving(false)
    }
  }

  async function remove(item: GalleryItem) {
    if (!window.confirm('Delete this gallery image?')) return
    try {
      await deleteAdminGalleryImage(item.id)
      setItems((current) => current.filter((entry) => entry.id !== item.id))
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Image could not be deleted.')
    }
  }
  return { items, tours, loading, saving, formOpen, setFormOpen, feedback, submit, remove }
}
