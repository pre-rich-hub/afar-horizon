# GEO implementation for Afar Horizon

Updated: 11 October 2026. Initial content improvements implemented locally; visibility measurement and client review remain ongoing.

GEO means making Afar Horizon's content useful as a source for AI-assisted travel research. Google AI Overviews and AI Mode use ordinary search eligibility and helpful content; there is no required AI-specific file or special schema. Inclusion is not guaranteed. [Google guidance](https://developers.google.com/search/docs/appearance/ai-features)

## Phase 1 — Establish access and clear answers

- [x] Verify the English production homepage is indexable. On 11 October, the live response returned `index, follow` with no blocking X-Robots-Tag. Robots allows public crawling and advertises the sitemap; the sitemap contains 58 English URLs. This verifies eligibility, not actual Google indexing.
- [x] Put concise practical answers at the start of the existing season, packing, Erta Ale and Semera guides. Preserve their URLs, visible design, dates, authors and destination links.
- [x] Add FAQ answers about Semera departures, choosing three- versus four-day Danakil packages, and the catalogue's preferred November–January planning window.
- [x] Align the Erta Ale walking FAQ with the route-dependent approach already described in the destination, package and preparation pages.
- [x] Update all four language drafts and the client review sheet. Keep translated routes noindex until approved.
- [x] Retain existing business, destination, article and FAQ schema. The FAQ schema reads the same localized records displayed to visitors.
- [ ] Verify Google indexing using Search Console and submit the sitemap, if not already done by the owner.

The new planning copy is grounded in the existing client catalogue. It adds no new access guarantee, operating commitment, reviewer credential or volcanic observation. Reviews, company facts, package prices and the seven-Afar/two-wider-Ethiopia article balance remain unchanged.

## Phase 2 — Add client-confirmed expertise and references

Ask the client for recent, dated route observations; camp facilities; approach and walking details; and answers to repeated traveller questions. Use these to improve the existing guides, without presenting an old observation as current or promising a particular volcanic display. Add a named reviewer only after that person has actually reviewed the content.

Audit scientific and historical statements against primary sources. The Erta Ale guide already links to the Smithsonian Global Volcanism Program. Keep source links near the relevant article and record when changeable claims were checked. Do not extend the currently published facts without evidence.

## Phase 3 — Confirm identity and external citations

Confirm the client's real social, review and business-profile URLs. Check that public names, contact details and URLs agree with the site's existing business schema. Do not invent profiles, reviews or business facts. Creating accounts or contacting others is a separate owner action.

## Phase 4 — Measure visibility and useful visits

Use the question set in `frontend/docs/geo-visibility.csv` for small, repeatable manual samples. Record the engine, date, location/account context, exact question, returned citation URLs and whether the cited information is accurate. Leave fields empty until a real check is performed. Responses vary; a sample is not a ranking or a guarantee.

Review Search Console Web performance, public page views and genuine enquiries alongside those samples. Google AI-feature traffic is included in aggregate Web search data; do not label that aggregate as AI-only traffic. [Measurement guidance](https://developers.google.com/search/docs/appearance/ai-features#measuring)

## Agentic Browsing

Agentic Browsing tests machine interaction rather than citation visibility. The language dropdown accessibility fix is a separate committed change (`6b5c11a`). Validate that change in a new deployed PageSpeed report. GEO content edits do not establish an Agentic Browsing score or require WebMCP integration.

## Validation

Validate editorial link integrity, translated inline links, schema/content consistency, protected catalogue fields, TypeScript and the production build. Check the rendered FAQ and four updated guides in all five locales. Native-language/client approval, Search Console verification and external citation measurement remain pending.

Validation completed locally: production build, TypeScript, editorial/translation/schema/SEO tests and all 25 rendered guide/FAQ pages passed. Evidence: [rendered report](frontend/docs/geo-validation.json). These changes have not been deployed or measured for AI citations.
