
import { TranslationBoundary } from '@/components/common/TranslationBoundary'
import Image from 'next/image'
import { credits } from '../data/photo-credits.data'

export function PhotoCreditsList() {
  return (
    <TranslationBoundary><section className="shell py-16 sm:py-20">
        <ul className="divide-y divide-border border-y border-border">
          {credits.map((c) => (
            <TranslationBoundary key={c.src}><li key={c.src} className="flex items-center gap-5 py-4">
              <span className="relative h-16 w-24 shrink-0 overflow-hidden rounded-sm bg-muted">
                <Image src={c.src} alt="" fill sizes="96px" className="object-cover" />
              </span>
              <span className="min-w-0 text-sm leading-relaxed">
                <span className="block font-medium text-foreground">{c.subject}</span>
                <span className="text-muted-foreground">
                  Client-provided photo collection ·{' '}
                  <a href={c.src} target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">
                    View on Cloudinary
                  </a>
                </span>
              </span>
            </li></TranslationBoundary>
          ))}
        </ul>
      </section></TranslationBoundary>
  )
}
