import {useBeforeYouGoCopy} from '../data/localized'
import { useTranslations } from 'next-intl'

import { Reveal } from '@/components/common/Reveal'
import Link from '@/components/common/SiteLink'
import { packing as basePacking, respect as baseRespect, topics as baseTopics } from '../data/before-you-go.data'

export function BeforeYouGoGuide() {
  const tr = useTranslations('UI.beforeyougo.BeforeYouGoGuide')
  const topics = useBeforeYouGoCopy('before-you-go.topics', baseTopics)
  const packing = useBeforeYouGoCopy('before-you-go.packing', basePacking)
  const respect = useBeforeYouGoCopy('before-you-go.respect', baseRespect)

  return (
    <div className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[240px_1fr] lg:gap-16 lg:py-24">
      <nav aria-label={tr('onThisPage')} className="hidden lg:block">
        <ul className="sticky top-28 space-y-2.5 border-l border-border pl-5 text-sm">
          {[...topics, { id: 'packing', title: tr('whatToPack') }, { id: 'respect', title: tr('travelWithRespect') }].map((t) => (
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
            {tr('heatRemotenessRoughRoadsBasicCampsAnd')}</p>
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
            </div>
          </Reveal>
        ))}

        <Reveal as="section" className="mt-12 border-t border-border pt-10">
          <h2 id="altitude-heat" className="scroll-mt-28 font-serif text-3xl text-foreground">{tr('altitudeOrHeat')}</h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            {tr('ethiopiaCanChallengeYourBodyInOpposite')}</p>
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
          <h2 id="packing" className="scroll-mt-28 font-serif text-3xl text-foreground">{tr('whatToPackForTheDanakil')}</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-x-10">
            {packing.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-foreground">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-pretty text-sm leading-relaxed text-muted-foreground">
            {tr('mostImportantlyDoNotUnderestimateTheHeat')}
          </p>
        </Reveal>

        <Reveal as="section" className="mt-12 border-t border-border pt-10">
          <h2 id="respect" className="scroll-mt-28 font-serif text-3xl text-foreground">{tr('travelWithRespect')}</h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            {tr('photographPeopleNotAtPeopleAGood')}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-x-10">
            {respect.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-foreground">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">
            {tr('aFewWordsHelp')}{' '}<span className="text-foreground">{tr('selam')}</span> {tr('hello')}{' '}
            <span className="text-foreground">{tr('amesegenallo')}</span> {tr('thankYou')}</p>
        </Reveal>

        <Reveal className="mt-14 border border-border bg-card p-6 sm:p-8">
          <p className="font-serif text-2xl text-foreground">{tr('stillHaveQuestions')}</p>
          <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
            {tr('readOur')}{' '}<Link href="/faq" className="text-primary underline-offset-4 hover:underline">{tr('faq')}</Link>{tr('compare')}{' '}<Link href="/expeditions" className="text-primary underline-offset-4 hover:underline">{tr('expeditions')}</Link>{tr('orAskUsAboutCurrentConditionsFor')}</p>
          <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
            {tr('wonderingAboutSafety')}{' '}<Link href="/safety" className="text-primary underline-offset-4 hover:underline">{tr('readHowWeKeepYouSafe')}</Link>
          </p>
        </Reveal>
      </div>
    </div>
  )
}
