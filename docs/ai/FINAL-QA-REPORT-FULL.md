# Full Final QA Report — SHAR Production

**Date:** 2026-03-08  
**Scope:** Full site and repository verification after flagship transformation.

---

## 1. Final QA Report

### 1.1 Journal navigation — **PASS**
- **Nav "Журнал"** points to `/journal/` on all pages: `index.html`, `contact.html`, `journal/index.html`, `cases/index.html`, all 8 case pages, and all 3 article pages (`news-1/2/3.html`).
- **"Все статьи в журнале →"** on homepage links to `/journal/` with class `btn-minimal cta-ghost`.
- **Article back button** "Вернуться в журнал" links to `/journal/` with `data-i18n="journal.backToJournal"`.

### 1.2 Journal landing page — **PASS**
- **File:** `journal/index.html` exists.
- **Structure:** Full page with nav, `<main class="section journal-page">`, label "ЖУРНАЛ / ТЕХНОЛОГИИ", intro paragraph (`data-i18n="journal.intro"`), grid of 3 journal cards.
- **Cards** link to `/news-1.html`, `/news-2.html`, `/news-3.html`.
- **Assets:** Uses `../assets/css/style.css` and `../assets/js/*` (correct from `journal/`).
- **Nav:** Logo → `/`, Кейсы → `/cases/`, Команда → `/#team`, Стоимость → `/#pricing`, Журнал → `/journal/` (active), СВЯЗАТЬСЯ → `/contact`, ТЕЛЕФОН → `tel:`.

### 1.3 Article pages — **PASS**
- **Files:** `news-1.html`, `news-2.html`, `news-3.html` in repo root.
- **Navigation:** Same nav as rest of site; "Журнал" → `/journal/`, "Вернуться в журнал" → `/journal/` with `cta-secondary journal-article-back`.
- **Routing:** Journal landing and homepage journal teaser use `/news-1.html`, `/news-2.html`, `/news-3.html`. With Vercel `cleanUrls: true`, `/news-1` etc. also resolve.

### 1.4 Case pages — **PASS**
- **Cases index:** `cases/index.html` exists; lists all 8 cases with links to `/cases/case-1.html` … `/cases/case-8.html`.
- **Individual cases:** `cases/case-1.html` through `cases/case-8.html` exist.
- **Homepage:** Shows 4 featured cases (case-1–4) linking to `/cases/case-N.html`; "Все кейсы →" links to `/cases/`.
- **Case CTAs:** Each case has "ОБСУДИТЬ ПРОЕКТ" / "СВЯЗАТЬСЯ С РЕЖИССЕРОМ" linking to `/contact` (not homepage footer).
- **Case back:** "← Все кейсы" links to `/cases/` on all case pages.

### 1.5 Contact form — **PASS**
- **Page:** `contact.html`; form `id="contactForm"` with `aria-label="Краткая заявка"`.
- **Fields:** Name (required), Phone or Telegram (required), Company/Project (optional), Message (required), Submit button.
- **Visibility:** Form in `.contact-form-wrap` with `.contact-form`, `.contact-form-grid`, `.contact-field`, `.form-input`, `.form-input--message`; no hidden or removed fields.
- **Behavior:** `script.js` attaches submit listener, prevents default, shows toast-style feedback (button text change), then resets — form is usable for UX; backend integration is separate.

### 1.6 Privacy policy link — **PASS**
- **Contact page:** `href="/privacy"` with text "Политикой конфиденциальности" (`data-i18n="order.legalLink"`), inside `.form-legal` next to submit button.
- **File:** `privacy.html` exists in root. With `cleanUrls: true`, `/privacy` serves it.

### 1.7 Buttons feel premium — **PASS**
- **No black placeholders:** No `rgba(0,0,0,...)` in `.btn-minimal`, `.watch-case-btn`, `.cta-primary`, `.cta-secondary`, `.cta-ghost`; only one `rgba(0,0,0,0.12)` for logo text-shadow (intentional).
- **Button system:** Light borders, `inset` highlights, brand glow only (e.g. `0 0 20px rgba(156,4,4,0.04)`), subtle hover fill, `button-breath-soft` 18s on primary; no heavy black shadows or full dead blocks.

### 1.8 Site not too dark/heavy — **PASS**
- **Tokens:** `--bg: #050508` (slightly lifted from pure black); `--text-secondary`, `--text-tertiary`, `--grey` in 0.45–0.72 range for readability.
- **Hero overlay:** Softer gradients (e.g. `rgba(3,3,3,0.62)` → `0.14` → transparent; brand tint `0.1`); poster `brightness(0.94)`.
- **Surfaces:** `--surface-fill`, `--surface-border`, `--line` tuned for lighter feel; sections use consistent spacing and air.

### 1.9 Hero/showreel smooth enough — **PASS**
- **Poster:** AVIF/WebP/fallback with `loading="eager"`, `fetchpriority="high"`, `decoding="async"`; smooth 0.7s opacity transition.
- **Loader:** `.video-loader` with `videoLoaderIdle` 2s (no infinite loop); fades out when `.video-ready` or `.video-timeout`.
- **Iframe:** Opacity 0→1 on load (0.7s); script sets `video-ready` on iframe `load`, or `video-timeout` after 2800 ms.
- **Containment:** `.hero` has `contain: layout style paint` to limit repaints.

### 1.10 Repo root cleaner — **PASS**
- **Root:** No planning/audit `.md` files in root. Only production-relevant files: `index.html`, `contact.html`, `privacy.html`, `404.html`, `news-1/2/3.html`, `robots.txt`, `sitemap.xml`, `vercel.json`, `.gitignore`; folders `assets/`, `cases/`, `journal/`, `docs/`.
- **Docs:** Planning and AI/audit docs moved under `docs/planning/` and `docs/ai/`.
- **.gitignore:** Present; includes `.DS_Store` and `.cursor/`.

### 1.11 No obvious broken routes — **PASS**
- **Internal links:** Consistent absolute paths: `/`, `/cases/`, `/cases/case-N.html`, `/journal/`, `/contact`, `/privacy`, `/#team`, `/#pricing`.
- **Index:** On homepage only, `#team` and `#pricing` (relative) correct; all other pages use `/#team` and `/#pricing`.
- **Vercel:** `cleanUrls: true`, `trailingSlash: false` — `/contact`, `/privacy`, `/journal` (and `/journal/` redirect) work; `.html` URLs still resolve.

### 1.12 No major regressions — **PASS**
- **Content:** No removal of copy, cases, or media; structure preserved.
- **Nav/CTA:** Single "СВЯЗАТЬСЯ" in nav-actions; no duplicate "Связаться" in nav-links; case CTAs go to `/contact`.
- **Counters:** Static values in HTML (no "0" flash); JS does not animate counters.
- **Header above cases:** Global nav is above case content; case title/label is not sticky/fixed.
- **Performance:** Single scroll listener with rAF throttle; hero iframe load/timeout; no duplicate inits or obvious listener leaks.

---

## 2. Remaining Issues (minor / optional)

| Item | Severity | Note |
|------|----------|------|
| **Sitemap URLs** | Low | `sitemap.xml` uses `contact.html` and `privacy.html`; with cleanUrls, canonical could be `https://sharprod.com/contact` and `https://sharprod.com/privacy` for consistency. Both URL forms work. |
| **Journal article URLs** | Low | Links use `/news-1.html` etc.; clean URLs `/news-1` work on Vercel; no change required. |
| **Contact form backend** | Info | Submit is client-only (preventDefault + toast). Hooking to backend/API is out of scope for this QA. |
| **Dead modal JS** | Low | `script.js` still has modal-related logic (e.g. `.modal`, `.close-case`); harmless if no modals in DOM; can be removed in a future cleanup. |

---

## 3. Final Changelog (summary)

### Architecture & routing
- Homepage: no hero CTA under title; journal teaser + "Все статьи в журнале →" to `/journal/`.
- Cases: dedicated `/cases/` and `/cases/case-1.html` … `case-8.html`; all case CTAs → `/contact`.
- Contact: dedicated `/contact` with full form (name, phone/Telegram, company, message), direct contacts, privacy link.
- Journal: dedicated `/journal/` landing with grid of 3 articles → `/news-1.html`, `/news-2.html`, `/news-3.html`.
- Nav: "Журнал" → `/journal/` everywhere; "СВЯЗАТЬСЯ" → `/contact`; Team/Pricing → `/#team`, `/#pricing` (or `#` on index).

### Visual system
- Tokens: `--bg` lifted; `--text-secondary`/`--text-tertiary`/`--grey`/`--line`/`--surface-*` refined; typography scale and spacing (e.g. `--section-pad-y`, label margin) adjusted.
- Logo/wordmark: letter-spacing and text-shadow softened.
- Hero: overlay lightened; poster brightness increased; loader and iframe opacity transition; contain on `.hero`.
- Buttons (non-header): black shadows removed; lighter borders, inset highlights, soft brand glow; subtle breath on primary; hover lift and transitions refined.
- Sections: manifesto, stats, client logos, journal cards, price cards, team, footer — spacing, colors, and hover intensity tuned for premium feel.

### Performance & behavior
- Hero: preconnect/dns-prefetch for Vimeo; poster preload; load + 2.8s timeout for iframe visibility.
- Scroll: single nav scrolled state with rAF-throttled listener.
- Counters: static values in HTML; no count-up animation.
- Cursor: translate3d; no continuous rAF loop; hover targets defined.

### Repo hygiene
- Planning and audit docs moved to `docs/planning/` and `docs/ai/`.
- `.gitignore` added (`.DS_Store`, `.cursor/`).
- Root contains only production-related files and folders.

### Files touched (key)
- `index.html`, `contact.html`, `journal/index.html`, `cases/index.html`, `cases/case-1.html` … `case-8.html`, `news-1.html`, `news-2.html`, `news-3.html`, `404.html`, `privacy.html`
- `assets/css/style.css`, `assets/js/script.js`, `assets/js/locales.js`
- `vercel.json`, `sitemap.xml`, `robots.txt`, `.gitignore`
- New: `journal/index.html`; structure/docs under `docs/`

---

**QA result:** All 12 checks passed. Site is in a consistent, premium, flagship-ready state with no critical or high-severity issues. Optional follow-ups: sitemap clean URLs, removal of unused modal JS.
