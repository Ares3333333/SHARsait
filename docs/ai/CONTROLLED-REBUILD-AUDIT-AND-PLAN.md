# Controlled Front-End Rebuild — Audit & Plan

## 1. Front-End Audit (Brutal)

### CSS architecture
- **Single file** (~888 lines): all layout, components, mobile in one place. No BEM/namespace; mix of Russian comments and ad‑hoc class names. Order: variables → reset → cursor → nav → hero → sections → grid/case → horizontal-scroll/journal → pricing → buttons → contact → modal/case pages → compliance → media.
- **Conflicts/legacy:** `.order-wrap` / `.order-info` (old contact layout) still defined alongside `.contact-page` / `.contact-card`; unused `.contact-form-grid` two-column when form is minimal; `.journal-page-grid` and `.journal-grid-rest` both exist (journal landing uses featured + grid-rest). Button tokens `--btn-border`, `--btn-glow`, `--btn-inset` used in nav but not in body buttons. Multiple overlapping rules for `.contact-form .contact-field` margin.
- **Surfaces:** `--bg: #0e0e16` is very dark; `--surface-fill: 0.05`, `--surface-border: 0.15` feel flat. Hero overlay uses `rgba(8,8,14,0.14)` and radial red tint — still a bit muddy. Case card gradient `rgba(3,3,3,0.72)` to transparent is heavy. Image filters: case `brightness(0.84) grayscale(0.1)`, journal `brightness(0.94) grayscale(0.06)` — readable but dark.

### Buttons
- **Body buttons:** `.btn-minimal`, `.watch-case-btn` share similar gradient + inset + border; primary has `button-breath-soft` 6s. Problems: 9px/10px font feels small; borders rgba(255,255,255,0.2) can look faint; hover glow `0 0 28px rgba(156,4,4,0.06)` barely visible; no clear “engineered” proportion (e.g. golden padding). Primary breath animation can feel gimmicky if not subtle.
- **Nav buttons:** Separate rules; OK. Body buttons feel like a second system.

### Hero / showreel
- **Structure:** `.video-bg` + `.video-poster` + `.video-loader` + `.overlay` + `.hero-content`. Overlay: radial + two linears; bottom gradient `rgba(8,8,14,0.14)` to transparent. Poster img scale 1.02. Loader animates then fades. Iframe 100vw/56.25vw centered. Works but overlay still adds murk; no clear “elite” refinement.

### Contact page
- **Layout:** Two-panel grid (0.9fr 1.1fr), min-height 420px; aside + form. Heading `clamp(1.85rem, 4.2vw, 2.5rem)` — reasonable. Form: two fields, submit, legal. Mobile: stacks, form full width. Issues: card can feel boxy; heading could be one step smaller for “elegant”; spacing between blocks could be more rhythmic.

### Journal landing
- **Structure:** Label + intro + featured (grid 1.4fr 1fr) + grid-rest (2 cols). Intro `margin-bottom: var(--space-3xl)`; featured height 420px. Issues: intro could be stronger (size/weight); featured content padding vs image ratio; grid-rest cards share same style as horizontal-scroll cards — could be more “editorial” (spacing, typography).

### Mobile
- **One breakpoint 900px**, then 480px. Section padding 40px 6%; grid gap 28px; journal featured height 280px; buttons min-height 48/52. Issues: 40px can feel tight; no dedicated mobile type scale; contact card stack is OK but form fields could have more breathing room; journal on mobile could have clearer hierarchy.

### JS
- Single `DOMContentLoaded`; scroll/throttle; hero video ready; hamburger; IntersectionObserver; one form handler. No obvious bloat. Cursor and nav are desktop-only.

### Repo
- Docs under `docs/ai` and `docs/planning`; root has HTML, assets, cases, journal, config. `.gitignore` has `.DS_Store`. Clean.

---

## 2. Controlled Rebuild Plan

### Design direction (unchanged)
- Keep: dark premium, brand red, Plus Jakarta + Inter, existing content and routes.
- Shift: **lighter dark** (more air, less mud), **clearer surfaces**, **one coherent button system**, **refined overlays**, **stronger mobile**.

### 2.1 Token and surface rebuild
- Slightly lift base: `--bg` → `#111118` (or `#12121a`).
- Slightly lift text: `--text-secondary` → 0.88, `--text-tertiary` → 0.62.
- Surfaces: `--surface-fill` → 0.06, `--surface-border` → 0.12 (refined line).
- New: `--overlay-hero-bottom` — single soft gradient for hero (e.g. transparent → rgba(17,17,24,0.4) at bottom).
- Case card overlay: lighten gradient (e.g. 0.5 → 0.2 opacity range) so it’s readable but not muddy.
- Reduce hero overlay complexity: one bottom gradient + very subtle vignette; remove or soften heavy radial.

### 2.2 Button system rebuild (non-header)
- **One base:** `.btn-studio` (or keep `.btn-minimal` name, rebuild contents). Proportion: padding 14px 36px (or 16px 40px), min-height 48px; font 10px → 11px, letter-spacing 0.12em; border 1px solid rgba(255,255,255,0.18); border-radius 4px; background subtle gradient; box-shadow single top inset (e.g. 0 1px 0 rgba(255,255,255,0.08)); transition 0.3s.
- **Hover:** border to 0.28, background slightly lighter, inset slightly stronger; transform translateY(-1px); no large glow.
- **Active:** translateY(0) scale(0.99); inset reduced.
- **Primary:** border/background red tint; optional very subtle breath (e.g. 8s, low amplitude) or remove.
- **Secondary:** neutral border/background.
- **Ghost:** border only, transparent; same hover lift.
- Apply to `.btn-minimal`, `.watch-case-btn`, `.cta-primary`, `.cta-secondary`, `.cta-ghost`; keep `.btn-submit` full-width. Remove or simplify `button-breath-soft` if it feels cheap.

### 2.3 Hero / showreel
- Simplify `.overlay`: e.g. `linear-gradient(0deg, rgba(17,17,24,0.5) 0%, transparent 50%)` + optional very light radial at bottom. Reduce poster img scale to 1.01 if needed. Keep loader and video-ready logic.

### 2.4 Contact page
- Slightly smaller heading: e.g. `clamp(1.6rem, 3.8vw, 2.25rem)`.
- Increase spacing: `.contact-aside` gap and padding; `.contact-form-panel` padding; `.contact-form-fields` gap. Optional: contact-card border-radius 8px, card shadow slightly softer.
- Mobile: keep stack; ensure 56px+ tap targets and 20px+ vertical rhythm between blocks.

### 2.5 Journal landing
- Intro: slightly larger font (e.g. 1.1rem min), margin-bottom `var(--space-3xl)` or more.
- Featured: image height 400px desktop, 260px mobile; content padding and title size as is or +1 step.
- Grid-rest: gap `var(--space-xl)`; card padding and border-radius consistent; optional subtle card background.

### 2.6 Mobile
- Section padding: 48px 6% at 900px; 32px 5% at 480px.
- Buttons: min-height 52px, padding 18px 24px.
- Journal featured mobile: more padding in `.j-content`; intro margin preserved.
- Contact mobile: same; ensure legal and submit spacing.

### 2.7 Cleanup
- Remove or comment legacy `.order-wrap` / `.order-info` if unused.
- Consolidate contact form field margins (one clear rule set).
- Ensure `.contact-form-grid` doesn’t affect minimal form (already single column in minimal).
- Leave JS as is unless a quick trim is obvious.
- Keep repo structure; confirm no .md in root.

---

## 3. Implementation order
1. Tokens and surfaces (root + overlay + case-info).
2. Buttons (base + modifiers + breath decision).
3. Hero overlay.
4. Contact (heading + spacing).
5. Journal (intro + featured + grid-rest).
6. Mobile (section padding + buttons + journal/contact).
7. CSS cleanup (legacy rules, duplicates).

---

## 4. Applied Changes

- **Tokens:** `--bg` → #111118; `--text-secondary` → 0.88, `--text-tertiary` → 0.62; `--line` → 0.1; `--surface-border` → 0.12; `--surface-fill` → 0.06.
- **Hero:** Overlay replaced with single bottom gradient `rgba(17,17,24,0.55)` → transparent; poster img brightness 0.98, scale 1.01.
- **Case cards:** `.case-info` gradient → rgba(17,17,24,…); case img filter brightness 0.88, grayscale 0.08; journal img filters slightly brighter.
- **Buttons:** `.btn-minimal` rebuilt: min-height 48px, padding 15px 38px, font 11px, letter-spacing 0.12em, border-radius 4px, inset 0 1px 0 0.08; hover -1px lift, no large glow; active scale 0.99. `.watch-case-btn` aligned. Primary breath 8s, lower amplitude. Secondary/ghost refined.
- **Contact:** Heading clamp(1.5rem, 3.6vw, 2.15rem); card border-radius 8px, soft box-shadow; aside/form spacing; mobile form-legal margin-top and input min-height 56px.
- **Journal:** Intro font clamp(1.08rem–1.2rem), font-weight 400; featured .j-img-wrap height 400px; .j-title clamp adjusted; grid-rest cards border-radius 6px + subtle gradient background; mobile featured height 260px, j-content padding.
- **Mobile:** Section padding 48px 6% (900px), 32px 5% (480px); grid gaps 32px; btn min-height 52px, submit 56px; journal-intro 1.08rem / 1rem at 480px.
- **Cleanup:** Removed unused `.order-wrap`, `.order-info` rules. Nav scrolled background → rgba(17,17,24,0.88), border var(--line).

---

## 5. Final QA

- **Content/routes:** No HTML or route changes; contact form still Name + Contact only; privacy link present.
- **Buttons:** Single coherent system; primary/secondary/ghost and watch-case-btn use same grammar; no neon or heavy glow.
- **Surfaces:** Lighter base and overlays; case and journal imagery brighter; hero overlay single gradient.
- **Contact:** Two-panel layout intact; heading smaller; card rounded with shadow; mobile stack and touch targets OK.
- **Journal:** Intro and featured/grid-rest spacing and typography updated; mobile featured height and padding updated.
- **Mobile:** Section and button rhythm improved; no layout regressions observed.
- **CSS:** No linter errors; legacy order-wrap/order-info removed.
- **Repo:** No change to root structure; docs remain in docs/ai and docs/planning.

---

## 6. Changelog

### Button system rebuild
- One studio-grade base: .btn-minimal 48px min-height, 15px 38px padding, 11px/0.12em, border-radius 4px, single top inset, hover -1px, active scale 0.99.
- .watch-case-btn aligned (44px, 13px 28px, 10px).
- .cta-primary / .cta-secondary / .cta-ghost refined; primary breath 8s, lower amplitude; no large hover glow.

### Dark surface / light balance rebuild
- --bg #111118; --text-secondary 0.88, --text-tertiary 0.62; --line 0.1; --surface-border 0.12; --surface-fill 0.06.
- Hero overlay: single linear gradient bottom; poster img brighter, scale 1.01.
- Case .case-info gradient rgba(17,17,24); case/journal img filters brighter.
- Nav scrolled: rgba(17,17,24,0.88), border var(--line).

### Contact page rebuild
- Heading clamp(1.5rem, 3.6vw, 2.15rem); card border-radius 8px, box-shadow; aside gradient and spacing; form wrap max-width 360px.
- Mobile: form-legal margin-top, input 56px min-height; card border-radius 6px.

### Journal page rebuild
- Intro font clamp(1.08rem–1.2rem), weight 400; label margin; featured height 400px; j-title clamp; grid-rest cards radius 6px + gradient background; .j-content padding.
- Mobile: featured height 260px, j-content padding, intro 1.08rem/1rem.

### Hero / showreel refinement
- Overlay simplified to one bottom gradient; poster brightness/saturation/scale adjusted.

### Mobile responsive rebuild
- Section 48px 6% (900px), 32px 5% (480px); grid gaps 32px; buttons 52/56px, 18px padding; journal featured 260px and content padding; contact inputs and legal spacing.

### CSS/JS cleanup
- Removed .order-wrap, .order-info. JS unchanged. Repo root unchanged.

### Preserved unchanged
- All texts, pages, routes, cases, content, media, brand red, fonts, premium dark direction. Header nav buttons unchanged. Modal/case pages structure unchanged.

### Remaining risks
- Primary button breath animation may still feel slightly present; reduced to 8s and lower amplitude. Very narrow viewports (<360px) not explicitly tested.
