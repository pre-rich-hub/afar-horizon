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
    image: 'https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/danakil-depression.png',
    alt: "Green mineral pools and salt formations in the Danakil landscape",
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
    image: 'https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/lake-assale.png',
    alt: "Salt crust and shallow water at Lake Assale at sunset",
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
    image: 'https://res.cloudinary.com/xsrr0wfh/image/upload/v1791652743/Erta_Ale_approach.png',
    alt: "Glowing lava within a volcanic crater at Erta Ale",
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
    image: 'https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/simien-mountains.png',
    alt: "Steep green escarpments in the Simien Mountains",
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
    image: 'https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/gheralta.png',
    alt: "A visitor beside a cliff in the Gheralta mountain landscape",
    items: [
      'Private vehicles and dedicated guides',
      'Pacing planned around the group',
      'Comfort upgrades where infrastructure allows',
      'Cultural experiences: coffee, food and local life',
    ],
  },
]
