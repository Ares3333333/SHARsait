# PHASE D — Safe Implementation Plan

**Scope:** Implement the Phase C Premium Visual System in the current repo. No new information architecture; no new sections or page types. Modals stay on the homepage; cases 5–8 are brought to the same structure as 1–4 in place.

**Do not implement yet.** This document is the plan only.

---

## 1. Current repo (reference)

| Path | Role |
|------|------|
| `index.html` | Homepage: hero, manifesto, social proof, work grid (8 cases), team, pricing, journal, order, footer; 8 modals (#case-1 … #case-8) inline. |
| `news-1.html`, `news-2.html`, `news-3.html` | Journal article pages (header, footer, content). |
| `404.html` | Error page. |
| `privacy.html` | Privacy policy. |
| `assets/css/style.css` | Single stylesheet (~490 lines): variables, reset, cursor, nav, hero, sections, cases, pricing, modals, toast, secondary pages, media. |
| `assets/js/script.js` | Nav, cursor, modals (open/close, iframe, scroll lock, focus, anchor), form, counters, i18n, “show more”. |
| `assets/js/locales.js` | RU/EN strings for data-i18n. |

**No build step.** Static HTML/CSS/JS; fonts from Google Fonts (preconnect + preload already).

---

## 2. What pages/files to create

### 2.1 Required (none)

- No new HTML pages. Same entry points: `index.html`, `news-*.html`, `404.html`, `privacy.html`.
- No new JS or image files for the visual system.

### 2.2 Optional (recommended only if you want a clear token layer)

- **`assets/css/tokens.css`** — New file containing only `:root { ... }` with:
  - Color (brand, bg, surfaces, text primary/secondary/tertiary, line, surface-border)
  - Typography (font stacks, scale values, line-heights, letter-spacing)
  - Spacing (space-2xs … space-4xl)
  - Motion (durations, easing)
  - Button tokens (border, glow, inset, no black)
- **`index.html` (and other HTML)** — Add one line in `<head>`: `<link rel="stylesheet" href="assets/css/tokens.css">` before `style.css`, so `style.css` can use the variables and override where needed.

**If you do not create `tokens.css`:** Put all new variables in the top of `style.css` and refactor existing `:root` in place. One file is simpler and avoids an extra request; two files give a clear “tokens vs. components” split.

**Recommendation:** Implement in `style.css` only (no new file) to avoid an extra HTTP request and keep the repo minimal. Optionally extract to `tokens.css` in a later cleanup.

### 2.3 Do not create

- No `case-1.html` … `case-8.html`. Case content stays in modals on the homepage.
- No new partials or templates (static site as-is).
- No new font files (keep Google Fonts).

---

## 3. What to “move” (and what not to move)

### 3.1 No content move from homepage to other pages

- All case content (text, structure, video URLs) stays in `index.html` inside the existing modal divs.
- Nothing is moved from the homepage to `news-*.html`, `404.html`, or `privacy.html`.
- Journal links continue to point to `news-1.html`, `news-2.html`, `news-3.html`; no change.

### 3.2 Enriching cases 5–8 inside the homepage (structure only)

- **Today:** Cases 5–8 are minimal: `<div class="modal" id="case-N"><div class="close-case">…</div><div class="m-hero"><h1 class="m-hero-title">…</h1></div><div class="m-video-container" data-src="…"></div></div>`.
- **Target:** Same structure as cases 1–4: close + `m-hero` (tag + title) + video + `m-case-body` (sidebar + `m-content-text`) + optional `project-metrics` + optional `m-gallery` + `m-cta-wrap`.
- **What to do:** In `index.html` only, for each of `#case-5` … `#case-8`:
  - Add `m-hero-tag` (or reuse existing title as tag if needed) and ensure `m-hero-title` is present.
  - Insert `m-case-body` with `m-sidebar` (e.g. Client, Service, Deadline) and `m-content-text` with at least one short block (e.g. one h2 + one p, or placeholder “Описание проекта.”).
  - Add `m-cta-wrap` with heading + CTA link “Обсудить проект” → `#order` + `onclick="closeCase(N)"`.
  - Optionally add `project-metrics` (e.g. 2–3 metrics) and/or `m-gallery` (1–2 images) if you have copy; otherwise omit or use minimal placeholder.
- **Content:** Reuse or add minimal Russian (and EN in `locales.js` if you use data-i18n). No removal of existing text elsewhere; only addition/restructure inside the four modal divs.
- **Script:** `openCase` / `closeCase` and iframe logic already work for any modal with `m-video-container` and `data-src`; no JS change required for structure. Ensure new elements use the same class names so existing CSS applies.

### 3.3 Moving from “magic numbers” to variables (refactor only)

- **In `style.css`:** Replace hardcoded colors, sizes, and spacing with the Phase C tokens (e.g. `--line`, `--surface-border`, `--space-*`, type scale vars). This is a refactor: same look first, then align to spec. No “move” of content; only CSS values moved into variables and variables applied.

### 3.4 Footer and secondary pages

- **Footer:** Today it uses inline `style="...".` Plan: replace with a class (e.g. `.site-footer`) and style it in `style.css` using tokens (padding, border-top, font size, color). No new file; only change `index.html` (and any other page that has the same footer) to use the class and remove inline style.
- **404 / privacy:** No content move. Apply the same tokens and type scale (e.g. `.page-meta`, `.page-title`, `.page-text`) so they use the design system; keep existing structure and copy.

---

## 4. How to preserve content

### 4.1 Text and copy

- Do not run find-and-replace that changes visible copy (Russian/English) except for fixing obvious typos agreed beforehand.
- Preserve all `data-i18n`, `data-i18n-html`, `data-i18n-placeholder` attributes and their keys. When adding markup for cases 5–8, add new keys to `locales.js` for any new strings; do not remove or rename existing keys without a separate pass.
- Manifesto, hero subtitle, stats, team names/roles, pricing titles and list items, journal titles/tags, order heading, contact links, form placeholder, footer — leave text and i18n keys unchanged. Only adjust markup (tags, classes) if needed for the new type roles.

### 4.2 Media and links

- Do not change `src`, `data-src`, `href` (except to fix broken links). Hero iframe, case video URLs, client names, journal links, contact links, form action (if any) stay as-is.
- Image dimensions (`width`, `height`), `loading="lazy"`, `decoding="async"` on cases and journal: keep. When adding gallery/placeholder images for cases 5–8, use the same pattern.

### 4.3 Markup and behavior

- Section order and IDs: keep (`#work`, `#team`, `#pricing`, `#journal`, `#order`). Anchors and `scroll-margin-top` for `#order` stay.
- Modal IDs `#case-1` … `#case-8` and `onclick="openCase(N)"` / `closeCase(N)` stay. Card `onclick="openCase(N)"` stays.
- Form ID `contactForm`, toast element, hamburger, nav structure: no renames. Script relies on these; changing them would require script updates and increases regression risk.

### 4.4 Backup and rollback

- Before starting: create a branch (e.g. `premium-visual-system`) from current `main` (or your default). Implement there.
- After each step below (or after each logical group), commit. Message format: e.g. `Phase D: step N – [short description]`. So you can revert to “after tokens” or “after buttons” without losing later work.
- Optional: copy `index.html` and `assets/css/style.css` to a backup folder (e.g. `_backup/`) once before edits. Only for extra safety; git is the main rollback.

---

## 5. How to avoid regressions

### 5.1 Order of implementation (do in this order)

1. **Tokens only** — Add or refactor `:root` in `style.css` with Phase C color, spacing, motion, button tokens. Do not change any component CSS yet; only ensure variables exist and existing rules still work (they should, if you only add and don’t remove).
2. **Buttons** — Unify nav and body buttons: remove black from nav button shadows; align nav to same primary/secondary tokens as body; remove infinite `button-breath`; keep hover/focus transitions. Test: nav “СВЯЗАТЬСЯ” and “ТЕЛЕФОН”, body “СМОТРЕТЬ КЕЙС”, “Развернуть портфель”, price card buttons, modal CTA and close.
3. **Typography** — Apply type scale and roles (Display, H1–H3, Body, Caption, Label) via classes/selectors; adjust font-size, weight, line-height, letter-spacing. Do not change HTML text content. Test: hero, manifesto, section labels, case titles, modal body text, footer.
4. **Wordmark** — Set logo and hero to 0.12em tracking; align weights (e.g. 600 SHAR, 300/500 PRODUCTION); optional: remove or gate logo shimmer to hover. Test: nav logo, hero “SHAR” / “PRODUCTION”, footer.
5. **Surfaces** — Apply `--surface-border` and raised surface fill to price cards, journal cards, client tiles, case cards; set `--line` for section/footer dividers. Test: cards look clearly bordered, no “invisible” panels.
6. **Motion** — Remove or gate infinite logo shimmer and button breath; set one stagger delay for scroll reveal; remove or drastically reduce case card lens ray. Test: no constant motion at rest; hover/scroll still feel responsive.
7. **Layout** — Apply content max-width 1200px and section padding (manifesto 2xl, sections 3xl, footer xl) where specified. Test: desktop width, mobile breakpoints.
8. **Modals 5–8** — Add structure and minimal content inside `index.html` for cases 5–8; add locale keys if needed. Test: open/close, video load, CTA to `#order`, focus and scroll lock.
9. **Footer and secondary pages** — Footer: class + tokens, no inline style. 404/privacy: apply tokens and type scale. Test: footer on index and journal; 404 and privacy layout and readability.

Implementing in this order limits the “blast radius” of each change and makes it easier to find the cause of a regression.

### 5.2 Test checklist (after each step and at the end)

- **Navigation:** Logo, nav links, RU/EN switcher, “СВЯЗАТЬСЯ”, “ТЕЛЕФОН” — clickable; scroll adds “scrolled” state; mobile hamburger opens/closes menu.
- **Hero:** Video loads (or loader hides); wordmark and subtitle readable; no layout shift.
- **Sections:** Manifesto, stats, clients, work grid, team scroll, pricing, journal scroll, order form — all visible and aligned; no overflow or overlapping text.
- **Work:** All 8 case cards clickable; “Развернуть портфель” shows 5–8; each case opens the correct modal.
- **Modals:** Open/close (button and overlay if present); video loads in container; scroll lock; focus trap; “ЗАКРЫТЬ” and “Обсудить проект” / “Связаться” work; anchor to `#order` after close works; header stays visible and clickable above modal.
- **Form:** Submit (or validation) and toast; no console errors.
- **Footer:** Visible, one line (or as designed); link to privacy if present.
- **Secondary:** Open `news-1.html`, `404.html`, `privacy.html` — header/footer and type use the system; no broken layout.
- **Locales:** Switch RU/EN; key strings update; no missing keys in console.
- **Reduced motion:** If you implement `prefers-reduced-motion`, check that motion is disabled and layout still correct.

### 5.3 What not to change (to avoid regressions)

- Do not rename or remove IDs/classes that `script.js` or `locales.js` depend on (e.g. `#contactForm`, `#show-more-btn`, `#case-N`, `.modal`, `.close-case`, `[data-i18n]`, etc.). If you must rename, update the script in the same commit.
- Do not change the iframe strategy: iframe created on open, `innerHTML = ''` on close. Do not add iframes in HTML for cases.
- Do not remove or change scroll lock, focus trap, or anchor-from-modal logic in `script.js` unless you have a specific bug to fix.
- Do not add new global animations (e.g. new infinite keyframes) or heavy filters (e.g. extra blur) that could hurt performance.

---

## 6. How to keep performance high

### 6.1 No new network requests

- Do not add a second stylesheet unless you accept the extra request (e.g. optional `tokens.css`). Prefer a single `style.css`.
- Do not add new fonts. Keep Inter and Plus Jakarta Sans; weights already in use (300, 400, 500, 600, 700 for Inter; 300, 400, 500, 600 for Plus Jakarta). No new preloads.
- Do not add new scripts. All changes are CSS and, for cases 5–8, HTML only.

### 6.2 No new heavy effects

- No new `backdrop-filter` or `filter` on large areas. Existing nav blur and modal overlay are enough.
- No new infinite animations. Removing shimmer and button-breath reduces work; adding new ones would cancel that. Optional single-CTA pulse, if used, should be one element and one light animation.
- Case card: remove or minimize lens-ray; keep image filter and transform on hover (already GPU-friendly). No new overlapping pseudo-elements that trigger repaint.

### 6.3 Same loading and rendering strategy

- Hero iframe: keep `loading="eager"`, `fetchpriority="high"`; keep video loader and fade-in as-is.
- Case images and journal images: keep `loading="lazy"`, `decoding="async"`, explicit width/height to avoid CLS.
- Fonts: keep preconnect and preload; do not add more font files.
- Script: keep passive listeners and rAF throttling where already present; do not add new scroll/resize listeners that run every frame.

### 6.4 CSS and layout

- Prefer existing variables and new tokens over duplicated values so the file does not grow unnecessarily.
- When adding markup for cases 5–8, reuse existing modal/Case Body classes; avoid inline styles. Reuse keeps CSS small and cacheable.
- If you add content to modals 5–8, use the same lazy-loading and image attributes as in cases 1–4 for any new images.

### 6.5 Checklist (performance)

- No new HTTP requests (or at most one optional `tokens.css`).
- No new infinite CSS animations; remove or gate existing ones.
- No new heavy filters or backdrop-filters.
- Same iframe create/destroy and lazy-loading behavior.
- Layout and paint: test on a mid-range device or throttled CPU; no long tasks or constant repaints at rest.

---

## 7. Summary

| Question | Answer |
|----------|--------|
| **What pages/files to create?** | None required. Optional: `assets/css/tokens.css`; recommended to keep everything in `style.css`. |
| **What to move from homepage into case pages?** | Nothing. There are no separate “case pages.” Case content stays in `index.html` modals. For cases 5–8, add structure and minimal copy inside the existing modal divs so they match the structure of cases 1–4. |
| **How to preserve content?** | Do not change visible copy or i18n keys; preserve media URLs and dimensions; keep section/modal IDs and script-hooked classes; use a branch and commit after each step; optional file backup. |
| **How to avoid regressions?** | Implement in the fixed order (tokens → buttons → typography → wordmark → surfaces → motion → layout → modals 5–8 → footer/secondary); run the test checklist after each step; do not rename/remove script-dependent IDs/classes or change iframe/scroll/focus logic without need. |
| **How to keep performance high?** | No new fonts or scripts; no new infinite or heavy effects; same iframe and lazy-load strategy; single CSS file preferred; remove or gate existing infinite animations. |

---

*Document: PHASE D — Safe Implementation Plan. Plan only; do not implement yet.*
