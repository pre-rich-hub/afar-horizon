# Phase 4 structured data validation

Checked 11 October 2026 against a production build using `https://afarhorizon.com`
as the canonical origin. Changes are included in the SEO Phases 4–5 commit and have not been deployed.

## Coverage and content boundaries

- All 60 public URLs emit one `TravelAgency` and one `WebSite`, linked through
  stable `#organization` and `#website` IDs. Contact details and logo use the
  existing company constants and local logo; company facts remain unchanged.
- 19 destinations emit `TouristDestination`; 17 packages emit `TouristTrip`;
  nine articles emit `BlogPosting`. These 45 detail pages include `BreadcrumbList`.
  Article breadcrumbs now show the same hierarchy to visitors.
- Trips describe the visible planned day-by-day content, with catalogue places
  represented as an unordered list. They make no dated departure or availability claims.
- The owner confirmed existing publication dates. Article/card labels derive from
  those ISO dates; `dateModified` retains the actual 11 October content update.
  Date-only values avoid inventing publication times. Existing author names remain;
  organization-authored posts reference the shared business. No author URLs or bios
  were invented.
- FAQ questions and answers match the visible feature data. Existing review content
  and displayed prices remain untouched; no offers, ratings, reviews or unconfirmed
  social-profile links are emitted as structured data.

## Local verification

| Check | Result |
| --- | --- |
| `npm run typecheck` | Passed |
| `node --test tests/*.test.cjs` | All six test files passed |
| `npm run build` | Passed; 79 generated pages |
| `node tests/verify-schema.cjs --base-url=http://127.0.0.1:3101` | All 60 public pages passed |
| `node tests/verify-content.cjs --base-url=http://127.0.0.1:3101` | All 60 public pages passed |
| `node tests/verify-seo-build.cjs --base-url=http://127.0.0.1:3101` | All 60 public pages passed |

The schema verifier parses the actual HTML scripts, checks catalogue/FAQ parity,
stable business references and breadcrumb positions, and verifies visible ISO date
labels. Unit tests also cover malicious closing-script text, absent optional dates
and invalid calendar dates.

## External validation

Submitted generated JSON-LD samples, each including the root business/website graph,
to the [Schema.org validator](https://validator.schema.org/) using its HTML input.

| Sample | Errors | Warnings |
| --- | --- | --- |
| BlogPosting and article breadcrumbs | 0 | 0 |
| TouristDestination and destination breadcrumbs | 0 | 0 |
| TouristTrip and expedition breadcrumbs | 0 | 0 |
| FAQPage | 0 | 0 |

These are vocabulary checks, not evidence of a deployed page or rich-result eligibility.
The [Google Rich Results Test](https://search.google.com/test/rich-results) was
attempted in code mode with the article/business/breadcrumb sample. Google returned
“Something went wrong — Log in and try again”; no result was produced. An
authenticated manual Google check remains pending, followed by deployed-URL checks.
Do not treat that attempt as a pass or a failure of the markup.

Article and breadcrumb implementation follows Google's
[article](https://developers.google.com/search/docs/appearance/structured-data/article)
and [breadcrumb](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
documentation. Tourist entities provide semantic descriptions without a Google
travel rich-result claim. FAQ content remains useful, but its discontinued Google
Search feature is not a completion target; see the
[May 2026 documentation update](https://developers.google.com/search/updates#may-2026).

## Remaining checks

1. Run the authenticated Google Rich Results Test on an article and inspect its
   article, breadcrumb and business results; address any actionable required-field errors.
2. After deployment, repeat URL-based checks and confirm Google can fetch the logo
   and Cloudinary images. Live crawl/indexing checks remain Phase 6 work.
3. Add actual social-profile/author URLs only when confirmed. Keep future article
   publication and modification dates accurate rather than refreshing them on every build.
