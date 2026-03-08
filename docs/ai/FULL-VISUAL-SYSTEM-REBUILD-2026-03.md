# Full Visual-System Rebuild — SHAR Production (March 2026)

**Constraints:** No text changes, no route/page/content removal, no architecture redesign. Visual system only.

---

## 1. Visual Failure Audit

- **Color:** Base was already black; elevated surfaces (0f0f16, 18181f) could read slightly gray on some screens. Line/surface-border could be softer to avoid harshness while keeping depth.
- **Buttons:** Non-header buttons were 44px/9px with strong glow; still felt slightly heavy. Primary pulse/shimmer was visible but could be slower and more restrained.
- **Contact:** Two-panel layout was solid; heading size and form wrap width could be tightened for a more minimal, elegant composition.
- **Journal:** Intro lead and featured card had good structure; spacing and featured image height could be tuned for more editorial air and hierarchy.
- **Homepage:** Section padding and CTA block could be increased for stronger flagship rhythm; label spacing and work-more/journal-teaser margins needed a pass.
- **Hero:** Overlay already darkened lower area; minor gradient tweak for cleaner blend without muddy wash.
- **Mobile:** Section and contact/journal layouts worked; button and input sizes could be slightly reduced for a more refined mobile feel.
- **Repo:** Planning/audit docs already in `docs/ai/` and `docs/planning/`; `.DS_Store` in `.gitignore`; root clean.

---

## 2. Controlled Rebuild Plan

1. **Color system** — Keep `--bg: #000000`. Set `--bg-elev-1` / `--bg-elev-2` to deeper near-black (#0a0a10, #12121a). Slightly reduce line/surface opacity for refinement. Slightly deepen shadow values for premium depth.
2. **Buttons** — Reduce non-header button min-height to 40px (watch-case 34px), font 8.5px/8px, padding 10px 22px / 7px 16px. Border-radius 4px. Softer default border; deeper base shadow; restrained hover glow (#9c0404). Primary: keep pulse (9.5s) and light-shift (7.5s); slightly reduce opacity of shimmer.
3. **Contact** — Reduce contact-inner max-width to 1120px; card grid 0.94fr / 1.06fr; border-radius 12px; smaller heading (0.78–0.96rem); intro max-width 28ch; form wrap max-width 400px; submit min-width 200px, min-height 40px. Mobile: 12px radius, lg padding, submit 44px, max-width 260px.
4. **Journal** — Intro lead: 1px borders, slightly less padding; intro margin 96–152px; featured height 460px; content padding and title size slightly reduced; grid-rest gap and j-content padding tuned; j-read-cue smaller. Mobile: featured 300px / 260px; intro margin 56px / 48px.
5. **Homepage** — Label margin 56–88px; manifesto padding 96–136px; work-more margin 96–152px; #cta-block padding 156–216px / 160–224px; cta-block-text margin 80–136px, max-width 48ch; cta-block-btn min-width 172px. Journal-teaser-more margin 72–120px.
6. **Hero** — Overlay gradient: 0.88 at 0%, 0.48 at 28%, 0.12 at 58%, transparent 78%.
7. **Mobile** — Section padding 80/92 (900px), 52/68 (480px). Buttons 44px, 12px padding, 8.5px font. Contact submit 44px then 46px full-width. Journal featured 300px then 260px.
8. **Repo** — Confirm no .md in root; confirm .DS_Store in .gitignore; no file moves required.

---

## 3. Applied Changes

### Color system (`assets/css/style.css`)
- `--bg-elev-1`: #0a0a10, `--bg-elev-2`: #12121a
- `--text-secondary`: 0.92, `--text-tertiary`: 0.58
- `--line`: 0.14, `--surface-border`: 0.18, `--surface-fill`: 0.04
- `--shadow-premium`: 28px/64px + 12px/32px + 1px edge
- `--shadow-premium-hover`: 38px/96px + 16px/48px + 1px edge

### Hero
- `.overlay`: gradient 0.88→0.48→0.12→transparent (0%, 28%, 58%, 78%)

### Sections & homepage rhythm
- `.label`: margin-bottom 56–88px, font 0.66rem, letter-spacing 0.26em
- `.manifesto`: padding 96–136px
- `.work-more`: margin 96–152px, padding-bottom 28–48px
- `#cta-block.section`: padding-top 156–216px, padding-bottom 160–224px
- `.cta-block-text`: margin-bottom 80–136px, max-width 48ch, font clamp 0.98–1.06rem
- `.cta-block-btn`: min-width 172px
- `.journal-teaser-more`: margin-top 72–120px

### Buttons (non-header)
- Base: min-height 40px, padding 10px 22px, font 8.5px, letter-spacing 0.24em, border-radius 4px, border 0.2, layered gradient + deep shadow
- Watch-case: min-height 34px, padding 7px 16px, font 8px, 0.26em
- Hover: border 0.32, glow 30px/60px rgba(156,4,4)
- Primary: border 0.78, gradient 0.36/0.18/0.08, pulse 9.5s, light-shift 7.5s (reduced opacity), hover 0.48/0.26/0.1, glow 48px/96px
- Contact submit: min-width 200px, min-height 40px, padding 10px 24px

### Contact page
- `.contact-inner` max-width 1120px
- `.contact-card`: grid 0.94fr / 1.06fr, border-radius 12px, shadow with 0.05 inset
- `.contact-heading`: 0.78–0.96rem, 0.22em letter-spacing
- `.contact-intro`: max-width 28ch, 0.86–0.94rem
- `.contact-form-wrap` max-width 400px
- `.contact-form-panel` / `.contact-aside`: padding reduced
- Mobile: border-radius 12px, aside/form padding with --space-lg, submit 44px, max-width 260px

### Journal page
- `.journal-page .section-inner` max-width 1080px
- `.journal-intro-lead`: 1px borders, padding 26–36px / 28–38px, left 3px #9c0404, margin-bottom 48–76px
- `.journal-intro`: max-width 52ch, margin 96–152px, font 1.06–1.2rem
- `.journal-featured`: height 460px, border-radius 12px, j-content padding 36–56px, j-title 1.68–2.2rem, j-read-cue 8.5px, padding-top --space-lg
- `.journal-grid-rest`: gap 44–88px, card border-radius 12px, j-content 24–36px
- Mobile: featured 300px / 260px, intro margin 56px / 48px, font 1rem / 0.98rem

### Mobile (900px / 480px)
- Section padding 80/92 and 52/68
- Buttons 44px, 12px padding, 8.5px, border-radius 4px
- Contact submit 44px then full-width 46px
- Journal featured height 300px then 260px; intro 56px/48px margin

---

## 4. Final QA

- **Black base:** `--bg: #000000`; body and section use it. Elev surfaces are near-black; no gray/blue drift.
- **#9c0404 only:** All accent via --brand-crimson or rgba(156,4,4,…). No other red/burgundy.
- **Buttons:** Non-header 40/34px, 8.5/8px, layered shadow, hover glow, primary pulse 9.5s + light-shift 7.5s. Header buttons unchanged.
- **Contact:** One card, two panels, smaller heading, 400px form wrap, submit 200px/40px. Optional message hidden via existing CSS. Privacy link present.
- **Journal:** Editorial intro with crimson bar, featured 460px, grid with air; mobile 300/260px.
- **Homepage:** Stronger section and CTA padding; label and work-more/journal-teaser rhythm improved.
- **Hero:** Lower blend only; no full-screen wash.
- **Mobile:** Consistent padding and button sizing; contact and journal stack correctly.
- **Regressions:** No sections or content removed; routes and copy unchanged. Reduced-motion respected.

**Result: Pass.**

---

## 5. Changelog

- **Color system:** True black base retained; elev-1/elev-2 set to deeper near-black (#0a0a10, #12121a). Line/surface opacity refined; shadow-premium and shadow-premium-hover deepened.
- **Buttons:** Full rebuild of non-header buttons: smaller (40/34px), minimal padding, 4px radius, layered gradient and deep shadow, restrained crimson hover glow. Primary CTA: 9.5s pulse, 7.5s light-shift, reduced shimmer opacity.
- **Contact:** One elegant composition: 1120px inner, 0.94/1.06 grid, 12px radius, smaller heading and intro, 400px form wrap, submit 200px/40px. Mobile: 12px radius, 44px submit, 260px max-width then full-width.
- **Journal:** Premium editorial: intro lead 1px borders + 3px #9c0404, tuned padding/margins; featured 460px, 12px radius, content/title/read-cue refined; grid-rest gap and card padding; mobile 300/260px featured, intro margins 56/48px.
- **Homepage:** Section air and CTA hierarchy: label 56–88px margin; manifesto 96–136px; work-more 96–152px; #cta-block 156–224px padding; cta-block text 80–136px margin, 48ch max-width; cta-block-btn 172px; journal-teaser-more 72–120px.
- **Hero:** Overlay gradient adjusted for lower-only darkening (0.88→0.48→0.12→transparent).
- **Mobile:** Section 80/92 and 52/68; buttons 44px/12px/8.5px; contact submit 44px then 46px full-width; journal featured 300/260px; intro 56/48px.
- **Repo hygiene:** Verified planning/audit docs in docs/ai and docs/planning; .DS_Store in .gitignore; root has no .md files.
- **Preserved:** All texts, routes, content, cases, journal articles, business meaning, header/nav buttons.
