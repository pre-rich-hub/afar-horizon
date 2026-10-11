
import { TranslationBoundary } from '@/components/common/TranslationBoundary'
import { Reveal } from '@/components/common/Reveal'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from '@/components/common/SiteLink'
import type { Post } from '../types/post.types'
import { formatEditorialDate } from '@/lib/utils/date'

export function ArticleHeader({ post }: { post: Post }) {
  return (
    <TranslationBoundary><header className="border-b border-border">
        <div className="shell pb-12 pt-32 sm:pb-16 sm:pt-36 lg:pt-40">
          <Reveal className="mx-auto max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:text-[11px]">
              <Link href="/" className="transition-colors hover:text-primary">Home</Link>
              <ChevronRight aria-hidden className="h-3 w-3 opacity-50" />
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-primary sm:text-[11px]"
              >
                The Journal
              </Link>
              <ChevronRight aria-hidden className="h-3 w-3 opacity-50" />
              <span aria-current="page" className="normal-case tracking-normal">{post.title}</span>
            </nav>

            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <span className="text-accent">{post.category}</span>
              <span className="h-3 w-px bg-border" aria-hidden />
              {post.publishedAt ? <time dateTime={post.publishedAt}>{formatEditorialDate(post.publishedAt)}</time> : post.date}
              <span className="h-3 w-px bg-border" aria-hidden />
              {post.readTime}
              {post.updatedAt && <>
                <span className="h-3 w-px bg-border" aria-hidden />
                <span>Updated <time dateTime={post.updatedAt}>{formatEditorialDate(post.updatedAt)}</time></span>
              </>}
            </p>

            <h1 className="mt-5 text-balance text-[2rem] font-medium leading-[1.1] text-foreground sm:text-4xl lg:text-[3.25rem]">
              {post.title}
            </h1>

            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {post.excerpt}
            </p>

            <div className="mt-9 flex items-center gap-4 border-t border-border pt-7">
              <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                <Image
                  src="https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/afar.png"
                  alt=""
                  aria-hidden
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </span>
              <span>
                <span className="block text-sm font-medium text-foreground">
                  {post.author}
                </span>
                <span className="block text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {post.authorRole}
                </span>
              </span>
            </div>
          </Reveal>
        </div>
      </header></TranslationBoundary>
  )
}
