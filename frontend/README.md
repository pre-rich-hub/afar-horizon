# Afar Horizon Expeditions — Frontend

Marketing site and admin panel for Afar Horizon Expeditions, built with
Next.js (App Router), React 19, TypeScript, and Tailwind CSS v4.

## Getting started

```bash
pnpm install
cp .env.example .env.local  # Set API_BASE_URL for the separate Express backend
pnpm dev                   # http://localhost:3000
```

### SEO environment

The confirmed canonical origin is `https://afarhorizon.com`. Copy the values in
`.env.example` into local configuration and set them separately in the hosting
environment. Production builds require `SITE_URL`; invalid origins fail the build.

```dotenv
SITE_URL=https://afarhorizon.com
SEO_INDEXABLE=true
DEPLOYMENT_ENV=production
```

Indexing requires all three conditions: a production build, an explicit
`SEO_INDEXABLE=true`, and a production deployment marker. A conflicting preview,
staging or development marker always forces noindex. Vercel's `VERCEL_ENV` and
Netlify's `CONTEXT` are recognized; other hosts should set `DEPLOYMENT_ENV`
explicitly. Set `SEO_INDEXABLE=false` or `DEPLOYMENT_ENV=preview` on staging and
preview deployments. Never use a preview URL as `SITE_URL`: canonical links always
refer to the confirmed production origin.

Development without `SITE_URL` falls back to localhost and remains noindex.
Private admin/login pages and the enquiry/credit utility pages remain noindex
even when production indexing is enabled. A production rebuild is needed after
changing these settings because static page metadata is generated at build time.

Shared configuration lives in `lib/config/site.ts`, and public route metadata is
created through `lib/seo/metadata.ts`. These produce complete page-specific
canonical, Open Graph and Twitter metadata instead of inheriting another page's
social fields. Run `node --test tests/seo.test.cjs` to check origin validation,
indexing controls and metadata behavior.

After building, start the local production server and check the rendered metadata:
`node tests/verify-seo-build.cjs --base-url=http://localhost:3000`.
For a preview build, add `--preview`; use the same deployment markers when building
and starting the server. The baseline reports are in `docs/seo-phase1-baseline.md`.

### Crawl and indexing checks

`app/sitemap.ts` combines the 13 public static routes in `lib/seo/routes.ts` with
feature-owned destinations, expeditions and blog articles. Production currently
publishes 58 URLs; catalogue additions appear on the next build. Preview/staging
builds publish an empty sitemap and do not advertise it in `robots.txt`.
Modification dates are omitted until trustworthy editorial timestamps exist.

`robots.txt` allows public pages and assets and excludes API crawling. It leaves
noindex pages crawlable so search engines can read their directives. `proxy.ts`
also sends `X-Robots-Tag` on preview responses and private/utility pages, including
unauthenticated admin redirects. Authentication still comes from the admin layout.
Catalogue detail routes use `dynamicParams=false`: publish new entries by rebuilding;
unknown slugs return 404 rather than a streamed not-found page with status 200.

Run `node tests/verify-crawl.cjs --base-url=http://localhost:3000` against the built
server; add `--preview` for a preview build. This checks the sitemap, every listed
page's status/canonical/indexing, internal-link reachability, old redirects, missing
slugs, the removed coffee article, query canonicals and admin protection.

Configure HTTP and www redirects at the hosting/CDN layer to the confirmed
`https://afarhorizon.com` origin, preserving path/query. The app removes trailing
slashes and query variants use the base page canonical. Host redirects are a live
deployment check; the app does not trust arbitrary Host headers to select a domain.

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Development server |
| `pnpm build` / `pnpm start` | Production build and server |
| `pnpm typecheck` | TypeScript check without emitting |
| `node --test tests/*.test.cjs` | Feature contract and architecture checks |

Public pages render using feature-owned static catalogues when live data is
unavailable. Form submissions, admin operations, and assistant responses require
the backend. Tour prices and featured flags overlay the static tour catalogue;
other tour content remains local.

### Editorial content checks

Articles support legacy paragraphs plus feature-owned headings and inline links.
Editorial related-guide priorities and topics replace catalogue-order suggestions.
Destination guides and expedition place links connect informational and itinerary pages.
The search intent map is in `docs/seo-phase3-intent-map.md`. Privacy and website terms
live in `features/legal/` and are linked from the footer.

Run `node tests/verify-content.cjs --base-url=http://localhost:3000` against the built
server to verify primary headings, article sections, contextual links, package/enquiry
paths and the new legal links across all 60 public URLs. Use the metadata and crawl
verifiers alongside it after changing route or catalogue content.

## Structure

```text
frontend/
├── app/                 Routes, layouts, metadata, loading and not-found states
│   ├── page.tsx         Homepage composition
│   ├── (auth)/login/    Admin sign-in, still served at /login
│   ├── admin/           Session-guarded admin routes
│   └── …                Existing public index and dynamic detail routes
├── features/
│   ├── legal/           Privacy and website terms content
│   ├── home/            Homepage-only sections and their interactions
│   ├── about/
│   ├── contact/
│   ├── destinations/
│   ├── tours/           Expedition catalogue, served at /expeditions
│   ├── blog/
│   ├── gallery/
│   ├── faq/  before-you-go/  plan/  specialist-travel/
│   ├── ground-operations/  photo-credits/
│   ├── auth/            Login and session verification
│   ├── admin/           Admin screens, resource APIs, types, and hooks
│   ├── enquiries/       Enquiry, Plan My Journey and partner forms, and endpoint
│   ├── newsletter/      Subscription form and endpoint
│   └── support/         Floating support UI and streaming assistant
├── components/
│   ├── ui/              Shared UI primitives
│   ├── layout/          Site navigation and footer
│   └── common/          Shared heroes, headings, cards, links, icons, and reveal
├── lib/
│   ├── api/             JSON and admin request transports
│   ├── utils/           Class names and date formatting
│   ├── constants/       Shared navigation, contact details, and brand promises
│   └── config/          Server-side backend URL configuration
├── public/              Images and icons, with their original URLs
└── tests/               Contract and ownership checks
```

## Ownership rules

- `app/` owns route composition, metadata, static generation, route parameters,
  and missing-record handling. Page sections and domain logic belong in features.
- Each feature owns its components, data, types, utilities, client hooks, and
  backend endpoint calls. Add a subfolder only when it has a real responsibility.
- Homepage-only presentations stay in `features/home`, even when they display
  destinations or tours. They reuse domain data and cards through feature exports.
- Cross-feature consumers import from `@/features/<feature>`. Feature internals
  use relative imports; `index.ts` explicitly exports the consumer-facing surface.
- Authentication's `features/auth/server.ts` is a separate server-only entry point.
  Never re-export it from the client-facing auth index.
- Shared UI belongs in `components`; infrastructure belongs in `lib`. Domain URLs
  and endpoint functions belong in feature API modules. Public and admin request
  transports retain their distinct headers, timeout, and error behavior.
- Public catalogue types and admin resource types are separate contracts. Admin
  API payloads need not match the static catalogue's display model.
- `@/` resolves to `frontend/`. Components use PascalCase filenames, hooks use
  camelCase beginning with `use`, and domain files use names such as
  `destination.data.ts`, `destination.types.ts`, and `destination.utils.ts`.
- Next.js convention files retain their required names (`page.tsx`, `layout.tsx`,
  and so on). Colours use the tokens in `app/globals.css`.

## Destination example

```text
features/destinations/
├── components/          Cards, grid, hero, overview, journeys, and enquiry sections
├── data/destination.data.ts
├── types/destination.types.ts
├── utils/destination.utils.ts
└── index.ts
```

Destination hover state currently belongs to the homepage presentation; there
is no empty destination hooks folder. The tour live-data overlay lives in the
tours feature utilities.

## Further reading

[`docs/backend-design.md`](docs/backend-design.md) is a planning document, not a
complete description of the implemented backend. This checkout contains the
frontend and expects a separate Express API.
