// /safety page copy. Practices only as already confirmed elsewhere on the site
// (Before You Go, FAQ, tour inclusions and destination notes).

export const sections: { id: string; title: string; text: string[]; items?: string[] }[] = [
  {
    id: 'before-you-travel',
    title: 'Before you travel',
    text: [
      'Safety starts long before the first day on the road. We check current access, local information and official travel advice for your dates before we quote, and again before departure. If we do not believe a route is responsible, we will not run it.',
      'We also explain honestly what the journey involves, including heat, walking, rough roads, basic camps and early starts, so the plan fits your health and fitness rather than a brochure.',
    ],
    items: [
      'Current conditions confirmed for your dates before you book',
      'A second check before departure',
      'An honest description of the walking, heat and camps',
      'Travel insurance advice covering remote areas, medical expenses and emergency evacuation',
    ],
  },
  {
    id: 'on-the-ground',
    title: 'On the ground',
    text: [
      'Your journey is run by our own guides, drivers and field staff, with one team responsible for the whole ground operation. Danakil expeditions are led by experienced local Afar guides, with scouts and escort arrangements where required.',
      'Days are built around the heat. We start early, rest through the hottest hours and plan water for every day of the route. At Dallol and Erta Ale your guide decides on the day how close it is safe to go, and the group stays within designated safe areas.',
    ],
    items: [
      'Experienced local Afar guides',
      'Scouts and escort arrangements where required',
      '4×4 vehicles with our own drivers',
      'Water planned for every day',
      'Early starts and rest in the hottest hours',
      'Designated safe areas at geothermal and volcanic sites',
    ],
  },
  {
    id: 'your-part',
    title: 'Your part',
    text: [
      'A safe expedition is a shared effort. These simple habits make the biggest difference in the Danakil.',
    ],
    items: [
      'Follow your guide’s instructions at all times',
      'Stay with the group and within designated areas',
      'Drink more water than you think you need',
      'Tell your guide straight away if you feel unwell',
      'Protect yourself from the sun with clothing, a hat and sunscreen',
    ],
  },
]

// How the team responds when conditions change (from Before You Go).
export const response = [
  { title: 'Understand', text: 'We find out exactly what has happened.' },
  { title: 'Verify', text: 'We check the situation on the ground.' },
  { title: 'Explain', text: 'We tell you clearly what it means for you.' },
  { title: 'Offer options', text: 'We put realistic alternatives in front of you.' },
  { title: 'Decide', text: 'We choose the safest option, never the easiest.' },
  { title: 'Rebuild', text: 'We rearrange vehicles, camps and timings.' },
  { title: 'Keep you informed', text: 'You know what is happening at every step.' },
]

export const officialAdvice =
  'Government travel advice for parts of Afar and northern Ethiopia changes and can restrict travel. Please check your own government’s current advice before you book. We will tell you what we know for your dates, and if a route becomes inappropriate we will change or cancel it.'
