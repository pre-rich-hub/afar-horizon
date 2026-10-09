import { Reveal } from '@/components/common/Reveal'
import Image from 'next/image'

export function Chapter({
  eyebrow,
  title,
  image,
  imageAlt,
  reverse,
  children,
}: {
  eyebrow: string
  title: string
  image: string
  imageAlt: string
  reverse?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
      <Reveal className={reverse ? 'lg:order-2' : undefined}>
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted shadow-[0_40px_80px_-40px_oklch(0.185_0.012_58/0.55)]">
          <Image src={image} alt={imageAlt} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
        </div>
      </Reveal>
      <Reveal delay={120}>
        <p className="eyebrow mb-5 text-accent">{eyebrow}</p>
        <h2 className="max-w-[18ch] text-balance text-3xl leading-[1.1] text-foreground sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        <div className="mt-8 space-y-5 text-pretty leading-relaxed text-muted-foreground sm:text-lg">
          {children}
        </div>
      </Reveal>
    </div>
  )
}
