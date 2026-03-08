# Black Premium Direction — Audit & Rebuild Plan

## 1. Black Premium Direction Audit

### Where black was lost

- **Base color**: `--bg: #101015` reads as dark gray, not black. Combined with very low surface opacity it produces a flat, dull field. True premium black base should be `#08080c` / `#0a0a0e`.

- **Surface system**: `--surface-fill: 0.04`, `--surface-border: 0.14`, `--line: 0.1` are so faint that cards and sections don’t separate from the background; everything blends into one gray mass. No clear “layers on black”.

- **Hero / overlay**: Gradient uses `rgba(16,16,21,...)` — same gray. Cinematic hero needs black in the gradient (`rgba(0,0,0,...)` or near-black) so the frame reads as black, not gray.

- **Nav scrolled**: `rgba(16,16,21,0.82)` — gray bar. Should be deep black (e.g. `rgba(0,0,0,0.9)`) to keep authority.

- **Modal / overlay UIs**: `rgba(12,12,16,0.97)`, `.m-hero` `rgba(3,3,3,0.97)`, toast `rgba(3,3,3,0.95)` — dark gray. For a black-led identity these should be true black with high opacity.

- **Shadows**: Card shadows use `rgba(0,0,0,0.22)`–`0.34`. They read as soft gray halos, not “expensive” depth. Premium feel needs deeper, multi-layer shadows (0.45–0.6 range) so surfaces clearly float on black.

- **Cards (case, price, journal, contact)**: Very subtle white gradients (0.028, 0.055, 0.04) on a gray base read as flat. Need either a black base with a clear elevated surface (e.g. `--bg-elev-1`) or a stronger rim/highlight so the card reads as an object.

- **Buttons**: Background `rgba(255,255,255,0.028)`, border `0.26` — almost invisible on gray. On true black, borders and a slight top highlight would read; we also need a defined shadow stack (inset highlight + drop shadow) so they feel engineered, not template-like.

- **Contact card**: Transparent aside + very soft gradient (0.04 → 0.012 → accent 0.045) — no clear “premium panel”. Needs a defined surface (e.g. left panel on black with subtle fill or edge) and a strong card shadow so it reads as one expensive composition.

- **Text**: Secondary 0.84 / tertiary 0.6 are safe but on gray can feel washed. On black, slightly stronger contrast (0.88 / 0.64) keeps type alive without losing restraint.

---

## 2. Controlled Rebuild Plan

### A. Restore black premium base

- Set `--bg: #08080c` (or `#0a0a0e`). Keep `--bg-elev-1`, `--bg-elev-2` as slightly lifted blacks for panels (`#0e0e14`, `#12121a`) so layers read.
- Increase separation: `--line: 0.12`, `--surface-border: 0.16`, `--surface-fill: 0.06` for cards/panels.
- Hero: `background: #000` or `var(--bg)`; overlay gradient from black `rgba(0,0,0,0.6)` → transparent (no 16,16,21).
- Nav scrolled: `rgba(0,0,0,0.88)` (or 8,8,12,0.92), border 0.12.
- Modal, toast, close-case, m-hero, mobile nav: deep black `rgba(0,0,0,0.96)` or near-black 8,8,12.
- Add token: `--shadow-premium: 0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)`; `--shadow-premium-hover: 0 24px 56px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.08)`.

### B. Button system — true premium

- Base: min-height 50px, padding 16px 36px, 11px font, 0.14em letter-spacing.
- Border: 1px solid rgba(255,255,255,0.22); primary accent 0.4.
- Background: linear-gradient 180deg rgba(255,255,255,0.06) → 0.02 (readable on black).
- Shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 16px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,0,0,0.25). Hover: 0 8px 28px rgba(0,0,0,0.5), border 0.32, same inset.
- CTA primary: border accent, fill accent 0.14 → 0.05; hover shadow with slight accent rim. No neon, no heavy glow.

### C. Contact / inquiry page

- Contact card: background using --bg-elev-1 or linear-gradient with black + very subtle top highlight; border 0.12; box-shadow: 0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06).
- Aside: background rgba(0,0,0,0.25) or rgba(255,255,255,0.03) so left panel is a clear surface on black.
- Keep: one composition, small title, Name + Contact (+ optional message), privacy link. No HTML change.

### D. Premium depth / highlights

- Section border-top: use --line 0.12.
- Case cards: apply --shadow-premium; hover --shadow-premium-hover + accent 1px rim.
- Price cards, journal cards: same shadow system; card background --bg-elev-1 or 0.06 fill.
- Labels: keep accent; ensure contrast on black (opacity 0.9+).

### E. Performance & repo

- No new heavy effects; keep transitions as-is.
- No new markdown in root; this file in docs/ai/. Remove .DS_Store if present.

---

## 3. Applied Changes

- **Root tokens**: `--bg` → `#08080c`; `--bg-elev-1` → `#0e0e14`, `--bg-elev-2` → `#12121a`. `--line` 0.12, `--surface-border` 0.16, `--surface-fill` 0.06. `--text-secondary` 0.88, `--text-tertiary` 0.64. Added `--shadow-premium` and `--shadow-premium-hover`.
- **Hero / video**: Hero, .video-bg, .video-poster background set to `#000`. Overlay gradient switched to black `rgba(0,0,0,...)`.
- **Nav**: nav.scrolled background `rgba(0,0,0,0.88)`. Mobile .nav-right `rgba(0,0,0,0.97)`.
- **Case cards**: box-shadow → var(--shadow-premium); hover → deeper shadow + accent rim. .case-info gradient → black-based.
- **Price cards, journal cards, journal-featured, journal-grid-rest .journal-card**: background → var(--bg-elev-1); box-shadow → var(--shadow-premium); hover → var(--shadow-premium-hover). premium-pack shadow deepened with accent rim.
- **Contact**: .contact-card background → var(--bg-elev-1); box-shadow → 24px 64px black + rim; .contact-aside background → rgba(0,0,0,0.25); .contact-form-panel background → rgba(0,0,0,0.2).
- **Buttons**: Min-height 50px, padding 16px 36px, 11px, 0.14em. Border 0.22, background gradient 0.06→0.02, box-shadow inset highlight + 4px 16px black + 1px black rim. Hover: 8px 28px shadow, border 0.32, -2px lift. CTA primary/secondary aligned to same depth logic.
- **Modal, toast, close-case, m-hero, m-video-container**: Backgrounds set to black (rgba(0,0,0,0.96/0.95/0.85/0.97). close-case and toast given premium shadow. m-video-container background #000, border var(--surface-border).

## 4. Final QA

- **Black base**: Body and hero use true black / #08080c; sections and cards read as layers on black. PASS.
- **Depth**: Cards use --shadow-premium and --shadow-premium-hover; nav/modal/toast use deep black. PASS.
- **Buttons**: Elite proportions, layered shadow, clear hover lift; no neon. PASS.
- **Contact**: Single composition, elev background, aside + form panel defined; form unchanged (Name, Contact, optional message, privacy). PASS.
- **No regressions**: Routes, content, texts unchanged. No new heavy effects. Lint clean. PASS.

## 5. Changelog

- **black base restoration**: True black (#08080c, #000) as base; elev layers (#0e0e14, #12121a); stronger line/surface tokens; black-based overlays and nav/modal/toast.
- **premium button rebuild**: 50px/16px 36px/11px; gradient fill; inset + drop shadow stack; hover -2px and deeper shadow; CTA primary/secondary aligned.
- **contact page rebuild**: Card and aside/form-panel use elev + black tints; premium shadow; same minimal form and copy.
- **premium depth/highlight system**: --shadow-premium and --shadow-premium-hover applied to case, price, journal, contact; case-info and overlays black-based; client-logo and premium-pack deepened.
- **repo cleanup**: Plan/audit in docs/ai/; no .DS_Store found in repo; production root unchanged.
- **remaining risks**: None. Performance unchanged; no new animations.
