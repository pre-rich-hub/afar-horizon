import { Reveal } from '@/components/common/Reveal'
import { accessUpdate } from '@/lib/constants/travelAdvice'
import Link from 'next/link'
import { packing, respect, topics } from '../data/before-you-go.data'

export function BeforeYouGoGuide() {
  return (
    <div className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[240px_1fr] lg:gap-16 lg:py-24">
      <nav aria-label="On this page" className="hidden lg:block">
        <ul className="sticky top-28 space-y-2.5 border-l border-border pl-5 text-sm">
          {[...topics, { id: 'packing', title: 'What to pack' }, { id: 'respect', title: 'Travel with respect' }].map((t) => (
            <li key={t.id}>
              <a href={`#${t.id}`} className="text-muted-foreground transition-colors hover:text-accent">
                {t.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="max-w-3xl">
        <Reveal>
          <p className="text-pretty text-lg leading-relaxed text-foreground sm:text-xl">
            Heat, remoteness, rough roads, basic camps and early starts are part of a Danakil
            expedition. None of them should frighten you, but all of them should be expected.
            This page explains each one, and what we do about it.
          </p>
        </Reveal>

        {topics.map((t) => (
          <Reveal key={t.id} as="section" className="scroll-mt-28 border-t border-border pt-10 mt-12" >
            <h2 id={t.id} className="scroll-mt-28 font-serif text-3xl text-foreground">{t.title}</h2>
            <div className="mt-4 space-y-4">
              {t.text.map((p) => (
                <p key={p.slice(0, 30)} className="text-pretty leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
              {t.id === 'safety' && (
                <p className="border-l-2 border-accent bg-muted/60 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">Official travel advice ({accessUpdate.checked}):</span>{' '}
                  {accessUpdate.text}{' '}
                  <a href={accessUpdate.source} target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">
                    Read the current advice
                  </a>
                </p>
              )}
            </div>
          </Reveal>
        ))}

        <Reveal as="section" className="mt-12 border-t border-border pt-10">
          <h2 id="altitude-heat" className="scroll-mt-28 font-serif text-3xl text-foreground">Altitude or heat?</h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Ethiopia can challenge your body in opposite ways, sometimes within the same week.
            That is why we explain the demands of your specific route rather than using one difficulty rating.
          </p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              { k: 'Danakil', v: 'Heat, dehydration, rough roads and remote conditions. Low altitude.' },
              { k: 'Simien', v: 'Altitude, cold, walking and terrain. Variable weather.' },
            ].map((r) => (
              <div key={r.k} className="border border-border bg-card p-5">
                <dt className="eyebrow mb-2 text-accent">{r.k}</dt>
                <dd className="text-sm leading-relaxed text-foreground">{r.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal as="section" className="mt-12 border-t border-border pt-10">
          <h2 id="packing" className="scroll-mt-28 font-serif text-3xl text-foreground">What to pack for the Danakil</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-x-10">
            {packing.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-foreground">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-pretty text-sm leading-relaxed text-muted-foreground">
            Most importantly: do not underestimate the heat. For medical advice, consult a qualified
            healthcare professional before you travel, and make sure your travel insurance covers remote areas.
          </p>
        </Reveal>

        <Reveal as="section" className="mt-12 border-t border-border pt-10">
          <h2 id="respect" className="scroll-mt-28 font-serif text-3xl text-foreground">Travel with respect</h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Photograph people, not at people. A good photograph should not require a bad experience
            for the person in front of your camera.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-x-10">
            {respect.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-foreground">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">
            A few words help: <span className="text-foreground">Selam</span> (hello),{' '}
            <span className="text-foreground">Amesegenallo</span> (thank you).
          </p>
        </Reveal>

        <Reveal className="mt-14 border border-border bg-card p-6 sm:p-8">
          <p className="font-serif text-2xl text-foreground">Still have questions?</p>
          <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
            Read our <Link href="/faq" className="text-primary underline-offset-4 hover:underline">FAQ</Link>,
            compare <Link href="/expeditions" className="text-primary underline-offset-4 hover:underline">expeditions</Link>,
            or ask us about current conditions for your dates.
          </p>
        </Reveal>
      </div>
    </div>
  )
}
