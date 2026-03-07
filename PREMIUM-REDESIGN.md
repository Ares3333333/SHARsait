# Premium Redesign — SHAR Production

Full premium audit and controlled flagship redesign. No text changes. No content removal.

---

## 1. Brutally Honest Premium Audit

### 1.1 What makes the site look cheap

- **Labels everywhere look the same:** Section labels (ИЗБРАННЫЕ КЕЙСЫ, КОМАНДА, СТОИМОСТЬ), card tags, manifesto title, and meta labels all use 9px, uppercase, red, high letter-spacing, and `text-shadow: 0 0 10px var(--aura-base)`. The glow on every label reads as “effect for effect’s sake” and flattens hierarchy. Premium editorial uses **one** accent level for the main section label and **muted** for the rest.
- **Buttons still feel like one blob:** `.btn-minimal`, `.watch-case-btn`, nav buttons share similar treatment. There is no **primary vs secondary vs ghost** distinction. “Заказать проект”, “Все кейсы →”, “СМОТРЕТЬ КЕЙС”, and “СВЯЗАТЬСЯ” all look like the same action. Premium sites use clear CTA hierarchy so the main action (contact/discuss) is visually dominant.
- **Surfaces are timid:** Cards use `--surface-border: 0.06`, `--surface-fill: 0.025`. They barely read as surfaces; they look like default divs. Premium often commits: either clearly visible panels (e.g. 0.08 border, 0.03 fill) or truly borderless. Current state is in-between and feels unfinished.
- **Typography has no scale:** Sizes are ad hoc (`clamp(2.5rem, 5vw, 4.5rem)` for stats, `clamp(2rem, 4vw, 3.5rem)` for manifesto). There is no documented type scale (e.g. 1.25 ratio). Rhythm feels arbitrary, not art-directed.
- **Logo/wordmark is decorative, not locked:** Gradient + shimmer on hover reads as “we added an effect”. Premium wordmarks are a **locked asset**: one weight, one tracking, one treatment everywhere. The hero wordmark (SHAR + PRODUCTION) and nav logo are not obviously the same lock.
- **Stats block feels like a dashboard widget:** Three numbers in a row with red and labels. For a cinema brand it reads “landing template” not “editorial fact”. If kept, it should feel more like a single statement, less like a metrics strip.
- **Price cards:** Same border/fill as everything else; “Заказать проект” and “Обсудить проект” look identical. No visual hierarchy between primary and secondary action.
- **Contact section:** One big heading + form. No clear “primary path” (e.g. one main CTA above the fold or at the end of hero). CTA logic is flat.

### 1.2 What makes the homepage feel weak / template-like

- **No single hero CTA:** Hero has wordmark + subtitle but no clear “Discuss project” or “View work” button. The first decision point is scroll. Premium storefronts usually offer one primary next step in the hero.
- **Sections are evenly weighted:** Manifesto, trust, work, team, pricing, journal, order all have similar section padding and label treatment. There is no “act 1 / act 2 / act 3” rhythm. Feels like a long form, not a directed journey.
- **Featured cases:** Four cards in a grid with identical treatment. No “hero case” (e.g. first case larger or full-width). Everything has equal weight, so nothing feels curated.
- **Journal on homepage:** Three cards in a horizontal scroll. Fine, but the label “ЖУРНАЛ / ТЕХНОЛОГИИ” uses the same style as “ИЗБРАННЫЕ КЕЙСЫ”, so editorial doesn’t feel distinct from commercial.

### 1.3 What in buttons still feels low-end

- **Same treatment for every action:** Outline, light gradient, glow on hover. No distinction between “main action” (contact, submit) and “secondary” (view cases, expand). They look like one button style copied everywhere.
- **Padding and proportion:** 16px 28px is fine but not distinctive. Premium buttons often have a clearer proportion (e.g. more horizontal than square) and slightly more breathing room.
- **Hover:** Border + glow change is good, but the fill is still subtle to the point of being invisible. A **secondary** button can stay that way; a **primary** CTA should have a slightly more visible hover state (still no heavy solid fill).

### 1.4 What in typography / spacing / logo feels cheap

- **Typography:** No scale. Mix of clamp() values. Body is 300 everywhere; no lead vs body distinction. Line-heights are set but sizes are not derived from a scale, so the page doesn’t feel “designed”.
- **Spacing:** Section padding is uniform (--space-3xl). Hero has one padding; then every section repeats. No compression/expansion rhythm (e.g. tight manifesto, breath after work, then contact).
- **Logo:** 14px in nav, gradient, 0.12em tracking. Hero: SHAR 4–6rem, PRODUCTION 2–3rem, 0.12em. They’re close but not a single lock (e.g. same tracking, same weight rule). Shimmer on hover adds motion without meaning.

### 1.5 What in architecture hurts premium perception

- **Homepage is still long:** Hero, manifesto, trust, work (4 cases), team, pricing, journal, order. That’s 8 blocks. For a “short cinematic storefront” we could compress trust + work + one clear CTA and make the rest “below the fold” with clearer section breaks.
- **Cases are separated (good)** but the **cases index** uses the same label and grid as the homepage. No distinct “portfolio” feel (e.g. different section title, or a short intro line).
- **Contact is at the end:** Single contact section. No sticky CTA or repeated “Discuss” in the nav only. Users who want to act fast have to scroll. Not wrong, but the CTA logic could be stronger (see CTA plan).

### 1.6 What in interaction hurts premium perception

- **Scroll reveal:** Same 16px translateY and 0.7s for every section. Works but is generic. Premium often varies delay or distance for key sections (e.g. hero content vs. first section).
- **Hover on cards:** Scale 1.02 + glow. Fine. No complaint.
- **Nav:** Transparent → scrolled. Good. But nav links and buttons don’t feel “premium” in proportion (size, spacing).

### 1.7 What in CTA logic feels generic

- **All CTAs look the same:** “СВЯЗАТЬСЯ”, “ТЕЛЕФОН”, “СМОТРЕТЬ КЕЙС”, “Все кейсы →”, “Заказать проект”, “Обсудить проект”, “ОТПРАВИТЬ ЗАЯВКУ” are styled similarly. There is no **primary** (one main action: discuss/contact), **secondary** (view work, view all cases), **ghost** (close, back, journal). So the conversion path is not visually guided.

### 1.8 What should remain

- Business meaning, content base, cases, journal, SHAR Production positioning.
- Brand color (#9c0404), dark background, video hero.
- Section order and content (manifesto, trust, work, team, pricing, journal, order).
- Cases as separate pages; homepage with 4 featured cases + “Все кейсы”.
- RU/EN localization.
- No new copy; no removal of sections or blocks.

### 1.9 What must be redesigned

- **Typography system:** Scale, roles, hierarchy. Reduce label glow; differentiate section label vs. card tag vs. meta.
- **Button system:** Primary / secondary / ghost. Primary = contact, submit, main CTA. Secondary = view cases, view all. Ghost = back, minimal. Apply consistently.
- **Wordmark/logo:** One locked treatment (weight, tracking); reduce or remove decorative shimmer; hero and nav aligned.
- **Header/nav:** Clearer proportions, spacing; ensure it reads as art-directed.
- **Surfaces:** Stronger borders/fills so cards and panels feel intentional.
- **Section rhythm:** Optional compression (e.g. manifesto + trust tighter) and one clear “hero CTA” (e.g. add a single button in hero or make the first CTA below hero more prominent).
- **CTA hierarchy in UI:** Use classes and styling so primary vs secondary is visible without changing words.

---

## 2. Flagship Site Architecture

- **Homepage:** Short, strong storefront. Hero (with optional primary CTA) → Trust (compact) → Featured cases (4) + “Все кейсы” → Manifesto → Team → Pricing → Journal → Contact. No full cases on homepage. (Current structure is kept; we refine visual hierarchy and add hero CTA if desired.)
- **Cases:** Dedicated /cases index + separate case pages. Premium storytelling per case; CTA from each case to contact. (Already in place.)
- **Journal:** Separate editorial layer; cleaner label or intro so it doesn’t blend with commercial sections. (Refine via typography/labels.)
- **Contact:** One clear section; nav “СВЯЗАТЬСЯ” and “ТЕЛЕФОН” as primary/secondary. Optional: subtle sticky CTA on scroll (could be Phase 2). For now: stronger **visual** hierarchy so “contact” is the clear primary path.
- **Localization:** EN-ready; no mixed-language UI. (Already in place.)

---

## 3. Premium Visual System Redesign

### 3.1 Typography

- **Scale (1.25):**  
  `--text-xs: 0.75rem; --text-sm: 0.875rem; --text-base: 1rem; --text-lg: 1.125rem; --text-xl: 1.25rem; --text-2xl: 1.5rem; --text-3xl: 2rem; --text-4xl: 2.5rem; --text-5xl: 3rem; --text-display: 4rem;` (display for hero wordmark).
- **Roles:**  
  Display = hero wordmark (--text-display / clamp). H1 = order heading, main titles. H2 = section titles (manifesto headline). H3 = card titles. Body = --text-base, 300, --lh-body. Lead = first paragraph slightly larger if needed. Caption = --text-sm, tertiary. **Label section** = one style for “ИЗБРАННЫЕ КЕЙСЫ” (section label). **Label card** = tags on cards (muted: smaller or tertiary). **Label meta** = c-item p, m-stat h4 (tertiary, 9px).
- **Change:** Remove or drastically reduce `text-shadow` on section labels; keep one accent for the main section label only. Card tags and meta use color/opacity, not glow.

### 3.2 Buttons

- **Primary:** Main action. Contact (nav “СВЯЗАТЬСЯ” or “ТЕЛЕФОН”), “ОТПРАВИТЬ ЗАЯВКУ”, “Обсудить проект” from cases. Slightly stronger border, slightly more visible hover (soft fill, no heavy solid). Optional: very subtle pulse only on one hero or contact CTA.
- **Secondary:** “СМОТРЕТЬ КЕЙС”, “Все кейсы →”, “Заказать проект” (price cards), nav “СВЯЗАТЬСЯ” if we make phone primary. Outline + light gradient; hover = border + glow.
- **Ghost:** “← Все кейсы” on case pages, lang switcher. Text or minimal border only.
- **Implementation:** Classes `.cta-primary`, `.cta-secondary`, `.cta-ghost`. Map to existing buttons without changing copy.

### 3.3 Wordmark / logo

- **Lock:** One tracking (0.1em for tighter, premium feel). One weight (600). No gradient on the wordmark in hero (solid: SHAR = brand red, PRODUCTION = white). Nav logo: can keep subtle gradient or align to same weight/tracking. Remove or reduce shimmer to a very subtle hover only (e.g. opacity shift, not full animation).
- **Hero:** SHAR + PRODUCTION as the single lock; subtitle below. Optional: one primary CTA under subtitle (“Обсудить проект” or “Смотреть кейсы”).

### 3.4 Header / navigation

- Slightly more spacing between nav links; logo size consistent. Scrolled state: keep current. Ensure nav buttons use button system (primary = phone, secondary = contact or vice versa).

### 3.5 Surfaces

- **Cards (case, price, journal, client):** `--surface-border: rgba(255,255,255,0.08); --surface-fill: rgba(255,255,255,0.035);`. So panels read clearly. Optional: one stronger surface for “premium” price card.

### 3.6 Motion

- Keep rest by default. Stagger and fade-in kept. Optional: hero content delay slightly longer; first section delay 0.1s. No new decorative motion.

---

## 4. CTA & UX Logic Redesign

- **Primary CTA:** “Обсудить проект” / contact / submit. One clear main action. Style with `.cta-primary`.
- **Secondary CTA:** View work, view case, “Все кейсы”, “Заказать проект” (price cards). Style with `.cta-secondary`.
- **Ghost:** Back, close, lang. Style with `.cta-ghost`.
- **Pathways:**  
  - Quick inquiry: Nav “СВЯЗАТЬСЯ” / “ТЕЛЕФОН” → #order or tel.  
  - Project discussion: Price card “Обсудить проект” or “Заказать проект” → #order.  
  - Case-based: “СМОТРЕТЬ КЕЙС” → case page → “ОБСУДИТЬ ПРОЕКТ” (primary) → index.html#order.  
  - Direct contact: Order section form + contacts.
- **Implementation:** Add classes to existing links/buttons; style via CSS. No copy change.

---

## 5. Performance & Technical Quality

- Homepage DOM already reduced (no modals). Keep lazy loading for images; keep video strategy.
- No new heavy effects. Typography and button changes are CSS-only. Optional: add a single hero CTA (one `<a>` or `<button>`) for clarity; no JS required.
- Preserve scroll behavior, nav scrolled state, and case page behavior.

---

## 6. Implementation Plan

### Files to change

- **assets/css/style.css**
  - Add type scale variables; apply to body, headings, labels.
  - Reduce or remove text-shadow on labels; add `.label-section` (accent) vs. `.label-card` (muted).
  - Add `.cta-primary`, `.cta-secondary`, `.cta-ghost`; map to buttons and links.
  - Update surface tokens; apply to cards.
  - Refine logo/wordmark: tracking, optional solid hero wordmark, reduce shimmer.
  - Optional: hero CTA block (if we add one in HTML).
- **index.html**
  - Add optional hero CTA (e.g. “Обсудить проект” or “Смотреть кейсы”) with class `cta-primary` or `cta-secondary`.
  - Add CTA classes to nav buttons, price cards, work-more link, order submit, case cards (watch-case-btn).
- **cases/index.html, cases/case-*.html**
  - Add CTA classes to back link (ghost), CTA in m-cta-wrap (primary).
- **No new pages.** No copy changes. No removal of content.

### Content that stays

- All sections, all copy, all cases, journal, contact form, team, pricing. Only visual and CTA hierarchy change.

---

## 7. Applied Changes (Phase G)

- **CSS (style.css):**
  - Type scale variables (--text-xs … --text-display); body font-size var(--text-base).
  - Surface tokens: --surface-border 0.08, --surface-fill 0.035.
  - Labels: removed text-shadow from .label, .manifesto-title, .price-card h3, .stat-number, .team-member p, .j-tag, .m-hero-tag, .order-info h2 span, .metric-value, .m-content-text h2; tightened letter-spacing (0.22em / 0.2em).
  - Logo: letter-spacing 0.1em; hover = opacity + background-position transition (no shimmer animation).
  - Hero wordmark: --text-display, 0.1em tracking, reduced text-shadow.
  - CTA hierarchy: .cta-primary (stronger border, soft fill, used for phone, submit, “Обсудить проект”, hero CTA), .cta-secondary (nav СВЯЗАТЬСЯ, “Все кейсы”, price “Заказать”), .cta-ghost (case-back). .case-back.cta-ghost = borderless.
  - .hero-cta + .hero-cta .btn-minimal width auto.
- **HTML:**
  - index.html: hero CTA added (“ОБСУДИТЬ ПРОЕКТ” → #order, cta-primary). Nav: phone cta-primary, СВЯЗАТЬСЯ cta-secondary. work-more link cta-secondary. Price cards: pack1/pack2 buttons cta-secondary, pack3 “Обсудить проект” cta-primary. Submit button cta-primary.
  - cases/index.html: nav phone cta-primary, СВЯЗАТЬСЯ cta-secondary.
  - cases/case-1 … case-8: case-back cta-ghost; m-cta-wrap button cta-primary; nav same as cases index.

---

## 8. Final QA (Phase H)

- **Visual:** Typography uses scale; labels are cleaner (no glow spam); surfaces read as panels; wordmark and hero are tighter.
- **Buttons:** Primary (phone, submit, “Обсудить проект”, hero CTA) clearly stronger; secondary and ghost distinct.
- **Homepage:** Hero has one primary CTA; section order unchanged; no content removed.
- **Cases:** Back link ghost; case CTA primary; nav consistent.
- **Performance:** CSS-only and one extra hero link; no regressions.
- **Content:** No text or structure changes; only classes and visual system.

---

## 9. Changelog

| Area | Change |
|------|--------|
| **Architecture** | No structural change. Cases already separate; homepage storefront kept. |
| **Visual system** | Type scale; surface tokens; label hierarchy (no glow, muted card/meta); wordmark 0.1em, logo hover refined; hero wordmark from scale. |
| **CTA logic** | Primary / secondary / ghost; hero CTA; nav and price/case CTAs assigned; conversion path clearer. |
| **Performance** | Unchanged; no new heavy assets or scripts. |
| **Preserved** | All copy, sections, cases, journal, contact, team, pricing, RU/EN. |
| **Unchanged** | Section order, case pages structure, journal links, form behavior, localization. |
