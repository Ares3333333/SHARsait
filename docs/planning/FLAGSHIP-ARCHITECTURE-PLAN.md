# Flagship Architecture Plan — SHAR Production

**No code. Structure and flow only.**  
Preserves existing content and business meaning. Same design direction. No new brand, no text rewrites, journal and all cases kept. No SaaS, no noisy/trendy.

---

## 1. New Sitemap

```
/ (index.html)                    — Homepage: short cinematic storefront
/cases/ (cases/index.html)        — Cases index: all projects, one grid
/cases/case-1.html … case-8.html  — Individual case pages (one template, same structure)
/journal/ (journal/index.html)    — Journal index: list of articles (optional; or keep journal as section + links)
/news-1.html, news-2.html, news-3.html — Journal articles (unchanged; linked from journal index or homepage teaser)
/contact/ (contact.html)          — Dedicated contact page: form, phone, Telegram, email, address, fast paths
/privacy.html                     — Privacy policy (unchanged)
/404.html                         — Error page (unchanged)
```

**Localization:** Same URLs. Locale via `data-i18n` + `locales.js` + lang switcher. No `/en/` subpaths in this phase; one DOM, switched strings. Future: optional `/en/` mirror if needed.

**Notes:**
- `contact.html` in root (or `/contact/index.html` if you prefer a folder). Nav “Связаться” and all “Обсудить проект” CTAs point here (or open contact modal that mirrors this content).
- Journal: either a small `journal/index.html` that lists news-1, news-2, news-3, or homepage keeps one “Журнал” teaser line that links to the first article or to a journal index. No removal of journal; only structural clarity.

---

## 2. Homepage Block Structure

**Goal:** Shorter, controlled, premium, cinematic, conversion-focused. No “patched one-pager” feel.

**Order and content:**

| Order | Block | Content | Purpose |
|-------|--------|---------|--------|
| 1 | **Hero** | Full-viewport video background. Wordmark (SHAR + PRODUCTION). One subtitle line. **No CTA button.** | Single statement; hero is not a conversion strip. Nav already has “Связаться” and “Телефон”. |
| 2 | **Trust** | One compact section: “Доверие в цифрах” + 3 metrics (50, 15, 99). Optional: “Клиенты” row (PINSKIY, CLICK, M-TECHNO, YUGA). | Credibility without dashboard feel. Fix: metrics must not show “0” on first paint (static final values or animate before visible). |
| 3 | **Featured cases** | Section label (e.g. “Избранные кейсы”). **3 cards** (not 4) to reduce length. Each card: image, title, tag, “Смотреть кейс” → case page. One link: “Все кейсы” → `/cases/`. | Proof of work; clear path to full portfolio. |
| 4 | **Manifesto** | “О студии” + headline + short paragraph (existing copy). Tighter padding; one clear block. | Positioning in one breath. |
| 5 | **Team** | Section label + horizontal scroll of team members (existing). Compact. | Credibility. |
| 6 | **Pricing teaser** | Section label + **one line or one card** (e.g. “От 150 000 ₽ — интеграция ИИ. От 350 000 ₽ — полное производство. Индивидуально — корпоративный уровень.”) + one CTA “Обсудить проект” → contact. Optional: keep 3 price cards but in a more compact layout. | Teaser only; detail on request or on contact page. |
| 7 | **Journal teaser** | One line: “Журнал” + 1–3 article links (titles only or small cards) → news-1, news-2, news-3. Or link “Журнал” to `journal/index.html` if that page exists. | Journal present, not a long block. |
| 8 | **Primary CTA** | One block: “Обсудить проект” / “Связаться с нами” + single primary button → `/contact/` (or open contact modal). Optional: repeat phone and Telegram here. | One clear conversion target; no “scroll to footer.” |
| 9 | **Footer** | Copyright, minimal. Same as now. | |

**Removed or reduced from current homepage:**
- **Hero CTA button** — Remove. It duplicates nav and weakens the hero as one statement.
- **Long order section** — Replaced by dedicated contact page. Homepage keeps one CTA block that points to `/contact/` (or opens contact modal). Form lives on contact page (or in modal), not in footer of homepage.
- **Four featured cases** — Prefer 3 to shorten; or keep 4 if layout stays tight.
- **Full pricing grid** — Either compact teaser (one line + one CTA) or keep 3 cards in a tighter block; avoid long scroll.
- **Full contact form in footer** — Move to contact page (and/or contact modal). Homepage does not “dump” users into a long footer form.

**Result:** Homepage is 7–8 clear blocks, one hero statement, one primary CTA to contact. No unnecessary hero CTA; intentional CTA logic only.

---

## 3. Cases Index Structure

**URL:** `/cases/` (cases/index.html).

**Identity:** Own title: “Кейсы” or “Проекты” (not “Избранные кейсы” — that label stays on homepage). Optional one-line intro (e.g. “Избранные работы студии”) from existing tone.

**Content:**
- Same global header and footer as rest of site.
- One section: grid of **all 8 cases**. Same card component as homepage featured cases (image, title, tag, “Смотреть кейс”). Each card links to the corresponding case page (case-1 … case-8).
- No “featured” vs “rest”; one grid, one level.
- Optional: small CTA strip at bottom “Обсудить свой проект” → `/contact/`.

**Navigation:** “Кейсы” in main nav points here. From homepage, “Все кейсы” points here. Journal and other secondary pages use the same nav: “Кейсы” → `/cases/`.

---

## 4. Standard Case Page Template

**Principle:** Every case is a **full** page. One **consistent** structure for all 8. No “half” cases (no thin 5–8 vs full 1–4).

**Single template structure (all cases):**

| Block | Content | Notes |
|-------|--------|--------|
| **Back** | “← Все кейсы” → `/cases/`. Ghost style. | Orientation. |
| **Hero** | Tag (e.g. “ИИ, производство. Гастрономия”) + title (e.g. “Видеопроизводство с ИИ для Pinskiy & Co”). | Same for all. |
| **Video** | One iframe (or lazy-loaded player). Same aspect and chrome. | Required for all. |
| **Sidebar + body** | Sidebar: 2–3 stats (Client/Project, Service, Deadline/Duration/Goal — as applicable). Body: **three blocks** where content exists (e.g. “Бизнес-задача”, “Решение”, “Результат” or “О проекте”); for lighter cases, one “О проекте” + one paragraph is the minimum; structure stays (heading + text). | Normalize so every case has the same sections; for cases 5–8, use “О проекте” and fill from existing modal/locale copy. |
| **Metrics** | Block “project-metrics”: 3 metric items (value + label). For cases that have no metrics, use “—” or one line (“По запросу” / “Индивидуально”) so the block exists but is minimal. | One consistent block; no “sometimes present, sometimes missing.” |
| **Gallery** | Block “m-gallery”: 0–N images. Cases 1–2 keep current gallery; 3–4 can have 0 or 1 image; 5–8 can have 0 or 1 key visual. Same markup, optional images. | One block; empty or 1 image is valid. |
| **CTA** | One heading (e.g. “Обсудить проект” / “Нужен похожий проект?”) + one primary button “ОБСУДИТЬ ПРОЕКТ” → `/contact/` (or open contact modal). Optional: “from=case-N” or context so contact page/modal can reference the case. | No link to homepage #order; link to contact page or modal. |

**Normalization:**
- Cases 1–4: Keep current content; ensure they use the same template (sidebar + body + metrics + gallery + CTA). Add `cta-primary` and correct CTA target (contact page or modal).
- Cases 5–8: Bring into same template. Add sidebar (2 stats), one “О проекте” body block (existing copy), metrics block (minimal or “—”), gallery (0 or 1 image), same CTA block. No “thin” variant; only optional empty/minimal blocks.

**Missing cases:** All 8 exist. No new case IDs. Only structure and content depth are normalized.

---

## 5. Contact Flow Architecture

**Requirement:** “Связаться с нами” must not only dump users into the footer. Premium contact flow: dedicated page and/or modal/drawer, with form, phone, Telegram, email, fast inquiry.

**Option A — Dedicated contact page (recommended baseline)**  
- **URL:** `/contact/` (contact.html in root).  
- **Content:** Same header/footer as site. One page: heading “Обсудить проект” / “Связаться с нами”. Then:  
  - **Direct paths:** Phone (tel:), Telegram (link), Email (mailto:), Address (text).  
  - **Form:** Email + message (and optional name). Form submits to backend or (short term) mailto/Telegram link with prefill; no fake toast-only submit.  
  - **Fast inquiry:** One line + button “Краткий запрос” or “Написать в Telegram” → Telegram link.  
- **Nav:** “Связаться” → `/contact/`. “Телефон” → tel:.  
- **Case and price CTAs:** “Обсудить проект” → `/contact/` (optional `?from=case-3` or similar for context).

**Option B — Contact modal/drawer (optional layer)**  
- **Trigger:** “Связаться” in nav and/or “Обсудить проект” on cases and price cards open a modal or drawer instead of navigating.  
- **Content inside:** Same as contact page: phone, Telegram, email, address, form, fast inquiry. Visually premium (overlay, focus trap, close).  
- **Advantage:** User stays on current page; good for “quick discuss” from a case.  
- **Implementation:** One shared fragment (HTML) or component; contact page and modal both use it. Form submission and backend logic live once.

**Recommended:**  
- **Primary:** Dedicated `/contact/` page. All “Связаться” and “Обсудить проект” links go here (or open modal that mirrors this content).  
- **Optional:** Modal/drawer that opens from nav and from case/price CTAs, with same form and links; “Close” returns to current page.  
- **No more:** Homepage footer with long form as the only contact. Homepage has one CTA block that links to `/contact/` (or opens the modal).

**Form behavior:** Plan for real submission (backend, form service, or mailto/Telegram as fallback). No “toast only” as the only behavior.

---

## 6. CTA Logic Map

| Context | Element | Action | Destination |
|--------|--------|--------|-------------|
| **Nav (all pages)** | “Связаться” | Primary or secondary CTA | `/contact/` or open contact modal |
| **Nav (all pages)** | “Телефон” | Primary CTA | `tel:+79319815484` |
| **Homepage** | Hero | — | No CTA button |
| **Homepage** | Featured case card | Secondary | Case page (e.g. `/cases/case-1.html`) |
| **Homepage** | “Все кейсы” | Secondary | `/cases/` |
| **Homepage** | Pricing CTA | Primary | `/contact/` or contact modal |
| **Homepage** | Primary CTA block | Primary | `/contact/` or contact modal |
| **Cases index** | Case card | Secondary | Corresponding case page |
| **Cases index** | Optional strip CTA | Primary | `/contact/` or contact modal |
| **Case page** | “← Все кейсы” | Ghost | `/cases/` |
| **Case page** | “ОБСУДИТЬ ПРОЕКТ” | Primary | `/contact/` or contact modal (optional ?from=case-N) |
| **Journal** | Article link | — | news-1 / news-2 / news-3 |
| **Contact page** | Phone / Telegram / Email | — | tel:, Telegram, mailto: |
| **Contact page** | Form submit | — | Backend or fallback (no toast-only) |

**Rules:**
- One primary conversion path: contact (page or modal). No “scroll to footer” as the main path.
- Hero: no CTA; wordmark + subtitle only.
- Case and price CTAs: always to contact (page or modal), never to `index.html#order`.

---

## 7. Migration Plan from Current Structure

**Phase 1 — Homepage**
- Remove hero CTA block (the button under the subtitle).
- Shorten homepage: reduce featured cases to 3 (or keep 4 in a tighter layout); compress pricing to teaser + one CTA or keep 3 cards compact; replace long order section with one CTA block linking to contact.
- Move or copy contact form and contact details to contact page (and optionally to modal). Remove or minimize contact form from homepage footer.
- Fix trust block so metrics never show “0” on first paint.

**Phase 2 — Contact**
- Add `contact.html` (or `/contact/index.html`) with: heading, phone, Telegram, email, address, form, fast-inquiry link.
- Point all “Связаться” and “Обсудить проект” links to `/contact/` (or to a contact modal).
- (Optional) Implement contact modal/drawer; reuse same content as contact page. Wire nav and case/price CTAs to open it where desired.

**Phase 3 — Cases**
- Define one case page template (back, hero, video, sidebar+body, metrics, gallery, CTA). All blocks always present; gallery and metrics can be minimal or empty.
- Normalize case-1 … case-4: ensure CTA target is contact (not index#order); ensure CTA has primary class; align to template.
- Normalize case-5 … case-8: add missing blocks (sidebar with 2 stats, one body block “О проекте”, metrics block minimal, gallery 0 or 1 image, CTA → contact). Use existing locale/copy; no new copy.
- Ensure every case page uses the same layout and component classes.

**Phase 4 — Cases index**
- Give cases index its own title (“Кейсы” or “Проекты”) and optional intro line. Ensure all 8 cards link to the correct case pages. Optional bottom CTA to contact.
- Update nav everywhere so “Кейсы” → `/cases/`.

**Phase 5 — Journal and secondary pages**
- Add `journal/index.html` if desired (list of news-1, news-2, news-3). Or keep journal as homepage teaser + direct links to articles.
- Align news and 404 nav with main site: same links (Кейсы → `/cases/`, Связаться → `/contact/` or modal), same button styles and CTA classes, same fonts/preloads.

**Phase 6 — Cleanup**
- Remove dead code (e.g. unused keyframes). Ensure one design system across all pages.

**Content:** No removal of cases or journal. No text rewrites in this plan. Only structure, links, and one shared case template. Copy and media stay; they are moved or duplicated into the new contact and case structure as needed.
