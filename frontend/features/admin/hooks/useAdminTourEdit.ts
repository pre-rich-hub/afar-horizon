'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { listAdminCategoryOptions } from '../api/categories.api'
import { listAdminDestinationOptions } from '../api/destinations.api'
import { createAdminBlockedDates, deleteAdminBlockedDate, getAdminTour, listAdminBlockedDates, updateAdminTour } from '../api/tours.api'
import { adminInputClass } from '../components/AdminPrimitives'
import type { BlockedDate, Category, Destination, ItineraryDay, TourData } from '../types/tour-edit.types'

export function useAdminTourEdit({ tourId }: { tourId: number }) {
  const router = useRouter()
  const invalidTourId = !Number.isInteger(tourId) || tourId <= 0
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [tour, setTour] = useState<TourData | null>(null)
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedDestinations, setSelectedDestinations] = useState<number[]>([])
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  const [newImages, setNewImages] = useState<File[]>([])
  const [deleteImageIds, setDeleteImageIds] = useState<number[]>([])
  const [included, setIncluded] = useState<string[]>([])
  const [excluded, setExcluded] = useState<string[]>([])
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([])

  // Blocked dates (unavailable booking days)
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([])
  const [newBlockedDate, setNewBlockedDate] = useState('')
  const [blockedReason, setBlockedReason] = useState('')
  const [blockedSaving, setBlockedSaving] = useState(false)
  const [blockedDeleting, setBlockedDeleting] = useState<number | null>(null)
  const [blockedError, setBlockedError] = useState('')

  useEffect(() => {
    let active = true

    if (invalidTourId) {
      return () => { active = false }
    }

    Promise.all([
      getAdminTour(tourId, { cache: 'no-store' }),
      listAdminDestinationOptions({ cache: 'no-store' }),
      listAdminCategoryOptions({ cache: 'no-store' }),
      listAdminBlockedDates(tourId, { cache: 'no-store' }),
    ])
      .then(([tourData, destinationItems, categoryItems, blockedItems]) => {
        if (!active) return
        setTour(tourData)
        setDestinations(destinationItems)
        setCategories(categoryItems)
        setSelectedDestinations(
          tourData.destinations?.length
            ? tourData.destinations.map((destination) => destination.id)
            : tourData.destination
              ? [tourData.destination.id]
              : [],
        )
        setIncluded(tourData.included ?? [])
        setExcluded(tourData.excluded ?? [])
        setItinerary(
          tourData.itinerary?.length
            ? tourData.itinerary.map((item) => ({
                day: item.day,
                title: item.title ?? '',
                activities: item.activities ?? '',
                overnight: item.overnight ?? '',
                meals: item.meals ?? '',
              }))
            : [{ day: 1, title: '', activities: '', overnight: '', meals: '' }],
        )
        setSelectedCategories(tourData.categories.map((category) => category.id))
        setBlockedDates(blockedItems)
        setError('')
      })
      .catch((loadError: unknown) => {
        if (!active) return
        setError(
          loadError instanceof Error
            ? loadError.message
            : 'Tour details could not be loaded.',
        )
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => { active = false }
  }, [invalidTourId, tourId])

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
      ;(next[idx] as Record<string, unknown>)[field] = val
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

  function toggleDeleteImage(imgId: number) {
    setDeleteImageIds((prev) =>
      prev.includes(imgId) ? prev.filter((id) => id !== imgId) : [...prev, imgId]
    )
  }

  async function handleBlockedDateSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!newBlockedDate) return
    setBlockedSaving(true)
    setBlockedError('')
    try {
      await createAdminBlockedDates(tourId, JSON.stringify({
          dates: [newBlockedDate],
          reason: blockedReason.trim() || undefined,
        }))
      const updated = await listAdminBlockedDates(tourId)
      setBlockedDates(updated)
      setNewBlockedDate('')
      setBlockedReason('')
    } catch (submitError) {
      setBlockedError(
        submitError instanceof Error ? submitError.message : 'Blocked date could not be added.',
      )
    } finally {
      setBlockedSaving(false)
    }
  }

  async function handleBlockedDateDelete(blockedDate: BlockedDate) {
    setBlockedDeleting(blockedDate.id)
    setBlockedError('')
    try {
      await deleteAdminBlockedDate(tourId, blockedDate.id)
      setBlockedDates((current) => current.filter((item) => item.id !== blockedDate.id))
    } catch (submitError) {
      setBlockedError(
        submitError instanceof Error ? submitError.message : 'Blocked date could not be removed.',
      )
    } finally {
      setBlockedDeleting(null)
    }
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
    formData.set('tourReviews', String(tour?.noOfRates ?? 0))
    formData.set('deleteImages', JSON.stringify(deleteImageIds))

    try {
      await updateAdminTour(tourId, formData)
      router.replace('/admin/tours')
      router.refresh()
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Failed to update tour. Please try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  const fieldClass = `${adminInputClass} bg-white`
  return { router, invalidTourId, loading, submitting, error, tour, destinations, categories, selectedDestinations, selectedCategories, newImages, setNewImages, deleteImageIds, included, setIncluded, excluded, setExcluded, itinerary, blockedDates, newBlockedDate, setNewBlockedDate, blockedReason, setBlockedReason, blockedSaving, blockedDeleting, blockedError, toggleCategory, toggleDestination, addArrayItem, removeArrayItem, updateArrayItem, addItineraryDay, removeItineraryDay, updateItineraryDay, moveItineraryDay, toggleDeleteImage, handleBlockedDateSubmit, handleBlockedDateDelete, handleSubmit, fieldClass }
}
