---
status: accepted
---

# Keep Motion in focused client islands

The portfolio uses the `motion` package behind one `LazyMotion` and `MotionConfig` boundary in the
locale layout. Hero layers/signature and the featured Petron path are the only Motion islands;
composition, facts, translations, metadata, and feed rendering remain server-first. This keeps the
runtime cost and hydration surface small while still supporting the Decision Atlas signature,
sticky path relationship, and user-controlled reduced motion. Native DOM behavior remains the
owner for theme, dialog, active navigation, disclosures, and back-to-top.

## Considered options

- CSS-only animation would keep the bundle smaller but could not provide the shared pointer and
  path orchestration without duplicating interaction code.
- A page-wide client provider with animated sections would make every route and content change pay
  the hydration cost and would hide the server/client boundary.
