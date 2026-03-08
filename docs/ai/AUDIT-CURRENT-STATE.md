# Audit: Current State of SHAR Production Site

**Date:** 2026-03-08  
**Purpose:** Document actual state before any further changes. No edits — observation only.

---

## 1. Structure & routes

| Item | Status | Notes |
|------|--------|--------|
| Homepage | OK | `index.html` — hero, manifesto, stats, clients, 4 case cards, journal teaser, pricing, team, CTA block. |
| Cases index | OK | `cases/index.html` — lists all 8 cases; links to `/cases/case-N.html`. |
| Case pages 1–8 | OK | All exist; nav, back link, hero, iframe (autoplay=1&muted=1), body, metrics, gallery, CTA → `/contact`. |
| Journal landing | OK | `journal/index.html` — label, intro, 3 cards → `/news-1.html`, `/news-2.html`, `/news-3.html`. |
| Article pages | OK | `news-1.html`, `news-2.html`, `news-3.html` in root; back to `/journal/`. |
| Contact page | OK | `contact.html` — heading, intro, direct contacts (phone, Telegram, email, address), form. |
| Privacy | OK | `privacy.html` in root; linked from contact form. |
| Internal links | OK | Nav uses `/`, `/cases/`, `/#team`, `/#pricing`, `/journal/`, `/contact`; case CTAs → `/contact`. |

**Vercel:** `vercel.json` has `cleanUrls: true`, `trailingSlash: false`. Root has no stray `.md` files; `docs/ai/` and `docs/planning/` hold planning/audit docs. `.gitignore` includes `.DS_Store`, `.cursor/`.

---

## 2. Visual system (CSS)

**Tokens (current):**
- `--bg: #07070c` (slightly off-black)
- `--text-secondary: 0.76`, `--text-tertiary: 0.52`, `--grey: 0.48`
- `--line`, `--surface-border`, `--surface-fill` in 0.065–0.035 range
- `--section-pad-y: clamp(96px, 10vw, 128px)`

**Hero:**
- `.overlay`: bottom gradient rgba(3,3,3,0.50)→0.10→transparent 78%; side 0.26→transparent 72%; brand radial 0.08.
- `.video-poster img`: `brightness(0.97) saturate(1.04) contrast(1.02)`.
- Loader 2s, then iframe opacity on load / timeout; no infinite loader.

**Case cards (homepage/cases index):**
- `.case img`: `grayscale(0.58) brightness(0.54)` by default; on hover `grayscale(0) brightness(0.92)`.
- `.case-info`: gradient `rgba(3,3,3,0.68)`→0.12→transparent 74%. Card hover: scale 1.02, border/shadow brand tint.

**Journal cards:**
- `.j-img-wrap img`: `grayscale(0.4) brightness(0.84)`; hover `brightness(0.92)`.

**Case page video:**
- `.m-video-container`: background `#0a0a0e`, border 1px rgba(255,255,255,0.06), softer shadow; iframe `autoplay=1&muted=1&loop=0`.

**Buttons (non-header):**
- `.btn-minimal`, `.watch-case-btn`: border 0.22, light gradient (0.035→0.01), inset highlight; hover border 0.35–0.38, soft glow (0 0 0 1px + 24–32px), no heavy block.
- `.cta-primary`: border 0.26, brand tint, `button-breath-soft` 18s; hover 0.38, edge + glow.
- `.cta-secondary`, `.cta-ghost`: light surfaces, subtle hover.

---

## 3. Contact form

**Markup:** Form `id="contactForm"`, class `contact-form contact-form--minimal`. Three fields:
1. Name (required), `id="contact-name"`, `name="name"`.
2. Contact (required), `id="contact-reach"`, `name="reach"` — label "КОНТАКТ", placeholder "Телефон, Telegram или email".
3. Message (optional), `id="contact-message"`, `name="message"` — single-line input, `form-input--message-single`.

Submit button "ОТПРАВИТЬ"; privacy link to `/privacy`. Form title "ЗАПРОС", note "Оставьте имя и контакт — мы ответим в ближайшее время."

**Script:** `script.js` binds submit → preventDefault, button text → sending state, then toast + reset button label from `locales.toast.submit` ("ОТПРАВИТЬ"/"SEND"). No backend; client-only.

**Locales:** RU/EN have `order.formTitle`, `order.formNote`, `order.fieldContact`, `order.placeholderContact`, `order.fieldMessageOptional`, `order.placeholderMessageOptional`, `order.submit`; `toast.submit` aligned.

---

## 4. Case media

All 8 case pages: iframe `src` includes `autoplay=1&muted=1&loop=0`. Preconnect to `player.vimeo.com`. No poster/placeholder on case iframe; container has background and border. Autoplay may be blocked by browser policy (user can click play).

---

## 5. Homepage

Hero: no CTA under title (wordmark + subtitle only). Showreel iframe background, muted autoplay; poster + loader for first paint. Section order: manifesto, stats, clients, cases grid (4) + "Все кейсы" → `/cases/`, journal horizontal strip + "Все статьи в журнале" → `/journal/`, pricing, team, CTA block → `/contact`.

---

## 6. Gaps and risks (observation only)

- **Case card imagery:** Default `brightness(0.54)` and `grayscale(0.58)` make cards quite dark; hover is much brighter. May feel heavy on first scan.
- **Case-info overlay:** Gradient still 0.68 at bottom; slightly heavier than hero overlay (0.50). Could be lightened for consistency.
- **Form submission:** Purely client-side; no server/API. Acceptable for audit; backend is a separate decision.
- **Locale keys:** Some legacy keys (e.g. `order.fieldReach`, `order.fieldCompany`) may remain in `locales.js` unused after form simplification; no functional impact.
- **.case background:** Card background `#050505`; body `--bg` is `#07070c`. Minor inconsistency.

---

## 7. Summary

The site is in a consistent, post–premium-pass state: simplified contact form, unified routes, journal landing, case pages with muted autoplay, lighter tokens and hero overlay, and a non-header button system without heavy black blocks. Remaining nuances are optional refinements (case card default darkness, case-info gradient, token/color consistency), not blockers.
