import type { Destination } from '@/types'

export const destinations: Destination[] = [
  {
    slug: 'lalibela',
    name: 'Lalibela',
    region: 'Northern Highlands',
    tag: 'UNESCO Heritage',
    image: '/images/lalibela.png',
    teaser:
      'Eleven churches carved downward into living rock, still alive with prayer.',
    intro:
      'A medieval capital where an entire holy city was excavated from the mountain itself — and where, eight centuries later, the liturgy has never stopped.',
    bestTime: 'October – March',
    duration: '2 – 3 days',
    altitude: '2,500 m',
    highlights: [
      'Bete Medhane Alem, the largest monolithic church on earth',
      'Dawn liturgy at Bete Maryam with white-robed pilgrims',
      'The hidden tunnel passage to Bete Golgotha',
      'Asheton Maryam monastery on the ridge above town',
    ],
    paragraphs: [
      'Lalibela is not a ruin. It is a working sanctuary, carved downward rather than built upward, where priests still descend the same rock stairways their predecessors cut in the twelfth century. Arriving before sunrise, you hear it before you see it: chant drifting up out of the ground.',
      'We time your visit around the liturgy rather than the crowds, pairing a scholar-guide with private access at the quietest hours. Afternoons are yours — a walk to a cliff-edge monastery, or nothing at all, from a terrace above the Lasta mountains.',
    ],
  },
  {
    slug: 'simien-mountains',
    name: 'Simien Mountains',
    region: 'Northern Highlands',
    tag: 'National Park',
    image: '/images/hero-simien.png',
    teaser:
      'A roof of Africa where gelada monkeys graze above a two-thousand-metre drop.',
    intro:
      'Jagged basalt pinnacles, escarpments that fall away into cloud, and the largest primate troops you will ever walk beside.',
    bestTime: 'October – April',
    duration: '3 – 5 days',
    altitude: '3,200 – 4,533 m',
    highlights: [
      'Walking among habituated gelada troops at Gich',
      'The Jinbar Falls escarpment viewpoint',
      'Sunrise from Imet Gogo, three ridges above the clouds',
      'Optional ascent of Ras Dashen, Ethiopia’s highest peak',
    ],
    paragraphs: [
      'The Simiens are less a mountain range than a broken plateau — a continent-sized slab of lava split into towers and gorges. You walk the rim, not the valleys, which means the view is constant and vertiginous the entire way.',
      'Our itineraries are day-walks with a soft landing: a lodge or a serviced camp with hot water, proper bedding and a cook, so the days are strenuous only as far as you want them to be.',
    ],
  },
  {
    slug: 'danakil-depression',
    name: 'Danakil Depression',
    region: 'Afar Lowlands',
    tag: 'Expedition',
    image: '/images/danakil.png',
    teaser: 'The hottest inhabited place on earth, painted in sulphur and salt.',
    intro:
      'One hundred metres below sea level: acid springs the colour of egg yolk, a permanent lava lake, and salt caravans that have not changed in a thousand years.',
    bestTime: 'November – February',
    duration: '3 – 4 days',
    altitude: '-125 m',
    highlights: [
      'The Dallol sulphur springs at first light',
      'Overnight ascent to the Erta Ale lava lake',
      'Afar salt caravans crossing Lake Assale',
      'Night skies with no horizon glow in any direction',
    ],
    paragraphs: [
      'This is the most extreme landscape we operate in, and the one guests talk about for years. Dallol looks less like earth than a chemistry set left in the sun — mineral terraces in yellow, orange and acid green, hissing quietly.',
      'We run it as a supported expedition: hardened vehicles, a medic-trained guide, Afar liaison, iced water throughout, and camp beds under the stars. Comfort within reason, honesty about the rest.',
    ],
  },
  {
    slug: 'omo-valley',
    name: 'Omo Valley',
    region: 'Southern Rift',
    tag: 'Cultural Immersion',
    image: '/images/omo-valley.png',
    teaser:
      'A living mosaic of communities who have shaped this land for millennia.',
    intro:
      'The lower Omo is one of the most culturally dense regions on the planet — and one that demands to be travelled slowly, and with permission.',
    bestTime: 'June – September, December – March',
    duration: '5 – 8 days',
    altitude: '500 – 1,400 m',
    highlights: [
      'Market days at Key Afer, Dimeka and Turmi',
      'Invited attendance at a Hamar bull-jumping ceremony',
      'Mursi highlands with a resident anthropologist',
      'Riverside camps on the banks of the Omo',
    ],
    paragraphs: [
      'We travel the Omo differently. No drive-by photography, no fee-per-frame stops. Our relationships here are decades old, which buys something money cannot: time, invitation, and the ability to simply sit with people.',
      'Journeys are built around market days and ceremonies, with a cultural mediator alongside your guide so that conversation — not the camera — leads.',
    ],
  },
  {
    slug: 'gondar',
    name: 'Gondar',
    region: 'Northern Highlands',
    tag: 'Imperial City',
    image: '/images/gondar.png',
    teaser:
      'The Camelot of Africa — palaces, baths and painted ceilings of a highland empire.',
    intro:
      'A seventeenth-century imperial capital of stone castles and cedar-scented chapels, where Timkat still fills the royal bath each January.',
    bestTime: 'October – March',
    duration: '1 – 2 days',
    altitude: '2,133 m',
    highlights: [
      'The Fasil Ghebbi royal enclosure',
      'Debre Berhan Selassie and its ceiling of winged faces',
      'Fasilides’ Bath, flooded for Timkat',
      'Kuskuam palace at golden hour',
    ],
    paragraphs: [
      'Gondar is the easiest place in Ethiopia to feel the weight of empire. The royal enclosure holds six centuries of ambition in one walled compound, and the light on the basalt at the end of the day is extraordinary.',
      'A short flight from Lalibela, it pairs naturally with the Simiens — a night of comfort and cold beer either side of the mountains.',
    ],
  },
  {
    slug: 'axum',
    name: 'Axum',
    region: 'Tigray',
    tag: 'Ancient Capital',
    image: '/images/festival-timkat.png',
    teaser:
      'Granite obelisks, submerged tombs, and the claimed resting place of the Ark.',
    intro:
      'The seat of a trading empire that minted its own coinage while Rome was still standing, and the spiritual centre of Ethiopian Orthodoxy.',
    bestTime: 'October – March',
    duration: '1 – 2 days',
    altitude: '2,131 m',
    highlights: [
      'The Northern Stelae Field and the fallen Great Stele',
      'Chapel of the Tablet, from the permitted threshold',
      'Queen of Sheba’s bath and palace foundations',
      'Rock-hewn churches of the Gheralta on the drive south',
    ],
    paragraphs: [
      'Axum rewards a guide who can read stone. The obelisks are engineering as much as art — single pieces of granite, carved to imitate multi-storey towers, raised without mortar.',
      'We combine it with Tigray’s cliff churches, several of which require a genuine scramble and reward it with frescoes almost nobody sees.',
    ],
  },
  {
    slug: 'bale-mountains',
    name: 'Bale Mountains',
    region: 'Southern Highlands',
    tag: 'Wildlife',
    image: '/images/bale-gelada.png',
    teaser:
      'Afro-alpine moorland holding the rarest canid on earth — the Ethiopian wolf.',
    intro:
      'The Sanetti Plateau is the largest expanse of Afro-alpine habitat in Africa, and the best place in the world to see a wild wolf hunt.',
    bestTime: 'November – April',
    duration: '3 – 4 days',
    altitude: '2,500 – 4,377 m',
    highlights: [
      'Ethiopian wolf tracking on the Sanetti Plateau',
      'Harenna cloud forest and wild coffee understorey',
      'Endemic birding — sixteen Ethiopian endemics in a day',
      'Mountain nyala at dusk near Dinsho',
    ],
    paragraphs: [
      'Fewer than five hundred Ethiopian wolves remain, and roughly half of them live here. Mornings on the plateau are cold, clear and quiet, and the sightings — a rust-coloured wolf working a rodent burrow — are genuinely intimate.',
      'Below the escarpment, the Harenna forest is another world: moss, wild coffee, colobus and hornbills. We usually spend a night on each side.',
    ],
  },
  {
    slug: 'lake-tana',
    name: 'Lake Tana & Blue Nile',
    region: 'Amhara',
    tag: 'Slow Travel',
    image: '/images/lake-tana.png',
    teaser:
      'Island monasteries, papyrus boats, and the source of the Blue Nile.',
    intro:
      'Ethiopia’s largest lake hides thirty-odd monasteries on its islands, several of which have guarded illuminated manuscripts for six hundred years.',
    bestTime: 'September – March',
    duration: '1 – 2 days',
    altitude: '1,788 m',
    highlights: [
      'Private boat to Ura Kidane Mehret and Azwa Maryam',
      'Illuminated goatskin gospels shown by resident monks',
      'Tis Issat — the Blue Nile Falls — after the rains',
      'Sunset from the Bahir Dar shoreline with pelicans',
    ],
    paragraphs: [
      'Tana is the gentle chapter of a northern journey. The monasteries are round, thatched and painted floor to ceiling, and the monks who unwrap their manuscripts for you are usually delighted to have the company.',
      'We use a private boat and go early, before the day-trip flotilla, then take a late breakfast on the water.',
    ],
  },
]

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug)
}
