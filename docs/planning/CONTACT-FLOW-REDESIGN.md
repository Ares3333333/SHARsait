# Contact Flow Redesign — SHAR Production

**No code. UX and structure only.**  
Premium contact conversion; no dumping users into the footer. Intentional, immediate, minimal. Telegram / phone / email always accessible. Performance preserved.

---

## 1. Contact UX Recommendation

**Principle:** Contact is a **first-class destination**, not a scroll target. The user chooses how to reach the studio: **immediate** (phone, Telegram), **short inquiry** (minimal form), or **structured brief** (form with optional project type). No single long form at the bottom of the homepage.

**Recommendation: hybrid.**

- **Dedicated contact page** (`/contact/` or `contact.html`)  
  - Canonical place for “Связаться с нами”.  
  - Same header/footer as the site. One screen: **direct actions** (phone, Telegram, email) clearly visible; **short inquiry** (minimal form); optional **project type** (dropdown or chips).  
  - Shareable URL. Good for “обсудить проект” from cases and price cards (link here instead of index#order).

- **Contact drawer (slide-over)**  
  - Opened from nav “Связаться” and/or from in-page CTAs when we want to keep the user on the current page (e.g. from a case: “Обсудить этот проект” opens drawer).  
  - Same content as contact page: direct links (phone, Telegram, email) + same minimal form. No duplicate logic: one form, one set of fields; drawer and page both use it.  
  - **Premium feel:** slide from right (or left), overlay with subtle backdrop, focus trap, one clear close. No full-page redirect when a quick “хочу обсудить” is enough.

**Why not only modal:** Modal is fine for “quick discuss,” but it has no URL. For “обсудить проект” from a case, a **link to contact page** is better (bookmarkable, back button, clear intent). So: **primary = contact page**; **optional = drawer** for nav “Связаться” and/or for a secondary “Быстро связаться” control.

**Why not only page:** From nav, going to a new page for “Связаться” is good. From within a case, some users prefer to stay on the case and open a compact contact panel (drawer) instead of leaving. So offering both (page + drawer) covers “I want a clear contact page” and “I want to ask one thing without leaving.”

**Tone:** One heading (“Обсудить проект” / “Связаться”). Direct actions first (phone, Telegram, email). Then one short form: **phone** and/or **email**, **short message**, optional **project type**. No long multi-step wizard. No “cheap generic form”: few fields, plenty of whitespace, same dark theme and brand red, minimal labels.

---

## 2. CTA Hierarchy

| CTA | Role | Destination | Notes |
|-----|------|-------------|--------|
| **Телефон** (nav) | Primary immediate | `tel:+79319815484` | One tap to call. No form. |
| **Связаться** (nav) | Primary contact | Contact page **or** open contact drawer | If drawer: open from nav. If page: link to `contact.html`. Choose one as default; the other can be a “Быстрая связь” link that opens drawer. |
| **Обсудить проект** (case page) | Primary contact from case | Contact page (e.g. `../contact.html` or `../contact.html?from=case-3`) | User leaves case; lands on contact. Optional: “Open in new tab” or “Open drawer” as secondary. |
| **Заказать проект** / **Обсудить проект** (price cards) | Primary contact | Contact page or drawer | Same as above. |
| **ОТПРАВИТЬ ЗАЯВКУ** (on contact page/drawer) | Form submit | Backend or fallback (mailto/Telegram) | No toast-only; real submission or clear alternative. |
| **Написать в Telegram** (on contact page/drawer) | Fast path | `https://t.me/actorars` (or deep link with prefill text) | Always visible. No form required. |

**Rule:** No CTA leads to **homepage footer** (`index.html#order`) as the main contact path. Homepage may keep a small “Связаться” block that **links to contact page** (or opens drawer), not to #order. The long form in footer is **removed or reduced** to a single line + link: “Обсудить проект → [contact page].”

---

## 3. Entry Points Mapping

| Entry point | Current | Target |
|-------------|---------|--------|
| Nav “Связаться” | `#order` (homepage section) | Contact page **or** contact drawer |
| Nav “Телефон” | `tel:` | Unchanged (`tel:+79319815484`) |
| Hero CTA (if kept) | `#order` | Contact page or drawer |
| Price card “Заказать проект” / “Обсудить проект” | `#order` | Contact page (or drawer) |
| Case page “ОБСУДИТЬ ПРОЕКТ” | `../index.html#order` | `../contact.html` (or drawer) |
| Homepage “primary CTA” block | — | Contact page or drawer |
| Footer “form” section | In-page form at #order | Removed or replaced by one line: “Обсудить проект” → contact page |

**Result:** Every contact intent goes to **one place** (contact page or drawer with same content). No “scroll to footer and find the form.”

---

## 4. Form Fields Recommendation

**Keep it minimal.** Premium = few fields, clear purpose.

**Recommended fields (contact page and drawer):**

| Field | Type | Required | Purpose |
|-------|------|----------|---------|
| **Phone** | Tel, single line | Optional* | Quick callback. *Required if we want at least one contact; else optional with “Phone or email.” |
| **Email** | Email, single line | Optional* | Reply by email. *If phone is required, email optional; or require one of the two. |
| **Message** | Textarea, 2–4 lines | Yes | Short inquiry. Placeholder: “Кратко о задаче” / “Short inquiry.” |
| **Project type** | Select or chips (optional) | No | “Интеграция ИИ”, “Полное производство”, “Корпоративный уровень”, “Другое”. Helps studio triage; not mandatory. |

**Do not add:** Name (optional only if we want it; not required for “premium minimal”). Company. Long description. Multiple steps. File upload in first version.

**Validation:** Phone format optional (basic). Email format if present. Message min length (e.g. 10 chars). No aggressive inline errors; one message at submit is enough.

**Submit:** One button: “Отправить” / “Отправить заявку”. On success: message (“Мы свяжемся с вами”) and optionally clear form or redirect. **Backend:** Form must submit to server, form-service, or fallback (e.g. mailto with body, or Telegram bot link with prefill). No “toast only” as the only behavior.

**Direct actions above the form (no form needed):**

- **Позвонить:** `tel:+79319815484` (visible number).  
- **Telegram:** Link to `https://t.me/actorars` (and optionally `https://t.me/actorars?text=...` with a short prefill like “Добрый день, хочу обсудить проект”).  
- **Email:** `mailto:sharproduction@yandex.com` (optional subject: “Запрос с сайта SHAR Production”).

So the user can **skip the form** and go straight to phone, Telegram, or email. Form is for “short written inquiry” only.

---

## 5. Modal / Page Decision

**Decision: contact page + optional drawer.**

- **Contact page (`contact.html`)**  
  - **Use for:** All “Обсудить проект”, “Заказать проект”, “Связаться” links from cases, price cards, and any “contact us” block.  
  - **Content:** Heading “Обсудить проект”. Direct actions (phone, Telegram, email, optionally address). Minimal form (phone or email, message, optional project type). Submit → backend or fallback.  
  - **Benefits:** URL, bookmarkable, back button, clear intent. No “where am I?” when coming from a case.

- **Contact drawer (slide-over)**  
  - **Use for:** Nav “Связаться” (optional: open drawer instead of going to page) or a “Быстрая связь” control on homepage.  
  - **Content:** Same as contact page (direct actions + same form). Can be a **fragment** or **component** reused on page and in drawer.  
  - **Behavior:** Opens from right (or left); overlay; focus trap; close button and “outside click” to close. No URL change.  
  - **Benefits:** User stays on current page; quick “one question” without navigation. Feels premium if animation and layout are minimal.

**Recommendation:**  
- **Default for “Связаться” and “Обсудить проект”:** Link to **contact page**.  
- **Optional:** Add a “Быстрая связь” or reuse “Связаться” to **open drawer** on homepage/cases so users can choose “open page” vs “open panel.” First phase: **contact page only** is enough; add drawer in a second phase if desired.

**Performance:**  
- **Page:** One extra HTML page; same CSS/JS as rest of site. No heavy assets.  
- **Drawer:** One overlay + same form markup. No extra round-trips if form is in the main bundle. Lazy-load drawer markup only when first opened if we want to save initial DOM.

---

## 6. Conversion Logic

**Paths:**

1. **Immediate contact (no form)**  
   - User taps “Телефон” → call.  
   - User taps “Telegram” → opens Telegram.  
   - User taps “Email” → opens mail client.  
   No form; no steps. Always visible on contact page (and in drawer).

2. **Short inquiry (form)**  
   - User fills phone and/or email + short message (and optional project type). Submits.  
   - System: send to backend or fallback (email, form service, Telegram bot).  
   - Confirmation: “Мы свяжемся с вами” (and optionally “или напишите в Telegram для быстрого ответа”).  
   One step; minimal fields.

3. **From case: “Обсудить этот проект”**  
   - CTA on case page → contact page (optional `?from=case-3`).  
   - Contact page can prefill or show “Обсуждение проекта: [Case title]” so the studio knows context. Form fields stay the same; no extra required fields.  
   User has chosen “I want to discuss this project” by coming from the case; no need to ask “which project” in the form if we pass context via URL.

4. **From price card: “Заказать” / “Обсудить”**  
   - Same as above: link to contact page. Optional `?type=integration` or `?type=full` so project type is prefilled or suggested. Form stays minimal.

**No conversion path:** Homepage footer scroll. Remove or replace with a single CTA that goes to contact page (or opens drawer).

---

## 7. Implementation Plan

**Phase 1 — Contact page**

1. Add `contact.html` (or `/contact/index.html`) with same header/footer as main site.  
2. Content: one heading (“Обсудить проект”); block of direct actions (phone, Telegram, email; optional address) with visible links/numbers; minimal form (phone, email, message, optional project type); submit button; legal line (link to privacy).  
3. Form: wire submit to backend or fallback (mailto / Telegram link with prefill). No “toast only.”  
4. Styles: same design system (dark, brand red, minimal). Form: few fields, clear labels, one primary button. No “cheap generic” layout.  
5. Point all “Связаться” and “Обсудить проект” / “Заказать проект” links (nav, cases, price cards, homepage CTA block) to `contact.html` instead of `#order` or `index.html#order`.  
6. On homepage: remove or shorten `#order` section. Replace with one line + CTA “Обсудить проект” → `contact.html` (no long form in footer).

**Phase 2 — CTA and nav**

7. Ensure nav “Связаться” links to `contact.html`. “Телефон” stays `tel:`.  
8. Ensure every case page CTA links to `../contact.html` (or `contact.html` from root). Optional: add `?from=case-N` for context.  
9. Ensure price card buttons link to contact page.  
10. Add `cta-primary` to any case CTA that still lacks it (consistency).

**Phase 3 — Optional drawer**

11. If adding drawer: create one shared fragment or block of HTML for “contact content” (direct actions + form).  
12. Contact page includes that block. Drawer loads the same block (or a copy) in an overlay; open from nav “Связаться” or from a “Быстрая связь” button.  
13. Drawer: slide-over from right; backdrop; focus trap; close button; no URL change. Same form submission logic as page.  
14. Decide: nav “Связаться” = page only, or “Связаться” = drawer. If drawer, keep a visible “Полная страница контактов” link for users who want the page.

**Phase 4 — Copy and locale**

15. Add locale keys for contact page (heading, labels, placeholders, submit, success message, direct action labels). Reuse existing order.* where it fits; add contact.* for page-specific strings.  
16. Form validation and error messages in both locales if needed.

**Phase 5 — Testing**

17. Test: from homepage, nav, case, price card, user reaches contact page (or drawer) and sees phone, Telegram, email, form.  
18. Test: form submit reaches backend or fallback; no toast-only behavior.  
19. Test: no link points to `index.html#order` as the main contact path.  
20. Test: performance (contact page load; drawer open) acceptable; no heavy new assets.

**Out of scope in this plan:** Backend implementation (form handler, email, CRM). Plan assumes form will be wired to a real endpoint or a defined fallback; implementation of that endpoint is separate.
