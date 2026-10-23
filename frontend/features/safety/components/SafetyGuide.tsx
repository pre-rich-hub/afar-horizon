import {useSafetyCopy} from '../data/localized'
import {useSharedCopy} from '@/lib/i18n/localized'
import { useTranslations } from 'next-intl'

import { Reveal } from '@/components/common/Reveal'
import Link from '@/components/common/SiteLink'
import { safety as baseSafety } from '@/lib/constants/company'
import { officialAdvice as baseOfficialAdvice, response as baseResponse, sections as baseSections } from '../data/safety.data'

const linkClass = 'text-primary underline-offset-4 hover:underline'

export function SafetyGuide() {
  const tr = useTranslations('UI.safety.SafetyGuide')
  const safety = useSharedCopy('company.safety', baseSafety)
  const sections = useSafetyCopy('safety.sections', baseSections)
  const response = useSafetyCopy('safety.response', baseResponse)
  const officialAdvice = useSafetyCopy('safety.officialAdvice', baseOfficialAdvice)

  return (
    <div className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[240px_1fr] lg:gap-16 lg:py-24">
      <nav aria-label={tr('onThisPage')} className="hidden lg:block">
        <ul className="sticky top-28 space-y-2.5 border-l border-border pl-5 text-sm">
          {[...sections, { id: 'when-conditions-change', title: tr('whenConditionsChange') }, { id: 'official-advice', title: tr('officialTravelAdvice') }].map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-muted-foreground transition-colors hover:text-accent">
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="max-w-3xl">
        <Reveal>
          <p className="text-pretty text-lg leading-relaxed text-foreground sm:text-xl">
            {safety.summary}
          </p>
          {safety.record && (
            <p className="mt-4 text-pretty text-lg font-medium leading-relaxed text-foreground sm:text-xl">
              {safety.record}
            </p>
          )}
        </Reveal>

        {sections.map((s) => (
          <Reveal key={s.id} as="section" className="mt-12 scroll-mt-28 border-t border-border pt-10">
            <h2 id={s.id} className="scroll-mt-28 font-serif text-3xl text-foreground">{s.title}</h2>
            <div className="mt-4 space-y-4">
              {s.text.map((p) => (
                <p key={p.slice(0, 30)} className="text-pretty leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
            {s.items && (
              <ul className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-x-10">
                {s.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-foreground">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        ))}

        <Reveal as="section" className="mt-12 border-t border-border pt-10">
          <h2 id="when-conditions-change" className="scroll-mt-28 font-serif text-3xl text-foreground">{tr('whenConditionsChange')}</h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            {tr('inARemoteEnvironmentPlansSometimesHave')}
          </p>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2">
            {response.map((r, i) => (
              <li key={r.title} className="flex gap-4 border border-border bg-card p-5">
                <span className="font-serif text-2xl leading-none text-accent">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <p className="font-semibold text-foreground">{r.title}</p>
                  <p className="mt-1 text-pretty text-sm leading-relaxed text-muted-foreground">{r.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal as="section" className="mt-12 border-t border-border pt-10">
          <h2 id="official-advice" className="scroll-mt-28 font-serif text-3xl text-foreground">{tr('officialTravelAdvice')}</h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{officialAdvice}</p>
        </Reveal>

        <Reveal className="mt-14 border border-border bg-card p-6 sm:p-8">
          <p className="font-serif text-2xl text-foreground">{tr('haveAQuestionAboutSafety')}</p>
          <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
            {tr('read')}{' '}<Link href="/before-you-go" className={linkClass}>{tr('beforeYouGo')}</Link>{tr('checkThe')}{' '}<Link href="/faq" className={linkClass}>{tr('faq')}</Link>{tr('or')}{' '}<Link href="/contact" className={linkClass}>{tr('askUsDirectly')}</Link>{' '}{tr('aboutCurrentConditionsForYourDates')}
          </p>
        </Reveal>
      </div>
    </div>
  )
}
