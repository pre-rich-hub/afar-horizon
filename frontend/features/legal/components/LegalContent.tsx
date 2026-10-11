import { useTranslations } from 'next-intl'

import { PageHero } from '@/components/common/PageHero'
import { contact } from '@/lib/constants/company'
import Link from '@/components/common/SiteLink'
import type { LegalPage } from '../types/legal.types'
import { defaultImage } from '@/lib/config/cloudinary'

export function LegalContent({ page }: { page: LegalPage }) {
  const tr = useTranslations('UI.legal.LegalContent')

  return <>
    <PageHero eyebrow={tr('afarHorizonExpeditions')} title={page.title} lede={page.intro} image={defaultImage} imageAlt="" crumbs={[{ label: tr('home'), href: '/' }, { label: page.title }]} />
    <section className="shell py-14 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm text-muted-foreground">{tr('lastUpdated')}{' '}<time dateTime="2026-10-11">{tr('october112026')}</time></p>
        {page.sections.map(section => <section key={section.title} className="mt-10 border-t border-border pt-8">
          <h2 className="font-serif text-2xl leading-tight text-foreground sm:text-3xl">{section.title}</h2>
          {section.paragraphs.map(text => <p key={text} className="mt-4 text-pretty leading-relaxed text-muted-foreground">{text}</p>)}
          {section.link && <Link href={section.link.href} className="mt-4 inline-block text-primary underline underline-offset-4 hover:text-accent">{section.link.label}</Link>}
        </section>)}
        <div className="mt-10 border border-border bg-card p-6">
          <p className="font-medium text-foreground">{tr('afarHorizonExpeditions')}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{contact.address}</p>
          <a href={`mailto:${contact.email}`} className="mt-3 inline-block text-primary underline underline-offset-4">{contact.email}</a>
        </div>
      </div>
    </section>
  </>
}
