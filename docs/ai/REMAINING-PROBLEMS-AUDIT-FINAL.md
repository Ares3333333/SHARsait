# Remaining Problems Audit + Minimal Safe Fix Plan

**Date:** 2026-03-08  
**Scope:** Final premium finishing pass (no redesign).

---

## 1. Remaining Problems Audit

### 1.1 Buttons still look cheap
- **Current:** `.btn-minimal` / `.watch-case-btn` use light gradients and inset; borders 0.2–0.28; hover glow ~0.04–0.06. Still read as generic landing.
- **Cause:** Surfaces not light/transparent enough; hover fill and edge response not refined; spacing and typography not crisp enough for “engineered” feel.
- **Fix:** Lighter default surfaces (more transparency, less fill); subtler border (0.22–0.26); refined hover (soft luminous edge, no heavy block); slightly more padding/air; ensure text alignment and motion are precise.

### 1.2 Site feels too dark / muddy / filtered
- **Current:** `--bg: #050508`; hero overlay `rgba(3,3,3,0.62)` at bottom, 0.34 side; poster `brightness(0.94)`; case card overlay 0.68; journal card img `brightness(0.78)`.
- **Cause:** Overlay and filters add up to a murky feel; not enough separation and perceived brightness for “dark luxury”.
- **Fix:** Slightly lift `--bg` (e.g. #07070c); reduce overlay opacity (e.g. 0.62→0.50, 0.34→0.26); poster brightness 0.94→0.97; case-info gradient lighter; journal img 0.78→0.84; optionally nudge `--text-tertiary` for readability.

### 1.3 Contact form overcomplicated
- **Current:** Four inputs: name, phone/Telegram, company (optional), message (required); two-column grid; long form title and note.
- **Cause:** Too many fields and copy for a “premium minimal” contact; feels CRM-like.
- **Fix:** Reduce to: **Name** (required), **Contact** (one field: phone / Telegram / email — user chooses), **Message** (optional, one line). Keep privacy link. Shorter form title/note.

### 1.4 Case media / case experience not finished enough
- **Current:** Case iframes use `autoplay=0`; video loads on page open but does not autoplay.
- **Cause:** Static frame feels passive; no clear “premium” entry.
- **Fix:** Add `autoplay=1&muted=1` to case iframe URLs so video autoplays muted where policy allows; keep fallback (click-to-play) where blocked. Optional: slight polish to `.m-video-container` (softer shadow, no heavy black).

### 1.5 Homepage / showreel not expensive enough
- **Current:** Hero overlay and poster already tuned; section padding and rhythm in place.
- **Cause:** Overlay still a bit heavy; section surfaces could feel slightly more “air” and clarity.
- **Fix:** Covered by overlay/poster/bg and section token tweaks in 1.2; ensure hero subtitle and section labels use updated tokens.

### 1.6 Repo cleanup
- **Current:** Root has no `.md` files (already under `docs/`); `.gitignore` has `.DS_Store` and `.cursor/`.
- **Fix:** Confirm no stray files in root; ensure `.DS_Store` is ignored and not tracked.

---

## 2. Minimal Safe Fix Plan

| Area | Action | Risk |
|------|--------|------|
| Buttons | CSS-only: lighter surfaces, refined border/hover, subtle luminous edge, spacing | Low |
| Dark/muddy | CSS-only: `--bg`, overlay opacities, poster/case/journal brightness, tokens | Low |
| Contact form | HTML: remove company; make message optional, single line; shorten copy. Locales: new keys, keep RU/EN | Low |
| Case media | HTML: add `autoplay=1&muted=1` to iframe `src` on all case pages. CSS: optional container polish | Low |
| Homepage | Same as dark/overlay/section tokens | — |
| Repo | Verify root and .gitignore | None |

**Out of scope:** No copy rewrite beyond contact labels/placeholders; no IA change; no new routes; no flashy/SaaS effects.

---

## 3. Implementation Order

1. CSS: tokens, overlay, poster, case-info, journal img, section air.  
2. CSS: button system (all non-header buttons).  
3. Contact: HTML form + locales (RU/EN).  
4. Case pages: iframe `src` + optional container CSS.  
5. Final QA and changelog.
