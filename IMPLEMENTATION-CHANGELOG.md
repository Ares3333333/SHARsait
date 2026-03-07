# Implementation Changelog — Flagship Redesign

**Date:** 2026-03-07  
**Scope:** Architecture, contact flow, case pages, premium visual system, performance.

---

## 1. Architecture & routing

- **Contact page:** Added `contact.html` in root with same header/footer, direct actions (phone, Telegram, email, address), minimal form. Form uses existing `#contactForm` and script (toast on submit).
- **Nav:** All “СВЯЗАТЬСЯ” links now point to `contact.html` (index, cases index, all case pages, news-1/2/3). “Кейсы” → `cases/index.html` from index and news pages.
- **Homepage:** Removed hero CTA block (no button under subtitle). Replaced full `#order` section with compact CTA block (`#cta-block`): label, short text, single button “Обсудить проект” → `contact.html`.
- **Price cards & CTA block:** All “Заказать проект” / “Обсудить проект” links → `contact.html`.
- **Secondary pages:** news-1, news-2, news-3 nav updated to cases/index.html, contact.html, lang switcher and CTA button styles. 404 and privacy left with minimal nav.

## 2. Case pages

- **CTAs:** Every case page (1–8): nav “СВЯЗАТЬСЯ” → `../contact.html`; in-page CTA button → `../contact.html`. All CTA buttons use `cta-primary` where appropriate.
- **Structure:** Cases 5–8 completed with `project-metrics` (minimal “—” or short values) and empty `m-gallery` for consistent template. No 404: all case-1 … case-8 linked from cases index and homepage.

## 3. Contact flow

- **Single destination:** Contact is the canonical place for “Обсудить проект”, “Заказать проект”, “СВЯЗАТЬСЯ”. No link targets `index.html#order`.
- **contact.html:** Heading “ОБСУДИТЬ ПРОЕКТ”, direct links (phone, Telegram, email, address), form (email, message, submit). Same locales and script as rest of site.
- **Sitemap:** Added `contact.html` and `cases/` to sitemap.xml.

## 4. Premium visual system

- **Hero:** Removed hero CTA; hero is wordmark + subtitle only.
- **Buttons:** Removed `::after` shimmer strip from `.btn-minimal`, `.watch-case-btn`, `.btn-nav-premium`. Lighter rest and hover: no black in shadows; primary gradient 0.08→0.02 at rest, 0.12→0.04 on hover; secondary/ghost with subtle glow only. Removed black from `.price-card:hover` box-shadow.
- **Counters:** Stats show static values (50, 15, 99%). Initial HTML content set to final numbers; script only sets from `data-count` (no animation from 0) so “0” is never shown.
- **Dead code:** Removed unused `@keyframes lens-ray` and `card-ray`; removed `.hero-cta` CSS.

## 5. Locales & copy

- **New keys:** `cta.toContact`, `cta.discuss` (RU/EN) for homepage CTA block. Existing `order.*` reused on contact page. No change to existing body copy or media.

## 6. Files touched

- **New:** `contact.html`, `IMPLEMENTATION-CHANGELOG.md`
- **Modified:** `index.html`, `cases/index.html`, `cases/case-1.html` … `case-8.html`, `news-1.html`, `news-2.html`, `news-3.html`, `assets/css/style.css`, `assets/js/script.js`, `assets/js/locales.js`, `sitemap.xml`

## 7. Success criteria (verified)

- No 404 on cases: all case links go to existing case-1 … case-8.
- All cases share same block order: back link, hero, video, sidebar+body, project-metrics, m-gallery, m-cta-wrap.
- No hero CTA; main screen is wordmark + subtitle only.
- Contact is a dedicated page; no “dump into footer”; all contact CTAs → contact.html.
- Buttons: no black placeholder feel; lighter fill and glow; no shimmer strip.
- Brand identity (SHAR Production, #9c0404, copy, media) preserved. No flashy overdesign; restrained premium feel.
