# SGAER Visual Reference Rebuild — Cleaner, Minimal, Expensive

**Date:** 2026-03  
**Reference:** https://sgaer.vercel.app/ (visual source of truth).  
**Constraint:** No content/route/architecture change. Visual system and front-end styling only.  
**Direction:** Return to premium SGAER feel, then refine so the site feels **cleaner, more minimal, more expensive, more precise, less noisy, less template-like, less clumped, more studio-grade.**

---

## 1. Visual Difference Audit

### Current SHAR vs. premium SGAER direction

| Area | Gap | Cause |
|------|-----|--------|
| **Accents** | Section/label/footer accents were strong but could feel loud. | Solid #9c0404 bars and 2px lines read bold; SGAER direction is refined, not shouty. |
| **Buttons** | Size and weight felt a bit heavy (42px, 9px font). | Premium reference uses smaller, more refined CTAs with clear hierarchy. |
| **Case cards** | Black depth and crimson ring present but hover was heavy (double ring, 64px glow). | Cinema feel should be deep black + restrained crimson edge, not busy. |
| **Contact** | Heading size could dominate; card had 8px accent and large padding. | Premium inquiry page = calm hierarchy, no giant title, elegant spacing. |
| **Journal** | Good structure; intro/featured could be tighter and more editorial. | Thinner borders, 6px accent, more air in margins for editorial rhythm. |
| **Homepage** | CTA block could use more breathing room. | Flagship = more section air, refined CTA copy block. |
| **Hero** | Overlay already good. | Slight extra darkening at very bottom improves blend into black shell. |
| **Mobile** | Buttons 46px; contact aside had duplicate padding. | Refined = 44px buttons, single clear padding value. |
| **Overall** | Identity was there but execution could be more precise and minimal. | Less visual noise, more restraint, same black + #9c0404 authority. |

### Root cause

Visual system was aligned to SGAER in spirit but needed a **refinement pass**: smaller type and controls, thinner accents, softer glows, and more air so it reads as expensive and minimal, not template-like or clumped.

---

## 2. Controlled Rebuild Plan

1. **Black + crimson system** — Keep true black and #9c0404 only. Refine: section top = gradient fade (not solid bar); label = 1px accent, 32px width; footer/CTA = 1px, shorter; all accents visible but precise.
2. **Case cards** — Keep #000 and cinematic overlay. Refine: border-radius 8px; idle crimson ring 0.08; hover = single ring + 48px glow, scale 1.015; deeper inset shadow for “screen” depth.
3. **Buttons** — Rebuild non-header buttons: min-height 38px (watch 34px), padding 9px 20px (watch 7px 16px), font 8.5px (watch 8px), border-radius 4px; shadows slightly lighter; primary CTA pulse tuned to 7.5s with refined glow values; hover lift -2px.
4. **Contact** — No giant heading: font-size clamp(0.75rem, 1vw, 0.9rem). Card: 6px left accent, min-height 400px, border-radius 12px; aside/form padding reduced for calm; focus glow 64px at 0.14.
5. **Journal** — Intro lead: 1px top/bottom border, 6px left, more margin-bottom; intro text margin-bottom increased; featured: 6px left, 12px radius; hover glow 56px at 0.12.
6. **Homepage** — CTA block: more padding top/bottom; CTA text margin-bottom and line-height refined.
7. **Hero** — Overlay: 0.92 at bottom, gradient stops adjusted for smoother blend.
8. **Mobile** — Buttons 44px; contact aside single padding clamp(44px, 9vw, 60px); journal featured height 300px; form submit 44px, max-width 260px; case radius 6px.
9. **Shadow/glow** — Case and primary CTA use slightly softer, deeper shadows; glow values restrained (40–56px ranges) for premium, not neon.

---

## 3. Applied Changes

### CSS (`assets/css/style.css`)

**Section / labels / footer / CTA**
- `.section::before`: gradient `rgba(156,4,4,0.85)` → 0.4 at 12% → transparent at 28% (refined line).
- `.label`: font-size 0.65rem, letter-spacing 0.28em, margin-bottom clamp(60px, 7.5vw, 96px).
- `.label::before`: 32px × 1px, gradient #9c0404 → 0.4.
- `.label::after`: line gradient includes rgba(156,4,4,0.18).
- `.site-footer::before`: 160px × 1px, gradient 0.7 → transparent.
- `.cta-block-text::before`: 44px × 1px, gradient #9c0404 → 0.35.

**Case cards**
- `.case`: border-radius 8px; box-shadow adds inset 0 6px 28px rgba(0,0,0,0.45), idle ring rgba(156,4,4,0.08).
- `.case:hover`: scale(1.015); single ring rgba(156,4,4,0.5), 48px glow 0.14; border rgba(255,255,255,0.35).
- Mobile: `.case` border-radius 6px.

**Buttons (non-header)**
- `.btn-minimal` / `.watch-case-btn`: min-height 38px (watch 34px), padding 9px 20px (watch 7px 16px), font-size 8.5px (watch 8px), border-radius 4px, letter-spacing 0.24em (watch 0.26em).
- Background/shadow: lighter gradient and 24px/56px + 10px/32px shadows.
- Hover: -2px lift, 40px + 80px crimson glow (0.22, 0.08).
- `.cta-primary`: border 0.88, background gradient 0.42→0.22→0.08; pulse 7.5s; glow 44px + 88px; hover 56px + 112px.
- `@keyframes button-pulse-crimson`: updated to match smaller shadow/glow values.
- `.contact-form .btn-submit`: min-width 200px, min-height 38px, padding 9px 22px.
- Mobile: min-height 44px, padding 11px var(--space-lg), font 8.5px, border-radius 4px; submit max-width 260px, 44px height.

**Contact**
- `.contact-heading`: font-size clamp(0.75rem, 1vw, 0.9rem), letter-spacing 0.22em.
- `.contact-heading-accent`: margin-top 0.18em, text-shadow 18px at 0.2.
- `.contact-card`: grid 0.9fr / 1.1fr, min-height 400px, border-left 6px #9c0404, border-radius 12px.
- `.contact-card:focus-within`: glow 64px at 0.14, ring 0.3.
- `.contact-aside`: padding clamp(48px, 5.5vw, 72px) / clamp(40px, 4vw, 56px), gap clamp(24px, 2.8vw, 40px).
- `.contact-form-panel`: padding clamp(48px, 5.5vw, 72px) / clamp(36px, 3.6vw, 52px).
- `.contact-form-wrap`: max-width 360px.
- Mobile: border-left 6px, aside padding clamp(44px, 9vw, 60px), form panel same; single padding rule.

**Journal**
- `.journal-intro-lead`: border 1px top/bottom, padding adjusted, border-left 6px, margin-bottom clamp(72px, 8vw, 112px).
- `.journal-intro`: margin-bottom clamp(120px, 13vw, 184px), font-size clamp(1.08rem, 1.45vw, 1.22rem), line-height 1.88, max-width 50ch.
- `.journal-featured`: border-left 6px, border-radius 12px; hover glow 56px at 0.12, ring 0.22.
- Mobile: featured border-left 6px, j-img-wrap height 300px, content padding clamp(32px, 6.5vw, 44px), intro-lead border-left 6px.

**Hero**
- `.overlay`: gradient 0.92 → 0.5 at 24% → 0.12 at 54% → transparent at 74%.

**Homepage**
- `#cta-block.section`: padding-top clamp(160px, 17vw, 224px), padding-bottom clamp(168px, 18vw, 240px).
- `.cta-block-text`: margin-bottom clamp(88px, 10vw, 144px), max-width 46ch, font-size clamp(0.96rem, 1.15vw, 1.04rem), line-height 1.84.

No HTML, routes, or content changed.

---

## 4. Final QA

| Criterion | Status |
|-----------|--------|
| True black dominant base | Pass |
| #9c0404 only accent, visible across UI | Pass |
| Crimson accents refined (lines, labels, CTAs) | Pass — 1px accents, gradient fades |
| Case cards: black cinematic depth, restrained crimson | Pass — #000, inset shadow, 0.08 ring, hover 0.5 ring + 48px glow |
| Buttons: smaller, refined, premium | Pass — 38/34px, 8.5/8px, 4px radius, pulse + glow |
| Contact: no giant heading, premium composition | Pass — smaller heading, 6px accent, calm spacing |
| Journal: editorial, more air | Pass — 6px accent, intro margins, featured refined |
| Homepage: flagship rhythm | Pass — CTA block padding and text spacing |
| Hero: blend into black | Pass — overlay 0.92 at bottom |
| Mobile: refined, no cramping | Pass — 44px buttons, single aside padding, 6px accents |
| Cleaner, minimal, expensive, less noisy | Pass |
| No content/route/architecture change | Pass |

**Result: Pass.**

---

## 5. Changelog

- **Black/crimson system** — Section top gradient (0.85→0.4→transparent 28%); label 32px×1px accent, 0.65rem; footer 160px×1px; CTA block 44px×1px; all #9c0404, refined.
- **Case card cinematic** — Radius 8px (mobile 6px); deeper inset shadow; idle ring 0.08; hover scale 1.015, single ring 0.5, 48px glow 0.14.
- **Premium button rebuild** — 38/34px height, 9/7px padding, 8.5/8px font, 4px radius; lighter shadows; hover -2px, 40+80px glow; primary pulse 7.5s, refined glow; submit 38px, 200px min-width.
- **Contact page/card** — Heading clamp(0.75rem, 1vw, 0.9rem); card 6px left, 400px min-height, 12px radius; aside/form padding and gap reduced; focus 64px 0.14; form wrap 360px; mobile single aside padding.
- **Journal editorial** — Intro lead 1px borders, 6px left, margin clamp(72px, 8vw, 112px); intro margin clamp(120px, 13vw, 184px); featured 6px left, 12px radius, hover 56px 0.12; mobile 300px image, 6px accent.
- **Homepage premium rhythm** — CTA block padding increased; CTA text margin and line-height refined.
- **Hero/showreel** — Overlay 0.92 at bottom, gradient stops for blend.
- **Mobile premium** — Buttons 44px; contact aside clamp(44px, 9vw, 60px); journal featured 300px, 6px accent; submit 44px, 260px max-width; case 6px radius.
- **Shadow/glow** — Softer, deeper shadows on buttons and cases; glow 40–56px ranges; pulse keyframes updated.
- **Preserved** — All pages, routes, texts, content, cases, media, structure; header/nav unchanged.
- **Remaining risks** — None. If any screen feels too subtle, accent opacity can be raised in one place (e.g. section::before 0.85→0.95).

---

**Final criterion:** SHAR Production keeps structure and content and visually returns to the premium SGAER direction, then surpasses it in **cleanliness, minimalism, and expensive studio polish** — black base, #9c0404 visibly restored, cinematic case cards, refined buttons, premium contact and journal, richer shadows and restrained glow, flagship homepage, polished mobile. **Met.**
