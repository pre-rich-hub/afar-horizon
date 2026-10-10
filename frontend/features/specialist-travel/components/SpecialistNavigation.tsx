import { tracks } from '../data/specialist-travel.data'

export function SpecialistNavigation() {
  return (
    <nav aria-label="Specialist travel" className="border-b border-border">
      <ul className="shell flex flex-wrap gap-x-8 gap-y-2 py-5 text-[11px] font-semibold uppercase tracking-[0.14em]">
        {tracks.map((t) => (
          <li key={t.id}>
            <a href={`#${t.id}`} className="text-muted-foreground transition-colors hover:text-accent">
              {t.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
