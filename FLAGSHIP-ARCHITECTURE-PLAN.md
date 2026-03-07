# PHASE B — Flagship Architecture Plan

## Philosophy

A **flagship** site for an AI production brand should feel: **authoritative** (one voice), **restrained** (premium = less, not more), and **consistent** (every touchpoint uses the same grammar). The plan below is opinionated: it defines a single system and excludes alternatives that would dilute it.

---

## 1. Design tokens (single source of truth)

### 1.1 Color

- **Primary:** Keep `#9c0404` as the only brand accent. Do not add a second accent; use opacity and context (border vs. glow vs. text) for variation.
- **Surfaces:** Define explicitly:
  - **Background:** `#030303` (keep).
  - **Surface raised:** e.g. `rgba(255,255,255,0.03)` fill, `rgba(255,255,255,0.06)` border — for cards (price, journal, client). No “0.01” — either visible or omit.
  - **Surface overlay:** e.g. `rgba(3,3,3,0.97)` for modals (keep).
- **Text:**
  - **Primary:** `#FFFFFF`.
  - **Secondary:** `rgba(255,255,255,0.6)` (body, captions).
  - **Tertiary / muted:** `rgba(255,255,255,0.35)` (labels, meta).
- **Borders:** One variable for “divider” (e.g. `--line`) and one for “card border” (e.g. `--surface-border`). Do not use 10 different opacities; use 2–3.

### 1.2 Typography scale

- **Adopt a scale** (e.g. 1.25 or 1.2). Example (rem): `0.5625, 0.75, 0.875, 1, 1.125, 1.25, 1.5, 2, 2.5, 3, 4, 5, 6`. Map these to roles, do not invent sizes per component.
- **Roles:**
  - **Display:** Hero wordmark only. One size (e.g. 4–6rem for “SHAR”), one weight (600), one tracking (e.g. 0.12em). No gradient or animation on the hero wordmark in the canonical lock; optional subtle gradient in nav only.
  - **H1:** Section titles (e.g. “ОБСУДИТЬ ПРОЕКТ”). One step down from display, same weight (500–600).
  - **H2:** Block titles (e.g. manifesto headline, modal title). Defined scale step.
  - **H3:** Card titles (case name, price pack name). Smaller, still heading font.
  - **Body:** Long copy. One size (e.g. 1rem–1.0625rem), line-height 1.65–1.75, weight 300–400.
  - **Caption / meta:** Smaller (e.g. 0.875rem), muted color.
  - **Label:** 9px or 0.5625rem, uppercase, letter-spacing 0.2–0.28em, weight 600. **Hierarchy within labels:** section label (e.g. “ИЗБРАННЫЕ КЕЙСЫ”) vs. card tag (e.g. “Гастрономия”) — same style, optional slight size or color difference so section > card.
- **Fonts:** Keep Plus Jakarta Sans (headings, labels, buttons) and Inter (body). Do not add a third font. Optional: use a single “display” weight (e.g. 600) for wordmark only everywhere.

### 1.3 Spacing and layout

- **Spacing scale:** Keep or refine the 8px base (--space-xs through --space-4xl). Use it everywhere; no magic numbers in components.
- **Content width:** Define one **content max-width** (e.g. 1200px or 1280px) for: manifesto, work grid, pricing, order, modal content. Apply consistently. Hero can be full-bleed; sections below use max-width + horizontal margin auto.
- **Section rhythm:** Differentiate:
  - **Hero:** 100vh, content at bottom with generous padding.
  - **Manifesto:** Tighter top/bottom (e.g. space-2xl) so it feels like a “statement block”, not a full section.
  - **Work / pricing / order:** Standard section padding (e.g. space-3xl) so they breathe.
  - **Footer:** Compact (e.g. space-xl), same content width.
- **Grids:** Define rules. E.g. work grid: 2 cols desktop, 1 mobile; gap from scale. Pricing: 3 cols; clients: 4 or 2. One “featured” slot (e.g. first case) can be full-width or 2-col span if the content model allows — so the grid has a clear focal point.

### 1.4 Motion

- **Principle:** Default = rest. Motion = response to user (hover, focus, scroll) or one-time (page load, modal open).
- **Remove or gate:**
  - Logo: Shimmer optional on hover only, or remove. No infinite animation.
  - Buttons: No infinite breath. Use hover/focus only (soft glow, border, background transition).
- **Keep but refine:**
  - Scroll-triggered fade-in: OK. Define one stagger delay (e.g. 60–80ms) and one transform (e.g. translateY 16px → 0) for all “reveal” elements.
  - Modal open: One short animation (e.g. 0.4s opacity + slight Y). No decoration inside.
- **Card hover:** Prefer subtle (border color, slight lift, maybe shadow). Remove or drastically reduce “lens ray” — it is a template trope. If a highlight is needed, use a very subtle gradient overlay, not a moving beam.
- **Duration:** One “fast” (e.g. 0.25s) for micro (hover), one “normal” (0.4–0.5s) for transitions, one “slow” (0.6–0.8s) for modal. All with same easing (e.g. cubic-bezier(0.16, 1, 0.3, 1)).

### 1.5 Buttons (one grammar)

- **Primary:** One treatment for “main action” (e.g. Contact, Submit, “Обсудить проект”). Rules: no black in box-shadow; border from token (e.g. brand 0.3 opacity); background: very subtle gradient or transparent; hover: slight border + glow; optional very subtle pulse only on CTA in hero or modal, not everywhere.
- **Secondary:** Outline only or very light fill (e.g. “СМОТРЕТЬ КЕЙС”, “Развернуть портфель”). Same border/glow language, less emphasis.
- **Nav:** Same grammar. “СВЯЗАТЬСЯ” = secondary; “ТЕЛЕФОН” = primary (filled). **Remove heavy black shadows from nav buttons** so they match body buttons (glow + inset, or transparent + border).
- **Close / ghost:** Modal close, language switcher — minimal (border or text only). No need for same glow as primary.
- **Apply everywhere:** Nav, body, modals, footer CTAs. One set of variables (border, glow, inset, hover state).

---

## 2. Component hierarchy

### 2.1 Global

- **Header:** One component. Logo (wordmark lock), nav links, lang switcher, two buttons (Contact, Phone). Transparent by default; “scrolled” state with backdrop and border. **Buttons in header use the same token set as body primary/secondary** — no separate “nav button” style with black shadows.
- **Footer:** One component. Same content width, same type (caption), same border token. No inline styles; use design tokens.

### 2.2 Hero

- **Role:** Establish brand and one line of value. No stats, no extra CTAs in hero block.
- **Content:** Wordmark (SHAR + PRODUCTION) as the single typographic lock; one subtitle line; optional one CTA (e.g. “Связаться” or scroll). Video background and overlay stay; ensure overlay does not compete with wordmark (contrast, position).
- **Wordmark lock:** Same tracking and weight as nav logo; size scales for viewport. If nav uses gradient/shimmer, hero can be solid or very subtle gradient — but the **shape** (letter-spacing, weight) must match.

### 2.3 Sections (manifesto, social proof, work, team, pricing, journal, order)

- **Section structure:** Optional section label (e.g. “О СТУДИИ”, “ИЗБРАННЫЕ КЕЙСЫ”) + content. Label uses label token; content uses grid or stack from layout rules.
- **Manifesto:** One block. Title + headline + sub. No extra widgets.
- **Social proof:** Stats + clients. If stats stay, style as “editorial fact” (e.g. larger type, less widget-like). Clients: same surface token as other cards; optional “featured” slot.
- **Work:** Grid with one optional featured case (first item larger or full-width). “Expand” keeps current behavior; expanded items use same card style.
- **Team / journal:** Horizontal scroll OK. Cards use surface token; no mixed styles.
- **Pricing:** Three cards, same surface token. “Premium” pack can have border/glow accent, not a different component.
- **Order:** Two-column layout; form and contact info. Same button and input tokens.

### 2.4 Modals (cases)

- **Structure:** Global close (one style, ghost); case header (tag + title); video; body (sidebar + text); optional metrics; gallery; CTA. **Apply to all 8 cases** — same structure. Cases 5–8 currently minimal; add at least tag + title + body block (can be short) so depth is consistent.
- **Inner components:** Same tokens (labels, body text, buttons). Close button = ghost; CTA = primary. No extra decorative motion.

### 2.5 Secondary pages (404, privacy)

- **Same system:** Same content width, same type scale and tokens, same header/footer. Page shell uses section padding and title/caption from scale. No one-off font sizes or spacing.

---

## 3. Content and hierarchy (recommendations)

- **Hero:** Wordmark + one line. No numbers, no secondary CTA block.
- **Manifesto:** Keep as “about” in one block. Headline + short sub.
- **Stats:** Either keep and restyle as editorial (larger, calmer) or move lower / reduce. Avoid “dashboard” look.
- **Work:** One hero case (e.g. first) if content allows; rest in grid. Same card component.
- **Modals:** Full structure for all 8 (tag, title, video, body, metrics if relevant, gallery if relevant, CTA). Minimal cases (5–8) feel like unfinished product.
- **Footer:** One line, token-based. Optional: small nav or legal link; keep minimal.

---

## 4. Implementation order (suggested)

1. **Tokens:** Document and implement color (surfaces, borders), type scale and roles, spacing, motion durations. No new visuals yet — just variables and one place that defines them.
2. **Buttons:** Unify. Remove black from nav buttons; make nav use same primary/secondary grammar as body. Remove infinite breath; keep hover/focus only.
3. **Typography:** Apply scale to all headings, body, labels. Differentiate label levels if needed (section vs. card).
4. **Wordmark:** Lock logo and hero to same tracking/weight; hero gets space and silence (no competing motion).
5. **Surfaces:** Apply surface tokens to cards (price, journal, client). Clear border/fill; remove 0.01.
6. **Motion:** Remove or gate shimmer and breath; define one reveal stagger; simplify card hover (no or minimal lens ray).
7. **Layout:** Apply content max-width and section rhythm consistently; optional hero case in work grid.
8. **Modals:** Align cases 5–8 to same structure as 1–4 (at least tag, title, short body, CTA).
9. **Footer and secondary pages:** Move to tokens and same component logic.

---

## 5. Out of scope (by choice)

- **No second accent color.** One red is enough; variation via opacity and context.
- **No new fonts.** Plus Jakarta + Inter; wordmark can be same family, different weight/size.
- **No new sections or IA change.** Plan assumes current sections and order; only consistency and depth (modals) are in scope.
- **No heavy new effects.** No parallax, no 3D, no new cursor behavior. Rest and clarity over decoration.

---

*Document: PHASE B — Flagship Architecture Plan. Opinionated, specific. No code changes. Implementation to follow in later phases.*
