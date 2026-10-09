'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { listAdminCategoryOptions } from '../api/categories.api'
import { listAdminDestinationOptions } from '../api/destinations.api'
import { createAdminTour } from '../api/tours.api'
import { adminInputClass } from '../components/AdminPrimitives'
import type { Category, Destination, ItineraryDay } from '../types/tour-new.types'

export function useAdminTourNew() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [optionsLoading, setOptionsLoading] = useState(true)
  const [optionsError, setOptionsError] = useState('')
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedDestinations, setSelectedDestinations] = useState<number[]>([])
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  const [images, setImages] = useState<File[]>([])
  const [included, setIncluded] = useState<string[]>([''])
  const [excluded, setExcluded] = useState<string[]>([''])
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([
    { day: 1, title: '', activities: '', overnight: '', meals: '' },
  ])

  useEffect(() => {
    let active = true

    Promise.all([
      listAdminDestinationOptions(),
      listAdminCategoryOptions(),
    ])
      .then(([destinationItems, categoryItems]) => {
        if (!active) return
        setDestinations(destinationItems)
        setCategories(categoryItems)
        setOptionsError('')
      })
      .catch((loadError: unknown) => {
        if (!active) return
        setOptionsError(loadError instanceof Error ? loadError.message : 'Tour options could not be loaded.')
      })
      .finally(() => {
        if (active) setOptionsLoading(false)
      })

    return () => { active = false }
  }, [])

  function toggleCategory(id: number) {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
  }

  function toggleDestination(id: number) {
    setSelectedDestinations((prev) =>
      prev.includes(id) ? prev.filter((destinationId) => destinationId !== id) : [...prev, id]
    )
  }

  function addArrayItem(list: string[], setter: (v: string[]) => void) {
    setter([...list, ''])
  }

  function removeArrayItem(list: string[], idx: number, setter: (v: string[]) => void) {
    setter(list.filter((_, i) => i !== idx))
  }

  function updateArrayItem(list: string[], idx: number, val: string, setter: (v: string[]) => void) {
    const next = [...list]
    next[idx] = val
    setter(next)
  }

  function addItineraryDay() {
    setItinerary((prev) => [
      ...prev,
      { day: prev.length + 1, title: '', activities: '', overnight: '', meals: '' },
    ])
  }

  function removeItineraryDay(idx: number) {
    setItinerary((prev) => {
      const next = prev.filter((_, i) => i !== idx)
      return next.map((d, i) => ({ ...d, day: i + 1 }))
    })
  }

  function updateItineraryDay(idx: number, field: keyof ItineraryDay, val: string) {
    setItinerary((prev) => {
      const next = [...prev]
      next[idx] = { ...next[idx], [field]: val }
      return next
    })
  }

  function moveItineraryDay(idx: number, dir: 'up' | 'down') {
    setItinerary((prev) => {
      const target = dir === 'up' ? idx - 1 : idx + 1
      if (target < 0 || target >= prev.length) return prev
      const next = [...prev]
      ;[next[idx], next[target]] = [next[target], next[idx]]
      return next.map((d, i) => ({ ...d, day: i + 1 }))
    })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (selectedDestinations.length === 0) {
      setError('Choose at least one destination.')
      return
    }
    setSubmitting(true)
    setError('')

    const form = e.currentTarget
    const formData = new FormData(form)

    formData.set('tourDestination', String(selectedDestinations[0]))
    formData.set('tourDestinations', JSON.stringify(selectedDestinations))
    formData.set('tourCategories', JSON.stringify(selectedCategories))
    formData.set('tourIncluded', JSON.stringify(included.filter(Boolean)))
    formData.set('tourExcluded', JSON.stringify(excluded.filter(Boolean)))
    formData.set('tourItinerary', JSON.stringify(itinerary))
    formData.set('tourReviews', '0')

    try {
      await createAdminTour(formData)
      router.push('/admin/tours')
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Failed to create tour. Please try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  const fieldClass = `${adminInputClass} bg-white`
  return { router, submitting, error, optionsLoading, optionsError, destinations, categories, selectedDestinations, selectedCategories, images, setImages, included, setIncluded, excluded, setExcluded, itinerary, toggleCategory, toggleDestination, addArrayItem, removeArrayItem, updateArrayItem, addItineraryDay, removeItineraryDay, updateItineraryDay, moveItineraryDay, handleSubmit, fieldClass }
}
