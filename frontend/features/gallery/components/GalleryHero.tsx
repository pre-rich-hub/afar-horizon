import { useTranslations } from 'next-intl'

import { PageHero } from '@/components/common/PageHero'

export function GalleryHero() {
  const tr = useTranslations('UI.gallery.GalleryHero')

  return (
    <PageHero
        eyebrow={tr('theGallery')}
        title={tr('ethiopiaSeenSlowly')}
        lede={tr('saltAndFireInTheAfarStone')}
        image="https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/simien-mountains.png"
        imageAlt={tr('simienMountainsEthiopia')}
        crumbs={[{ label: tr('home'), href: '/' }, { label: tr('gallery') }]}
      />
  )
}
