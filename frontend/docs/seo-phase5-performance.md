# Phase 5 image delivery and performance

Implemented and measured 11 October 2026. All twelve Lighthouse comparisons completed.
Changes are included in the SEO Phases 4–5 commit and have not been deployed.

## Changes

The Phase 1 baseline transferred 21–47 MB per representative page. Original PNGs,
hidden navigation photos and stacked slideshow images dominated delivery. Photos
now use one Cloudinary optimization pipeline with responsive Next Image candidates:
`f_auto,q_auto,c_limit,w_<width>`. CSS retains the existing crop and layout; the
original upload version/public ID is preserved. Catalogue, metadata, schema and
attribution URLs still use original uploads. Local logo assets remain in place.

Only the first hero photo is rendered initially. The next frame is prepared shortly
before its transition and the timer waits until it has loaded. Gallery autoplay runs
only in view and waits for the next image; manual gallery/destination changes retain
the outgoing photo while loading. Reduced-motion visitors receive a static hero and
paused gallery. Existing controls and cross-fades remain available.

Navigation thumbnails now use responsive images, dropdowns support keyboard focus,
the initial hero gets high fetch priority, and the root layout preconnects to the
photo origin. Intrinsic logo dimensions reserve their existing aspect ratio.

## Verification

- Production build passed: 79 generated pages. Type checks and all seven test files passed.
- Image verifier passed for 966 photo instances across all 60 public pages: responsive
  candidates, `sizes`, geometry, lazy loading, a single initial hero and unchanged local
  logo paths. Content, metadata and structured-data verifiers also pass all 60 pages.
- 56 live transformation requests passed: all 28 distinct original uploads at widths
  96 and 640 returned HTTP 200 and image content. Thumbnail responses ranged from
  1.3–6.8 KB, card responses from 46–164 KB. Responses include JPEG and WebP, according
  to Cloudinary's automatic delivery choice. See [response evidence](seo-phase5-images.json).
- Browser checks passed at 390px and 1440px on the homepage, gallery, destination,
  package, article and enquiry templates. They cover visible images, horizontal overflow,
  slideshow controls, lightbox arrows/Escape/focus restoration, keyboard dropdowns,
  mobile menu, enquiry fields and reduced-motion behavior. See
  [browser evidence](seo-phase5-browser.json). Form controls were checked without sending
  an enquiry to the business. Visual screenshots are local `/tmp/afar-phase5-*.png`.

## Lighthouse comparisons

Measured with Lighthouse 12.8.2 using the same six routes and mobile/desktop
form factors as the Phase 1 baseline. Transfers now range from 0.71 to 2.53 MB,
compared with 21.4 to 47.5 MB: reductions of 93.9–97.0%. All twelve performance
scores improve; measured CLS is zero in every final run.

| Page / viewport | Performance before → after | LCP before → after (s) | Transfer before → after (MB) |
| --- | --- | --- | --- |
| home-desktop | 67 → 99 | 0.85 → 0.74 | 47.47 → 2.53 |
| home-mobile | 47 → 58 | 4.25 → 4.35 | 38.57 → 1.77 |
| destination-desktop | 59 → 76 | 15.15 → 5.29 | 27.10 → 1.49 |
| destination-mobile | 46 → 74 | 19.45 → 5.88 | 21.42 → 0.80 |
| package-desktop | 65 → 81 | 19.51 → 3.35 | 24.01 → 1.19 |
| package-mobile | 46 → 72 | 17.32 → 5.75 | 23.93 → 0.71 |
| article-desktop | 64 → 76 | 18.58 → 6.06 | 27.17 → 1.67 |
| article-mobile | 43 → 75 | 20.66 → 6.60 | 27.10 → 1.12 |
| gallery-desktop | 65 → 83 | 21.66 → 2.94 | 47.41 → 2.34 |
| gallery-mobile | 45 → 77 | 21.44 → 6.02 | 36.34 → 1.73 |
| enquiry-desktop | 72 → 77 | 4.01 → 5.10 | 24.21 → 1.24 |
| enquiry-mobile | 46 → 77 | 18.27 → 5.66 | 24.13 → 0.74 |

LCP improved in ten comparisons. Mobile homepage LCP (4.35s versus 4.25s) and
desktop enquiry LCP (5.10s versus 4.01s) remain above the single-run baseline;
their smaller transfers and higher performance scores do not establish improved LCP.
Mobile homepage TBT is still 1.28s; image latency dominates many other LCP results.
These remaining concerns require live measurements and targeted follow-up.

Accessibility scores match the baseline in all twelve comparisons (81–96).
Existing contrast, target-size and ARIA/label findings remain on the backlog; the
current visual design is preserved. Best-practices scores remain 96 because the
local server returns 404 for the Vercel Analytics endpoint. Indexable page SEO
scores are 100. The utility `/plan` score is 69 because its intentional `noindex`
policy, introduced in Phase 1, is active; it is excluded from the sitemap.

[Machine-readable results](seo-phase5-performance.json) include scores, TBT, CLS,
LCP, transferred bytes and image/font/script requests. No photo request failed.
Raw Lighthouse reports are local `/tmp/afar-seo-phase5`.

## Measurement limits and remaining work

- These are local production-build lab tests with simulated throttling and remote
  Cloudinary delivery. CDN/network timing and local CPU conditions vary. They do not
  prove field INP or the production 75th-percentile Core Web Vitals targets.
- Check Cloudinary hero response times from the live deployment and actual target
  markets. Final runs still show image loading as the main LCP delay on many templates
  despite much smaller transfers; inspect cold derivative delivery and repeat only affected URLs.
- Mobile homepage main-thread work remains material: inspect hydration and React
  rendering on the live build before changing interactions or deferring sections.
  JavaScript and fonts remain a smaller transfer cost than the original photographs.
  Existing analytics/support behavior is preserved. Local Vercel Analytics requests
  require the actual hosting integration for a successful endpoint.
- Keep the existing local logo PNGs and review their delivery later if measurements
  justify it. Future photo components must declare accurate `sizes` and reserved geometry.
- Phase 6 handles deployment checks, Search Console and real-user/conversion measurement.

Implementation references:
[Next Image custom loaders](https://nextjs.org/docs/app/api-reference/components/image#loaderfile),
[Cloudinary image optimization](https://cloudinary.com/documentation/image_optimization),
[Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals).
