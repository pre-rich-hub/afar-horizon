import {destinations} from '@/features/destinations/catalogue'
import {tours} from '@/features/tours/catalogue'
import {posts} from '@/features/blog/catalogue'
import {indexableStaticRoutes} from '@/lib/seo/routes'
export const publicPaths = new Set<string>([
 ...indexableStaticRoutes, '/plan',
 ...destinations.map(d => `/destinations/${d.slug}`),
 ...tours.map(t => `/expeditions/${t.slug}`),
 ...posts.map(p => `/blog/${p.slug}`),
])
