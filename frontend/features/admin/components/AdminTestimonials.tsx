'use client'

import { useAdminTestimonials } from '../hooks/useAdminTestimonials'

import { Edit3, Loader2, Plus, Quote, Star, Trash2, X } from 'lucide-react'
import {
AdminFeedback,
AdminLoading,
AdminPageHeader,
adminInputClass,
adminLabelClass,
adminPrimaryButtonClass,
adminSecondaryButtonClass,
} from './AdminPrimitives'

export function AdminTestimonials() {
  const { items, loading, saving, editing, formOpen, setFormOpen, feedback, success, deletingId, showForm, submit, remove } = useAdminTestimonials()

  return (
    <div className="p-8">
      <AdminPageHeader
        title="Testimonials"
        description="Manage verified guest stories shown across the website."
        action={<button type="button" onClick={() => showForm(null)} className={adminPrimaryButtonClass} data-testid="add-testimonial"><Plus className="size-4" /> Add testimonial</button>}
      />
      <AdminFeedback message={feedback} />
      <AdminFeedback message={success} tone="success" />

      {formOpen && (
        <form key={editing?.id ?? 'new'} onSubmit={submit} className="mb-8 rounded-xl border border-border bg-card p-6 shadow-sm" data-testid="testimonial-form">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-serif text-xl text-foreground">{editing ? 'Edit testimonial' : 'New testimonial'}</h2>
            <button type="button" onClick={() => setFormOpen(false)} className="rounded-lg p-2 text-muted-foreground hover:bg-muted" aria-label="Close form"><X className="size-4" /></button>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <label><span className={adminLabelClass}>Guest name</span><input name="reviewerName" defaultValue={editing?.reviewerName ?? ''} className={adminInputClass} required /></label>
            <label><span className={adminLabelClass}>Profession or trip</span><input name="profession" defaultValue={editing?.profession ?? ''} className={adminInputClass} /></label>
            <label className="md:col-span-2"><span className={adminLabelClass}>Guest message</span><textarea name="message" defaultValue={editing?.message ?? ''} className={`${adminInputClass} min-h-32 resize-y`} required /></label>
          </div>
          <div className="mt-5 flex justify-end gap-3">
            <button type="button" onClick={() => setFormOpen(false)} className={adminSecondaryButtonClass}>Cancel</button>
            <button type="submit" disabled={saving} className={adminPrimaryButtonClass} data-testid="save-testimonial">{saving && <Loader2 className="size-4 animate-spin" />} {editing ? 'Save changes' : 'Create testimonial'}</button>
          </div>
        </form>
      )}

      {loading ? <AdminLoading /> : items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground"><Star className="mx-auto mb-3 size-9 opacity-30" />No testimonials yet.</div>
      ) : (
        <div>
          <p className="mb-4 text-sm text-muted-foreground" data-testid="testimonial-count">
            Showing all {items.length} {items.length === 1 ? 'testimonial' : 'testimonials'}
          </p>
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <article key={item.id} className="relative rounded-xl border border-border bg-card p-6 shadow-sm" data-testid={`testimonial-${item.id}`}>
                <Quote className="absolute right-5 top-5 size-8 text-accent/15" />
                <span className="mb-4 inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wider text-primary">
                  Visible on website
                </span>
                <p className="pr-8 text-sm leading-7 text-foreground/80">“{item.message}”</p>
                <div className="mt-5 flex items-end justify-between gap-4 border-t border-border/60 pt-4">
                  <div><h2 className="font-medium text-foreground">{item.reviewerName}</h2><p className="mt-1 text-xs text-muted-foreground">{item.profession || 'Guest traveler'}</p></div>
                  <div className="flex flex-wrap justify-end gap-2">
                    <button type="button" onClick={() => showForm(item)} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground transition hover:border-accent hover:bg-accent/10" aria-label={`Edit ${item.reviewerName}`} data-testid={`edit-testimonial-${item.id}`}><Edit3 className="size-3.5" /> Edit</button>
                    <button type="button" onClick={() => void remove(item)} disabled={deletingId === item.id} className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-wait disabled:opacity-60" aria-label={`Delete ${item.reviewerName}`} data-testid={`delete-testimonial-${item.id}`}>{deletingId === item.id ? <Loader2 className="size-3.5 animate-spin" /> : <Trash2 className="size-3.5" />} Delete</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
