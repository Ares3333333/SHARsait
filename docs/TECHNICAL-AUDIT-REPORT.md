# SHAR Production — Full Technical Audit Report

**Date:** 2026-03-15  
**Scope:** Production website only (HTML, CSS, JS, images, assets). No changes to structure, visual design, texts, or media content.

---

## 1. File inventory and usage

### 1.1 HTML pages (14 files)

| File | Referenced from | Notes |
|------|-----------------|--------|
| `index.html` | Nav on all pages, sitemap, robots (implicit) | Main entry |
| `contact.html` | Nav, index, journal, news, cases, pricing, sitemap | Used |
| `privacy.html` | contact.html (form legal link), sitemap | Used |
| `404.html` | Server 404 handler, sitemap | Used |
| `news-1.html` | index, journal/index, sitemap | Used |
| `news-2.html` | index, journal/index, sitemap | Used |
| `news-3.html` | index, journal/index, sitemap | Used |
| `cases/index.html` | Nav, index, sitemap | Used |
| `cases/case-1.html` … `case-6.html` | index and/or cases/index | Linked |
| `cases/case-7.html` | **Not linked** from nav or cases index | Orphan page (comment: “case-7 и case-8 временно скрыты”) |
| `cases/case-8.html` | **Not linked** from nav or cases index | Orphan page |
| `journal/index.html` | Nav, index, sitemap | Used |
| `pricing/index.html` | Nav, index | **Not in sitemap.xml** |

### 1.2 CSS

| File | Loaded from |
|------|-------------|
| `assets/css/style.css` | All HTML pages (relative or `../` from subdirs) |

**Note:** `pricing/index.html` uses `?v=40`; all other pages use `?v=39`.

### 1.3 JavaScript

| File | Loaded from |
|------|-------------|
| `assets/js/script.js` | All pages except 404 and privacy (they load script.js but **not** locales.js) |
| `assets/js/locales.js` | All pages except **privacy.html** and **404.html** |

### 1.4 Images and assets

**Favicon:**  
- `assets/img/favicon.svg` — used in all HTML (link rel="icon").

**Awards (all used on index):**  
- `assets/img/awards/accolade.png`  
- `assets/img/awards/bracciano.png`  
- `assets/img/awards/absurd.png`  
- `assets/img/awards/filmarte.png`  
- `assets/img/awards/goa.png`  
- `assets/img/awards/near-nazareth.png`  
- `assets/img/awards/chameleon.png`  

**Team:**  
- `assets/images/team/arseniy.png` — index, journal (if any)  
- `assets/images/team/sasha.png` — index  

**Journal:**  
- `assets/images/journal/article-1-hero.png` — index, journal/index, news-1  
- `assets/images/journal/article-2-bts.png` — index, journal/index, news-2  
- `assets/images/journal/article-3-hero.png` — index, journal/index, news-3  
- `assets/images/journal/article-1-plan.png` — **not referenced** in any HTML/CSS  
- `assets/images/journal/article-2-budget.png` — **not referenced** in any HTML/CSS  

**Cases 1–6:**  
- Covers and gallery images (e.g. `case-1/cover.jpeg`, `gallery-01.jpeg`, …) — all referenced from index, cases/index, or case-N pages.

**Cases 7–8:**  
- `assets/images/cases/case-7/cover.webp`, `gallery-01.webp`, `gallery-02.webp`, `gallery-03.webp` — **not referenced** (case-7.html uses Unsplash URL for gallery).  
- `assets/images/cases/case-8/cover.webp`, `gallery-01.webp`, `gallery-02.webp`, `gallery-03.webp` — **not referenced** (case-8.html uses Unsplash URL for gallery).

### 1.5 Other

- `robots.txt` — references sitemap; no broken refs.  
- `sitemap.xml` — lists index, contact, cases/index, journal/index, privacy, 404, news-1/2/3. **Does not list** `pricing/index.html` or any `cases/case-N.html`.

---

## 2. Unused / orphan files

### 2.1 Orphan HTML (not linked; safe to remove only if you intentionally retire the pages)

- **`cases/case-7.html`** — not linked from cases index or homepage (comment in cases/index: “case-7 и case-8 временно скрыты”).  
- **`cases/case-8.html`** — same as above.

Recommendation: Either add links when ready or remove if these pages are deprecated. No other pages link to them.

### 2.2 Orphan images (never referenced in HTML or CSS — safe to remove if not needed for future content)

- **`assets/images/journal/article-1-plan.png`**  
- **`assets/images/journal/article-2-budget.png`**  

- **Case 7 (all local case images):**  
  - `assets/images/cases/case-7/cover.webp`  
  - `assets/images/cases/case-7/gallery-01.webp`  
  - `assets/images/cases/case-7/gallery-02.webp`  
  - `assets/images/cases/case-7/gallery-03.webp`  

- **Case 8 (all local case images):**  
  - `assets/images/cases/case-8/cover.webp`  
  - `assets/images/cases/case-8/gallery-01.webp`  
  - `assets/images/cases/case-8/gallery-02.webp`  
  - `assets/images/cases/case-8/gallery-03.webp`  

Case-7 and case-8 pages use external Unsplash URLs for their single gallery image, so these local files are unused. Safe to delete only if you do not plan to switch back to local assets.

---

## 3. Dead code

### 3.1 JavaScript (`assets/js/script.js`)

- **`#show-more-btn`** — `getElementById('show-more-btn')` and click handler (lines ~157–166). No element with `id="show-more-btn"` exists in any HTML. **Dead code** (safe to remove the block).  

- **Modal logic (`openCase` / `closeCase`, `.modal`, `.close-case`)** — No `.modal` or `id="case-1"` … `id="case-8"` elements in any HTML; cases are standalone pages. The modal open/close and focus-trap code never runs. **Dead code** (safe to remove if you do not plan to reintroduce modals).

### 3.2 CSS (`assets/css/style.css`)

- **Undefined variables:**  
  - `var(--btn-border)` (e.g. ~line 451, section-arrow) — **not defined** in `:root`.  
  - `var(--space-3xs)` (~line 513, .case-info h3) — **not defined** in `:root`.  
  Effect: these rules use invalid variables (fallback to initial/transparent). **Fix:** Define in `:root` or replace with a defined variable/value.

- **Rules for non-existent “about” page:**  
  The site has no dedicated “about” page; “О нас” is a section on the homepage. The following classes are **not used** in any HTML:  
  `.about-page`, `.about-hero`, `.about-hero-label`, `.about-hero-title`, `.about-hero-sub`, `.about-block-header`, `.about-block-cta`, `.about-block-btn`, `.about-showreel`, `.about-showreel-wrap`, `.about-showreel-player`, `.about-showreel-placeholder`, `.about-manifesto`, `.about-manifesto-inner`, `.about-manifesto-label`, `.about-manifesto-heading`, `.about-manifesto-sub`, `.about-manifesto-cards`, `.about-manifesto-card`, `.about-team-section`, `.about-team-list`, `.about-team-card`, `.about-team-photo`, `.about-team-bio`, `.about-team-name`, `.about-team-role`, `.about-team-desc`, `.about-team-sep`, and related selectors (e.g. `.about-hero .btn`, `.about-page .cta-block .btn`).  
  **Safe to remove:** Only if you are sure there will never be a separate about page or reuse of these class names. Otherwise treat as dead CSS that can be removed in a cleanup.

- **Legacy/empty rule:**  
  `#trust .section-inner > .label.label-spaced:first-of-type` appears in a selector block with a comment “legacy trust block styles — no longer used” and no declarations — redundant.

- **Duplicate / overlapping button styles:**  
  Two large button systems exist: one set (~lines 848–1000, “Кнопки: без фона…”) and a second (~lines 1026–1340, “SHAR — кнопки C + D”). They override each other. Not “dead” but redundant; consolidating would reduce size and confusion.

---

## 4. Broken or problematic references

### 4.1 Missing or invalid

- **Contact form:** `contact.html` form has `data-formspree-id=""`. Empty Formspree ID means the script never sends to Formspree; it only simulates success (see script.js). **Fix:** Set a real Form ID when Formspree is configured.

- **CSS variables:** `--btn-border` and `--space-3xs` are used but not defined (see §3.2).

### 4.2 Paths

- **cases/index.html** uses absolute image paths like `/assets/images/cases/case-1/cover.jpeg`. Correct when the site is served from root (e.g. `sharprod.com`).  
- **privacy.html / 404.html** use `href="index.html"` (relative). Correct when those files are at site root. For consistency, `/` or `/index.html` could be used.

No references to missing files were found (all `src`/`href` to local assets point to existing files).

### 4.3 Sitemap

- **Missing from sitemap:**  
  - `https://sharprod.com/pricing/index.html`  
  - Individual case pages `https://sharprod.com/cases/case-1.html` … `case-8.html` (if you want them indexed).

---

## 5. Obvious errors and best practices

### 5.1 Accessibility and markup

- **Duplicate ID:** `id="toast"` appears on both **index.html** and **contact.html**. Only one of these is in the DOM per page, but IDs must be unique in the document. Consider a class or a single shared toast container to avoid invalid HTML.  
- **Alt text:** No `alt=""` (empty) images found. All checked `img` elements have non-empty `alt`.  
- **Form:** Contact form has `aria-label="Краткая заявка"` and required fields — good.

### 5.2 Meta and links

- **privacy.html** does not load `locales.js`; **404.html** does not load `locales.js`. So `[data-i18n]` on those pages (if any) will not be replaced; 404/privacy have minimal i18n, so impact is low.  
- **404.html** uses `<meta name="robots" content="noindex,follow">` — appropriate for error page.

---

## 6. Summary: safe to remove (no structure/visual/text/media change)

Only items that are clearly unused and do not affect structure, design, texts, or media are listed here. **Nothing has been deleted**; this is the list of candidates for removal.

### 6.1 Orphan assets (optional removal)

- `assets/images/journal/article-1-plan.png`  
- `assets/images/journal/article-2-budget.png`  
- `assets/images/cases/case-7/cover.webp`, `gallery-01.webp`, `gallery-02.webp`, `gallery-03.webp`  
- `assets/images/cases/case-8/cover.webp`, `gallery-01.webp`, `gallery-02.webp`, `gallery-03.webp`  

**Caveat:** Keep case-7/8 assets if you plan to replace Unsplash with local images later.

### 6.2 Dead JS (optional removal)

- In `assets/js/script.js`:  
  - The entire block that gets `#show-more-btn` and adds the “expand portfolio” click handler.  
  - The entire modal block: `openCase`, `closeCase`, and all listeners for `.modal`, `.close-case`, and modal keyboard handling.

### 6.3 Dead or redundant CSS (optional removal)

- Define or replace `--btn-border` and `--space-3xs` (or remove rules that use them).  
- If you confirm there will be no separate “about” page and no reuse of those classes: remove the `.about-*` rules (about-page, about-hero, about-showreel, about-manifesto, about-team, etc.).  
- Remove the empty legacy trust-block rule.  
- Optionally consolidate the two button-style blocks to reduce duplication.

### 6.4 Do not remove without product decision

- **cases/case-7.html** and **cases/case-8.html** — only remove if you intentionally retire these pages; they are currently unlinked but reachable by URL.  
- **docs/** — not part of production site; left out of “safe to remove” list.

---

**End of report.**
