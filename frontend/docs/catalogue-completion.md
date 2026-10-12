# Client catalogue reconciliation — 12 October 2026

Source: `Pre rich(3).zip`, `chat.md`, WhatsApp export dated 9 October 2026. Line references below refer to the original export, not application files. The export contains repeated drafts and earlier brand proposals; these do not represent additional products.

The catalogue contains **24 destination pages and 31 expeditions** after this update. The client confirmed that the collection labelled “Simien Ethio Tours” should also appear on Afar Horizon.

## Added editorial destinations

| Page | Slug | Source section |
| --- | --- | --- |
| Afar People | `afar-people` | 12. AFAR PEOPLE, line 64828 |
| Salt Caravans | `salt-caravans` | 13. SALT CARAVANS, line 64853 |
| Abune Yemata Guh | `abune-yemata-guh` | 15. ABUNE YEMATA GUH, line 64897 |
| Maryam Korkor | `maryam-korkor` | 16. MARYAM KORKOR, line 64919 |
| Daniel Korkor | `daniel-korkor` | 17. DANIEL KORKOR, line 64937 |

The cultural pages explain livelihoods and respectful visits. Church pages describe walking requirements and conditional access. Related journeys use the parent area; the headings do not claim a particular church or encounter is guaranteed.

## Added Simien collection

Source: forwarded message at 11:07 AM on 9 October, starting at line 142737: “SIMIEN MOUNTAINS NATIONAL PARK — COMPLETE TREKKING COLLECTION”.

| Days / nights | Slug | Source heading line |
| --- | --- | --- |
| 1 / 0 | `simien-mountains-experience` | 142775 |
| 2 / 1 | `simien-escarpment` | 142865 |
| 3 / 2 | `simien-classic` | 142917 |
| 4 / 3 | `simien-escarpment-expedition` | 142981 |
| 5 / 4 | `simien-mountains-trek` | 143035 |
| 6 / 5 | `simien-explorer` | 143104 |
| 7 / 6 | `simien-grand-escarpment` | 143162 |
| 8 / 7 | `simien-extended-expedition` | 143222 |
| 9 / 8 | `ras-dashen-expedition` | 143302 |
| 10 / 9 | `complete-simien-circuit` | 143375 |
| 11 / 10 | `simien-ultimate` | 143437 |
| 12 / 11 | `simien-mountains-grand-trek` | 143500 |
| 13 / 12 | `simien-to-lalibela-grand-trek` | 144127, separate detailed message |
| 15 / 14 | `simien-mountains-grand-expedition` | 143572 |

All 106 itinerary days retain the supplied route and overnight sequence. An optional post-trip Gondar hotel is not counted as an included itinerary night. Meals are shown per day only where the source gives them; the quotation confirms remaining camp meals and support. The 13-day product ends in Lalibela and has six camping nights, three remote highland nights and three Lalibela nights.

These Simien sections contain no prices. Each uses “Price on request”; an existing matching live API record can still overlay its numeric price. Group sizes and operating dates are confirmed in the quotation. All 14 Simien packages and the five added destination pages use replacement Cloudinary photos supplied by the client, with descriptions of their visible subjects. These images do not promise a particular church visit or summit.

French, Spanish, German and Simplified Chinese overlays contain draft copy for every addition. Translated itinerary descriptions are condensed summaries of the English routes, with the same day and night counts. They require client language review and remain noindex under the existing policy. Review entries are appended to `translation-review.csv`.

## Already represented

The following 19 places already have destination pages: Danakil Depression, Afar, Erta Ale, Dallol, Lake Assale, Lake Afdera, Hamed Ela, Semera, Awash National Park, Hadar / Lower Awash Valley, Gheralta, Axum, Lalibela, Simien Mountains, Gondar, Mekelle, Bahir Dar, Lake Tana and Northern Ethiopia.

The following 17 products already have expedition pages: Danakil Essentials, Danakil Deep, Beyond the Highlights, Danakil Photography Expedition, Afar Geology & Culture, The Afar Edge, Danakil First Look, Danakil Explorer, Into the Danakil, Danakil & Gheralta, Afar to the Highlands, From Mountain to Horizon, From Axum to the Afar Horizon, Grand Northern Ethiopia Expedition, Northern Ethiopia Essentials, Northern Ethiopia Grand Horizon and Grand Horizon Ethiopia.

Earlier titles such as “The Essential Danakil”, “The Deep Danakil”, “Danakil Through the Lens” and “Highlands to the Horizon” refer to existing equivalents. Existing canonical URLs are retained. The later 15-day Grand Northern Ethiopia Expedition at line 145238 is already represented; it is distinct from the newly added 15-day Simien trek.

## Deferred source concepts

The later “ETHIOPIA DESTINATION INTELLIGENCE” section, lines 173332–173378, explicitly says to *eventually expand* to Addis Ababa, Harar, Bale, Omo, Sidama, Jimma, coffee regions and western/eastern/southern Ethiopia. These are not added as current catalogue commitments.

“The Descent into Afar”, “The Geological Frontier”, reverse routes, duration variants and custom/private frameworks are ideas or extensions rather than separately specified departures. They remain enquiry options rather than duplicate products. Unrelated brand proposals, document attachments absent from the ZIP, new CMS systems and wider website redesign requests are outside this catalogue update.

## Validation

Type checking and all frontend test files passed. Rendered checks passed across 78 public pages, with 77 sitemap URLs and reachable pages. Sixteen browser cases covered mobile, tablet, desktop and the four draft languages without overflow or runtime exceptions. All 19 client-supplied replacement image URLs loaded and were matched to their catalogue records. The final production build passed before commit, including the catalogue, translations and replacement images. Earlier Google Fonts connection failures were temporary and resolved on the final build. See `catalogue-validation.json` for the results.

Image review: all 14 replacement Simien URLs loaded successfully, including the supplied `Simien_Classi.png` filename. The concatenated Extended Expedition and Grand Trek URLs were separated. The Simien Escarpment photo shows a lake surrounded by conifers; its geographic provenance remains unconfirmed. Its description states the visible subject without identifying it as a Simien landscape.
