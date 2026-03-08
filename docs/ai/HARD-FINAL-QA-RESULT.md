# Hard Final QA — Result

**Date:** 2026-03-07  
**Criteria:** 8 (images, layout, overflow-x, buttons, contact, glitches, repo, regressions)

---

## 1) Images no longer break / stretch / spill

**Passed**

- **Hero:** `.video-bg` overflow hidden; `.video-poster img` — `display: block`, `object-fit: cover`, `object-position: center` (style.css ~213–219). Container clipped.
- **Case cards:** `.case` aspect-ratio 16/9, overflow hidden, min-height 0; `.case img` — block, 100% size, cover, center (~321).
- **Journal:** `.j-img-wrap` aspect-ratio 16/9, overflow hidden, min-height 0; `.j-img-wrap img` — block, cover, center (~384–385). `.journal-featured .j-img-wrap` fixed height + img cover/center (~429–450).
- **Case gallery:** `.m-gallery img` — block, aspect-ratio 16/9, object-fit cover, object-position center; `.m-gallery img.gallery-full` — grid-column 1/-1, aspect-ratio 21/9 (~787–790). No stretch/spill.

---

## 2) Layout stable on desktop and mobile

**Passed**

- **Desktop:** `.grid` 2 cols, gap var(--space-lg); `.section` padding var(--section-pad-y) 4%; `.contact-card` grid 0.9fr 1.1fr; `.journal-grid-rest` 2 cols, gap var(--space-xl); `.m-gallery` 2 cols. All use min-height 0 / aspect-ratio where needed.
- **Mobile (900px):** `.section` 40px 6%; `.grid`, `.journal-grid-rest`, `.journal-page-grid` 1fr, gap 28px; `.contact-card` 1fr, min-height 0; `.journal-featured` 1fr, `.j-img-wrap` height 280px; `.m-case-body`, `.m-gallery`, `.project-metrics` 1fr. Stacking and spacing consistent.
- **480px:** `.section, .manifesto` padding var(--space-xl) 5%; `.stats-grid` 1fr; manifesto text clamp. No broken stacking found.

---

## 3) No overflow-x issues remain

**Passed**

- `body { overflow-x: hidden }` (style.css ~63).
- `.hero { overflow: hidden }` (~193).
- `.video-bg { overflow: hidden }` (~204).
- `.horizontal-scroll` has `overflow-x: auto`, `overflow-y: hidden` — scroll contained inside block; parent layout not forcing page scroll. Body clips any overflow. No overflow-x leak.

---

## 4) Buttons are materially more premium now

**Passed**

- **.btn-minimal** (~518–560): Light gradient background, `box-shadow: inset 0 1px 0 rgba(255,255,255,0.12)`, border rgba(255,255,255,0.2), hover lift `translate3d(0, -2px, 0)`, active scale 0.98. No solid black, no neon.
- **.watch-case-btn** (~329–366): Same grammar — gradient, inset, border, hover lift, active scale.
- **.cta-primary** (~567–581): Red-tinted border/background, `button-breath-soft` 6s, hover stronger border/glow and lift.
- **.cta-secondary / .cta-ghost** (~584–611): Defined; ghost transparent with border. Mobile: btn min-height 48px, submit 52px (~873–874). Materially premium and consistent.

---

## 5) Contact page is simpler and stronger

**Passed**

- **Structure (contact.html):** Single `.contact-card` with aside (heading, intro, direct contacts) + form panel. One composition.
- **Heading:** `.contact-heading` clamp(1.85rem, 4.2vw, 2.5rem) — not oversized (style.css ~656–664).
- **Form:** Only two fields — Name, Contact (lines 57–64 contact.html); submit + `.form-legal` with privacy link to `/privacy` (66–67). Simpler form present.
- **Layout:** Two columns desktop (0.9fr 1.1fr); at 900px single column, aside border-bottom, form inputs min-height 52px, submit 56px (~740–749). Stronger, calmer composition.

---

## 6) No major frontend glitches remain

**Passed**

- Single `DOMContentLoaded` in script.js; scroll listener rAF-throttled; one form submit handler; modal focus trap and body scroll lock present (from prior audit). No duplicate listeners or conflicting button/contact CSS found. No z-index or overflow conflicts in checked rules.

---

## 7) Repo root is cleaner

**Passed**

- Root contains: `index.html`, `contact.html`, `404.html`, `privacy.html`, `news-*.html`, `sitemap.xml`, `robots.txt`, `vercel.json`, `assets/`, `cases/`, `journal/`, `docs/`, `.cursor/`, `.gitignore`. No planning/audit `.md` in root (all under `docs/ai` or `docs/planning`). `.gitignore` includes `.DS_Store`. Root is clean.

---

## 8) No regressions were introduced

**Passed**

- Critical selectors intact: `.case`, `.case img`, `.j-img-wrap`, `.journal-featured`, `.m-gallery img`, `.btn-minimal`, `.cta-primary`, `.contact-card`, `.contact-form--minimal`. Contact form still has two fields and privacy link. Button and contact media overrides present. No removal or override of core layout/image/button/contact rules detected.

---

## Summary

| # | Criterion | Result |
|---|-----------|--------|
| 1 | Images no longer break/stretch/spill | **Passed** |
| 2 | Layout stable desktop and mobile | **Passed** |
| 3 | No overflow-x issues | **Passed** |
| 4 | Buttons materially more premium | **Passed** |
| 5 | Contact page simpler and stronger | **Passed** |
| 6 | No major frontend glitches | **Passed** |
| 7 | Repo root cleaner | **Passed** |
| 8 | No regressions | **Passed** |

**Overall: All 8 criteria passed.**  
No files or selectors flagged as needing work.
