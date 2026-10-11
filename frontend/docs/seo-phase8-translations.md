# Phase 8 language drafts and review

English retains its existing URLs. French (`/fr`), Spanish (`/es`), German (`/de`) and Simplified Chinese (`/zh-Hans`) reuse the same feature components and design. Each language has 60 public pages: the existing 58 indexable English pages plus the planning and photo-credit utilities. Private, API and login routes have no translated equivalents. Language links retain the current public path and, after hydration, its query string and fragment. There are no language redirects based on IP or browser settings.

All four sets are **drafts**. Each has its own canonical URL, translated metadata and HTML language, but is noindex and excluded from sitemaps and hreflang. The switcher provides review access. English indexing rules remain unchanged. `approvedTranslations` in `lib/i18n/locales.ts` is empty; do not populate it before review. Planning/photo-credit utilities remain noindex even after language approval.

## Client review

Open [translation-review.csv](translation-review.csv), which contains 2,166 English source strings and four draft columns. These are machine-assisted initial translations generated once through the Google Translate web service, with selected manual terminology/action corrections. No translation provider is contacted by the running site. The drafts have not been approved by a native-language reviewer.

Review complete pages in the running site as well as the spreadsheet. Check tone, destination names, tourism terminology, navigation, accessible image descriptions, title/description snippets, form errors and success messages, legal meaning and paragraph flow. Some articles contain inline links, so adjacent translated fragments need particular attention for grammar. Verify that Simplified Chinese is the client's intended Chinese variant; Traditional Chinese is not included.

Record corrections and reviewer notes in the spreadsheet, then apply approved text to `lib/i18n/drafts/{locale}.json`. Keys are normalized English text; values are the translations. Preserve the keys. Reviews, business identity and numeric prices intentionally remain unchanged. Source company facts, catalogue records and prices were not rewritten. Dynamic visitor messages and API-supplied messages are not translated by dictionary matching; the assistant is instructed to respond in the customer's language while retaining the same business grounding. That backend prompt change requires a backend deployment separately.

Approve only fully reviewed routes, including their metadata, shared navigation, forms, image descriptions and schema text. Add each approved English route path to that language's `approvedTranslations` list. The code then enables indexing for eligible routes, reciprocal English/language/x-default alternates and translated sitemap entries. Run the approval unit tests and rendered SEO checks after promotion; the draft-only rendered verifier intentionally expects zero approvals and must be adapted when publication begins. Domain connection and Search Console remain Phase 6 prerequisites for live monitoring.

## Keeping translations current

The exact English text is the translation key. New or edited English copy falls back to English until a matching reviewed entry exists; this is acceptable for review drafts, and must be resolved before publishing a translation. Add new keys to `source.en.json`, all four dictionaries and the review sheet. Keep unused keys out when retired. Rebuild route scopes after changing copy or catalogue content. The server uses the full dictionary for metadata; each page sends shared UI text and the appropriate route scope to the browser.

From `frontend/`, against a local production build:

```sh
npm run build
npm run start -- --port 3101
# In a second terminal:
npm run seo:check -- --inventory-only
SEO_BASE_URL=http://127.0.0.1:3101 node scripts/i18n-scopes.cjs
npm run typecheck
node --test tests/*.test.cjs
# Rebuild/restart after regenerating scopes.
node tests/verify-i18n.cjs
npm run seo:check -- --base-url=http://127.0.0.1:3101
node tests/verify-i18n-browser.cjs
```

The browser verifier mocks every contact API request; it must never send a real enquiry. Local/draft pages send no analytics. Backend dependencies are absent in this workspace, so the backend's full test suite was not run; the changed language instruction and unchanged factual grounding are checked by the frontend's focused test loader. No live AI-provider request was made.

See [Next.js internationalization](https://nextjs.org/docs/app/guides/internationalization) and [Google localized-page guidance](https://developers.google.com/search/docs/specialty/international/localized-versions). Publishing is pending review; draft implementation does not establish international rankings or complete the live launch prerequisites.

## Validation — 11 October 2026

- Production build and separate TypeScript check pass; all nine test files pass.
- [Rendered verification](seo-phase8-validation.json): 240 language pages return 200 with correct language, translated titles, self-canonicals, noindex metadata/headers, localized schema and language-preserving main-content links. The 2,166-key dictionaries are complete, no matched long source paragraphs remain untranslated, draft hreflang/sitemap entries are absent, and six invalid/private language routes return 404. This checks matching source copy and technical behavior, not native-language quality or every possible future API response.
- [Browser verification](seo-phase8-browser.json): 28 representative layouts across 390/1024/1440px without horizontal overflow; gallery keyboard controls; four real language-switch navigation flows preserving planning query/fragment; eight journey/partner enquiry flows with duplicate prevention, failure, retry and translated success. All requests were mocked and no runtime exceptions or draft analytics requests occurred.
- All five English rendered SEO verifier groups pass, covering 60 public pages and 58 sitemap URLs. No deployment or Search Console submission was performed.
