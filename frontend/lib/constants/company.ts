export type BrandPromise = {
  title: string
  text: string
}

export const contact = {
  phone: '+251 956 61 6969',
  whatsapp: '+251 956 61 6969',
  email: 'info@afarhorizon.com',
  address: 'Addis Ababa, Ethiopia',
  hours: 'Monday to Saturday 8:00 AM - 5:30 PM',
}

// "Why Afar Horizon": shown on the homepage and contact page.
export const promises: BrandPromise[] = [
  {
    title: 'Safety is our first priority',
    text: 'Every route is checked against current conditions before we quote and again before departure. If a place is not safe on the day, we change the plan: people before itineraries.',
  },
  {
    title: 'Locally owned and operated',
    text: 'We operate from Ethiopia, with our own guides, drivers and field staff. You deal directly with the people who run your journey.',
  },
  {
    title: 'Expedition knowledge',
    text: 'Remote landscapes require more than an online booking. We plan water, heat, routes, camps and current access before we promise anything.',
  },
  {
    title: 'Human guiding',
    text: 'Real people with real experience of the ground, who explain what you are seeing rather than just pointing at it.',
  },
  {
    title: 'We handle the logistics',
    text: '4×4 vehicles, local scouts, permits, camps, hotels and transfers. One team responsible for the whole ground operation.',
  },
  {
    title: 'Private and flexible',
    text: 'Your journey does not need to fit a template. When conditions change, we adapt the route around safety and what matters to you.',
  },
]

// Safety copy: the site-wide strip, the shared safety panel and /safety.
// Every line states only practices the company already describes elsewhere on
// the site. Never promise that a destination is "100% safe" or "guaranteed".
export const safety = {
  headline: 'Safety is our first priority',
  summary: 'Current conditions checked before every departure, experienced local Afar guides, escorts where required and a plan built around the heat.',
  // Track-record statement, e.g. "Since 20XX we have guided X travellers
  // through the Danakil without a serious safety incident." Leave null until
  // the client confirms the exact facts and wording in writing.
  record: null as string | null,
}

export const safetyCommitments: BrandPromise[] = [
  {
    title: 'Conditions checked before every departure',
    text: 'We review current access, local information and official travel advice before we quote and again before you leave. If a route is not appropriate, we change or cancel it.',
  },
  {
    title: 'Experienced local Afar guides',
    text: 'Danakil expeditions are led by local Afar guides who know the ground, with scouts and escort arrangements where required.',
  },
  {
    title: 'Planned around the heat',
    text: 'Days start early, the hottest hours are for rest, and water is planned for every day of the route.',
  },
  {
    title: 'Our own team and 4×4 vehicles',
    text: 'Our own guides, drivers and field staff run the journey. One team is responsible for the whole ground operation.',
  },
  {
    title: 'Designated safe areas only',
    text: 'At Dallol and Erta Ale your guide decides on the day how close it is safe to go, and the group stays within designated safe areas.',
  },
  {
    title: 'Honest, constant communication',
    text: 'If something changes, we verify it on the ground, explain what it means for you, offer realistic options and choose the safest one.',
  },
]
