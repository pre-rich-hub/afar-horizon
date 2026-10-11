import { destinationImageBase } from '@/lib/config/cloudinary'
export const experiences = [
  {
    kicker: 'Light & landscape',
    title: 'Photography Expeditions',
    alt: 'Colourful mineral pools and salt formations in the Danakil',
    text: 'Longer field stops, dawn and night shoots at Dallol, Erta Ale and the salt plain, with time to wait for the light.',
    image: 'https://res.cloudinary.com/xsrr0wfh/image/upload/v1791652740/Danakil_Photography_Expedition.png',
    href: '/specialist-travel#photography',
  },
  {
    kicker: 'Rift & volcano',
    title: 'Geology & Culture',
    alt: 'Exposed geological layers in an Afar rock formation',
    text: 'Eight days to understand the Afar Triangle: the volcano, the salt economy and the people who live with both.',
    image: 'https://res.cloudinary.com/xsrr0wfh/image/upload/v1791652742/Afar_Geolog.png',
    href: '/expeditions/afar-geology-and-culture',
  },
  {
    kicker: 'Cliffs & churches',
    title: 'Danakil & the Highlands',
    alt: 'A visitor beside a cliff in the Gheralta mountain landscape',
    text: 'From the salt desert to Aksum’s obelisks and the cliff churches of Gheralta, in nine or ten days.',
    image: `${destinationImageBase}/gheralta.png`,
    href: '/expeditions#danakil-highlands',
  },
  {
    kicker: 'For travel companies',
    title: 'Ground Operations',
    alt: 'Camels gathered on the salt plain near Hamed Ela at sunset',
    text: 'Vehicles, guides, camps and permits for tour operators, film crews and research teams. One local partner on the ground.',
    image: `${destinationImageBase}/hamed-ela.png`,
    href: '/ground-operations',
  },
]

export const panelTone = ['light', 'dark', 'dark', 'light'] as const
