# Premium Visual System Redesign Plan

**Purpose:** Redesign and unify the visual system so the site feels restrained, premium, cinematic, expensive and studio-grade. Same overall design direction — significantly elevated. **No implementation in this phase.**

**Principles:** Expensive. Minimal. Luxurious. Controlled. Atmospheric. Studio-grade. No cheap black placeholders. No childish glow. No dribbble gimmicks.

---

## 1. Premium Visual Diagnosis

### Why the site still feels cheap

- **Buttons:** Despite CTA classes and “no black” intent, the base treatment is still one family with small tweaks. Primary uses a soft fill (brand 0.12 → 0.04) and glow; the **difference from secondary is minimal**. Rest state reads as a faint dark bar; hover adds glow that can feel decorative rather than intentional. The `::after` shimmer strip and multiple shadow layers add visual noise. **Result:** Buttons feel like one style copied everywhere, not art-directed. No clear “light, clean, premium” rest state.

- **Typography:** A scale exists in variables (--text-xs to --text-display), but **editorial hierarchy is weak**. Section labels, card tags, and body share similar visual weight. Display (hero) vs H2 (manifesto, order) vs body vs caption is not sharply differentiated. Font pairing (Plus Jakarta + Inter) is good; **weights and sizes are not used to create clear “expensive” contrast**. The page reads as one level, not as a directed cinematic sequence.

- **Wordmark:** Nav logo uses a gradient and hover background-position shift. Hero uses a separate treatment (SHAR in brand, PRODUCTION smaller). **There is no single locked wordmark:** nav and hero do not feel like the same signature. Letter-spacing is inconsistent (0.1em hero, 0.1em logo; labels use 0.22em). The wordmark feels decorative and slightly awkward, not tight and branded.

- **Surfaces:** Border and fill tokens (0.08, 0.035) are timid. Cards (cases, price, journal, clients) read as **barely there**. For luxury-minimal, surfaces should be either clearly visible (committed panels) or absent (pure space). Current state is in-between. One price-card hover still uses **black shadow** (`0 12px 40px rgba(0,0,0,0.3)`), which contradicts the “no black” rule and cheapens the card.

- **Hero:** The hero has a CTA button directly under the subtitle. For a “wordmark + subtitle only” art-directed frame, this **reduces focus and feels redundant** with nav “СВЯЗАТЬСЯ”. The hero should be one clear moment: brand + one line of promise. Extra CTA weakens the composition and makes the screen feel like a generic landing.

- **Section rhythm:** Sections use similar padding (e.g. space-3xl) and similar label treatment. There is no **compression/expansion** (e.g. manifesto tighter, work more spacious). No clear “act 1 / act 2 / act 3”. The page feels like a long form with the same tone, not a directed storefront.

- **Motion and effects:** `lens-ray` and `card-ray` keyframes exist but are unused — dead code. Button `::after` pseudo-element adds a constant “shimmer” strip. These suggest **leftover patches** and dilute a single motion language. Hover glow on buttons (0.25, 0.12, 0.04) can read as “effect for effect’s sake” if not restrained.

- **Trust and metrics:** Counters animate from 0; if they fail or are slow, **zero is visible** and damages trust. Numbers should either be static final values or animate only after in-view with a very short delay so 0 is not the first thing seen.

---

## 2. Typography System Recommendation

### 2.1 Goals

- **More premium:** Clear roles (Display / H1 / H2 / H3 / Body / Caption / Label).  
- **Better pairing/weights:** One heading font, one body font; use weight and size to create hierarchy, not color alone.  
- **Tighter hierarchy:** One “hero” level (display), one “section” level (H1/H2), one “block” level (H3), one “support” level (body, caption, label).  
- **Better rhythm:** Consistent line-height and spacing between type and blocks.  
- **More cinematic and controlled:** Slightly tighter tracking on display; relaxed but controlled on body; labels as a distinct small-cap layer.

### 2.2 Font stack (unchanged in spirit, refined in use)

- **Headings, display, labels, buttons:** `'Plus Jakarta Sans', sans-serif`  
- **Body, long copy, form:** `'Inter', sans-serif`  
- No third font. Wordmark = Plus Jakarta only.

### 2.3 Scale and roles

Use a **modular scale (e.g. 1.25)** with fixed steps. Define **roles**, not ad-hoc sizes:

| Role       | Font         | Size (rem) / clamp        | Weight | Line-height | Letter-spacing | Use |
|------------|--------------|----------------------------|--------|-------------|----------------|-----|
| Display    | Plus Jakarta | clamp(3.5rem, 7vw, 5.5rem) | 600    | 1.05–1.1    | 0.08–0.1em     | Hero SHAR |
| Display-2  | Plus Jakarta | clamp(1.75rem, 3.5vw, 2.75rem) | 300  | 1.1         | 0.08–0.1em     | Hero PRODUCTION |
| H1         | Plus Jakarta | 2.5rem – 3rem              | 500    | 1.1         | 0.12em         | Section titles (e.g. order) |
| H2         | Plus Jakarta | 2rem – 2.5rem              | 500    | 1.12        | 0.12em         | Manifesto, block titles |
| H3         | Plus Jakarta | 1.5rem – 1.75rem           | 600    | 1.15        | 0.1em          | Card titles, modal titles |
| Body       | Inter        | 1rem                       | 300    | 1.65–1.7    | 0.02em         | Paragraphs |
| Body-large | Inter        | 1.125rem                   | 300    | 1.7         | 0.02em         | Lead, hero subtitle |
| Caption    | Inter        | 0.8rem                     | 400    | 1.5         | 0.04em         | Meta, footer |
| Label      | Plus Jakarta | 0.5625rem – 0.625rem (9–10px) | 600 | 1.2         | 0.2–0.24em     | Section labels, tags |

### 2.4 Label hierarchy

- **Section label** (e.g. ИЗБРАННЫЕ КЕЙСЫ, ДОВЕРИЕ В ЦИФРАХ): One token. Color = brand. Size 9–10px. This is the “chapter” marker.  
- **Card tag** (e.g. Гастрономия, 01 / Интеграция): Same or one step smaller (9px). Color = brand or tertiary so section > card.  
- **Meta** (form labels, “Клиент”, “Сроки”): Same style, color = tertiary only.

### 2.5 Body and rhythm

- **Hero subtitle:** Body-large, secondary color, max-width ~48ch.  
- **Manifesto sub, contact intro:** Body or body-large, secondary.  
- **Long copy (case body, journal):** Body, 1rem, line-height 1.7. Paragraph spacing = one spacing unit (e.g. space-md).  
- **Numbers/stats:** Plus Jakarta, weight 600, 2.5–3rem, brand color, letter-spacing 0.03–0.05em. Feel like “editorial fact”, not widget.

### 2.6 Implementation notes (when you implement)

- Replace ad-hoc `font-size` and `letter-spacing` with role-based classes or CSS custom properties per role.  
- Ensure no section uses the same visual weight for label and heading; always one step difference.  
- Remove redundant `text-shadow` on body copy; reserve subtle shadow only for display/hero if needed for legibility on video.

---

## 3. Button System Recommendation

### 3.1 Goals

- **Actually change this time:** Clear visual difference between primary and secondary; no “one style with tiny tweaks”.  
- **No cheap black placeholder feel:** Rest state must feel light, transparent, and intentional — not a dark bar.  
- **Lighter, cleaner, more premium:** Border + subtle fill only; no heavy background.  
- **Subtle hover fill:** Hover = slight increase in fill and glow, not a full solid background.  
- **Controlled, elegant motion:** One easing, consistent duration; no bounce, no overshoot.  
- **No childish glow, no dribbble gimmicks:** Glow only as subtle depth (brand at low opacity), never neon or multiple colored layers.

### 3.2 Single grammar (all non-header buttons)

- **Border:** 1px solid. Secondary: white 0.08–0.12 or brand 0.25–0.3. Primary: brand 0.35–0.45.  
- **Background (rest):**  
  - **Secondary:** Transparent or linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%). No dark base.  
  - **Primary:** linear-gradient(180deg, rgba(156,4,4,0.08) 0%, rgba(156,4,4,0.02) 100%). Soft, not flat; no black.  
- **Shadow (rest):** No black anywhere. Allowed: (1) optional very soft brand glow, e.g. `0 0 20px rgba(156,4,4,0.02)`; (2) `inset 0 1px 0 rgba(255,255,255,0.04)`. That’s it.  
- **Shadow (hover):** Slightly stronger glow: `0 0 16px rgba(156,4,4,0.12)`, `0 0 32px rgba(156,4,4,0.04)`; same inset. No black.  
- **Focus-visible:** outline 1px brand 0.5, offset 2px; optional ring `0 0 0 3px rgba(156,4,4,0.08)`.

### 3.3 Primary (ТЕЛЕФОН, Submit, Обсудить проект, price “Обсудить”)

- Border: brand 0.4.  
- Background: gradient brand 0.08 → 0.02 (lighter than current 0.12 → 0.04).  
- Rest shadow: glow + inset only.  
- Hover: border 0.55; background gradient 0.12 → 0.04; glow as above.  
- Active: scale(0.99), 0.2s.  
- **No** infinite animation. Optional: one very subtle pulse on a single hero CTA only (e.g. 8–10s, very low opacity), if hero CTA is kept.

### 3.4 Secondary (СВЯЗАТЬСЯ, СМОТРЕТЬ КЕЙС, Все кейсы, Заказать проект)

- Border: white 0.1 or brand 0.28.  
- Background: transparent or gradient white 0.03 → 0.  
- Rest shadow: glow + inset only (very soft).  
- Hover: border brand 0.5; background gradient with hint of brand (0.02–0.01); glow as above.  
- Active: same as primary.

### 3.5 Ghost (close, language, case back link)

- Border: 1px solid white 0.06 or none (text-only).  
- Background: transparent.  
- No glow at rest. Hover: border or text color shift; optional very soft glow.

### 3.6 What to remove or avoid

- **Remove** the `::after` shimmer strip from buttons (the sliding gradient overlay). It adds noise, not premium.  
- **Remove** any black in box-shadow (e.g. price-card hover).  
- **Avoid** multiple stacked glow layers (e.g. 4–5 layers). Two layers max: one tight, one soft.  
- **Avoid** hover “lift” (translateY -1px) if it feels gimmicky; prefer opacity/border/shadow change only, or a very subtle lift (1–2px).

### 3.7 Sizing and layout

- **Height:** Consistent vertical padding. E.g. nav 40–44px; body buttons 44–48px (14px 24px or 16px 28px).  
- **Border-radius:** 2px everywhere.  
- **Font:** Plus Jakarta, 9–10px, weight 600, uppercase, letter-spacing 0.2–0.24em.

---

## 4. Wordmark / Logo Refinement

### 4.1 Goal

- SHAR Production should feel **tighter, more branded, less awkwardly spaced**. One lock everywhere (nav, hero, footer).

### 4.2 Single lock

- **Font:** Plus Jakarta Sans only.  
- **Letter-spacing:** **0.1em** for both words everywhere. No 0.18em or 0.22em on the wordmark itself (reserve 0.22em for section labels, not the brand mark).  
- **Weight:** 600 for “SHAR”, 300 for “PRODUCTION” in hero; in nav/footer can be 600 for both or 600/500.  
- **Ratio:** In hero, “PRODUCTION” optically ~0.5–0.55 the cap height of “SHAR”. In nav, one line, same size (e.g. 14px), same tracking.

### 4.3 Hero wordmark

- **Role:** The main brand moment. No stats, no extra CTAs in the same block; one subtitle line below is enough.  
- **Size:** SHAR = clamp(3.5rem, 7vw, 5.5rem); PRODUCTION = clamp(1.75rem, 3.5vw, 2.75rem). Line-height 1.05–1.1.  
- **Color:** SHAR = brand (#9c0404); PRODUCTION = white 0.85.  
- **Effect:** Optional very soft text-shadow on SHAR for legibility on video only. No gradient on hero wordmark; solid colors. No animation.

### 4.4 Nav logo

- Size: 14px (0.875rem). Same tracking **0.1em**, weight 600.  
- **Treatment:** Prefer solid white or very subtle gradient (white → brand → white). If shimmer is kept, **hover-only**, one run (e.g. 1s), not infinite. At rest, must feel like the same lock as hero, smaller.

### 4.5 Footer

- “SHAR PRODUCTION” or “© 2026 SHAR Production”: same font, same tracking 0.1em. Size: caption (0.8rem). Color: tertiary. No gradient; no animation.

### 4.6 Summary

- One letter-spacing for the wordmark: **0.1em**.  
- One font: Plus Jakarta Sans.  
- Hero = largest, most space, no motion. Nav = smaller, optional hover-only treatment. Footer = smallest, muted. All read as the same signature.

---

## 5. Surface / Spacing Recommendation

### 5.1 Surfaces (borders, transparency, “air”)

- **Background:** Page #030303. No variation.  
- **Raised surfaces (cards):**  
  - **Fill:** rgba(255,255,255,0.025)–0.04. Not 0.01 (invisible) and not 0.08 (heavy).  
  - **Border:** 1px solid rgba(255,255,255,0.07)–0.08. Cards should read as clearly “surfaced”, not floating.  
  - **Border-radius:** 3px for cards; 2px for buttons only.  
- **Dividers:** 1px solid rgba(255,255,255,0.04). Section border-top, footer border-top, label::after.  
- **No black in any surface or shadow.** Audit and remove every `rgba(0,0,0,…)` from card/button shadows.

### 5.2 Transparency and layers

- **Nav (scrolled):** rgba(3,3,3,0.88)–0.9, backdrop-filter blur(16px), border-bottom white 0.03.  
- **Overlays (hero, case card):** Keep current idea; ensure type contrast. No new heavy overlays.  
- **Modals:** Solid overlay only; no gradient on the modal panel itself.

### 5.3 Spacing rhythm (premium “air”)

- **Base scale:** 8px. space-xs (8) → space-sm (16) → space-md (24) → space-lg (40) → space-xl (56) → space-2xl (80) → space-3xl (120) → space-4xl (160).  
- **Gutter:** 4% or max(24px, 4%). Same left/right for all sections.  
- **Section padding:**  
  - **Hero:** Full viewport height; content at bottom; padding-bottom space-2xl; horizontal = gutter.  
  - **Manifesto:** Tighter than standard — padding top/bottom space-2xl (80px). Reads as one statement block.  
  - **Other sections (work, team, pricing, order, journal, trust):** space-3xl (120px) top/bottom.  
  - **Footer:** space-xl (56px), border-top line token.  
- **Component-internal:** Card padding space-lg or space-xl; grid gaps from scale (e.g. space-lg between cards).  
- **Section density:** Introduce one “compression” (manifesto) and one “expansion” (e.g. work grid with more air below label). So the scroll rhythm is not flat.

### 5.4 Hover state for surfaces (cards)

- Border: white 0.1 or brand 0.12–0.15.  
- Optional very soft brand glow: `0 0 40px rgba(156,4,4,0.04)`.  
- Slight lift: translateY(-2px) to (-4px), 0.4s.  
- **No** lens flare, no animated sweep. Remove unused keyframes (lens-ray, card-ray) or leave unused and do not apply.

---

## 6. Motion Principles

### 6.1 Philosophy

- **Rest by default.** No infinite animations on UI (logo, buttons).  
- **Motion on intent:** Hover, focus, scroll (reveal), and one-time (page load, modal open).  
- **Controlled and elegant:** One easing (e.g. cubic-bezier(0.16, 1, 0.3, 1)). Consistent durations. No bounce, no overshoot.

### 6.2 Easing and duration

- **Easing:** Single token for all transitions and keyframes (except reduced-motion).  
- **Fast (micro):** 0.2–0.25s — hover color, border, opacity on links and buttons.  
- **Normal:** 0.4–0.5s — panel hover (lift, shadow), focus ring, modal open.  
- **Slow:** 0.6–0.8s — scroll-triggered reveal, optional modal backdrop.

### 6.3 Scroll reveal

- Trigger: element in viewport.  
- Effect: opacity 0 → 1; translateY(12–16px) → 0. Duration 0.6–0.8s.  
- Stagger: one increment (e.g. 60–80ms) per item in grid; no random values.

### 6.4 Buttons

- Rest: static (glow + inset only).  
- Hover/focus: transition to slightly stronger glow and border, 0.35–0.4s.  
- Active: scale(0.99), 0.2s.  
- **No** infinite breath, no constant shimmer.

### 6.5 Logo

- **No** infinite shimmer. Option A: Remove. Option B: Shimmer only on hover, one run (1–2s). Default = static (solid or subtle gradient).

### 6.6 Case card hover

- Keep: image filter (grayscale, brightness), overlay opacity, optional slight scale (1.02) and lift.  
- Remove or do not use: moving “lens ray” / beam. If highlight is desired, use static or very subtle gradient overlay.

### 6.7 Reduced motion

- Respect `prefers-reduced-motion`. Set decorative animation duration to 0.01ms and iteration-count 1; keep only essential transitions (e.g. opacity for modal).

---

## 7. Implementation Priorities

Apply in this order so the site improves in clear steps and stays stable.

1. **Remove cheapening elements (quick wins)**  
   - Remove hero CTA button (or move to a single, art-directed placement if you must keep one).  
   - Remove button `::after` shimmer strip.  
   - Remove all black from box-shadow (price-card, any other).  
   - Remove or do not use lens-ray / card-ray on any element.

2. **Typography system**  
   - Introduce role-based tokens (Display, H1, H2, H3, Body, Body-large, Caption, Label).  
   - Apply to hero, manifesto, section labels, cards, form, footer.  
   - Strengthen label hierarchy (section label vs card tag vs meta).

3. **Wordmark lock**  
   - Unify letter-spacing to 0.1em for “SHAR” and “PRODUCTION” in nav and hero.  
   - Align nav logo treatment (solid or hover-only shimmer).  
   - Ensure hero wordmark has no animation; optional soft text-shadow only for legibility.

4. **Button system**  
   - Implement primary/secondary/ghost with the recommended rest state (lighter fill, no black, subtle glow + inset).  
   - Apply subtle hover (slight fill increase, controlled glow).  
   - Same grammar for nav and body buttons (nav already close; align body and case buttons).

5. **Surfaces and spacing**  
   - Set surface fill and border to the recommended tokens (0.025–0.04 fill, 0.07–0.08 border).  
   - Apply section rhythm (manifesto 2xl, others 3xl, footer xl).  
   - Add one compression (manifesto) and one expansion (e.g. work) for scroll rhythm.

6. **Motion cleanup**  
   - Single easing and duration tokens.  
   - No infinite animations on logo/buttons.  
   - Stagger for grids with one delay step.  
   - prefers-reduced-motion handling.

7. **Trust and metrics**  
   - Ensure counters do not show 0 on first paint: either static final values or start animation only after in-view with very short delay so 0 is not visible.

8. **QA**  
   - Check: hero feels expensive and art-directed; buttons feel lighter and premium; wordmark feels tight and branded; no black in shadows; no redundant hero CTA (or one intentional CTA); section rhythm has variation; motion is restrained.

---

*Document: Premium Visual System Redesign Plan. Definition only; no code. Implementation in a later phase.*
