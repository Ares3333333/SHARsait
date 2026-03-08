# Style Transfer — Reference (sgaer.vercel.app) → SHAR Production

## 1. Visual Difference Audit

**Reference direction (source of truth):** Expensive, alive, deep, premium, minimal; black luxury base; branded crimson; glowing buttons with slow pulse and light shifts; deep shadows; premium edge lighting; high-end studio contrast.

**Current project vs reference:**
- **Buttons:** Already have pulse, light-shift, deep shadow. Gaps: corners could be softer (8px), padding more generous, transitions slightly longer (0.4s), pulse slower (9s); secondary buttons could have a hint of crimson glow on hover.
- **Color:** Black base and #9c0404 already correct. Shadow tokens could be one step deeper for reference-grade depth.
- **Hero:** Overlay already darkens lower portion; can strengthen very bottom (0–25%) for smoother blend into shell.
- **Contact:** Card already premium; add stronger inset highlight and slightly more visible crimson edge on focus.
- **Depth/glow:** Global shadow-premium tokens can be deepened; cards already use them—ensure consistency.
- **Mobile:** Buttons and spacing already tuned; add 8px radius on mobile to match desktop refinement; ensure no cramped feel.

**Conclusion:** Current project is close; transfer = refine proportions, soften edges, deepen shadows, slow pulse, strengthen hero bottom and contact card edge.

---

## 2. Style-Transfer Plan

| Area | Change |
|------|--------|
| Buttons | border-radius 6px → 8px; padding 18px 44px → 20px 48px; transition 0.35s → 0.4s; pulse 8s → 9s; light-shift 5s → 6s; secondary hover add subtle crimson glow. |
| Shadow tokens | --shadow-premium: add one more layer, slightly deeper; --shadow-premium-hover: deeper. |
| Hero overlay | Slightly stronger at very bottom (0–25%) for ~20% lower darken and smoother blend. |
| Contact card | Stronger inset highlight; focus-within crimson rim slightly more visible. |
| Case/cards | Use updated shadow tokens (already reference vars). |
| Mobile | Buttons border-radius 8px; confirm spacing. |

---

## 3. Applied Changes

- **Shadow tokens:** `--shadow-premium` and `--shadow-premium-hover` deepened (20px/52px + 8px/28px; 36px/80px + 14px/44px) and stronger inset edge (0.08).
- **Hero overlay:** Gradient adjusted so lower ~20% is darker: 0.82 at 0%, 0.38 at 28%, 0.1 at 55%, transparent at 75%.
- **Buttons:** border-radius 6px → 8px; padding 18px 44px → 20px 48px; transitions 0.35s → 0.4s; default shadow 14px/44px + 6px/22px; pulse 8s → 9s; light-shift 5s → 6s, opacity tuned; secondary hover given subtle crimson glow (20px + 48px).
- **Contact card:** border-radius 12px → 14px; deeper shadow (36px/88px, 14px/44px); stronger inset highlight (0.08); focus-within crimson rim 0.08 → 0.12, transition 0.4s.
- **Case cards:** border-radius 6px → 8px (desktop and mobile).
- **Mobile:** Buttons explicit border-radius 8px; case 8px.

## 4. Final QA

- Black base and #9c0404 accent: unchanged; **passed.**
- Buttons: reference-style proportions, 8px radius, 9s pulse, 6s light-shift, deeper shadow, secondary glow; **passed.**
- Hero: lower portion darkened via overlay; **passed.**
- Contact: premium card with deeper shadow and focus rim; **passed.**
- Depth: global shadow tokens and cards use them; **passed.**
- Mobile: 8px radius, spacing unchanged; **passed.**
- No architecture/text/routes changed; **passed.**

## 5. Changelog

- **button style transfer:** Softer corners (8px), more generous padding (20px 48px), longer transitions (0.4s), slower pulse (9s) and light-shift (6s), deeper default/hover shadows, secondary hover crimson glow.
- **black/crimson color correction:** Base and accent unchanged; shadow tokens deepened for reference-grade depth.
- **shadow/glow/depth improvements:** --shadow-premium and --shadow-premium-hover deepened; contact card and buttons use richer shadows and restrained crimson glow.
- **showreel lower-tone adjustment:** Hero overlay gradient strengthened at bottom (0.82 → 0.38 → 0.1 → transparent) for ~20% lower darken and cleaner blend.
- **contact page premium polish:** Card radius 14px, deeper multi-layer shadow, stronger inset highlight, focus-within crimson 0.12.
- **mobile premium polish:** Button and case border-radius 8px; spacing and touch targets preserved.
- **remaining risks:** None. If reference is deployed elsewhere with different CSS, further alignment can be done by re-auditing that build.
