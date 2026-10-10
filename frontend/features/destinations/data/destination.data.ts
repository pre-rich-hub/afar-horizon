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

  {
    slug: 'hamed-ela',
    group: 'danakil',
    name: 'Hamed Ela',
    headline: 'A base in the heart of salt country',
    region: 'Afar Region · Danakil',
    tag: 'Expedition Base',
    image: '/images/hero-danakil/salt-cutters.jpg',
    seoTitle: 'Hamed Ela | Danakil Camp & Expedition Guide',
    imageAlt: 'A salt cutter shaping blocks on Lake Asale in Afar',
    seoDescription:
      'Understand Hamed Ela’s role in a Danakil expedition, basic camp expectations and journeys to Lake Assale and Dallol.',
    teaser: 'Between the desert crossing and the salt plain, a place to rest and prepare for the next early start.',
    intro:
      'Hamed Ela is part of the working landscape of Afar and a base for the salt-country section of a Danakil expedition. Time here connects the journey to Lake Assale and Dallol with the practical realities of travelling in the desert.',
    bestTime: danakilSeason,
    duration: '1 – 3 nights within an expedition',
    altitude: 'Afar lowlands',
    highlights: [
      'A base for Lake Assale and Dallol, when accessible',
      'Early departures into salt country',
      'Basic expedition camp life',
      'Understanding the connection between salt, trade and Afar communities',
    ],
    paragraphs: [
      'After the crossing from Erta Ale, Hamed Ela provides a pause before the next stage of the expedition. The rhythm follows the environment: arrive, rest, hydrate and prepare for outings during the cooler hours.',
      'This is a settlement and a place of work, not a staged cultural attraction. Conversations and photography depend on local activity and consent. Salt workers and caravan movements are never guaranteed features of a departure.',
    ],
    sections: [
      {
        title: 'What to expect at camp',
        text: 'Expect basic expedition accommodation rather than hotel comforts. Sleeping arrangements, washing facilities and camp locations are confirmed with your route. Carry your personal essentials and do not assume reliable connectivity or charging facilities.',
      },
      {
        title: 'Planning the salt-country days',
        text: 'Lake Assale and Dallol visits are planned around heat, current access and local guidance. Longer itineraries leave room for rest and photography rather than treating every stop as a fixed appointment.',
      },
    ],
    note: {
      title: 'Camp arrangements follow the route',
      text: 'The overnight location and facilities depend on the confirmed expedition plan. Ask about the arrangements for your dates before departure.',
    },
    faqs: [
      {
        q: 'Is Hamed Ela a hotel stay?',
        a: 'Plan for basic camp conditions. Your quotation and pre-departure briefing explain the accommodation and facilities available for your expedition.',
      },
      {
        q: 'Will we see salt caravans?',
        a: 'Only if activity and timing allow. We observe the salt trade as it happens and do not stage it for visitors.',
      },
    ],
    places: ['Hamed Ela', 'Lake Asale', 'Dallol'],
  },
  {
    slug: 'semera',
    group: 'danakil',
    name: 'Semera',
    headline: 'Prepare for the journey into Afar',
    region: 'Afar Region',
    tag: 'Expedition Gateway',
    image: '/images/hero-danakil/salt-flats.jpg',
    seoTitle: 'Semera | Afar & Danakil Departure Guide',
    imageAlt: 'Salt flats in the Danakil Depression, reached on expeditions from Semera',
    seoDescription:
      'Plan a Danakil expedition starting in Semera: arrival coordination, preparation, onward travel and the route into Afar.',
    teaser: 'The meeting point for many Afar journeys, where arrival becomes expedition preparation.',
    intro:
      'Semera is the starting and finishing point for most of the Afar Horizon Danakil catalogue. Its role is practical: meet the team, review the route and prepare before travelling toward Lake Afdera, the volcanic landscape and salt country.',
    bestTime: 'Plan around your expedition dates',
    duration: 'Arrival and departure, as arranged',
    altitude: 'Afar lowlands',
    highlights: [
      'Arrival coordination before the expedition',
      'Route and equipment briefing',
      'Preparation for heat, water and basic camps',
      'Connections toward Lake Afdera and the Danakil',
    ],
    paragraphs: [
      'Share your arrival details before confirming a departure. Flights, overland connections and accommodation need to fit the expedition schedule; reaching the gateway and beginning the desert route are separate parts of the plan.',
      'The preparation matters as much as the first viewpoint. Use the briefing to discuss walking, personal equipment, water, photography interests and onward travel. Your confirmed itinerary states where the journey starts and what transfers are included.',
    ],
    sections: [
      {
        title: 'Arriving from Addis Ababa',
        text: 'Ask the team to coordinate your proposed arrival with the expedition. Transport availability and connection times are checked for your dates; do not assume a same-day connection or an included flight unless it is stated in your quotation.',
      },
      {
        title: 'Semera or Mekelle?',
        text: 'The current core catalogue starts from Semera. A highlands connection through Mekelle is a different route choice and depends on access and the wider itinerary. Choose the gateway with the team before arranging your onward travel.',
      },
    ],
    faqs: [
      {
        q: 'Do all packages return to Semera?',
        a: 'The core Danakil expeditions do. Combined highlands journeys can have a different endpoint; check the start and finish shown on your selected package.',
      },
      {
        q: 'Are flights and arrival accommodation included?',
        a: 'Only when listed in your confirmed quotation. Share your connection plans so that transfers, accommodation and expedition timing can be coordinated.',
      },
    ],
    places: ['Semera'],
  },

  // Background: EWCA's Awash guide and Visit Ethiopia's Lower Awash guide.
  {
    slug: 'awash-national-park',
    group: 'danakil',
    name: 'Awash National Park',
    headline: 'Another landscape at the edge of Afar',
    region: 'Afar & Oromia',
    tag: 'Wildlife & Landscape',
    image: '/images/destinations/awash-waterfall.jpg',
    imageAlt: 'The Awash River waterfall in Awash National Park, Ethiopia',
    seoTitle: 'Awash National Park | Wildlife & Afar Travel Guide',
    seoDescription: 'Explore the wildlife, river landscape and volcanic plains of Awash National Park, with practical guidance for a possible Afar journey extension.',
    teaser: 'River, savanna and volcanic terrain add a different chapter to an Afar journey.',
    intro: 'Awash National Park spans Afar and Oromia. The Awash River, acacia woodland and open volcanic plains offer a contrast to the salt and geothermal landscapes of the Danakil.',
    bestTime: 'September – March; confirm conditions',
    duration: 'An extension, planned separately',
    altitude: 'Rift Valley lowlands',
    highlights: [
      'The Awash River gorge and waterfall',
      'Acacia savanna and volcanic plains',
      'Wildlife observation, with no guaranteed sightings',
      'Landscape and bird photography',
    ],
    paragraphs: [
      'Oryx, gazelles, kudu and baboons are among the park’s wildlife. Observation depends on local conditions and the animals themselves. Keep a respectful distance and follow park guidance.',
      'This guide introduces a possible extension rather than adding a park stop to every Danakil package. Discuss the extra travel time, accommodation and transport before combining the two areas.',
    ],
    sections: [
      { title: 'Plan an extension separately', text: 'Existing Danakil packages do not include Awash National Park. A visit requires a separate confirmed route and quotation, with park access and overnight arrangements checked for your dates.' },
    ],
    note: { title: 'A guide, not a guaranteed departure', text: 'Ask the team whether an Awash extension can be arranged for your journey before making onward bookings.' },
    faqs: [
      { q: 'Is Awash included in the published Danakil expeditions?', a: 'No. Treat it as a separate extension to discuss when planning your wider trip.' },
    ],
    places: ['Awash National Park'],
  },
  {
    slug: 'hadar',
    group: 'danakil',
    name: 'Hadar & the Lower Awash Valley',
    headline: 'Afar’s place in the story of human origins',
    region: 'Afar Region',
    tag: 'Human Origins',
    image: '/images/destinations/lucy-cast.jpg',
    imageAlt: 'A cast of Lucy’s skeleton at the American Museum of Natural History',
    seoTitle: 'Hadar & Lower Awash Valley | Afar Human Origins Guide',
    seoDescription: 'Learn about Hadar, the discovery of Lucy and the Lower Awash Valley, with clear guidance on discussing a possible specialist visit.',
    teaser: 'Beyond volcanoes and salt, Afar holds evidence of a much older human story.',
    intro: 'Hadar is associated with the 1974 discovery of Lucy, a partial Australopithecus afarensis skeleton dated to around 3.2 million years ago. It brings a human-origins perspective to the landscapes of Afar.',
    bestTime: 'Subject to specialist access arrangements',
    duration: 'A specialist visit, if confirmed',
    altitude: 'Lower Awash Valley',
    highlights: [
      'The discovery of Lucy and its significance',
      'Understanding a fossil-bearing landscape',
      'The relationship between geology and human origins',
      'Responsible planning for a specialist heritage visit',
    ],
    paragraphs: [
      'The Lower Awash Valley is a place to understand through context and careful interpretation. Its importance is not a promise of finding fossils on a walk or seeing original specimens in the field.',
      'The photograph accompanying this guide shows a museum cast of Lucy, not the original fossil or an exhibit at Hadar. This is a knowledge guide; a field visit requires separate confirmation of access, local arrangements and a suitable itinerary.',
    ],
    sections: [
      { title: 'Discuss the purpose of a visit', text: 'Tell the team whether your interest is general history, geology or specialist study. A research or heritage site should not be treated as an ordinary sightseeing stop, and no visit is included in the current published packages.' },
    ],
    note: { title: 'Visitor access must be confirmed', text: 'Do not assume unrestricted access or a scheduled tour. A visit is considered only after the necessary local arrangements have been checked.' },
    faqs: [
      { q: 'Will I see Lucy’s original skeleton at Hadar?', a: 'This guide concerns the discovery landscape. It does not promise access to original specimens or a museum display at the site.' },
      { q: 'Can Hadar be added to a Danakil package?', a: 'Ask about a separately planned specialist visit. Access, timing and logistics must be confirmed before it can form part of your itinerary.' },
    ],
    places: ['Hadar', 'Lower Awash Valley'],
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

  {
    slug: 'mekelle',
    group: 'highlands',
    name: 'Mekelle',
    headline: 'Plan the connection between highlands and lowlands',
    region: 'Tigray',
    tag: 'Highlands Gateway',
    image: '/images/destinations/gheralta-cliffs.jpg',
    seoTitle: 'Mekelle | Highlands & Danakil Gateway Guide',
    imageAlt: 'Gheralta cliffs in the northern highlands, part of proposed journeys through Mekelle',
    seoDescription:
      'Understand Mekelle’s role in proposed highlands-to-Afar journeys and how to plan a gateway connection with current access checks.',
    teaser: 'A highlands gateway to consider when connecting Gheralta, Axum and the journey into Afar.',
    intro:
      'Mekelle, also written Mekele, appears in proposed journeys connecting the northern highlands with Afar. It belongs in the planning conversation for those routes, rather than being treated as an interchangeable departure point for every Danakil package.',
    bestTime: 'Subject to access and your wider route',
    duration: 'A gateway stop, as arranged',
    altitude: 'Northern highlands',
    highlights: [
      'Planning the transition from the highlands toward Afar',
      'Connections with Gheralta and Axum itineraries',
      'Comparing a highlands start with the Semera catalogue',
      'Coordinating arrival and onward travel around the confirmed route',
    ],
    paragraphs: [
      'A journey from the highlands into Afar tells a different story from a Semera round trip. Mountain landscapes, history and the descent toward the lowlands become part of the expedition, with additional time needed for the connections.',
      'The proposed Mekelle-to-Semera and Axum-to-Afar journeys remain conditions-dependent concepts. This guide helps explain the route choice; it does not announce a scheduled departure or guarantee that a connection is currently available.',
    ],
    sections: [
      {
        title: 'Choosing the right gateway',
        text: 'For the published core Danakil packages, use the stated Semera start and finish. If your wider journey includes the highlands, discuss Mekelle with the team before booking connections or assuming that a package can simply be reversed.',
      },
      {
        title: 'Confirm the whole journey',
        text: 'Arrival transport, road access, accommodation and onward connections need to work together. These are checked for your proposed dates before a highlands-to-Afar itinerary is confirmed.',
      },
    ],
    note: {
      title: 'A conditions-dependent connection',
      text: 'Mekelle is in Tigray. Routes through the region require current operational checks; this page does not confirm travel availability.',
    },
    faqs: [
      {
        q: 'Can I start a published Danakil package in Mekelle?',
        a: 'The current core packages start in Semera. Ask about a tailored highlands connection; its feasibility and itinerary must be confirmed separately.',
      },
      {
        q: 'Is the Mountain to Horizon expedition available here?',
        a: 'It is a proposed, conditions-dependent route rather than a confirmed catalogue departure. Discuss your dates and interests with the team.',
      },
    ],
    places: ['Mekelle', 'Mekele'],
  },
  // Background: Visit Ethiopia's Lake Tana and Bahir Dar destination guide.
  {
    slug: 'bahir-dar',
    group: 'highlands',
    name: 'Bahir Dar',
    headline: 'A lakeside base for the northern journey',
    region: 'Amhara · Lake Tana',
    tag: 'Lakeside Gateway',
    image: '/images/lake-tana.png',
    imageAlt: 'Lake Tana, explored from the lakeside city of Bahir Dar',
    seoTitle: 'Bahir Dar | Lake Tana & Northern Ethiopia Guide',
    seoDescription: 'Plan time in Bahir Dar, the gateway to Lake Tana, with guidance on lake visits and its place in Northern Ethiopia itineraries.',
    teaser: 'Lake journeys, a city pause and onward connections through the historic north.',
    intro: 'Bahir Dar is a base for exploring Lake Tana and a stop in the Northern Ethiopia catalogue. It offers a change of pace between travel days, with the lake shaping the experience.',
    bestTime: highlandSeason,
    duration: '1 – 2 nights within a northern itinerary',
    altitude: 'Northern highlands',
    highlights: [
      'Lake Tana boat journeys',
      'Monastery visits where accessible',
      'Time around the city and its market',
      'Onward connections toward Gondar',
    ],
    paragraphs: [
      'Bahir Dar provides the practical base; Lake Tana provides the lake and monastery experience. The two guides complement each other without assuming that every stay follows the same programme.',
      'The existing northern packages begin their lake chapter here. The Afar-led Grand Northern Ethiopia Expedition approaches from the opposite direction and finishes in Bahir Dar.',
    ],
    sections: [
      { title: 'Coordinate arrival and onward travel', text: 'Connections, transfers and overnight stays should fit your confirmed itinerary. Ask which flights and ground transfers are included before booking your onward journey.' },
      { title: 'Allow time for the lake', text: 'A lake outing needs its own schedule. The boat route, monastery visits and any Blue Nile excursion are confirmed according to available time and conditions.' },
    ],
    faqs: [
      { q: 'Is Bahir Dar a separate trip or part of a longer journey?', a: 'The current catalogue includes it within northern itineraries. Ask about tailoring the time here to your arrival and onward plans.' },
    ],
    places: ['Bahir Dar', 'Lake Tana'],
  },
  {
    slug: 'lake-tana',
    group: 'highlands',
    name: 'Lake Tana',
    headline: 'A journey across water and living heritage',
    region: 'Amhara · Bahir Dar',
    tag: 'Lake & Monasteries',
    image: '/images/lake-tana.png',
    imageAlt: 'Lake Tana in Ethiopia’s northern highlands',
    seoTitle: 'Lake Tana | Monasteries & Northern Ethiopia Journeys',
    seoDescription: 'Discover Lake Tana through boat journeys and monastery visits from Bahir Dar, as part of a tailored Northern Ethiopia itinerary.',
    teaser: 'A lake chapter of the historic north, approached by boat from Bahir Dar.',
    intro: 'Lake Tana is the source of the Blue Nile and is known for monasteries on its islands and peninsulas. A boat journey from Bahir Dar connects the landscape with religious heritage.',
    bestTime: highlandSeason,
    duration: 'A lake day within a northern itinerary',
    altitude: 'Northern highlands',
    highlights: [
      'Boat journeys from Bahir Dar',
      'Selected island and peninsula monasteries',
      'Religious art and historical interpretation',
      'Lake landscapes and bird observation',
    ],
    paragraphs: [
      'Lake visits are planned around the time available, boat conditions and the monasteries open to visitors. A shorter outing and a full lake day offer different possibilities; your confirmed itinerary identifies the intended route.',
      'Monasteries are places of worship. Follow local instructions on dress, access and photography, and allow the guide to explain the setting rather than treating the visit as a series of photo stops.',
    ],
    sections: [
      { title: 'Choose the lake itinerary with your guide', text: 'Do not assume that every island or monastery is included. Discuss walking, boat travel and any visitor restrictions when the lake day is planned.' },
    ],
    faqs: [
      { q: 'Are boat trips included in every northern package?', a: 'Check the day-by-day itinerary and confirmed quotation. The boat route and visits are agreed for your departure.' },
      { q: 'Is a Blue Nile Falls visit the same as a lake trip?', a: 'No. It is a separate excursion whose timing and inclusion must be confirmed in your itinerary.' },
    ],
    places: ['Lake Tana'],
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
