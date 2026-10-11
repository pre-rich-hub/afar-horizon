import {getTranslations, setRequestLocale} from 'next-intl/server'
import {requireLocale} from '@/i18n/locale'
import { createPageMetadata } from '@/lib/seo/metadata'
import { BlogHero, BlogNewsletter, BlogPlanning, FeaturedPost, getPostCollection, PostArchive } from '@/features/blog'

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
 const {locale: rawLocale} = await params
 const locale = requireLocale(rawLocale)
 const tr = await getTranslations({locale, namespace: 'Pages'})
 return createPageMetadata({
  "title": tr('blog_title'),
  "description": tr('blog_description'),
  "path": "/blog",
  "image": "https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/afar.png",
  "imageAlt": tr('blog_imageAlt'),
  locale,
})
}

export default async function BlogPage({params}: {params: Promise<{locale: string}>}) {
 const {locale: rawLocale} = await params
 const locale = requireLocale(rawLocale)
 setRequestLocale(locale)

  const { featured, rest } = getPostCollection()

  return (
    <>
      <BlogHero />

      {/* Featured */}
      <FeaturedPost featured={featured} />

      {/* All posts */}
      <PostArchive rest={rest} />

      {/* Newsletter */}
      <BlogNewsletter />

      <BlogPlanning />
    </>
  )
}
