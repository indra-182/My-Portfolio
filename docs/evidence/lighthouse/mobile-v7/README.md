# Mobile Lighthouse investigation, v7

## Outcome

The deployed production route reached Performance 100 in three consecutive clean-browser mobile Lighthouse runs without a product change. The supplied report remains external and is not committed; it is retained by reference at `/mnt/c/Users/mahad/Downloads/portfolio mobile test.json`.

The final evidence uses the same deployed target, `https://portfolio-indradev.vercel.app/id`, locale, Lighthouse version, mobile emulation, throttling, user agent, browser flags, and empty browser-profile condition for every run. It establishes a repeatable fast path in the worker's Linux environment, but the supplied report used a different Lighthouse version, operating system, screen emulation, and user agent. The supplied 99 may be environment-sensitive variance, not a demonstrated portfolio-code defect, but these runs do not establish its cause. No behavior or design was changed.

## Diagnosis

### Observed facts

| Evidence              | Performance |   FCP |   LCP | TBT | CLS | Speed Index |
| --------------------- | ----------: | ----: | ----: | --: | --: | ----------: |
| Supplied report       |          99 | 1,006 | 1,373 | 132 |   0 |       1,006 |
| `vercel-final-1.json` |         100 |   960 | 1,106 |  57 |   0 |       1,017 |
| `vercel-final-2.json` |         100 |   970 | 1,213 |  67 |   0 |       1,092 |
| `vercel-final-3.json` |         100 |   971 | 1,210 |  61 |   0 |         971 |

Values are milliseconds except CLS. All final artifacts are raw Lighthouse JSON reports.

- **Visible symptom:** the supplied report scored 99. FCP, LCP, CLS, and Speed Index were already perfect or near-perfect. TBT, at 132 ms, was the limiting scored metric.
- **Initiating trigger in that trace:** the supplied report records three long tasks, including an 85 ms task in a Next.js chunk and an 83 ms document task. Its `unused-javascript` audit attributes 23 KiB to a Next.js runtime chunk, and `legacy-javascript-insight` attributes 14 KiB to that same chunk.
- **Masking and environmental conditions:** the supplied run used Chrome on Windows with a benchmark index of 3,973. The clean final runs used headless Chrome on Linux and benchmark indices of 3,250, 3,229, and 3,311. Lighthouse simulated timing and framework-runtime task scheduling varied even with a clean browser profile. The final runs are against the same Vercel document and have fast server responses.
- **Audits that changed:** final TBT is 57-67 ms rather than 132 ms, and LCP is 1,106-1,213 ms rather than 1,373 ms. `unused-javascript` and `legacy-javascript-insight` remain, with 55 KiB and 14 KiB estimated savings respectively. They are advisory audits and did not prevent the three 100 scores.

### Hypotheses and disconfirming evidence

1. **Hypothesis:** the portfolio's delayed interaction initialization contributed to the supplied report's blocking time. A temporary clean build removed the `SiteInteractions` import and render entirely. `counterfactual-no-interactions.json` contains no 1,601-byte interaction script and recorded TBT 50 ms, LCP 2,141 ms, and Performance 99. The unchanged local runs recorded TBT 67-97 ms, LCP 2,152-2,163 ms, and Performance 98. This single counterfactual is consistent with lower blocking time, but it does not isolate causation or demonstrate a score improvement.
2. **Hypothesis:** replacing individual listeners with event delegation would preserve behavior and remove the task. The candidate runs recorded TBT 30, 93, and 90 ms and LCP 2,154, 2,171, and 2,170 ms. Original-script runs recorded TBT 32-97 ms and LCP 2,107-2,163 ms. These measurements overlap and do not establish a variant effect. The temporary variant was reverted, and its artifacts remain as an audit trail rather than final evidence.
3. **Proven fast path:** the unchanged Vercel deployment produced three consecutive 100s. It uses the same route and Lighthouse configuration as the final evidence, so a code or asset change would not be justified.

The available evidence does not isolate the source of the supplied trace's additional blocking time. The repository history was inspected at `ab635b3` and its performance predecessors. The route already has no page-level React client boundary in the initial render.

### Local production comparison

`unchanged-1.json` through `unchanged-3.json` are clean builds of the unmodified source served by `pnpm start` at `http://127.0.0.1:3000/id`. They scored 98, 98, and 98, with LCP 2,152-2,163 ms and TBT 67-97 ms. The LCP element was the hero `h1`; its measured TTFB was 7-13 ms and render delay was 68-100 ms. The longest request chain was 38-56 ms, server response was 5-10 ms, and every run attributed a 116-147 ms long task to the same Next.js chunk. These are measurements, not causal attribution. Local HTTP/1.1 and the Linux-headless benchmark are not a comparable substitute for the deployed Vercel HTTP/2 route, so these runs are diagnostic only and were not counted as final evidence.

The earlier `local-baseline.json`, `final-*.json`, and `candidate-*.json` artifacts are retained because each is a distinct Lighthouse result. `final-*` contain the original 1,601-byte `SiteInteractions` script, while only `candidate-*` contain the reverted temporary 1,270-byte event-delegation variant. Neither series is part of the three-run unchanged comparison or deployed final streak. `attempt-no-interactions-unverified.json` preserves the 09:25:23 run originally labeled as a counterfactual; its 1,601-byte interaction script shows that source removal was not verified in that run.

The counterfactual used the same local production mode and mobile Lighthouse configuration as the unchanged runs, but an isolated `http://127.0.0.1:3100/id` server and fresh browser profile. It was built after temporarily removing `SiteInteractions`, then the product source was restored. The report is diagnostic only and is not part of the final streak.

## Repeatable final configuration

- Target: `https://portfolio-indradev.vercel.app/id`
- Locale: Indonesian (`/id`)
- Application mode: deployed Vercel production
- Lighthouse: 13.4.1, Performance category only
- Browser: Chrome 151.0.7922.137, Linux binary `/opt/google/chrome/chrome`
- Browser flags: `--headless=new --disable-gpu --no-sandbox`
- Browser state: a new, empty `/tmp/lh-v7-vercel-N` profile for each run
- Form factor: mobile, 360 x 640, device scale factor 2
- User agent: Android 11 moto g power (2022), Chrome 151
- Throttling: Lighthouse simulated mobile throttling (`--throttling-method=simulate`)

For each run, use a distinct port and browser profile:

```sh
/opt/google/chrome/chrome --headless=new --disable-gpu --no-sandbox \
  --remote-debugging-port=9341 --user-data-dir=/tmp/lh-v7-vercel-1 about:blank

pnpm dlx lighthouse@13.4.1 https://portfolio-indradev.vercel.app/id \
  --port=9341 --only-categories=performance --form-factor=mobile \
  --throttling-method=simulate --screenEmulation.mobile \
  --screenEmulation.width=360 --screenEmulation.height=640 \
  --screenEmulation.deviceScaleFactor=2 \
  --emulatedUserAgent='Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Mobile Safari/537.36' \
  --output=json --output-path=docs/evidence/lighthouse/mobile-v7/vercel-final-1.json --quiet
```

## Validation note

The full `pnpm run verify` was run twice against the unmodified product source. Both runs passed formatting, lint, type checking, unit tests, and production build, then failed the pre-existing Playwright hero-alignment assertion in `e2e/portfolio.spec.ts:87`. The assertion requires the image and heading top positions to differ by at most 2 px. The clean-base-equivalent runs measured 3.096 px in Chromium and 4.271 px in the mobile project. No test or layout was changed.
