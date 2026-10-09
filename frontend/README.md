# Afar Horizon Expeditions — Frontend

Marketing site and admin panel for Afar Horizon Expeditions, built with
Next.js (App Router), React 19, TypeScript, and Tailwind CSS v4.

## Getting started

```bash
pnpm install
cp .env.example .env.local  # Set API_BASE_URL for the separate Express backend
pnpm dev                   # http://localhost:3000
```

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

## Structure

```text
frontend/
├── app/                 Routes, layouts, metadata, loading and not-found states
│   ├── page.tsx         Homepage composition
│   ├── (auth)/login/    Admin sign-in, still served at /login
│   ├── admin/           Session-guarded admin routes
│   └── …                Existing public index and dynamic detail routes
├── features/
│   ├── home/            Homepage-only sections and their interactions
│   ├── about/
│   ├── contact/
│   ├── destinations/
│   ├── tours/
│   ├── layover/
│   ├── blog/
│   ├── gallery/
│   ├── auth/            Login and session verification
│   ├── admin/           Admin screens, resource APIs, types, and hooks
│   ├── enquiries/       Shared journey enquiry form and endpoint
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
is no empty destination hooks folder. Tour and layover live-data overlays live
in their respective feature utilities.

## Further reading

[`docs/backend-design.md`](docs/backend-design.md) is a planning document, not a
complete description of the implemented backend. This checkout contains the
frontend and expects a separate Express API.
