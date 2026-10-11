import {useSpecialistTravelCopy} from '../data/localized'
import { useTranslations } from 'next-intl'

import { tracks as baseTracks } from '../data/specialist-travel.data'

export function SpecialistNavigation() {
  const tr = useTranslations('UI.specialisttravel.SpecialistNavigation')
  const tracks = useSpecialistTravelCopy('specialist-travel.tracks', baseTracks)

  return (
    <nav aria-label={tr('specialistTravel')} className="border-b border-border">
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
