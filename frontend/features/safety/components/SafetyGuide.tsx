
import { TranslatedText } from '@/components/common/TranslatedText'
import { TranslationBoundary } from '@/components/common/TranslationBoundary'
import { Reveal } from '@/components/common/Reveal'
import Link from '@/components/common/SiteLink'
import { safety } from '@/lib/constants/company'
import { officialAdvice, response, sections } from '../data/safety.data'

export function SafetyGuide() {
  return (
    <TranslationBoundary><div className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[240px_1fr] lg:gap-16 lg:py-24">
      <nav aria-label="On this page" className="hidden lg:block">
        <ul className="sticky top-28 space-y-2.5 border-l border-border pl-5 text-sm">
          {[...sections, { id: 'when-conditions-change', title: 'When conditions change' }, { id: 'official-advice', title: 'Official travel advice' }].map((s) => (
            <TranslationBoundary key={s.id}><li key={s.id}>
              <a href={`#${s.id}`} className="text-muted-foreground transition-colors hover:text-accent">
                {s.title}
              </a>
            </li></TranslationBoundary>
          ))}
        </ul>
      </nav>

      <div className="max-w-3xl">
        <Reveal>
          <p className="text-pretty text-lg leading-relaxed text-foreground sm:text-xl">
            <TranslatedText text={safety.summary} />
          </p>
          {safety.record && (
            <p className="mt-4 text-pretty text-lg font-medium leading-relaxed text-foreground sm:text-xl">
              <TranslatedText text={safety.record} />
            </p>
          )}
        </Reveal>

        {sections.map((s) => (
          <TranslationBoundary key={s.id}><Reveal key={s.id} as="section" className="mt-12 scroll-mt-28 border-t border-border pt-10">
            <h2 id={s.id} className="scroll-mt-28 font-serif text-3xl text-foreground"><TranslatedText text={s.title} /></h2>
            <div className="mt-4 space-y-4">
              {s.text.map((p) => (
                <TranslationBoundary key={p.slice(0, 30)}><p key={p.slice(0, 30)} className="text-pretty leading-relaxed text-muted-foreground">
                  <TranslatedText text={p} />
                </p></TranslationBoundary>
              ))}
            </div>
            {s.items && (
              <ul className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-x-10">
                {s.items.map((item) => (
                  <TranslationBoundary key={item}><li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-foreground">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <TranslatedText text={item} />
                  </li></TranslationBoundary>
                ))}
              </ul>
            )}
          </Reveal></TranslationBoundary>
        ))}

        <Reveal as="section" className="mt-12 border-t border-border pt-10">
          <h2 id="when-conditions-change" className="scroll-mt-28 font-serif text-3xl text-foreground">When conditions change</h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            <TranslatedText text={"In a remote environment, plans sometimes have to change. When they do, we follow the same steps every time: people before itineraries."} />
          </p>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2">
            {response.map((r, i) => (
              <TranslationBoundary key={r.title}><li key={r.title} className="flex gap-4 border border-border bg-card p-5">
                <span className="font-serif text-2xl leading-none text-accent">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <p className="font-semibold text-foreground"><TranslatedText text={r.title} /></p>
                  <p className="mt-1 text-pretty text-sm leading-relaxed text-muted-foreground"><TranslatedText text={r.text} /></p>
                </div>
              </li></TranslationBoundary>
            ))}
          </ol>
        </Reveal>

        <Reveal as="section" className="mt-12 border-t border-border pt-10">
          <h2 id="official-advice" className="scroll-mt-28 font-serif text-3xl text-foreground">Official travel advice</h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground"><TranslatedText text={officialAdvice} /></p>
        </Reveal>

        <Reveal className="mt-14 border border-border bg-card p-6 sm:p-8">
          <p className="font-serif text-2xl text-foreground">Have a question about safety?</p>
          <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
            Read <Link href="/before-you-go" className="text-primary underline-offset-4 hover:underline">Before You Go</Link>,
            check the <Link href="/faq" className="text-primary underline-offset-4 hover:underline">FAQ</Link>,
            or <Link href="/contact" className="text-primary underline-offset-4 hover:underline">ask us directly</Link> about current conditions for your dates.
          </p>
        </Reveal>
      </div>
    </div></TranslationBoundary>
  )
}
