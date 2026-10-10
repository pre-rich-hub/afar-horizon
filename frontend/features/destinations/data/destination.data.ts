import type { Destination, DestinationGroup } from '../types/destination.types'

// The destination library: the client's destination copy (Oct 2026),
// enriched with facts checked against UNESCO, the Smithsonian Global
// Volcanism Program, Wikipedia and published travel sources (Oct 2026).

export const destinationGroups: { id: DestinationGroup; title: string; text: string }[] = [
  {
    id: 'danakil',
    title: 'Afar & the Danakil',
    text: 'Desert, salt, volcanoes and the people who live with them.',
  },
  {
    id: 'highlands',
    title: 'The Northern Highlands',
    text: 'Cliff churches, ancient kingdoms, mountains and royal cities.',
  },
  {
    id: 'hub',
    title: 'Northern Ethiopia',
    text: 'One region, many worlds, connected by the roads between them.',
  },
]

const danakilSeason = 'Nov – Jan'
const highlandSeason = 'Oct – Mar'

export const destinations: Destination[] = [
  // ── Afar & the Danakil ────────────────────────────────────────────────
  {
    slug: 'danakil-depression',
    group: 'danakil',
    name: 'Danakil Depression',
    headline: 'Where the earth feels alive',
    region: 'Afar Region',
    tag: 'Expedition',
    image: '/images/danakil.png',
    seoTitle: 'Danakil Depression Ethiopia | Tours & Expeditions',
    seoDescription:
      'Explore the Danakil Depression with a locally owned Ethiopian expedition operator: Erta Ale, Dallol, Lake Assale and Afar, with professional local logistics.',
    teaser: 'Salt flats, volcanoes, geothermal colour and a culture adapted to one of the hottest places people live.',
    intro:
      'The Danakil lies within the Afar Triangle, where the Arabian plate and two African plates are pulling apart. Salt stretches toward the horizon, volcanic landscapes rise from the desert, and people have built lives in an environment outsiders often call simply "extreme".',
    bestTime: danakilSeason,
    duration: '3 – 8 days',
    altitude: 'Down to about 125 m below sea level',
    highlights: [
      'Erta Ale: a 613 m shield volcano with a 1.6 km summit caldera',
      'Dallol: acid springs, salt chimneys and mineral colour',
      'Lake Assale: the salt plain, about 120 m below sea level',
      'Lake Afdera: a hypersaline lake fed by hot springs',
      'Hamed Ela: the salt workers’ settlement and our base camp',
      'Afar communities and the centuries-old salt trade',
    ],
    paragraphs: [
      'At about 125 metres below sea level, the Danakil is one of the lowest places in Africa, and one of the hottest places on Earth where people live: the settlement of Dallol recorded an average annual temperature of 34 °C between 1960 and 1966. Official Ethiopian tourism information names Erta Ale, Dallol, Lake Assale and Lake Afdera among its major attractions.',
      'It is also part of the story of humanity. In 1974, at Hadar in the Afar region, researchers found "Lucy", a 3.2-million-year-old skeleton of Australopithecus afarensis, which is why Afar is often called a cradle of humankind.',
      'The Danakil is not empty. It is alive, and it is lived in.',
    ],
    sections: [
      {
        title: 'The Danakil is not a theme park',
        text: 'There are no comfortable roads to every site, and no guarantee that nature will perform on schedule. Conditions change, routes change and volcanic activity changes. That is what makes the Danakil an expedition destination. Our job is to manage the logistics while giving you the space to experience the landscape.',
      },
      {
        title: 'How a Danakil expedition usually runs',
        text: 'Most expeditions start in Semera. The first day descends to Lake Afdera (usually three to four hours on the road), then continues to the base of Erta Ale for an evening walk to the crater. The next day crosses the desert to Hamed Ela, the base for the Lake Assale salt plain and Dallol. Longer expeditions add nights at Afdera, Erta Ale and Hamed Ela rather than extra driving.',
      },
      {
        title: 'Why travel with a local operator',
        text: 'The Danakil needs more than a booking. The Ethiopian tourism authority describes remote Danakil tracks as requiring 4×4 vehicles and navigation skills, and recommends experienced operators with several vehicles. Every expedition we run includes:',
        items: [
          'Route planning and current access information',
          'Suitable 4×4 vehicles',
          'Experienced field staff and local Afar guides',
          'Water and heat management',
          'Camp logistics',
          'Contingency planning',
        ],
      },
    ],
    faqs: [
      {
        q: 'How hot is the Danakil?',
        a: 'Extremely hot. Dallol holds the record for the highest average annual temperature of any inhabited place, about 34 °C. Even in the cooler season, November to January, expect significant heat, which is why days start early and the hottest hours are for rest.',
      },
      {
        q: 'Is the Danakil safe?',
        a: 'It is a remote expedition environment, and regional conditions must always be checked before departure. Official advice currently restricts travel in parts of Afar, so we confirm what is possible and responsible for your dates before we quote, and we change or cancel a route when conditions require it.',
      },
      {
        q: 'Can I visit without an operator?',
        a: 'No. Remote routes require 4×4 vehicles, local Afar guides and access arrangements. Travelling with an experienced operator is strongly recommended.',
      },
      {
        q: 'How long should I spend?',
        a: 'A minimum of two nights is generally needed for the classic route of Erta Ale, Lake Assale and Dallol. Four days or more allows rest and a slower expedition.',
      },
    ],
    places: ['Erta Ale', 'Dallol', 'Lake Asale', 'Lake Afdera', 'Hamed Ela'],
  },
  {
    slug: 'afar',
    group: 'danakil',
    name: 'Afar',
    headline: 'A land that teaches resilience',
    region: 'Afar Region',
    tag: 'People & Landscape',
    image: '/images/hero-danakil/salt-cutters.jpg',
    seoTitle: 'Afar Ethiopia Travel | Danakil & Afar Expeditions',
    seoDescription:
      'Discover Afar beyond the Danakil: desert landscapes, salt culture, volcanic geology and local life with an Ethiopian-owned expedition company.',
    teaser: 'More than the Danakil Depression: a people, a culture and a geological frontier.',
    intro:
      'Afar is a landscape shaped by heat, distance, movement and scarcity, and the home of people whose lives are adapted to one of the most demanding environments on Earth. We introduce the landscape and the people together.',
    bestTime: danakilSeason,
    duration: '1 – 8 days',
    altitude: 'Below sea level to highland edge',
    highlights: [
      'The Danakil Depression, Erta Ale and Dallol',
      'Lake Assale and Lake Afdera',
      'Salt cutting and the camel caravans to Berahile',
      'Afar food and coffee',
      'Desert camping',
      'Hadar, where "Lucy" was found in 1974',
    ],
    paragraphs: [
      'The Afar Triangle is one of the world’s most geologically active regions: the place where the Arabian plate and two African plates meet and pull apart, creating volcanoes, salt lakes, faults and hot springs across vast horizons.',
      'But geology is only half the story. People live here, work here and raise families here, moving through this landscape with knowledge built over generations. For centuries, salt cut by hand in the Danakil was carried by camel to the highlands, and salt blocks called amole were used as money across Ethiopia. That is why we never present Afar as a collection of "extreme landscapes".',
    ],
    sections: [
      {
        title: 'Travel with respect',
        text: 'When meeting communities, we ask travellers to:',
        items: [
          'Ask before photographing people',
          'Respect private spaces',
          'Follow local guidance',
          'Avoid treating people as photographic props',
          'Buy locally where appropriate',
          'Listen more than they speak',
        ],
      },
      {
        title: 'Our principle',
        text: 'We don’t want to travel through communities. We want to travel with them. Cultural encounters should benefit both sides, and interaction must be welcomed, never staged.',
      },
    ],
    places: ['Lake Afdera', 'Erta Ale', 'Dallol', 'Lake Asale', 'Hamed Ela', 'Semera'],
  },
  {
    slug: 'erta-ale',
    group: 'danakil',
    name: 'Erta Ale',
    headline: 'The volcano at the edge of the desert',
    region: 'Afar Region · Danakil',
    tag: 'Volcano',
    image: '/images/hero-danakil/erta-ale-approach.jpg',
    seoTitle: 'Erta Ale Volcano Ethiopia | Trekking & Danakil Expeditions',
    seoDescription:
      'Experience Erta Ale volcano in Ethiopia’s Danakil Depression with a locally operated expedition team. What you can see today, the walk, and how conditions change.',
    teaser: 'You don’t drive up to Erta Ale. You walk toward it, in the dark, across exposed volcanic ground.',
    intro:
      'Erta Ale, "smoking mountain" in Afar, is a 613-metre basaltic shield volcano with a summit caldera about 1.6 by 0.7 km. The approach is part of the experience, and so are the darkness, the heat and the silence. And the volcano itself changes.',
    bestTime: danakilSeason,
    duration: '1 – 2 nights',
    altitude: '613 m',
    highlights: [
      'A walk of roughly 10 km across basalt, with camels carrying the camp gear',
      'The caldera and crater area under the night sky',
      'A simple camp near the rim, with an early-morning observation window',
      'Geological interpretation from your guide',
    ],
    paragraphs: [
      'For more than a century Erta Ale was famous for its lava lake, present since at least 1906 and one of the longest-lived in the world. In January 2017 a large eruption sent lava flows kilometres down the flank and the lake drained. Since then, activity has been confined to the caldera: small glowing vents called hornitos, occasional fresh lava flows and degassing.',
      'In July 2025 magma moved south from Erta Ale and, in November 2025, the neighbouring Hayli Gubbi volcano, about 15 km to the south-east, erupted for the first time in thousands of years, covering Erta Ale’s caldera in ash. What you see on any given night depends on what the volcano is doing.',
      'Erta Ale is not a viewpoint beside a car park. The official tourism source describes an approach of about 10 km across exposed terrain, largely without shade, and advises avoiding the hottest daytime conditions. We time the walk around the cooler hours.',
    ],
    note: {
      title: 'There is no lava lake at present',
      text: 'Erta Ale is a natural system. Its activity changes, and a lava lake or particular display is never guaranteed. Before you book, we tell you honestly what is currently being seen, and on the day your guide decides how close it is safe to go.',
    },
    faqs: [
      {
        q: 'How difficult is the Erta Ale walk?',
        a: 'It is a long walk, usually around three hours, on uneven volcanic ground, done in the evening or at night to avoid the heat. It is not technical, but you need reasonable fitness, sturdy shoes and a headlamp.',
      },
      {
        q: 'What will I see?',
        a: 'The vast caldera, fresh basalt flows and, depending on current activity, glowing vents and degassing, often best seen after dark and again at dawn. We share recent reports before you travel.',
      },
      {
        q: 'What happens if volcanic conditions change?',
        a: 'Your guide decides on the day how close it is safe to go, and we adjust the plan. On some nights the volcano is quiet; occasionally access is closed.',
      },
    ],
    places: ['Erta Ale'],
  },
  {
    slug: 'dallol',
    group: 'danakil',
    name: 'Dallol',
    headline: 'When the earth paints itself',
    region: 'Afar Region · Danakil',
    tag: 'Geothermal',
    image: '/images/hero-danakil/dallol-springs.jpg',
    seoTitle: 'Dallol Ethiopia | Danakil Geothermal Landscape & Tours',
    seoDescription:
      'Explore Dallol in Ethiopia’s Danakil Depression: acid hot springs, salt chimneys, mineral colours and volcanic geology, below sea level.',
    teaser: 'Yellow, orange, white, green and rust: geology happening in front of you.',
    intro:
      'Dallol does not look like the landscapes most travellers associate with Africa. The colours can appear almost artificial. But this is not decoration: minerals, geothermal processes, salt, heat and water create it, and the colours have a story.',
    bestTime: danakilSeason,
    duration: 'Half a day, from Hamed Ela',
    altitude: 'About 48 m below sea level',
    highlights: [
      'Hot springs up to about 95 °C, among the most acidic waters on Earth',
      'Salt chimneys, sulphur terraces and green and yellow pools',
      'The lowest known land volcanic vents in the world',
      'The Black Mountain and the 1926 explosion crater',
      'Early-morning light and more manageable temperatures',
    ],
    paragraphs: [
      'Dallol sits on a salt dome kilometres thick, over a body of magma. Groundwater heated from below dissolves salt and minerals and rises as springs at up to about 95 °C, with a pH that can fall below 1. As the water evaporates it leaves the yellow, green, orange and white formations that change from season to season.',
      'Dallol’s craters, about 45 metres or more below sea level, are the lowest known land volcanic vents in the world. The only recorded eruption was a steam-driven explosion in 1926 that left a crater about 30 metres wide at the foot of the Black Mountain. Through much of the 20th century, mining companies worked the potash in the salt beneath it; you can still see traces of the old works.',
      'We visit early, before the strongest heat. Your guide explains the mineral colours, salt formations and volcanic activity rather than simply giving you time to photograph them.',
    ],
    note: {
      title: 'Geothermal areas can be hazardous',
      text: 'The ground can be thin crust over hot acid water, and some areas release toxic gas. Visitors must follow their local guide and stay within designated safe areas. Access depends on current conditions and local instructions, and is never assumed.',
    },
    places: ['Dallol'],
  },
  {
    slug: 'lake-assale',
    group: 'danakil',
    name: 'Lake Assale',
    headline: 'Where salt becomes a way of life',
    region: 'Afar Region · Danakil',
    tag: 'Salt Country',
    image: '/images/hero-danakil/salt-flats.jpg',
    seoTitle: 'Lake Assale Ethiopia | Danakil Salt Lake & Salt Caravans',
    seoDescription:
      'Visit Lake Assale (Lake Karum) in Ethiopia’s Danakil Depression and discover salt flats, Afar salt cutting and the camel caravans of the salt trade.',
    teaser: 'The white road: a salt plain that is work, trade and history, not just scenery.',
    intro:
      'Lake Assale, also called Lake Karum, lies about 120 metres below sea level. Salt dominates the landscape and the surface can appear almost endless, but it is not an empty wilderness. It is one of the oldest working landscapes in Ethiopia.',
    bestTime: danakilSeason,
    duration: 'An afternoon and a morning',
    altitude: 'About 120 m below sea level',
    highlights: [
      'The salt plain at sunset, as the colour changes',
      'Salt cut by hand into blocks, where work is under way',
      'Camel caravans, depending on timing and activity',
      'Overnight at Hamed Ela, the salt workers’ settlement',
    ],
    paragraphs: [
      'Every morning in the working season, men head out onto the dry lake bed to prise up the salt crust with axes and wooden poles and shape it into blocks. For centuries these blocks, called amole, were used as money across Ethiopia.',
      'Camel caravans carry the salt west to Berahile, the region’s main salt-trading town, now linked by road to Mekelle; historians think the trade has run for well over a thousand years. Trucks are gradually replacing camels, which makes the caravans you may still see more precious.',
      'The connection between landscape and livelihood is what makes Lake Assale worth understanding. Where work is under way, we watch from a respectful distance and never stage it.',
    ],
    places: ['Lake Asale', 'Hamed Ela'],
  },
  {
    slug: 'lake-afdera',
    group: 'danakil',
    name: 'Lake Afdera',
    headline: 'The desert has a lake',
    region: 'Afar Region · Danakil',
    tag: 'Salt Lake',
    image: '/images/destinations/lake-afdera.jpg',
    seoTitle: 'Lake Afdera Ethiopia | Salt Lake in Afar',
    seoDescription:
      'Discover Lake Afdera (Afrera), a hypersaline lake more than 100 m below sea level in Ethiopia’s Afar region, fed by hot springs and ringed by salt works.',
    teaser: 'After hours of salt flats and volcanic terrain, water appears in the desert.',
    intro:
      'Lake Afdera, also called Afrera, offers another side of Afar. It lies more than 100 metres below sea level and covers about 117 square kilometres, with no river flowing in: hot springs along the shore feed it instead.',
    bestTime: danakilSeason,
    duration: 'A stop or one night',
    altitude: 'More than 100 m below sea level',
    highlights: [
      'Hypersaline water, more than four times saltier than the sea',
      'Hot springs along the shore',
      'Salt evaporation ponds and the local salt works',
      'A natural pause on the road to Erta Ale',
    ],
    paragraphs: [
      'The lake is up to about 80 metres deep and holds roughly 160 grams of salt per litre. The white rectangles around its shore are evaporation ponds, where salt is produced from the brine; the deposits around it are among the largest in the region.',
      'On most of our Danakil expeditions, Afdera is the first stop after the descent from Semera, and on longer journeys we spend a night here. It becomes a natural pause: a place to slow down, look back at the road and understand how varied Afar really is.',
    ],
    places: ['Lake Afdera'],
  },

  // ── The Northern Highlands ────────────────────────────────────────────
  {
    slug: 'gheralta',
    group: 'highlands',
    name: 'Gheralta',
    headline: 'Churches above the clouds',
    region: 'Tigray',
    tag: 'Rock Churches',
    image: '/images/destinations/gheralta-cliffs.jpg',
    seoTitle: 'Gheralta Ethiopia | Rock-Hewn Churches & Mountain Treks',
    seoDescription:
      'Explore Gheralta’s sandstone mountains and rock-hewn churches, including Abuna Yemata Guh and Maryam Korkor, with a locally operated Ethiopian team.',
    teaser: 'Sandstone cliffs, hidden churches and the paths that lead to them.',
    intro:
      'Gheralta is where landscape and faith meet. Sandstone mountains rise from the surrounding plains, and churches are hidden in the cliffs, reached by paths that can take real physical effort. The journey toward a church is part of the story.',
    bestTime: highlandSeason,
    duration: '2 – 3 days',
    altitude: 'Highland plateau and cliffs',
    highlights: [
      'Abuna Yemata Guh, carved into a rock spire with drops of around 200 m',
      'Maryam Korkor and Daniel Korkor, side by side on a cliff edge',
      'Painted interiors centuries old',
      'Mountain walking through farming villages',
      'Photography and cultural interpretation',
    ],
    paragraphs: [
      'Tigray has around 120 rock-hewn churches, carved into cliff faces, caves and plateaus between roughly the 4th and 15th centuries, and Gheralta holds some of the most remarkable. They are still places of worship.',
      'Abuna Yemata Guh is the best known. Tradition links it to Abuna Yemata, one of the Nine Saints who spread Christianity in Ethiopia, and it is carved into the side of a sandstone spire. The last part of the climb is made barefoot, without ropes, along a ledge above a long drop. Inside, frescoes on two domes have survived for centuries without needing to be repainted.',
      'Maryam Korkor and Daniel Korkor sit close together high on a cliff edge, reached by a steep climb with wide views over the plateau. Easier churches are nearby for travellers who prefer to keep their feet on level ground. We build the day around a comfortable pace, not a race to collect churches.',
    ],
    sections: [
      {
        title: 'Church etiquette',
        items: [
          'Dress modestly',
          'Ask before taking photographs',
          'Respect worship in progress',
          'Follow the local church guide',
          'Do not climb on or touch fragile religious features',
        ],
      },
    ],
    note: {
      title: 'Access in Tigray',
      text: 'Gheralta is in Tigray, where access can change. We confirm current conditions before quoting a route, and we never encourage travellers to take unnecessary risks for a photograph.',
    },
    places: ['Gheralta'],
  },
  {
    slug: 'axum',
    group: 'highlands',
    name: 'Axum',
    headline: 'Where history still has a presence',
    region: 'Tigray',
    tag: 'Ancient Kingdom',
    image: '/images/destinations/axum-obelisks.jpg',
    seoTitle: 'Axum Ethiopia | Ancient Kingdom, Obelisks & History',
    seoDescription:
      'Explore Axum, centre of the ancient Aksumite kingdom and a UNESCO World Heritage Site: monumental stelae, royal tombs and the church of St Mary of Zion.',
    teaser: 'Before the modern map, there was Axum.',
    intro:
      'Axum was the heart of a powerful kingdom positioned between Africa, Arabia and the wider ancient world. UNESCO lists it as a World Heritage Site and describes it as the centre of the Aksumite civilisation, whose trade connected northeastern Africa with the Red Sea and beyond.',
    bestTime: highlandSeason,
    duration: '1 – 2 days',
    altitude: 'About 2,100 m',
    highlights: [
      'The Northern Stelae Park, including the 24 m Obelisk of Axum',
      'The fallen Great Stele: 33 m long and about 520 tonnes',
      'King Ezana’s stele and royal tombs',
      'The church of St Mary of Zion',
      'Guided historical interpretation',
    ],
    paragraphs: [
      'The stelae are the city’s signature. The tallest still standing, King Ezana’s, is about 21 metres high. The Great Stele, 33 metres long and around 520 tonnes, probably fell and broke as it was being raised and still lies where it fell.',
      'The 24-metre Obelisk of Axum, carved in the 4th century with false doors and windows, was taken to Rome in 1937 during the Italian occupation. It came home in three pieces in April 2005 and was re-erected in 2008, a moment of national celebration.',
      'Axum is also the spiritual heart of the Ethiopian Orthodox Church: the church of St Mary of Zion is, by tradition, the resting place of the Ark of the Covenant. We do not want you to simply photograph the monuments. We want you to understand why they are there.',
    ],
    note: {
      title: 'Access in Tigray',
      text: 'Axum is in Tigray, where access can change. We confirm current conditions before quoting a route that includes it.',
    },
    places: ['Aksum'],
  },
  {
    slug: 'lalibela',
    group: 'highlands',
    name: 'Lalibela',
    headline: 'Stone, faith and human imagination',
    region: 'Amhara',
    tag: 'Living Heritage',
    image: '/images/lalibela.png',
    seoTitle: 'Lalibela Ethiopia | Rock-Hewn Churches & Private Tours',
    seoDescription:
      'Discover Lalibela’s eleven rock-hewn churches, a UNESCO World Heritage Site, through local guiding, cultural interpretation and private journeys.',
    teaser: 'A city carved downward into the rock, and still a place of worship.',
    intro:
      'Rather than building churches upward, medieval builders carved them down into the rock. UNESCO has listed Lalibela’s eleven monolithic churches as a World Heritage Site since 1978. But the story is larger than the stone: Lalibela remains a living religious place.',
    bestTime: highlandSeason,
    duration: '1 – 2 days',
    altitude: 'About 2,480 m',
    highlights: [
      'Eleven churches cut from solid rock, linked by trenches and tunnels',
      'Bete Giyorgis, the cross-shaped church carved from above',
      'Early mornings, church bells and worshippers',
      'History, architecture and living tradition from your guide',
    ],
    paragraphs: [
      'The churches are named after King Gebre Meskel Lalibela of the Zagwe dynasty, who reigned around 1181–1221 and, by tradition, set out to build a new Jerusalem. Five churches lie north of the small river the town calls the Jordan, five to the south, and one stands apart.',
      'That one is Bete Giyorgis, the Church of St George: a cross-shaped church cut straight down into the rock, so that its roof is level with the ground around it.',
      'Wake early and walk before the heat. Listen to the bells, watch worshippers move through ancient spaces, then sit down for coffee, because Ethiopia’s history is not kept behind glass. Visitors should experience it respectfully.',
    ],
    places: ['Lalibela'],
  },
  {
    slug: 'simien-mountains',
    group: 'highlands',
    name: 'Simien Mountains',
    headline: 'The mountains that started the story',
    region: 'Amhara',
    tag: 'Trekking',
    image: '/images/hero-simien.png',
    seoTitle: 'Simien Mountains Ethiopia | Trekking, Wildlife & Expeditions',
    seoDescription:
      'Trek the Simien Mountains, a UNESCO World Heritage national park, with an Ethiopian mountain guide: escarpments, gelada, Walia ibex and Ras Dashen.',
    teaser: 'Where the Ethiopian plateau suddenly falls away into deep valleys.',
    intro:
      'This is personal. Our founder, Tesema Teven, was born and raised in the shadow of these mountains. The Simien is not one more product in a catalogue; it is where he learned what it means to know a landscape.',
    bestTime: highlandSeason,
    duration: '2 – 4 days',
    altitude: 'Up to 4,550 m (Ras Dashen)',
    highlights: [
      'Escarpment walks at Sankaber, Geech, Imet Gogo and Chenek',
      'Gelada troops on the grasslands',
      'Walia ibex, found nowhere else on Earth',
      'Ras Dashen, Ethiopia’s highest peak, on longer treks',
      'Local scouts, mountain villages and coffee on the trail',
    ],
    paragraphs: [
      'Simien Mountains National Park covers about 412 square kilometres and has been a UNESCO World Heritage Site since 1978. It was placed on the list of sites in danger in 1996, when the Walia ibex was declining, and removed in 2017 after its populations recovered.',
      'It is the refuge of the Walia ibex, a mountain goat found only here, the gelada and the rare Ethiopian wolf. Ras Dashen, at about 4,550 metres, is the highest point in Ethiopia.',
      'We do not see trekking as simply walking between camps. You meet local scouts, walk through farming landscapes, stop for coffee, watch geladas and, if conditions allow, climb higher. The challenge here is altitude, cold and terrain rather than heat.',
    ],
    places: ['Simien Mountains'],
  },
  {
    slug: 'gondar',
    group: 'highlands',
    name: 'Gondar',
    headline: 'The royal city of the highlands',
    region: 'Amhara',
    tag: 'Royal City',
    image: '/images/gondar.png',
    seoTitle: 'Gondar Ethiopia | Castles, History & Private Tours',
    seoDescription:
      'Explore Gondar: the UNESCO-listed royal enclosure of Fasil Ghebbi, Debre Birhan Selassie, Fasilides’ Bath and Timkat, gateway to the Simien Mountains.',
    teaser: 'Stone castles, painted churches and the mountains waiting beyond the city.',
    intro:
      'Emperor Fasilides made Gondar his permanent capital in 1636, and for more than two centuries it was the seat of Ethiopia’s emperors. Today it is the bridge between the history of the north and the Simien Mountains.',
    bestTime: highlandSeason,
    duration: '1 – 2 days',
    altitude: 'About 2,100 m',
    highlights: [
      'Fasil Ghebbi, the royal enclosure, a UNESCO World Heritage Site',
      'Debre Birhan Selassie and its ceiling of painted angels',
      'Fasilides’ Bath, filled each January for Timkat',
      'Coffee, meals and walks through town',
    ],
    paragraphs: [
      'Fasil Ghebbi, the fortress city of Fasilides and his successors, is enclosed by a wall about 900 metres long. Its palaces, churches and buildings mix local tradition with Arab, Indian and Baroque influences brought by Jesuit missionaries.',
      'Debre Birhan Selassie was built under Emperor Iyasu I (1682–1706) and is the only Gondar church to have survived the Mahdist invasion of 1888, by legend protected by a swarm of bees. Its ceiling is covered with rows of winged angels’ faces.',
      'Fasilides’ Bath is a sunken royal pool that is filled every year for Timkat, Ethiopian Epiphany, on 19 January (20 January in leap years), when the city gathers for the blessing of the waters. The most memorable moments often happen away from the monuments: a coffee ceremony, a meal, a walk through town.',
    ],
    places: ['Gondar'],
  },

  // ── Hub ───────────────────────────────────────────────────────────────
  {
    slug: 'northern-ethiopia',
    group: 'hub',
    name: 'Northern Ethiopia',
    headline: 'One region, many worlds',
    region: 'Afar · Tigray · Amhara',
    tag: 'The Whole Journey',
    image: '/images/lake-tana.png',
    seoTitle: 'Northern Ethiopia Tours | Danakil, Gheralta, Axum & Simien',
    seoDescription:
      'Plan a private Northern Ethiopia journey connecting the Danakil, Afar, Gheralta, Axum, Lalibela, the Simien, Gondar and Lake Tana, subject to current access.',
    teaser: 'Several worlds connected by roads, and richer together than any one of them alone.',
    intro:
      'Northern Ethiopia is not one experience. Lalibela gives you rock-hewn churches, Gheralta cliffs and hidden churches, Axum ancient history, Afar desert and volcanic country, the Simien high mountains, and Gondar and Lake Tana royal and monastic Ethiopia.',
    bestTime: 'Oct – Mar; Danakil best Nov – Jan',
    duration: '9 – 21 days',
    altitude: 'Below sea level to 4,550 m',
    highlights: [
      'Lalibela: faith carved into stone',
      'Gheralta: churches hidden in mountains',
      'Axum: an ancient civilisation',
      'Afar and the Danakil: salt and volcano',
      'The Simien: high mountains',
      'Gondar and Lake Tana: royal and monastic Ethiopia',
    ],
    paragraphs: [
      'Lake Tana, Ethiopia’s largest lake and the source of the Blue Nile, has monasteries on around twenty of its islands and peninsulas, many of them 400 to 800 years old; Ura Kidane Mehret on the Zege Peninsula is known for its painted walls. The lake became a UNESCO Biosphere Reserve in 2014, and the Blue Nile Falls, Tis Issat ("smoking water"), are about 30 km from Bahir Dar.',
      'From there, Gondar, the Simien, Axum, Gheralta and Lalibela follow, with the Danakil as the other world below sea level. We can build it around history, culture, mountains, desert, photography, faith, food, people or geology, using domestic flights where they save days on the road.',
      'Moving between the Danakil and the Simien takes you from heat and dehydration to altitude and cold within days, so we plan rest and pacing as carefully as the route.',
    ],
    places: ['Lalibela', 'Gheralta', 'Aksum', 'Simien Mountains', 'Gondar', 'Lake Tana', 'Erta Ale', 'Dallol'],
  },
]
