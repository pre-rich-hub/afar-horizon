import { useTranslations } from 'next-intl'

import { Reveal } from '@/components/common/Reveal'

export function GroundOpsIntro() {
  const tr = useTranslations('UI.groundoperations.GroundOpsIntro')

  return (
    <section className="shell grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:gap-20 lg:py-24">
      <Reveal>
        <p className="eyebrow mb-5 text-accent">{tr('oneLocalPartner')}</p>
        <h2 className="max-w-[18ch] text-balance text-3xl leading-[1.1] text-foreground sm:text-4xl">
          {tr('oneResponsibleContactOneTeamOnThe')}</h2>
      </Reveal>
      <Reveal delay={120} className="space-y-5 text-pretty leading-relaxed text-muted-foreground sm:text-lg">
        <p>
          {tr('insteadOfAnOverseasAgencyCoordinatingFive')}</p>
        <p>
          {tr('weSpecialiseInTheDanakilAfarAnd')}</p>
      </Reveal>
    </section>
  )
}
