import { useTranslations } from 'next-intl'

import { Chapter } from './Chapter'

export function AboutStory() {
  const tr = useTranslations('UI.about.AboutStory')

  return (
    <section id="our-story" className="scroll-mt-32 border-y border-border bg-muted/40">
        <div className="shell py-20 sm:py-24 lg:py-32">
          <Chapter
            eyebrow={tr('theRoadOutOfAddis')}
            title={tr('beforeTheAfarBecameAnItinerary')}
            image="https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/simien-mountains.png"
            imageAlt={tr('simienMountainsEthiopia')}
          >
            <p>
              {tr('thereIsARoadOutOfAddis')}</p>
            <p>
              {tr('weNamedTheCompanyForThatHorizon')}</p>
            <p>
              {tr('overTheYearsWeLearnedHowA')}</p>
          </Chapter>

          <div className="mt-20 sm:mt-28">
            <Chapter
              eyebrow={tr('thenWeStartedGuiding')}
              title={tr('seeingHomeThroughNewEyes')}
              image="https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/afar.png"
              imageAlt={tr('afarRegionEthiopia')}
              reverse
            >
              <p>
                {tr('aTravellerStopsToWatchAGelada')}</p>
              <p>
                {tr('guidingTaughtUsToNoticeWhatWe')}</p>
              <p>
                {tr('thatIsWhyEveryJourneyIsBuilt')}</p>
            </Chapter>
          </div>
        </div>
      </section>
  )
}
