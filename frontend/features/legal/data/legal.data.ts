import type { LegalPage } from '../types/legal.types'

export const privacy: LegalPage = {
  title: 'Privacy Policy',
  intro: 'How information is used when you browse Afar Horizon Expeditions, ask about a journey or use our travel assistant.',
  sections: [
    { title: 'Journey enquiries', paragraphs: [
      'Our contact and journey-planning forms send your name, email address and message to our team. Journey preferences entered in a planning form are included in that message. We use this information to answer your request and discuss the route and services you are interested in.',
      'Please share only the information needed for your enquiry. Do not send passport copies, payment-card details or sensitive medical information through the website forms or travel assistant.',
    ] },
    { title: 'Newsletter subscriptions', paragraphs: [
      'The newsletter form sends your email address to our subscription service. Subscribing is separate from making an enquiry. Contact us if you want your email removed from the subscription list.',
    ] },
    { title: 'Travel assistant', paragraphs: [
      'The assistant sends your messages and a conversation identifier to our backend. Conversation messages are stored to provide context for replies; a configured AI service processes the messages needed to generate a response. The backend also uses a hashed network identifier and usage counters to manage access and prevent misuse.',
      'Use the assistant for general travel questions. Contact the team directly for booking confirmation, individual requirements or information you would prefer not to share with an AI service.',
    ] },
    { title: 'Website services and technical information', paragraphs: [
      'Our hosting, database, email and AI services process information needed to operate the website and respond to requests. Images load from Cloudinary. Visiting these services can transmit technical details such as your network address and browser request information to their providers.',
      'The production website includes Vercel Web Analytics for page-use statistics. Its standard service uses aggregated measurements and does not use third-party tracking cookies. Admin sign-in uses a session cookie; the travel assistant keeps a conversation identifier in memory while the page is open.',
    ], link: { label: 'Vercel Web Analytics privacy information', href: 'https://vercel.com/docs/analytics/privacy-policy' } },
    { title: 'Questions about your information', paragraphs: [
      'Contact Afar Horizon Expeditions to ask about information submitted through the website, its retention, corrections or deletion, or to stop newsletter messages. Include enough context for us to locate your enquiry or subscription; do not include confidential documents in the initial request.',
      'This notice describes the website services. If a confirmed booking requires further information or sharing with accommodation, transport or other journey providers, discuss that use with the team before providing the details.',
    ] },
  ],
}

export const terms: LegalPage = {
  title: 'Website Terms',
  intro: 'How to use our journey information, planning forms and travel assistant, and what to confirm before booking an expedition.',
  sections: [
    { title: 'Journey information and quotations', paragraphs: [
      'The website introduces destinations and proposed private itineraries. Sending an enquiry or using the assistant does not reserve a place, confirm availability or create a booking.',
      'Displayed prices and itinerary details are starting information. Ask the team for a quotation confirming your dates, route, services, inclusions and exclusions before making travel arrangements. Payment, cancellation and refund conditions must be set out in the booking terms supplied for your journey; this page does not replace them.',
    ] },
    { title: 'Access and changing conditions', paragraphs: [
      'Access, roads, weather, volcanic activity, local instructions and transport arrangements can affect an expedition. A published itinerary is not confirmation that a route is operating for particular dates.',
      'Natural events, visible lava, wildlife, salt-working activity, caravans and ceremonies are not guaranteed. Confirm walking demands, camp arrangements and the current route with the team, and check official travel advice relevant to your circumstances.',
    ], link: { label: 'Before you go', href: '/before-you-go' } },
    { title: 'Travel assistant and external links', paragraphs: [
      'The travel assistant provides automated planning information and may make mistakes. It cannot confirm a departure, quotation, permit or booking. Verify important details with the team.',
      'External websites are operated by their own providers. Their information and terms can change independently of this website.',
    ] },
    { title: 'Using the website responsibly', paragraphs: [
      'Use the forms and assistant for legitimate requests. Do not submit malicious files or content, impersonate another person, attempt to access restricted administration pages or interfere with the service.',
      'Ask us before reusing website text, photographs or branding for publication or commercial use. Image rights and permissions may belong to the photographer or another rights holder.',
    ] },
    { title: 'Contact and privacy', paragraphs: [
      'If something on the website appears inaccurate, or you need to clarify a proposed journey, contact Afar Horizon Expeditions. Our Privacy Policy describes the information handled by the website forms and assistant.',
    ], link: { label: 'Read the Privacy Policy', href: '/privacy' } },
  ],
}
