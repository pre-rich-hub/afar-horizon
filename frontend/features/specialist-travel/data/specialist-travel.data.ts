export const tracks: {
  id: string
  title: string
  lede: string
  image: string
  alt: string
  items: string[]
  note?: string
}[] = [
  {
    id: 'photography',
    title: 'Photographers',
    lede: 'Built around light, location and time, with longer field stops and the patience to wait for the right conditions.',
    image: '/images/hero-danakil/dallol-sulfur.jpg',
    alt: 'Sulphur formations at Dallol in early light',
    items: [
      'Sunrise, sunset and night photography',
      'Golden-hour positioning and early departures',
      'Longer stops at Dallol, Erta Ale and the salt plain',
      'Landscape, people and wildlife',
      'Equipment logistics and protection from dust and salt',
      'Location scouting and flexible schedules',
    ],
  },
  {
    id: 'film',
    title: 'Film & media',
    lede: 'Production travel needs precision. We handle the ground so the crew can focus on the work.',
    image: '/images/hero-danakil/salt-flats.jpg',
    alt: 'Salt crust across the Danakil Depression',
    items: [
      'Vehicles and professional drivers',
      'Local guides and location scouting',
      'Crew movements and equipment transport',
      'Accommodation and field logistics',
      'Remote-location planning',
      'Local coordination and introductions',
    ],
    note: 'Filming permissions remain subject to the relevant authorities and site requirements.',
  },
  {
    id: 'research',
    title: 'Researchers & universities',
    lede: 'Field logistics for geology, geography, anthropology, archaeology and environmental studies, in some of Africa’s most studied landscapes.',
    image: '/images/hero-danakil/erta-ale-approach.jpg',
    alt: 'Pack camels crossing the basalt toward Erta Ale',
    items: [
      'Local transport and remote-area support',
      'Accommodation and field camps',
      'Guides and community coordination',
      'Route planning for field sites',
      'Interpretation support where available',
      'Logistics for scientific equipment',
    ],
  },
  {
    id: 'trekking',
    title: 'Trekking, running & mountain travel',
    lede: 'Ethiopia is a country of altitude. Our founder grew up in the Simien, and mountain travel is where this company began.',
    image: '/images/hero-simien.png',
    alt: 'Mist over the Simien Mountains escarpment',
    items: [
      'Simien trek planning, scouts and camping',
      'Mules and porters where appropriate',
      'Meals, water and transfers',
      'Running groups and mountain events: routes, water points and support vehicles',
      'Summit support for Ras Dashen',
    ],
  },
  {
    id: 'groups',
    title: 'Private groups',
    lede: 'Families, friends, clubs and corporate groups travelling on their own schedule.',
    image: '/images/destinations/gheralta-cliffs.jpg',
    alt: 'Sandstone cliffs of the Gheralta mountains',
    items: [
      'Private vehicles and dedicated guides',
      'Pacing planned around the group',
      'Comfort upgrades where infrastructure allows',
      'Cultural experiences: coffee, food and local life',
    ],
  },
]
