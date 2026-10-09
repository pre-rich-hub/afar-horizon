'use client'

import { FormEvent, useCallback, useEffect, useState } from 'react'
import { createAdminBlogCategory, deleteAdminBlogCategory, deleteAdminPost, listAdminBlogCategories, listAdminPosts, saveAdminPost, updateAdminBlogCategory } from '../api/blog.api'
import type { BlogCategory, BlogPost } from '../types/blog.types'

export function useAdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState<BlogPost | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [feedback, setFeedback] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [postList, categoryList] = await Promise.all([
        listAdminPosts(),
        listAdminBlogCategories(),
      ])
      setPosts(postList)
      setCategories(categoryList)
      setFeedback('')
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Blog content could not be loaded.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const id = window.setTimeout(() => void load(), 0)
    return () => window.clearTimeout(id)
  }, [load])

  function showForm(post: BlogPost | null) {
    setEditing(post)
    setFormOpen(true)
    setFeedback('')
  }

  async function submitPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setFeedback('')
    try {
      await saveAdminPost(editing?.id, new FormData(event.currentTarget))
      setFormOpen(false)
      setEditing(null)
      await load()
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Blog post could not be saved.')
    } finally {
      setSaving(false)
    }
  }

  async function addCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const name = String(new FormData(form).get('name') ?? '').trim()
    if (!name) return
    try {
      await createAdminBlogCategory(JSON.stringify({ name }))
      form.reset()
      await load()
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Category could not be created.')
    }
  }

  async function renameCategory(category: BlogCategory) {
    const name = window.prompt('Category name', category.name)?.trim()
    if (!name || name === category.name) return
    try {
      await updateAdminBlogCategory(category.id, JSON.stringify({ name }))
      await load()
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Category could not be renamed.')
    }
  }

  async function deleteCategory(category: BlogCategory) {
    if (!window.confirm(`Delete category “${category.name}”?`)) return
    try {
      await deleteAdminBlogCategory(category.id)
      await load()
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Category could not be deleted.')
    }
  }

  async function deletePost(post: BlogPost) {
    if (!window.confirm(`Delete “${post.title}”?`)) return
    try {
      await deleteAdminPost(post.id)
      setPosts((current) => current.filter((entry) => entry.id !== post.id))
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Blog post could not be deleted.')
    }
  }
  return { posts, categories, loading, saving, editing, formOpen, setFormOpen, feedback, showForm, submitPost, addCategory, renameCategory, deleteCategory, deletePost }
}
