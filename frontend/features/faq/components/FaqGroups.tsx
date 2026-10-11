import { TranslatedText } from '@/components/common/TranslatedText'

import { TranslationBoundary } from '@/components/common/TranslationBoundary'
import { Reveal } from '@/components/common/Reveal'
import { faqGroups } from '../data/faq.data'

export function FaqGroups() {
  return (
    <TranslationBoundary><div className="shell py-16 sm:py-20 lg:py-24">
        {faqGroups.map((g, gi) => (
          <TranslationBoundary key={g.title}><section
            key={g.title}
            className={`grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16 ${gi > 0 ? 'mt-16 border-t border-border pt-16' : ''}`}
          >
            <Reveal>
              <h2 className="text-balance font-serif text-3xl leading-[1.1] text-foreground">{g.title}</h2>
            </Reveal>
            <Reveal delay={100}>
              <dl className="divide-y divide-border border-y border-border">
                {g.items.map((f) => (
                  <TranslationBoundary key={f.q}><div key={f.q} className="py-6">
                    <dt className="font-serif text-xl text-foreground">{f.q}</dt>
                    <dd className="mt-2 text-pretty leading-relaxed text-muted-foreground"><TranslatedText text={f.a} /></dd>
                  </div></TranslationBoundary>
                ))}
              </dl>
            </Reveal>
          </section></TranslationBoundary>
        ))}
      </div></TranslationBoundary>
  )
}
