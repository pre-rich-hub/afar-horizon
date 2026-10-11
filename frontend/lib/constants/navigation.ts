// Main navigation. `menu` names the desktop dropdown a link opens:
// 'expeditions' and 'destinations' are full-width panels, 'links' is a small
// list of `children`.
export type NavLink = {
  label: string
  href: string
  menu?: 'expeditions' | 'destinations' | 'links'
  children?: { label: string; href: string; text?: string; image?: string }[]
}

export const navLinks: NavLink[] = [
  { label: 'Expeditions', href: '/expeditions', menu: 'expeditions' },
  { label: 'Destinations', href: '/destinations', menu: 'destinations' },
  { label: 'Before You Go', href: '/before-you-go' },
  {
    label: 'Specialist & Partners',
    href: '/specialist-travel',
    menu: 'links',
    children: [
      { label: 'Specialist Travel', href: '/specialist-travel', text: 'Photography, film, research and trekking', image: 'https://res.cloudinary.com/xsrr0wfh/image/upload/v1791652743/Erta_Ale_approach.png' },
      { label: 'Ground Operations', href: '/ground-operations', text: 'For tour operators and agencies', image: 'https://res.cloudinary.com/xsrr0wfh/image/upload/v1791643803/lake-assale.png' },
    ],
  },
  { label: 'About Us', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
]

export const planJourneyLink = { label: 'Plan My Journey', href: '/plan' }
