'use client'

import { useAdminTourEdit } from '../hooks/useAdminTourEdit'

import { ArrowDown, ArrowUp, CalendarOff, Loader2, Plus, Trash2, X } from 'lucide-react'
import { adminLabelClass, adminPanelClass } from './AdminPrimitives'

export function AdminTourEdit({ tourId }: { tourId: number }) {
  const { router, invalidTourId, loading, submitting, error, tour, destinations, categories, selectedDestinations, selectedCategories, newImages, setNewImages, deleteImageIds, included, setIncluded, excluded, setExcluded, itinerary, blockedDates, newBlockedDate, setNewBlockedDate, blockedReason, setBlockedReason, blockedSaving, blockedDeleting, blockedError, toggleCategory, toggleDestination, addArrayItem, removeArrayItem, updateArrayItem, addItineraryDay, removeItineraryDay, updateItineraryDay, moveItineraryDay, toggleDeleteImage, handleBlockedDateSubmit, handleBlockedDateDelete, handleSubmit, fieldClass } = useAdminTourEdit({ tourId })

  if (invalidTourId) {
    return (
      <div className="p-8">
        <div role="alert" className="max-w-xl rounded-lg border border-destructive/30 bg-destructive/10 p-5 text-sm text-destructive">
          Invalid tour ID.
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!tour) {
    return (
      <div className="p-8">
        <div role="alert" className="max-w-xl rounded-lg border border-destructive/30 bg-destructive/10 p-5 text-sm text-destructive">
          {error || 'Tour not found.'}
        </div>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-4 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl p-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-foreground">Edit Tour</h1>
        <p className="mt-1 text-sm text-muted-foreground">{tour.name}</p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <section className={adminPanelClass}>
          <h2 className="mb-5 font-serif text-lg text-foreground">Basic Information</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label htmlFor="tourTitle" className={adminLabelClass}>
                Tour Name
              </label>
              <input
                id="tourTitle"
                name="tourTitle"
                required
                defaultValue={tour.name}
                className={fieldClass}
              />
            </div>
            <fieldset className="md:col-span-2">
              <legend className={adminLabelClass}>
                Destinations
              </legend>
              <p className="mb-3 text-xs text-muted-foreground">Choose one or more destinations for this tour.</p>
              <div className="flex flex-wrap gap-3">
                {destinations.map((destination) => (
                  <label
                    key={destination.id}
                    className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3.5 py-2 text-sm transition-colors ${
                      selectedDestinations.includes(destination.id)
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border bg-card text-muted-foreground hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedDestinations.includes(destination.id)}
                      onChange={() => toggleDestination(destination.id)}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-primary/30"
                    />
                    {destination.name}
                  </label>
                ))}
              </div>
            </fieldset>
            <div>
              <label htmlFor="tourDiscount" className={adminLabelClass}>
                Discount (%)
              </label>
              <input
                id="tourDiscount"
                name="tourDiscount"
                type="number"
                min="0"
                max="100"
                defaultValue={tour.discount ?? ''}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="adultPrice" className={adminLabelClass}>
                Adult Price ($)
              </label>
              <input
                id="adultPrice"
                name="adultPrice"
                type="number"
                min="0"
                step="0.01"
                defaultValue={tour.adultPrice ?? ''}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="childPrice" className={adminLabelClass}>
                Child Price ($)
              </label>
              <input
                id="childPrice"
                name="childPrice"
                type="number"
                min="0"
                step="0.01"
                defaultValue={tour.childPrice ?? ''}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="tourRating" className={adminLabelClass}>
                Rating (0-5)
              </label>
              <input
                id="tourRating"
                name="tourRating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                defaultValue={tour.rating ?? ''}
                className={fieldClass}
              />
            </div>
            <div className="flex items-end pb-2">
              <label className="flex cursor-pointer items-center gap-2.5">
                <input
                  type="checkbox"
                  name="isFeatured"
                  value="true"
                  defaultChecked={tour.isFeatured}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary/30"
                />
                <span className="text-sm font-medium text-foreground">Featured Tour</span>
              </label>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className={adminPanelClass}>
          <label htmlFor="tourOverview" className="mb-5 block font-serif text-lg text-foreground">
            Overview
          </label>
          <textarea
            id="tourOverview"
            name="tourOverview"
            rows={6}
            defaultValue={tour.overview ?? ''}
            className={`${fieldClass} resize-y`}
          />
        </section>

        {/* Journey Map */}
        <section className={adminPanelClass}>
          <label htmlFor="tourMap" className="mb-5 block font-serif text-lg text-foreground">
            Journey map
          </label>
          <textarea
            id="tourMap"
            name="tourMap"
            rows={4}
            defaultValue={tour.journeyMap ?? ''}
            className={`${fieldClass} resize-y`}
            placeholder="URL or map markup for the tour journey"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            Leave empty to clear the journey map.
          </p>
        </section>

        {/* Included */}
        <section className={adminPanelClass}>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-serif text-lg text-foreground">Included</h2>
            <button
              type="button"
              onClick={() => addArrayItem(included, setIncluded)}
              className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              <Plus size={14} /> Add Item
            </button>
          </div>
          <div className="space-y-2.5">
            {included.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  value={item}
                  onChange={(e) => updateArrayItem(included, i, e.target.value, setIncluded)}
                  className={fieldClass}
                  placeholder="e.g. Airport transfers"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem(included, i, setIncluded)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Excluded */}
        <section className={adminPanelClass}>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-serif text-lg text-foreground">Excluded</h2>
            <button
              type="button"
              onClick={() => addArrayItem(excluded, setExcluded)}
              className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              <Plus size={14} /> Add Item
            </button>
          </div>
          <div className="space-y-2.5">
            {excluded.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  value={item}
                  onChange={(e) => updateArrayItem(excluded, i, e.target.value, setExcluded)}
                  className={fieldClass}
                  placeholder="e.g. International flights"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem(excluded, i, setExcluded)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Itinerary Builder */}
        <section className={adminPanelClass}>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-serif text-lg text-foreground">Itinerary</h2>
            <button
              type="button"
              onClick={addItineraryDay}
              className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              <Plus size={14} /> Add Day
            </button>
          </div>
          <div className="space-y-4">
            {itinerary.map((day, i) => (
              <div key={i} className="rounded-lg border border-border bg-muted/20 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">Day {day.day}</span>
                    <button
                      type="button"
                      onClick={() => moveItineraryDay(i, 'up')}
                      disabled={i === 0}
                      className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30"
                    >
                      <ArrowUp size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveItineraryDay(i, 'down')}
                      disabled={i === itinerary.length - 1}
                      className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30"
                    >
                      <ArrowDown size={13} />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItineraryDay(i)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <input
                      value={day.title}
                      onChange={(e) => updateItineraryDay(i, 'title', e.target.value)}
                      className={fieldClass}
                      placeholder={`Day ${day.day} title`}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <textarea
                      value={day.activities}
                      onChange={(e) => updateItineraryDay(i, 'activities', e.target.value)}
                      rows={3}
                      className={`${fieldClass} resize-y`}
                      placeholder="Activities description..."
                    />
                  </div>
                  <div>
                    <input
                      value={day.overnight}
                      onChange={(e) => updateItineraryDay(i, 'overnight', e.target.value)}
                      className={fieldClass}
                      placeholder="Overnight location"
                    />
                  </div>
                  <div>
                    <input
                      value={day.meals ?? ''}
                      onChange={(e) => updateItineraryDay(i, 'meals', e.target.value)}
                      className={fieldClass}
                      placeholder="Meals"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Existing Images */}
        {tour.gallery.length > 0 && (
          <section className={adminPanelClass}>
            <h2 className="mb-5 font-serif text-lg text-foreground">Existing Images</h2>
            <div className="flex flex-wrap gap-3">
              {tour.gallery.map((img) => {
                const marked = deleteImageIds.includes(img.id)
                return (
                  <div
                    key={img.id}
                    className={`relative h-28 w-28 cursor-pointer overflow-hidden rounded-lg border-2 transition-all ${
                      marked ? 'border-red-400 opacity-50' : 'border-border hover:border-primary'
                    }`}
                    onClick={() => toggleDeleteImage(img.id)}
                    title={marked ? 'Click to keep' : 'Click to mark for deletion'}
                  >
                    {/* Admin images can come from uploaded files or the media API. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.imageUrl}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                    {marked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-red-500/20">
                        <Trash2 size={18} className="text-red-600" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Click images to mark them for deletion
            </p>
          </section>
        )}

        {/* Add New Images */}
        <section className={adminPanelClass}>
          <h2 className="mb-5 font-serif text-lg text-foreground">Add New Images</h2>
          <input
            type="file"
            name="tourImages"
            multiple
            accept=".jpg,.jpeg,.png,.webp,.avif"
            onChange={(e) => setNewImages(Array.from(e.target.files ?? []))}
            className="block w-full cursor-pointer text-sm text-muted-foreground file:mr-3 file:rounded-lg file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary hover:file:bg-primary/20"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            JPG, PNG, WebP, or AVIF. Each image must be 4 MB or smaller.
          </p>
          {newImages.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {newImages.map((file, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-1 text-xs text-accent-foreground"
                >
                  {file.name}
                </span>
              ))}
            </div>
          )}
        </section>

        {/* Blocked Dates */}
        <section className={adminPanelClass}>
          <div className="mb-1 flex items-center gap-2">
            <CalendarOff size={16} className="text-accent" />
            <h2 className="font-serif text-lg text-foreground">Blocked Dates</h2>
          </div>
          <p className="mb-5 text-xs text-muted-foreground">
            Dates when this tour cannot be booked. Shown to travelers on the booking form.
          </p>

          {blockedError && (
            <div role="alert" className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              {blockedError}
            </div>
          )}

          <form onSubmit={handleBlockedDateSubmit} className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-[auto_1fr_auto]">
            <input
              type="date"
              required
              value={newBlockedDate}
              onChange={(e) => setNewBlockedDate(e.target.value)}
              className={`${fieldClass} sm:w-44`}
              aria-label="Blocked date"
            />
            <input
              type="text"
              value={blockedReason}
              onChange={(e) => setBlockedReason(e.target.value)}
              className={fieldClass}
              placeholder="Reason (optional) — e.g. Fully booked"
              aria-label="Reason"
            />
            <button
              type="submit"
              disabled={blockedSaving || !newBlockedDate}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {blockedSaving && <Loader2 size={16} className="animate-spin" />}
              <Plus size={16} />
              Add
            </button>
          </form>

          {blockedDates.length === 0 ? (
            <p className="text-sm text-muted-foreground">No blocked dates. The tour is bookable on any date.</p>
          ) : (
            <ul className="divide-y divide-border rounded-lg border border-border">
              {blockedDates.map((blockedDate) => (
                <li key={blockedDate.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(`${blockedDate.date}T00:00:00`))}
                    </p>
                    {blockedDate.reason && (
                      <p className="text-xs text-muted-foreground">{blockedDate.reason}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleBlockedDateDelete(blockedDate)}
                    disabled={blockedDeleting === blockedDate.id}
                    className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-wait disabled:opacity-50"
                    aria-label={`Remove blocked date ${blockedDate.date}`}
                  >
                    {blockedDeleting === blockedDate.id ? (
                      <Loader2 size={15} className="animate-spin" />
                    ) : (
                      <Trash2 size={15} />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Categories */}
        {categories.length > 0 && (
          <section className={adminPanelClass}>
            <h2 className="mb-5 font-serif text-lg text-foreground">Categories</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => {
                const selected = selectedCategories.includes(cat.id)
                return (
                  <label
                    key={cat.id}
                    className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3.5 py-2 text-sm transition-colors ${
                      selected
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border bg-card text-muted-foreground hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleCategory(cat.id)}
                      className="sr-only"
                    />
                    {cat.name}
                  </label>
                )
              })}
            </div>
          </section>
        )}

        {/* Submit */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            data-testid="save-tour"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting && <Loader2 size={16} className="animate-spin" />}
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/tours')}
            className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
