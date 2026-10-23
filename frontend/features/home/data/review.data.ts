import type { ReviewSummary, Testimonial } from '../types/review.types'

// Real Tripadvisor reviews of Tesema (Tevan) and his team, listed there as
// Simien Ethio Tours. Each quote is the reviewer's own review title, verbatim;
// the full review stays on Tripadvisor. Afar and Danakil trips come first.
// Never add a review here that is not published on that listing.
const image = 'https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803'

export const testimonials: Testimonial[] = [
  {
    quote: 'We went to the Simien Mountains, Gonder and Danakil Depression with this company.',
    name: 'Tarik K',
    detail: 'Simien, Gonder & Danakil · Family · Apr 2026',
    image: `${image}/danakil-depression.png`,
  },
  {
    quote: 'Amazing Ethiopia',
    name: 'Frilane C',
    detail: 'Abune Yemata & Danakil · Solo · Oct 2025',
    image: `${image}/dallol.png`,
  },
  {
    quote: 'Amazing tour organized by Tevan Simien Ethio Tours',
    name: 'Han T',
    detail: 'Simien Mountains · Solo · Jul 2026',
    image: `${image}/simien-mountains.png`,
  },
  {
    quote: 'Fantastic experience with Tevan and his team',
    name: 'Roberta L',
    detail: 'Denver, Colorado · Couple · Apr 2026',
    image: `${image}/simien-mountains.png`,
  },
  {
    quote: 'Amazing trip to Gondar and Lake Tana Region in Ethiopa',
    name: 'Ulrich M',
    detail: 'Gondar & Lake Tana · Couple · Jan 2026',
    image: `${image}/lake-tana.png`,
  },
  {
    quote: 'Simien Mountains Trip',
    name: 'Kazimierz L',
    detail: 'Poland · Friends · Mar 2026',
    image: `${image}/simien-mountains.png`,
  },
  {
    quote: 'Great Experience, Great Guide, Great Food',
    name: 'Mike L',
    detail: 'Solo · Sep 2026',
    image: `${image}/gondar.png`,
  },
  {
    quote: 'Timket in Gondar',
    name: 'Antónia G',
    detail: 'Gondar · Solo · Jan 2026',
    image: `${image}/gondar.png`,
  },
]

export const reviewSummary: ReviewSummary = {
  platform: 'Tripadvisor',
  listing: 'Simien Ethio Tours',
  url: 'https://www.tripadvisor.com/Attraction_Review-g317059-d32805557-Reviews-Simien_Ethio_tours-Gonder_Amhara_Region.html',
  count: 27,
}
