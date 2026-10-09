'use client'

import { FormEvent, useCallback, useEffect, useState } from 'react'
import { deleteAdminTestimonial, listAdminTestimonials, saveAdminTestimonial } from '../api/testimonials.api'
import type { Testimonial } from '../types/testimonials.types'

export function useAdminTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState<Testimonial | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [success, setSuccess] = useState('')
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      setItems(await listAdminTestimonials())
      setFeedback('')
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Testimonials could not be loaded.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let active = true

    listAdminTestimonials()
      .then((testimonials) => {
        if (!active) return
        setItems(testimonials)
        setFeedback('')
      })
      .catch((error: unknown) => {
        if (!active) return
        setFeedback(error instanceof Error ? error.message : 'Testimonials could not be loaded.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => { active = false }
  }, [])

  function showForm(item: Testimonial | null) {
    setEditing(item)
    setFormOpen(true)
    setFeedback('')
    setSuccess('')
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setFeedback('')
    setSuccess('')
    const wasEditing = Boolean(editing)
    const formData = new FormData(event.currentTarget)
    const body = {
      reviewerName: String(formData.get('reviewerName') ?? '').trim(),
      profession: String(formData.get('profession') ?? '').trim(),
      message: String(formData.get('message') ?? '').trim(),
    }
    try {
      await saveAdminTestimonial(editing?.id, JSON.stringify(body))
      setFormOpen(false)
      setEditing(null)
      await load()
      setSuccess(wasEditing ? 'Testimonial updated on the website.' : 'Testimonial published on the website.')
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Testimonial could not be saved.')
    } finally {
      setSaving(false)
    }
  }

  async function remove(item: Testimonial) {
    if (!window.confirm(`Delete the testimonial from ${item.reviewerName}?`)) return
    setDeletingId(item.id)
    setFeedback('')
    setSuccess('')
    try {
      await deleteAdminTestimonial(item.id)
      setItems((current) => current.filter((entry) => entry.id !== item.id))
      if (editing?.id === item.id) {
        setEditing(null)
        setFormOpen(false)
      }
      setSuccess('Testimonial removed from the website.')
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Testimonial could not be deleted.')
    } finally {
      setDeletingId(null)
    }
  }
  return { items, loading, saving, editing, formOpen, setFormOpen, feedback, success, deletingId, showForm, submit, remove }
}
