import { cn } from '@/lib/utils'
import { ArrowRight, Check } from 'lucide-react'

// Shared pieces of the detailed request forms.

export function FormShell({
  children,
  onSubmit,
  state,
  setState,
  error,
  setError,
  submitLabel,
  footnote,
}: {
  children: React.ReactNode
  onSubmit: (data: FormData) => Promise<void>
  state: 'idle' | 'sending' | 'sent'
  setState: (s: 'idle' | 'sending' | 'sent') => void
  error: string | null
  setError: (e: string | null) => void
  submitLabel: string
  footnote: string
}) {
  return (
    <div className="border border-border bg-card p-6 shadow-[0_28px_70px_-40px_oklch(0.185_0.012_58/0.4)] sm:p-8 lg:p-10">
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          setError(null)
          setState('sending')
          try {
            await onSubmit(new FormData(e.currentTarget))
            setState('sent')
          } catch (err) {
            setState('idle')
            setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
          }
        }}
        className="space-y-8"
      >
        {children}

        {error && (
          <p className="text-xs text-red-600" role="alert">
            {error}
          </p>
        )}

        <div>
          <button
            type="submit"
            disabled={state === 'sending'}
            className="group inline-flex w-full items-center justify-center gap-2.5 bg-primary px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-colors duration-300 hover:bg-charcoal disabled:opacity-60 sm:w-auto"
          >
            {state === 'sending' ? 'Sending…' : submitLabel}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{footnote}</p>
        </div>
      </form>
    </div>
  )
}

export function Sent({ text }: { text: string }) {
  return (
    <div className="flex min-h-[380px] flex-col items-center justify-center border border-border bg-card px-6 py-16 text-center">
      <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Check className="h-6 w-6" />
      </span>
      <h3 className="font-serif text-3xl text-foreground">Request received</h3>
      <p className="mt-4 max-w-sm text-pretty leading-relaxed text-muted-foreground">{text}</p>
    </div>
  )
}

export function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-4 font-serif text-xl text-foreground">{title}</legend>
      <div className="grid gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  )
}

export function Chips({
  label,
  options,
  selected,
  toggle,
}: {
  label: string
  options: string[]
  selected: string[]
  toggle: (v: string) => void
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = selected.includes(o)
          return (
            <button
              key={o}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(o)}
              className={cn(
                'border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-200',
                on
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground',
              )}
            >
              {o}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

export function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  )
}
