# Language architecture and client review

English keeps its existing public URLs. French (`/fr`), Spanish (`/es`), German (`/de`) and Simplified Chinese (`/zh-Hans`) share explicit routes in `app/[locale]/`. Each language has 60 public pages: the 58 indexable English pages plus planning and photo credits. Admin and login stay outside the locale tree. Browser language and IP do not trigger language changes. Redundant `/en/...` URLs redirect to the English URL without a prefix.

The architecture follows the next-intl pattern in `pre-rich-hub/ethioafro2`, while preserving Afar Horizon's SEO publication safeguards. It does not copy that project's client data, page design, locale codes or indexing policy.

## Where text belongs

- `i18n/routing.ts`, `request.ts` and `navigation.ts` configure next-intl. Automatic alternate links are disabled because unapproved translations must not advertise themselves to search engines.
- `messages/{en,fr,es,de,zh-Hans}.json` contains stable UI keys, page metadata and schema breadcrumb labels. Components use `useTranslations`; async route metadata uses `getTranslations`.
- `features/<feature>/data/overlays/{locale}.json` owns translated editorial fields. `data/localized.ts` exposes that feature's copy getters/hooks through its public exports. Catalogue records use their existing slug; gallery photos use the uploaded filename. Small nested lists use position keys.
- `lib/i18n/feature-copy.ts` merges these overlays without depending on features. Missing fields retain the English source for draft review. It also protects routing fields, prices, dates, category/filter identifiers and backend values from accidental overlay edits.
- Shared navigation labels and form style labels use `lib/i18n/overlays/`. Enum labels and plural night counts use stable `Catalogue` messages; selected form values remain English. Confirmed publication/update dates use locale-aware formatting without changing their ISO dates.
- `SiteLink` retains public language URLs; the native language links retain path, query and fragment. JSON-LD is serialized safely on the server with localized route URLs and a shared company identity.

English feature data remains the source of truth. No runtime translation service is used. Reviews, numerical prices, company facts and images have not been rewritten. Chinese uses script-appropriate system font fallbacks; Simplified Chinese still needs client confirmation.

## Review and publication

All 240 translated pages remain **client-review drafts**, with correct HTML language, translated metadata, self-canonicals and noindex. They are absent from the sitemap and hreflang. `approvedTranslations` in `lib/i18n/locales.ts` remains empty. Planning and photo credits remain noindex even after approval.

[translation-review.csv](translation-review.csv) contains 2,946 stable-key review rows, with owner, key, English source, all four drafts, status, reviewer and notes. Drafts reuse the earlier translations and include machine-assisted additions for the updated gallery and interface text. Article paragraphs were prepared with protected link placeholders so the links remain intact. Native-language quality and legal meaning are not established by automated checks.

Review complete pages alongside the spreadsheet: tone, names, tourism terminology, accessibility labels, metadata, form states, legal meaning and grammar around links. Apply a UI correction to its key in `messages/<locale>.json`; apply feature content corrections to the owning overlay JSON. Preserve identifiers, ICU placeholders and HTML-free link data. For linked article paragraphs, their `links[].text` must occur in the paragraph's text.

Approve a route only after its content, metadata, shared navigation, forms, image descriptions and schema are reviewed. Add its original English path to that language's `approvedTranslations`. The existing SEO helpers then enable eligible indexing, reciprocal English/language/x-default alternates and translated sitemap entries. Adapt the draft-only rendered verifier when approvals begin. Domain connection and Search Console remain separate launch dependencies.

## Keeping translations current

Edit English UI values without renaming their keys, and update the corresponding locale values. Add new keys to every messages file. English feature content can change independently of an overlay key; update the translated record fields and review sheet when its meaning changes. Add catalogue records under their new slugs. If a nested positional list is reordered, update its overlay positions too. Never publish an English fallback as an approved translation.

No route scope regeneration is required. UI messages are loaded by language; feature overlays are imported by their owning feature rather than through one site-wide catalogue registry.

## Verification

From `frontend/`:

```sh
npm run typecheck
node --test tests/*.test.cjs
npm run build
npm run start -- --port 3101
# In another terminal:
SEO_BASE_URL=http://127.0.0.1:3101 node tests/verify-i18n.cjs
npm run seo:check -- --base-url=http://127.0.0.1:3101
node tests/verify-i18n-browser.cjs
```

The unit checks cover matching UI keys, valid ICU messages, protected feature fields, gallery draft coverage and article link retention. The rendered check covers all 300 public pages, draft canonical/indexing rules, schema URLs, inline links, sitemap exclusion and invalid routes. The browser verifier mocks contact requests; it must never send real enquiries. Local/draft pages send no analytics. Dynamic customer messages and API responses are not translated by sentence matching; the existing assistant prompt asks the backend to reply in the customer's language.

See [next-intl routing](https://next-intl.dev/docs/routing/setup), [next-intl messages](https://next-intl.dev/docs/usage/translations), and [Google localized-page guidance](https://developers.google.com/search/docs/specialty/international/localized-versions).

## Migration verification — 11 October 2026

The production build, separate TypeScript check and all nine test files passed. [Rendered verification](seo-phase8-validation.json) covers 60 English and 240 draft pages, language metadata, canonical/noindex rules, localized schema, inline links, 58 English sitemap entries, five invalid language routes and the English-prefix redirect. All five English SEO verifier groups passed.

[Browser verification](seo-phase8-browser.json) passed 28 layouts at 390/1024/1440px, four real language-switch flows with query/fragment preservation, translated gallery filtering and keyboard controls, and eight mocked enquiry failure/retry flows. Selected journey/service options retained their original backend values; no real enquiries, browser runtime exceptions or draft analytics requests occurred. Invalid URLs use the static English error page with the existing presentation and receive HTTP 404 before streaming. Two browser checks confirm its rendered heading and status; the final server log contains no fallback errors.

Changes have not been committed, pushed or deployed as part of this migration. Native-language approval and launch account/domain work remain pending.
