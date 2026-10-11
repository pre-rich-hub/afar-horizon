
import { TranslationBoundary } from '@/components/common/TranslationBoundary'
import { defaultImage } from '@/lib/config/cloudinary'
import { Reveal } from '@/components/common/Reveal'
import Image from 'next/image'
import type { Post } from '../types/post.types'

export function ArticleImage({ post }: { post: Post }) {
  return (
    <TranslationBoundary><Reveal className="shell pt-10 sm:pt-14">
        <figure className="relative mx-auto aspect-[16/9] max-w-4xl overflow-hidden rounded-sm">
          <Image
            src={post.image || defaultImage}
            alt={post.imageAlt ?? post.title}
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover"
          />
        </figure>
      </Reveal></TranslationBoundary>
  )
}
