# Premium Visual Transfer — Reference (sgaer.vercel.app) → SHAR Production

## Audit

**Reference:** Premium black base, #9c0404 accent, elite buttons (crimson glow, slow pulse, light shifts, deep shadows), showreel lower blend, minimal contact (Name + Contact), polished mobile.

**Current project vs reference:**
- **Base:** Already true black (`--bg: #000000`, `--bg-elev-1: #0a0a0e`, `--bg-elev-2: #0e0e14`). Body and hero use black. No gray/muddy in tokens. ✓
- **Accent:** `--brand-crimson: #9c0404`; all aliases and rgba(156,4,4) in use. ✓
- **Buttons:** Rebuilt: 58px min-height, 20px 50px padding, 8px radius, deep shadows (14px/44px, 6px/24px), primary crimson border/fill/glow (0.72, 0.38→0.16→0.08, 28px/56px), 9s pulse (28/56↔36/72px glow), 6s light-shift, focus 2px outline + glow, hover 20px/56px + 36px/64px glow, active pressed state. ✓
- **Showreel:** `.overlay` gradient 0.82→0.38 (28%)→0.1 (55%)→transparent (75%). Lower ~25% darkened. ✓
- **Contact:** Two-panel card, premium shadow, focus rim. Form has Name, Contact, and optional message. Requirement: only Name + Contact visible. **Gap:** Hide optional message so form is strictly Name + Contact.
- **Mobile:** Section 72px, buttons 56px/58px, 8px radius, contact heading scaled, journal intro 56px. ✓

**Conclusion:** One gap — contact form must show only Name + Contact. Hide optional message field via CSS. All other reference criteria already met by prior rebuild.

---

## Plan

| # | Item | Action |
|---|------|--------|
| 1 | Contact form | Hide `.contact-field--optional` so only Name and Contact are visible; keep layout and submit premium. |
| 2 | Contact submit | Ensure `.contact-form .btn-submit` min-height 58px (align with button system). |
| 3 | Verify | No architecture/text/routes change; confirm black, #9c0404, buttons, hero, mobile. |

---

## Applied Changes

- **Contact form:** Added `.contact-form--minimal .contact-field--optional { display: none; }` so the contact page shows only Name and Contact fields. Privacy link and submit button unchanged.
- **Contact submit:** `.contact-form .btn-submit` min-height set to 58px for consistency with premium button system.
- **No other changes:** Base, accent, buttons, hero overlay, mobile, and all other styles already match the reference premium direction.

---

## QA

- **True black base:** --bg #000, body/hero/video black, elev near-black. **Passed.**
- **#9c0404 accent:** Single token and rgba(156,4,4) site-wide. **Passed.**
- **Buttons:** Elite proportions, crimson glow, 9s pulse, 6s light-shift, deep shadows, focus/hover/active. **Passed.**
- **Showreel lower:** Overlay darkens bottom ~25%. **Passed.**
- **Contact:** Only Name + Contact visible; form elegant; submit 58px; card premium. **Passed.**
- **Mobile:** Premium spacing and button sizing; no cramped layout. **Passed.**
- **No regressions:** Architecture, texts, routes, content unchanged. **Passed.**
