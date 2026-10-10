import { Reveal } from '@/components/common/Reveal'
import { accessUpdate } from '@/lib/constants/travelAdvice'
import { AlertTriangle, Check } from 'lucide-react'
import type { Destination } from '../types/destination.types'

export function DestinationHighlights({ d }: { d: Destination }) {
  return (<Reveal className="border-t border-border pt-12 lg:col-start-1 lg:row-start-2 lg:mt-14">
            <p className="eyebrow mb-6 text-primary">
              Highlights
            </p>
            <ul className="grid gap-5 sm:grid-cols-2 sm:gap-x-10">
              {d.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-pretty text-sm leading-relaxed text-foreground sm:text-base">
                    {h}
                  </span>
                </li>
              ))}
            </ul>

            {d.sections?.map((sec) => (
              <div key={sec.title} className="mt-12">
                <h3 className="font-serif text-2xl text-foreground sm:text-[1.75rem]">{sec.title}</h3>
                {sec.text && (
                  <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted-foreground">{sec.text}</p>
                )}
                {sec.items && (
                  <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 sm:gap-x-10">
                    {sec.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-foreground">
                        <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {d.note && (
              <div className="mt-12 flex gap-4 border border-border bg-card p-6 sm:p-7">
                <AlertTriangle aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div className="text-pretty text-sm leading-relaxed text-muted-foreground">
                  <p className="font-semibold text-foreground">{d.note.title}</p>
                  <p className="mt-2">{d.note.text}</p>
                  {(d.group === 'danakil' || d.region.startsWith('Tigray') || d.group === 'hub') && (
                    <p className="mt-2">
                      Official travel advice ({accessUpdate.checked}): {accessUpdate.text}{' '}
                      <a href={accessUpdate.source} target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">
                        Read the current advice
                      </a>
                    </p>
                  )}
                </div>
              </div>
            )}

            {d.faqs && d.faqs.length > 0 && (
              <div className="mt-12">
                <h3 className="font-serif text-2xl text-foreground sm:text-[1.75rem]">Questions travellers ask</h3>
                <dl className="mt-4 divide-y divide-border border-y border-border">
                  {d.faqs.map((f) => (
                    <div key={f.q} className="py-5">
                      <dt className="font-medium text-foreground">{f.q}</dt>
                      <dd className="mt-1.5 text-pretty text-sm leading-relaxed text-muted-foreground">{f.a}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </Reveal>)
}
