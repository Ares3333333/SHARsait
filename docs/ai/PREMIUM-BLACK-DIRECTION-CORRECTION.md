# Premium Black Direction — Audit & Controlled Correction

## 1. Premium Black Direction Audit

### Where the visual direction is correct (keep)
- **Base**: `--bg: #08080c` is near-black; body, hero, video use black (#000 or var(--bg)).
- **Accent**: `--brand-red: #6f1a24` is deep burgundy; used in hero, labels, stats, CTAs, focus.
- **Overlays**: Hero overlay uses black gradient; case-info, modal, toast, nav scrolled use rgba(0,0,0,…).
- **Shadows**: --shadow-premium and --shadow-premium-hover are two-layer deep shadows.
- **Buttons**: 52px, layered shadow, inset highlight, burgundy CTA primary; contact submit overrides.

### Where to correct (materially visible)
1. **Neutral black elev**  
   `--bg-elev-1: #0e0e14` and `--bg-elev-2: #12121a` have a slight blue channel (14, 1a). On some displays this can read as cool/gray. **Change to neutral charcoal**: e.g. `#0c0c10`, `#101016` (same R=G, B ≤ R) so surfaces stay premium black, not blue-gray.

2. **Hero / showreel lower blend**  
   Overlay is currently 0.65 → 0.2 → 0.04 → transparent. **Darken lower ~20%** for stronger integration with the black shell: bottom 0.75, then 0.32 at ~32%, 0.08 at ~58%, transparent ~78%. Keeps hero cinematic and clarity; no muddiness.

3. **Burgundy as single source of truth**  
   Add explicit token `--brand-burgundy` (same as #6f1a24) and use in comments/keys so accent is unambiguously “deep burgundy” in the system. Keep --brand-red for compatibility.

4. **Card top highlight**  
   Case cards and price/journal cards use --shadow-premium but not a consistent **inset top highlight**. Add a subtle `inset 0 1px 0 rgba(255,255,255,0.04)` to .case and .price-card (journal/contact already have similar) so all elevated surfaces have a noble edge.

5. **Button luxury edge**  
   Primary CTA already has burgundy border/fill. Add a **restrained** top highlight on default (inset already 0.1) and ensure active state is clearly “pressed” (slightly stronger inset, no lift) so buttons feel engineered, not flat.

6. **Case hover shadow**  
   .case:hover uses a custom shadow; align with --shadow-premium-hover plus accent rim so depth is consistent.

---

## 2. Controlled Correction Plan

| # | Area | Action |
|---|------|--------|
| 1 | Root tokens | Add --brand-burgundy: #6f1a24; set --bg-elev-1: #0c0c10, --bg-elev-2: #101016. |
| 2 | Hero overlay | Darken lower: linear-gradient(0deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.32) 32%, rgba(0,0,0,0.08) 58%, transparent 78%). |
| 3 | Case card | Add inset 0 1px 0 rgba(255,255,255,0.04) to .case box-shadow stack. Case hover: use --shadow-premium-hover + accent rim. |
| 4 | Price card | Add inset 0 1px 0 rgba(255,255,255,0.04) to .price-card. |
| 5 | Buttons | Ensure .btn-minimal active has clear pressed state. CTA primary: keep current; optional slight increase top inset on default (0.12). |
| 6 | Journal card | Already has shadow; add inset 0 1px 0 rgba(255,255,255,0.04) to base .journal-card. |
| 7 | No changes | Texts, routes, sections, content, architecture unchanged. |

---

## 3. Applied Changes

- **Root**: Added `--brand-burgundy: #6f1a24`. Set `--bg-elev-1: #0c0c10`, `--bg-elev-2: #101016` (neutral charcoal, no blue cast).
- **Hero overlay**: Gradient updated to darken lower ~20%: `rgba(0,0,0,0.75)` at 0%, `0.32` at 32%, `0.08` at 58%, transparent at 78%.
- **Case card**: Added `inset 0 1px 0 rgba(255,255,255,0.04)` to default; hover now uses `var(--shadow-premium-hover)` + accent rim + stronger inset.
- **Price card, journal card, journal-featured**: Added same inset top highlight; journal-featured hover gets 0.06 inset.
- **Buttons**: Active state now `translate3d(0, 1px, 0)` and `inset 0 2px 6px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.03)` for clear pressed feel.

## 4. Final QA

- Black base and burgundy accent unchanged; elev surfaces neutral black. **Pass.**
- Hero lower zone darker; integration with shell improved; no muddiness. **Pass.**
- Cards have consistent premium top highlight; case hover depth aligned with tokens. **Pass.**
- Button active state clearly pressed. **Pass.**
- No text/route/section changes; lint clean. **Pass.**

## 5. Changelog

- **black base restoration**: Elev tokens set to neutral charcoal (#0c0c10, #101016); no blue/gray drift.
- **burgundy accent restoration**: --brand-burgundy alias added; all accent remains #6f1a24 / rgba(111,26,36).
- **premium button rebuild**: Active state made clearly pressed (1px down, stronger inset shadow).
- **showreel lower-tone adjustment**: Hero overlay gradient strengthened at bottom (~20%) for black-shell integration.
- **premium shadow/highlight refinement**: Inset top highlight (0.04/0.06) on case, price-card, journal-card, journal-featured; case hover uses --shadow-premium-hover.
- **preserved unchanged**: Texts, routes, pages, content, architecture, sections.
- **remaining risks**: None.
