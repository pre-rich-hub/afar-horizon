import {useTranslations} from 'next-intl'
import { LinkButton } from '@/components/common/LinkButton'
import Link from '@/components/common/SiteLink'

export function NotFoundContent() {
  const tr = useTranslations('UI.common.NotFound')
  return (
    <section className="shell flex min-h-[72svh] flex-col items-center justify-center py-32 text-center">
      <p className="eyebrow justify-center text-accent">
        {tr('error')}
      </p>
      <h1 className="mt-6 max-w-[22ch] text-balance text-4xl leading-[1.08] text-foreground sm:text-5xl lg:text-6xl">
        {tr('title')}
      </h1>
      <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground sm:text-lg">
        {tr('description')}
      </p>
      <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <LinkButton href="/">{tr('home')}</LinkButton>
        <LinkButton href="/destinations" variant="outline" withArrow={false}>
          {tr('destinations')}
        </LinkButton>
      </div>
      <p className="mt-8 text-sm text-muted-foreground">
        {tr('or')}{' '}
        <Link
          href="/contact"
          className="border-b border-accent/50 pb-0.5 text-primary transition-colors hover:border-accent hover:text-accent"
        >
          {tr('contact')}
        </Link>{' '}
        {tr('instead')}
      </p>
    </section>
  )
}
