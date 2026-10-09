import { Reveal } from '@/components/common/Reveal'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { brief } from '../data/about.data'

export function AboutBrief() {
  return (
    <section id="in-brief" className="scroll-mt-32 shell py-20 sm:py-24 lg:py-28">
        <Reveal className="mb-12 max-w-2xl sm:mb-16">
          <p className="eyebrow mb-5 text-accent">In brief</p>
          <h2 className="text-balance text-3xl leading-[1.1] text-foreground sm:text-4xl lg:text-5xl">
            Who, where and how we plan.
          </h2>
        </Reveal>

        <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
          {brief.map((b, i) => (
            <Reveal key={b.title} delay={i * 100} className="flex flex-col bg-card p-8 sm:p-10">
              <span className="font-serif text-5xl leading-none text-accent">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-6 text-2xl text-foreground">{b.title}</h3>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{b.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex justify-center sm:mt-12">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-foreground shadow-[0_12px_32px_-14px_oklch(0.705_0.098_76/0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-sand sm:text-xs"
          >
            Plan with us
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </section>
  )
}
