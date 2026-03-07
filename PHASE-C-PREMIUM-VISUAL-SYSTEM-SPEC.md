# PHASE C — Premium Visual System Specification

**Purpose:** Detailed definition of the premium visual system. No code — specification only. Implementation follows in a later phase.

**Principles:** One voice. Restraint. Consistency. Rest by default; motion on intent.

---

## 1. Typography

### 1.1 Font stack

- **Heading / display / labels / buttons:** `'Plus Jakarta Sans', sans-serif`
- **Body / long copy / form input value:** `'Inter', sans-serif`
- No third font. Wordmark uses Plus Jakarta Sans only.

### 1.2 Scale (modular scale 1.25, base 16px)

| Step | Size (rem) | Size (px) | Use |
|------|------------|-----------|-----|
| -2   | 0.64       | 10.24     | —   |
| -1   | 0.8        | 12.8      | Caption, small meta |
| 0    | 1          | 16        | Body default |
| 1    | 1.25       | 20        | Body large, lead |
| 2    | 1.5        | 24        | H3, card title |
| 3    | 2          | 32        | H2 block |
| 4    | 2.5        | 40        | H1 section |
| 5    | 3          | 48        | Hero secondary line (PRODUCTION) |
| 6    | 4          | 64        | Hero primary (SHAR) — min of clamp |
| 7    | 5          | 80        | Hero primary — mid |
| 8    | 6          | 96        | Hero primary — max |

**Clamp usage:** Where viewport scaling is required (hero, section titles), use scale steps as min/max. Example: hero SHAR = clamp(4rem, 8vw, 6rem); hero PRODUCTION = clamp(2rem, 4vw, 3rem). All other sizes use fixed scale steps where possible.

### 1.3 Roles and rules

| Role        | Font       | Size (scale step)     | Weight | Line-height | Letter-spacing | Color token      |
|-------------|------------|------------------------|--------|-------------|----------------|------------------|
| Display     | Plus Jakarta | 6–8 (hero SHAR)      | 600    | 1.05–1.1    | 0.12em         | brand (hero SHAR), primary (PRODUCTION) |
| H1          | Plus Jakarta | 4 (e.g. 2.5–4rem)   | 500    | 1.1         | 0.14em         | primary          |
| H2          | Plus Jakarta | 3 (e.g. 2–3rem)     | 500    | 1.12        | 0.14em         | primary or brand |
| H3          | Plus Jakarta | 2 (1.5–2rem)        | 600    | 1.15        | 0.12em         | primary          |
| Body        | Inter      | 0 (1rem)             | 300    | 1.65        | 0.02em         | secondary        |
| Body large  | Inter      | 1 (1.25rem)         | 300    | 1.7         | 0.02em         | secondary        |
| Caption     | Inter      | -1 (0.8rem)          | 400    | 1.5         | 0.04em         | tertiary         |
| Label       | Plus Jakarta | -2 (0.5625rem = 9px) | 600  | 1.2         | 0.24em         | brand            |
| Label muted | Plus Jakarta | -2 (9px)            | 600    | 1.2         | 0.24em         | tertiary         |
| Button      | Plus Jakarta | -2 or -1 (9–10px)   | 600    | 1.25        | 0.24em         | primary          |

### 1.4 Label hierarchy

- **Section label** (e.g. «ИЗБРАННЫЕ КЕЙСЫ», «О СТУДИИ»): Label token, color = brand. Optionally 0.625rem (10px) if section labels should read slightly larger than card tags.
- **Card tag** (e.g. «Гастрономия», «Аналитика», pack title «01 / Интеграция»): Label token, color = brand, size 9px. Same as section label or one step smaller so section > card.
- **Meta** (e.g. «Клиент», «Сроки», form labels «ТЕЛЕФОН»): Label muted — same style, color = tertiary, so they don’t compete with section/card labels.

### 1.5 Body and long copy

- **Short body** (hero subtitle, manifesto sub, contact text): Body or body large, secondary color, max-width ~48ch where it’s a reading block.
- **Long body** (modal case text, privacy page): Body, 1rem, line-height 1.7, secondary. Paragraph spacing: one spacing unit (e.g. space-md) between paragraphs.
- **Form placeholder:** Caption or label muted, uppercase optional, tertiary color.

### 1.6 Number and stat treatment

- **Big numbers** (stats, metrics): Plus Jakarta, weight 600, scale step 4 or 5 (2.5–3rem), brand color, letter-spacing 0.02–0.05em, line-height 1.1. Feel like “editorial fact”, not dashboard widget.

---

## 2. Buttons

### 2.1 Single grammar

All interactive buttons (nav, body, modals) use the same token set. No black in box-shadow anywhere. Two main variants: **primary** (filled accent) and **secondary** (outline / transparent). One **ghost** for minimal actions (close, lang).

### 2.2 Tokens (shared)

- **Border:** 1px solid, brand at 0.28–0.35 opacity (secondary); primary can use 0.4–0.5.
- **Background (secondary):** Transparent or linear gradient top-to-bottom: rgba(255,255,255,0.04) → 0.01 → transparent. No solid dark.
- **Background (primary):** Linear gradient: brand at ~0.15–0.2 → ~0.06. Soft, not flat.
- **Shadow (rest):** No black. Only: (1) optional very soft brand glow, e.g. 0 0 16px brand 0.03, 0 0 32px brand 0.015; (2) inset 0 1px 0 rgba(255,255,255,0.04–0.06). That’s it.
- **Shadow (hover):** Slightly stronger glow (0 0 12px brand 0.2, 0 0 24px brand 0.08), same inset. Optional: 0 0 0 1px brand 0.15. No black.
- **Shadow (focus-visible):** Outline 1px brand ~0.5, offset 2px; optional ring (0 0 0 3px brand 0.08). No black.

### 2.3 Primary button (e.g. ТЕЛЕФОН, Submit, Обсудить проект)

- Border: brand 0.35–0.45.
- Background: gradient brand ~0.18 → ~0.06.
- Rest shadow: glow + inset (no black).
- Hover: border brand 0.55; background slightly stronger; glow as above.
- Active: slight scale 0.98 or no transform; same shadow.
- No infinite animation. Optional: one very subtle pulse only on a single hero or modal CTA (e.g. 8–10s, low opacity), not on every button.

### 2.4 Secondary button (e.g. СВЯЗАТЬСЯ, СМОТРЕТЬ КЕЙС, Развернуть портфель)

- Border: white 0.1 or brand 0.28.
- Background: transparent or very light gradient (white 0.04 → transparent).
- Rest shadow: glow + inset only (no black).
- Hover: border brand 0.5–0.6; background gradient with hint of brand (0.03–0.02); glow as above.
- Active: same as primary (scale 0.98 optional).

### 2.5 Ghost (close, language switcher)

- Border: 1px solid white 0.06–0.08, or no border (text only).
- Background: transparent or rgba(3,3,3,0.6) for close so it’s visible on video.
- No glow at rest. Hover: border or text color shift; optional very soft glow.
- Language switcher: text only, no border/background; hover = opacity/color change.

### 2.6 Sizing and layout

- **Height:** Consistent vertical padding so all buttons in the same context share height. E.g. nav: 40–44px; body primary/secondary: 44–48px (padding 14px 24px or 16px 28px).
- **Border-radius:** 2px everywhere (SGAER).
- **Font:** Plus Jakarta, 9–10px, weight 600, uppercase, letter-spacing 0.24em.

### 2.7 Where each type is used

- **Primary:** Nav “ТЕЛЕФОН”; form submit; modal CTA “Обсудить проект”; price card “Заказать” for the highlighted pack.
- **Secondary:** Nav “СВЯЗАТЬСЯ”; “СМОТРЕТЬ КЕЙС” on cases; “Развернуть портфель”; other price card buttons; modal CTA when not primary.
- **Ghost:** Modal “ЗАКРЫТЬ”; language RU/EN.

---

## 3. Header

### 3.1 Structure (unchanged)

Logo (left) | Nav links + Lang | Contact + Phone (right). Hamburger on mobile.

### 3.2 States

- **Default (top of page):** Background transparent. No border. Logo and links visible; buttons use same secondary/primary grammar as body (no black shadows). So: “СВЯЗАТЬСЯ” = secondary (outline, glow+inset only); “ТЕЛЕФОН” = primary (filled, glow+inset only).
- **Scrolled (or modal open):** Background rgba(3,3,3,0.88–0.9). Backdrop-filter blur(16px). Border-bottom 1px solid white 0.03. Same button styles; no new shadows.

### 3.3 Logo in header

- Font: Plus Jakarta Sans, 14px (or 0.875rem), weight 600, letter-spacing **0.12em** (locked to wordmark spec).
- Treatment: Optional subtle gradient (white → brand → white) and optional **hover-only** shimmer (no infinite). If shimmer is removed, solid white or very subtle gradient is enough. The important part is that tracking and weight match the hero wordmark lock.

### 3.4 Nav links

- Plus Jakarta, 10px, weight 500, letter-spacing 0.24em, uppercase. Color: primary at 0.75–0.8 opacity; hover: primary, optional soft text-shadow (brand glow). No underline.

### 3.5 Spacing in header

- Horizontal padding: same as content gutter (e.g. 4% or 24–32px). Vertical padding: one spacing unit (e.g. space-md) so header height is ~64–72px. Gap between nav links and between link group and buttons: one spacing unit (e.g. space-md or space-lg).

### 3.6 Z-index and behavior

- Header above all content and modals (z-index higher than modal). When a case is open, header stays in “scrolled” state so it remains visible and clickable. No change to current behavior; only visual tokens (buttons, logo) align to this spec.

---

## 4. Spacing

### 4.1 Base scale (8px base)

| Token      | Value  | Use |
|------------|--------|-----|
| space-2xs  | 4px    | Tight inline gaps |
| space-xs   | 8px    | Inline, icon-text |
| space-sm   | 16px   | In-component gaps |
| space-md   | 24px   | Between related blocks, form fields |
| space-lg   | 40px   | Between sections-in-section, card padding |
| space-xl   | 56px   | Section internal rhythm |
| space-2xl  | 80px   | Section padding (compact sections) |
| space-3xl  | 120px  | Section padding (standard) |
| space-4xl  | 160px  | Large section or modal top padding |

### 4.2 Content width

- **Max content width:** 1200px for: manifesto, work grid, pricing, order, modal body, footer. Margin auto; horizontal padding from gutter.
- **Gutter:** 4% of viewport or 24px minimum (e.g. max(24px, 4%)). Same left/right for all sections and modals.

### 4.3 Section rhythm

- **Hero:** Full viewport height. Content (wordmark + subtitle) at bottom; padding-bottom space-2xl; padding horizontal = gutter.
- **Manifesto:** Padding top/bottom space-2xl (80px). Tighter than standard so it reads as one statement block. Gutter as above; inner max-width 1200px.
- **Social proof, Work, Team, Pricing, Journal:** Padding top/bottom space-3xl (120px). Gutter; content max-width 1200px.
- **Order:** Same as above (space-3xl). Two-column grid gap: 10% or space-2xl.
- **Footer:** Padding top/bottom space-xl (56px). Border-top 1px solid line token. Same gutter and max-width.

### 4.4 Component-internal spacing

- **Card padding (price, journal, client):** space-lg (40px) or space-xl (56px) inside card.
- **Grid gaps:** Work grid 2.5vw or space-lg; pricing space-md or space-lg; clients space-md. Stagger/gap from scale.
- **Form:** Label to input space-sm; between fields space-md; button margin-top space-md.

---

## 5. Surfaces

### 5.1 Background

- **Page:** #030303. No variation.
- **Modal overlay:** rgba(3,3,3,0.97). Covers viewport when modal open.

### 5.2 Raised surfaces (cards, panels)

- **Fill:** rgba(255,255,255,0.02)–0.03. Not 0.01 (too faint).
- **Border:** 1px solid rgba(255,255,255,0.06). Defined token (e.g. --surface-border). So cards are clearly “surfaced” rather than floating.
- **Border-radius:** 3px for cards (price, journal, client logo, case card). 2px for buttons only.
- **Where:** Price cards, journal cards, client logo tiles, case cards (optional very subtle fill 0.01 if card is only image + overlay; border still 0.06).

### 5.3 Dividers and lines

- **Section divider / line:** 1px solid rgba(255,255,255,0.04). One token (--line). Used for: section border-top, footer border-top, label::after line, optional between content blocks.
- **Surface border:** 1px solid rgba(255,255,255,0.06). Used for card outlines. Do not use 0.01–0.03 for cards; reserve 0.04 for dividers, 0.06 for surfaces.

### 5.4 Overlays (gradients)

- **Hero overlay:** Keep current idea: gradient from bottom (dark) and optional side, so wordmark and subtitle stay readable. No new color; only ensure contrast for type.
- **Case card overlay (on image):** Gradient 0deg, transparent 70% → dark 92% at bottom, so text and button sit on readable area. Same as today; no new tokens.
- **Modal:** Solid overlay only (no gradient on modal itself).

### 5.5 Hover state for surfaces

- **Cards (price, journal, client, case):** On hover, border can shift to white 0.1 or brand 0.12–0.15; optional very soft brand glow (0 0 40px brand 0.05). Slight lift (translateY -2px to -6px) with transition. No lens flare; optional very subtle static gradient overlay on case card only.

---

## 6. Motion

### 6.1 Principle

- **Default:** Rest. No infinite animations on UI (logo, buttons).
- **Motion on:** Hover, focus, scroll (reveal), and one-time (page load, modal open).

### 6.2 Easing

- Single easing: cubic-bezier(0.16, 1, 0.3, 1). Use for all transitions and keyframes (except reduced-motion override).

### 6.3 Durations

- **Fast (micro):** 0.25s — hover color, border, opacity on links and buttons.
- **Normal:** 0.4–0.5s — panel hover (lift, shadow), focus ring, modal open.
- **Slow:** 0.6–0.8s — scroll-triggered reveal, optional modal backdrop.

### 6.4 Scroll reveal

- **Trigger:** Element enters viewport (IntersectionObserver or equivalent).
- **Effect:** Opacity 0 → 1; transform translateY(16px) → 0. Duration 0.6–0.8s, same easing.
- **Stagger:** For grids (e.g. case cards, price cards, stats): delay each item by 60–80ms (e.g. 0ms, 70ms, 140ms, …). One stagger increment; no random values.

### 6.5 Modal

- **Open:** Opacity 0 → 1; optional translateY(8px) → 0. Duration 0.4–0.5s. No decoration inside modal (no inner animation on content).
- **Close:** Reverse or instant; no extra animation.

### 6.6 Logo

- **No infinite shimmer.** Option A: Remove. Option B: Shimmer only on hover (e.g. 1s run once or 2s loop while hovered). Default state: static (solid or subtle gradient).

### 6.7 Buttons

- **No infinite breath.** Rest: static shadow (glow + inset). Hover/focus: transition to stronger glow and border (0.4s). Active: optional scale 0.98, 0.2s.

### 6.8 Case card hover

- **Keep:** Image filter (grayscale, brightness), overlay opacity, optional slight scale (1.02) and lift. Border and shadow transition per surfaces spec.
- **Remove or drastically reduce:** Moving “lens ray” / beam. If a highlight is desired, use a static or very subtle gradient overlay, not an animated sweep.

### 6.9 Reduced motion

- Respect prefers-reduced-motion. Set animation-duration to 0.01ms and animation-iteration-count to 1 for all decorative motion; keep only essential transitions (e.g. opacity for modal).

---

## 7. Wordmark refinement

### 7.1 Lock (single definition)

The wordmark is “SHAR” + “PRODUCTION” with fixed typographic relationship. Same lock everywhere it appears (nav, hero, footer).

- **Font:** Plus Jakarta Sans only.
- **Weight:** 600 for “SHAR”, 300 for “PRODUCTION” (hero only; nav and footer can be 600 for both or 600/500).
- **Letter-spacing:** 0.12em for both words. No 0.18em or 0.25em — one value so the mark is recognizable at any size.
- **Ratio:** “PRODUCTION” optically ~0.5–0.55 the cap height of “SHAR” in hero; in nav they can be one line, same size (e.g. 14px) with same tracking.
- **Color (hero):** “SHAR” = brand (#9c0404); “PRODUCTION” = primary white at 0.8–0.85 opacity.
- **Color (nav):** Optional gradient (white → brand → white) or solid white; no competing animation at rest.
- **Color (footer):** Tertiary or caption color (e.g. white 0.4).

### 7.2 Hero wordmark

- **Role:** The main brand moment. Give it space: no stats, no extra CTAs in the same block; one subtitle line below is enough.
- **Size:** “SHAR” clamp(4rem, 8vw, 6rem); “PRODUCTION” clamp(2rem, 4vw, 3rem). Line-height 1.05–1.1. Both block; “PRODUCTION” directly under “SHAR” with a small margin (e.g. space-xs to space-sm).
- **Effect:** Optional very soft text-shadow on “SHAR” (brand glow) for legibility on video. No gradient on hero wordmark required; solid colors are enough. No animation on hero wordmark.

### 7.3 Nav logo

- Size: 14px (0.875rem). Same tracking 0.12em, weight 600. Can be one line “SHAR PRODUCTION” or “SHAR” + “PRODUCTION” with a space. Optional: subtle gradient or hover-only shimmer; at rest should feel like the same lock as hero, smaller.

### 7.4 Footer

- “SHAR PRODUCTION” or “© 2026 SHAR PRODUCTION”: same font, same tracking 0.12em. Size: caption (0.8rem) or label (9px). Color: tertiary. No gradient; no animation.

### 7.5 Summary

- One letter-spacing: **0.12em**.
- One font: **Plus Jakarta Sans**.
- Weights: 600 for “SHAR”, 300 or 500/600 for “PRODUCTION” depending on context.
- Hero = largest, most space, no motion. Nav = smaller, optional subtle treatment. Footer = smallest, muted. All feel like the same signature.

---

## 8. Summary table (quick reference)

| Area        | Key tokens / rules |
|-------------|--------------------|
| **Typography** | Scale 1.25; roles Display / H1–H3 / Body / Caption / Label; Plus Jakarta headings & labels, Inter body; label hierarchy section vs card vs meta. |
| **Buttons** | One grammar; no black in shadow; primary (filled) vs secondary (outline) vs ghost; glow + inset only; 2px radius; nav uses same as body. |
| **Header** | Transparent → scrolled (backdrop + border); logo 0.12em lock; nav buttons = secondary + primary from same token set. |
| **Spacing** | 8px base scale (space-xs to space-4xl); content max 1200px; gutter 4%; manifesto 2xl, sections 3xl, footer xl. |
| **Surfaces** | BG #030303; raised fill 0.02–0.03, border 0.06; divider --line 0.04; no 0.01 borders on cards. |
| **Motion** | Rest by default; easing one; fast 0.25s / normal 0.4–0.5s / slow 0.6–0.8s; no infinite logo/button; reveal stagger 60–80ms; no lens ray. |
| **Wordmark** | 0.12em everywhere; Plus Jakarta 600/300 or 600/500; hero = focus and space; nav = optional gradient/hover shimmer; footer = muted. |

---

*Document: PHASE C — Premium Visual System Spec. Definition only; no code. Implementation in a later phase.*
