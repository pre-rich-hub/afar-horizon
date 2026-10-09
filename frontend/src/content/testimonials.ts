import type { ReviewSummary, Testimonial } from '@/types'

export const testimonials: Testimonial[] = [
  {
    quote:
      'We have travelled the world, yet nothing prepared us for Ethiopia. Every detail was considered, every guide extraordinary. We did not feel like tourists — we felt like guests of an old friend.',
    name: 'Eleanor Whitmore',
    detail: 'The Historic Route · United Kingdom',
    image: '/images/traveler-portrait.png',
  },
  {
    quote:
      'They rebuilt our itinerary twice before we ever paid a deposit, then again in-country when the light was better in the south. That is not a package. That is a design practice.',
    name: 'Daniel Okonjo',
    detail: 'Omo Valley Cultural Odyssey · Nigeria',
    image: '/images/traveler-portrait.png',
  },
  {
    quote:
      'A fourteen-hour connection in Addis became the most memorable day of the whole trip. Met at the gate, back at check-in, and Lucy in between.',
    name: 'Marta Køhler',
    detail: 'The Capital, 12-hour layover · Denmark',
    image: '/images/traveler-portrait.png',
  },
  // Sample reviews for the template — replace with genuine guest reviews
  // before launch.
  {
    quote:
      'Standing on the rim of Erta Ale at midnight with the lava lake below us is something I will never forget. The team handled every permit, every camp and every early start without a single hiccup.',
    name: 'James Whitfield',
    detail: 'Danakil Expedition · Australia',
    image: '/images/traveler-portrait.png',
  },
  {
    quote:
      'Our guide in the Simien knew every gelada troop by name. Paced perfectly for our family, with lodges that felt like a reward at the end of each walk.',
    name: 'Sofia Lindqvist',
    detail: 'Highlands & Wildlife · Sweden',
    image: '/images/traveler-portrait.png',
  },
  {
    quote:
      'Timkat in Gondar was overwhelming in the best way. We had a quiet vantage point above the crowds and a priest who explained every moment of the ceremony.',
    name: 'Priya Raman',
    detail: 'Timkat Festival Journey · India',
    image: '/images/traveler-portrait.png',
  },
  {
    quote:
      'From the island monasteries of Lake Tana to a coffee ceremony in a Kaffa farmhouse, every day had one moment that stopped us in our tracks. Thoughtful, unhurried and beautifully planned.',
    name: 'Thomas Becker',
    detail: 'Sacred Waters & Coffee · Germany',
    image: '/images/traveler-portrait.png',
  },
  {
    quote:
      'Lalibela at dawn, before anyone else arrived, was worth the whole trip. Our designer listened carefully and built the route around exactly what we hoped to see.',
    name: 'Amara Nwosu',
    detail: 'The Historic Route · Canada',
    image: '/images/traveler-portrait.png',
  },
]

// Review summary for the homepage reviews strip. Fill in `count` with the
// real total from the review platform and `url` with the listing page;
// until then the strip counts the testimonials below and hides the link.
export const reviewSummary: ReviewSummary = {
  platform: 'Tripadvisor',
  url: null,
  count: null,
}
