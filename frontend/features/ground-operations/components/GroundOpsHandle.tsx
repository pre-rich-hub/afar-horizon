import {useGroundOperationsCopy} from '../data/localized'
import { useTranslations } from 'next-intl'

import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import { handle as baseHandle } from '../data/ground-operations.data'

export function GroundOpsHandle() {
  const tr = useTranslations('UI.groundoperations.GroundOpsHandle')
  const handle = useGroundOperationsCopy('ground-operations.handle', baseHandle)

  return (
    <section className="border-y border-border bg-muted/40">
      <div className="shell py-16 sm:py-20 lg:py-24">
        <SectionHeading eyebrow={tr('whatWeHandle')} title={tr('theWholeGroundOperationOrTheParts')} />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {handle.map((h, i) => (
            <Reveal key={h.title} delay={i * 80} className="border-t-2 border-accent pt-5">
              <h3 className="font-serif text-2xl text-foreground">{h.title}</h3>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
                {h.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
