'use client'

import { useAdminDestinations } from '../hooks/useAdminDestinations'

import { Edit3, Loader2, MapPin, Plus, Trash2, X } from 'lucide-react'
import {
AdminFeedback,
AdminLoading,
AdminPageHeader,
adminInputClass,
adminLabelClass,
adminPrimaryButtonClass,
adminSecondaryButtonClass,
} from './AdminPrimitives'

export function AdminDestinations() {
  const { items, loading, saving, deletingId, editing, formOpen, setFormOpen, feedback, formRef, openCreate, openEdit, submit, remove } = useAdminDestinations()

  return (
    <div className="p-8">
      <AdminPageHeader
        title="Destinations"
        description="Create and maintain the places featured across the website."
        action={(
          <button type="button" onClick={openCreate} className={adminPrimaryButtonClass} data-testid="add-destination">
            <Plus className="size-4" /> Add destination
          </button>
        )}
      />

      <AdminFeedback message={feedback} />

      {formOpen && (
        <form ref={formRef} onSubmit={submit} className="mb-8 rounded-xl border border-border bg-card p-6 shadow-sm" data-testid="destination-form">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl text-foreground">{editing ? 'Edit destination' : 'New destination'}</h2>
              <p className="mt-1 text-xs text-muted-foreground">Name, description, and a strong landscape image.</p>
            </div>
            <button type="button" onClick={() => setFormOpen(false)} className="rounded-lg p-2 text-muted-foreground hover:bg-muted" aria-label="Close form">
              <X className="size-4" />
            </button>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <label>
              <span className={adminLabelClass}>Destination name</span>
              <input name="destinationName" defaultValue={editing?.name ?? ''} className={adminInputClass} required />
            </label>
            <label>
              <span className={adminLabelClass}>Image {editing ? '(leave empty to keep current)' : ''}</span>
              <input name="destinationImage" type="file" accept="image/*" className={adminInputClass} required={!editing} />
            </label>
            <label className="md:col-span-2">
              <span className={adminLabelClass}>Description</span>
              <textarea name="destinationDescription" defaultValue={editing?.description ?? ''} className={`${adminInputClass} min-h-32 resize-y`} required />
            </label>
          </div>
          <div className="mt-5 flex justify-end gap-3">
            <button type="button" className={adminSecondaryButtonClass} onClick={() => setFormOpen(false)}>Cancel</button>
            <button type="submit" className={adminPrimaryButtonClass} disabled={saving} data-testid="save-destination">
              {saving && <Loader2 className="size-4 animate-spin" />}
              {editing ? 'Save changes' : 'Create destination'}
            </button>
          </div>
        </form>
      )}

      {loading ? <AdminLoading /> : items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground">
          <MapPin className="mx-auto mb-3 size-9 opacity-30" /> No destinations yet.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-xl border border-border bg-card shadow-sm" data-testid={`destination-${item.id}`}>
              <div
                className="h-40 bg-muted bg-cover bg-center"
                style={item.imageUrl ? { backgroundImage: `url("${item.imageUrl}")` } : undefined}
                role={item.imageUrl ? 'img' : undefined}
                aria-label={item.imageUrl ? item.name : undefined}
              />
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-serif text-xl text-foreground">{item.name}</h2>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wider text-accent">{item.tourCount ?? 0} tours</p>
                  </div>
                  <div className="flex gap-1">
                    <button type="button" onClick={() => openEdit(item)} className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label={`Edit ${item.name}`}><Edit3 className="size-4" /></button>
                    <button type="button" onClick={() => void remove(item)} disabled={deletingId === item.id} className="rounded-lg p-2 text-muted-foreground hover:bg-red-50 hover:text-red-600" aria-label={`Delete ${item.name}`}>
                      {deletingId === item.id ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
                    </button>
                  </div>
                </div>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{item.description || 'No description.'}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
