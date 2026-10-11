# Afar Horizon SEO implementation roadmap

Prepared: 10 October 2026. Status: Phases 1–5 implemented and validated locally (updated 11 October 2026). Phase 4's Google Rich Results Test remains pending; live deployment and Search Console verification remain separate tasks.

## Goal and working rules

Make the site easy to discover, crawl, understand and use, with Afar and the Danakil as the main focus and northern Ethiopia as supporting content. Measure useful enquiries and relevant search traffic, rather than rankings alone.

Work through the phases in order. Each phase has its own deliverables and completion checks; finish and review those before starting the next. Record evidence and the commit in the tracker. Deployment and external account changes happen when separately requested. Technical SEO can be delivered incrementally; we do not need to wait for translation or every future article before launching improvements.

- Preserve the current visual design and interactions. Semantic fixes, metadata and image delivery should not introduce a redesign.
- Preserve intentional review content, company facts and displayed prices. Do not invent ratings, credentials, authors, awards, operating guarantees or offers for SEO.
- Preserve working URLs. If a URL must change, add a relevant permanent redirect and update internal links.
- Keep route metadata and static generation in `frontend/app/`; domain content in features; shared SEO infrastructure in `frontend/lib/`. Respect existing feature boundaries.
- English SEO comes first. Translation and international SEO are the final extension. GEO can build on this work later; it is not a requirement for completing the initial SEO implementation.
- Account ownership, a production domain and client confirmations are dependencies for the relevant tasks, not reasons to stop independent code improvements.

## Repository baseline before Phase 1

| Area | Current state | Required work |
| --- | --- | --- |
| Public content | 19 destinations, 17 packages, 9 blog articles | Keep inventories generated from the real catalogues |
| Positioning | Afar-led catalogue; root metadata still describes generic luxury Ethiopia travel | Align default search and sharing copy with the actual product |
| Rendering | Public catalogue and article pages are rendered on the server/static build | Preserve HTML content and links; check live response status codes |
| Metadata | Titles and descriptions exist on many routes; canonical coverage is incomplete | Consistent page-specific metadata across all indexable routes |
| Site origin | No `metadataBase` or shared production site URL configuration found | Confirm the real domain and centralize the origin |
| Crawl discovery | No `app/sitemap.ts` or `app/robots.ts` found | Generate sitemap and robots responses |
| Private pages | Admin and login already have noindex metadata | Preserve and verify it in production |
| Other noindex | Photo credits already has noindex metadata | Keep it out of the sitemap |
| Structured data | FAQPage markup exists on the FAQ page | Add useful entity, breadcrumb and article markup; audit existing FAQ markup |
| Images | Cloudinary photos, local logos; global `images.unoptimized: true` | Measure and improve responsive image delivery |
| Semantics | Shared PageHero has an H1; About hero uses a blockquote instead | Audit headings without changing the presentation |
| Tracking | Vercel Analytics included in production | Confirm live configuration; add search and enquiry measurement |
| Redirects | Old tour URLs and the former Omo article redirect | Validate these; removed coffee article currently has no replacement redirect |
| Trust links | Footer has placeholder social/platform links; privacy/terms labels link to contact | Obtain real targets or client-approved treatment; do not invent destinations |

This is a source-code audit, not a claim about current production rankings, indexing or Core Web Vitals.

## Phase tracker

| Phase | Deliverable | Status | Evidence / commit |
| --- | --- | --- | --- |
| 1 | Baseline, site identity and metadata foundations | Completed locally | [Baseline reports](frontend/docs/seo-phase1-baseline.md); metadata tests and rendered-build verifier; included in this commit |
| 2 | Crawlability, sitemap, indexing rules and URL integrity | Completed locally; host redirects pending live verification | `tests/crawl.test.cjs`, `tests/verify-crawl.cjs`; production/preview checks passed; included in this commit |
| 3 | Search intent, on-page content and internal links | Completed locally; profile URLs and operator confirmations pending | [Intent map](frontend/docs/seo-phase3-intent-map.md); editorial/rendered checks; included in this commit |
| 4 | Structured data and trustworthy entity information | Implemented; local and Schema.org checks passed; Google test pending | [Validation record](frontend/docs/seo-phase4-validation.md); schema tests and rendered verifier; included in this commit |
| 5 | Image delivery, performance and mobile experience | Completed locally; field measurements and performance backlog remain | [Performance record](frontend/docs/seo-phase5-performance.md); responsive image and browser checks; included in this commit |
| 6 | Production verification, Search Console and conversion measurement | Frontend prepared; domain connection, Search Console and live measurement pending | [Launch checklist](frontend/docs/seo-phase6-launch.md); measurement tests |
| 7 | Ongoing content, local presence and search improvement | Workflow and tooling prepared; live review cycle pending | [Maintenance workflow](frontend/docs/seo-phase7-maintenance.md), [catalogue inventory](frontend/docs/seo-phase7-inventory.json), [review log](frontend/docs/seo-maintenance-log.csv) |
| 8 | Translation and international SEO | Deferred until translation | — |

## Phase 1 — Establish the basics

**Outcome:** every indexable page identifies the correct business, topic and canonical address.

### Implementation

- [x] Confirm the canonical HTTPS production origin and preferred www/non-www host with the owner. Do not infer it from the email address or a preview deployment.
- [x] Record a baseline route inventory and representative mobile/desktop performance reports: homepage, destination, package, article, gallery and enquiry page. Capture existing Search Console data if an account already exists.
- [x] Add shared site configuration with `SITE_URL`, the established brand name and default sharing image. Validate the URL; require a confirmed origin for production SEO builds. Keep localhost only for local development.
- [x] Configure root `metadataBase`; replace outdated luxury-focused defaults with accurate Afar/Danakil positioning. Use one consistent title template and avoid appending the brand twice.
- [x] Give each indexable route its own title, description, self-referencing canonical, Open Graph title/description/URL/image and Twitter summary card. Account for Next.js metadata inheritance so a child does not accidentally retain another page's sharing copy.
- [x] Cover the homepage, all public indexes, all destination/package details and all nine blog articles. Use feature-owned catalogue fields; add optional SEO overrides only where a display title or summary is unsuitable.
- [x] Use a real Cloudinary image relevant to each page. Keep local brand icons and logos. Use absolute canonical and sharing URLs derived from the same origin.
- [x] Add an explicit deployment indexing setting: previews/staging default to noindex; the verified production deployment is deliberately enabled. Never decide indexability from `NODE_ENV` alone, because previews also run production builds.
- [x] Treat approximately 50–60 characters for titles and 140–160 for descriptions as editorial guides, not hard ranking requirements. Prefer useful, distinct wording over forced lengths. Do not spend effort expanding the meta-keywords list.

**Primary locations:** root/page metadata in `frontend/app/`; shared helpers/config in `frontend/lib/`; existing destination, tour and blog data/types in their features.

### Complete when

- All indexable routes have distinct, relevant titles and descriptions and the intended canonical.
- Rendered HTML contains the correct metadata without localhost, preview-host or duplicated-brand errors.
- Destination/package/article pages share their own photo and summary; basic sharing previews work.
- Preview responses are noindex and production indexing is explicitly configured.
- Typecheck, existing tests and production build pass.

### Delivery notes — 10 October 2026

- Owner confirmed `https://afarhorizon.com/` (non-www) and enabled indexing for production.
- Shared origin validation and metadata now cover all 58 public URLs: 13 static routes, 19 destinations, 17 packages and 9 articles. Production policy allows 56 pages to be indexed; `/plan` and `/photo-credits` remain noindex, follow. Admin/login retain noindex, nofollow.
- Titles, descriptions, canonical URLs, Open Graph and Twitter fields use the same page identity and relevant existing Cloudinary images. Visual design, catalogue content, reviews, company facts and prices were preserved.
- Preview deployment markers override production flags. Production hosting must set `SITE_URL=https://afarhorizon.com`, `SEO_INDEXABLE=true` and `DEPLOYMENT_ENV=production` before rebuilding. Hosting settings have not been changed by this implementation.
- The [baseline report](frontend/docs/seo-phase1-baseline.md) records all 58 routes and 12 representative mobile/desktop Lighthouse measurements; [machine-readable evidence](frontend/docs/seo-phase1-baseline.json) is retained. No Search Console data was supplied; live search measurement remains Phase 6 work.
- Validation: architecture, feature-contract and SEO tests, TypeScript checks and production build passed. Rendered metadata checks passed on all 58 public URLs in both production and preview modes, with the login noindex rule verified. No live deployment has been performed.

## Phase 2 — Make the site crawlable and control indexing

**Outcome:** crawlers can discover the right pages and receive honest status codes and redirects.

### Implementation

- [x] Implement `frontend/app/sitemap.ts` using explicit static routes plus the current destination, tour and blog public exports. Do not maintain a second handwritten list of dynamic slugs.
- [x] Include only canonical, indexable, successful URLs. Exclude private pages, old redirects, removed articles, query-string/filter variants and API URLs. Use meaningful last-modified dates when known; omit them rather than setting every URL to the build time.
- [x] Implement `frontend/app/robots.ts` with the absolute sitemap URL. Allow public HTML and required CSS/JS/image resources; disallow API crawling. Keep admin/login protected by authentication and noindex. Robots rules are not access control.
- [x] Let crawlers see noindex responses where indexing prevention depends on that directive; do not block those same URLs in robots.txt and assume the noindex will be read. [Google robots guidance](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
- [x] Apply this initial index policy consistently:

| Routes | Policy |
| --- | --- |
| `/`, `/about`, `/contact`, `/before-you-go`, `/faq`, `/gallery`, `/ground-operations`, `/specialist-travel` | Index; include in sitemap |
| `/destinations`, `/expeditions`, `/blog` and published detail routes | Index; include in sitemap |
| `/plan` | Noindex, follow; exclude from sitemap as a conversion-form page |
| `/photo-credits` | Noindex, follow; exclude from sitemap |
| `/login`, `/admin` and admin children | Noindex, nofollow; exclude from sitemap; retain authentication |
| Removed or unknown routes | Real 404/410, or a specific relevant permanent redirect; never sitemap entries |
| Preview/staging deployment | Noindex everywhere; production policy remains separate |

- [x] The current policy gives an expected 56 sitemap URLs: 11 static pages + 19 destinations + 17 packages + 9 articles. Recompute from the catalogues when content changes.
- [x] Verify existing redirects have no loops or unnecessary chains. Keep the Omo-to-Afar redirect. Leave the removed coffee article as a genuine 404 unless the owner provides a replacement of the same intent; do not redirect every removed page to the homepage.
- [x] Check arbitrary missing destination, expedition and blog slugs return actual 404 responses, including with streamed rendering. Adjust route validation if a visible not-found page is served with 200.
- [ ] Normalize HTTP/HTTPS and www/non-www at the deployment layer (hosting configuration and live verification pending). Keep a consistent trailing-slash policy. Filter and tracking parameters should not create separate indexable copies.

### Complete when

- `/robots.txt` and `/sitemap.xml` return valid production responses and use the confirmed origin.
- Every sitemap URL returns 200, is indexable, has the matching canonical and is reachable through an internal link.
- Private/conversion/credit pages are absent; all redirects and missing-page cases behave as intended.
- Automated metadata, sitemap and status checks cover dynamic slugs and a future catalogue addition.

### Delivery notes — 11 October 2026

- Added generated `/sitemap.xml` with 56 production URLs from static route policy and public feature catalogues. Private, utility, redirect and removed URLs are excluded; no speculative modification dates are emitted.
- Added `/robots.txt` with the canonical sitemap address and API exclusions. Noindex routes stay crawlable. Previews return an empty sitemap and omit its discovery directive.
- Added `X-Robots-Tag` response headers for previews, private/admin routes and utility pages. Existing admin authentication remains in place; unauthenticated admin requests redirect to login with noindex headers.
- Destination, expedition and article detail routes reject unlisted slugs with `dynamicParams=false`. New catalogue records become routable on rebuild. Missing slugs, arbitrary missing pages and `/blog/the-coffee-ceremony` returned real 404s for both browser and Googlebot requests.
- Confirmed existing permanent redirects reach successful destinations directly, including the Omo-to-Afar redirect. The explicit no-trailing-slash policy and tracking/filter query canonical checks passed.
- Automated checks verified every production sitemap URL returns 200, is indexable, has its matching canonical and is reachable from the homepage through HTML links. Preview checks verified noindex metadata/headers and no sitemap entries. Future destination, package and article additions are covered by tests.
- Architecture, feature-contract, metadata and crawl tests, TypeScript checks and production/preview builds passed. Commands and hosting requirements are documented in `frontend/README.md`.
- Hosting/CDN HTTP-to-HTTPS and www-to-non-www redirects have not been configured or verified live. Set those to `https://afarhorizon.com` while preserving paths and queries, then verify after deployment in Phase 6. No deployment or account changes were made.

## Phase 3 — Align pages with search intent

**Outcome:** each page answers a distinct traveller question and connects readers to a relevant journey.

### Implementation

- [x] Build a simple keyword-to-page map. Treat these as initial intent hypotheses; validate them with Search Console or available research, without inventing search volumes:

| Intent | Primary page |
| --- | --- |
| Afar tour operator / private Danakil expeditions | Homepage and `/expeditions`, with different positioning |
| Danakil, Erta Ale, Dallol or salt-lake information | Corresponding destination page |
| Specific route, duration and inclusions | Corresponding package detail |
| Best time, packing, responsible travel, Semera arrivals | Corresponding blog guide |
| Combined Danakil and northern highlands journey | Combined packages and supporting northern-route article |
| Photography / research / filming logistics | Specialist travel and ground operations, with distinct audiences |

- [x] Keep destination pages informational and package pages itinerary-led. Give similar packages distinct explanations of pace, stops and who they suit; avoid near-duplicate pages competing for one vague keyword.
- [x] Audit heading structure. Give each public page a clear primary heading and logical sections. Fix About's missing H1 while retaining the quote and design; avoid adding invisible keyword lists.
- [x] Improve article structure with useful subsection headings and contextual links. Extend the blog body model beyond plain paragraphs only when needed for headings/links, and retain support for existing data during migration.
- [x] Link related destinations, itineraries and articles using ordinary crawlable links with descriptive text. Replace the current arbitrary next-article relationship with topic-relevant recommendations where practical.
- [x] Keep the editorial focus at roughly 70% Afar or more. The current nine articles are seven Afar and two wider Ethiopia articles; do not add filler just to force an exact ratio.
- [x] Check photo subjects and alt text against the actual image, not just its filename. Keep decorative images' alt text empty. Do not describe a scenery image as an author portrait or a different region.
- [x] Check access, volcanic activity, travel timing and operational statements against current reliable sources and client confirmation. Add real editorial update dates when content changes; avoid evergreen guarantees about lava, caravans or access.
- [ ] Obtain actual social/platform targets from the client. Privacy/Terms pages were requested and built; footer labels now point to them. Do not fabricate legal copy or credentials. Preserve intentional company facts and reviews.

### Complete when

- The intent map assigns every important page a clear purpose without obvious duplication.
- Pages have meaningful headings, descriptive image text and relevant links; no orphaned published details or articles.
- Readers can move from a guide or destination to a suitable package and enquiry path.
- Desktop/mobile layouts and all existing form and carousel interactions remain intact.

### Delivery notes — 11 October 2026

- Added a [search intent map](frontend/docs/seo-phase3-intent-map.md) covering all 58 current indexable URLs. No keyword volumes or rankings are invented. Existing package summaries, pace, traveller-fit and itinerary differences were retained.
- About now has a visible H1 in the existing eyebrow position while keeping the quote and its design. Rendered checks found exactly one primary heading on all 60 public pages.
- Nine articles now have meaningful subsection headings, contextual links and a suitable expedition CTA. Legacy plain-string paragraphs remain supported. Related-guide recommendations use editorial priority and shared topics instead of catalogue order; ten destination pages link to relevant guides, and package place chips link to specific destination pages.
- Preserved the seven-Afar/two-wider-Ethiopia editorial balance, existing publication labels, company facts, intentional reviews and prices. Real content updates are displayed separately as 11 October 2026.
- Reviewed 29 photo subjects. Corrected Dallol-labelled uses of the lava image to the existing mineral-pool photo; added descriptive image alts. Intentional review imagery remains untouched. Exact provenance/location and image rights still depend on the client.
- Checked volcanic, access and cultural claims against primary references linked in the intent map and relevant articles. Removed unsupported current lava-lake statements, universal walking-distance promises and fixed Lalibela visiting-hour/ceremony claims. Date-specific routes, departures and operating arrangements still require the operator's confirmation.
- On request, added `/privacy` and `/terms` using the existing page styles, with feature-owned content based on current site/backend behaviour. Footer links now work. These add two indexable pages: the current sitemap has 58 URLs (13 static + 19 destinations + 17 packages + 9 articles), and total public route coverage is 60 including the two noindex utility pages.
- Privacy copy does not invent retention periods, provider contracts or regulatory certifications; website terms do not invent booking/refund conditions. The operator still needs to supply final booking conditions, deployed service/retention details and actual social/review profile URLs. Placeholder social links are preserved until those URLs arrive.
- Validation: architecture, feature-contract, metadata, crawl and editorial tests; TypeScript; production build; rendered content across 60 pages; 58 sitemap URLs and internal-link reachability; metadata across 60 pages. Chrome checks covered About, an article, Privacy, Terms, an expedition and the homepage at 390px and 1440px, checking a single primary heading, no horizontal overflow and a working homepage carousel control. No live form submissions or deployment were made.

## Phase 4 — Add accurate structured data

**Outcome:** machines can understand the business, page hierarchy and articles using information visitors can also verify.

### Implementation

- [x] Add shared safe JSON-LD serialization that escapes `<` before inserting JSON into a script element. Keep domain schema builders in the owning features.
- [x] Add one stable business entity using `TravelAgency` and a `WebSite` node, with consistent absolute `@id` values. Use existing confirmed name, URL, logo and contact information. Add social `sameAs` links only after real URLs are supplied.
- [x] Add `BreadcrumbList` to destination, package and article details, reflecting the real visible hierarchy. Add visible article breadcrumbs within the current design if needed.
- [x] Add `BlogPosting` for published articles with title, description, image, canonical URL, publisher and the displayed author. Introduce ISO publication/update dates where confirmed; keep human-readable display dates derived consistently. Do not invent author biographies or backdate new articles.
- [x] Describe destinations and itineraries with appropriate Schema.org entities such as `TouristDestination` and `TouristTrip`, based only on displayed catalogue content. These are semantic descriptions, not promised Google travel rich results.
- [x] Omit price/availability `Offer` markup while prices await the planned business decision. Omit review/aggregate-rating markup; do not convert the intentional on-site review presentation into eligibility claims or self-serving business review stars. [Google review guidance](https://developers.google.com/search/docs/appearance/structured-data/review-snippet)
- [x] Audit the existing FAQPage markup for safe serialization and exact parity with visible questions. Keep useful FAQ content, but do not make FAQ rich results a completion target: Google discontinued that Search feature in May 2026. [Google documentation update](https://developers.google.com/search/updates#may-2026)

### Complete when

- JSON-LD parses safely and matches the visible page and confirmed business details.
- Stable IDs connect business/publisher references without duplicate contradictory entities.
- Applicable Google-supported types pass the Rich Results Test; other types validate through Schema.org validation.
- Missing optional data is omitted rather than guessed. No unconfirmed offers, ratings or author claims are emitted.

### Phase 4 implementation record — 11 October 2026

- Root layout emits one connected `TravelAgency`/`WebSite` graph. Domain builders add breadcrumbs and entities to 19 destination, 17 expedition and nine article detail pages; FAQ markup uses the same safe renderer.
- The owner confirmed existing publication labels. ISO publication dates reproduce those labels; modification dates retain the actual 11 October editorial update. No publication clock times, author URLs, social profiles, ratings or offers were invented.
- Type checks, all six test files and the production build pass. Rendered JSON-LD, content/link and metadata checks pass on all 60 public pages. Four representative graphs validate through Schema.org with zero errors and zero warnings.
- Google's Rich Results Test was attempted in code mode but returned “Something went wrong — Log in and try again.” Its result is **pending**, not a pass. An authenticated manual check and deployed-URL verification remain necessary. See the [validation record](frontend/docs/seo-phase4-validation.md).

## Phase 5 — Improve image delivery and mobile performance

**Outcome:** real photographs load at appropriate sizes without compromising the current experience.

### Implementation

- [x] Use the Phase 1 production-build measurements to prioritize the actual bottlenecks. Inspect downloaded image dimensions/bytes, LCP requests, JavaScript, fonts and layout shifts.
- [x] Add a shared Cloudinary loader for site photos using width-based transformations, automatic format and automatic quality. Integrate it with Next Image responsive sizing; remove the global optimization bypass where it prevents responsive delivery. Keep logos on their existing local asset paths.
- [x] Preserve each original upload URL/public ID, photo subject, layout and intended crop. Avoid combining a Cloudinary transformation pipeline with a second photo optimizer unnecessarily. Test transformations against the actual Cloudinary account before rollout.
- [x] Verify `sizes` and reserved dimensions/aspect ratios on heroes, cards, galleries and thumbnails. Give loading priority to the initial visible hero only; lazy-load below-the-fold images and avoid eagerly downloading every slideshow frame.
- [x] Keep crawlable content in the initial HTML. Reduce unnecessary client JavaScript, expensive animations and third-party scripts where measurements justify it, preserving the design and reduced-motion behavior.
- [x] Check mobile overflow, keyboard access, readable content, stable navigation and enquiry forms. Performance changes must not break gallery/lightbox controls or delay useful page content.

### Complete when

- Mobile cards/thumbnails no longer download unnecessarily large original PNGs; transformed images return successfully and look correct.
- Representative production-build pages improve against the baseline without functional or visual regressions.
- Field goals are LCP ≤ 2.5 seconds, INP ≤ 200 ms and CLS ≤ 0.1 at the 75th percentile, when enough real-user data is available. Lab testing guides fixes; it does not prove field INP or guarantee rankings. [Google Core Web Vitals guidance](https://developers.google.com/search/docs/appearance/core-web-vitals)
- Lighthouse reports and the remaining performance backlog are recorded; a score of 100 is not a release requirement.

### Phase 5 implementation record — 11 October 2026

- Added a global Cloudinary loader with responsive width candidates, `f_auto`, `q_auto` and `c_limit`. Original catalogue URLs, social/schema images, upload IDs and CSS crops are preserved. Local logo files retain their paths and now declare intrinsic dimensions.
- Navigation photos now use responsive thumbnails. Only the first hero frame appears in the initial HTML; subsequent frames are prepared shortly before transitions. Hero/gallery timers wait for the replacement image, the gallery pauses outside the viewport, and destination/gallery cross-fades retain the outgoing image while loading.
- Initial hero requests have high fetch priority and the root layout preconnects to Cloudinary. Reduced-motion visitors get a static hero and a paused gallery. Desktop dropdowns now open for keyboard focus as well as hover.
- Type checks, all seven test files, the 79-page build and image checks on all 60 public routes pass. Content, metadata and schema checks remain passing. All 28 unique uploads return valid image responses at widths 96 and 640. Browser checks pass on six page templates at 390px and 1440px, including gallery/lightbox controls, menu access and enquiry fields.
- All twelve Lighthouse performance scores improve and transfers fall by 93.9–97.0%; measured CLS is zero. LCP improves in ten comparisons, with mobile homepage and desktop enquiry remaining above the single-run baseline. The comparisons and remaining delivery/performance backlog are recorded in the [performance record](frontend/docs/seo-phase5-performance.md). Field LCP/INP/CLS remain production measurements; lab results do not establish field targets.

## Phase 6 — Verify production and start measurement

**Outcome:** the live site is correctly indexable and enquiry performance can be evaluated.

### Implementation

- [ ] Have the owner provide Search Console property access and domain/DNS ownership where needed. Prepare verification configuration in code if appropriate; verify externally and submit the sitemap only when authorized.
- [ ] Recheck production HTTPS redirects, canonical host, robots directives, sitemap, social metadata, 404s, schema, image responses and public content rendered in HTML.
- [ ] Inspect representative homepage, destination, package and article URLs in Search Console. Confirm the selected canonical and that required resources are accessible. Investigate exclusions instead of requesting indexing repeatedly.
- [ ] Confirm Vercel Analytics is active on the actual deployment. Add enquiry-success and contact-intent events through the agreed analytics system; count successful form responses separately from button clicks.
- [ ] Track WhatsApp/contact clicks, package enquiry intent and completed enquiry submissions without sending names, email addresses, phone numbers or message contents to analytics. Integrate with the site's agreed consent behavior where applicable.
- [ ] Record a launch baseline: indexed pages, impressions, clicks, relevant queries, landing pages, mobile performance and enquiries. Search performance needs real observation time, not an instant ranking claim.

### Complete when

- The owner can access search and analytics reports; the sitemap is accepted and representative URLs are inspectable.
- The intended live pages are indexable, with no accidental sitewide noindex or preview origin.
- Test enquiries generate the expected successful-submission event exactly once; failed submissions do not count as success.
- External account or deployment dependencies that remain unresolved are explicitly recorded rather than marked complete.

### Phase 6 preparation — 11 October 2026

- Owner confirmed Vercel Hobby, no Search Console property and no custom-domain connection yet. The canonical domain currently serves a LiteSpeed parking page; robots and sitemap return 404. Live indexing and deployment checks remain pending.
- Added optional production-only Google HTML verification metadata, production-only Vercel page views, URL sanitization and a measurement disable switch. Preview/local deployments do not send analytics. Domain-property DNS verification remains the preferred documented setup.
- Prepared enquiry-success, contact-channel and package-enquiry events without personal information. Custom events default off and remain disabled on Hobby; no provider or paid plan was selected. Both enquiry forms guard concurrent submissions and retry failures; success is counted only after the backend accepts the request.
- Validation: all eight test files, TypeScript and the production build pass; rendered metadata/content/schema checks cover 60 public pages and crawl checks cover 58 sitemap URLs. Mocked mobile journey and desktop partner forms pass duplicate-request, failure and retry checks without real enquiries.
- Account, DNS, deployment, sitemap submission and baseline steps are recorded in the [launch checklist](frontend/docs/seo-phase6-launch.md). Phase 6 is not complete until those external checks and report access are established.

## Phase 7 — Maintain and grow useful search visibility

**Outcome:** technical SEO remains healthy while content improves from actual traveller questions and results.

- [ ] Review indexing, broken links, redirects and search-query/landing-page performance weekly during the initial rollout, then monthly when stable.
- [ ] Improve high-impression pages with weak engagement using better intent alignment and snippets; prioritize useful enquiries over broad traffic totals.
- [ ] Update existing Afar guides before publishing repetitive new ones. Add genuinely distinct content when client knowledge or traveller questions support it; maintain a roughly 70%+ Afar focus.
- [ ] Review volatile destination and access statements before promoting departures. Keep true publication/update dates, image subjects, canonical URLs and schema synchronized with editorial changes.
- [ ] Have the owner verify eligibility and details for Google Business Profile; use the real operating address and contact details. Add genuine local/travel-directory listings and partner references where relevant, without duplicate profiles, purchased links or manufactured reviews.
- [ ] Maintain a change log and compare search/enquiry trends over meaningful periods, accounting for seasonality. Monitor Cloudinary failures, form errors and frontend/backend catalogue discrepancies.
- [x] Prepare a separate GEO worklist from this foundation: clear answers, consistent entity facts and useful original expertise. Do not treat an `llms.txt` file as an SEO prerequisite or ranking improvement. [Google AI guidance](https://developers.google.com/search/docs/appearance/ai-features)

**Complete when:** a named owner, review schedule, baseline dashboard and prioritized improvement backlog exist. This phase remains ongoing; “full SEO” is a maintained process, not a one-time finished ranking result.

### Phase 7 preparation — 11 October 2026

- Added `npm run seo:check` to generate a current catalogue inventory and run the five existing rendered SEO verifiers against an explicit local/production/preview origin. It saves a report, reports each failure and optionally checks unique catalogue photo responses; it does not submit forms or change external services.
- Prepared a [maintenance workflow](frontend/docs/seo-phase7-maintenance.md) with a post-launch weekly/monthly schedule, responsibilities by role, review instructions, a prioritized backlog for all nine guides, and frontend/backend catalogue reconciliation steps. Named people and live account access remain pending.
- Added a [CSV review log](frontend/docs/seo-maintenance-log.csv) and [initial inventory](frontend/docs/seo-phase7-inventory.json): 19 destinations, 17 expeditions and nine articles, seven Afar (78%). Unmeasured search/enquiry values remain blank. No new articles, client facts, prices or reviews were changed.
- Prepared the separate [GEO worklist](frontend/docs/geo-worklist.md), with ordinary SEO foundations and client-confirmed original expertise as priorities. No AI-specific file or special schema was added.
- Validation: all eight test files pass. The new runner passes all five rendered checks and all 28 catalogue image-response checks against the local build; unavailable-target failure reporting also passes. Evidence is retained in the [Phase 7 validation report](frontend/docs/seo-phase7-validation.json).
- Domain connection, Search Console, real profile URLs and a measured launch baseline remain Phase 6/owner dependencies. Phase 7 remains ongoing; this preparation does not establish rankings, recurring live reviews or business-profile eligibility.

## Phase 8 — International SEO, when translation is ready

**Dependency:** client-selected languages, reviewed translations and a separate approved language-routing implementation. Do not create empty locale pages during the English phases.

- [x] Retain the current English URLs and use dedicated language prefixes for translated versions. Serve each language at a stable URL rather than swapping the same URL's text by browser preference.
- [ ] Translate titles, descriptions, main content, navigation, image descriptions and relevant schema fields alongside the visible UI.
- [ ] Give every translated page a self-canonical and reciprocal `hreflang` entries for its real translated equivalents. Use English as `x-default` for this URL strategy; omit nonexistent translations.
- [ ] Add the translated URL sets to the sitemap and language switcher. Keep unknown/missing translations honest; do not silently serve English under an untranslated indexable locale URL.
- [x] Set the correct HTML language. Use normal links for switching languages and avoid forcing crawler/user redirects based solely on location or browser language.
- [ ] Validate metadata, reciprocal alternates, rendering, links, redirects and forms for every supported language.

**Complete when:** each published translation is reviewed, indexable at its own URL, correctly linked to its equivalents and included in search monitoring. [Google localized-page guidance](https://developers.google.com/search/docs/specialty/international/localized-versions)

### Phase 8 draft implementation — 11 October 2026

- Client selected French, Spanish, German and Chinese and requested drafts for review. Implemented 60 public pages per language, preserving English URLs and the feature UI; Simplified Chinese is the working variant pending confirmation.
- Added translated content, titles/descriptions, image descriptions, relevant schema text, real language links and scoped dictionaries. Reviews, prices, company facts and form payload contracts remain intact. Private/API/auth routes are excluded.
- All 240 translated pages are noindex drafts with self-canonicals. Approval lists are empty; draft URLs are excluded from the sitemap and hreflang. Reviewed route promotion enables reciprocal English/language/x-default alternates and eligible translated sitemap entries. Publication checkboxes remain pending native-language/client review.
- Prepared the [2,166-string client review CSV](frontend/docs/translation-review.csv) and [review/publication workflow](frontend/docs/seo-phase8-translations.md). Machine-assisted drafts need native-language review, particularly terminology and grammar around inline links.
- Validation: all nine test files, the separate TypeScript check and the production build pass. Rendered checks cover 240 draft pages, localized schema, canonical/noindex rules, 58 English sitemap URLs and six invalid routes. Browser checks cover 28 responsive layouts, four deep-link language-switch flows, gallery keyboard controls and eight mocked enquiry failure/retry flows without real submissions or runtime exceptions. English regression checks pass all five SEO verifier groups. Evidence: [rendered checks](frontend/docs/seo-phase8-validation.json) and [browser checks](frontend/docs/seo-phase8-browser.json).
- Domain connection, Search Console and live measurement remain Phase 6 dependencies. No translated page has been approved, deployed or submitted for indexing.

### Phase 8 architecture migration — 11 October 2026

- Replaced the custom sentence-key dictionaries and translated catch-all with next-intl 4.14.9, explicit `app/[locale]` routes, stable UI messages and feature-owned editorial overlays, following the structure of `pre-rich-hub/ethioafro2`.
- Preserved English public URLs, `/zh-Hans`, the current design, catalogue facts, reviews, numerical prices and backend submission values. Added locale-aware dates/plural counts and script-appropriate Chinese font fallbacks. Retained article inline links and completed four draft sets for the 38 updated gallery images.
- The [review sheet](frontend/docs/translation-review.csv) now has 2,946 stable-key rows. The [review guide](frontend/docs/seo-phase8-translations.md) explains the new ownership and editing workflow; sentence keys and scope regeneration no longer apply.
- Existing indexing, self-canonical, safe JSON-LD and preview safeguards remain. All translated routes are still unapproved/noindex and absent from sitemap/hreflang. Native-language review and the external launch dependencies remain pending.
- Validation: build, separate TypeScript check, all nine test files, all 300 public pages and all five English SEO verifier groups pass. Browser checks cover 28 layouts, four language-switch flows, translated gallery filters/keyboard controls and eight mocked enquiry lifecycles with unchanged backend option values. Unknown records return HTTP 404 before streaming; public static generation is preserved. Updated evidence is in the Phase 8 rendered/browser reports. No migration deployment was performed.

## Verification and rollout for each phase

From `frontend/`, run the appropriate checks after implementation:

```bash
npm run typecheck
node --test tests/architecture.test.cjs tests/feature-contracts.test.cjs
npm run build
```

Add focused checks for SEO behavior as it is introduced: metadata output, sitemap inclusion/exclusion, redirect/status behavior, JSON-LD escaping and image-loader URLs. Check rendered production HTML, not only source objects. For content-only edits, use proportionate verification rather than redundant tests.

Keep generated `next-env.d.ts` changes separate from intentional work. Do not rely on the production build alone for type safety while `ignoreBuildErrors` remains enabled. Record that setting as a separate engineering hardening task rather than silently claiming it validates types.

For every completed phase, record:

1. Implemented tasks and any unresolved dependencies.
2. Tests, URL samples and relevant report/artifact locations.
3. Commit and deployment identifier, when applicable.
4. Production recheck and monitoring observations.

## Reference documentation

Recheck current guidance when implementing each phase; search features and framework APIs change.

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Next.js metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Google article markup](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Google breadcrumb markup](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [Cloudinary image transformations](https://cloudinary.com/documentation/image_transformations)

**Continue next:** Review the Phase 8 translation drafts with the client, confirm the Chinese variant and publish only approved routes. Complete Phase 6 using the launch checklist and begin Phase 7’s prepared review cycle. Phase 4's authenticated Google Rich Results Test, hosting redirects, real profile URLs and operator-owned policy/operating confirmations remain external dependencies.

### Main-branch integration — October 11, 2026

Merged main’s icon updates, WebP logos, redesigned Specialist & Partners dropdown, photo-credit removal and confirmed Tesema (Tevan) name into the next-intl architecture. The dropdown’s new copy has draft translations in all four languages. Public coverage is now 59 English pages and 236 translated drafts; the sitemap still contains 58 English URLs. Production build, TypeScript, nine test files and rendered language/SEO verification passed.
