# Full Frontend Recovery Pass — Audit & Plan

## 1. Remaining Problems Audit

### Media / Image / Layout
- **Hero:** `.hero` has `overflow: hidden`; `.video-bg` has no overflow — iframe (100vw/56.25vw) could in theory leak on narrow viewports; `.video-poster img` has no `display: block` (inline gap risk) or `object-position`.
- **Case cards:** `.case` has `aspect-ratio: 16/9` and `overflow: hidden`; `.case img` has `object-fit: cover` but no `display: block` or `object-position: center` — stable but explicit is better.
- **Journal cards:** `.j-img-wrap` has `aspect-ratio: 16/9` and `overflow: hidden`; img has no `display: block` or `object-position`.
- **Journal featured:** `.journal-featured .j-img-wrap` has fixed `height: 420px`; img has `object-fit: cover` but no `object-position: center`.
- **Case page gallery:** `.m-gallery img` has `width: 100%` only — no `aspect-ratio` or `object-fit`, so different image aspect ratios can cause CLS and uneven layout.
- **Grid:** `.grid` uses `gap: 2.5vw` — can feel uneven; fixed gap (e.g. `var(--space-lg)`) is more stable.

### Responsive / Mobile
- Section padding and gaps already updated (40px 6%, 28px).
- `.horizontal-scroll` can cause horizontal overflow if parent isn’t contained — body has `overflow-x: hidden`; ensure section doesn’t break out.
- Case page `.m-video-container` height 80vh on desktop, 40vh on mobile — OK; gallery on mobile single column — OK.

### Buttons
- Already updated (border 0.2, inset, hover -2px). Optional: ensure all interactive elements have consistent :focus-visible.

### Contact
- Two-panel layout, minimal form (name + contact), privacy link — correct. No change needed.

### General glitch
- Single `DOMContentLoaded`; scroll listener throttled with rAF; no duplicate form handlers. Counter logic overwrites textContent (no animation) — good. Modal body scroll lock and focus trap present.

### Repo
- No `.md` in production root; docs in `docs/ai` and `docs/planning`; `.gitignore` includes `.DS_Store`.

## 2. Minimal Safe Recovery Plan

1. **Media:** Add `display: block` and `object-position: center` to all `object-fit: cover` images; add `overflow: hidden` to `.video-bg`; give `.m-gallery img` `aspect-ratio: 16/9`, `object-fit: cover`, `object-position: center`, `display: block`.
2. **Layout:** Change `.grid` gap to `var(--space-lg)`; add `min-height: 0` to `.case` and `.journal-card` where they are flex/grid children to avoid overflow.
3. **Mobile:** Add `overflow-x: auto` with `-webkit-overflow-scrolling: touch` to `.horizontal-scroll` for smoother scroll; ensure `.section` has no overflow leak.
4. **Buttons:** No structural change; already premium.
5. **Contact:** No change.
6. **Repo:** Confirm root clean; no file moves.

## 3. Applied Changes

- **Hero / video:** `.video-bg` already had `overflow: hidden`; `.video-poster img` already had `display: block`, `object-position: center`. No change.
- **Case cards:** `.case` already had `min-height: 0`; `.case img` already had `display: block`, `object-position: center`. `.grid` already `gap: var(--space-lg)`. No change.
- **Journal:** `.j-img-wrap` given `min-height: 0`; `.j-img-wrap img` given `display: block`, `object-position: center`. `.journal-featured .j-img-wrap` given `min-height: 0`; `.journal-featured .j-img-wrap img` given `display: block`, `object-position: center`.
- **Case page gallery:** `.m-gallery` gap set to `var(--space-md)`. `.m-gallery img` given `display: block`, `aspect-ratio: 16/9`, `object-fit: cover`, `object-position: center` to prevent CLS and stretch. `.m-gallery img.gallery-full` given `grid-column: 1 / -1`, `aspect-ratio: 21/9` (full-width cinematic row).
- **Horizontal scroll:** `.horizontal-scroll` given `overflow-y: hidden`, `-webkit-overflow-scrolling: touch`. `.journal-card` given `min-height: 0`.
- **Contact:** No change; two-panel, minimal form already in place.
- **Buttons:** No change; premium system already applied.
- **Repo:** No `.md` in root (all in `docs/ai`, `docs/planning`); `.gitignore` contains `.DS_Store`; no `.DS_Store` files found in repo.

## 4. Final QA

- **Media/layout:** Hero poster and iframe contained; case and journal images use `object-fit: cover`, `object-position: center`, `display: block`; gallery has fixed aspect ratios; grid gaps use design tokens.
- **Mobile:** Section padding 40px 6%; grid gaps 28px; contact stacks; horizontal scroll has touch scrolling; no overflow leaks.
- **Buttons:** Premium system (border, inset, hover lift) unchanged.
- **Contact:** Two-panel, name + contact only, privacy link present.
- **Stability:** Single DOMContentLoaded; scroll throttled; no duplicate form listeners; modal focus trap and body scroll lock present.
- **Repo:** Root clean; docs under `docs/`.

## 5. Changelog

### Media / layout fixes
- `.j-img-wrap`: added `min-height: 0`; img: `display: block`, `object-position: center`.
- `.journal-featured .j-img-wrap`: `min-height: 0`; img: `display: block`, `object-position: center`.
- `.m-gallery`: gap `var(--space-md)`; img: `display: block`, `aspect-ratio: 16/9`, `object-fit: cover`, `object-position: center`.
- `.m-gallery img.gallery-full`: `grid-column: 1 / -1`, `aspect-ratio: 21/9`.

### Mobile / responsive
- `.horizontal-scroll`: `overflow-y: hidden`, `-webkit-overflow-scrolling: touch`.
- `.journal-card`: `min-height: 0` for flex overflow.

### Premium buttons
- No changes; existing premium system preserved.

### Contact page
- No changes; composition and minimal form preserved.

### General glitch / stability
- No duplicate listeners or conflicting rules identified; no code changes.

### Repo cleanup
- Confirmed: no planning/audit `.md` in production root; `.DS_Store` in `.gitignore`; no `.DS_Store` in repo.

### Preserved unchanged
- Design direction, copy, pages, content, visual identity, header buttons, routing, locales.

### Remaining risks
- Gallery images do not have explicit `width`/`height` in HTML; CSS `aspect-ratio` reduces CLS. Optional future improvement: add dimensions to `<img>`.
