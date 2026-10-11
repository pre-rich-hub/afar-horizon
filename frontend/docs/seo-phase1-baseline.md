# Phase 1 SEO baseline

Captured on 10 October 2026 from commit `52e8dc1`, before the SEO changes.

## Scope and limits

- 58 public URLs: 13 static route definitions, 19 destinations, 17 packages and 9 articles. The enquiry page is dynamically rendered.
- 43 routes had canonical metadata; 15 had none. Existing canonical values were relative and lacked a shared production metadata base.
- Six representative pages audited at mobile and desktop sizes using Lighthouse 12.8.2 against a local production server. Images were fetched from Cloudinary.
- These are single lab runs, affected by this machine, remote image loading and simulated throttling. Several runs reported a slower-than-expected CPU. They are not production field Core Web Vitals or proof of rankings.
- No Search Console account data was supplied. Actual index coverage and search performance remain a Phase 6 dependency.
- Lighthouse SEO scores do not establish complete canonical coverage or actual search indexing. Use the dedicated metadata checks for those requirements.

## Performance reports

| Page / viewport | Performance | Accessibility | Best practices | Lighthouse SEO | LCP (s) | CLS | Transfer (MB) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| article-desktop | 64 | 84 | 96 | 100 | 18.58 | 0.000 | 27.2 |
| article-mobile | 43 | 92 | 96 | 100 | 20.66 | 0.000 | 27.1 |
| destination-desktop | 59 | 85 | 96 | 92 | 15.15 | 0.000 | 27.1 |
| destination-mobile | 46 | 93 | 96 | 92 | 19.45 | 0.000 | 21.4 |
| enquiry-desktop | 72 | 84 | 96 | 92 | 4.01 | 0.000 | 24.2 |
| enquiry-mobile | 46 | 92 | 96 | 92 | 18.27 | 0.000 | 24.1 |
| gallery-desktop | 65 | 84 | 96 | 100 | 21.66 | 0.000 | 47.4 |
| gallery-mobile | 45 | 92 | 96 | 100 | 21.44 | 0.000 | 36.3 |
| home-desktop | 67 | 81 | 96 | 100 | 0.85 | 0.000 | 47.5 |
| home-mobile | 47 | 96 | 96 | 100 | 4.25 | 0.001 | 38.6 |
| package-desktop | 65 | 85 | 96 | 92 | 19.51 | 0.000 | 24.0 |
| package-mobile | 46 | 93 | 96 | 92 | 17.32 | 0.000 | 23.9 |

The JSON summary contains report timestamps, warnings, TBT and the full public-route metadata inventory. Raw reports are stored locally at `/tmp/afar-seo-phase1-baseline`; they are not committed.

## Missing canonical tags before implementation

- `/about`
- `/blog/dallol-geothermal-landscape`
- `/blog/erta-ale-what-to-expect`
- `/blog/lake-assale-and-lake-afdera`
- `/blog/lalibela-at-dawn`
- `/blog/packing-for-the-highlands`
- `/blog/planning-northern-ethiopia-route`
- `/blog/responsible-travel-in-afar`
- `/blog/semera-danakil-expedition-planning`
- `/blog/when-to-visit-ethiopia`
- `/blog`
- `/contact`
- `/expeditions`
- `/gallery`
- `/`

## Priorities for later phases

1. Phase 2: generated sitemap, robots response, index policy and status/redirect checks.
2. Phase 3: clear headings and contextual links, including About's missing primary heading.
3. Phase 5: responsive Cloudinary delivery and initial-slide-only loading; measured transfers are unusually large for these page templates.
4. Phase 6: live hosting environment configuration and real search/conversion measurements.
