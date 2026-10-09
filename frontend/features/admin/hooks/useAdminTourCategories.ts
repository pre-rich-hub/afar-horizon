'use client'

import { FormEvent, useCallback, useEffect, useState } from 'react'
import { createAdminCategory, deleteAdminCategory, listAdminCategories, updateAdminCategory } from '../api/categories.api'
import type { Category } from '../types/tour-categories.types'

export function useAdminTourCategories() {
  const [items, setItems] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [feedback, setFeedback] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      setItems(await listAdminCategories())
      setFeedback('')
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Categories could not be loaded.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const id = window.setTimeout(() => void load(), 0)
    return () => window.clearTimeout(id)
  }, [load])

  async function add(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const categoryName = String(new FormData(form).get('categoryName') ?? '').trim()
    if (!categoryName) return
    try {
      await createAdminCategory(JSON.stringify({ categoryName }))
      form.reset()
      await load()
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Category could not be created.')
    }
  }

  async function rename(item: Category) {
    const categoryName = window.prompt('Category name', item.name)?.trim()
    if (!categoryName || categoryName === item.name) return
    try {
      await updateAdminCategory(item.id, JSON.stringify({ categoryName }))
      await load()
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Category could not be renamed.')
    }
  }

  async function remove(item: Category) {
    if (!window.confirm(`Delete category “${item.name}”? Tours will no longer use it.`)) return
    try {
      await deleteAdminCategory(item.id)
      setItems((current) => current.filter((entry) => entry.id !== item.id))
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Category could not be deleted.')
    }
  }
  return { items, loading, feedback, add, rename, remove }
}
