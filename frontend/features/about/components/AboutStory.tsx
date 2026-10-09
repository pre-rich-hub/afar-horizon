import { Chapter } from './Chapter'

export function AboutStory() {
  return (
    <section id="our-story" className="scroll-mt-32 border-y border-border bg-muted/40">
        <div className="shell py-20 sm:py-24 lg:py-32">
          <Chapter
            eyebrow="The road out of Addis"
            title="Before the Afar became an itinerary."
            image="/images/hero-simien.png"
            imageAlt="Mist lifting off the escarpment of the Ethiopian highlands at sunrise"
          >
            <p>
              There is a road out of Addis Ababa we never tire of taking. The city
              thins behind you, the highlands fold away, and the land drops
              towards the Rift — until the air turns hot and wide and the Afar
              opens out to the horizon. Every time, it reminds us why we chose
              this work.
            </p>
            <p>
              We named the company for that horizon. Long before these places sat
              on a travel plan, they were simply part of our country: the salt
              caravans of the Danakil, the market towns of the highlands, the
              churches carved into Lalibela&apos;s rock.
            </p>
            <p>
              Over the years we learned how a familiar road changes with the
              season, how a feast day can transform a town overnight, and how
              the desert keeps its own timetable. Knowing a place is different
              from simply knowing the way through it.
            </p>
          </Chapter>

          <div className="mt-20 sm:mt-28">
            <Chapter
              eyebrow="Then we started guiding"
              title="Seeing home through new eyes."
              image="/images/coffee-ceremony.png"
              imageAlt="Coffee poured from a clay jebena during a traditional ceremony"
              reverse
            >
              <p>
                A traveller stops to watch a gelada troop and asks one more
                question. Someone wonders why a village sits exactly where it
                does. Someone tastes Ethiopian coffee at its source for the first
                time. Someone reaches the rim of Erta Ale and goes quiet.
              </p>
              <p>
                Guiding taught us to notice what we once took for granted, and
                showed us that the job is to help people understand where they
                are — not simply to point the way.
              </p>
              <p>
                That is why every journey is built personally. A couple seeking
                quiet, a photographer waiting for the light and a trekker
                training for the high Simien need very different trips. The first
                step is always listening.
              </p>
            </Chapter>
          </div>
        </div>
      </section>
  )
}
