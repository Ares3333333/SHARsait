# Button System + Premium Dark Atmosphere Rebuild

## 1. Audit

**Current problems:**
- Non-header buttons are too large (62px min-height, 22px 56px padding), heavy and blunt.
- Proportions feel template-like; need smaller, more refined, airy styling.
- Header buttons (.btn-nav-premium, .phone-link) must remain untouched.
- Hero overlay already darkens lower portion; can strengthen to ~25% for better blend.
- CTA/section spacing can be refined for more premium rhythm.

**In scope:** .btn-minimal, .watch-case-btn, .cta-primary, .cta-secondary, .cta-ghost, .btn-submit (and any .price-card .btn-minimal, .work-more .btn-minimal, etc.). Hero .overlay. Spacing around CTAs.
**Out of scope:** .btn-nav-premium, .phone-link, architecture, texts, routes, content.

---

## 2. Plan

| # | Item | Action |
|---|------|--------|
| 1 | Button size | Reduce to min-height 46px, padding 14px 38px; font-size 10px; letter-spacing 0.16em; border-radius 6px. |
| 2 | Button depth/glow | Keep layered shadow (slightly smaller spread), soft crimson glow, slow pulse, subtle shimmer; reduce hover lift to -2px. |
| 3 | Primary CTA | Same proportions; crimson border/fill/glow slightly restrained but premium; pulse 8s. |
| 4 | Hero overlay | Darken lower ~25%: gradient 0.88 at 0%, 0.5 at 22%, 0.15 at 50%, transparent 72%. |
| 5 | CTA/spacing | Add margin-top to .work-more, .cta-block; ensure .price-card .btn-minimal has air; .watch-case-btn margin-top. |
| 6 | Mobile | Non-header buttons 46px min-height, padding 14px 32px. |

---

## 3. Applied Changes

- **Non-header buttons (.btn-minimal, .watch-case-btn):** min-height 62px→46px, padding 22px 56px→14px 38px, font-size 11px→10px, letter-spacing 0.2em→0.16em, border-radius 8px→6px. Border 0.3→0.22. Background gradient and shadows scaled down (12px 36px, 4px 20px). Refined ::before highlight.
- **Focus:** outline 2px→1px, offset 3px→2px; glow values reduced for smaller footprint.
- **Hover:** lift -4px→-2px; shadow 14px 44px, 6px 24px; soft crimson glow 24px/48px.
- **Active:** lift 2px→1px; inset shadow slightly reduced.
- **Primary CTA:** border rgba(156,4,4,0.72), fill gradient 0.36/0.16/0.08. Shadow 12px 36px + 4px 20px; crimson glow 28px/56px. Pulse keyframes scaled to 12px 36px shadows, 24px/48px→32px/64px glow. Light-shift 7s, opacity 0.35↔0.6. Hover: -2px lift, 16px 48px shadow, 32px/64px glow.
- **Secondary CTA:** Same smaller proportions; border 0.24; shadows 12px 36px, 4px 20px. Hover -2px, 24px/48px crimson glow.
- **Hero overlay:** Lower ~25% darkened: 0.82→0.88 at 0%, 0.38→0.5 at 22%, 0.1→0.15 at 50%, 75%→72% transparent.
- **Spacing:** .work-more margin-top space-xl→space-2xl, padding-bottom space-md. .cta-block-btn min-width 200px→160px. .watch-case-btn margin-top space-md→space-lg.
- **Contact submit:** min-height 62px→46px.
- **Mobile:** .btn-minimal/.watch-case-btn min-height 46px, padding 14px var(--space-lg), font 10px, letter-spacing 0.15em, border-radius 6px. .price-card .btn-minimal, .btn-submit 14px var(--space-md), min-height 46px. work-more/journal-teaser-more button padding 14px var(--space-xl).
- **Header:** .btn-nav-premium and .phone-link unchanged.

## 4. QA

- Header buttons (.btn-nav-premium, .phone-link): untouched.
- Non-header buttons: smaller (46px), refined proportions, 6px radius, 10px/0.16em.
- Black base and #9c0404 accent: preserved; no gray/blue drift.
- Primary: soft crimson glow, 8s pulse, 7s light-shift; hover -2px, restrained glow.
- Hero: lower portion darker (~25%), gradient 0.88→0.5→0.15→transparent.
- Spacing: work-more and CTA block more air; no structural/layout changes.
- Mobile: same 46px buttons, consistent padding.
- No changes to architecture, texts, routes, content.

## 5. Changelog

- **Button system:** Non-header buttons rebuilt to smaller, minimal, premium proportions (46px, 14px 38px, 10px, 0.16em, 6px radius); layered depth, elegant border, deep shadow, soft #9c0404 glow, slow pulse, subtle shimmer; refined hover (-2px) and active (1px); primary/secondary/ghost and submit aligned.
- **Hero:** Overlay gradient strengthened on lower ~25% for better blend into black shell.
- **Atmosphere:** work-more and CTA spacing refined; cta-block-btn min-width reduced for refined look.
- **Preserved:** Header nav buttons, site structure, content, routes, texts. Black base and #9c0404 accent only.
