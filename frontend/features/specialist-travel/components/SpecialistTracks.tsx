import { Reveal } from '@/components/common/Reveal'
import Image from 'next/image'
import { tracks } from '../data/specialist-travel.data'

export function SpecialistTracks() {
  return (
    <>
      {tracks.map((t, i) => (
        <section key={t.id} id={t.id} className="scroll-mt-24 border-b border-border">
          <div className="shell grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24">
            <Reveal className={i % 2 ? 'lg:order-2' : ''}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <Image src={t.image} alt={t.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="text-balance text-3xl leading-[1.1] text-foreground sm:text-4xl">{t.title}</h2>
              <p className="mt-5 text-pretty leading-relaxed text-muted-foreground sm:text-lg">{t.lede}</p>
              <ul className="mt-7 space-y-2.5">
                {t.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-foreground">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              {t.note && <p className="mt-5 text-xs leading-relaxed text-muted-foreground">{t.note}</p>}
            </Reveal>
          </div>
        </section>
      ))}
    </>
  )
}
