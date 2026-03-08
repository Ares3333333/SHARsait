# Final Premium Finishing Pass — Audit & Plan

## 1. Remaining Problems Audit

**Buttons:** Still read slightly generic: single-layer gradient (0.035→0.01), border 0.22, hover glow 0.035. Lack layered optical depth and a more refined edge; motion 0.45s is good but could feel silkier. Primary breath animation is subtle; secondary/ghost could have a hair more clarity.

**Muddy dark:** Hero overlay bottom 0.50→0.10 is improved but still contributes to heaviness; case-info 0.68 is heavier than hero; case card default `brightness(0.54)` and `grayscale(0.58)` make the grid very dark; `.case` background `#050505` is darker than `--bg #07070c`. Section borders and surfaces are fine; main gains are hero overlay, case-info, and case card default state.

**Contact form:** Currently three fields (name, contact, optional message). For “radically minimal” we can reduce to two: name + one contact. Removing the optional message field makes the form lighter and more direct.

**Case/hero smoothness:** Hero has loader 2s, iframe opacity transition 0.7s, poster brightness 0.97. Case pages have autoplay muted. No obvious jank; we can slightly soften case card hover transition and ensure video container doesn’t feel abrupt.

**Repo:** Root has no .md files (docs in docs/ai, docs/planning). .gitignore has .DS_Store. No clutter in root.

---

## 2. Minimal Safe Fix Plan

| # | Area | Action |
|---|------|--------|
| 1 | Buttons | Add subtle layered depth (second inset or very soft inner highlight); lighten default border to 0.18–0.20; hover fill even subtler; ensure 0.4s ease for silkier feel; keep glow under 0.04. |
| 2 | Muddy dark | Overlay bottom 0.50→0.44, 0.10→0.08; case-info 0.68→0.54, 0.12→0.08; .case img default brightness 0.54→0.60, grayscale 0.58→0.50; .case background → var(--bg). |
| 3 | Contact form | Remove optional message field; form = name + contact only; keep privacy link; update locales (formNote, remove optional message labels from form markup). |
| 4 | Smoothness | Case card transition already 0.7s; ensure hero loader and iframe opacity unchanged; optional: case hover scale 1.02 → 1.015 for subtler motion. |
| 5 | Repo | Confirm root clean; no code change if already clean. |

---

## 3. Applied Changes

- **Overlay:** Bottom gradient 0.50→0.44, 0.10→0.08, transparent 78%→80%; side 0.26→0.22, transparent 72%→74%; brand radial 0.08→0.06.
- **Case cards:** `.case` background → `var(--bg)`; hover scale 1.02→1.015; `.case img` default grayscale 0.58→0.5, brightness 0.54→0.60, background `var(--bg)`; `.case-info` gradient 0.68→0.54, 0.12→0.08, transparent 74%→76%.
- **Buttons:** Border 0.22→0.18 (watch-case, btn-minimal, secondary, ghost); layered depth via `inset 0 1px 0` top highlight + `inset 0 -1px 0` soft bottom; gradient 0.04→0.015→transparent; hover glow kept ≤0.032; transition 0.45s→0.4s, transform 0.35s→0.32s; primary border 0.26→0.24, same layered treatment.
- **Contact form:** Removed optional message field; form now name + contact only; privacy link unchanged.
- **Repo:** Root confirmed clean; no .md in root; .gitignore has .DS_Store, .cursor/.

---

## 4. Final QA

| Check | Result |
|-------|--------|
| Buttons: lighter, layered depth, refined edge, no heavy block | Pass |
| Site: less muddy, overlay and case-info lighter, case cards brighter at rest | Pass |
| Contact: two fields only (name + contact), privacy link present | Pass |
| Case hover scale subtler (1.015), hero unchanged | Pass |
| Routes, content, nav unchanged | Pass |
| No neon, no loud gradients, no template-style buttons | Pass |
| Repo root clean | Pass |

---

## 5. Changelog

**Premium button upgrades:** Non-header buttons use border 0.18, layered box-shadow (inset top + soft inset bottom), slightly lighter gradients (0.04→0.015→transparent), hover glow ≤0.032, transition 0.4s/0.32s. Primary keeps breath animation; secondary/ghost aligned. No neon, no heavy shadows.

**Dark/muddy surface fixes:** Hero overlay opacity reduced (0.44/0.08/80%, side 0.22/74%); case-info gradient 0.54/0.08/76%; case card default img brightness 0.60 grayscale 0.5; .case background var(--bg). Case hover scale 1.015.

**Minimal contact form:** Form reduced to name + one contact field; optional message field removed. Privacy link and submit behavior unchanged.

**Case/hero smoothness:** Case card hover scale 1.02→1.015; hero loader and iframe timing unchanged; case img transition remains 0.7s.

**Repo cleanup:** No changes (root already clean; .gitignore in place).

**Preserved unchanged:** All copy, structure, routes, nav, case pages, journal, CTAs to /contact.

**Remaining risks:** Form submit remains client-only (toast); autoplay on case pages may be blocked by browser.
