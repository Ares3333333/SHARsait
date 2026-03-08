# Frontend Recovery — Priority Audit (No Edits)

**Scope:** Image/layout stability, responsive recovery, premium buttons, contact page composition.  
**Output:** Audit only. No implementation in this pass.

---

## 1. Image / Layout Stability

### Hero
- **.hero:** `height: 100vh`, `overflow: hidden`, `contain: layout style paint` — layout is contained.
- **.video-bg:** `overflow: hidden` — iframe cannot leak.
- **.video-poster img:** `display: block`, `width/height: 100%`, `object-fit: cover`, `object-position: center` — correct. HTML has `width="1920" height="1080"` on hero poster — good for CLS.
- **.video-bg iframe:** Uses `100vw` / `56.25vw` / `min-height: 100vh` / `min-width: 177.77vh`; centered with `transform: translate(-50%, -50%)`. Parent has `overflow: hidden`, so no horizontal leak. **Risk:** On very narrow viewports (e.g. tall phone), the min-width could still force a wide box; clipping is correct but the iframe area is oversized. Low priority.

### Case cards (homepage / cases index)
- **.case:** `aspect-ratio: 16/9`, `overflow: hidden`, `min-height: 0`, `display: block` — stable.
- **.case img:** `display: block`, `width/height: 100%`, `object-fit: cover`, `object-position: center` — correct. Homepage and cases index use `width="1920" height="1080"` — good for CLS.

### Journal cards (horizontal scroll + journal landing)
- **.j-img-wrap:** `aspect-ratio: 16/9`, `overflow: hidden`, `min-height: 0`.
- **.j-img-wrap img:** `display: block`, `width/height: 100%`, `object-fit: cover`, `object-position: center` — correct. Journal landing and index use `width`/`height` on images where present; some journal cards may omit them — check consistency.
- **.journal-featured .j-img-wrap:** Fixed `height: 420px` (desktop), `280px` (mobile), `aspect-ratio: auto`; img has `object-fit: cover`, `object-position: center`. Featured image in `journal/index.html` has `width="1200" height="675"` — good.

### Case page gallery (.m-gallery)
- **.m-gallery:** Grid 2 columns, `gap: var(--space-md)`.
- **.m-gallery img:** `display: block`, `width: 100%`, `aspect-ratio: 16/9`, `object-fit: cover`, `object-position: center` — prevents stretch and CLS.
- **.m-gallery img.gallery-full:** `grid-column: 1 / -1`, `aspect-ratio: 21/9` — full-width row.
- **HTML:** All case gallery `<img>` lack `width` and `height` attributes. Layout is stabilized by CSS `aspect-ratio`, but CLS could still occur until images load. **Recommendation:** Add `width` and `height` to gallery images (e.g. 1920/1080 or 16/9 proxy) for reserve space and better CLS.

### Summary — Image / layout
| Area            | Status | Notes |
|-----------------|--------|--------|
| Hero            | OK     | Contained; poster has dimensions. |
| Case cards      | OK     | Aspect + cover + center; dimensions on index/cases. |
| Journal cards   | OK     | Aspect + cover + center; featured has dimensions. |
| Case gallery    | OK     | Aspect-ratio + cover; add width/height in HTML for CLS. |

---

## 2. Responsive / Mobile Recovery

### Breakpoints
- **900px:** Main breakpoint (nav drawer, single column, spacing overrides).
- **480px:** Stats single column, manifesto text size, section padding `var(--space-xl) 5%`.

### Section / spacing
- **.section:** Desktop `var(--section-pad-y) 4%`; at 900px `40px 6%`; at 480px `var(--space-xl) 5%` — consistent.
- **.grid:** At 900px `grid-template-columns: 1fr`, `gap: 28px` — stacking OK.
- **.journal-featured:** At 900px single column, `.j-img-wrap` height `280px`, `.j-content` padding `var(--space-xl)` — OK.
- **.journal-grid-rest:** At 900px `grid-template-columns: 1fr`, `gap: 28px` — OK.

### Contact page (mobile)
- **.contact-card:** At 900px `grid-template-columns: 1fr`, `min-height: 0` — stacks.
- **.contact-aside:** Padding `var(--space-2xl) var(--space-lg)`, `border-right: none`, `border-bottom: 1px solid var(--line)`.
- **.contact-form-panel:** Padding and `align-items: flex-start`.
- **.contact-form .form-input:** `min-height: 52px`, padding and font-size set — touch-friendly.
- **.contact-form .btn-submit:** `min-height: 56px`, `padding: 18px`.
- **.contact-form .form-legal:** `text-align: center` on mobile — OK.

### Case pages (mobile)
- **.m-case-body:** At 900px `grid-template-columns: 1fr`, `gap: var(--space-md)`.
- **.m-video-container:** At 900px `height: 40vh`.
- **.m-gallery:** At 900px `grid-template-columns: 1fr`, `gap: var(--space-md)`.
- **.project-metrics:** At 900px `grid-template-columns: 1fr`.

### Horizontal scroll
- **.horizontal-scroll:** `overflow-x: auto`, `overflow-y: hidden`, `-webkit-overflow-scrolling: touch` — no vertical leak, touch scroll OK.
- **.team-member, .journal-card:** `flex: 0 0 85vw` at 900px — reasonable card width.

### Header / nav
- **nav:** At 900px padding and backdrop; `.nav-right` becomes fixed full-screen drawer with `right: -100%` / `.active` → `right: 0`.
- **.btn-nav-premium, .phone-link:** Font and padding adjusted; `width: auto`.

### Potential issues
- **480px:** Only a few overrides (stats, manifesto text, section padding). Rest inherits from 900px. Verify on very small devices (e.g. 320px) that nothing overflows or feels cramped.
- **Contact heading:** `clamp(1.85rem, 4.2vw, 2.5rem)` — on very narrow screens 4.2vw can get small; acceptable for “minimal” but worth a quick check.
- **Horizontal scroll:** 85vw cards on small screens are fine; ensure parent of `.horizontal-scroll` never allows horizontal page scroll (body has `overflow-x: hidden` — OK).

### Summary — Responsive
| Area           | Status | Notes |
|----------------|--------|--------|
| Sections       | OK     | Padding and gaps scale. |
| Grids          | OK     | Single column at 900px. |
| Contact mobile | OK     | Stack, touch targets, legal centered. |
| Case pages     | OK     | Single column, video height reduced. |
| Horizontal     | OK     | Touch scroll, 85vw cards. |
| 480px          | Check  | Limited overrides; spot-check 320px. |

---

## 3. Premium Button System

### Non-header buttons (audit only)
- **.btn-minimal:** Border `rgba(255,255,255,0.2)`, gradient background, `box-shadow: inset 0 1px 0 rgba(255,255,255,0.12)`, hover lift `translate3d(0, -2px, 0)`, active scale 0.98. No heavy black fill, no neon.
- **.watch-case-btn:** Same grammar — light surface, inset, border, hover lift. Font 9px, letter-spacing, uppercase.
- **.cta-primary:** Red-tinted border and background, `button-breath-soft` 6s animation; hover strengthens border/glow and disables animation. Restrained.
- **.cta-secondary:** Neutral border and light gradient; hover slightly stronger.
- **.cta-ghost:** Transparent, border only; hover border and lift.
- **.case-back.cta-ghost:** Border and background overridden to none — link-style back.

### Header (nav) buttons
- **.btn-nav-premium:** Light gradient, glow + inset, hover red border/shadow.
- **.phone-link:** Red border and gradient, same token system.

### Mobile
- **900px:** `.btn-minimal` `min-height: 48px`, padding `16px var(--space-xl)`; `.btn-submit` and price-card buttons `min-height: 52px`, padding `16px var(--space-lg)` — tap targets OK.

### Summary — Buttons
| Area        | Status | Notes |
|-------------|--------|--------|
| .btn-minimal| OK     | Light surface, inset, hover lift, no neon. |
| .watch-case-btn | OK | Aligned with btn-minimal grammar. |
| .cta-*      | OK     | Primary breath, secondary/ghost clear. |
| Nav         | OK     | Same premium grammar. |
| Mobile      | OK     | Min-heights and padding adequate. |

No structural or “cheap” issues found; system is consistent and premium-oriented. Any further tweaks are refinement, not recovery.

---

## 4. Contact Page Composition

### Structure (contact.html)
- **Main:** `.section.contact-page` with top padding for nav.
- **Inner:** `.contact-inner` (max-width 1100px).
- **Card:** `.contact-card` — grid two columns (0.9fr 1.1fr), one row; at 900px single column.
- **Left panel (.contact-aside):** Heading (ОБСУДИТЬ / ПРОЕКТ), intro paragraph, “Прямые контакты” + grid of items (phone, Telegram, email, address).
- **Right panel (.contact-form-panel):** Form wrap; form has note, two fields (Name, Contact), submit button, form-legal with privacy link.

### Heading
- **.contact-heading:** `clamp(1.85rem, 4.2vw, 2.5rem)` — not oversized; two lines (heading-line + heading-accent). Fits “calm premium composition”.

### Form
- **Fields:** Only “Имя” and “Контакт” (name + phone/Telegram/email) — minimal as required.
- **.contact-form--minimal** and `.contact-form-fields` with `.contact-field` — spacing and layout correct.
- **Privacy:** `.form-legal` with link to `/privacy` — present and visible.

### Layout / balance
- **Desktop:** Two panels side by side; aside has `margin-top: auto` on `.contact-direct` so contacts sit at bottom of left column — balanced.
- **Mobile:** Card stacks; aside gets bottom border; form panel aligns start; legal centered.

### Summary — Contact
| Item           | Status | Notes |
|----------------|--------|--------|
| One composition| OK     | Single card, two panels. |
| Heading size   | OK     | Moderate, not overwhelming. |
| Direct contacts| OK     | Visible in same view with form. |
| Form fields    | OK     | Name + Contact only. |
| Privacy link   | OK     | Present in form-legal. |
| Mobile         | OK     | Stack, spacing, touch targets. |

Contact page matches “calm premium composition” and “premium studio contact flow”. No recovery changes required from this audit.

---

## 5. Cross-Cutting Notes

- **CSS conflicts:** No duplicate or clearly conflicting rules found for the four priority areas. Button and contact rules are ordered sensibly (base → modifiers → media).
- **HTML consistency:** Hero and case/journal cards use width/height where checked; case gallery images do not — only place to improve for CLS.
- **No blind edits:** This audit does not prescribe code changes; it only reports status and one optional recommendation (gallery img dimensions).

---

## 6. Recommended Next Steps (When Implementing)

1. **Optional — CLS:** Add `width` and `height` to all `.m-gallery img` in case pages (e.g. 1920 and 1080, or 21 and 9 for gallery-full) to reserve space before load.
2. **Optional — 480px / 320px:** Quick visual pass on very small viewports for overflow and readability.
3. **No change required** for: hero/case/journal image rules, responsive breakpoints, button system, or contact page structure/composition based on this audit.
