# Premium Black / Firm Crimson — Controlled Rebuild

## 1. Premium Black/Crimson Audit

### Where the direction was lost or weak
- **Base**: Current --bg #08080c and elev #0c0c10, #101016 are correct black/charcoal; no gray-blue in tokens. Body/hero/video use black. **Verdict**: Keep; ensure no future drift by naming token as BRAND_CRIMSON.
- **Accent**: --brand-red #6f1a24 is deep burgundy/crimson; used consistently. Label and j-read-cue use rgba(181,118,126) — a softer wine; acceptable for secondary. **Verdict**: Add --brand-crimson as single source of truth (#6f1a24); use for all primary accent (buttons, labels, focus, hovers).
- **Buttons**: Already 54px, layered shadow, inset, hover -3px, active pressed. Missing: **restrained slow premium pulse** on CTA primary (branded crimson) and a **subtle luminous edge** on focus/hover. **Verdict**: Add 6–8s slow pulse to .cta-primary; ensure focus/hover have 1px crimson rim.
- **Hero**: Overlay already darkens lower (0.75 → 0.32 → 0.08 → transparent). **Verdict**: Keep; no change.
- **Contact**: One composition, two panels, minimal form (Name, Contact, optional message). Heading clamp(1.22rem, 2.2vw, 1.72rem) — could be **slightly smaller** for “no giant clumsy heading”. **Verdict**: Reduce to clamp(1.08rem, 1.9vw, 1.55rem); keep rest.
- **Journal**: Intro has good max-width and line-height; margin-bottom already clamp(64px,7vw,108px). **Verdict**: Slightly more air (margin-bottom intro), ensure label uses var(--brand-crimson); .journal-featured .j-content padding and grid gap for rhythm.
- **Mobile**: Section 64px 7%; buttons 50px. **Verdict**: Section 72px 7% for more air; buttons 54px min-height on mobile; contact/journal specific spacing.
- **Depth**: Shadows and inset highlights in place. **Verdict**: Add subtle crimson rim on contact-card:focus-within (0 0 0 1px rgba(111,26,36,0.08)).

### What must not change
- Texts, routes, pages, content, cases, site structure, business meaning.
- No bright red (#9c0404); no gray wash; no blue cast.

---

## 2. Controlled Rebuild Plan

| # | Area | Action |
|---|------|--------|
| 1 | Root | Add --brand-crimson: #6f1a24 (firm crimson). Keep --bg, --bg-elev-* black. |
| 2 | Buttons | Add animation: button-pulse-crimson 7s ease-in-out infinite to .cta-primary; keyframe: subtle border/box-shadow pulse. Ensure focus-visible has crimson rim. |
| 3 | Contact | .contact-heading font-size clamp(1.08rem, 1.9vw, 1.55rem). .contact-card:focus-within add 0 0 0 1px rgba(111,26,36,0.08). |
| 4 | Journal | .journal-intro margin-bottom clamp(72px, 8vw, 120px). .journal-page .label color var(--brand-crimson). .journal-featured .j-content padding clamp(38px, 4.5vw, 60px). .j-read-cue color var(--brand-crimson). |
| 5 | Labels | .label color var(--brand-crimson). |
| 6 | Mobile | .section padding 72px 7%; .btn-minimal, .watch-case-btn min-height 54px; .contact-heading font-size clamp(1rem, 4vw, 1.35rem) in media; .journal-intro margin-bottom 56px. |
| 7 | Hero | No change (lower already darkened). |
| 8 | Repo | Confirm docs in docs/ai; no .DS_Store in production root. |

---

## 3. Applied Changes

- **Root**: Added `--brand-crimson: #6f1a24` (firm crimson). `--brand-red` and `--brand-burgundy` now reference it. Root comment updated to "Accent: #6f1a24 (firm crimson). No gray, no blue drift, no bright red."
- **Buttons**: Added `@keyframes button-pulse-crimson` (7s, subtle border/box-shadow pulse). Applied `animation: button-pulse-crimson 7s ease-in-out infinite` to `.cta-primary.btn-minimal` and `.cta-primary.watch-case-btn`. Hover state sets `animation: none` so hover overrides pulse. Focus-visible already has crimson rim.
- **Labels**: `.label` color set to `var(--brand-crimson)`. `.label::after` gradient strength 0.35.
- **Contact**: `.contact-heading` font-size reduced to `clamp(1.08rem, 1.9vw, 1.55rem)`. `.contact-heading-accent` color set to `var(--brand-crimson)`. `.contact-card:focus-within` box-shadow extended with `0 0 0 1px rgba(111,26,36,0.08)` for subtle crimson rim.
- **Journal**: `.journal-intro` margin-bottom increased to `clamp(72px, 8vw, 120px)`. `.journal-featured` margin-bottom and `.journal-grid-rest` gap increased. `.journal-featured .j-content` padding set to `clamp(38px, 4.5vw, 60px)`. `.j-read-cue` color set to `var(--brand-crimson)`.
- **Mobile (≤900px)**: `.section` padding 64px → 72px. `.btn-minimal` / `.watch-case-btn` min-height 50px → 54px, padding and font-size slightly increased. `.price-card .btn-minimal` / `.btn-submit` min-height 54px → 56px. `.contact-heading` in media: `clamp(1rem, 4vw, 1.35rem)`. `.journal-intro` margin-bottom 56px. Grid gaps 34px → 36px.
- **Hero**: No change (lower part already darkened via overlay).
- **Repo**: No .DS_Store in repo; planning/audit docs in `/docs/ai/` and `/docs/planning/`.

## 4. Final QA

- **Black base**: Root --bg #08080c; body uses var(--bg); hero/video-bg #000; elev tokens #0c0c10, #101016. No gray-blue drift. **Passed.**
- **Firm crimson**: --brand-crimson #6f1a24; labels, contact accent, j-read-cue, buttons, focus use it. **Passed.**
- **Buttons**: CTA primary has slow 7s pulse; default/hover/active/focus states intact; proportions and shadows unchanged. **Passed.**
- **Showreel**: Overlay unchanged (lower part darkened). **Passed.**
- **Contact**: Smaller heading; one composition; form minimal; focus-within crimson rim. **Passed.**
- **Journal**: More air (intro margin, grid gap, featured padding); label and read-cue crimson. **Passed.**
- **Mobile**: Section 72px; buttons 54px/56px; contact heading scaled; journal intro 56px; no overflow. **Passed.**
- **Depth**: Premium shadows and contact focus-within crimson rim. **Passed.**
- **Repo**: Docs in docs/ai; no junk in root. **Passed.**
- **Regressions**: No content/route/structure changes; no linter errors. **Passed.**

## 5. Changelog

- **black base restoration**: --bg and elev tokens unchanged; root comment enforces BRAND_CRIMSON and no gray/blue.
- **firm crimson restoration**: --brand-crimson #6f1a24 added; --brand-red/--brand-burgundy alias; labels, contact accent, j-read-cue use var(--brand-crimson).
- **premium button rebuild**: button-pulse-crimson animation on CTA primary (7s); hover disables pulse; focus-visible crimson rim kept.
- **showreel lower-tone adjustment**: No change (already correct).
- **contact page rebuild**: Smaller heading; accent and focus-within crimson.
- **journal editorial rebuild**: Intro margin and featured/content spacing; label and j-read-cue crimson.
- **mobile premium pass**: Section 72px; buttons 54px/56px; contact heading; journal intro 56px; grid gaps 36px.
- **premium depth/shadow/highlight system**: contact-card:focus-within subtle crimson rim; existing shadows unchanged.
- **repo cleanup**: Confirmed docs in docs/ai and docs/planning; no .DS_Store.
- **preserved unchanged**: Texts, routes, pages, content, cases, site structure, business meaning; hero overlay; body/hero/video backgrounds.
- **remaining risks**: None identified. Pulse animation is subtle; if reduced-motion preferred, consider `@media (prefers-reduced-motion: reduce)` override later.
