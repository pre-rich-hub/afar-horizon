# Phase 7: search maintenance and content work

Prepared 11 October 2026. Workflow and tooling are ready; recurring live measurement has not begun. Complete [Phase 6](seo-phase6-launch.md) before treating any production check or search baseline as established. The custom domain still serves a parking page, Search Console is not configured, and custom conversion events are disabled on Vercel Hobby.

## Responsibilities and schedule

| Responsibility | Working owner | Schedule |
| --- | --- | --- |
| Technical checks, release validation and maintenance log | Frontend maintainer (your role) | Every deployment; weekly for the first four weeks after launch, then monthly if stable |
| Search Console and Vercel report review | Frontend maintainer with owner-granted access | Weekly after launch; compare complete 28-day periods monthly |
| Route access, camps, equipment, operating details and article approval | Client/operator | Before publishing relevant changes and before promoting departures |
| Search Console ownership, Google Business Profile and external listings | Client/business owner | Launch setup; monthly details check and whenever details change |

Replace the role labels with the responsible people's names in the first launch log. No individual names or account access have been assumed. Any failed form flow, broken public route or unintended noindex should be investigated immediately rather than waiting for the monthly review.

## Repeatable technical checks

From `frontend`:

```sh
# Inventory only: reads catalogues and records counts; performs no website checks.
npm run seo:check -- --inventory-only

# Against a built local server started separately on port 3101:
npm run seo:check -- --base-url=http://127.0.0.1:3101

# Once the custom domain serves this website:
npm run seo:check -- --base-url=https://www.afarhorizon.com --check-image-responses

# Against a preview deployment (must be publicly accessible to the checker):
npm run seo:check -- --base-url=https://YOUR-PREVIEW.vercel.app --preview
```

The runner executes existing metadata, crawl, content, schema and responsive-image verifiers, retains each result and returns a failing exit status if any check fails. Checks use the **current local catalogue**: run them from the commit deployed at the target, or expect intentional catalogue changes to cause differences. Preview mode expects noindex and an empty sitemap.

Reports go to ignored `docs/seo-reports/latest.json`; use `--output=docs/seo-reports/2026-10-11.json` for dated records. Keep the file with the corresponding log entry. A reviewed release report can be copied to a deliberately tracked evidence file. The [initial catalogue inventory](seo-phase7-inventory.json) records 19 destinations, 17 expeditions and nine articles, seven of which are Afar-focused (78%). There are 58 expected production sitemap URLs and 60 public pages including the two noindex utility pages.

The optional image-response check fetches a small rendition of each unique catalogue photo and checks response status, image content type and a nonempty body. It does not inspect the photo's subject, rights, every section image or every responsive size. Confirm subjects and rights with the operator and spot-check visible images on desktop/mobile after changes.

These commands do not access private dashboards, modify DNS, create accounts or submit forms. For release checks, also run TypeScript and the existing test suite. Rerun the mocked form verifier (`node tests/verify-enquiries.cjs`, local port 3101) after form changes. Coordinate any real deployed form test with the operator; review backend error logs and accepted contact records through authorized access. An HTML crawl alone does not establish API health.

## Search and enquiry review

Use [the CSV log](seo-maintenance-log.csv) as the recurring dashboard. Its initial preparation row leaves unmeasured values blank. Fill real dates, deployment ID, responsible names and report locations at launch.

1. Check sitemap processing, representative canonicals and newly excluded pages in Search Console. Compare against the generated inventory; do not assume all 58 URLs must already be indexed.
2. Export Search Console's Web performance data for the latest complete 28-day period and the preceding 28 days, keeping country/device filters consistent. Record clicks, impressions and CTR, plus top relevant query/page changes. Separate brand searches from Afar/Danakil planning and expedition searches. Export page and query tables separately; do not treat them as a complete joined attribution dataset. [Google performance-report guidance](https://support.google.com/webmasters/answer/7576553?hl=en).
3. Review public page views in Vercel and field Core Web Vitals when enough data exists. Use Phase 5's lab report for engineering comparisons; blank field data does not mean passing vitals.
4. Record aggregate accepted enquiries from the operator's backend records for the same period. Keep personal details out of this repo/log. Custom conversion counts remain unavailable on the current setup; do not call all backend enquiries “organic conversions” without attribution evidence.
5. Choose one improvement based on evidence, record its hypothesis and affected URLs, validate the release, then compare a meaningful subsequent period. Record seasonal changes, route availability and campaigns alongside the numbers.

For a page with many relevant impressions and few clicks, first inspect its queries, intent, country/device mix and result appearance. Adjust the title/description only if they misrepresent the page. For a page receiving clicks but few enquiries, check its traveller fit, links to appropriate packages and form behavior. Keep successful content stable; avoid changing every title after a small sample.

## Prioritized work backlog

These are editorial/engineering priorities from the existing content, not measured keyword demand. Keep existing URLs and the seven-Afar/two-wider-Ethiopia balance. Company facts, reviews and prices remain intentional and unchanged.

| Priority | Existing target | Concrete next work | Dependency / evidence |
| --- | --- | --- | --- |
| P0 | Whole site | Finish domain connection, Search Console, sitemap submission and live redirect checks | Owner/account setup from Phase 6 |
| P0 | Enquiry paths and catalogue | Confirm deployed API connectivity, inspect form errors and reconcile static/live package slugs | Authorized backend/deployment access; do not publish private enquiry data |
| P1 | `/blog/semera-danakil-expedition-planning` | Add the operator's confirmed arrival briefing, meeting arrangements and route handoff details | Client answers; avoid publishing unverified flight schedules |
| P1 | `/blog/packing-for-the-highlands`, `/before-you-go` | Clarify supplied versus traveller-carried camp/equipment items for current routes | Client's actual packing/gear list; retain generic guidance until confirmed |
| P1 | `/blog/erta-ale-what-to-expect`, `/destinations/erta-ale` | Review approach conditions, camp arrangements and current observation limitations | Operator review and current primary volcanology/access sources; no lava guarantees |
| P1 | `/blog/when-to-visit-ethiopia` | Review timing guidance and explain how route pace/rest arrangements vary by season | Operator's current practice; use search queries once available |
| P1 | `/blog/lake-assale-and-lake-afdera`, `/blog/responsible-travel-in-afar` | Enrich with approved local explanations and first-hand photographs/captions | Client expertise and permission; no staged-work or community-access promises |
| P1 | Homepage LCP / enquiry LCP | Revisit Phase 5's slower representative lab results if deployed results confirm a problem | Comparable reruns and field data; preserve current design |
| P2 | `/blog/dallol-geothermal-landscape` | Clarify visitor questions about the landscape using approved observations and sources | Client/expert review; avoid invented scientific or safety claims |
| P2 | `/blog/planning-northern-ethiopia-route`, `/blog/lalibela-at-dawn` | Keep the two supporting northern guides current and linked to genuine extensions | Current access/operating confirmation; retain the Afar-led emphasis |
| P2 | Packages and their related guides | Improve comparisons where real enquiries show uncertainty about duration or traveller fit | Recurring client questions and eventual landing-page evidence; preserve prices |

Possible **later** additions: an operator-confirmed expedition camp/meal guide, an Awash/Hadar extension guide, or a geology-focused route explainer. First check that the material adds something distinct to existing guides. Collect the client's answers before drafting, require a real reviewer and publication date, and add suitable destination/package links and a relevant photo. These are candidates, not articles published in this phase.

### Catalogue reconciliation

The frontend's static catalogue determines routes, itinerary content and static generation. The current live overlay changes matching package prices only; it does not create new routes. Compare the deployed frontend inventory with the authorized backend catalogue's canonical slugs, publication state and intended public content. Record missing/extra slugs, ask the operator which catalogue is authoritative, then update and rebuild deliberately. Do not silently copy backend records into public content or alter prices as a maintenance check.

## Local presence

Ask the owner whether an existing Google Business Profile exists before creating one. Confirm actual in-person customer contact, business name, operating location/service area, telephone, hours and website. Use the actual premises and Google's current eligibility rules; this repo does not establish eligibility. The owner should manage verification and grant access if needed. [Eligibility rules](https://support.google.com/business/answer/13763036?hl=en), [business representation](https://support.google.com/business/answer/3038177?hl=en).

Keep confirmed website/profile contact details consistent. Gather the real Google Maps, review-platform and social URLs, then replace the existing placeholders when supplied. Record genuine partner or travel-directory opportunities that the operator can substantiate; check fees and terms before any signup. No listings, profiles, paid placements, outreach or review changes were made in this phase.

## Validation record

The new maintenance command passes all five rendered check groups against the existing local production build: metadata/content/schema/image markup across 60 public pages and crawl policy across 58 sitemap URLs. All 28 unique catalogue photo renditions return successful nonempty image responses at width 64. The [validation report](seo-phase7-validation.json) retains the results. An unavailable target produces five failed results, saves its report and returns exit status 1; inventory-only mode does not claim website checks passed. All eight existing test files pass. This phase changes tooling/documentation rather than application rendering, so the existing production build was reused.

## Change record and completion

The first CSV row records workflow preparation rather than a live baseline. Add one row per review/release, including a dated technical report and next action. Record a commit/deployment ID only when it exists. Store account exports and enquiry aggregates securely; do not commit raw personal data.

Phase 7's tooling and initial backlog are prepared. It remains **ongoing**; named people, access, the first measured launch baseline and completed recurring reviews are still pending. Translation stays a separate Phase 8 task with client-selected languages and reviewed content.
