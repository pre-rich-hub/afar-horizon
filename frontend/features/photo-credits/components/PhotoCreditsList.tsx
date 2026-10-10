import Image from 'next/image'
import { credits } from '../data/photo-credits.data'

export function PhotoCreditsList() {
  return (
    <section className="shell py-16 sm:py-20">
        <ul className="divide-y divide-border border-y border-border">
          {credits.map((c) => (
            <li key={c.src} className="flex items-center gap-5 py-4">
              <span className="relative h-16 w-24 shrink-0 overflow-hidden rounded-sm bg-muted">
                <Image src={c.src} alt="" fill sizes="96px" className="object-cover" />
              </span>
              <span className="min-w-0 text-sm leading-relaxed">
                <span className="block font-medium text-foreground">{c.subject}</span>
                <span className="text-muted-foreground">
                  Photo: {c.author} ·{' '}
                  <a href={c.page} target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">
                    {c.license}, via Wikimedia Commons
                  </a>
                </span>
              </span>
            </li>
          ))}
        </ul>
      </section>
  )
}
