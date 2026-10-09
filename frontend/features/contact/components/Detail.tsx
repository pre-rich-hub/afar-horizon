export function Detail({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-4">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
      <div>
        <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </dt>
        <dd className="mt-1.5 text-pretty leading-relaxed text-foreground">
          {children}
        </dd>
      </div>
    </div>
  )
}
