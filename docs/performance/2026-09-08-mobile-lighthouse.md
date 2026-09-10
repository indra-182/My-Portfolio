# Mobile Lighthouse performance diagnosis

## Evidence

The supplied Lighthouse 13.4.1 report, captured on 2026-09-08 at 09:45:41 UTC for
`https://portfolio-indradev.vercel.app/id`, scored 68 under simulated mobile throttling.

| Metric                   | Supplied report | Score points lost |
| ------------------------ | --------------: | ----------------: |
| First Contentful Paint   |        4,526 ms |               8.5 |
| Largest Contentful Paint |        5,576 ms |              20.5 |
| Total Blocking Time      |           41 ms |                 0 |
| Cumulative Layout Shift  |      0.00000245 |                 0 |
| Speed Index              |        4,526 ms |               2.8 |

The LCP element was `h1#hero-title`, not the portrait. Recursive transferred 719,247 bytes
(718,680 bytes of font data), approximately 76% of the page's 949,457 transferred bytes.
The critical dependency chain was HTML → CSS → Recursive. The font was not preloaded.
The stylesheet already used `font-display: swap`.

The report's simulated FCP/LCP differ from its observed timings (244/307 ms). The simulated
mobile network and CPU model, rather than the unthrottled trace duration, determines the
reported performance metrics. Do not mix the observed 285 ms LCP render-delay breakdown
with the simulated 5,576 ms LCP as though they were the same clock.

## Reproduction and controlled intervention

Fresh Lighthouse 13.4.0 runs used Chrome for Testing 151, default simulated mobile settings,
a fresh browser profile, and the deployed `/id` page. This is a different browser/Lighthouse
patch than the supplied DevTools capture, so exact score reproduction is not expected.

| Run                                       | Score |      FCP |      LCP |   TBT |
| ----------------------------------------- | ----: | -------: | -------: | ----: |
| Deployed baseline                         |    79 | 1,224 ms | 5,574 ms | 75 ms |
| Deployed baseline repeat                  |    79 | 1,258 ms | 5,577 ms | 66 ms |
| Same page, only Recursive request blocked |    98 | 1,171 ms | 2,171 ms | 70 ms |

Blocking the font is a diagnostic intervention, not the shipped fix: it changes typography.
All application JavaScript and Motion animations remained enabled. The approximately 3.4 s
LCP improvement isolates font loading as the dominant bottleneck. FCP variability prevents
attributing the supplied capture's entire FCP penalty to one mechanism.

Ranked hypotheses were oversized font transfer, delayed CSS discovery of the font, and
hero animation/hydration delay. The intervention supports the first hypothesis; the captured
request initiator supports the second as a contributing dependency. Motion is not supported
as the dominant cause by this experiment, and TBT was already healthy.

The feedback loop runs Lighthouse against the actual page, then checks that FCP is at most
1,800 ms and LCP at most 2,500 ms. The original report and both deployed baseline runs fail
that check. Full browser performance capture takes longer than a unit test; the report
assertion itself takes under a second. Repeated baseline LCP differed by only 3 ms.

## Optimization direction

Keep Recursive, the design's variable axes, and all animations. Reduce the font payload and
preload the critical font with matching CORS semantics. Validate font coverage, appearance,
accessibility, and recruiter journeys as well as performance. Preload alone does not remove
the cost of transferring a 702 KiB font.

References: [web.dev font loading guidance](https://web.dev/articles/font-best-practices),
[FontTools subsetting](https://fonttools.readthedocs.io/en/latest/subset/), and
[FontTools partial variable-font instancing](https://fonttools.readthedocs.io/en/latest/varLib/instancer.html).

## Implemented change

Implementation was delegated to Luna with Max reasoning. The font is split into a 145,884-byte
common face and a 180,096-byte extended face, down from one 718,680-byte request. Both retain
the full MONO, CASL, and wght axes, including the hero signature's hover values. Unused slnt and
CRSV axes are pinned to 0 and 0.5 respectively. The two disjoint faces preserve all 745 source
codepoints, while normal Indonesian and English copy requests only the common face. The locale
layout preloads that common WOFF2 URL using anonymous crossorigin. Font display remains swap.
No Motion code, animation definitions, or portfolio content changed.

The optimized faces retain the original combined character map and vertical metrics. Browser
coverage verifies that the extended face stays off the initial rendering path and loads when a
character outside the common face is rendered.

## Intermediate optimization measurement

On the same local webpack production build and Lighthouse settings, the 212,412-byte subset
without preload scored 89 (FCP 1,971 ms, LCP 3,471 ms); adding preload scored 92
(FCP 916 ms, LCP 3,316 ms, TBT 105 ms, CLS 0). This supports early discovery as a
contributor, but the remaining font payload still exceeded the LCP target. The final iteration
therefore splits the common font from extended characters that can be loaded on demand.

These localhost results are not an estimate of the final deployed score. A temporary proxy
control using the original font produced a different HTTP delivery environment and is not
used as a direct comparison with the localhost server or Vercel.

## Final local measurement

Three final candidate runs scored 91, 93, and 94. FCP ranged from 910 to 921 ms, LCP from
2,860 to 3,021 ms, TBT from 121 to 206 ms, and CLS remained 0. Only the 145,884-byte common
font was requested on `/id`; the 180,096-byte extended face stayed off the critical path.
Compared with the preloaded 212,412-byte intermediate build measured under the same local
setup, median LCP improved by about 297 ms and the median score rose from 92 to 93.

The remaining approximately 3.0 s local LCP is above the 2.5 s good threshold, so this change
should not be described as guaranteeing a particular deployed score. A post-deployment
Lighthouse run is needed because CDN delivery, browser version, and run variance affect the
result.
