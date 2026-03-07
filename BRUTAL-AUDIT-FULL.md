# Brutally Honest Full Audit — SHAR Production

**No code changes. Analysis only.**

---

## 1. Executive Summary

The site is **functional** but reads as **patched and mid-market**, not flagship. Architecture is half-migrated (cases are on separate pages; journal and news pages are not). Visual system has tokens and CTA classes but still feels **template-like**: labels, buttons, and surfaces do not consistently convey premium or cinematic quality. The trust block shows **"0"** until JS runs, which undermines credibility. The hero has an **extra CTA button** that duplicates the nav and weakens the wordmark. Case pages are **structurally inconsistent** (cases 1–4 have metrics and sometimes gallery; cases 5–8 are thin). Case CTAs send users to **index.html#order** — i.e. homepage + scroll to form — not a dedicated contact flow. The contact form **does not submit to a backend**; it only shows a toast. Secondary pages (news, 404) use **outdated nav** and **no shared design system**. The result: a site that works but feels **cheap, unfinished, and not art-directed**.

---

## 2. Critical UX/Conversion Problems

- **Hero CTA is redundant and weakens the hero.** A button “ОБСУДИТЬ ПРОЕКТ” / “СВЯЗАТЬСЯ” (via `data-i18n="nav.contact"`) sits directly under the hero subtitle. It duplicates the nav “СВЯЗАТЬСЯ” and “ТЕЛЕФОН”. For a cinematic storefront, the hero should be **one statement** (wordmark + one line). The extra button makes the fold feel busy and generic, not flagship.

- **Case CTAs send users to the homepage footer, not a contact flow.** Every case page CTA links to `../index.html#order`. The user is thrown back to the main page and must rely on scroll + anchor. There is **no dedicated contact page** and **no contact-focused journey** from a case. Conversion path is “leave case → land on homepage → scroll to form,” which is generic and weak.

- **Contact form does not submit anywhere.** The form uses `preventDefault()` and only shows a toast (“Заявка успешно отправлена!”). No backend, no email, no CRM. The contact flow is **cosmetic**: it looks like contact but does not deliver leads. For a premium studio this is a critical conversion and trust gap.

- **CTA hierarchy is inconsistent across pages.** Case 4’s “ОБСУДИТЬ ПРОЕКТ” link is missing the `cta-primary` class (only `btn-minimal`). Other case pages have `cta-primary`. Small inconsistency, but it reflects **patchy application** of the design system.

- **Journal/news pages point to the wrong place.** News pages link “Проекты” to `index.html#work` (homepage work section). The main site nav “Кейсы” goes to `cases/index.html`. So from a journal article, “Проекты” does not take the user to the cases index; it takes them to the homepage block of featured cases. **Navigation is inconsistent** between homepage and secondary pages.

---

## 3. Critical Visual/Premium Problems

- **Buttons still do not feel premium.** Despite CTA classes (primary/secondary/ghost), the base treatment is one family: light border, subtle gradient, glow on hover. Primary uses a slightly stronger border and soft fill, but the **difference is minimal**. Buttons do not feel “expensive” or “art-directed”; they feel like one style copied everywhere with small tweaks.

- **Labels are flat and undifferentiated.** Section labels (ИЗБРАННЫЕ КЕЙСЫ, КОМАНДА, СТОИМОСТЬ, etc.) use the same size, color, and weight. Card tags and meta labels (e.g. team roles, journal tags) were muted to tertiary, but the **section labels themselves** do not have a clear hierarchy (e.g. one “hero” section label vs. rest). The page reads as one level, not editorial.

- **Surfaces are still timid.** Border and fill were raised to 0.08 and 0.035, but cards (cases, price, journal, clients) still read as **barely there**. For a luxury-minimal site, surfaces should either be clearly visible (committed panels) or absent (pure space). Current state is in-between and feels unfinished.

- **Typography has a scale in variables but not a clear editorial system.** Body uses `--text-base`; labels use `--text-xs`. Sizes exist, but **contrast between display, headings, body, and captions** is not strong enough. The site does not feel “designed” typographically; it feels like a standard dark theme with a few tokens.

- **Logo/wordmark treatment is still decorative.** Logo uses a gradient and hover (background-position shift). Hero wordmark uses a reduced shadow. It’s better than a heavy shimmer, but the **wordmark is not a single locked asset**: nav logo and hero block are not obviously the same lock (size/weight/tracking). Premium brands treat the wordmark as one invariant element.

- **Homepage still feels patched, not flagship.** Sections are stacked with similar padding and similar label treatment. There is no clear “act 1 / act 2 / act 3,” no compression/expansion rhythm, and no single focal moment after the hero. Four featured cases have equal weight; there is no “hero case.” The page is a **long form with the same tone**, not a directed cinematic storefront.

- **Unused keyframes add noise.** `lens-ray` and `card-ray` keyframes exist in CSS but are not applied to any visible element (card-ray was removed from .case). Dead code suggests **leftover patches** and weak maintenance.

---

## 4. Cases Architecture Problems

- **Case links do not 404** — `cases/case-1.html` through `cases/case-8.html` exist and are linked from the cases index and homepage. So there are **no broken case links** in the current repo.

- **Case pages are not structurally consistent.**  
  - **Cases 1–2:** Full structure: hero, video, sidebar, content (3 h2 blocks), project-metrics, m-gallery, m-cta-wrap.  
  - **Cases 3–4:** Same but **no m-gallery**.  
  - **Cases 5–8:** Thin structure: hero, video, sidebar (2 stats), one “О проекте” block, m-cta-wrap. **No project-metrics, no gallery.**  
  So the **depth of case content is inconsistent**. Cases 5–8 feel like placeholders next to 1–4. A flagship would either give all cases the same structure or clearly tier “featured” vs “archive.”

- **Cases index reuses the same label as the homepage.** The cases index uses “ИЗБРАННЫЕ КЕЙСЫ” (same as the homepage work section). So the **portfolio index does not have its own identity** (e.g. “Кейсы” or “Проекты” with a short intro). It reads as a second copy of the homepage block.

- **Case CTAs redirect to homepage #order.** Every case CTA is “ОБСУДИТЬ ПРОЕКТ” → `../index.html#order`. There is no **case-level contact** (e.g. “Обсудить этот проект” with pre-filled context) or dedicated contact page. The flow is generic: leave case, land on main page, scroll to form.

---

## 5. Contact Flow Problems

- **Contact is a single section at the bottom of the homepage.** One block: heading “ОБСУДИТЬ ПРОЕКТ,” contact list (phone, Telegram, email, address), and form. There is **no dedicated /contact page**, no sticky CTA, and no repeated “Discuss” in the journey. Users who want to act fast must scroll to the end or use the nav.

- **Contact logic is generic.** “СВЯЗАТЬСЯ” and “ТЕЛЕФОН” in nav, “ОБСУДИТЬ ПРОЕКТ” in hero, “Заказать проект” / “Обсудить проект” in price cards, and “ОТПРАВИТЬ ЗАЯВКУ” in the form are **one conceptual action** (contact) split into many labels. There is no clear **primary path** (e.g. “Call” vs “Brief” vs “Newsletter”) or intentional funnel. Everything feels like “contact us” in different words.

- **Form does not submit.** Form handler prevents default and shows a success toast only. No server, no integration. So the **contact flow is not real** from a conversion standpoint. For a premium studio, this is a major gap: the site cannot capture leads.

- **From case pages, contact = homepage + anchor.** Case CTAs go to `index.html#order`. So “contact” from a case is “go to main page and scroll to form.” Not wrong, but it is **generic** and does not feel like a premium, intentional path (e.g. dedicated contact page with optional case reference).

---

## 6. Header/Navigation Issues

- **Nav is consistent on homepage and cases** (logo, Кейсы, Команда, Стоимость, Журнал, СВЯЗАТЬСЯ, ТЕЛЕФОН). So **header structure is not broken** on the main flow.

- **Secondary pages (news-1, news-2, news-3) use different nav.**  
  - “Проекты” links to `index.html#work` instead of `cases/index.html`.  
  - No `data-i18n` on nav links; no CTA classes.  
  - “Связаться” is a plain text link, not the same button style as homepage.  
  So **journal and other secondary pages are out of sync** with the main site. They feel like a different, older template.

- **Logo on homepage is `href="#"`.** So on the main page the logo does not navigate (stays on page). On case pages the logo goes to `../index.html`. Inconsistent: **homepage logo is decorative only**; elsewhere it is a home link.

- **No active state for current section on homepage.** When the user is in #team or #pricing, the nav does not highlight the current section. So **orientation on long scroll** is weak.

---

## 7. Typography / Logo / Button Issues

- **Typography:** Scale variables exist (--text-xs … --text-display) but are **not applied consistently** to create a clear hierarchy. Many components still use ad-hoc clamp() or fixed px. The site does not feel “typographically designed”; it feels like a dark theme with a few shared sizes.

- **Logo:** Gradient + hover (background-position) is less noisy than before but still **decorative**. The wordmark is not a single lock across nav and hero (size/weight/tracking could be stricter). For a premium studio, the wordmark should be the one non-negotiable asset.

- **Buttons:** Base style is one family (outline, light gradient, glow). Primary/secondary/ghost add **marginal** difference (primary = slightly stronger border and fill). Buttons do not feel **expensive or intentional**; they feel like generic dark-UI buttons with a brand color. No clear “hero” button treatment or distinct secondary style.

---

## 8. Performance/Technical Issues

- **Trust block shows “0” until JS runs.** Stat numbers are rendered as “0” in HTML and animate via IntersectionObserver. Before the observer fires (or if JS fails), the user sees **“0 Проектов”, “0 Стран”, “0% Возврата”**. That **directly undermines trust**. Counters have NaN/zero guards in code, but the **initial state is still zero**. There is no SSR or static fallback (e.g. final values in HTML, then animate from 0 only when JS runs).

- **Hero video loads eagerly.** Full Vimeo iframe with 1080p in the hero. No lazy load. **First load is heavy** for a “cinematic” hero; low-end devices or slow networks will pay.

- **Custom cursor and scroll/observer logic run on every page.** Case pages and news pages load the same script (where applicable). Cursor logic runs when `innerWidth > 900`. No major bug, but **script is monolithic** and not split by route, so every page pays for all behaviors.

- **News pages do not preload Plus Jakarta.** Main and cases use preload for both Inter and Plus Jakarta; news pages only link Inter. So **font loading is inconsistent** across the site.

---

## 9. Content Structure and Trust Issues

- **Trust block with metrics that start at zero.** “ДОВЕРИЕ В ЦИФРАХ” with 50, 15, 99 is a **trust signal**, but the initial render is 0/0/0. If the user sees that even briefly, it looks broken or fake. Either show final numbers by default (and optionally animate) or move the block below the fold and ensure it animates before the user scrolls to it.

- **Client logos are placeholders.** Four items: PINSKIY, CLICK, M-TECHNO, YUGA. Same treatment, no logos (just text). For a premium studio, **client strip** should feel curated (real logos or a clear “selected clients” framing). Current block feels like a template grid.

- **No proof beyond metrics and client names.** No testimonials, no “as seen in,” no awards. Trust rests on **three numbers and four text labels**. For a flagship, trust could be reinforced by one strong quote, one award line, or one press mention — without turning the site into a generic landing page.

- **Journal is mixed into the main scroll.** Three journal cards in a horizontal scroll on the homepage. Same section rhythm and label style as commercial sections. So **editorial does not feel distinct** from sales; it feels like another block in the same long form.

---

## 7. What Must Stay

- Business meaning: premium AI/cinema production, SHAR Production positioning.  
- All existing content: copy, cases, team, pricing, journal, contact block.  
- Brand color (#9c0404), dark background, video hero concept.  
- Cases as separate pages; homepage with featured cases and link to cases index.  
- RU/EN localization (locales.js, data-i18n).  
- No removal of sections or editorial content.

---

## 8. What Must Be Rebuilt

1. **Trust block:** No “0” on first paint; either static final values or ensure animation runs before visibility.  
2. **Contact flow:** Either integrate form with a backend/CRM or replace with a clear “contact by phone/Telegram/email” path; consider a dedicated contact page and case CTAs that go there (or open a contact context) instead of only index.html#order.  
3. **Hero:** Remove or rethink the hero CTA so the hero is one clear statement (wordmark + subtitle), not wordmark + subtitle + button.  
4. **Case page consistency:** Either give cases 5–8 the same structure as 1–4 (metrics, optional gallery, full body) or clearly tier “featured” vs “archive” so the difference is intentional.  
5. **CTA consistency:** Apply cta-primary to case 4 CTA; unify all case CTAs and define one clear primary path from cases (e.g. “Discuss this project” → contact page or #order with clear framing).  
6. **Secondary pages:** Align news (and 404) nav with main site (Кейсы → cases/index.html, same button styles, same CTA classes, shared fonts/preloads).  
7. **Visual system:** Strengthen button hierarchy (primary clearly dominant), surface definition (commit to visible panels or to minimal borders), and typography (one clear editorial scale and contrast).  
8. **Logo/wordmark:** One locked treatment (weight, tracking) for nav and hero; remove or minimize decorative hover.  
9. **Dead code:** Remove unused keyframes (lens-ray, card-ray) or document why they remain.  
10. **Homepage rhythm:** Differentiate section pacing and label hierarchy so the page feels art-directed, not one long strip of similar blocks.

---

## 9. Priority Order

| Priority | Item | Reason |
|----------|------|--------|
| P0 | Trust block: no zero on first paint | Directly damages credibility. |
| P0 | Contact form: real submission or clear alternative | Conversion is fake today. |
| P1 | Hero: remove or redesign hero CTA | Reduces clutter and strengthens wordmark. |
| P1 | Case CTAs: dedicated contact path or contact page | Clearer conversion from cases. |
| P1 | Case page consistency (5–8 vs 1–4) | Portfolio feels finished, not half-done. |
| P2 | Secondary pages nav and design system | One site, one nav, one style. |
| P2 | CTA class consistency (e.g. case 4) | Small but part of “flagship” polish. |
| P2 | Buttons and surfaces: premium differentiation | Visual cheapness. |
| P3 | Typography and wordmark lock | Premium feel. |
| P3 | Homepage rhythm and section hierarchy | Flagship storefront feel. |
| P3 | Dead CSS (keyframes) | Hygiene. |
