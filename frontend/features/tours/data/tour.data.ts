import type { Tour } from '../types/tour.types'

export const tours: Tour[] = [
  {
    slug: 'the-historic-route',
    title: 'The Historic Route',
    image: '/images/gondar.png',
    days: '11 Days',
    nights: 10,
    style: 'Cultural · Private',
    season: 'Oct – Mar',
    from: '$6,450 per person',
    group: '2 – 8 guests',
    teaser:
      'Follow the pilgrimage of kings from the castles of Gondar to the rock churches of Lalibela.',
    summary:
      'The definitive northern circuit, flown rather than driven, with private access timed around the liturgy and the light. Four UNESCO sites, three imperial capitals, and evenings that end on a terrace rather than in a coach.',
    includes: [
      'All domestic flights within Ethiopia',
      'Private 4x4 with a senior driver-guide',
      'Scholar-guides at Lalibela, Axum and Gondar',
      'Boutique lodges and the best available rooms',
      'All breakfasts, most lunches and dinners',
      '24/7 travel designer support line',
    ],
    excludes: [
      'International flights and visa fees',
      'Travel insurance (mandatory)',
      'Gratuities and personal spending',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrive Addis Ababa',
        text: 'Private transfer, a quiet room, and a first dinner of tibs and honey wine with your travel designer.',
      },
      {
        day: 'Days 2 – 3',
        title: 'Bahir Dar & Lake Tana',
        text: 'Morning flight north, then a private boat to the island monasteries before the day boats arrive. Tis Issat falls in the afternoon.',
      },
      {
        day: 'Days 4 – 5',
        title: 'Gondar',
        text: 'The royal enclosure at opening, the painted ceiling of Debre Berhan Selassie, and Kuskuam at golden hour.',
      },
      {
        day: 'Days 6 – 7',
        title: 'Simien Mountains',
        text: 'Two escarpment walks among gelada troops, with a lodge on the rim and a fire lit by the time you return.',
      },
      {
        day: 'Days 8 – 9',
        title: 'Lalibela',
        text: 'Dawn liturgy in the northern cluster, the tunnel to Bete Golgotha, and a walk up to Asheton Maryam.',
      },
      {
        day: 'Day 10',
        title: 'Axum',
        text: 'Stelae field, the Chapel of the Tablet, and the Queen of Sheba’s bath with an archaeologist.',
      },
      {
        day: 'Day 11',
        title: 'Addis & Departure',
        text: 'A last coffee ceremony, a day room at the airport hotel, and an evening flight home.',
      },
    ],
    places: ['Lake Tana', 'Gondar', 'Simien Mountains', 'Lalibela', 'Axum'],
    featured: true,
  },
  {
    slug: 'highlands-and-wildlife',
    title: 'Highlands & Wildlife',
    image: '/images/bale-gelada.png',
    days: '9 Days',
    nights: 8,
    style: 'Expedition · Private',
    season: 'Nov – Apr',
    from: '$5,780 per person',
    group: '2 – 6 guests',
    teaser:
      'Trek the Simien escarpment and track the Ethiopian wolf across the Sanetti Plateau.',
    summary:
      'Ethiopia’s two great mountain ecosystems in one journey, with an endemics specialist throughout. Strenuous by choice, comfortable by design.',
    includes: [
      'Domestic flights and private 4x4 transfers',
      'Resident naturalist and endemics specialist',
      'National park fees, scouts and permits',
      'Lodges on the Simien rim and Bale escarpment',
      'Full board on trekking days',
      'Walking poles and daypack loan',
    ],
    excludes: [
      'International flights and visa fees',
      'Travel insurance (mandatory)',
      'Optional Ras Dashen extension',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrive Addis Ababa',
        text: 'Briefing with your naturalist over dinner, kit check, and an early night.',
      },
      {
        day: 'Days 2 – 4',
        title: 'Simien Mountains',
        text: 'Three rim walks of increasing length, gelada troops at close quarters, and sunrise from Imet Gogo.',
      },
      {
        day: 'Day 5',
        title: 'Transfer south',
        text: 'Flight to Addis, then the Rift Valley road with birding stops at Lake Ziway.',
      },
      {
        day: 'Days 6 – 8',
        title: 'Bale Mountains',
        text: 'Wolf tracking at first light on Sanetti, nyala at Dinsho, and a day in the Harenna cloud forest.',
      },
      {
        day: 'Day 9',
        title: 'Addis & Departure',
        text: 'Return flight, National Museum with a curator, and an evening departure.',
      },
    ],
    places: ['Simien Mountains', 'Rift Valley Lakes', 'Bale Mountains'],
    featured: true,
  },
  {
    slug: 'sacred-waters-and-coffee',
    title: 'Sacred Waters & Coffee',
    image: '/images/lake-tana.png',
    days: '7 Days',
    nights: 6,
    style: 'Slow Travel · Private',
    season: 'Year-round',
    from: '$4,320 per person',
    group: '2 – 8 guests',
    teaser:
      'Drift to island monasteries, then journey into the forests where coffee was born.',
    summary:
      'The gentlest of our journeys, and a favourite of returning guests: water, forest, ceremony and very little driving.',
    includes: [
      'Domestic flights and private transfers',
      'Private boat charter on Lake Tana',
      'Farm-to-cup coffee immersion in Kaffa',
      'Two nights in a forest eco-lodge',
      'All breakfasts and dinners',
      'Barista-led cupping session in Addis',
    ],
    excludes: [
      'International flights and visa fees',
      'Travel insurance (mandatory)',
      'Coffee purchases and shipping',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrive Addis Ababa',
        text: 'A cupping session in the roastery district to calibrate the palate.',
      },
      {
        day: 'Days 2 – 3',
        title: 'Lake Tana',
        text: 'Private boat to Ura Kidane Mehret at dawn, manuscripts with the monks, and a slow afternoon on the water.',
      },
      {
        day: 'Days 4 – 6',
        title: 'Kaffa & Bonga forest',
        text: 'Wild coffee under the canopy, harvest and roast with a farming family, and nights in the forest.',
      },
      {
        day: 'Day 7',
        title: 'Addis & Departure',
        text: 'Mercato with a chef, lunch, and an evening flight.',
      },
    ],
    places: ['Lake Tana', 'Kaffa', 'Bonga Forest', 'Addis Ababa'],
    featured: true,
  },
  {
    slug: 'danakil-expedition',
    title: 'Danakil Expedition',
    image: '/images/danakil.png',
    days: '6 Days',
    nights: 5,
    style: 'Expedition · Small Group',
    season: 'Nov – Feb',
    from: '$5,150 per person',
    group: '2 – 6 guests',
    teaser:
      'Sulphur springs, a permanent lava lake, and salt caravans on the white plain.',
    summary:
      'Our most demanding journey, run with a medic-trained guide, hardened vehicles and Afar liaison. Nights under stars with no horizon glow.',
    includes: [
      'Afar regional permits and local liaison',
      'Expedition vehicles and support truck',
      'Medic-trained guide and satellite comms',
      'Camp beds, bedding and full catering',
      'Erta Ale overnight ascent with porters',
      'Unlimited chilled water throughout',
    ],
    excludes: [
      'International flights and visa fees',
      'Travel insurance with evacuation cover',
      'Sleeping bag hire',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrive Addis Ababa',
        text: 'Expedition briefing, kit issue and an early dinner.',
      },
      {
        day: 'Day 2',
        title: 'Mekele to Hamed Ela',
        text: 'Flight north, then the descent into the Afar depression as the temperature climbs.',
      },
      {
        day: 'Day 3',
        title: 'Dallol & Lake Assale',
        text: 'Sulphur terraces at first light, salt caravans in the afternoon, camp on the plain.',
      },
      {
        day: 'Day 4',
        title: 'Erta Ale',
        text: 'Night ascent to the caldera rim and the lava lake, sleeping on the volcano.',
      },
      {
        day: 'Day 5',
        title: 'Return to Mekele',
        text: 'Long drive out, hot shower, cold beer, and a proper bed.',
      },
      {
        day: 'Day 6',
        title: 'Addis & Departure',
        text: 'Morning flight and a day room before an evening departure.',
      },
    ],
    places: ['Mekele', 'Dallol', 'Lake Assale', 'Erta Ale'],
    featured: true,
  },
  {
    slug: 'omo-valley-immersion',
    title: 'Omo Valley Immersion',
    image: '/images/omo-valley.png',
    days: '10 Days',
    nights: 9,
    style: 'Cultural · Private',
    season: 'Jun – Sep, Dec – Mar',
    from: '$6,980 per person',
    group: '2 – 6 guests',
    teaser:
      'Market days, ceremony and conversation in the most culturally dense valley on earth.',
    summary:
      'Built around market days and invitations rather than a fixed route, with a cultural mediator alongside your guide throughout.',
    includes: [
      'Private 4x4 and senior driver-guide',
      'Resident cultural mediator and translator',
      'Community fees paid transparently at village level',
      'Riverside tented camps and the best area lodges',
      'Full board throughout the south',
      'Photography guidance and consent protocol',
    ],
    excludes: [
      'International flights and visa fees',
      'Travel insurance (mandatory)',
      'Personal gifts and purchases',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrive Addis Ababa',
        text: 'Context evening with an anthropologist from Addis Ababa University.',
      },
      {
        day: 'Days 2 – 3',
        title: 'Rift Valley south',
        text: 'Lakes, hot springs and the Dorze highlands with a weaving family.',
      },
      {
        day: 'Days 4 – 7',
        title: 'Turmi, Dimeka & the Hamar',
        text: 'Market days, an invited bull-jumping ceremony if the season allows, and long evenings by the river.',
      },
      {
        day: 'Days 8 – 9',
        title: 'Mursi highlands & Karo',
        text: 'A slow two days with a resident anthropologist, and the Omo escarpment at dusk.',
      },
      {
        day: 'Day 10',
        title: 'Addis & Departure',
        text: 'Flight north, a farewell lunch, and an evening departure.',
      },
    ],
    places: ['Dorze', 'Turmi', 'Dimeka', 'Mursi Highlands', 'Karo'],
    featured: true,
  },
  {
    slug: 'timkat-festival-journey',
    title: 'Timkat Festival Journey',
    image: '/images/festival-timkat.png',
    days: '8 Days',
    nights: 7,
    style: 'Festival · Private',
    season: 'January only',
    from: '$5,940 per person',
    group: '2 – 10 guests',
    teaser:
      'Ethiopia’s Epiphany — processions, white robes and the flooding of the royal bath.',
    summary:
      'A single fixed window each January, planned a year ahead because the rooms and the vantage points go early.',
    includes: [
      'Reserved viewing positions at Fasilides’ Bath',
      'Domestic flights and private transfers',
      'Rooms held twelve months in advance',
      'Orthodox scholar as festival guide',
      'All breakfasts and festival-day catering',
      'Processional photography guidance',
    ],
    excludes: [
      'International flights and visa fees',
      'Travel insurance (mandatory)',
      'Gratuities',
    ],
    itinerary: [
      {
        day: 'Days 1 – 2',
        title: 'Addis Ababa',
        text: 'Arrival, Holy Trinity Cathedral, and a briefing on the liturgical calendar.',
      },
      {
        day: 'Days 3 – 5',
        title: 'Gondar for Timkat',
        text: 'Ketera eve procession, the night vigil, and the flooding of the bath at dawn.',
      },
      {
        day: 'Days 6 – 7',
        title: 'Lalibela',
        text: 'The rock churches in festival season, with the northern cluster before sunrise.',
      },
      {
        day: 'Day 8',
        title: 'Departure',
        text: 'Return flight to Addis and an evening departure.',
      },
    ],
    places: ['Addis Ababa', 'Gondar', 'Lalibela'],
    featured: true,
  },
]
