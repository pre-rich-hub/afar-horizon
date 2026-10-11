# Phase 6: launch verification and measurement

Updated 11 October 2026. Frontend preparation is implemented; **production verification and external account setup remain pending**. No deployment, DNS change, account creation or real enquiry was performed.

## Current deployment evidence

The owner confirmed Vercel Hobby, no Search Console setup, and that the custom domain has not yet been connected. The current `.vercel.app` deployment address was not supplied.

Read-only checks on 11 October 2026, approximately 08:11–08:15 UTC:

| Check | Observed result |
| --- | --- |
| `https://afarhorizon.com/` | HTTP 200, “Coming Soon” parking page, LiteSpeed; not the Next.js website |
| `https://www.afarhorizon.com/` | Same parking page; no canonical-host redirect |
| `/robots.txt`, `/sitemap.xml` on the canonical domain | HTTP 404 |
| HTTP destination URL with a query string | HTTP 404; no HTTPS redirect |
| Apex A record | `91.204.209.11` |
| Apex AAAA record | No record returned |
| Authoritative nameservers | `ns1.hostns.io`, `ns2.hostns.io` |
| `www` CNAME | `afarhorizon.com` |

These observations describe the domain at audit time. They are not the DNS records to configure on Vercel. The current domain cannot be treated as an SEO launch or used to establish the new site's indexing baseline.

### Follow-up live check — 11 October 2026

The domain now serves the website through Vercel. The apex redirects to `https://www.afarhorizon.com/`; the homepage, a destination and an article return HTTP 200. On the www host, `/robots.txt` and `/sitemap.xml` return HTTP 404. The sampled destination HTML also differs from the current workspace metadata: it uses the older “Afar Horizon” title suffix, a relative canonical, and no `og:url`. This points to an older deployed build or hosting configuration. The current workspace now uses the live www host as its canonical origin; rebuild and deploy this source before submitting the sitemap.

## 1. Connect and deploy the actual website

1. In the intended Vercel project, confirm `frontend` is the project root and that the latest intended code is deployed. Confirm the real backend URL/configuration and test its connectivity separately.
2. Set production environment variables: `SITE_URL=https://www.afarhorizon.com`, `SEO_INDEXABLE=true`, `DEPLOYMENT_ENV=production`, `ANALYTICS_ENABLED=true`, `ANALYTICS_CUSTOM_EVENTS_ENABLED=false`. Vercel supplies `VERCEL_ENV`. Preview markers override indexing and measurement settings.
3. Add `afarhorizon.com` and `www.afarhorizon.com` in Project Settings → Domains. The current live redirect makes www canonical; keep the apex domain redirecting to the www HTTPS origin while preserving paths and query strings.
4. Use the **exact records shown for this project by Vercel** at the active DNS provider. Alternatively, migrate nameservers deliberately, preserving existing email MX records and other required TXT/verification records. The observed HostNS nameservers mean records entered in an inactive DNS zone would not take effect.
5. Wait for Vercel's domain and certificate checks to pass, rebuild/redeploy after environment changes, and verify HTTP → HTTPS and apex → www redirects live.
6. Check the `.vercel.app` host's redirect/canonical behavior. It must not become a second independently indexed website. Canonicals should remain on `https://www.afarhorizon.com`; preview deployments must remain noindex.

[Vercel domain setup](https://vercel.com/docs/domains/set-up-custom-domain), [adding domains](https://vercel.com/docs/domains/working-with-domains/add-a-domain), [nameservers](https://vercel.com/docs/domains/working-with-nameservers).

## 2. Verify Search Console

The owner should create a **Domain property** named `afarhorizon.com` in Google Search Console. Copy Google's actual verification TXT record into the authoritative DNS zone, verify ownership, and retain the record. This covers the domain's protocol/subdomain variants.

An optional URL-prefix fallback is implemented: create `https://www.afarhorizon.com/`, choose HTML-tag verification, and put **only the token** from `content="…"` into Vercel's production `GOOGLE_SITE_VERIFICATION` variable. Rebuild, check that the homepage emits the tag, then verify. Leave this variable empty when using DNS verification. No invented token is included in code; previews omit verification tags.

After the real site is live, submit `https://www.afarhorizon.com/sitemap.xml`. The current catalogue produces **58 indexable URLs**. Inspect the homepage, one destination, one expedition and one article. Check the live HTML, selected canonical and resource accessibility; record any exclusions and investigate their cause. An accepted sitemap does not guarantee indexing.

[Property types](https://support.google.com/webmasters/answer/34592?hl=en), [ownership verification](https://support.google.com/webmasters/answer/9008080?hl=en), [sitemap submission](https://support.google.com/webmasters/answer/7451001?hl=en).

## 3. Verify deployed SEO

From `frontend`, run the existing read-only verifiers against the connected domain:

```sh
node tests/verify-seo-build.cjs --base-url=https://www.afarhorizon.com
node tests/verify-crawl.cjs --base-url=https://www.afarhorizon.com
node tests/verify-content.cjs --base-url=https://www.afarhorizon.com
node tests/verify-schema.cjs --base-url=https://www.afarhorizon.com
node tests/verify-images.cjs --base-url=https://www.afarhorizon.com
```

Check host/protocol redirects separately, including a detail path and query string. Check previews for noindex. Complete the outstanding Google Rich Results Test using the deployed representative URLs and an accessible Google session. Use mocked requests for automated form checks; coordinate any real end-to-end enquiry with the operator.

## 4. Measurement on the current Hobby plan

Enable Web Analytics in the Vercel project dashboard and check production page views after deployment. The client is mounted only on confirmed Vercel production deployments. `ANALYTICS_ENABLED=false` turns it off. Its `beforeSend` hook removes URL query strings and fragments and drops unknown/private paths. This hook governs the event URL; it is not a claim that all SDK-collected context can be changed through it.

**Custom events remain disabled** because Vercel supports them on Pro/Enterprise. No upgrade or alternate analytics provider has been selected. The tested wiring is ready for an explicitly chosen supported setup; do not set `ANALYTICS_CUSTOM_EVENTS_ENABLED=true` on Hobby.

| Prepared event | Trigger | Properties |
| --- | --- | --- |
| `enquiry_submitted` | Backend accepts a journey or travel-trade partner request | `form` (`journey`/`partner`), public `page` |
| `contact_intent` | Phone, email or WhatsApp link click | `channel`, public `page` |
| `package_enquiry_intent` | Expedition-page link to its enquiry section, `/plan` or `/contact` | public `page` |

Failed requests do not count as completed enquiries. Concurrent submissions share one pending request; each mounted form counts an accepted request once and permits retry after failure. This is a frontend guard, not backend idempotency across tabs or reloads. Reporting failures do not change submission success. Clicks indicate intent; they do not establish an external conversation, confirmed booking or revenue. No form content, names, email addresses, telephone numbers or query strings are passed as custom properties.

Privacy wording describes the disabled optional events. Update that status wording if a supported conversion provider is activated. Existing cookie-free Vercel measurement is retained; no new provider or consent interface was introduced.

[Custom-event plan requirements](https://vercel.com/docs/analytics/custom-events), [Web Analytics setup](https://vercel.com/docs/analytics/quickstart), [Vercel measurement privacy](https://vercel.com/docs/analytics/privacy-policy).

## Local validation

TypeScript, all eight test files and the production build pass. Rendered checks pass on all 60 public pages; crawl checks validate all 58 sitemap URLs, internal-link reachability, redirects, missing-page status and private-page protection. Mocked Chrome checks pass for the journey form at 390px and the partner form at 1440px: concurrent requests are deduplicated, failures are displayed, retry succeeds and local analytics sends no requests. [Browser evidence](seo-phase6-browser.json) is retained; rerun with `node tests/verify-enquiries.cjs` against a local production server on port 3101.

## 5. Record the first real baseline

| Metric | Current status | Source after launch |
| --- | --- | --- |
| Indexed pages, sitemap status, canonical inspection | Not measured; account not configured | Search Console indexing and URL inspection |
| Impressions, clicks, relevant queries, landing pages | Not measured | Search Console performance, initially 28 days |
| Public page views and landing pages | Production dashboard not verified | Vercel Web Analytics |
| Mobile field LCP, INP, CLS | Not measured; lab evidence exists in Phase 5 | Search Console Core Web Vitals / PageSpeed field data when available |
| Accepted enquiries | Conversion analytics disabled | Operator's backend records; future chosen supported event provider |

Record deployment ID, launch date, measured date range and named report owner when available. Do not enter zeros for unmeasured metrics. Review indexing weekly after launch and compare enquiry/search trends over meaningful periods.

Phase 6 remains open until the domain is connected, live checks pass, Search Console is verified with its sitemap submitted, and the owner can access the agreed measurement reports.
