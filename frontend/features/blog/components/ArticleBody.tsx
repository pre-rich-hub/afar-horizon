import { Reveal } from '@/components/common/Reveal';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { Post } from '../types/post.types';
import { articleParagraph } from '../utils/article.utils';

export function ArticleBody({ post, next }: { post: Post; next: Post }) {
  return (
    <div className="shell py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-2xl">
          {post.body.map((value, i) => {
            const para = articleParagraph(value)
            return (
            <Reveal key={i} delay={i * 50}>
              {para.heading && <h2 className="mt-10 text-balance font-serif text-2xl leading-tight text-foreground sm:text-3xl">{para.heading}</h2>}
              <p
                className={
                  i === 0
                    ? 'text-pretty text-lg leading-[1.75] text-foreground first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:leading-[0.82] first-letter:text-primary sm:text-xl'
                    : 'mt-7 text-pretty leading-[1.75] text-muted-foreground sm:text-lg'
                }
              >
                {para.parts.map((part, j) => part.href
                  ? <Link key={j} href={part.href} className="text-primary underline decoration-accent/50 underline-offset-4 transition-colors hover:text-accent">{part.text}</Link>
                  : part.text)}
              </p>
            </Reveal>
          )})}

          <Reveal className="mt-14 border-t border-border pt-8">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Written by{' '}
              <span className="font-medium text-foreground">{post.author}</span>,{' '}
              {post.authorRole.toLowerCase()}. Questions about any of the above
              are always welcome —{' '}
              <Link
                href="/contact"
                className="border-b border-accent/50 pb-0.5 text-primary transition-colors hover:border-accent hover:text-accent"
              >
                write to us
              </Link>
              .
            </p>
            {post.sources && <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Further reading:{' '}
              {post.sources.map((source, i) => <span key={source.href}>
                {i > 0 && '; '}
                <a href={source.href} className="text-primary underline underline-offset-4 hover:text-accent">{source.text}</a>
              </span>)}.
            </p>}
          </Reveal>

          <Reveal className="mt-12">
            <Link
              href={`/blog/${next.slug}`}
              className="group block border border-border bg-card p-6 transition-colors hover:border-primary/40 sm:p-8"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                Read Next
              </p>
              <p className="mt-3 text-balance font-serif text-xl text-foreground transition-colors group-hover:text-primary sm:text-2xl">
                {next.title}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                {next.readTime}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
  )
}
