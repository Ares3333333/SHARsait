# Style Transfer from sgaer.vercel.app Reference — Visual System Rebuild

**Reference:** https://sgaer.vercel.app/  
**Constraint:** No architecture change, no text change, no route/section removal. Visual system only.  
**Brand:** Black dominant, #9c0404 only accent.

---

## 1. Visual Difference Audit

**Reference traits (sgaer):** Stronger premium button feel, richer glow and depth, better premium contrast, theatrical/high-end CTA presentation, expensive shadow logic, alive premium dark atmosphere.

**Current SHAR vs reference-level premium:**
- **Shadows:** SHAR had solid premium tokens; reference implies even deeper, more “expensive” falloff (larger blur, darker opacity). Gap: shadow stack could be heavier for cards and buttons.
- **Buttons:** SHAR already had pulse, light-shift, crimson glow. Gap: primary CTA glow at pulse peak could be more theatrical (higher glow radius/opacity); hover state could feel more “high-end” with stronger shadow and glow.
- **Glow:** Reference suggests more “alive” crimson glow on CTAs and interactive surfaces. Gap: contact focus-within, case hover, price-card hover, and journal card hovers could use slightly richer crimson presence.
- **Contact:** SHAR has one balanced card with 4px #9c0404 bar and focus-within glow. Gap: focus-within glow could be slightly stronger for clearer premium feedback.
- **Journal:** Intro block and featured/cards already have 4px accent and hover glow. Gap: hover glow values could be nudged up for more editorial presence.
- **Homepage:** Section rhythm and CTA block already strong. Case grid hovers could carry a bit more depth and crimson accent.
- **Hero:** Lower-only overlay already in place; no change needed.
- **Mobile:** Layout and button sizing already intentional; no structural change.

---

## 2. Controlled Rebuild Plan

1. **Shadow system** — Increase `--shadow-premium` and `--shadow-premium-hover` blur and opacity for more expensive depth (36px/80px, 48px/112px).
2. **Button pulse** — In `button-pulse-crimson`: raise glow at 0%/100% and 50% (46px/90px, 58px/112px at peak); 50% border solid #9c0404; stronger inset highlight at peak.
3. **Non-header buttons** — Base shadow slightly deeper (28px/64px, 12px/36px). Hover: stronger crimson glow (48px, 88px) and slightly stronger lift.
4. **Primary CTA** — Default fill and border tweak; pulse 7.5s; default glow 48px/96px. Hover: fill 0.6/0.35/0.16, shadow 32px/80px + 16px/42px, glow 64px + 120px for theatrical feel.
5. **Contact** — focus-within: glow 56px, ring 0.22.
6. **Cases** — Hover: add subtle crimson glow (36px 0.05), ring 0.12, border 0.3.
7. **Price cards** — Hover: glow 40px 0.06, ring 0.12, border 0.32.
8. **Journal featured + grid cards** — Hover: stronger glow (48px 0.08, 42px 0.07) and ring (0.16).
9. **No changes** to hero overlay, mobile structure, or content.

---

## 3. Applied Changes

### Root / shadow system
- `--shadow-premium`: 36px/80px, 16px/44px, 1px edge 0.07.
- `--shadow-premium-hover`: 48px/112px, 20px/56px, 1px edge 0.09.

### Button pulse (primary CTA)
- `@keyframes button-pulse-crimson`: 0%/100% — border 0.72, glow 46px/90px, ring 0.42, inset 0.18; 50% — border #9c0404, glow 58px/112px, ring 0.58, inset 0.24. Keeps same shadow stack for depth.

### Non-header buttons
- Base: shadow 28px/64px + 12px/36px + 1px 0.28.
- Hover: glow 48px + 88px (0.26, 0.1), inset 0.18, shadow 30px/72px + 14px/38px, border 0.42.

### Primary CTA
- Default: border 0.9, fill 0.44/0.24/0.1, glow 48px/96px, pulse 7.5s.
- Hover: fill 0.6/0.35/0.16, shadow 32px/80px + 16px/42px, glow 64px + 120px (0.4, 0.16), ring 0.6.

### Contact
- `.contact-card:focus-within`: glow 56px 0.1, ring 0.22.

### Cases
- `.case:hover`: shadow includes 36px rgba(156,4,4,0.05), ring 0.12, border 0.3.

### Price cards
- `.price-card:hover`: glow 40px 0.06, ring 0.12, border 0.32.

### Journal
- `.journal-featured:hover`: glow 48px 0.08, ring 0.16, border 0.3.
- `.journal-grid-rest .journal-card:hover`: glow 42px 0.07, ring 0.16, border 0.32.

---

## 4. Final QA

- **Black base:** Unchanged (#000000, body/section).
- **#9c0404 only:** All accent via var or rgba(156,4,4,…); no new colors.
- **Buttons:** Deeper base shadow; hover glow 48px/88px; primary pulse 7.5s with stronger peak (58px/112px); primary hover 64px/120px glow. Header buttons untouched.
- **Contact:** One composition, 4px bar, focus-within glow 56px.
- **Journal:** Intro + featured + grid with stronger hover glow/ring.
- **Homepage:** Case hover and price-card hover have richer depth and crimson accent.
- **Hero:** Unchanged (lower-only overlay).
- **Mobile:** No layout or content change.
- **Regressions:** No sections or content removed; reduced-motion respected.

**Result: Pass.**

---

## 5. Changelog

- **Button rebuild:** Non-header base shadow deepened (28/64, 12/36). Hover glow 48px/88px. Primary CTA: default glow 48/96, pulse 7.5s with theatrical peak (58px/112px, solid #9c0404 border); hover 64px/120px glow, 32/80 + 16/42 shadow. Focus states unchanged.
- **Black/crimson color system:** No token change; shadow and glow values only. Black remains dominant; #9c0404 only accent.
- **Contact page:** focus-within glow increased to 56px 0.1, ring 0.22. Layout and form unchanged.
- **Journal editorial:** Featured and grid card hovers: stronger crimson glow (48px 0.08, 42px 0.07) and ring 0.16. Intro/featured structure unchanged.
- **Homepage premium rhythm:** Case hover and price-card hover given richer shadow and subtle crimson glow; section order and CTA block unchanged.
- **Hero/showreel:** No change (lower-only overlay kept).
- **Mobile premium pass:** No structural change; existing spacing and button sizing retained.
- **Shadow/glow/depth system:** `--shadow-premium` and `--shadow-premium-hover` increased (36/80, 48/112). Primary pulse keyframes and primary/default button glows strengthened for reference-level premium.
- **Preserved unchanged:** All content, routes, sections, copy, hero overlay logic, header buttons, mobile layout structure.
- **Remaining risks:** None identified. If reference site styling diverges in future, a second pass can align further.
