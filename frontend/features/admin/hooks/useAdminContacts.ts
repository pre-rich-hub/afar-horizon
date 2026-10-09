'use client'

import { FormEvent, useCallback, useEffect, useState } from 'react'
import { deleteAdminContact, listAdminContacts, replyToAdminContact } from '../api/contacts.api'
import type { Contact } from '../types/contacts.types'

export function useAdminContacts() {
  const [items, setItems] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [replyingTo, setReplyingTo] = useState<Contact | null>(null)
  const [sending, setSending] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [success, setSuccess] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      setItems(await listAdminContacts())
      setFeedback('')
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Messages could not be loaded.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const id = window.setTimeout(() => void load(), 0)
    return () => window.clearTimeout(id)
  }, [load])

  async function sendReply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!replyingTo) return
    setSending(true)
    setFeedback('')
    setSuccess('')
    const data = new FormData(event.currentTarget)
    try {
      await replyToAdminContact(replyingTo.id, JSON.stringify({ subject: String(data.get('subject')), message: String(data.get('message')) }))
      setSuccess(`Reply sent to ${replyingTo.email}.`)
      setReplyingTo(null)
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Reply could not be sent.')
    } finally {
      setSending(false)
    }
  }

  async function remove(contact: Contact) {
    if (!window.confirm(`Delete the message from ${contact.name}?`)) return
    try {
      await deleteAdminContact(contact.id)
      setItems((current) => current.filter((entry) => entry.id !== contact.id))
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Message could not be deleted.')
    }
  }
  return { items, loading, replyingTo, setReplyingTo, sending, feedback, success, setSuccess, sendReply, remove }
}
