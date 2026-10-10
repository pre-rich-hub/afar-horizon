export type BrandPromise = {
  title: string
  text: string
}

export const contact = {
  phone: '+251 956 61 6969',
  whatsapp: '+251 956 61 6969',
  email: 'info@afarhorizon.com',
  address: 'Bole Medhaniallem, Cape Verde Street 1000, Addis Ababa, Ethiopia',
  hours: 'Monday to Saturday 8:00 AM - 5:30 PM',
}

// "Why Afar Horizon": shown on the homepage and contact page.
export const promises: BrandPromise[] = [
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
