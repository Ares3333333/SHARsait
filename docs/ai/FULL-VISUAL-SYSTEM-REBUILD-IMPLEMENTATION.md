# Full Visual-System Rebuild — Implementation Log

**Date:** 2026  
**Scope:** CSS-only visual rebuild. No text, routes, content, or architecture changes.

---

## 1. Visual Failure Audit (pre-rebuild)

- **Color:** Elevation `#07070b` / `#101015` too close to `#000`; cards read flat. Section radial gradients at 0.018–0.022 opacity added no visible value.
- **Buttons:** Non-header buttons already refined (40px, 8px, pulse+shimmer) but base proportions and shadow stack could be tuned for clearer “premium object” feel; submit and CTA block needed consistent min-height.
- **Contact:** Two-panel layout good; heading size and form-wrap max-width could be tightened; empty `.contact-form-wrap:focus-within` rule present.
- **Journal:** Intro and featured/grid spacing and borders could be more editorial; homepage journal cards had default crimson rim (0.08) — neutralized to surface-border for consistency.
- **Homepage:** Section gradients removed for cleaner flagship feel; CTA block padding and text/button rhythm strengthened.
- **Hero:** Overlay gradient tuned (slightly lighter mid-band) so only lower area darkens for blend.
- **Mobile:** Single 900px breakpoint did most work; touch targets and contact/journal stacking refined (44px buttons, explicit panel padding).

---

## 2. Controlled Rebuild Plan

1. **Color system:** Raise elevation to `#0c0c12` / `#14141c`; set line/surface-border from design tokens; enrich shadow-premium stack; remove invisible section backgrounds.
2. **Buttons:** Slight increase to 42px/8.5px base; 36px watch-case; 4px radius; deeper default shadow; keep pulse + light-shift on primary only; contact submit 42px, mobile 44px.
3. **Contact:** Smaller heading (0.9–1.1rem); intro max-width 32ch; card 0.95fr/1.05fr, 12px radius, solid bg (no gradient); form-wrap 480px; remove empty focus-within rule.
4. **Journal:** Intro-lead with top+bottom border; intro margin and font-size tuned; featured 1.5fr/1fr, 480px image, 12px radius; grid-rest gap and card radius increased; journal-label tertiary; cards use var(--surface-border), hover crimson 0.06.
5. **Homepage:** Labels use var(--text-tertiary) and var(--line); manifesto padding up; work-more and journal-teaser-more margins tuned; cta-block padding and text/btn spacing increased.
6. **Hero:** Overlay gradient 0.9 → 0.52 → 0.14 → transparent (slightly adjusted stops).
7. **Mobile:** Section padding 96px 6%; journal featured 340px / 280px (480); buttons 44px min-height, 12px padding; contact panels explicit padding; 480px section 60px, journal intro 48px, submit full-width 44px.

---

## 3. Applied Changes

### Color system
- `--bg-elev-1`: `#07070b` → `#0c0c12`
- `--bg-elev-2`: `#101015` → `#14141c`
- `--text-secondary`: 0.91 → 0.92; `--text-tertiary`: 0.66 → 0.64
- `--line`: 0.15 → 0.12; `--surface-border`: 0.18 → 0.14; `--surface-fill`: 0.07 → 0.05
- `--shadow-premium` / `--shadow-premium-hover`: deeper, with 1px rim
- `.social-proof.section`, `#work`, `#pricing`, `#journal`: background set to transparent

### Buttons (non-header)
- Base: min-height 40→42px, padding 10px 22px→11px 24px, font-size 8→8.5px, letter-spacing 0.24→0.2em, border-radius 3→4px, border 0.24→0.2
- Shadow stack: 22px 56px, 10px 30px, 1px rgba(0,0,0,0.4)
- watch-case-btn: min-height 32→36px, padding 7px 14px→8px 18px, font-size 7.6→8px, letter-spacing 0.25→0.22em
- Contact submit: min-width 180→200px, min-height 40→42px, margin-top xs→sm

### Contact page
- contact-card: columns 0.92/1.08 → 0.95/1.05; border var(--line); border-radius 10→12px; shadow with 0.04 inset, 0.28 rim
- contact-heading: clamp(1, 1.45vw, 1.26)→(0.9, 1.25vw, 1.1)rem; letter-spacing 0.2→0.18em
- contact-heading-accent: margin-top 0.16→0.12em; text-shadow 0.14→0.1
- contact-intro: max-width 34→32ch; font-size clamp(0.92,1.1,0.98)→(0.88,1.05,0.94)rem; line-height 1.78→1.76
- contact-aside: padding (32,4,48)(24,2.6,36); background solid var(--bg-elev-1)
- contact-form-panel: background solid var(--bg-elev-2)
- contact-form-wrap: max-width 520→480px; removed empty `.contact-form-wrap:focus-within { }`

### Journal page
- journal-page .section-inner: 1160→1120px
- journal-page .label: margin-bottom var(--space-lg)→var(--space-xl)
- journal-label: 0.74→0.72rem; letter-spacing 0.24→0.26em; color var(--text-tertiary)
- journal-intro-lead: border-bottom rgba(0.08)→var(--line); padding top/bottom increased; margin-bottom (42,5,64)→(48,5.5,72)
- journal-intro: max-width 62→56ch; margin-bottom (104,11,158)→(100,11,160); font-size (1.1,1.54,1.24)→(1.08,1.45,1.2)rem; line-height 1.92→1.9
- journal-featured: columns 1.55/1→1.5/1; border var(--surface-border); border-radius 10→12px; shadow 0.03→0.04 inset; hover border 0.2→0.22, crimson 0.08→0.06
- journal-featured .j-img-wrap: height 520→480px
- journal-grid-rest: gap (44,4.8,84)→(52,5.5,96); card border-radius 10→12; shadow + 0.03 inset; hover border 0.2→0.22, crimson 0.08→0.06; .j-content padding (22,2.2,32)→(26,2.5,36)
- journal-card (teaser): border var(--surface-border); border-radius 8→10; removed default crimson rim; shadow inset 0.05→0.04; hover border 0.24, crimson 0.08, transform -4px→-3px

### Homepage rhythm
- .label: font-size 0.7→0.68rem; color rgba(0.66)→var(--text-tertiary); letter-spacing 0.22→0.24em; margin-bottom (58,7,86)→(52,6.5,80)
- .label::after: gradient rgba(0.14)→var(--line)
- .manifesto: padding (84,9,120)→(88,9.5,128)
- .work-more: margin-top (96,10,154)→(88,9.5,144); padding-bottom (20,3,42)→(24,3,44)
- #cta-block.section: padding top (142,14,196)→(148,15,204); bottom (144,15,202)→(152,16,212)
- .cta-block-text: margin-bottom (66,8,120)→(72,8.5,128); max-width 54→52ch; font-size (1.02,1.3,1.14)→(1,1.25,1.1)rem; line-height 1.82→1.8
- .cta-block-btn: min-width 160→180px; margin-top sm→md
- .journal-teaser-more: margin-top (72,8,128)→(64,7.5,112)
- --section-pad-y: (136,14,188)→(128,13.5,180)

### Hero
- .overlay: gradient 0.92→0.9, 0.58→0.52, 0.18→0.14, 74%→76%

### Mobile (900px)
- .section: padding 104→96px
- .label: margin-bottom var(--space-xl)→var(--space-lg)
- .grid: gap 32→36px
- .journal-page-grid, .journal-grid-rest: gap 36→40px
- .journal-featured .j-img-wrap: 360→340px
- .journal-featured .j-content: padding (32,6.5,48)(space-lg)→(28,6,44)(space-lg)
- .journal-intro: margin-bottom 68→56px; font-size 1.04→1rem; line-height 1.88→1.86
- .btn-minimal, .watch-case-btn: min-height 40→44px; padding 10→12px var(--space-md)→var(--space-lg); font-size 7.8→8px; letter-spacing 0.22→0.2em; border-radius 3→4px
- .price-card .btn-minimal, .btn-submit: padding 10→12px var(--space-md)→var(--space-lg); min-height 40→44px
- .contact-heading: clamp(0.96,3.7,1.18)→(0.92,3.5,1.12)rem
- .contact-aside, .contact-form-panel: explicit padding var(--space-2xl) var(--space-lg)
- .work-more .btn-minimal, .journal-teaser-more .btn-minimal: padding 11→12px var(--space-lg)→var(--space-xl)
- .hero: padding bottom (68,12,96)→(72,12,100)

### Mobile (480px)
- .section, .manifesto: padding 64→60px
- .journal-featured .j-img-wrap: 264→280px
- .journal-intro: margin-bottom 52→48px
- .contact-form .btn-submit: width 100%; min-width 0; min-height 44px

---

## 4. Final QA

- **Black base:** `--bg: #000000`; body and hero use it. Pass.
- **Accent #9c0404:** Only accent; all rgba brand use (156,4,4). Pass.
- **Buttons:** Non-header rebuilt (42/36px, 8.5/8px, 4px radius, deep shadow, pulse+shimmer on primary); header untouched. Pass.
- **Contact:** One composition; smaller heading; solid panels; form 480px; Name + Contact; optional message hidden; privacy linked. Pass.
- **Journal:** Editorial intro (borders, spacing); featured 1.5/1, 480px; grid gap and card radius; labels tertiary. Pass.
- **Homepage:** Section air via --section-pad-y and CTA block padding; labels tertiary; work-more and journal-teaser spacing; no invisible gradients. Pass.
- **Hero:** Lower-only darkening overlay; no full muddy wash. Pass.
- **Mobile:** 96px section padding; 44px buttons; contact panels padded; journal 340/280px; submit 44px full-width at 480px. Pass.
- **Regressions:** None. Lint clean. Header, nav, and content unchanged.

---

## 5. Changelog

- **color system:** Elevation to 0c0c12/14141c; line/surface from tokens; richer shadows; section backgrounds transparent.
- **buttons:** Base 42px, 8.5px, 4px radius; watch-case 36px; deeper shadows; contact submit 42px; mobile 44px.
- **contact:** Smaller heading and intro; card 0.95/1.05, 12px radius; solid panels; form-wrap 480px; removed empty rule.
- **journal:** Intro borders and spacing; featured 1.5/1, 480px, 12px radius; grid gap and card padding; tertiary label; cards surface-border, restrained crimson hover.
- **homepage:** Label tertiary and tokenized; manifesto padding; work-more and journal-teaser margins; cta-block padding and CTA text/btn; section-pad-y tuned.
- **hero:** Overlay gradient adjusted for lower-only blend.
- **mobile:** Section 96px; buttons 44px; contact padding; journal 340/280px; 480px section 60px, submit 44px full-width.
- **preserved:** All copy, routes, content, media, cases, journal articles, nav, header buttons, form behavior, i18n.
- **repo:** .DS_Store in .gitignore; no root .md; planning/audit docs in docs/ai and docs/planning.
