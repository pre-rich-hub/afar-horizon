import type { LayoverPackage } from '../types/layover.types'

export const layoverPackages: LayoverPackage[] = [
  {
    slug: '6-hour',
    hours: '6 Hours',
    title: 'The Espresso',
    price: '$95 per person',
    image: '/images/coffee-ceremony.png',
    teaser:
      'A tight, elegant loop of the capital for a short connection — city, coffee, and back with time to spare.',
    itinerary: [
      'Meet at arrivals with a name board and a cold towel',
      'Drive to Entoto ridge for the city panorama and eucalyptus air',
      'A private coffee ceremony in a family home in Shiro Meda',
      'Late lunch of injera and tibs at a designers’ favourite',
      'Return to the terminal three hours before departure',
    ],
    includes: [
      'Private air-conditioned vehicle and driver-guide',
      'All entrance fees',
      'Lunch and the coffee ceremony',
      'Airport meet-and-greet both ways',
    ],
    best: 'Connections of 8 hours or more',
  },
  {
    slug: '12-hour',
    hours: '12 Hours',
    title: 'The Capital',
    price: '$165 per person',
    image: '/images/textile.png',
    teaser:
      'The full Addis day: Lucy at the National Museum, the Mercato, Holy Trinity, and a long lunch.',
    itinerary: [
      'Arrivals meet, breakfast at a rooftop above Bole',
      'The National Museum with a curator — Lucy, in person',
      'Holy Trinity Cathedral and the imperial tombs',
      'Mercato with a chef, then a spice-market tasting',
      'Late lunch, hammam or hotel day room to reset',
      'Evening return with priority check-in assistance',
    ],
    includes: [
      'Private vehicle, driver-guide and curator access',
      'Hotel day room for showering and rest',
      'All meals and entrance fees',
      'Departure check-in assistance',
    ],
    best: 'Connections of 14 hours or more',
  },
  {
    slug: '24-hour',
    hours: '24 Hours',
    title: 'The Overnight',
    price: '$395 per person',
    image: '/images/luxury-lodge.png',
    teaser:
      'A night in a proper bed, a highland morning outside the city, and a proper dinner with live azmari music.',
    itinerary: [
      'Arrivals meet and transfer to a boutique hotel',
      'Dinner with live azmari music in Kazanchis',
      'Sunrise drive to the Debre Libanos monastery and Portuguese Bridge',
      'Gelada troops on the Jemma gorge rim',
      'Lunch on the escarpment, return to Addis',
      'Spa hour, then evening transfer to the airport',
    ],
    includes: [
      'One night in a boutique hotel with breakfast',
      'Private vehicle and driver-guide throughout',
      'All meals, park and monastery fees',
      'Spa session before departure',
    ],
    best: 'Overnight connections and stopovers',
  },
  {
    slug: '48-hour',
    hours: '48 Hours',
    title: 'The Stopover',
    price: '$890 per person',
    image: '/images/lalibela.png',
    teaser:
      'Two days is enough for Lalibela. A dawn flight north, the rock churches, and back for your onward leg.',
    itinerary: [
      'Arrivals meet, hotel, and an early night',
      'Dawn flight to Lalibela with your scholar-guide',
      'The northern and eastern church clusters, quietly',
      'Night in a lodge above the Lasta mountains',
      'Sunrise liturgy, then the flight back to Addis',
      'Day room, dinner and evening departure',
    ],
    includes: [
      'Domestic flights Addis – Lalibela – Addis',
      'Two nights accommodation with breakfast',
      'Scholar-guide and all church entrance fees',
      'All transfers and a departure day room',
    ],
    best: 'Stopovers of two nights or more',
  },
]

import { BadgeCheck, Clock3, Plane, ShieldCheck } from 'lucide-react'

export const assurances = [
  {
    icon: Plane,
    title: 'We track your inbound flight',
    text: 'If you land two hours late, your driver is still there and the day is reshaped around the time you actually have.',
  },
  {
    icon: BadgeCheck,
    title: 'Visa on arrival, handled',
    text: 'Most nationalities can buy a visa at Bole. We send the exact steps, the cost, and someone waiting on the other side of it.',
  },
  {
    icon: Clock3,
    title: 'Back three hours early',
    text: 'Every itinerary is timed to return you to the terminal three hours before your onward departure. We do not gamble with connections.',
  },
  {
    icon: ShieldCheck,
    title: 'Luggage stays safe',
    text: 'Checked through to your final destination in most cases. Hand luggage travels locked in the vehicle or in a day-room safe.',
  },
]
