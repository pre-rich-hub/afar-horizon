'use client'

import { useAdminTourCategories } from '../hooks/useAdminTourCategories'

import { Edit3, Plus, Tags, Trash2 } from 'lucide-react'
import {
AdminFeedback,
AdminLoading,
AdminPageHeader,
adminInputClass,
adminPrimaryButtonClass,
} from './AdminPrimitives'

export function AdminTourCategories() {
  const { items, loading, feedback, add, rename, remove } = useAdminTourCategories()

  return (
    <div className="p-8">
      <AdminPageHeader title="Tour Categories" description="Organize tour packages into clear collections." />
      <AdminFeedback message={feedback} />
      <form onSubmit={add} className="mb-8 flex max-w-xl gap-3 rounded-xl border border-border bg-card p-5 shadow-sm" data-testid="tour-category-form"><input name="categoryName" className={adminInputClass} placeholder="e.g. Cultural Tours" required /><button type="submit" className={adminPrimaryButtonClass}><Plus className="size-4" /> Add</button></form>
      {loading ? <AdminLoading /> : items.length === 0 ? <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground"><Tags className="mx-auto mb-3 size-9 opacity-30" />No categories yet.</div> : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{items.map((item) => <article key={item.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-5 shadow-sm" data-testid={`tour-category-${item.id}`}><div><h2 className="font-medium text-foreground">{item.name}</h2><p className="mt-1 text-xs text-muted-foreground">{item.tourCount ?? 0} linked tours</p></div><div className="flex gap-1"><button type="button" onClick={() => void rename(item)} className="rounded-lg p-2 text-muted-foreground hover:bg-muted" aria-label={`Rename ${item.name}`}><Edit3 className="size-4" /></button><button type="button" onClick={() => void remove(item)} className="rounded-lg p-2 text-muted-foreground hover:bg-red-50 hover:text-red-600" aria-label={`Delete ${item.name}`}><Trash2 className="size-4" /></button></div></article>)}</div>
      )}
    </div>
  )
}
